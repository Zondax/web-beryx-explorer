import Link from 'next/link'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { useLatestStore } from '@/store/data/latest'
import useAppSettingsStore from '@/store/ui/settings'
import { Box, Typography, useTheme } from '@mui/material'

const Price: React.FC = () => {
  const { t } = useTranslation()
  const theme = useTheme()

  const { latestCurrencyRates } = useLatestStore()
  const selectedCurrency = useAppSettingsStore(s => s.fiatCurrency)

  if (!latestCurrencyRates) {
    return null
  }

  const currentPrice = latestCurrencyRates.find(({ currency }) => currency === selectedCurrency)

  return currentPrice ? (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'baseline',
        width: 'max-content',
        gap: '0.5rem',
        marginRight: '0.5rem',
      }}
    >
      <Typography variant="body1" lineHeight={1} fontSize={'0.75rem'} width={'max-content'}>
        {t('FIL price')}
      </Typography>
      <Link href={`https://www.coingecko.com/en/coins/filecoin`} target="_blank" passHref>
        <Typography
          variant={'captionMono'}
          component={'a'}
          color={'text.primary'}
          lineHeight={1}
          width={'max-content'}
          fontFamily="Sora"
          fontSize={'0.75rem'}
          id={'currency-value'}
          sx={{ whiteSpace: 'nowrap', textTransform: 'uppercase', '&:hover': { color: theme.palette.primary.main } }}
        >
          {currentPrice.price} {selectedCurrency}/FIL
        </Typography>
      </Link>
    </Box>
  ) : null
}

export default Price
