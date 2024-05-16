import { useTranslation } from 'react-i18next'

import { Grid, Typography } from '@mui/material'

import ContractBalanceStats from 'components/widgets/Stats/ContractBalanceStats'

import ContractsStats from '../../../../../widgets/Stats/ContractsStats'

/**
 * The ContractStats component
 */
const ContractStats = () => {
  const { t } = useTranslation()

  return (
    <>
      {/* Contracts */}
      <Grid container gap={'1rem'} pb={'2rem'} height={'fit-content'}>
        <Typography variant={'h5'}>{t('Contract Invokes')}</Typography>
        <ContractsStats />
        <Typography variant={'h5'}>{t('Contract Balance')}</Typography>
        <ContractBalanceStats />
      </Grid>
    </>
  )
}

export default ContractStats
