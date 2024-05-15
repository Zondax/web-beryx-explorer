import { Components, Palette } from '@mui/material'

/**
 * This function returns the styles for the Button component.
 * @param palette - The color palette of the application.
 * @returns The styles for the Button component.
 */
export const menuItemStyles = (palette: Palette): Components => {
  return {
    MuiMenuItem: {
      // Style overrides for the Menu component
      styleOverrides: {
        root: {
          fontSize: '1rem',
          fontWeight: 'normal',
          borderRadius: '4px',
          color: palette.text?.primary,
          backgroundColor: 'transparent',
          minHeight: '40px',

          '&:not(:last-child)': {
            marginBottom: '0.25rem',
          },
          '&:hover': {
            backgroundColor: palette.background?.level2,
            color: palette.text?.primary,
          },
          '&.Mui-selected': {
            backgroundColor: palette.background?.level3,
            color: palette.text?.primary,
            '&:hover': {
              backgroundColor: palette.background?.level2,
            },
          },
        },
      },
    },
  }
}
