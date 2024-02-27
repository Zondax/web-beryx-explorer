import { useTranslation } from 'react-i18next'

import { Grid, Typography } from '@mui/material'

import ContractsStats from '../../../../../widgets/Stats/ContractsStats'

/**
 * The ContractStats component
 */
const ContractStats = () => {
  const { t } = useTranslation()

  return (
    <>
      {/* Contracts */}
      <Grid container xs={12} gap={'1rem'} pb={'2rem'} height={'fit-content'}>
        <Typography variant={'h5'}>{t('Contracts')}</Typography>
        <ContractsStats />
      </Grid>
    </>
  )
}

export default ContractStats
