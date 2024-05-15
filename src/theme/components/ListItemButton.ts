import { Components, Palette } from '@mui/material'

/**
 * This function returns the styles for the ListItemButton component.
 * @param palette - The palette options from the theme.
 * @returns The styles for the ListItemButton component.
 */
export const listItemButtonStyles = (palette: Palette): Components => {
  return {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          marginTop: '0.5rem',
          borderRadius: '4px',
          padding: '0.25rem 1.25rem 0.25rem 1rem',
          '& svg path': {
            fill: palette.text?.secondary,
          },
          '&.Mui-selected': {
            backgroundColor: palette.background?.level2,
            '& .MuiTypography-root': {
              color: palette.text?.primary,
            },
            ':hover': {
              backgroundColor: palette.background?.level2,
            },
            '& svg path': {
              fill: palette.text?.primary,
            },
          },
          ':hover': {
            backgroundColor: palette.background?.level2,
          },
        },
      },
    },
  }
}
