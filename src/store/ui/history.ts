import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { NetworkType } from '@/config/networks'
import { ObjectType } from '@/routes/parsing'

/**
 * Maximum size of the history.
 */
export const HISTORY_MAX_SIZE = 50

/**
 * Type for a history item.
 */
export interface HistoryItem {
  date: Date // date when was last searched
  network: NetworkType // calibration
  type?: ObjectType // address
  frequency: number // frequency of the item

  // This should probably be the complete URL? or the complete context of the search?
  value: string // f4...
}

/**
 * Interface for the history state.
 */
interface HistoryState {
  items: HistoryItem[]
}

/**
 * Initial state for the history.
 */
const InitialState: HistoryState = {
  items: [],
}

/**
 * Interface for the history actions.
 */
interface HistoryActions {
  addItem: (item: HistoryItem) => void
  clearHistory: () => void
}

/**
 * Options for the store.
 */
const storeOptions = {
  name: 'searchHistory-store',
}

/**
 * Hook to use the history store.
 */
export const useHistoryStore = create<HistoryState & HistoryActions>()(
  immer(
    persist(
      (set, get) => ({
        ...InitialState,
        addItem: (item: HistoryItem) => {
          let items = get().items
          const itemExists = items.some(
            historyItem =>
              historyItem.value === item.value && historyItem.network.uniqueId === item.network.uniqueId && historyItem.type === item.type
          )
          items = items.filter(
            historyItem =>
              historyItem.value !== item.value || historyItem.network.uniqueId !== item.network.uniqueId || historyItem.type !== item.type
          )
          if (itemExists) {
            item.frequency = item.frequency + 1
          }
          items.unshift(item)
          items = items.slice(0, HISTORY_MAX_SIZE)
          set({ items })
        },
        clearHistory: () => {
          const items: HistoryItem[] = []
          set({ items })
        },
      }),
      storeOptions
    )
  )
)
