/**
 * Module dependencies.
 */
import { useTranslation } from 'react-i18next'

import { Box, Grid, Typography } from '@mui/material'

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
  return (
    <>
      <Box sx={{ paddingTop: { xs: '8rem', md: '5rem' }, marginTop: { xs: '-8rem', md: '-5rem' } }} id="gas-used-stats">
        <Typography variant={'h4'} component="span">
          {t('Gas Used')}
        </Typography>
      </Box>
      <Grid container spacing={'1rem'} pb={'2rem'}>
        <GasUsed />
        <GasConsumption />
      </Grid>
    </>
  )
}

export default General
