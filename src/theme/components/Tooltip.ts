import { Components } from '@mui/material'
import { Palette } from '@mui/material/styles'

import { boxShadow } from '../hoverEffect'

/**
 * @constant Tooltip
 * @description This constant represents the styles for the MuiTooltip component.
 * @param palette - The palette options.
 * @returns The styles for the MuiTooltip component.
 */
export const tooltipStyles = (palette: Palette): Components => {
  return {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: '0.8rem',
          borderRadius: '6px',
          padding: '8px 12px',
          backgroundColor: palette.background?.opposite.level1,
          color: palette.text?.opposite.primary,
          borderColor: palette.background?.opposite.level1,
          boxShadow: boxShadow(palette.mode || 'light'),
        },
        arrow: {
          color: palette.background?.opposite.level1,
        },
      },
    },
  }
}
