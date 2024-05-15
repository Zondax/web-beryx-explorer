import { Construction } from '@carbon/icons-react'
import { Box, Typography, useTheme } from '@mui/material'

/**
 * BetaBox functional component
 */
export const BetaBox = () => {
  const theme = useTheme()
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        bgcolor: 'background.level2',
        p: '0 0.5rem',
        borderRadius: '8px',
      }}
    >
      <Construction width={12} height={12} color={theme.palette.text.secondary} />
      <Typography variant="caption" color={'text.secondary'}>
        beta
      </Typography>
    </Box>
  )
}
