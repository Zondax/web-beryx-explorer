import { useTranslation } from 'react-i18next'

import { Box, Typography, useTheme } from '@mui/material'

/**
 * Contact is a React function component
 * This component displays contact information
 */
const Contact = () => {
  /**
   * theme is an object which may contain the breakpoints, spacing,
   * and other values depending on the chosen theme in MUI theme provider.
   */
  const theme = useTheme()
  const { t } = useTranslation()

  return (
    <Box display={'flex'} flexDirection={'column'} alignItems={'flex-end'}>
      <Typography
        variant="subtitle2"
        sx={{
          filter: 'brightness(1.3)',
          a: { color: theme.palette.primary.main },
          textAlign: { xs: 'center', md: 'right' },
        }}
      >
        ©2023 Zondax AG
      </Typography>
      <Typography
        variant="subtitle2"
        sx={{
          /**
           * Stylings for the Typography component,
           * it contains filter, a > color, textAlign properties.
           */
          filter: 'brightness(1.3)',
          a: { color: theme.palette.primary.main },
          textAlign: { xs: 'center', md: 'right' },
        }}
      >
        {t('Contact')}: <a href="mailto:beryx@zondax.ch">beryx@zondax.ch</a>
      </Typography>
    </Box>
  )
}

export default Contact
