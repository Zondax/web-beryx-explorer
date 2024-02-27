import { Components, PaletteOptions } from '@mui/material'

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
export const InputStyles = (palette: PaletteOptions): Components => {
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
            // ', & .MuiList-root, & .MuiMenu-list, &>ul, & .MuiPaper-root, & .MuiMenu-paper, & .MuiPaper-elevation, & .MuiPaper-rounded, & .MuiPaper-elevation8, & .MuiPopover-paper, & ul': {
            //   backgroundColor: `${red[500]} !important`,
            // },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: palette.background?.level0,
            },
            '& svg': {
              fill: palette.text?.secondary,
            },
          },
        },
        {
          props: { size: 'small' },
          style: {
            '& .MuiInputBase-root': {
              height: '2.3rem',
            },
            '& .MuiInputBase-input': {
              // fontSize: '1rem',
              padding: '0 3rem 0 1.25rem !important',
              height: '2.3rem',
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
            '& .MuiInputBase-root': {
              height: '2.5rem',
            },
            '& .MuiInputBase-input': {
              // fontSize: '1rem',
              padding: '0 1.25rem',
              height: '2.5rem',
              display: 'flex',
              alignItems: 'center',
            },
            '& .MuiInputLabel-root, & .MuiTypography-root': {
              height: '2.5rem',
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
          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none', // border color for the input
          },
          '& .Mui-error': {
            borderColor: '#000', // border color for the input
          },
          '& .MuiFormHelperText-root': {
            fontSize: '0.875rem',
          },
          // '& .Mui-Select': {
          //   iconComponent
          // }
          // // borderRadius: '4px',
          // backgroundColor: '#FFF',
          // '&:hover:not($disabled)': {
          //   backgroundColor: '#F5F5F5',
          // },
          // '&$focused': {
          //   backgroundColor: '#FFF',
          //   boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)',
          // },
        },
      },
    },
  }
}
