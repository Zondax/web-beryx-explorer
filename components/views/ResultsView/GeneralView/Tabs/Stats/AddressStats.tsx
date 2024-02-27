import { useTranslation } from 'react-i18next'

import { Grid, Typography } from '@mui/material'

import AccountEvolution from '../../../../../widgets/Stats/AccountEvolution'
import ContractsStats from '../../../../../widgets/Stats/AddressContractsStats'
import GasUsedStats from '../../../../../widgets/Stats/GasUsedStats'

/**
 * The AddressStats component
 */
const AddressStats = () => {
  const { t } = useTranslation()

  return (
    <>
      {/* Gas Consumption */}
      <Grid container xs={12} gap={'1rem'} pb={'2rem'}>
        <Typography variant={'h5'}>{t('Gas Consumption')}</Typography>
        <GasUsedStats />
      </Grid>

      {/* Account Evolution */}
      <Grid container xs={12} gap={'1rem'} pb={'2rem'}>
        <Typography variant={'h5'}>{t('Account Evolution')}</Typography>
        <AccountEvolution />
      </Grid>

      {/* Contracts */}
      <Grid container xs={12} gap={'1rem'} pb={'2rem'}>
        <Typography variant={'h5'}>{t('Contracts')}</Typography>
        <ContractsStats />
      </Grid>
    </>
  )
}

export default AddressStats
