import { Components, PaletteOptions } from '@mui/material'

/**
 * This function returns the styles for the Alert component.
 * @param palette - The color palette of the application.
 * @returns The styles for the Alert component.
 */
export const Alert = (palette: PaletteOptions): Components => {
  return {
    MuiAlert: {
      styleOverrides: {
        // Styles for the root element of the Alert component
        root: {
          borderRadius: '8px',
          padding: '0rem 1rem',
        },
        // Styles for the icon of the Alert component
        icon: {
          marginRight: '12px',
        },
        // Styles for the standard error Alert
        standardError: {
          backgroundColor: palette.background?.level1,
          color: '#D01F34',
          outline: '0.5px solid #D01F34',
          boxShadow: 'rgba(40, 40, 53, 0.05) 0px 13px 27px -5px, rgba(0, 0, 0, 0.2) 0px 8px 16px -8px',
        },
        // Styles for the filled error Alert
        filledError: {
          backgroundColor: '#FF453A',
          color: '#FFF',
          '& .MuiAlert-icon': {
            color: '#FFF',
          },
        },
        // Styles for the filled warning Alert
        filledWarning: {
          backgroundColor: '#FFA800',
          color: '#FFF',
          '& .MuiAlert-icon': {
            color: '#FFF',
          },
        },
        // Styles for the filled success Alert
        filledSuccess: {
          backgroundColor: '#34C759',
          color: '#FFF',
          '& .MuiAlert-icon': {
            color: '#FFF',
          },
        },
        // Styles for the filled info Alert
        filledInfo: {
          backgroundColor: '#007AFF',
          color: '#FFF',
          '& .MuiAlert-icon': {
            color: '#FFF',
          },
        },
        // Styles for the outlined error Alert
        outlinedError: {
          border: '1px solid #FF453A',
          color: '#FF453A',
          '& .MuiAlert-icon': {
            color: '#FF453A',
          },
        },
        // Styles for the outlined warning Alert
        outlinedWarning: {
          border: '1px solid #FFA800',
          '& .MuiAlert-icon': {
            color: '#FFA800',
          },
        },
        // Styles for the outlined success Alert
        outlinedSuccess: {
          border: '1px solid #34C759',
          color: '#34C759',
          '& .MuiAlert-icon': {
            color: '#34C759',
          },
        },
        // Styles for the outlined info Alert
        outlinedInfo: {
          border: '1px solid #007AFF',
          color: '#007AFF',
          '& .MuiAlert-icon': {
            color: '#007AFF',
          },
        },
      },
    },
  }
}
