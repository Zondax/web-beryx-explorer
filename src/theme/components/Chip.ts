import { PaletteOptions } from '@mui/material/styles'
import { Components } from '@mui/material/styles/components'

/**
 * This function returns the styles for the Chip component.
 * @param palette - The palette options from the theme.
 * @returns The styles for the Chip component.
 */
export const ChipStyles = (palette: PaletteOptions): Components => {
  return {
    MuiChip: {
      // Styles for the root element of the Chip component
      styleOverrides: {
        root: {
          // Padding around the Chip
          padding: '0.1rem 0.25rem',
          // Rounded corners for the Chip
          borderRadius: '2rem',
          // Background color for the Chip
          backgroundColor: palette.background?.level2,
          // Text color for the Chip
          color: palette.text?.secondary,
          // Bold font for the Chip
          fontWeight: 'bold',
        },
        label: {
          // Padding on the left and right of the label
          paddingLeft: '0.5rem',
          paddingRight: '0.5rem',
        },
      },
    },
  }
}
