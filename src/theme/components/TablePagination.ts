import { Components } from '@mui/material'
import { Palette } from '@mui/material/styles'

/**
 * @constant TablePaginationStyle
 * @description This constant represents the styles for the MuiTablePagination component.
 * @type {Components}
 * @param palette - The palette options.
 * @returns The styles for the MuiTablePagination component.
 */
export const tablePaginationStyles = (palette: Palette): Components => {
  return {
    MuiTablePagination: {
      /**
       * @property styleOverrides
       * @description This property represents the style overrides for the MuiTablePagination component.
       */
      styleOverrides: {
        root: {
          '& .MuiPaginationItem-root': {
            backgroundColor: palette.background?.level0,
            '&:hover': {
              backgroundColor: palette.background?.level2,
            },
            '&.Mui-selected': {
              backgroundColor: palette.background?.level2,
            },
          },
        },
      },
    },
  }
}
