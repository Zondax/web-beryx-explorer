import { Components, Palette } from '@mui/material'

declare module '@mui/material/Autocomplete' {
  export interface AutocompletePropsSizeOverrides {
    large: true
  }
}

/**
 * Styles for the Input component.
 * @param palette - The palette options.
 * @returns The styles for the Input component.
 */
export const autocompleteStyles = (palette: Palette): Components => {
  return {
    MuiAutocomplete: {
      variants: [
        {
          props: { size: 'small' },
          style: {
            style: {
              '& .MuiAutocomplete-root, & .MuiInputBase-root': {
                height: '2.3rem',
              },
              '& .MuiAutocomplete-input': {
                padding: '0 !important',
              },
              '& .MuiInputLabel-root, & .MuiTypography-root': {
                top: '-0.6rem',
              },
              '& .MuiInputLabel-shrink': { top: '-0.1rem' },
            },
          },
        },
        {
          props: { size: 'medium' },
          style: {
            '& .MuiAutocomplete-root, & .MuiInputBase-root': {
              height: '2.3rem',
            },
            '& .MuiAutocomplete-input': {
              padding: '0 !important',
            },
            '& .MuiInputLabel-root, & .MuiTypography-root': {
              top: '-0.6rem',
            },
            '& .MuiInputLabel-shrink': { top: '-0.1rem' },
          },
        },
        {
          props: { size: 'large' },
          style: {
            '& .MuiAutocomplete-root, & .MuiInputBase-root': {
              height: '2.8rem',
            },
            '& .MuiAutocomplete-input': {
              padding: '0 !important',
            },
            '& .MuiInputLabel-root, & .MuiTypography-root': {
              top: '-0.4rem',
            },
            '& .MuiInputLabel-shrink': { top: '-0.1rem' },
          },
        },
      ],
      styleOverrides: {
        root: {},
        listbox: {
          backgroundColor: `${palette.background.level0} !important`,
          borderRadius: '8px !important',
        },
        option: {
          backgroundColor: `${palette.background.level0} !important`,
          '&:hover': {
            backgroundColor: `${palette.background?.level2} !important`,
            color: `${palette.text?.primary} !important`,
          },
          '&[aria-selected="true"]': {
            backgroundColor: `${palette.background?.level3} !important`,
            color: `${palette.text?.primary} !important`,
            '&:hover': {
              backgroundColor: `${palette.background?.level2} !important`,
            },
          },
        },
        popper: {
          paddingTop: '0.25rem',
          '& .MuiPaper-root': {
            boxShadow: 'none !important',
            borderRadius: '8px !important',
            border: `1px ${palette.border.level0} solid !important`,
            backgroundColor: `${palette.background.level0} !important`,
            backgroundImage: 'none !important',
          },
        },
      },
    },
  }
}
