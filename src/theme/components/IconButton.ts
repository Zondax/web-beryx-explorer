import { Components, Palette, alpha } from '@mui/material'

/**

/**
 * This function returns the styles for the IconButton component.
 * @param palette - The palette options from the theme.
 * @returns The styles for the IconButton component.
 */
export const iconButtonStyles = (palette: Palette): Components => {
  return {
    MuiIconButton: {
      variants: [
        {
          props: { color: 'info' },
          style: {
            color: palette.text?.secondary,
            border: `1px solid ${palette.border?.level0}`,
          },
        },
        {
          props: { size: 'xsmall' },
          style: {
            width: '22px',
            height: '22px',
            borderRadius: '5px',
            padding: '4px',
          },
        },
        {
          props: { size: 'small' },
          style: {
            width: '28px',
            height: '28px',
            borderRadius: '6px',
          },
        },
        {
          props: { size: 'medium' },
          style: {
            width: '34px',
            height: '34px',
          },
        },
        {
          props: { size: 'large' },
          style: {
            width: '2.8rem',
            height: '2.8rem',
          },
        },
      ],
      styleOverrides: {
        root: {
          backgroundColor: palette.background?.level0,
          borderRadius: '8px',
          color: palette.text?.secondary,

          '&:hover': {
            backgroundColor: palette.background?.level2,
            color: palette.text?.primary,
          },
          '&.MuiIconButton-colorSecondary': {
            color: palette.text?.primary,
          },
          '&.MuiIconButton-colorInfo': {
            color: palette.info,
          },
          '&.MuiIconButton-colorError': {
            color: palette.error.main,
            borderColor: palette?.error?.main,
            backgroundColor: palette.error.light,
          },
          '&.MuiIconButton-colorSuccess': {
            color: palette.success.main,
            backgroundColor: palette.success.light,
            borderColor: palette.success.main,
          },
          '&.MuiIconButton-colorWarning': {
            color: palette.warning,
          },
          '&.Mui-disabled': {
            color: alpha(palette.text.secondary, 0.5),
            backgroundColor: alpha(palette.background.level0, 0.5),
            borderColor: alpha(palette.border.level0, 0.5),
          },
        },
      },
    },
  }
}
