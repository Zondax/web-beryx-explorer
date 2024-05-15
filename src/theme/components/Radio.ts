import { Components } from '@mui/material'
import { Palette } from '@mui/material/styles'

/**
 * @function RadioStyle
 * @description This function returns a style object for MuiRadio component.
 * @param palette - The theme object from @mui/material/styles.
 * @returns - The style object for MuiRadio component.
 */
export const radioStyles = (palette: Palette): Components => {
  return {
    MuiRadio: {
      styleOverrides: {
        root: {
          '& .MuiSvgIcon-root': {
            color: palette.text?.primary,
          },
        },
      },
    },
  }
}
