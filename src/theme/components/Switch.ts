import { Components, Palette } from '@mui/material'

/**
 * @constant Switch
 * @description This constant represents the styles for the MuiSwitch component.
 * @type {Components}
 */
export const switchStyles = (palette: Palette): Components => {
  return {
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 36,
          height: 20,
          padding: 0,
          display: 'flex',
          alignItems: 'center',
        },
        thumb: {
          width: 16,
          height: 16,
          boxShadow: 'none !important',
        },
        track: {
          // Controls default (unchecked) color for the track
          backgroundColor: palette.mode === 'dark' ? palette.level1 : palette.level1,
          borderRadius: 40 / 2,
          border: `1px solid ${palette.border?.level0}`,
          opacity: 1,
          transition: 'background-color 0.2s, border 0.2s',
          '.Mui-checked.Mui-checked + &': {
            // Controls checked color for the track
            opacity: 0.9,
            backgroundColor: palette.primary,
            border: `1px solid ${palette.primary}`,
          },
        },
        switchBase: {
          // Controls default (unchecked) color for the thumb
          color: palette.mode === 'dark' ? palette.tableParentRowBackgroundFocused : palette.text?.tertiary,
          padding: '2px !important',
        },
        colorPrimary: {
          '&.Mui-checked': {
            // Controls checked color for the thumb
            padding: '2px !important',
            color: palette.mode === 'dark' ? palette.text?.primary : palette.background?.level0,
            transform: 'translateX(16px) !important',
          },
        },
      },
      defaultProps: {
        size: 'small',
      },
    },
  }
}
