import { CSSProperties } from 'react'

import '@mui/material/styles'

/**
 * ParamsThemeOptions
 * @property editor - The editor theme option.
 */
export interface ExtendedThemeOptions {
  editor: string
}

declare module '@mui/material/styles' {
  interface Theme {
    extensions: ExtendedThemeOptions
    // Add more parameters here
  }

  // allow configuration using `createTheme`
  interface ThemeOptions {
    extensions: ExtendedThemeOptions
    // Add more parameters here
  }

  interface TypographyVariants {
    captionMono: CSSProperties
    dmMono1: CSSProperties
    dmMono2: CSSProperties
  }

  /**
   * TypographyVariantsOptions
   * @property captionMono - The captionMono typography variant option.
   * @property dmMono1 - The dmMono1 typography variant option.
   * @property dmMono2 - The dmMono2 typography variant option.
   */
  interface TypographyVariantsOptions {
    captionMono: CSSProperties
    dmMono1?: CSSProperties
    dmMono2?: CSSProperties
  }
}

/**
 * TypographyPropsVariantOverrides
 * @property captionMono - The captionMono typography prop variant override.
 * @property dmMono1 - The dmMono1 typography prop variant override.
 * @property dmMono2 - The dmMono2 typography prop variant override.
 */
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    captionMono: true
    dmMono1: true
    dmMono2: true
  }
}

/**
 * This module declaration is extending the ButtonPropsVariantOverrides interface
 * from the @mui/material/Button module to include an inputType property.
 */
declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    inputType: true
    link: true
  }
}

/**
 * This module declaration is extending the IconButtonPropsVariantOverrides interface
 * from the @mui/material/IconButton module to include an outlined property.
 */
declare module '@mui/material/IconButton' {
  interface IconButtonPropsVariantOverrides {
    outlined: true
  }

  interface IconButtonPropsSizeOverrides {
    xsmall: true
  }
}
