/**
 * Module dependencies.
 */
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

import { Box, Grid, Typography, useTheme } from '@mui/material'

import BaseFeeVariations from './BaseFeeVariations'
import GasConsumption from './GasConsumption'
import GasUsed from './GasUsed'

/**
 * The General component which displays the General section of the dashboard.
 * @component
 * @example
 * return (
 *    <General />
 * )
 */
const General = () => {
  const { t } = useTranslation()
  const theme = useTheme()

  return (
    <>
      <Box sx={{ paddingTop: { xs: '8rem', md: '8rem' }, marginTop: { xs: '-8rem', md: '-8rem' } }} id="gas-used-stats">
        <Typography variant={'h4'} component="span">
          {t('Gas Used')}
        </Typography>
        <Typography
          component={'p'}
          color={'text.secondary'}
          mt={1}
          textAlign={{ xs: 'left', md: 'center' }}
          sx={{
            typography: { xs: 'body2', md: 'body1' },
            '& a': {
              color: theme.palette.main,
            },
          }}
        >
          {t('For more information about gas visit ')}
          <Link href={'/estimate_gas'}>{t('Gas Estimator')}</Link>
          {t(' or ')}
          <Link href={'/mempool?tab=stats'}>{t('Mempool Statistics')}</Link>.
        </Typography>
      </Box>
      <Grid container spacing={'1rem'} pb={'2rem'}>
        <GasUsed />
        <GasConsumption />
        <BaseFeeVariations />
      </Grid>
    </>
  )
}

export default General
