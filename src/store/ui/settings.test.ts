import { act } from 'react-dom/test-utils'

import { Networks } from '@/config/networks'
import { hookHelper } from '@/helpers/jest'

import useAppSettingsStore from './settings'

describe('useAppSettingsStore', () => {
  // The initial state is returned when the function is called for the first time.
  it('should return the initial state when called for the first time', () => {
    const appSettingStore = hookHelper(useAppSettingsStore)

    expect(appSettingStore().theme).toBe('dark')
    expect(appSettingStore().network).toEqual(Networks.mainnet)
    expect(appSettingStore().fiatCurrency).toBe('usd')
    expect(appSettingStore().language).toBe('en')
    expect(appSettingStore().dateTimezone).toBe('utc')
  })

  // Verifies that the theme toggles between 'dark' and 'light' when toggleAppTheme is called.

  // The theme toggles between 'dark' and 'light' when toggleAppTheme is called.
  it('should toggle the theme when toggleAppTheme is called', () => {
    const appSettingStore = hookHelper(useAppSettingsStore)

    // Initial theme is 'dark'
    act(() => {
      expect(appSettingStore().theme).toBe('dark')
    })

    // Toggle theme to 'light'
    act(() => {
      appSettingStore().toggleAppTheme()
    })

    expect(appSettingStore().theme).toBe('light')

    // Toggle theme back to 'dark'
    act(() => {
      appSettingStore().toggleAppTheme()
    })

    expect(appSettingStore().theme).toBe('dark')
  })

  // Verifies that the network is set correctly when setNetwork is called.

  // The network is set correctly when setNetwork is called.
  it('should set the network when setNetwork is called', () => {
    const appSettingStore = hookHelper(useAppSettingsStore)
    const calibrationNetwork = Networks.calibration

    act(() => {
      appSettingStore().setNetwork(calibrationNetwork)
    })

    expect(appSettingStore().network).toEqual(calibrationNetwork)
  })

  // The fiat currency is set correctly when setFiatCurrency is called.
  it('should set the fiat currency when setFiatCurrency is called', () => {
    const appSettingStore = hookHelper(useAppSettingsStore)
    const fiatCurrency = 'eur'

    act(() => {
      appSettingStore().setFiatCurrency(fiatCurrency)
    })

    expect(appSettingStore().fiatCurrency).toBe(fiatCurrency)
  })

  // Verifies that the language is set correctly when setLanguage is called.

  // The language is set correctly when setLanguage is called.
  it('should set the language when setLanguage is called', () => {
    const appSettingStore = hookHelper(useAppSettingsStore)

    act(() => {
      // appSettingStore().reset()
      appSettingStore().setLanguage('fr')
    })

    expect(appSettingStore().language).toBe('fr')
  })

  // Verifies that the dateTimezone is set correctly when setDateTimezone is called.

  // The dateTimezone is set correctly when setDateTimezone is called.
  it('should set the dateTimezone when setDateTimezone is called', () => {
    const appSettingStore = hookHelper(useAppSettingsStore)

    act(() => {
      appSettingStore().setDateTimezone('est')
    })

    expect(appSettingStore().dateTimezone).toBe('est')
  })
})
