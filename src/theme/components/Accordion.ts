import { Breakpoints } from '@mui/material'
import { Components, Palette } from '@mui/material/styles'

/**
 * This function returns the styles for the Accordion component.
 * @param palette - The color palette of the application.
 * @param breakpoints - The breakpoints of the application.
 * @returns The styles for the Accordion component.
 */
export const accordionStyles = (palette: Palette, breakpoints: Breakpoints): Components => {
  return {
    // Styles for the main Accordion component
    MuiAccordion: {
      styleOverrides: {
        root: {
          position: 'relative',
          marginBottom: '8px',
          borderRadius: '8px',
          background: palette.background?.level0,
          boxShadow: 'none',

          ':before': {
            display: 'none',
          },
          ':first-of-type': {
            borderRadius: '8px',
          },
          ':last-of-type': {
            borderRadius: '8px',
          },
          // Styles for the expanded Accordion
          '&.Mui-expanded': {
            border: 'solid 1px transparent',
            background: palette.background?.level0,
            margin: '4px 0 12px 0',
            '& .MuiAccordionSummary-content': {
              margin: '16px 0 16px 0 !important',
              opacity: 1,
            },
          },
        },
      },
    },
    // Styles for the Accordion Summary component
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          minHeight: 'unset !important',
        },
        content: {
          transition: 'opacity 0.2s ease-in-out',
          opacity: 0.8,
          margin: '16px 0 !important',
        },

        expandIconWrapper: {
          color: palette.text?.secondary,
        },
      },
    },
    // Styles for the Accordion Details component
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: '0 16px 16px 16px',
          color: palette.text?.secondary,
          // Styles for different breakpoints
          [breakpoints.up('md')]: {
            padding: '0 16px 16px 16px',
          },
          [breakpoints.up('lg')]: {
            padding: '0 16px 16px 16px',
          },
        },
      },
    },
  }
}
