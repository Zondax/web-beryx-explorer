import { Components } from '@mui/material'

/**
 * @constant Steps
 * @description This constant represents the styles for the MuiStepConnector, MuiStepLabel, and MuiStepIcon components.
 * @type {Components}
 */
export const Steps: Components = {
  MuiStepConnector: {
    styleOverrides: {
      root: {
        '&$active': {
          '& $line': {
            borderColor: '#3F51B5',
          },
        },
        '& $line': {
          borderColor: '#EAEAF0',
        },
      },
      lineHorizontal: {
        borderTopWidth: 3,
        borderRadius: 1,
      },
    },
  },
  MuiStepLabel: {
    styleOverrides: {
      root: {
        '&$active': {
          fontWeight: 'bold',
        },
        '&$completed': {
          fontWeight: 'bold',
        },
      },
      label: {
        fontWeight: 'bold',
        fontSize: '1.1rem',
      },
    },
  },
  MuiStepIcon: {
    styleOverrides: {
      root: {
        color: '#3F51B5',
        '&$completed': {
          color: '#3F51B5',
        },
        '&$active': {
          color: '#3F51B5',
        },
        width: 20,
        height: 20,
        '& .MuiStepIcon-text': {
          fontSize: '12.6px',
        },
      },
    },
  },
}
