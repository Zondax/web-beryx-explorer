import { Components, PaletteOptions } from '@mui/material'

/**
 * This function returns the styles for the IconButton component.
 * @param palette - The palette options from the theme.
 * @returns The styles for the IconButton component.
 */
export const IconButton = (palette: PaletteOptions): Components => {
  return {
    MuiIconButton: {
      styleOverrides: {
        root: {},
        colorPrimary: {
          color: palette.text?.secondary,
          borderRadius: '8px',
          backgroundColor: palette.background?.level1,
          ':hover': {
            backgroundColor: palette.background?.level2,
          },
          height: 'fit-content',
          padding: '0.5rem 1rem',
          '&>*': {
            pointerEvents: 'none',
          },
        },
        colorInfo: {
          fontSize: '12px',
          color: palette.text?.secondary,
          borderRadius: '4px',
          padding: '6px 4px',
          height: 'fit-content',
          transition: 'color 100ms ease-out',
          ':hover': {
            color: palette.text?.primary,
            backgroundColor: `${palette.text?.primary}11`,
          },
        },
        colorWarning: {
          fontSize: '12px',
          borderRadius: '4px',
          padding: '6px 4px',
          height: 'fit-content',
          transition: 'color 100ms ease-out',
          ':hover': {
            backgroundColor: `${palette.warning}11`,
          },
        },
      },
    },
  }
}
