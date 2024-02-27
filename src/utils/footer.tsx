import { ThemeOptions } from '@mui/material'

/**
 * Style for footer links
 * @param theme - Theme options from app theme
 * @returns object with styles
 */
export const footerLinkStyle = (theme: ThemeOptions) => ({
  color: theme.palette?.text?.secondary,
  lineHeight: 'unset',
  fontSize: '0.75rem',
  cursor: 'pointer',
  filter: 'brightness(1.3)',
  ':hover': { color: theme.palette?.text?.tertiary, filter: 'brightness(1)' },
})
