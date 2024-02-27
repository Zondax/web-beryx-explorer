import { Components } from '@mui/material'
import { PaletteOptions } from '@mui/material/styles'

/**
 * @constant ToggleButtonGroup
 * @description This constant represents the styles for the MuiToggleButtonGroup component.
 * @param palette - The palette options.
 * @returns The styles for the MuiToggleButtonGroup component.
 */
export const ToggleButtonGroup = (palette: PaletteOptions): Components => {
  return {
    MuiToggleButtonGroup: {
      /**
       * @property styleOverrides
       * @description This property represents the style overrides for the MuiToggleButtonGroup component.
       */
      styleOverrides: {
        root: {
          color: palette.text?.secondary,
          backgroundColor: palette.background?.level2,
          borderRadius: '4px',
          border: 'none',
          '&.Mui-disabled': {
            opacity: 0.25,
          },
        },
        grouped: {
          '&:first-of-type': {
            border: 'none',
          },
          '&:not(:first-of-type)': {
            border: 'none',
          },
          '&:last-of-type': {
            border: 'none',
          },
        },
      },
    },
  }
}
