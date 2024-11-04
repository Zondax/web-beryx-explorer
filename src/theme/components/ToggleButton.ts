import { Components } from '@mui/material'
import { Palette } from '@mui/material/styles'

/**
 * @constant ToggleButton
 * @description This constant represents the styles for the MuiToggleButton component.
 * @type {Components}
 * @param palette - The palette options.
 * @returns The styles for the MuiToggleButton component.
 */
export const toggleButtonStyles = (palette: Palette): Components => {
  return {
    MuiToggleButton: {
      variants: [
        {
          props: { size: 'small' },
          style: {
            borderRadius: '6px',
            padding: '0.2rem 0.5rem',
            height: '28px',
          },
        },
        {
          props: { size: 'medium' },
          style: {
            borderRadius: '8px',
            padding: '0.25rem 0.5rem',
            height: '34px',
          },
        },
      ],
      /**
       * @property styleOverrides
       * @description This property represents the style overrides for the MuiToggleButton component.
       */
      styleOverrides: {
        root: {
          color: palette.text?.secondary,
          backgroundColor: palette.background?.level0,

          '&:hover': {
            backgroundColor: palette.background?.level2,
          },
          '&.Mui-selected': {
            color: palette.mode === 'light' ? palette.text?.opposite.primary : palette.text?.primary,
            backgroundColor: palette.primary.main,
            '&:hover': {
              backgroundColor: palette.primary.dark,
            },
          },
          '&.Mui-disabled': {
            opacity: '0.25',
            pointerEvents: 'auto',
            backgroundColor: palette.background?.level0,
            color: palette.text?.secondary,
            '&.Mui-selected': {
              backgroundColor: palette.background.level0,
              color: palette.text?.secondary,
            },
          },
        },
      },
    },
  }
}
