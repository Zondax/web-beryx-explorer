import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Language, languageMap } from '@/config/config'
import { useLatestStore } from '@/store/data/latest'
import { useAppSettingsStore } from '@/store/ui/settings'
import { ExpandMore } from '@mui/icons-material'
import { Unstable_Grid2 as Grid2, MenuItem, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { PAGES } from '../../../Layout/components/Sidebar'

/**
 * Interface for MobileMenuProps
 */
interface MobileMenuProps {
  hasSearchBar?: boolean
  activeTab?: PAGES
  tabsHeight?: number
}

/**
 * Renders a settings panel with options for theme, currency, and language selection.
 *
 */
const SettingsPanel = ({ tabsHeight }: MobileMenuProps) => {
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

  const handleThemeChange = useCallback(
    (event: React.MouseEvent<HTMLElement>, nextView: string) => {
      // if the user clicks in the current mode, we don't change it
      if (nextView) {
        toggleAppTheme()
      }
    },
    [toggleAppTheme]
  )

  const handleLanguageChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newLanguage = event.target.value as Language
      setLanguage(newLanguage)
    },
    [setLanguage]
  )

  /**
   * Creates a Typography component with the given text.
   * @param text - The text to be displayed in the Typography component.
   * @returns A Typography component with the given text.
   */
  const createOptionTitleTypography = (text: string) => (
    <Typography variant="body1" color="text.primary">
      {t(text)}
    </Typography>
  )

  const ThemeTypography = createOptionTitleTypography('Theme')
  const CurrencyTypography = createOptionTitleTypography('Currency')
  const LanguageTypography = createOptionTitleTypography('Language')

  const ToggleButtonGroupComponent = (
    <ToggleButtonGroup orientation="horizontal" value={theme.palette.mode} exclusive onChange={handleThemeChange} sx={{ height: '2rem' }}>
      <ToggleButton value="light" aria-label="light" sx={{ textTransform: 'none', color: theme.palette.text.primary }}>
        {t('Light')}
      </ToggleButton>
      <ToggleButton value="dark" aria-label="dark" sx={{ textTransform: 'none', color: theme.palette.text.primary }}>
        {t('Dark')}
      </ToggleButton>
    </ToggleButtonGroup>
  )

  const currencyMenuItems = useMemo(() => {
    if (!latestCurrencyRates || !latestCurrencyRates.length) {
      return (
        <MenuItem>
          <Typography variant={'body2'} color="text.primary">
            No currencies available
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
  }, [latestCurrencyRates])

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
          No languages available
        </Typography>
      </MenuItem>
    )
  }, [])

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
          minWidth: '12rem',
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
          minWidth: '12rem',
        }}
      >
        {languageMenuItems}
      </TextField>
    ),
    [selectedLanguage, handleLanguageChange, languageMenuItems]
  )

  /**
   * GridOptionContainer is a functional component that takes children as a parameter.
   * It returns a Grid2 component with specific styling and the children inside it.
   *
   * @param children - The elements to be displayed inside the Grid2 component.
   * @returns A Grid2 component with specific styling and the children inside it.
   */
  const GridOptionContainer = (children: React.ReactNode) => (
    <Grid2
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {children}
    </Grid2>
  )

  return (
    <Grid2
      sx={{
        padding: '0',
        paddingTop: '1rem',
        display: 'flex',
        justifyContent: 'center',
        maxHeight: `calc(100% - ${tabsHeight}px)`,
        height: 'fit-content',
      }}
    >
      <Grid2
        container
        bgcolor="background.level1"
        sx={{
          alignItems: 'flex-start',
          zIndex: 200,
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          borderRadius: theme.spacing(1),
        }}
      >
        <Grid2
          sx={{
            zIndex: 210,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding: '1rem 1rem',
            gap: '1rem',
            alignItems: 'center',
          }}
        >
          {GridOptionContainer(
            <>
              {ThemeTypography}
              {ToggleButtonGroupComponent}
            </>
          )}
          {GridOptionContainer(
            <>
              {CurrencyTypography}
              {TextFieldCurrency}
            </>
          )}
          {GridOptionContainer(
            <>
              {LanguageTypography}
              {TextFieldLanguage}
            </>
          )}
        </Grid2>
      </Grid2>
    </Grid2>
  )
}

export default SettingsPanel
