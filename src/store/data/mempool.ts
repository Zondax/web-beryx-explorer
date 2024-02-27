import { debounce } from 'lodash'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { FrequencyType } from '@/config/config'
import { NetworkType } from '@/config/networks'

import { useAppSettingsStore } from '../ui/settings'

export const DEBOUNCE_TIME = 300

/**
 * TransactionData
 */
export interface TransactionData {
  first_seen: string
  last_seen: string
  height?: number
  deleted_at: string
  nonce: number
  amount: string
  gas_fee_cap: number
  gas_premium: number
  gas_limit: number
  method_name: string
  method: number
  tx_cid: string
  tx_from: string
  tx_to: string
  deleted: boolean
}

/**
 * DetailsProps
 * @property numberOfItems - The numberOfItems property.
 */
export interface DetailsProps {
  numberOfItems?: string
}

export interface TxTypesProps {
  min: number
  max: number
  total: number
  average: number
}

/**
 * Statistics Data Props
 */
export interface StatisticsDataProps {
  avg_confirmation_time: number
  avg_fee_cap: number
  avg_fee_premium: number
  avg_gas_limit: number
  max_confirmation_time: number
  max_fee_cap: number
  max_fee_premium: number
  max_gas_limit: number
  min_confirmation_time: number
  min_fee_cap: number
  min_fee_premium: number
  min_gas_limit: number
  timestamp: string
  tx_types: { [key: string]: TxTypesProps }
}

export type StatsFrequency = 'current' | 'previous_day' | 'previous_hour' | 'previous_week'

export const statsFrequencyMapped: { [key in StatsFrequency]: FrequencyType } = {
  current: 'hourly',
  previous_hour: 'hourly',
  previous_day: 'daily',
  previous_week: 'weekly',
}

/**
 * StatisticsProps
 * @property current - The current statistics.
 * @property previous_day - The previous_day statistics.
 * @property previous_hour - The previous_hour statistics.
 * @property previous_week - The previous_week statistics.
 */
export type StatisticsProps = {
  [key in StatsFrequency]: StatisticsDataProps
}

export type SnaphotData = TransactionData[]

/**
 * MempoolState
 * @property transactions - transactions
 * @property details - details
 * @property lastUpdateTimestamp - The lastUpdateTimestamp property.
 * @property loading - The loading property.
 */
interface MempoolState {
  transactions: TransactionData[]
  details: DetailsProps
  statistics: { data?: StatisticsProps; loading: boolean }
  lastUpdateTimestamp: number | undefined
  loading: boolean
}

const InitialState: MempoolState = {
  transactions: [],
  details: {
    numberOfItems: undefined,
  },
  statistics: { data: undefined, loading: true },
  lastUpdateTimestamp: undefined,
  loading: true, // Warning: Changing the logic of this flag might affect TransactionOverview component
}

/**
 * MempoolActions
 * @property addItem - Function to add items to the store.
 * @property updateItem - Function to update items from the store (change the status from Mempool to Pending).
 * @property removeItem - Function to remove items from the store.
 * @property updateSnapshot - Function to update the store with new snapshot items.
 * @property clear - Function to clear the store.
 * @property setDetails - Function to set the details of the store.
 */
interface MempoolActions {
  addItem: (item: TransactionData, network?: NetworkType) => void
  updateItem: (item: TransactionData, network?: NetworkType) => void
  removeItem: (item: TransactionData, network?: NetworkType) => void
  updateSnapshot: (snapshot: SnaphotData, network?: NetworkType) => void
  reset: () => void
  setDetails: (details: DetailsProps) => void
  setStatistics: (statistics: any, network?: NetworkType) => void
}

/**
 * @function useMempoolStore
 * @description This function creates a store for mempool data.
 * @returns The mempool store.
 */
export const useMempoolStore = create<MempoolState & MempoolActions>()(
  immer(set => ({
    ...InitialState,
    // Function to add items to the store
    addItem: debounce((item: TransactionData, network?: NetworkType) => {
      // Validate the network
      if (network?.uniqueId !== useAppSettingsStore.getState().network?.uniqueId) {
        return
      }
      // Zustand add item
      set(state => {
        const sortedSnapshot = [...state.transactions, item]
        sortedSnapshot.sort((a, b) => {
          const timestampA = new Date(a.first_seen).getTime()
          const timestampB = new Date(b.first_seen).getTime()
          const amountA = parseFloat(a.amount)
          const amountB = parseFloat(b.amount)
          if (timestampA === timestampB) {
            return amountB - amountA
          }
          return timestampB - timestampA
        })
        return { transactions: sortedSnapshot }
      })
    }, DEBOUNCE_TIME),

    // Function to update items from the store (change the status from Mempool to Pending)
    updateItem: debounce((item: TransactionData, network?: NetworkType) => {
      // Validate the network
      if (network?.uniqueId !== useAppSettingsStore.getState().network?.uniqueId) {
        return
      }
      // Zustand update item
      set(state => ({
        transactions: state.transactions.map(tx => {
          if (tx.tx_cid === item.tx_cid) {
            return item
          }
          return tx
        }),
        loading: false,
      }))
    }, DEBOUNCE_TIME),
    // Function to remove items from the store
    removeItem: debounce((item: TransactionData, network?: NetworkType) => {
      // Validate the network
      if (network?.uniqueId !== useAppSettingsStore.getState().network?.uniqueId) {
        return
      }
      // Zustand remove item
      set(state => ({
        transactions: state.transactions.filter(tx => tx.tx_cid !== item.tx_cid),
        loading: false,
      }))
    }, DEBOUNCE_TIME),

    // Function to update the store with new snapshot items
    updateSnapshot: (snapshot: SnaphotData, network?: NetworkType) => {
      // Validate the network
      if (network?.uniqueId !== useAppSettingsStore.getState().network?.uniqueId) {
        return
      }
      // Zustand add snapshot
      const sortedSnapshot = [...snapshot]
      sortedSnapshot.sort((a, b) => {
        const timestampA = new Date(a.first_seen).getTime()
        const timestampB = new Date(b.first_seen).getTime()
        const amountA = parseFloat(a.amount)
        const amountB = parseFloat(b.amount)
        if (timestampA === timestampB) {
          return amountB - amountA
        }
        return timestampB - timestampA
      })
      set(() => ({
        transactions: sortedSnapshot,
        loading: false,
      }))
    },
    reset: () => {
      set({ ...InitialState })
    },
    setDetails: (details: DetailsProps) => {
      set({ details })
    },
    setStatistics: (statistics: { statistics: StatisticsProps }, network?: NetworkType) => {
      // Validate the network
      if (network?.uniqueId !== useAppSettingsStore.getState().network?.uniqueId) {
        return
      }
      set({ statistics: { data: statistics.statistics, loading: false } })
    },
  }))
)
