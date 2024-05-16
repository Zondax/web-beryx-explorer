/**
 * This is a Contracts component which interacts with our store
 * and utility functions to fetch and display data.
 * It fetches contract data (create and invoke) for different time intervals (daily, weekly, monthly)
 * and handles data errors.
 * It also displays third-party components wrapped in Material UI Grid and Typography.
 */
import { useTranslation } from 'react-i18next'

import { Box, Grid, Typography } from '@mui/material'

import ContractCreates from './ContractCreates'
import ContractInvokes from './ContractInvokes'
import DailyContractCreates from './DailyContractCreates'
import DailyContractInvokes from './DailyContractInvokes'

// Daily Contracts graph

const Contracts = () => {
  const { t } = useTranslation() // i18n translation function

  return (
    <>
      <Box sx={{ paddingTop: { xs: '8rem', md: '5rem' }, marginTop: { xs: '-8rem', md: '-5rem' } }} id="contract-stats">
        <Typography variant={'h4'} component="span">
          {t('Contracts')}
        </Typography>
      </Box>
      <Grid container spacing={'1rem'} pb={'10rem'}>
        <DailyContractCreates />
        <ContractCreates />
        <ContractInvokes />
        <DailyContractInvokes />
      </Grid>
    </>
  )
}
export default Contracts
