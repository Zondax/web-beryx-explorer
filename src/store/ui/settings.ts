import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { Language, Timezone } from '@/config/config'
import { NetworkType, Networks } from '@/config/networks'
import { captureException } from '@sentry/nextjs'

/**
 * Type for the application theme.
 */
export type AppTheme = 'dark' | 'light'

const CURRENT_VERSION = 2

/**
 * Interface for the application setting state.
 */
interface AppSettingState {
  version: number
  theme: AppTheme
  network: NetworkType
  fiatCurrency: string
  language: Language
  dateTimezone: Timezone
  hasFeedbackButton: boolean
}

/**
 * Initial state for the application setting.
 */
const InitialState: AppSettingState = {
  version: CURRENT_VERSION,
  theme: 'dark',
  network: Networks.mainnet,
  fiatCurrency: 'usd',
  language: 'en',
  dateTimezone: 'utc',
  hasFeedbackButton: false,
}

/**
 * Interface for the application setting actions.
 */
interface AppSettingActions {
  reset: () => void
  toggleAppTheme: () => void
  setNetwork: (network: NetworkType) => void
  setFiatCurrency: (currency: string) => void
  setLanguage: (language: Language) => void
  setDateTimezone: (dateTimezone: Timezone) => void
  setHasFeedbackButton: (hasFeedbackButton: boolean) => void
}

/**
 * Options for the Zustand store.
 */
const storeOptions = {
  name: 'beryx-explorer-app-settings',
}

/**
 * Zustand store for the application settings.
 * It includes the initial state and actions.
 */
const useAppSettingsStore = create<AppSettingState & AppSettingActions>()(
  immer(
    persist(
      set => ({
        ...InitialState,
        // actions
        toggleAppTheme: () =>
          set(s => {
            s.theme = s.theme === 'light' ? 'dark' : 'light'
          }),
        setNetwork: (network: NetworkType) => {
          if (network === undefined) {
            captureException(new Error('Attempted to set undefined network'))
            return
          }
          set(s => {
            s.network = network
          })
        },
        setFiatCurrency: (currency: string) =>
          set(s => {
            s.fiatCurrency = currency
          }),
        setLanguage: (language: Language) =>
          set(s => {
            s.language = language
          }),
        setDateTimezone: (dateTimezone: Timezone) =>
          set(s => {
            s.dateTimezone = dateTimezone
          }),
        reset: () => {
          set(InitialState)
        },
        setHasFeedbackButton: (hasFeedbackButton: boolean) => {
          set(s => {
            s.hasFeedbackButton = hasFeedbackButton
          })
        },
      }),
      {
        ...storeOptions,
        onRehydrateStorage: () => state => {
          // Check if the persisted state is outdated
          if (state?.version !== CURRENT_VERSION) {
            // If the state is outdated, reset the state to the initial state
            state?.reset()
          }
        },
      }
    )
  )
)

export default useAppSettingsStore
