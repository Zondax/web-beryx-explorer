import dynamic from 'next/dynamic'
import { useMemo } from 'react'

import { useContractInvokes } from '@/data/beryx'
import { useAppSettingsStore } from '@/store/ui/settings'
import { getContractInvokesCurrentWeek } from '@/utils/dashboardFormatter'
import { getLoadingStatus } from '@/utils/loadingStatus'
import { Grid } from '@mui/material'

import { ItemTile } from '../../../../widgets/Charts'

const StatsTile = dynamic(() => import('../../../../widgets/Charts/StatsTile'), { ssr: false })

/**
 * Component shows the invokes of contracts.
 * It shows the number of invokes in the current day, the past week and compares it with the last week.
 *
 * @component
 * @example
 * return <ContractInvokes />
 */
const ContractInvokes = () => {
  const network = useAppSettingsStore(s => s.network)

  const {
    data: contractInvokesWeekly,
    isLoading: isLoadingContractInvokesWeekly,
    isSuccess: isSuccessContractInvokesWeekly,
  } = useContractInvokes(network, 'weekly', false, { sort_by: 'bucket:desc', limit: 100 })

  const {
    data: contractInvokesDaily,
    isLoading: isLoadingContractInvokesDaily,
    isSuccess: isSuccessContractInvokesDaily,
  } = useContractInvokes(network, 'daily', true)

  // Calculate number of Contract Invokes Past Week
  const contractInvokesCurrentWeek = useMemo(() => {
    if (isSuccessContractInvokesWeekly && contractInvokesWeekly.length > 1) {
      return getContractInvokesCurrentWeek([...contractInvokesWeekly].reverse())
    }

    return undefined
  }, [contractInvokesWeekly, isSuccessContractInvokesWeekly])

  return (
    <Grid item container xs={12} md={6} spacing={'1rem'}>
      {/* Number of Contract Invokes Today */}
      <Grid item xs={6} md={6} data-testid="number-of-contract-invokes-today">
        <ItemTile
          title={'Number of Contract Invokes in the Current Day'}
          loading={getLoadingStatus(isLoadingContractInvokesDaily, isSuccessContractInvokesDaily)}
          size="medium"
        >
          {contractInvokesDaily && contractInvokesDaily.length > 1 ? (
            <StatsTile data={{ value: contractInvokesDaily[contractInvokesDaily.length - 1].count }} />
          ) : null}
        </ItemTile>
      </Grid>

      {/* Number of Contract Invokes Past Week */}
      <Grid item xs={6} md={6} data-testid="number-of-contract-invokes-week">
        <ItemTile
          title={'Number of Contract Invokes in the Current Week'}
          loading={getLoadingStatus(isLoadingContractInvokesWeekly, isSuccessContractInvokesWeekly)}
          size="medium"
        >
          {contractInvokesWeekly && contractInvokesWeekly.length > 1 ? (
            <StatsTile data={{ value: contractInvokesWeekly[0].count }} />
          ) : null}
        </ItemTile>
      </Grid>

      {/* Number of Contract Invokes this Week */}
      <Grid item xs={12} md={12} data-testid="number-of-contracts-invokes-this-week">
        <ItemTile
          title={'Number of Contract Invokes in the Current Week'}
          loading={getLoadingStatus(isLoadingContractInvokesWeekly, isSuccessContractInvokesWeekly)}
          size="medium"
        >
          {contractInvokesCurrentWeek !== undefined ? (
            <StatsTile
              data={{
                value: `${contractInvokesCurrentWeek > 0 ? '+' : ''}${contractInvokesCurrentWeek.toFixed(1)}%`,
              }}
              description={'Compared to Last Week'}
            />
          ) : null}
        </ItemTile>
      </Grid>
    </Grid>
  )
}

export default ContractInvokes
