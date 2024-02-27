import { Components } from '@mui/material'

/**
 * This object contains the styles for the Card component.
 * @type {Components}
 */
export const CardStyles: Components = {
  MuiCard: {
    // Styles for the root element of the Card component
    styleOverrides: {
      root: {
        borderRadius: 8, // Rounded corners for the Card
        boxShadow: 'none', // No shadow for the Card
      },
    },
  },
  MuiCardHeader: {
    // Styles for the CardHeader component
    styleOverrides: {
      root: {
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)', // Border at the bottom of the CardHeader
      },
      title: {
        fontWeight: 'bold', // Bold font for the title
        fontSize: '24px', // Font size for the title
      },
    },
  },
  MuiCardContent: {
    // Styles for the CardContent component
    styleOverrides: {
      root: {
        padding: '16px', // Padding for the CardContent
        '&:last-child': {
          paddingBottom: '16px', // Padding at the bottom of the last child of the CardContent
        },
      },
    },
  },
  MuiCardActions: {
    // Styles for the CardActions component
    styleOverrides: {
      root: {
        borderTop: '1px solid rgba(0, 0, 0, 0.12)', // Border at the top of the CardActions
        padding: '16px', // Padding for the CardActions
        '& .MuiButton-root': {
          borderRadius: 8, // Rounded corners for the Button
          fontWeight: 'bold', // Bold font for the Button
          textTransform: 'none', // No text transformation for the Button
          boxShadow: 'none', // No shadow for the Button
          minHeight: '44px', // Minimum height for the Button
          padding: '0 16px', // Padding for the Button
          '&:hover': {
            boxShadow: 'none', // No shadow when the Button is hovered
          },
        },
        '& .MuiButton-containedPrimary': {
          background: '#007aff', // Background color for the primary Button
          color: 'white', // Text color for the primary Button
          '&:hover': {
            background: '#006ae6', // Background color when the primary Button is hovered
          },
        },
        '& .MuiButton-containedSecondary': {
          background: '#ff9500', // Background color for the secondary Button
          color: 'white', // Text color for the secondary Button
          '&:hover': {
            background: '#ff8300', // Background color when the secondary Button is hovered
          },
        },
        '& .MuiButton-outlined': {
          borderWidth: 2, // Border width for the outlined Button
          '&:hover': {
            borderWidth: 2, // Border width when the outlined Button is hovered
          },
        },
        '& .MuiButton-outlinedPrimary': {
          color: '#007aff', // Text color for the primary outlined Button
          borderColor: '#007aff', // Border color for the primary outlined Button
        },
        '& .MuiButton-outlinedSecondary': {
          color: '#ff9500', // Text color for the secondary outlined Button
          borderColor: '#ff9500', // Border color for the secondary outlined Button
        },
      },
    },
  },
}
