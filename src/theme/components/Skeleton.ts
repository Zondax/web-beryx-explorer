import { Components } from '@mui/material'
import { Palette } from '@mui/material/styles'

/**
 * @function Skeleton
 * @description This function returns a style object for MuiSkeleton component.
 * @returns - The style object for MuiSkeleton component.
 */
export const skeletonStyles = (palette: Palette): Components => {
  return {
    MuiSkeleton: {
      styleOverrides: {
        root: {
          backgroundColor: palette.background.level2,
        },
        rounded: {
          borderRadius: '6px',
        },
      },
    },
  }
}
