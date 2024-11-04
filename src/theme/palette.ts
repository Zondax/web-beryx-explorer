import { PaletteMode } from '@mui/material'
import { Palette, PaletteColor } from '@mui/material/styles'
import { PaletteAugmentColorOptions } from '@mui/material/styles/createPalette'

/**
 * @interface TypeBackground
 * @description This interface extends the TypeBackground interface from @mui/material/styles with additional color levels and a primary color.
 */
declare module '@mui/material/styles' {
  interface TypeBackground {
    level0: string
    level1: string
    level2: string
    level3: string
    opposite: {
      level0: string
      level1: string
      level2: string
      level3: string
    }
  }

  /**
   * @interface TypeText
   * @description This interface extends the TypeText interface from @mui/material/styles with a tertiary color.
   */
  interface TypeText {
    tertiary: string
    opposite: {
      primary: string
      secondary: string
      tertiary: string
      disabled: string
    }
  }

  /**
   * @interface Palette
   * @description This interface extends the Palette interface from @mui/material/styles with additional color levels, time, main, mainDark, table colors, and gradient1.
   */
  interface Palette {
    level0: string
    level1: string
    level2: string
    level3: string
    time: string
    main: string
    error: PaletteColor
    mainDark: string
    tableBorder: string
    tableParentRowBackground: string
    tableParentRowBackgroundFocused: string
    tableChildrenRowBorder: string
    tableChildRowBackgroundFocused: string
    background: TypeBackground
    border: {
      level0: string
      level1: string
      level2: string
      level3: string
    }
    gradient1: {
      level1: string
      level2: string
      level3: string
      level4: string
      level5: string
      level6: string
      level7: string
    }
  }
}

/**
 * @constant gradient1
 * @description This constant defines the color levels for gradient1.
 */
const gradient1 = {
  level1: '#0E88E7', // Deep blue
  level2: '#0D9BE8', // Vibrant azure
  level3: '#0CAEE9', // Bright sky blue
  level4: '#0BC2EA', // Soft cerulean
  level5: '#0AD6EB', // Light cerulean
  level6: '#09EAEC', // Pale cyan
  level7: '#08F0EE', // Soft turquoise
  level8: '#07F6F0', // Light turquoise
  level9: '#06FCF2', // Aqua
  level10: '#05FFFF', // Pure cyan
  level11: '#04FFFF', // Cyan with a hint of green
  level12: '#03FFFF', // Bright cyan
  level13: '#02FFFF', // Brighter cyan
  level14: '#01FFFF', // Brightest cyan
  level15: '#00FFFF', // Absolute cyan
  level16: '#00F6F4', // Cyan leaning towards blue
  level17: '#00ECE8', // Deeper turquoise
  level18: '#00E2DC', // Deep turquoise
  level19: '#00D8D0', // Darker turquoise
  level20: '#00CEC4', // Darkest turquoise
}

/**
 * @constant lightPallete
 * @description This constant defines the color palette for light mode.
 */
export const lightPallete: Palette = {
  mode: 'light' as PaletteMode,
  common: {
    black: '#000',
    white: '#fff',
  },
  primary: {
    main: '#0090FF',
    light: '#407AEB',
    dark: '#0076D1',
    contrastText: '#fff',
  },
  secondary: {
    main: '#FF6B23',
    light: '#B6B8BE',
    dark: '#CECFD3',
    contrastText: 'rgba(0, 0, 0, 0.87)',
  },
  error: {
    main: '#de1135',
    light: '#ffe1de',
    dark: '#D32F2F',
    contrastText: '#fff',
  },
  warning: {
    main: '#c46e00',
    light: '#fbe5b6',
    dark: '#F57C00',
    contrastText: '#fff',
  },
  info: {
    main: '#D0D5E3',
    light: '#566A88',
    dark: '#edf1f7',
    contrastText: '#D0D5E3',
  },
  success: {
    main: '#009a51',
    light: '#d3efda',
    dark: '#2E7D32',
    contrastText: '#fff',
  },
  grey: {
    50: '#F4F5F6',
    100: '#DDDEE1',
    200: '#B6B8BE',
    300: '#A3A5AB',
    400: '#806AC4',
    500: '#3651DC',
    600: '#293DAB',
    700: '#24282F',
    800: '#1A1B1F',
    900: '#000000',
    A100: '#D0D5E3',
    A200: '#566A88',
    A400: '#3252C7',
    A700: '#2B2D84',
  },
  action: {
    active: '#3252C7',
    hover: '#3252C7',
    hoverOpacity: 0.08,
    selected: '#3252C7',
    selectedOpacity: 0.16,
    disabled: '#3252C7',
    disabledOpacity: 0.38,
    disabledBackground: '#3252C7',
    focus: '#3252C7',
    focusOpacity: 0.24,
    activatedOpacity: 0.24,
  },
  text: {
    primary: '#14161C',
    secondary: '#4F5969',
    tertiary: '#ABB1C3',
    disabled: '#ABB1C3',
    opposite: {
      primary: '#FFFFFF',
      secondary: '#4F5969',
      tertiary: '#ABB1C3',
      disabled: '#ABB1C3',
    },
  },
  divider: 'rgba(0, 0, 0, 0.12)',
  background: {
    paper: '#DDDEE1',
    default: '#F2F4FA',
    level0: '#FFFFFF',
    level1: '#F2F4FA',
    level2: '#E9EBF5',
    level3: '#D6D8E5',
    opposite: {
      level0: '#F2F4FA',
      level1: '#000000',
      level2: '#E9EBF5',
      level3: '#FFFFFF',
    },
  },
  border: {
    level0: '#DDE4EF',
    level1: '#DCE2EF',
    level2: '#CBD3E4',
    level3: '#A3A5AB',
  },
  level0: '#F4F5F6',
  level1: '#DDDEE1',
  level2: '#B6B8BE',
  level3: '#A3A5AB',
  time: '#806AC4',
  main: '#3651DC',
  mainDark: '#293DAB',
  tableBorder: '#DCE2EF',
  tableParentRowBackground: '#F2F4FA',
  tableParentRowBackgroundFocused: '#C7CBD2',
  tableChildrenRowBorder: '#F2F4FA',
  tableChildRowBackgroundFocused: '#C7CBD2',
  gradient1,
  contrastThreshold: 3,
  tonalOffset: 0.2,
  getContrastText(_color: string) {
    return '#fff'
  },
  augmentColor(_options: PaletteAugmentColorOptions) {
    return {
      main: '#3252C7',
    } as PaletteColor
  },
}

/**
 * @constant darkPallete
 * @description This constant defines the color palette for dark mode.
 */
export const darkPallete: Palette = {
  mode: 'dark' as PaletteMode,
  common: {
    black: '#000', // Inverted for dark mode
    white: '#fff', // Inverted for dark mode
  },
  primary: {
    main: '#0E88E7', // Lighter shade for better visibility in dark mode
    light: '#3252C7', // Adjusted for dark mode contrast
    dark: '#0063B0', // Darker shade for depth in dark mode
    contrastText: '#000', // Inverted for dark mode
  },
  secondary: {
    main: '#FFA040', // Lighter and warmer for dark mode
    light: '#FFB366', // Adjusted for dark mode contrast
    dark: '#C75B00', // Darker to maintain depth in dark mode
    contrastText: 'rgba(255, 255, 255, 0.87)', // Enhanced for dark mode
  },
  error: {
    main: '#ff6659', // Lighter red for better visibility in dark mode
    light: '#ff887a', // Adjusted for dark mode contrast
    dark: '#d32f2f', // Darker to maintain depth in dark mode
    contrastText: '#000', // Inverted for dark mode
  },
  warning: {
    main: '#FFB300', // Adjusted for visibility in dark mode
    light: '#876500', // Lighter for contrast against dark backgrounds
    dark: '#FF6F00', // Darker to maintain depth
    contrastText: '#000', // Inverted for dark mode
  },
  info: {
    main: '#66BBFF', // Lighter for visibility in dark mode
    light: '#88CEFF', // Adjusted for dark mode contrast
    dark: '#005BBB', // Darker to maintain depth in dark mode
    contrastText: '#000', // Inverted for dark mode
  },
  success: {
    main: '#66E066', // Lighter green for better visibility in dark mode
    light: '#376E37', // Adjusted for dark mode contrast
    dark: '#008800', // Darker to maintain depth in dark mode
    contrastText: '#000', // Inverted for dark mode
  },
  grey: {
    50: '#24282F', // Adjusted for dark mode backgrounds
    100: '#1A1B1F', // Darker shades for dark mode
    200: '#121317', // Further adjusted for dark mode contrast
    300: '#0B0C0E', // Darker to maintain depth
    400: '#08090A', // Darker still for nuanced dark mode design
    500: '#060708', // Almost black for deep dark mode elements
    600: '#040506', // Darker for contrast
    700: '#020304', // Near black for depth
    800: '#010203', // Deeper for dark mode aesthetics
    900: '#000000', // Pure black for contrast and depth
    A100: '#566A88', // Adjusted for dark mode
    A200: '#3252C7', // Primary main color for consistency
    A400: '#2B2D84', // Darker for depth
    A700: '#1D1F63', // Adjusted for dark mode depth
  },
  action: {
    active: '#FF6B23', // Secondary main color for visibility
    hover: '#FF6B23', // Consistent with active state
    hoverOpacity: 0.08, // Adjusted for dark mode
    selected: '#FF6B23', // Consistent with active state
    selectedOpacity: 0.16, // Adjusted for dark mode
    disabled: '#A3A5AB', // Grey 300 for visibility
    disabledOpacity: 0.38, // Standard opacity for disabled state
    disabledBackground: '#24282F', // Grey 50 adjusted for dark mode
    focus: '#FF6B23', // Consistent with active state
    focusOpacity: 0.24, // Adjusted for dark mode
    activatedOpacity: 0.24, // Adjusted for dark mode
  },
  text: {
    primary: '#f8fafc', // Inverted for dark mode
    secondary: '#cbd5e1', // Lighter for contrast against dark backgrounds
    tertiary: '#94a3b8', // Adjusted for visibility in dark mode
    disabled: '#64748b', // Grey 300 for visibility
    opposite: {
      primary: '#000000', // Inverted for dark mode
      secondary: '#4F5969', // Adjusted for dark mode contrast
      tertiary: '#ABB1C3', // Maintained for consistency
      disabled: '#ABB1C3', // Maintained for consistency
    },
  },
  divider: 'rgba(255, 255, 255, 0.12)', // Inverted for dark mode
  background: {
    paper: '#121317', // Darker for dark mode
    default: '#030712', // Darker still for main background
    level0: '#11151C', // Adjusted for dark mode
    level1: '#0A0C11', // Darker for depth
    level2: '#232733', // Further darkened for contrast
    level3: '#333847', // Near black for maximum depth
    opposite: {
      level0: '#F2F4FA', // Maintained for contrast
      level1: '#FFFFFF', // Pure white for contrast
      level2: '#E9EBF5', // Lighter for differentiation
      level3: '#DDE0EC', // Lightest for maximum contrast
    },
  },
  border: {
    level0: '#2A3240', // Darker for dark mode
    level1: '#181D27', // Adjusted for dark mode contrast
    level2: '#364052', // Darker to maintain depth
    level3: '#2A3240', // Darker still for nuanced design
  },
  level0: '#11151C', // Adjusted for dark mode
  level1: '#0A0C11', // Darker for contrast
  level2: '#0B0C0E', // Further darkened for depth
  level3: '#08090A', // Near black for maximum depth
  time: '#806AC4', // Maintained for consistency
  main: '#3651DC', // Primary main color for consistency
  mainDark: '#293DAB', // Adjusted for dark mode
  tableBorder: '#DCE2EF', // Lighter for contrast against dark backgrounds
  tableParentRowBackground: '#F2F4FA', // Light background for contrast
  tableParentRowBackgroundFocused: '#C7CBD2', // Adjusted for visibility
  tableChildrenRowBorder: '#F2F4FA', // Light background for contrast
  tableChildRowBackgroundFocused: '#C7CBD2', // Adjusted for visibility
  gradient1,
  contrastThreshold: 3,
  tonalOffset: 0.2,
  getContrastText(_color: string) {
    return '#000' // Inverted for dark mode
  },
  augmentColor(_options: PaletteAugmentColorOptions) {
    return {
      main: '#407AEB', // Lighter primary color for better visibility in dark mode
    } as PaletteColor
  },
}
