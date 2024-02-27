import axios from 'axios'
import { format } from 'date-fns-tz'
import { v4 } from 'uuid'
import Web3, { AbiInput, TransactionReceipt } from 'web3'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { fetchBeryxApiToken } from '@/api-client/apiTokens'
import { NetworkFindMetamaskId, NetworkMetamaskId, NetworkType } from '@/config/networks'
import { parseRequest } from '@/refactor/contractUtils'
import { useContractsStore } from '@/store/ui/contracts'
import { useNotificationsStore } from '@/store/ui/notifications'
import { captureException } from '@sentry/nextjs'
import { FilEthAddress } from '@zondax/izari-filecoin/address'
import { NetworkPrefix } from '@zondax/izari-filecoin/artifacts'

import { RunMethodFormValues, availableUnits } from '../../../components/views/ResultsView/ContractView/RunMethod/config'
import { FieldValues } from '../../../components/views/ResultsView/ContractView/config'
import { useAppSettingsStore } from '../ui/settings'
import useWalletStore, { TransactionData } from './wallet'

/**
 * Enum for wallet providers.
 * @readonly
 * @enum {string}
 */
export enum WalletProvider {
  METAMASK = 'metamask',
  LEDGER = 'ledger',
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
  connectWallet: () => Promise<any | undefined>
  disconnectWallet: () => void
  invokeContract: (invokeData: RunMethodFormValues, txData: TransactionData) => void
  changeChain: (chainId: string) => void
  changeAccount: (accounts: Array<string>) => void
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
      useWalletStore.getState().disconnectWallet()
    },
    invokeContract: async (invokeData: RunMethodFormValues, txData: TransactionData) => {
      const setRpcResponse = useContractsStore.getState().setRpcResponse
      const rpcNode = useAppSettingsStore.getState().network?.rpcNode
      const { to } = txData

      if (!invokeData.method) {
        return
      }

      if (window.ethereum) {
        const web3 = new Web3(window.ethereum as any)

        const { ethAddr: from, network } = useWalletStore.getState().walletInfo

        // serialize transaction data
        let parsedReq: FieldValues[] = []

        if (invokeData.requestBodyString) {
          try {
            parsedReq = JSON.parse(invokeData.requestBodyString)
          } catch {
            useNotificationsStore.getState().addNotification({
              id: v4(),
              title: 'Error: Wrong method arguments',
              time: format(new Date(), 'KK:mm aa'),
              date: format(new Date(), 'MMM dd'),
              description: 'The argument list is not supported. Please consult the contract ABI',
              status: 'error',
              tag: ['interact'],
            })
            return
          }
        } else if (invokeData.requestBody) {
          parsedReq = parseRequest(invokeData.requestBody)
        }

        // make sure the input parameters match with what the method requires
        if ((invokeData.method.inputs.length > 0 && parsedReq.length === 0) || invokeData.method.inputs.length !== parsedReq.length) {
          useNotificationsStore.getState().addNotification({
            id: v4(),
            title: 'Error: Wrong method arguments',
            time: format(new Date(), 'KK:mm aa'),
            date: format(new Date(), 'MMM dd'),
            description: 'The argument list is not supported. Please consult the contract ABI',
            status: 'error',
            tag: ['interact'],
          })
          return
        }

        let serializedBody = ''
        try {
          serializedBody = web3.eth.abi.encodeParameters(
            invokeData.method.inputs.map(elem => {
              return elem as unknown as AbiInput
            }),
            parsedReq
          )
        } catch {
          useNotificationsStore.getState().addNotification({
            id: v4(),
            title: 'Error: Parameters could not be coded',
            time: format(new Date(), 'KK:mm aa'),
            date: format(new Date(), 'MMM dd'),
            description: 'Please check the values sent match the parameter type.',
            status: 'error',
            tag: ['interact'],
          })
          return
        }

        let selector: string | undefined
        const selectors = useContractsStore.getState().contractCode.selectors
        for (const key in selectors) {
          if (selectors[key] && selectors[key].indexOf(invokeData.method.name) !== -1) {
            selector = key
            break
          }
        }
        if (!selector) {
          useNotificationsStore.getState().addNotification({
            id: v4(),
            title: 'Unknown error',
            time: format(new Date(), 'KK:mm aa'),
            date: format(new Date(), 'MMM dd'),
            description: 'Please try again or use the feedback tool on the right to report it.',
            status: 'error',
            tag: ['interact'],
          })
          return
        }

        if (!rpcNode) {
          useNotificationsStore.getState().addNotification({
            id: v4(),
            title: 'Interacting with this network is currently not feasible.',
            time: format(new Date(), 'KK:mm aa'),
            date: format(new Date(), 'MMM dd'),
            description: 'Please try again later or use the feedback tool on the right to report it.',
            status: 'error',
            tag: ['interact'],
          })
          return
        }

        const data = `${selector}${serializedBody.slice(2)}`
        switch (invokeData.type) {
          case 'view':
          case 'pure': {
            const reqBody = {
              from,
              to,
              data,
            }

            try {
              const authToken = await fetchBeryxApiToken()
              const response = await axios.post(
                rpcNode,
                {
                  jsonrpc: '2.0',
                  method: 'eth_call',
                  params: [reqBody, 'latest'],
                  id: 1,
                },
                {
                  headers: {
                    Authorization: `Bearer ${authToken}`,
                  },
                }
              )

              setRpcResponse(response.data)
            } catch (error) {
              captureException(`Error with RPC request: ${error}`)
            }
            break
          }
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
              .on('transactionHash', function (hash: any) {
                useNotificationsStore.getState().addNotification({
                  id: v4(),
                  title: 'Your transaction just entered mempool',
                  time: format(new Date(), 'KK:mm aa'),
                  date: format(new Date(), 'MMM dd'),
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
                  id: v4(),
                  title: 'Your transaction was received',
                  time: format(new Date(), 'KK:mm aa'),
                  date: format(new Date(), 'MMM dd'),
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
                useNotificationsStore.getState().addNotification({
                  id: v4(),
                  title: 'Error: The transaction could not be done',
                  description: e.message,
                  time: format(new Date(), 'KK:mm aa'),
                  date: format(new Date(), 'MMM dd'),
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
                    id: v4(),
                    title: 'Error',
                    description: errorMessage,
                    time: format(new Date(), 'KK:mm aa'),
                    date: format(new Date(), 'MMM dd'),
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

      if (window.ethereum && get().isConnected) {
        get().disconnectWallet()
        useNotificationsStore.getState().addNotification({
          id: v4(),
          title: 'The chain was changed through the wallet.',
          description: `${
            networkWallet
              ? `As your wallet is currently linked to the ${networkWallet.project} ${networkWallet.name} network and the application you’re using operates on the ${currentNetwork.project} ${currentNetwork.name} network, the wallet was disconnected`
              : ''
          }. To fully utilize all features, please switch the Beryx’s network to match with the one in the wallet.`,
          time: format(new Date(), 'KK:mm aa'),
          date: format(new Date(), 'MMM dd'),
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
  }))
)

/**
 * Export Metamask Wallet Store.
 * @exports
 */
export default useMetamaskWalletStore
