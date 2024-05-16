import { Components } from '@mui/material'

/**
 * @constant SvgIcon
 * @description This constant represents the styles for the MuiSvgIcon component.
 * @type {Components}
 */
export const svgIconStyles: Components = {
  MuiSvgIcon: {
    /**
     * @property styleOverrides
     * @description This property represents the style overrides for the MuiSvgIcon component.
     */
    styleOverrides: {
      root: {},
      fontSizeSmall: {
        /**
         * @property fontSize
         * @description This property represents the font size for the small variant of the MuiSvgIcon component.
         */
        fontSize: '0.8rem',
      },
      fontSizeMedium: {
        /**
         * @property fontSize
         * @description This property represents the font size for the medium variant of the MuiSvgIcon component.
         */
        fontSize: '1.2rem',
      },
      fontSizeLarge: {
        /**
         * @property fontSize
         * @description This property represents the font size for the large variant of the MuiSvgIcon component.
         */
        fontSize: '1.4rem',
      },
    },
  },
}
