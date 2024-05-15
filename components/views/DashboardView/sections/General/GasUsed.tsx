import dynamic from 'next/dynamic'
import { useMemo } from 'react'

import { useGasUsed } from '@/data/beryx'
import useAppSettingsStore from '@/store/ui/settings'
import { getGasUsedCurrentWeek } from '@/utils/dashboardFormatter'
import { getLoadingStatus } from '@/utils/loadingStatus'
import { formatFilValue } from '@/utils/numbers'
import { Grid } from '@mui/material'

import { ItemTile } from '../../../../widgets/Charts'

// Dynamically import the StatsTile component
// to enable code splitting
// and optimize the component load performance
const StatsTile = dynamic(() => import('../../../../widgets/Charts/StatsTile'), { ssr: false })

/**
 * FirstSection is a React functional component
 * that displays two grid items about gas usage.
 * It fetches and calculates data from the global
 * dashboard state using the "useDashboardStore" store hook.
 */
const FirstSection = () => {
  const network = useAppSettingsStore(s => s.network)

  /**
   * Hook to get daily gas used by address
   */
  const { data: gasUsedDaily, isLoading: isLoadingGasUsedDaily, isSuccess: isSuccessGasUsedDaily } = useGasUsed(network, 'daily', true)

  /**
   * Hook to get weekly gas used by address
   */
  const {
    data: gasUsedWeekly,
    isLoading: isLoadingGasUsedWeekly,
    isSuccess: isSuccessGasUsedWeekly,
  } = useGasUsed(network, 'weekly', false, { sort_by: 'bucket:desc', limit: 100 })

  // Calculate the percentage of gas used in the past 7 days compared to previous week
  const gasUsedPast7Days = useMemo(() => {
    if (isSuccessGasUsedWeekly && gasUsedWeekly.length > 1) {
      return getGasUsedCurrentWeek([...gasUsedWeekly].reverse())
    }
    return undefined
  }, [gasUsedWeekly, isSuccessGasUsedWeekly])

  return (
    <Grid item container xs={12} md={3} spacing={'1rem'}>
      <Grid item xs={6} md={12} data-testid={'gas-used-this-week'}>
        <ItemTile
          title={'Gas Used in the Current Week'}
          loading={getLoadingStatus(isLoadingGasUsedWeekly, isSuccessGasUsedWeekly)}
          size="medium"
        >
          {gasUsedPast7Days !== undefined ? (
            <StatsTile
              data={{
                value: `${gasUsedPast7Days > 0 ? '+' : ''}${gasUsedPast7Days.toFixed(1)}%`,
              }}
              description={'Compared to Last Week'}
            />
          ) : null}
        </ItemTile>
      </Grid>
      <Grid item xs={6} md={12} data-testid={'avg-gas-used-past-24-hours'}>
        <ItemTile
          title={'Avg. Gas Used in the Past Day'}
          loading={getLoadingStatus(isLoadingGasUsedDaily, isSuccessGasUsedDaily)}
          size="medium"
        >
          {gasUsedDaily && gasUsedDaily?.length > 1 ? (
            <StatsTile data={formatFilValue(parseInt(gasUsedDaily[gasUsedDaily.length - 2].gas_used) / 24)} />
          ) : null}
        </ItemTile>
      </Grid>
    </Grid>
  )
}

export default FirstSection
