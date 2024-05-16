import { Components } from '@mui/material'
import { Palette } from '@mui/material/styles'

import { typographyStyles } from './Typography'

/**
 * This function returns the styles for the ListItemText component.
 * @param palette - The palette options from the theme.
 * @returns The styles for the ListItemText component.
 */
export const listItemTextStyles = (palette: Palette): Components => {
  return {
    MuiListItemText: {
      styleOverrides: {
        root: {},
        primary: {
          ...typographyStyles(palette).body1,
        },
        secondary: {
          ...typographyStyles(palette).body2,
          fontWeight: 500,
        },
      },
    },
  }
}
