import { Components } from '@mui/material'
import { PaletteOptions } from '@mui/material/styles'

/**
 * @constant ToggleButton
 * @description This constant represents the styles for the MuiToggleButton component.
 * @type {Components}
 * @param palette - The palette options.
 * @returns The styles for the MuiToggleButton component.
 */
export const ToggleButton = (palette: PaletteOptions): Components => {
  return {
    MuiToggleButton: {
      /**
       * @property styleOverrides
       * @description This property represents the style overrides for the MuiToggleButton component.
       */
      styleOverrides: {
        root: {
          borderRadius: '4px',
          color: palette.text?.secondary,
          '&:hover': {
            backgroundColor: palette.background?.level3,
          },
          '&.Mui-selected': {
            color: palette.mode === 'dark' ? palette.text?.primary : palette.background?.level0,
            backgroundColor: palette.mode === 'dark' ? palette.tableParentRowBackgroundFocused : palette.text?.primary,
            border: 'none',
            '&:hover': {
              backgroundColor: palette.mode === 'dark' ? palette.tableParentRowBackgroundFocused : palette.text?.primary,
            },
          },
          '&.Mui-disabled': {
            opacity: '0.25',
            pointerEvents: 'auto',
            '&:hover': {
              backgroundColor: 'transparent',
            },
          },
        },
      },
    },
  }
}
