import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { CurrencyRate, Tipset } from '@/api-client/nats.types'
import { NetworkType } from '@/config/networks'
import { confirmDistinctItems } from '@/utils/arrays'
import { Transaction } from '@zondax/beryx/dist/filecoin/api/types'

import useAppSettingsStore from '../ui/settings'

const CURRENT_VERSION = 1

interface LatestState {
  version: number

  latestTransactions: Transaction[]
  latestContracts: Transaction[]
  latestTipsets: Tipset[]
  latestCurrencyRates: CurrencyRate[]
}

const InitialState: LatestState = {
  version: CURRENT_VERSION,
  latestTransactions: [],
  latestContracts: [],
  /**
   * Latest canonical and no canonical tipsets.
   */
  latestTipsets: [],
  latestCurrencyRates: [],
}

interface LatestActions {
  setNatsLatestTransactions: (transactions: Transaction[], network?: NetworkType) => void
  setNatsLatestAllTipsets: (tipsets: Tipset[], canonical: boolean) => void
  setNatsLatestTipsets: (tipsets: Tipset[], network?: NetworkType) => void
  setNatsLatestCanonicalTipsets: (tipsets: Tipset[], network?: NetworkType) => void
  setNatsLatestContracts: (contracts: Transaction[], network?: NetworkType) => void
  setNatsLatestCurrencyRates: (currencyRates: CurrencyRate[]) => void
  reset: (newState: {
    latestTransactions?: Transaction[]
    latestContracts?: Transaction[]
    latestTipsets?: Tipset[]
    latestCurrencyRates?: CurrencyRate[]
  }) => void
}

/**
 * Options for the Zustand store.
 */
const storeOptions = {
  name: 'beryx-explorer-latest-items',
}
export const useLatestStore = create<LatestState & LatestActions>()(
  immer(
    persist(
      (set, get) => ({
        ...InitialState,
        setNatsLatestTransactions: (transactions: Transaction[], network?: NetworkType) => {
          // Validate the network
          if (network?.uniqueId !== useAppSettingsStore.getState().network?.uniqueId) {
            return
          }
          set(state => {
            state.latestTransactions = transactions
          })
        },
        setNatsLatestTipsets: (tipsets: Tipset[], network?: NetworkType) => {
          // Validate the network
          if (network?.uniqueId !== useAppSettingsStore.getState().network?.uniqueId) {
            return
          }
          get().setNatsLatestAllTipsets(tipsets, false)
        },
        /**
         * Merge the latest canonical tipsets and the latest tipsets.
         */
        setNatsLatestAllTipsets: (tipsets: Tipset[], canonical: boolean) => {
          const currentTipsets: Tipset[] = get().latestTipsets
          const newTipsets = tipsets.map((elem: Tipset) => ({ ...elem, canonical }))

          // if the latestAllTipsets is empty, the received tipsets are setted
          if (currentTipsets.length === 0) {
            set(state => {
              state.latestTipsets = newTipsets
            })
            return
          }

          const noCanonicalTipsets = !canonical ? newTipsets : currentTipsets.filter(elem => !elem.canonical)
          const canonicalTipsets = canonical ? newTipsets : currentTipsets.filter(elem => elem.canonical)
          let canonicalIndex = 0
          let merged: Tipset[] = []

          /**
           * This function compares the heights of the canonical and non-canonical tipsets.
           * It adds the tipset with the higher height to the merged array.
           * @param elem - The current element being compared.
           */
          const compareHeights = (elem: Tipset) => {
            // if the no canonical height is higher, we add it
            if (!canonicalTipsets[canonicalIndex] || elem.height > canonicalTipsets[canonicalIndex].height) {
              merged.push(elem)
              // if the no canonical height is smaller, we add the canonical tipset
            } else if (elem.height < canonicalTipsets[canonicalIndex].height) {
              merged.push(canonicalTipsets[canonicalIndex])
              canonicalIndex += 1
              compareHeights(elem)
            } else {
              // if the no canonical height is equal, we add the canonical tipset
              merged.push(canonicalTipsets[canonicalIndex])
              canonicalIndex += 1
            }
          }

          if (noCanonicalTipsets.length !== 0) {
            noCanonicalTipsets.forEach((elem: Tipset) => {
              compareHeights(elem)
            })
          }

          if (canonicalTipsets.length - 1 !== canonicalIndex) {
            merged = merged.concat(canonicalTipsets.slice(canonicalIndex))
          }

          set(state => {
            state.latestTipsets = confirmDistinctItems(merged, item => `${item.id}`)
          })
        },
        setNatsLatestCanonicalTipsets: (tipsets: Tipset[], network?: NetworkType) => {
          // Validate the network
          if (network?.uniqueId !== useAppSettingsStore.getState().network?.uniqueId) {
            return
          }
          get().setNatsLatestAllTipsets(tipsets, true)
        },
        setNatsLatestContracts: (contracts: Transaction[], network?: NetworkType) => {
          // Validate the network
          if (network?.uniqueId !== useAppSettingsStore.getState().network?.uniqueId) {
            return
          }
          set(state => {
            state.latestContracts = contracts
          })
        },
        setNatsLatestCurrencyRates: (currencyRates: CurrencyRate[]) => {
          set(state => {
            state.latestCurrencyRates = currencyRates.sort((a, b) => a.currency.localeCompare(b.currency))
          })
        },
        reset: (newState?: {
          latestTransactions?: Transaction[]
          latestContracts?: Transaction[]
          latestTipsets?: Tipset[]
          latestCurrencyRates?: CurrencyRate[]
        }) => {
          if (!newState) {
            set(InitialState)
            return
          }
          set(prev => ({ ...prev, ...newState }))
        },
      }),
      {
        ...storeOptions,
        onRehydrateStorage: () => state => {
          // Check if the persisted state is outdated
          if (state?.version !== CURRENT_VERSION) {
            // If the state is outdated, reset the state to the initial state
            state?.reset(InitialState)
          }
        },
      }
    )
  )
)
