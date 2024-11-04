import { Box, useTheme } from '@mui/material'

import BetaIcon from '../Icons/BetaIcon'

/**
 * BetaLabel functional component
 */
const BetaLabel = ({ size = 'medium' }: { size?: 'small' | 'medium' }) => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        bgcolor: 'background.level3',
        padding: size === 'small' ? '0 0.125rem' : '0 0.25rem',
        borderRadius: '4px',
        width: 'fit-content',
      }}
    >
      <BetaIcon size={size === 'small' ? 20 : 22} color={theme.palette.text.primary} />
    </Box>
  )
}

export default BetaLabel
