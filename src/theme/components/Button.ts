import { Components, PaletteOptions } from '@mui/material'

import { darkPallete } from '../palette'

/**
 * This module declaration is extending the ButtonPropsVariantOverrides interface
 * from the @mui/material/Button module to include an inputType property.
 */
declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    inputType: true
  }
}

/**
 * This function returns the styles for the Button component.
 * @param palette - The color palette of the application.
 * @returns The styles for the Button component.
 */
export const ButtonStyles = (palette: PaletteOptions): Components => {
  return {
    MuiButton: {
      // Variants for the Button component
      variants: [
        {
          // Variant for the inputType property
          props: { variant: 'inputType' },
          style: {
            backgroundColor: palette.background?.level2,
            color: palette.text?.primary,
            textTransform: 'none',
            '#badge-text': {
              color: palette.background?.level0,
            },
            '&:hover': {
              color: palette.mode === 'light' ? palette.background?.level0 : palette.text?.primary,
              backgroundColor: palette.mainDark,
              '#badge-text': {
                color: palette.mainDark,
              },
            },
          },
        },
        {
          // Variant for the small size property
          props: { size: 'small' },
          style: {
            height: '2.2rem',
            padding: '8px 16px',
            fontSize: '0.875rem',
            minWidth: '100px',
            '& .MuiButton-endIcon': {
              paddingLeft: '0.5rem',
            },
            '&.MuiButton-outlined': {
              height: 'calc(2.2rem + 1.5px)',
            },
          },
        },
        {
          // Variant for the medium size property
          props: { size: 'medium' },
          style: {
            height: '2.5rem',
            padding: '12px 24px',
            fontSize: '1rem',
            minWidth: '112px',
            '& .MuiButton-endIcon': {
              paddingLeft: '1rem',
            },
            '& .MuiButton-startIcon': {
              paddingRight: '1rem',
            },
            '&.MuiButton-outlined': {
              height: 'calc(2.5rem + 1.5px)',
            },
          },
        },
        {
          // Variant for the large size property
          props: { size: 'large' },
          style: {
            height: '2.8rem',
            padding: '0.5rem 1rem',
            fontSize: '1.125rem',
            minWidth: '124px',
            minHeight: '40px',
            '& .MuiButton-endIcon': {
              paddingLeft: '1rem',
            },
            '& .MuiButton-startIcon': {
              paddingRight: '1rem',
            },
            '&.MuiButton-outlined': {
              height: 'calc(2.8rem + 1.5px)',
            },
          },
        },
      ],
      // Style overrides for the Button component
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 'bold',
          boxShadow: 'none',
          display: 'flex',
          '&>*': {
            pointerEvents: 'none',
          },
          '&:hover': {
            boxShadow: 'none',
          },
          '&.Mui-disabled': {
            opacity: 0.7,
            background: palette.tableParentRowBackground,
          },
          '& .MuiButton-endIcon': {
            marginRight: '0',
            marginLeft: '0',
          },
          '& .MuiButton-startIcon': {
            marginRight: '0',
            marginLeft: '0',
          },
        },
        containedPrimary: {
          background: palette.main,
          '& .MuiCircularProgress-root': {
            color: `${darkPallete.text?.primary} !important`,
          },

          '&:hover': {
            background: palette.mainDark,
          },
        },
        containedSecondary: {
          color: '#FFF',
          backgroundColor: palette.mode === 'light' ? '#3252C7' : '#5373E7',
          '& p, & svg': {
            color: '#FFF',
          },
          '&:hover': {
            backgroundColor: palette.text?.primary,
            color: palette.background?.level0,
            '& p, & svg': {
              color: palette.background?.level0,
            },
          },
        },
        containedInherit: {
          backgroundColor: palette.background?.level2,
          color: palette.text?.primary,

          '&:hover': {
            backgroundColor: palette.text?.secondary,
          },
        },
        outlinedPrimary: {
          border: `1px solid ${palette.mode === 'light' ? '#3252C7' : '#4967D4'}`,
          color: palette.mode === 'light' ? '#3252C7' : '#A0B2CD',
          background: 'rgba(73, 103, 213, 0.1)',
          '&:hover': {
            border: '1px solid #0059b3',
            backgroundColor: 'rgba(0, 112, 243, 0.1)',
          },
        },
        outlinedSecondary: {
          border: `1px solid ${palette.mode === 'light' ? '#3252C7' : '#5373E7'}`,
          color: palette.mode === 'light' ? '#3252C7' : '#5373E7',
          '&:hover': {
            border: '1px solid #b26500',
            backgroundColor: 'rgba(255, 145, 0, 0.1)',
          },
        },
        textPrimary: {
          color: palette.text?.secondary,
          fontWeight: '400',
          '&:hover': {
            color: palette.text?.primary,
            backgroundColor: palette.background?.level2,
          },
        },
        textSecondary: {
          color: '#404040',
          fontWeight: '400',
          '&:hover': {
            backgroundColor: 'rgba(255, 145, 0, 0.1)',
          },
        },
      },
    },
  }
}
