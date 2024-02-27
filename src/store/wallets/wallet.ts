/**
 * @file This file defines the wallet store which is used to manage wallet related state.
 * It includes the wallet state, actions to manipulate the state and utility functions to update the state.
 * The wallet state includes information about the connected wallet such as the wallet address, balance, chain, transactions etc.
 * The actions include functions to connect the wallet, gather wallet data, disconnect the wallet, invoke contract, change chain, change address and set open wallet.
 * The utility functions are used to update the Ethereum address, balance and transactions of the wallet.
 */
import BigNumber from 'bignumber.js'
import { format } from 'date-fns-tz'
import { v4 } from 'uuid'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { fetchAccountBalance, fetchSearchType, fetchTransactionsByAddress } from '@/api-client/beryx'
import { amountFormat } from '@/config/config'
import { NetworkType } from '@/config/networks'
import { ObjectType } from '@/routes/parsing'
import { useNotificationsStore } from '@/store/ui/notifications'
import { formatBalance } from '@/utils/format'
import { decodeInput } from '@/utils/inputDetection'
import { captureException } from '@sentry/nextjs'
import { Transaction } from '@zondax/beryx/dist/filecoin/api/types'
import { FilEthAddress } from '@zondax/izari-filecoin/address'

import { RunMethodFormValues } from '../../../components/views/ResultsView/ContractView/RunMethod/config'
import { useAppSettingsStore } from '../ui/settings'
import useMetamaskWalletStore from './metamask'

/**
 * TransactionData
 * @property to - The address to which the transaction is made.
 */
export type TransactionData = {
  to: string
}

/**
 * WalletProvider - The wallet provider.
 * @property METAMASK - The Metamask wallet provider.
 * @property VIEW_ONLY - The view only wallet provider.
 */
export enum WalletProvider {
  METAMASK = 'metamask',
  VIEW_ONLY = 'view_only',
}

/**
 * @WalletInfoProps
 * @property filAddr - The Filecoin address of the wallet.
 * @property ethAddr - The Ethereum address of the wallet.
 * @property balance - The balance of the wallet.
 * @property network - The chain of the wallet.
 * @property incomingTransactions - The incoming transactions of the wallet.
 * @property outgoingTransactions - The outgoing transactions of the wallet.
 */
interface WalletInfoProps {
  filAddr: string | undefined
  ethAddr: string | undefined
  balance: string | undefined
  network: NetworkType | undefined
  incomingTransactions: Transaction[] | undefined
  outgoingTransactions: Transaction[] | undefined
}

/**
 * WalletState
 * @property isConnected - Whether the wallet is connected or not.
 * @property isLoading - Whether the wallet is loading or not.
 * @property provider - The wallet provider.
 * @property walletInfo - The wallet information.
 * @property error - The error message.
 * @property openWallet - Whether the wallet is open or not.
 */
interface WalletState {
  isConnected: boolean
  isLoading: boolean
  provider: WalletProvider | undefined
  walletInfo: WalletInfoProps
  error: string | undefined
  openWallet: boolean
}

/**
 * Initial state of the wallet.
 * InitialState
 * @property isConnected - Initial connection status of the wallet.
 * @property isLoading - Initial loading status of the wallet.
 * @property provider - Initial provider of the wallet.
 * @property walletInfo - Initial wallet information.
 * @property error - Initial error message.
 * @property openWallet - Initial open status of the wallet.
 */
const InitialState: WalletState = {
  isConnected: false,
  isLoading: false,
  provider: undefined,
  walletInfo: {
    filAddr: undefined,
    ethAddr: undefined,
    balance: undefined,
    network: undefined,
    incomingTransactions: undefined,
    outgoingTransactions: undefined,
  },
  error: undefined,
  openWallet: false,
}

/**
 * WalletActions
 * @property connectWallet - Function to connect the wallet.
 * @property gatherData - Function to gather wallet data.
 * @property disconnectWallet - Function to disconnect the wallet.
 * @property invokeContract - Function to invoke contract.
 * @property changeChain - Function to change the chain of the wallet.
 * @property changeAddress - Function to change the address of the wallet.
 * @property setOpenWallet - Function to set the wallet open or not.
 */
interface WalletActions {
  connectWallet: (provider: WalletProvider, address?: string, network?: NetworkType) => Promise<any | undefined>
  gatherData: (all?: boolean, wait?: boolean) => Promise<any | undefined>
  disconnectWallet: () => void
  invokeContract: (invokeData: RunMethodFormValues, txData: TransactionData) => Promise<void>
  setNetwork: (chain: NetworkType | undefined) => void
  changeAddress: (filAddr: string | undefined, ethAddr: string | undefined) => void
  setOpenWallet: (value: boolean) => void
}

type SetStateFunction = (arg: any) => void

/**
 * Function to update the Ethereum address of the wallet.
 * @param filAddr - The Filecoin address of the wallet.
 * @param set - The state setting function.
 */
const updateEthAddr = (filAddr: string, set: SetStateFunction) => {
  try {
    const filEthAddr = FilEthAddress.fromString(filAddr)
    set((s: any) => ({ ...s, walletInfo: { ...s.walletInfo, ethAddr: filEthAddr.toEthAddressHex(true) } }))
  } catch (e) {
    set((s: any) => ({ ...s, walletInfo: { ...s.walletInfo, ethAddr: undefined } }))
  }
}

/**
 * Function to update the balance of the wallet.
 * @param chain - The chain of the wallet.
 * @param filAddr - The Filecoin address of the wallet.
 * @param balance - The balance of the wallet.
 * @param all - Whether to update all the balances or not.
 * @param set - The state setting function.
 */
const updateBalance = async (filAddr: string, chain: any, balance: string | undefined, all: boolean, set: SetStateFunction) => {
  if (balance && !all) {
    return
  }

  const balanceResp = await fetchAccountBalance(filAddr, chain as NetworkType)
  if (balanceResp === 'error') {
    return
  }

  const amount = BigNumber(formatBalance(balanceResp.balances))
  const formatCondition = amount.toFixed().split('.')[0].length > 8 || amount.eq(0)
  const formatedBalance = amount.toFormat(formatCondition ? 2 : 4, amountFormat)

  set((s: any) => ({
    ...s,
    walletInfo: { ...s.walletInfo, balance: formatedBalance },
  }))
}

/**
 * Function to update the transactions of the wallet.
 * @param filAddr - The Filecoin address of the wallet.
 * @param network - The network of the wallet.
 * @param incomingTransactions - The incoming transactions of the wallet.
 * @param outgoingTransactions - The outgoing transactions of the wallet.
 * @param all - Whether to update all the transactions or not.
 * @param set - The state setting function.
 */
const updateTransactions = async (
  filAddr: string,
  network: NetworkType,
  incomingTransactions: Transaction[] | undefined,
  outgoingTransactions: Transaction[] | undefined,
  all: boolean,
  set: SetStateFunction
) => {
  if ((incomingTransactions || outgoingTransactions) && !all) {
    return
  }
  const incomingTxs = await fetchTransactionsByAddress(filAddr, network, 'receiver')
  const outgoingTxs = await fetchTransactionsByAddress(filAddr, network, 'sender')

  if (incomingTxs !== 'error') {
    set((s: any) => ({ ...s, walletInfo: { ...s.walletInfo, incomingTransactions: incomingTxs.transactions } }))
  }

  if (outgoingTxs !== 'error') {
    set((s: any) => ({ ...s, walletInfo: { ...s.walletInfo, outgoingTransactions: outgoingTxs.transactions } }))
  }
}

/**
 * The wallet store which is used to manage wallet related state.
 * It includes the wallet state, actions to manipulate the state and utility functions to update the state.
 */
const useWalletStore = create<WalletState & WalletActions>()(
  immer((set, get) => ({
    ...InitialState,
    connectWallet: async (provider: WalletProvider, address?: string, network?: NetworkType) => {
      set(s => ({ ...s, isLoading: true, error: undefined }))

      switch (provider) {
        case WalletProvider.METAMASK: {
          const res = await useMetamaskWalletStore.getState().connectWallet()

          if (res?.hasMetamaskExtension === false) {
            if (window !== null) {
              const win = window.open('https://metamask.io/download/', '_blank', 'noopener')
              win?.focus()
            }
          }

          if (res?.connectionError) {
            set(s => ({ ...s, isLoading: false }))
            return
          }
          const currentNetwork = useAppSettingsStore.getState().network
          if (res.network.uniqueId !== useAppSettingsStore.getState().network.uniqueId) {
            useNotificationsStore.getState().addNotification({
              id: v4(),
              title: 'Network not matching.',
              description: `Your wallet is currently linked to the ${res.network.project} ${res.network.name} network, however, the application you’re using operates on the ${currentNetwork.project} ${currentNetwork.name} network. To fully utilize all features, please switch your wallet’s network to match with the one in Beryx.`,
              time: format(new Date(), 'KK:mm aa'),
              date: format(new Date(), 'MMM dd'),
              status: 'error',
              tag: ['Wallet'],
            })
            return
          }

          if (res?.filAddr) {
            set(s => ({ ...s, walletInfo: { ...s.walletInfo, filAddr: res.filAddr } }))
          }
          if (res?.ethAddr) {
            set(s => ({ ...s, walletInfo: { ...s.walletInfo, ethAddr: res.ethAddr } }))
          }
          if (res?.balance) {
            set(s => ({ ...s, walletInfo: { ...s.walletInfo, balance: res.balance } }))
          }
          if (res?.network) {
            set(s => ({ ...s, walletInfo: { ...s.walletInfo, network: res.network } }))
          }
          set(s => ({ ...s, isConnected: true }))

          break
        }
        case WalletProvider.VIEW_ONLY: {
          if (!address || !network) {
            useNotificationsStore.getState().addNotification({
              id: v4(),
              title: 'Wallet Connection Error',
              description: 'No address or network.',
              time: format(new Date(), 'KK:mm aa'),
              date: format(new Date(), 'MMM dd'),
              status: 'error',
              tag: ['wallet'],
            })
            return
          }
          const searchTypeResult = await fetchSearchType(address, network)

          if (!searchTypeResult || searchTypeResult.length === 0) {
            set(s => ({ ...s, isLoading: false, error: 'Invalid address' }))
            return
          }

          const decodeRes = await decodeInput(address, searchTypeResult[0])
          if (decodeRes.objectType !== ObjectType.ADDRESS) {
            set(s => ({ ...s, isLoading: false, error: 'Invalid address' }))
            return
          }

          set(s => ({
            ...s,
            isConnected: true,
            walletInfo: { ...s.walletInfo, filAddr: decodeRes.filForm, ethAddress: decodeRes.ethForm, network },
          }))

          break
        }
        default: {
          set(s => ({ ...s, isLoading: false }))
          captureException(new Error(`Unknown wallet provider: ${provider}`))
          return
        }
      }
      await get().gatherData()
      set(s => ({ ...s, isLoading: false, provider }))
    },
    disconnectWallet: () => {
      set({
        isConnected: false,
        provider: undefined,
        walletInfo: {
          filAddr: undefined,
          ethAddr: undefined,
          balance: undefined,
          network: undefined,
          incomingTransactions: undefined,
          outgoingTransactions: undefined,
        },
      })
    },
    gatherData: async (wait?: boolean, all?: boolean) => {
      const state = get()

      set(s => ({ ...s, isLoading: true }))

      if (wait) {
        await new Promise(resolve => setTimeout(resolve, 1000))
      }

      const { walletInfo } = state
      if (!walletInfo) {
        set(s => ({ ...s, isLoading: false }))
        return
      }

      const { filAddr, ethAddr, incomingTransactions, outgoingTransactions, network, balance } = walletInfo

      if (!filAddr) {
        set(s => ({ ...s, isLoading: false }))
        return
      }

      if (!ethAddr) {
        updateEthAddr(filAddr, set)
      }

      if (network) {
        await updateBalance(filAddr, network, balance, all ?? false, set)
        await updateTransactions(filAddr, network, incomingTransactions, outgoingTransactions, all ?? false, set)
      }

      set(s => ({ ...s, isLoading: false }))
    },
    invokeContract: async (invokeData: RunMethodFormValues, txData: TransactionData) => {
      const provider = get().provider

      if (provider === WalletProvider.METAMASK) {
        await useMetamaskWalletStore.getState().invokeContract(invokeData, txData)
      }
    },
    setNetwork: (chain: NetworkType | undefined) => {
      set(s => ({ ...s, walletInfo: { ...s.walletInfo, chain } }))
      get().gatherData(true, true)
    },
    changeAddress: (filAddr: string | undefined, ethAddr: string | undefined) => {
      set(s => ({ ...s, walletInfo: { ...s.walletInfo, filAddr, ethAddr } }))
      get().gatherData(true, true)
    },
    setOpenWallet: (value: boolean) => {
      set(s => ({ ...s, openWallet: value }))
    },
  }))
)

export default useWalletStore
