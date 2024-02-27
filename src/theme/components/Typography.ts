import { PaletteOptions } from '@mui/material'
import { TypographyOptions } from '@mui/material/styles/createTypography'

/**
 * @description This interface extends the TypographyPropsVariantOverrides interface with additional properties.
 */
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    captionMono: true
    dmMono1: true
    dmMono2: true
  }
}

/**
 * @function getTypography
 * @description This function returns the typography options.
 * @param palette - The palette options.
 * @returns The typography options.
 */
export const getTypography = (palette: PaletteOptions): TypographyOptions => ({
  fontFamily: [
    '-apple-system',
    'Sora',
    'DM Sans',
    'Roboto',
    'Helvetica Neue',
    'Arial',
    'sans-serif',
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
  ].join(','),
  h1: {
    fontFamily: ['Sora'].join(','),
    fontWeight: 500,
    fontSize: '3.5rem',
    lineHeight: 1.2,
    letterSpacing: '-0.00833em',
    color: palette.text?.primary,
  },
  h2: {
    fontFamily: ['Sora'].join(','),
    fontWeight: 500,
    fontSize: '2.125rem',
    lineHeight: 1.2,
    letterSpacing: '0em',
    color: palette.text?.primary,
  },
  h3: {
    fontFamily: ['Sora'].join(','),
    fontWeight: 600,
    fontSize: '1.75rem',
    lineHeight: 1.2,
    letterSpacing: '0.00735em',
    color: palette.text?.primary,
  },
  h4: {
    fontFamily: ['Sora'].join(','),
    fontWeight: 500,
    fontSize: '1.5rem',
    lineHeight: 1.2,
    letterSpacing: '0em',
    color: palette.text?.primary,
  },
  h5: {
    fontWeight: 600,
    fontSize: '1rem',
    lineHeight: 1.2,
    letterSpacing: '0.0075em',
    color: palette.text?.primary,
  },
  h6: {
    fontWeight: 400,
    fontSize: '0.8rem',
    lineHeight: 1.2,
    letterSpacing: '0.0075em',
    color: palette.text?.primary,
  },
  subtitle1: {
    fontWeight: 400,
    fontSize: '1rem',
    lineHeight: 1.2,
    letterSpacing: '0.00938em',
    color: palette.text?.secondary,
  },
  subtitle2: {
    fontWeight: 400,
    fontSize: '0.8rem',
    lineHeight: 1.2,
    letterSpacing: '0.00714em',
    color: palette.text?.secondary,
  },
  body1: {
    fontWeight: 400,
    fontSize: '1rem',
    lineHeight: 1.5,
    letterSpacing: '0.00938em',
    color: palette.text?.secondary,
  },
  body2: {
    fontWeight: 400,
    fontSize: '0.875rem',
    lineHeight: 1.5,
    letterSpacing: '0.00714em',
    color: palette.text?.secondary,
  },
  caption: {
    fontWeight: 400,
    fontSize: '0.9rem',
    lineHeight: 1.66,
    letterSpacing: '0.00714em',
    color: palette.text?.primary,
  },
  captionMono: {
    fontFamily: ['B612 Mono'].join(','),
    fontWeight: 400,
    fontSize: '0.875rem',
    lineHeight: 1.66,
    letterSpacing: '-0.00914em',
    color: palette.text?.primary,
  },
  button: {
    fontWeight: '500 !important',
    fontSize: '0.875rem',
    lineHeight: 1.2,
    letterSpacing: '0.00938em',
    textTransform: 'none',
  },
  dmMono1: {
    fontFamily: ['B612 Mono'].join(','),
    fontWeight: 400,
    fontSize: '1rem',
    lineHeight: 1.2,
    letterSpacing: '0.00938em',
    color: palette.text?.primary,
    textShadow: '0px 4px 20px rgba(0, 0, 0, 0.34)',
  },
  dmMono2: {
    fontFamily: ['B612 Mono'].join(','),
    fontWeight: 300,
    fontSize: '1rem',
    lineHeight: 1.2,
    letterSpacing: '0.00938em',
    color: palette.text?.primary,
    textShadow: '0px 4px 20px rgba(0, 0, 0, 0.34)',
  },
})
