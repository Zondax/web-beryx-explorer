import Web3, { TransactionReceipt } from 'web3'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { NetworkFindMetamaskId, NetworkMetamaskId, NetworkType } from '@/config/networks'
import { walletErrors } from '@/config/wallet'
import { useContractsStore } from '@/store/ui/contracts'
import { useNotificationsStore } from '@/store/ui/notifications'
import { getWalletError, isMetamaskError } from '@/utils/metamask'
import { getSendTransactionData } from '@/utils/wallet'
import { FilEthAddress } from '@zondax/izari-filecoin/address'
import { NetworkPrefix } from '@zondax/izari-filecoin/artifacts'

import { RunMethodFormValues, availableUnits } from '../../../components/views/ResultsView/ContractView/RunMethod/config'
import useAppSettingsStore from '../ui/settings'
import useWalletStore, { ConnectionResponse, TransactionData, WalletProvider } from './wallet'

/**
 * Represents a response object from a connection request with additional Metamask-specific information.
 * Extends the base ConnectionResponse interface.
 */
interface MetamaskConnResponse extends ConnectionResponse {
  hasMetamaskExtension?: boolean
}

/**
 * Interface for Metamask Wallet State.
 * @interface
 */
interface MetamaskWalletState {
  isConnected: boolean
  walletInfo: {
    filAddress: string | undefined
    ethAddress: string | undefined
    balance: string | undefined
    network: NetworkType | undefined
  }
  error: string | undefined
}

export interface MetamaskRpcError extends Error {
  message: string
  code: number
  data?: unknown
}

/**
 * Initial state for Metamask Wallet.
 * @const
 */
const InitialState: MetamaskWalletState = {
  isConnected: false,
  walletInfo: { filAddress: undefined, ethAddress: undefined, balance: undefined, network: undefined },
  error: undefined,
}

/**
 * Interface for Metamask Wallet Actions.
 * @interface
 */
interface MetamaskWalletActions {
  connectWallet: () => Promise<MetamaskConnResponse>
  disconnectWallet: () => void
  invokeContract: (invokeData: RunMethodFormValues, txData: TransactionData) => void
  changeChain: (chainId: string) => void
  changeAccount: (accounts: Array<string>) => void
  switchChain: (chainId: NetworkMetamaskId) => void
}

/**
 * Metamask Wallet Store.
 * @function
 * @returns MetamaskWalletState & MetamaskWalletActions
 */
const useMetamaskWalletStore = create<MetamaskWalletState & MetamaskWalletActions>()(
  immer((set, get) => ({
    ...InitialState,
    connectWallet: async () => {
      if (window.ethereum) {
        try {
          const res = await window.ethereum.request({
            method: 'eth_requestAccounts',
          })

          const chainId = await window.ethereum?.request({
            method: 'eth_chainId',
          })

          let network: NetworkType | undefined
          if (chainId) {
            network = NetworkFindMetamaskId(chainId as NetworkMetamaskId)
          }

          // @ts-expect-error
          const ethAddr: string = res[0]
          const filEthAddr = new FilEthAddress(network?.denomPrefix as NetworkPrefix, Buffer.from(ethAddr.slice(2), 'hex')).toString()

          // @ts-expect-error
          window.ethereum.on('chainChanged', get().changeChain)

          // @ts-expect-error
          window.ethereum.on('accountsChanged', get().changeAccount)
          set({ isConnected: true })
          return {
            filAddr: filEthAddr,
            ethAddr,
            network,
          }
        } catch (err) {
          return {
            error: err,
            hasMetamaskExtension: true,
            connectionError: true,
          }
        }
      } else {
        return {
          hasMetamaskExtension: false,
          connectionError: true,
        }
      }
    },
    disconnectWallet: () => {
      set({ isConnected: false, walletInfo: InitialState.walletInfo })
    },
    invokeContract: async (invokeData: RunMethodFormValues, txData: TransactionData) => {
      const setRpcResponse = useContractsStore.getState().setRpcResponse
      const { to } = txData

      if (!invokeData.method) {
        return
      }

      if (window.ethereum) {
        const web3 = new Web3(window.ethereum as any)
        const { network } = useWalletStore.getState().walletInfo
        const data = getSendTransactionData(invokeData, web3)

        switch (invokeData.type) {
          case 'payable':
          case 'nonpayable': {
            let value = '0'
            if (invokeData.type === 'payable' && invokeData.amount && invokeData.unitAmount) {
              const convertedValue = availableUnits[invokeData.unitAmount](invokeData.amount.toString())
              value = convertedValue.toAtto()
            }
            const accounts = await web3.eth.requestAccounts()

            await web3.eth
              .sendTransaction({ from: accounts[0], to, data, value })
              .on('transactionHash', function (hash: string) {
                useNotificationsStore.getState().addNotification({
                  title: 'Your transaction just entered mempool',
                  network,
                  tx_to: to ?? undefined,
                  tx_hash: hash,
                  value: `${invokeData.amount ?? 0} ${invokeData.unitAmount}`,
                  status: 'mempool',
                  tag: ['interact'],
                  method: 'InvokeContract',
                })
              })
              .on('receipt', function (receipt: TransactionReceipt) {
                const response: any = receipt
                for (const key of Object.keys(response)) {
                  response[key] = typeof response[key] === 'bigint' ? Number(response[key]) : response[key]
                }
                useNotificationsStore.getState().addNotification({
                  title: 'Your transaction was received',
                  network,
                  tx_to: receipt.to ?? undefined,
                  tx_hash: receipt.transactionHash.toString(),
                  value: `${invokeData.amount ?? 0} ${invokeData.unitAmount}`,
                  status: 'confirm',
                  tag: ['interact'],
                  method: 'InvokeContract',
                })
                setRpcResponse(response)
                useWalletStore.getState().gatherData()
              })
              .on('error', (e: Error) => {
                const { title } = walletErrors['TRANSACTION_NOT_DONE']
                useNotificationsStore.getState().addNotification({
                  title,
                  description: e.message,
                  status: 'error',
                  tag: ['interact'],
                })
              }) // If a out of gas error, the second parameter is the receipt.
              .catch(e => {
                if (e instanceof Error) {
                  let errorMessage = e.message
                  if (e.message.includes('429')) {
                    errorMessage = 'We could not determinate if the transaction was done successfully. Please search it.'
                  }

                  useNotificationsStore.getState().addNotification({
                    title: 'Error',
                    description: errorMessage,
                    status: 'error',
                    tag: ['interact'],
                  })
                }
              })
            break
          }

          default:
            break
        }
      }
    },
    changeChain: (chainId: string) => {
      const networkWallet = NetworkFindMetamaskId(chainId as NetworkMetamaskId)

      const currentNetwork = useAppSettingsStore.getState().network
      if (networkWallet?.uniqueId === currentNetwork.uniqueId) {
        useWalletStore.getState().connectWallet(WalletProvider.METAMASK)
      } else if (window.ethereum && get().isConnected) {
        get().disconnectWallet()
        useNotificationsStore.getState().addNotification({
          title: 'The chain was changed through the wallet.',
          description: `${
            networkWallet
              ? `As your wallet is currently linked to the ${networkWallet.project} ${networkWallet.name} network and the application you’re using operates on the ${currentNetwork.project} ${currentNetwork.name} network, the wallet was disconnected`
              : ''
          }. To fully utilize all features, please switch the Beryx’s network to match with the one in the wallet.`,
          status: 'error',
          tag: ['Wallet'],
        })
      }
    },
    changeAccount: (accounts: Array<string>) => {
      const ethAddr = accounts[0]
      const walletInfo = useWalletStore.getState().walletInfo

      if (window.ethereum && walletInfo.network) {
        const filEthAddr = new FilEthAddress(NetworkPrefix.Mainnet, Buffer.from(ethAddr.slice(2), 'hex')).toString()

        useWalletStore.getState().changeAddress(filEthAddr, ethAddr)
      }
    },
    switchChain: async (metamaskId: NetworkMetamaskId) => {
      const networkWallet = NetworkFindMetamaskId(metamaskId)

      if (window.ethereum && get().isConnected && networkWallet) {
        try {
          await window.ethereum // Or window.ethereum if you don't support EIP-6963.
            .request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: metamaskId }],
            })
        } catch (switchError) {
          // This error code indicates that the chain has not been added to MetaMask.
          if (isMetamaskError(switchError) && switchError?.code === 4902) {
            try {
              await window.ethereum // Or window.ethereum if you don't support EIP-6963.
                .request({
                  method: 'wallet_addEthereumChain',
                  params: [
                    {
                      chainId: metamaskId,
                      chainName: `${networkWallet.project} ${networkWallet.name}`,
                      rpcUrls: [networkWallet?.rpcNode] /* ... */,
                    },
                  ],
                })
            } catch (addError) {
              // Handle add wallet errors.
              const currentNetwork = useAppSettingsStore.getState().network
              const { title, description } = getWalletError('NETWORK_NOT_MATCHING', networkWallet, currentNetwork)
              useNotificationsStore.getState().addNotification({
                title,
                description,
                status: 'error',
                tag: ['Wallet'],
              })
            }
          }
          // Handle other "switch" errors.
          const currentNetwork = useAppSettingsStore.getState().network
          const { title, description } = getWalletError('NETWORK_NOT_MATCHING', networkWallet, currentNetwork)
          useNotificationsStore.getState().addNotification({
            title,
            description,
            status: 'error',
            tag: ['Wallet'],
          })
        }
      }
    },
  }))
)

/**
 * Export Metamask Wallet Store.
 * @exports
 */
export default useMetamaskWalletStore
