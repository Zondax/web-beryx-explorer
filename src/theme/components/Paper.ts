import { Components } from '@mui/material'
import { PaletteOptions } from '@mui/material/styles'

/**
 * Overrides the PaperPropsVariant to include elevationGradient
 */
declare module '@mui/material/Paper' {
  /**
   * Interface for PaperPropsVariantOverrides
   */
  interface PaperPropsVariantOverrides {
    elevationGradient: true
  }
}

/**
 * Exports the PaperStyle function
 */
export const PaperStyle = (palette: PaletteOptions): Components => {
  /**
   * Returns the MuiPaper style overrides
   */
  return {
    MuiPaper: {
      styleOverrides: {
        elevation2: {
          backgroundColor: palette.background?.level0,
          borderRadius: '8px',
          backgroundImage: 'unset',
          outline: 'none',
          border: 'solid 1px transparent',
          background:
            palette.mode === 'light'
              ? `linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)), linear-gradient(200deg, ${palette.text?.tertiary} 0%, ${palette.background?.level2} 54.17%, ${palette.text?.tertiary} 100%)`
              : `linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)), linear-gradient(200deg, ${palette.background?.level2} 0%, ${palette.background?.level1} 54.17%, ${palette.background?.level3} 100%)`,
          backgroundOrigin: 'border-box',
          backgroundClip: 'content-box, border-box',
          boxShadow: `inset 1px 1000px 1px ${palette.background?.default}`,
        },
      },
    },
  }
}
