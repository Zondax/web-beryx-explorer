import Link from 'next/link'
import { useTranslation } from 'react-i18next'

import { footerLinkStyle } from '@/utils/footer'
import { Launch } from '@carbon/icons-react'
import { Box, Typography, useTheme } from '@mui/material'

/**
 * CoingeckoLink component
 *
 * @returns The CoingeckoLink component
 */
export const CoingeckoLink = () => {
  const theme = useTheme()
  const { t } = useTranslation()

  return (
    <Typography
      variant="caption"
      sx={{
        ...footerLinkStyle(theme),
        cursor: 'auto',
        ':hover': 'none',
        a: {
          ':hover': { color: theme.palette?.text?.tertiary, filter: 'brightness(0.75)', cursor: 'pointer' },
        },
        fontSize: '0.8rem',
        display: 'flex',
        gap: '0.25rem',
      }}
    >
      {t('Pricing data provider by')}{' '}
      <Link href={'https://www.coingecko.com'} target={'_blank'}>
        <Box display={'flex'} alignItems={'center'} gap={'0.2rem'}>
          CoinGecko
          <Launch size={12} />
        </Box>
      </Link>
    </Typography>
  )
}
