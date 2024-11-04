import { Components, Palette } from '@mui/material'

/**
 * This function returns the styles for the Button component.
 * @param palette - The color palette of the application.
 * @returns The styles for the Button component.
 */
export const buttonStyles = (palette: Palette): Components => {
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
              backgroundColor: palette.primary.dark,
              '#badge-text': {
                color: palette.mainDark,
              },
              '&:disabled': {
                backgroundColor: palette.background?.level2,
                color: palette.text?.disabled,
              },
            },
          },
        },
        {
          // Variant for the inputType property
          props: { variant: 'link' },
          style: {
            minWidth: 'unset !important',
            color: palette.text?.primary,

            '#badge-text': {
              color: palette.background?.level0,
            },
            '&:hover': {
              backgroundColor: palette.background?.level2,
              '#badge-text': {
                color: palette.mainDark,
              },
            },
          },
        },
        {
          // Variant for the inputType property
          props: { variant: 'outlined' },
          style: {
            backgroundColor: palette.background?.level0,
            border: `1px solid ${palette.border?.level0}`,
            minWidth: 'unset !important',
            color: palette.text?.primary,
            '#badge-text': {
              color: palette.background?.level0,
            },
            '&:hover': {
              backgroundColor: palette.background?.level2,
              color: palette.text?.primary,
              border: `1px solid ${palette.border?.level0}`,
              '#badge-text': {
                color: palette.mainDark,
              },
            },
          },
        },
        {
          // Variant for the inputType property
          props: { variant: 'contained' },
          style: {
            backgroundColor: palette.primary.main,
            border: `1px solid ${palette.primary.main}`,
            color: palette.mode === 'light' ? palette.text?.opposite.primary : palette.text?.primary,
            '#badge-text': {
              color: palette.background?.level0,
            },
            '&:hover': {
              backgroundColor: palette.primary.dark,
              border: `1px solid ${palette.primary.dark}`,
              '#badge-text': {
                color: palette.mainDark,
              },
            },
            '&:disabled': {
              backgroundColor: palette.background?.level2,
              border: `1px solid ${palette.background?.level2}`,
              color: palette.text?.disabled,
            },
          },
        },
        {
          // Variant for the small size property
          props: { size: 'small' },
          style: {
            height: '28px',
            padding: '8px 12px',
            fontSize: '0.875rem',
            minWidth: '90px',
            borderRadius: '6px',
            gap: '0.25rem',
            '& .MuiButton-endIcon': {
              paddingLeft: '0.5rem',
            },
          },
        },
        {
          // Variant for the medium size property
          props: { size: 'medium' },
          style: {
            height: '34px',
            fontSize: '0.875rem',
            padding: '0 0.75rem',
            minWidth: '2rem',
            borderRadius: '8px',
            gap: '0.25rem',
            '& .MuiButton-endIcon': {
              paddingLeft: '0.5rem',
            },
            '& .MuiButton-startIcon': {
              paddingRight: '0.5rem',
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
            borderRadius: '8px',
            '& .MuiButton-endIcon': {
              paddingLeft: '1rem',
            },
            '& .MuiButton-startIcon': {
              paddingRight: '1rem',
            },
          },
        },
      ],
      // Style overrides for the Button component
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          boxShadow: 'none',
          borderRadius: '8px',
          display: 'flex',
          '&>*': {
            pointerEvents: 'none',
          },
          '&:hover': {
            boxShadow: 'none',
          },
          '&.Mui-disabled': {
            background: palette.background?.level3,
            border: `1px solid ${palette.background?.level3}`,
            color: palette.text?.tertiary,
          },
          '& .MuiButton-endIcon': {
            marginRight: '0',
            marginLeft: '0',
          },
          '& .MuiButton-startIcon': {
            marginRight: '0',
            marginLeft: '0',
          },
          '&.MuiButton-fullWidth': {
            width: '100%',
          },
        },
      },
    },
  }
}
