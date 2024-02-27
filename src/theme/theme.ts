import { ThemeOptions, createTheme, responsiveFontSizes } from '@mui/material'

import { Accordion } from './components/Accordion'
import { Alert } from './components/Alert'
import { ButtonStyles } from './components/Button'
import { CardStyles } from './components/Card'
import { ChipStyles } from './components/Chip'
import { DataGridStyle } from './components/DataGrid'
import { DividerStyle } from './components/Divider'
import { IconButton } from './components/IconButton'
import { InputStyles } from './components/Input'
import { ListItemButtonStyle } from './components/ListItemButton'
import { ListItemTextStyle } from './components/ListItemText'
import { PaperStyle } from './components/Paper'
import { ProgressStyle } from './components/Progress'
import { RadioStyle } from './components/Radio'
import { Steps } from './components/Steps'
import { SvgIcon } from './components/SvgIcon'
import { Switch } from './components/Switch'
import { TabStyle } from './components/Tab'
import { TabListStyle } from './components/TabList'
import { TablePaginationStyle } from './components/TablePagination'
import { ToggleButton } from './components/ToggleButton'
import { ToggleButtonGroup } from './components/ToggleButtonGroup'
import { Tooltip } from './components/Tooltip'
import { getTypography } from './components/Typography'
import shadows from './components/shadow'
import { darkPallete, lightPallete } from './palette'

const defaultTheme = createTheme()

const { breakpoints } = defaultTheme

/**
 * @function themeOptions
 * @description This function returns the theme options for the application.
 * @param themeName - The name of the theme.
 * @returns The theme options.
 */
const themeOptions = (themeName: string): ThemeOptions => {
  const palette = themeName === 'light' ? lightPallete : darkPallete

  const extensions = {
    editor: themeName === 'light' ? 'vs' : 'beryx-dark',
  }

  return responsiveFontSizes(
    createTheme({
      ...defaultTheme,
      palette,
      extensions,
      shape: {
        borderRadius: 6,
      },
      spacing: 8,
      shadows: shadows(themeName),
      typography: {
        ...getTypography(palette),
      },
      components: {
        ...ButtonStyles(palette),
        ...IconButton(palette),
        ...ToggleButton(palette),
        ...ToggleButtonGroup(palette),
        ...CardStyles,
        ...ChipStyles(palette),
        ...Alert(palette),
        ...Accordion(palette, breakpoints),
        ...Steps,
        ...ProgressStyle(palette),
        ...Switch(palette),
        ...Tooltip(palette),
        ...InputStyles(palette),
        ...SvgIcon,
        MuiTypography: {
          defaultProps: {
            variantMapping: {
              // Map the new variant to render a <h1> by default
              dmMono1: 'subtitle1',
              dmMono2: 'subtitle2',
            },
          },
        },
        ...TabStyle(palette),
        ...TabListStyle(palette),
        ...RadioStyle(palette),
        ...ListItemButtonStyle(palette),
        ...ListItemTextStyle(palette),
        ...DataGridStyle(palette),
        ...TablePaginationStyle(palette),
        ...PaperStyle(palette),
        ...DividerStyle(palette),
      },
    })
  )
}

/**
 * @function getThemeOptions
 * @description This function returns the theme options for the application.
 * @param theme - The name of the theme.
 * @returns The theme options.
 */
export const getThemeOptions = (theme: string) => {
  return themeOptions(theme)
}
