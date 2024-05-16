import { Components, Palette } from '@mui/material'

/**
 * This function returns the styles for the Badge component.
 * @param palette - The palette options from the theme.
 * @returns The styles for the Badge component.
 */
export const badgeStyles = (palette: Palette): Components => {
  return {
    MuiBadge: {
      styleOverrides: {
        root: {
          '& .MuiBadge-badge': {
            // color: palette.text?.primary,
            // backgroundColor: palette.error,
            // boxShadow: `0 0 0 2px ${palette.background?.paper}`,
            height: '18px',
            minWidth: '18px',
            padding: '0 5px',
            lineHeight: 1,
            fontSize: '11px',
            fontWeight: 500,
          },
          '& .MuiBadge-dot': {
            width: '8px',
            height: '8px',
            borderRadius: '50%',
          },
          '&.MuiBadge-anchorOriginTopRightRectangle': {
            top: '8px',
            right: '8px',
            transform: 'scale(1) translate(50%, -50%)',
            transformOrigin: '100% 0%',
          },
          '&.MuiBadge-anchorOriginBottomRightRectangle': {
            bottom: '8px',
            right: '8px',
            transform: 'scale(1) translate(50%, 50%)',
            transformOrigin: '100% 100%',
          },
          '&.MuiBadge-anchorOriginTopLeftRectangle': {
            top: '8px',
            left: '8px',
            transform: 'scale(1) translate(-50%, -50%)',
            transformOrigin: '0% 0%',
          },
          '&.MuiBadge-anchorOriginBottomLeftRectangle': {
            bottom: '8px',
            left: '8px',
            transform: 'scale(1) translate(-50%, 50%)',
            transformOrigin: '0% 100%',
          },
          '&.MuiBadge-colorPrimary': {
            color: palette.common?.white,
            backgroundColor: palette.primary,
          },
          '&.MuiBadge-colorSecondary': {
            color: palette.common?.white,
            backgroundColor: palette.secondary,
          },
          '&.MuiBadge-colorError': {
            color: palette.common?.white,
            backgroundColor: palette.error,
          },
          '&.MuiBadge-colorInfo': {
            color: palette.common?.white,
            backgroundColor: palette.info,
          },
          '&.MuiBadge-colorSuccess': {
            color: palette.common?.white,
            backgroundColor: palette.success,
          },
        },
      },
    },
  }
}
