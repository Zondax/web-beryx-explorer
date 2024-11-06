import { Box, Typography, useTheme } from '@mui/material'

import FilecoinIcon from 'components/common/Icons/Filecoin'

interface TokenNameProps {
  /** The description of the token */
  description: string
  /** The ticker symbol of the token */
  ticker: string
}

/**
 * `TokenName` component displays a token's description and ticker symbol
 * alongside a Filecoin icon. It uses Material-UI for styling and theming.
 *
 * @component
 * @example
 * const description = 'Filecoin'
 * const ticker = 'FIL'
 * return <TokenName description={description} ticker={ticker} />
 */
const TokenName: React.FC<TokenNameProps> = ({ description, ticker }) => {
  const theme = useTheme()

  return (
    <Box display="flex" alignItems="center">
      <FilecoinIcon size={16} color1={theme.palette.border.level0} color2={theme.palette.text.tertiary} />
      <Typography variant="body1" sx={{ marginLeft: '8px' }}>
        <Box component="span" sx={{ fontWeight: 500, color: 'text.primary' }}>
          {description}
        </Box>
        <Box component="span" sx={{ fontWeight: 300, color: 'text.secondary' }}>
          {' '}
          ({ticker})
        </Box>
      </Typography>
    </Box>
  )
}

export default TokenName
