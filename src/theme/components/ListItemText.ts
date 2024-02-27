import { Components } from '@mui/material'
import { PaletteOptions } from '@mui/material/styles'

import { getTypography } from './Typography'

/**
 * This function returns the styles for the ListItemText component.
 * @param palette - The palette options from the theme.
 * @returns The styles for the ListItemText component.
 */
export const ListItemTextStyle = (palette: PaletteOptions): Components => {
  return {
    MuiListItemText: {
      styleOverrides: {
        root: {},
        primary: {
          ...getTypography(palette).body1,
        },
        secondary: {
          ...getTypography(palette).body2,
          fontWeight: 500,
        },
      },
    },
  }
}
