import { ThemeOptions } from '@mui/material'

/**
 * Generate styles for a secondary button using a provided
 * Material-UI theme options object.
 *
 * @param theme - A Material-UI theme options object.
 *
 * @returns An object that includes properties for styling a secondary button.
 * These properties are determined by the theme parameter.
 *
 * The returned style object includes the following:
 * - borderRadius: a fixed radius of '8px'.
 * - backgroundColor: drawn from the background level2 value of the given theme.
 * - ':hover': an object where the hover backgroundColor is defined as the background level0 value of the theme.
 * - gap: '1rem' gap between elements.
 * - height: 'fit-content' so the button wraps its content.
 * - padding: '0.5rem 1rem' for internal spacing.
 * - minWidth: '12rem' so the button isn't too small.
 * - textTransform: 'none' to preserve the original text casing.
 */
export const getStyleSecondaryButton = (theme: ThemeOptions) => {
  return {
    borderRadius: '8px',
    backgroundColor: theme.palette?.background?.level2,
    ':hover': {
      backgroundColor: theme.palette?.background?.level0,
    },
    gap: '1rem',
    height: 'fit-content',
    padding: '0.5rem 1rem',
    minWidth: '12rem',
    textTransform: 'none',
  }
}
