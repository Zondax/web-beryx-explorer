import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Language, languageMap } from '@/config/config'
import { useLatestStore } from '@/store/data/latest'
import useAppSettingsStore from '@/store/ui/settings'
import { Light, Moon } from '@carbon/icons-react'
import { ExpandMore } from '@mui/icons-material'
import { Box, Grid, IconButton, MenuItem, TextField, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import FeedbackButton from 'components/Layout/components/TopBar/Buttons/FeedbackButton'

/**
 * Renders a settings panel with options for theme, currency, and language selection.
 *
 */
const SettingsPanel = ({ setIsMenuOpen }: { setIsMenuOpen: (status: boolean) => void }) => {
  const theme = useTheme()
  const { t } = useTranslation()

  const { toggleAppTheme, fiatCurrency: selectedCurrency, setFiatCurrency, language: selectedLanguage, setLanguage } = useAppSettingsStore()

  const { latestCurrencyRates } = useLatestStore()

  const handleCurrencyChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFiatCurrency(event.target.value)
    },
    [setFiatCurrency]
  )

  const handleThemeChange = useCallback(toggleAppTheme, [toggleAppTheme])

  const handleLanguageChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newLanguage = event.target.value as Language
      setLanguage(newLanguage)
    },
    [setLanguage]
  )

  const currencyMenuItems = useMemo(() => {
    if (!latestCurrencyRates || !latestCurrencyRates.length) {
      return (
        <MenuItem>
          <Typography variant={'body2'} color="text.primary">
            {t('No currencies available')}
          </Typography>
        </MenuItem>
      )
    }
    return latestCurrencyRates.map(({ currency }) => (
      <MenuItem key={`currency - ${currency}`} value={currency}>
        <Typography variant={'body2'} color="text.primary" sx={{ textTransform: 'uppercase' }}>
          {currency}
        </Typography>
      </MenuItem>
    ))
  }, [latestCurrencyRates, t])

  const languageMenuItems = useMemo(() => {
    if (Object.keys(languageMap).length) {
      return Object.keys(languageMap).map((item: string) => (
        <MenuItem key={`language - ${item}`} value={item} id={`languageItem - ${item}`}>
          <Typography variant={'body2'} color="text.primary" sx={{ textTransform: 'capitalize' }}>
            {languageMap[item as Language]}
          </Typography>
        </MenuItem>
      ))
    }
    return (
      <MenuItem>
        <Typography variant={'body2'} color="text.primary">
          {t('No languages available')}
        </Typography>
      </MenuItem>
    )
  }, [t])

  const TextFieldCurrency = useMemo(
    () => (
      <TextField
        select={Boolean(latestCurrencyRates?.length)}
        disabled={!latestCurrencyRates?.length}
        SelectProps={{ IconComponent: ExpandMore, MenuProps: { disableScrollLock: true } }}
        size="large"
        color="level1"
        name="currency"
        value={latestCurrencyRates?.length ? selectedCurrency : ''}
        onChange={handleCurrencyChange}
        sx={{
          minWidth: '9rem',
          width: '9rem',
        }}
      >
        {currencyMenuItems}
      </TextField>
    ),
    [latestCurrencyRates, selectedCurrency, handleCurrencyChange, currencyMenuItems]
  )

  const TextFieldLanguage = useMemo(
    () => (
      <TextField
        id="language-selector"
        select
        SelectProps={{
          IconComponent: ExpandMore,
          MenuProps: { disableScrollLock: true, PaperProps: { sx: { maxHeight: 400 } } },
        }}
        size="large"
        color="level1"
        name="language"
        value={selectedLanguage}
        onChange={handleLanguageChange}
        sx={{
          minWidth: '9rem',
          width: '9rem',
        }}
      >
        {languageMenuItems}
      </TextField>
    ),
    [selectedLanguage, handleLanguageChange, languageMenuItems]
  )

  const ThemeToggle = useMemo(() => {
    return (
      <IconButton
        className="sunSettingAnimationContainer"
        color="info"
        size="large"
        id={'topbar-theme-button'}
        onClick={handleThemeChange}
        sx={{
          position: 'relative',
          overflow: 'hidden',
          zIndex: 10000,
          '&:hover': {
            backgroundColor: theme.palette.background.opposite.level1,
            transition: 'background-color 0.35s 0.3s ease-in-out',
            '& svg': {
              color: theme.palette.text.opposite.primary,
              transition: 'color 0.35s 0.3s ease-in-out',
            },
          },
        }}
      >
        <Box className="sunSetting" sx={{ position: 'absolute', top: '100%', left: 0, width: '100%', height: '100%' }}>
          <Box
            sx={{
              position: 'absolute',
              top: '-100%',
              left: '0%',
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {theme.palette.mode === 'light' ? <Light /> : <Moon />}
          </Box>
        </Box>

        <Box className="sunRising" sx={{ position: 'absolute', top: '100%', left: 0, width: '100%', height: '100%' }}>
          <Box
            sx={{
              position: 'absolute',
              top: '0%',
              left: '-100%',
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              transform: 'rotate(-90deg)',
            }}
          >
            {theme.palette.mode === 'light' ? <Moon /> : <Light />}
          </Box>
        </Box>
      </IconButton>
    )
  }, [handleThemeChange, theme.palette.background.opposite.level1, theme.palette.mode, theme.palette.text.opposite.primary])

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
  }, [setIsMenuOpen])

  return (
    <Grid
      container
      sx={{
        padding: '2rem 0 2rem 0',
      }}
      spacing={'0.5rem'}
    >
      <Grid
        item
        xs={12}
        sx={{
          display: 'flex',
          gap: '0.5rem',
          alignItems: 'center',
          justifyContent: 'center',
          height: 'fit-content',
        }}
      >
        {TextFieldLanguage}
        {TextFieldCurrency}
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          display: 'flex',
          gap: '0.5rem',
          justifyContent: 'center',
        }}
      >
        <FeedbackButton buttonSize="large" prevAction={closeMenu} />
        {ThemeToggle}
      </Grid>
    </Grid>
  )
}

export default SettingsPanel
