import { Components, Palette } from '@mui/material'

// Extend color prop on components
declare module '@mui/material/TextField' {
  export interface TextFieldPropsColorOverrides {
    level0: true
    level1: true
    level2: true
    level3: true
  }
}

declare module '@mui/material/TextField' {
  export interface TextFieldPropsSizeOverrides {
    large: true
  }
}

/**
 * Styles for the Input component.
 * @param palette - The palette options.
 * @returns The styles for the Input component.
 */
export const inputStyles = (palette: Palette): Components => {
  return {
    MuiTextField: {
      variants: [
        {
          props: { color: 'level0' },
          style: {
            '& .MuiInputBase-root': {
              backgroundColor: palette.background?.level1,
            },
            // ', & .MuiList-root, & .MuiMenu-list, &>ul, & .MuiPaper-root, & .MuiMenu-paper, & .MuiPaper-elevation, & .MuiPaper-rounded, & .MuiPaper-elevation8, & .MuiPopover-paper, & ul': {
            //   backgroundColor: `${red[500]} !important`,
            // },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: palette.background?.level1,
            },
            '& svg': {
              fill: palette.text?.secondary,
            },
          },
        },
        {
          props: { color: 'level1' },
          style: {
            '& .MuiInputBase-root, & .MuiPaper-root-MuiMenu-paper-MuiPopover-paper': {
              backgroundColor: palette.tableParentRowBackground,
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: palette.tableParentRowBackground, // border color for the input
            },
            '& svg': {
              fill: palette.text?.secondary,
            },
          },
        },
        {
          props: { color: 'level2' },
          style: {
            '& .MuiInputBase-root, & .MuiPaper-root-MuiMenu-paper-MuiPopover-paper': {
              backgroundColor: palette.level2,
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: palette.level2, // border color for the input
            },
            '& svg': {
              fill: palette.text?.secondary,
            },
          },
        },
        {
          props: { color: 'level3' },
          style: {
            '& .MuiInputBase-root': {
              backgroundColor: palette.background?.level0,
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: palette.background?.level0,
            },
            '& svg': {
              fill: palette.text?.secondary,
            },
          },
        },
        {
          props: { variant: 'outlined' },
          style: {
            // border: '1px solid',

            '& .MuiInputBase-root': {
              backgroundColor: palette.background?.level0,
              border: '1px solid',
              borderColor: palette.border?.level0,
              color: palette.text?.primary,
              borderRadius: '8px',
            },
          },
        },
        {
          props: { size: 'small' },
          style: {
            height: '24px',
            '& .MuiInputBase-root': {
              height: '24px',
            },
            '& .MuiInputBase-input': {
              height: '24px',
            },
            '& .MuiInputLabel-root': {
              height: '2.3rem',
              display: 'flex',
              alignItems: 'center',
              top: '-0.6rem',
            },
            '& .MuiInputLabel-shrink': { top: '-0.5rem' },
          },
        },
        {
          props: { size: 'medium' },
          style: {
            height: '34px',
            '& .MuiInputBase-root': {
              height: '34px',
            },
            '& .MuiInputBase-input': {
              height: '34px',
            },
            '& .MuiInputLabel-root, & .MuiTypography-root': {
              height: '34px',
              display: 'flex',
              alignItems: 'center',
              top: '-1.1rem',
              paddingRight: '1rem',
            },
            '& .MuiInputLabel-shrink': { top: '-0.5rem' },
          },
        },
        {
          props: { size: 'large' },
          style: {
            '& .MuiInputBase-root': {
              height: '2.8rem',
            },
            '& .MuiInputBase-input': {
              padding: '0 1rem',
              height: '2.8rem',
              display: 'flex',
              alignItems: 'center',
            },
            '& .MuiInputLabel-root, & .MuiTypography-root': {
              height: '2.8rem',
              display: 'flex',
              alignItems: 'center',
              top: '-1.1rem',
            },
            '& .MuiInputLabel-shrink': { top: '-0.5rem' },
          },
        },
      ],
      styleOverrides: {
        root: {
          '.Mui-disabled': {
            opacity: 0.8,
          },
          '& .MuiInputBase-input': {
            borderRadius: '8px',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none', // border color for the input
          },
          '& .Mui-error': {
            borderColor: '#000', // border color for the input
          },
          '& .MuiFormHelperText-root': {
            fontSize: '0.875rem',
          },
        },
      },
    },
  }
}
