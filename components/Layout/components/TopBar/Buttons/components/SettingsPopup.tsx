import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Language, languageMap } from '@/config/config'
import { useLatestStore } from '@/store/data/latest'
import useAppSettingsStore from '@/store/ui/settings'
import { ExpandMore } from '@mui/icons-material'
import { Unstable_Grid2 as Grid2, MenuItem, TextField, ToggleButton, ToggleButtonGroup, Typography, useTheme } from '@mui/material'

/**
 * SettingsPopup component.
 * This component is responsible for rendering the settings popup.
 * It allows the user to change the theme, currency and language.
 */
const SettingsPopup = () => {
  const theme = useTheme()

  // Hooks to toggle theme, get and set selected currency
  const toggleTheme = useAppSettingsStore(s => s.toggleAppTheme)
  const [fiatCurrency, setFiatCurrency] = useAppSettingsStore(s => [s.fiatCurrency, s.setFiatCurrency])
  const { latestCurrencyRates } = useLatestStore()

  // Hooks for translation and local storage
  const { t } = useTranslation()

  // Hooks to get and set selected language
  const [selectedLanguage, setLanguage] = useAppSettingsStore(s => [s.language, s.setLanguage])

  const selectedCurrency = useMemo(() => {
    if (latestCurrencyRates && latestCurrencyRates.length !== 0) {
      return fiatCurrency.toLowerCase()
    }
    return ''
  }, [fiatCurrency, latestCurrencyRates])

  /**
   * handleThemeChange function.
   * This function is responsible for toggling the theme.
   */
  const handleThemeChange = useCallback(toggleTheme, [toggleTheme])

  /**
   * handleCurrencyChange function.
   * This function is responsible for setting the selected currency.
   * @param event - The event object.
   */
  const handleCurrencyChange = useCallback(
    function (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
      setFiatCurrency(event.target.value)
    },
    [setFiatCurrency]
  )

  /**
   * handleLanguageChange function.
   * This function is responsible for setting the selected language.
   * @param event - The event object.
   */
  const handleLanguageChange = useCallback(
    function (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
      setLanguage(event.target.value as Language)
    },
    [setLanguage]
  )

  /**
   * ThemeSection component.
   * This component is responsible for rendering the theme selection section.
   */
  const ThemeSection = useMemo(
    () => (
      <Grid2
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="body1" color="text.primary">
          {t('Theme')}
        </Typography>
        <ToggleButtonGroup orientation="horizontal" size="medium" value={theme.palette.mode} exclusive onChange={handleThemeChange}>
          <ToggleButton value="light" aria-label="light" sx={{ textTransform: 'none', color: theme.palette.text.primary }}>
            {t('Light')}
          </ToggleButton>
          <ToggleButton value="dark" aria-label="dark" sx={{ textTransform: 'none', color: theme.palette.text.primary }}>
            {t('Dark')}
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid2>
    ),
    [t, theme.palette.mode, handleThemeChange, theme.palette.text.primary]
  )

  /**
   * CurrencySection component.
   * This component is responsible for rendering the currency selection section.
   */
  const CurrencySection = useCallback(() => {
    const LoadingText = (
      <Typography variant="body1" color="text.primary" sx={{ minWidth: '12rem' }}>
        Loading...
      </Typography>
    )

    const CurrencySelector = (
      <TextField
        id="currency-selector"
        select
        SelectProps={{ IconComponent: ExpandMore, MenuProps: { disableScrollLock: true, PaperProps: { sx: { maxHeight: 400 } } } }}
        size="medium"
        color="level1"
        name="currency"
        value={selectedCurrency}
        onChange={handleCurrencyChange}
        sx={{
          minWidth: '12rem',
        }}
      >
        {latestCurrencyRates?.map(({ currency }) => (
          <MenuItem key={`currency - ${currency}`} value={currency} id={`currencyItem - ${currency}`}>
            <Typography variant={'body2'} color="text.primary" sx={{ textTransform: 'uppercase' }}>
              {currency}
            </Typography>
          </MenuItem>
        ))}
      </TextField>
    )

    return (
      <Grid2
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="body1" color="text.primary">
          {t('Currency')}
        </Typography>
        {!latestCurrencyRates || latestCurrencyRates.length === 0 ? LoadingText : CurrencySelector}
      </Grid2>
    )
  }, [handleCurrencyChange, latestCurrencyRates, selectedCurrency, t])

  /**
   * LanguageSection component.
   * This component is responsible for rendering the language selection section.
   */
  const LanguageSection = useCallback(
    () => (
      <Grid2
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="body1" color="text.primary">
          {t('Language')}
        </Typography>
        <TextField
          id="language-selector"
          select
          SelectProps={{
            IconComponent: ExpandMore,
            MenuProps: { disableScrollLock: true, PaperProps: { sx: { maxHeight: 400 } } },
          }}
          size="medium"
          color="level1"
          name="language"
          value={selectedLanguage}
          onChange={handleLanguageChange}
          sx={{
            minWidth: '12rem',
          }}
        >
          {Object.keys(languageMap).map((item: string) => (
            <MenuItem key={`language - ${item}`} value={item} id={`languageItem - ${item}`}>
              <Typography variant={'body2'} color="text.primary" sx={{ textTransform: 'capitalize' }}>
                {languageMap[item as Language]}
              </Typography>
            </MenuItem>
          ))}
        </TextField>
      </Grid2>
    ),
    [handleLanguageChange, selectedLanguage, t]
  )

  return (
    <Grid2
      container
      bgcolor="background.level0"
      sx={{
        alignItems: 'flex-start',
        zIndex: 200,
        display: 'flex',
        flexDirection: 'column',
        width: '25rem',
        minHeight: '10rem',
      }}
    >
      <Grid2
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '0.5rem 0.5rem',
          gap: '1rem',
          alignItems: 'center',
        }}
      >
        {/* {ThemeSection} */}
        <CurrencySection />
        <LanguageSection />
      </Grid2>
    </Grid2>
  )
}

export default SettingsPopup
