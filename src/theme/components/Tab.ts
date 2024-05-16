import { Components } from '@mui/material'
import { Palette } from '@mui/material/styles'

/**
 * TabStyle is a function that returns a style object for MuiTab component.
 * @param palette - The palette options from MUI theme.
 * @returns - The style object for MuiTab component.
 */
export const tabStyles = (palette: Palette): Components => {
  return {
    MuiTab: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: '20',
          padding: '0 0.65rem !important',
          minHeight: '28px',
          minWidth: 'fit-content',
          height: '100%',
          color: palette.text?.secondary,
          background: 'transparent',
          ':hover': { backgroundColor: palette.background?.level2 },
          '& .MuiTouchRipple-root': { borderRadius: '6px' },
          '&.Mui-disabled': { color: palette.text?.secondary, opacity: 0.2 },
          '&.Mui-selected': {
            zIndex: '21',
            color: palette.text?.primary,
            background: palette.background?.level2,
            border: palette.background?.level2,
          },
        },
      },
    },
  }
}
