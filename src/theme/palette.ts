import { PaletteMode } from '@mui/material'
import { PaletteOptions } from '@mui/material/styles'

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
    primary: string
  }

  /**
   * @interface TypeText
   * @description This interface extends the TypeText interface from @mui/material/styles with a tertiary color.
   */
  interface TypeText {
    tertiary: string
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
    mainDark: string
    tableBorder: string
    tableParentRowBackground: string
    tableParentRowBackgroundFocused: string
    tableChildrenRowBorder: string
    tableChildRowBackgroundFocused: string
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

  /**
   * @interface PaletteOptions
   * @description This interface extends the PaletteOptions interface from @mui/material/styles with additional color levels, time, main, mainDark, table colors, and gradient1.
   */
  interface PaletteOptions {
    level0: string
    level1: string
    level2: string
    level3: string
    time: string
    main: string
    mainDark: string
    tableBorder: string
    tableParentRowBackground: string
    tableParentRowBackgroundFocused: string
    tableChildrenRowBorder: string
    tableChildRowBackgroundFocused: string
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
  level1: '#f4fad4',
  level2: '#d7f1ac',
  level3: '#a9e3af',
  level4: '#63c1bf',
  level5: '#1da8c9',
  level6: '#3252C7', // Previous: '#2367ac',
  level7: '#2b2d84',
}

/**
 * @constant lightPallete
 * @description This constant defines the color palette for light mode.
 */
export const lightPallete: PaletteOptions = {
  mode: 'light' as PaletteMode,
  primary: {
    main: '#3252C7',
    light: '#407AEB', // link. Previous '#467de3'
    dark: '#A6B1D6',
    contrastText: '#fff',
  },
  secondary: {
    light: '#B6B8BE', //background3
    main: '#FF6B23',
    dark: '#CECFD3', //background4
    contrastText: 'rgba(0, 0, 0, 0.87)',
  },
  info: {
    main: '#D0D5E3', //border 1. Previous: '#f7faff',
    light: '#566A88', //lightblue
    dark: '#edf1f7',
  },
  text: {
    primary: '#14161C', //text1
    secondary: '#8990A4', //text2
    tertiary: '#ABB1C3', //text3
  },
  error: {
    main: '#D01F34',
  },
  success: {
    main: '#2ABB53', // ASK: Cambiar por #108631 ?
  },
  divider: 'rgba(0, 0, 0, 0.12)',
  level0: '#F4F5F6',
  level1: '#DDDEE1',
  level2: '#B6B8BE',
  level3: '#A3A5AB',
  time: '#806AC4',
  main: '#3651DC',
  mainDark: '#293DAB',
  tableBorder: '#DCE2EF',
  tableParentRowBackground: '#E3E5EB',
  tableParentRowBackgroundFocused: '#C7CBD2',
  tableChildrenRowBorder: '#EDF1F8',
  tableChildRowBackgroundFocused: '#C7CBD2',
  background: {
    paper: '#DDDEE1',
    default: '#F4F5F6',
    level0: '#F4F5F6',
    level1: '#FFFFFF',
    level2: '#E3E5EB',
    level3: '#FFFFFF',
  },
  gradient1,
}

/**
 * @constant darkPallete
 * @description This constant defines the color palette for dark mode.
 */
export const darkPallete: PaletteOptions = {
  common: {
    black: '#000',
    white: '#fff',
  },
  mode: 'dark' as PaletteMode,
  primary: {
    main: '#3651DC',
    light: '#5489F0', // link. Previous '#2196f3'
    dark: '#0F1E6C',
    contrastText: '#fff',
  },
  secondary: {
    light: '#323438', // background3
    main: '#FF6B23',
    dark: '#202126', // background4
    contrastText: 'rgba(0, 0, 0, 0.87)',
  },
  info: {
    main: '#323438', //border 1. Previous: '#161616',
    light: '#8BADDF', //lightblue
    dark: '#151a30',
  },
  text: {
    primary: '#E2E4EC', //text1
    secondary: '#6E7682', //text2
    tertiary: '#BEC3CE', //text3
  },
  error: {
    main: '#D01F34',
  },
  success: {
    main: '#2ABB53',
  },
  divider: 'rgba(255, 255, 255, 0.12)',
  level0: '#000000',
  level1: '#1A1B1F',
  level2: '#323438',
  level3: '#484A4E',
  time: '#806AC4',
  main: '#3651DC',
  mainDark: '#293DAB',
  tableBorder: '#343A43',
  tableParentRowBackground: '#24282F',
  tableParentRowBackgroundFocused: '#3B404A',
  tableChildrenRowBorder: '#282A2E',
  tableChildRowBackgroundFocused: '#3B404A',
  background: {
    paper: '#1A1B1F',
    default: '#000000',
    level0: '#000000',
    level1: '#14151A',
    level2: '#202129',
    level3: '#3B404A',
  },
  gradient1,
}
