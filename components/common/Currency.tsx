import React from 'react'

import { Box, Typography, useTheme } from '@mui/material'

/**
 * Props for the Currency component
 */
interface CurrencyProps {
  /**
   * A React node to be used as the icon of the currency
   */
  icon: React.ReactNode
  /**
   * Optional text to display next to the currency
   */
  text?: string
}

/**
 * Currency is a functional react component.
 * It returns a box that contains an icon and optional text.
 * The icon and text are perceived as the display of a particular currency.
 * @param props CurrencyProps
 * @returns JSX.Element
 */
const Currency = ({ icon, text }: CurrencyProps): JSX.Element => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '0.5rem',
        border: `1px solid ${theme.palette.border?.level0}`,
        background: theme.palette.background.level3,
        borderRadius: '1.2rem',
        padding: '0 6px 0 2px',
      }}
    >
      {icon}
      <Typography variant="caption">{text}</Typography>
    </Box>
  )
}

export default Currency
