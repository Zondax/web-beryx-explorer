import { Components } from '@mui/material'
import { Palette } from '@mui/material/styles'

/**
 * @constant ToggleButtonGroup
 * @description This constant represents the styles for the MuiToggleButtonGroup component.
 * @param palette - The palette options.
 * @returns The styles for the MuiToggleButtonGroup component.
 */
export const toggleButtonGroupStyles = (palette: Palette): Components => {
  return {
    MuiToggleButtonGroup: {
      /**
       * @property styleOverrides
       * @description This property represents the style overrides for the MuiToggleButtonGroup component.
       */
      styleOverrides: {
        root: {
          color: palette.text?.secondary,
          '&.Mui-disabled': {
            opacity: 0.25,
          },
        },
        grouped: {
          border: `1px solid ${palette.border?.level0}`,
          '&.Mui-disabled': {
            border: `1px solid ${palette.border?.level2}`,
          },
          '&:first-of-type': {
            borderRight: `1px solid ${palette.border?.level0}`,
            '&.Mui-disabled': {
              borderRight: `1px solid ${palette.border?.level2}`,
            },
          },
          '&:not(:first-of-type)': {
            border: `1px solid ${palette.border?.level0}`,
            '&.Mui-disabled': {
              border: `1px solid ${palette.border?.level2}`,
            },
          },
          '&:last-of-type': {
            borderLeft: `1px solid ${palette.border?.level0}`,
            '&.Mui-disabled': {
              borderLeft: `1px solid ${palette.border?.level2}`,
            },
          },
        },
      },
    },
  }
}
