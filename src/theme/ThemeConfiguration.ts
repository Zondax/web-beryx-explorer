// @refresh reset
import { createTheme, responsiveFontSizes } from '@mui/material'
import { ThemeOptions } from '@mui/material/styles'

import { accordionStyles } from './components/Accordion'
import { alertStyles } from './components/Alert'
import { autocompleteStyles } from './components/Autocomplete'
import { badgeStyles } from './components/Badge'
import { buttonStyles } from './components/Button'
import { cardStyles } from './components/Card'
import { chipStyles } from './components/Chip'
import { dataGridStyles } from './components/DataGrid'
import { dividerStyles } from './components/Divider'
import { iconButtonStyles } from './components/IconButton'
import { inputStyles } from './components/Input'
import { listItemButtonStyles } from './components/ListItemButton'
import { listItemTextStyles } from './components/ListItemText'
import { menuStyles } from './components/Menu'
import { menuItemStyles } from './components/MenuItem'
import { paperStyles } from './components/Paper'
import { progressStyles } from './components/Progress'
import { radioStyles } from './components/Radio'
import { skeletonStyles } from './components/Skeleton'
import { stepsStyles } from './components/Steps'
import { svgIconStyles } from './components/SvgIcon'
import { switchStyles } from './components/Switch'
import { tabStyles } from './components/Tab'
import { tabListStyles } from './components/TabList'
import { tablePaginationStyles } from './components/TablePagination'
import { toggleButtonStyles } from './components/ToggleButton'
import { toggleButtonGroupStyles } from './components/ToggleButtonGroup'
import { tooltipStyles } from './components/Tooltip'
import { typographyStyles } from './components/Typography'
import shadows from './components/shadow'
import { darkPallete, lightPallete } from './palette'

const defaultTheme = createTheme()

const { breakpoints } = defaultTheme

/**
 * @hook useCustomTheme
 * @description This hook returns the theme options for the application, combining theme settings within.
 * @param themeName - The name of the theme.
 * @returns The theme options.
 */
export const useCustomTheme = (themeName: string): ThemeOptions => {
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
        ...typographyStyles(palette),
      },
      components: {
        MuiTypography: {
          defaultProps: {
            variantMapping: {
              // Map the new variant to render a <h1> by default
              dmMono1: 'subtitle1',
              dmMono2: 'subtitle2',
            },
          },
        },
        ...skeletonStyles(palette),
        ...buttonStyles(palette),
        ...badgeStyles(palette),
        ...iconButtonStyles(palette),
        ...toggleButtonStyles(palette),
        ...toggleButtonGroupStyles(palette),
        ...cardStyles(palette),
        ...chipStyles(palette),
        ...alertStyles(palette),
        ...accordionStyles(palette, breakpoints),
        ...stepsStyles,
        ...progressStyles(palette),
        ...switchStyles(palette),
        ...tooltipStyles(palette),
        ...inputStyles(palette),
        ...svgIconStyles,
        ...menuStyles(palette),
        ...menuItemStyles(palette),
        ...tabStyles(palette),
        ...tabListStyles(),
        ...radioStyles(palette),
        ...listItemButtonStyles(palette),
        ...listItemTextStyles(palette),
        ...dataGridStyles(palette),
        ...tablePaginationStyles(palette),
        ...paperStyles(palette),
        ...dividerStyles(palette),
        ...autocompleteStyles(palette),
      },
    })
  )
}
