import { Components } from '@mui/material'
import { PaletteOptions } from '@mui/material/styles'

/**
 * ProgressStyle is a function that returns a style object for MuiCircularProgress component.
 * The style object includes variants and styleOverrides properties.
 *
 * @param theme - The theme object from @mui/material/styles.
 * @returns - The style object for MuiCircularProgress component.
 */
export const progressStyles = (theme: PaletteOptions): Components => {
  return {
    MuiCircularProgress: {
      variants: [
        {
          props: { color: 'inherit' },
          style: {
            color: theme.mode === 'light' ? '#606269' : '#73777D', //text2
          },
        },
        {
          props: { size: 'small' },
          style: {
            width: 12,
          },
        },
        {
          props: { size: 'medium' },
          style: {
            width: 24,
          },
        },
        {
          props: { size: 'large' },
          style: {
            width: 32,
          },
        },
      ],
      styleOverrides: {
        root: {
          animation: '$spin 2s linear infinite',
          '&.MuiCircularProgress-indeterminate': {
            animation: '$rotate 1s linear infinite',
          },
          disableShrink: false,
        },
        colorSecondary: {
          color: theme.mode === 'light' ? '#2A2C35' : '#E2E4EC', //text1
        },
      },
    },
  }
}
