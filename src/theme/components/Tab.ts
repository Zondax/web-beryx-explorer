import { Components } from '@mui/material'
import { PaletteOptions } from '@mui/material/styles'

/**
 * TabStyle is a function that returns a style object for MuiTab component.
 * @param palette - The palette options from MUI theme.
 * @returns - The style object for MuiTab component.
 */
export const TabStyle = (palette: PaletteOptions): Components => {
  return {
    MuiTab: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: '20',
          padding: '0 0.65rem !important',
          minHeight: '1rem',
          minWidth: 'fit-content',
          height: '100%',
          background: palette.background?.level1,
          ':hover': { backgroundColor: palette.background?.level2 },
          '& .MuiTouchRipple-root': { borderRadius: '6px' },
          '&.Mui-disabled': { color: palette.text?.secondary, opacity: 0.2 },
          '&.Mui-selected': {
            zIndex: '21',
            color: palette.text?.primary,
            background: palette.tableParentRowBackground,
            border: palette.background?.level2,
          },
        },
      },
    },
  }
}
