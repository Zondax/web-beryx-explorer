import { Components } from '@mui/material'
import { PaletteOptions } from '@mui/material/styles'

/**
 * @constant TabListStyle
 * @description This constant represents the styles for the MuiTabs component.
 * @type {Components}
 * @param palette - The palette options.
 * @returns The styles for the MuiTabs component.
 */
export const TabListStyle = (palette: PaletteOptions): Components => {
  return {
    MuiTabs: {
      /**
       * @property styleOverrides
       * @description This property represents the style overrides for the MuiTabs component.
       */
      styleOverrides: {
        root: {
          minHeight: '1.75rem',
          height: '2.25rem',
          background: 'transparent',
          borderRadius: '4px',
          '.MuiTabs-scroller .MuiTabs-indicator': {
            backgroundColor: palette.tableParentRowBackground,
            height: '100%',
            borderRadius: '4px',
            zIndex: '-1',
          },
          '.MuiTabs-flexContainer': {
            height: '100%',
            gap: '0.5rem',
          },
        },
        scrollButtons: {
          '& .MuiSvgIcon-root': {
            width: '1.5rem',
            height: '1.5rem',
          },
        },
      },
    },
  }
}
