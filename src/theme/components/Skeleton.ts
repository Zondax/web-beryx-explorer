import { Components } from '@mui/material'

/**
 * @function Skeleton
 * @description This function returns a style object for MuiSkeleton component.
 * @returns - The style object for MuiSkeleton component.
 */
export const Skeleton = (): Components => {
  return {
    MuiSkeleton: {
      styleOverrides: {
        root: {},
        rounded: {
          borderRadius: '4px',
        },
      },
    },
  }
}
