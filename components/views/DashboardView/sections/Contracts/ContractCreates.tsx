/**
 * ContractCreates component performs complex data analysis using the dynamic library,
 * and provides a visualization of the contract creates on a weekly, monthly and daily basis.
 */
import dynamic from 'next/dynamic'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { useContractsCreates } from '@/data/beryx'
import { useAppSettingsStore } from '@/store/ui/settings'
import { getContractInvokesCurrentWeek } from '@/utils/dashboardFormatter'
import { getLoadingStatus } from '@/utils/loadingStatus'
import { Grid } from '@mui/material'

import { ItemTile } from '../../../../widgets/Charts'

// Import StatsTile component dynamically for client side rendering.
const StatsTile = dynamic(() => import('../../../../widgets/Charts/StatsTile'), { ssr: false })

/**
 * `ContractCreates` is a functional component that visualizes the contract creates on a weekly, monthly and daily basis.
 * It uses the `useTranslation` hook from `react-i18next` to handle i18n translation functionalities.
 *
 * @returns The rendered JSX element
 */
const ContractCreates = () => {
  const { t } = useTranslation()
  const network = useAppSettingsStore(s => s.network)

  const {
    data: contractsCreatesWeekly,
    isLoading: isLoadingContractsCreatesWeekly,
    isSuccess: isSuccessContractsCreatesWeekly,
  } = useContractsCreates(network, 'weekly', false, { sort_by: 'bucket:desc', limit: 100 })

  const {
    data: contractsCreatesDaily,
    isLoading: isLoadingContractsCreatesDaily,
    isSuccess: isSuccessContractsCreatesDaily,
  } = useContractsCreates(network, 'daily', true)

  const {
    data: contractsCreatesMonthly,
    isLoading: isLoadingContractsCreatesMonthly,
    isSuccess: isSuccessContractsCreatesMonthly,
  } = useContractsCreates(network, 'monthly', true)

  /**
   * Calculate the percentage change in contract creates for the past 7 days.
   * This function uses the useMemo hook to optimize performance by memorizing the result,
   * and only recalculating if the dependencies [contractsCreateWeekly] have changed.
   *
   * @returns The percentage change in contract creates for the past 7 days, or undefined if the data is not available.
   */
  const contractCreatesCurrentWeek = useMemo(() => {
    if (isSuccessContractsCreatesWeekly && contractsCreatesWeekly.length > 1) {
      return getContractInvokesCurrentWeek([...contractsCreatesWeekly].reverse())
    }
    return undefined
  }, [contractsCreatesWeekly, isSuccessContractsCreatesWeekly])

  return (
    <Grid item container xs={12} md={6} spacing={'1rem'}>
      {/* Render the total number of contracts */}
      <Grid item xs={6} md={6} data-testid="total-number-of-contracts">
        <ItemTile
          title={t('Total Number of Contracts')}
          loading={getLoadingStatus(isLoadingContractsCreatesMonthly, isSuccessContractsCreatesMonthly)}
          size="medium"
        >
          {contractsCreatesMonthly && contractsCreatesMonthly.length >= 1 ? (
            <StatsTile data={{ value: contractsCreatesMonthly.reduce((prev, current) => prev + current.count, 0) }} />
          ) : null}
        </ItemTile>
      </Grid>
      {/* Render the number of contracts created today */}
      <Grid item xs={6} md={6} data-testid="number-of-contracts-created-today">
        <ItemTile
          title={t('Number of Contracts Created in the Current Day')}
          loading={getLoadingStatus(isLoadingContractsCreatesDaily, isSuccessContractsCreatesDaily)}
          size="medium"
        >
          {contractsCreatesDaily && contractsCreatesDaily.length > 1 ? (
            <StatsTile data={{ value: contractsCreatesDaily[contractsCreatesDaily.length - 1].count }} />
          ) : null}
        </ItemTile>
      </Grid>
      {/* Render the percentage change in contract creates for the current week compared to last week */}
      <Grid item xs={12} md={12} data-testid="number-of-contracts-created-this-week">
        <ItemTile
          title={t('Number of Contracts Created in the Current Week')}
          loading={getLoadingStatus(isLoadingContractsCreatesWeekly, isSuccessContractsCreatesWeekly)}
          size="medium"
        >
          {contractCreatesCurrentWeek !== undefined ? (
            <StatsTile
              data={{
                value: `${contractCreatesCurrentWeek > 0 ? '+' : ''}${contractCreatesCurrentWeek.toFixed(1)}%`,
              }}
              description={t('Compared to Last Week')}
            />
          ) : null}
        </ItemTile>
      </Grid>
    </Grid>
  )
}
export default ContractCreates
