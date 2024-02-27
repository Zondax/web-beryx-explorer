import { Components } from '@mui/material'
import { PaletteOptions } from '@mui/material/styles'

/**
 * This module extends the PaperPropsVariantOverrides interface to include a new variant 'elevationGradient'.
 */
declare module '@mui/material/Paper' {
  /**
   * Interface for PaperPropsVariantOverrides.
   * @property elevationGradient - A new variant for the Paper component.
   */
  interface PaperPropsVariantOverrides {
    elevationGradient: true
  }
}

/**
 * This function returns the styles for the Divider component.
 * @param palette - The palette options from the theme.
 * @returns The styles for the Divider component.
 */
export const DividerStyle = (palette: PaletteOptions): Components => {
  return {
    MuiDivider: {
      styleOverrides: {
        light: {
          borderImage:
            palette.mode === 'light'
              ? `linear-gradient(45deg, rgba(0,0,0,0) 0%, ${palette.text?.tertiary} 30%, ${palette.text?.tertiary} 70%, rgba(0,0,0,0) 100%)`
              : `linear-gradient(45deg, rgba(0,0,0,0) 0%, ${palette.background?.level3} 30%, ${palette.background?.level3} 70%, rgba(0,0,0,0) 100%)`,
          borderImageSlice: 1,
        },
      },
    },
  }
}
