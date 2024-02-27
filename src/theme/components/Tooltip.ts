import { Components } from '@mui/material'
import { PaletteOptions } from '@mui/material/styles'

/**
 * @constant Tooltip
 * @description This constant represents the styles for the MuiTooltip component.
 * @param palette - The palette options.
 * @returns The styles for the MuiTooltip component.
 */
export const Tooltip = (palette: PaletteOptions): Components => {
  return {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: '0.8rem',
          borderRadius: 8,
          padding: '8px 12px',
          backgroundColor: palette.background?.level2,
          color: palette.mode === 'light' ? palette.text?.secondary : palette.text?.primary,
          border: `1px solid ${palette.tableBorder}`,
          boxShadow:
            palette.mode === 'dark'
              ? 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.18) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.1) 0px -3px 5px'
              : 'rgba(0, 0, 2, 0.125)0px 20px 55px -5px, rgba(0, 0, 2, 0.012) 0px -12px 30px, rgba(0, 0, 2, 0.058) 0px 4px 6px, rgba(0, 0, 2, 0.027) 0px 12px 13px, rgba(0, 0, 0, 0.05) 0px -3px 5px',
        },
        arrow: {
          color: palette.background?.level2,
        },
      },
    },
  }
}
