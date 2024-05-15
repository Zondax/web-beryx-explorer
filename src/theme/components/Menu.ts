import { Components, Palette } from '@mui/material'

/**
 * This function returns the styles for the Button component.
 * @param palette - The color palette of the application.
 * @returns The styles for the Button component.
 */
export const menuStyles = (palette: Palette): Components => {
  return {
    MuiMenu: {
      // Style overrides for the Menu component
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 'bold',
          boxShadow: 'none',
          display: 'flex',
          top: '0.25rem',
          '&:hover': {
            boxShadow: 'none',
          },
          '& .MuiMenu-paper': {
            padding: '0.5rem !important',
            background: palette.background?.level0,
            border: `1px solid ${palette.border?.level0}`,
            height: 'fit-content',
            borderRadius: '6px',
            boxShadow: 'none',
          },

          '&.Mui-disabled': {
            opacity: 0.7,
            background: palette.tableParentRowBackground,
          },
        },
        paper: {
          color: `${palette.text?.primary} !important`,
          '& .MuiMenu-list': {
            padding: '0 0', // Adjust padding for the menu list
          },
          '& .MuiMenuItem-root': {
            fontSize: '1rem',
            fontWeight: 'normal',
            borderRadius: '4px',
            color: palette.text?.primary,
            backgroundColor: 'transparent',
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
        list: {
          padding: '8px 0', // Adjust padding for the list
        },
      },
    },
  }
}
