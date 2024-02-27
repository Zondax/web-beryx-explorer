import { useEffect, useMemo, useState } from 'react'

import { GasUsedProps } from '@/api-client/beryx.types'
import { useGasUsedByAddress } from '@/data/beryx'
import { useSearchStore } from '@/store/data/search'
import { getFormattedFilValues, getGasUsedCurrentWeek } from '@/utils/dashboardFormatter'
import { getDateUTC } from '@/utils/dates'
import { getLoadingStatus } from '@/utils/loadingStatus'
import { formatFilValue } from '@/utils/numbers'
import { Grid, useTheme } from '@mui/material'

import { LineChart } from 'components/common/Charts'
import { ItemTile, StatsTile } from 'components/widgets/Charts'

/**
 * The GasUsedStats component
 */
const GasUsedStats = () => {
  const theme = useTheme()
  const inputValue = useSearchStore(s => s.searchInputValue)
  const network = useSearchStore(s => s.searchInputNetwork)

  const {
    data: gasUsedMonthly,
    isLoading: isLoadingGasUsed,
    isSuccess: isSuccessGasUsed,
  } = useGasUsedByAddress(inputValue, network, 'monthly', true)

  const {
    data: gasUsedWeekly,
    isLoading: isLoadingGasUsedWeekly,
    isSuccess: isSuccessGasUsedWeekly,
  } = useGasUsedByAddress(inputValue, network, 'weekly', false, { sort_by: 'bucket:desc', limit: 100 })

  const {
    data: gasUsedDaily,
    isLoading: isLoadingGasUsedDaily,
    isSuccess: isSuccessGasUsedDaily,
  } = useGasUsedByAddress(inputValue, network, 'daily', true)

  const gasUsedTotal = useMemo(() => {
    if (isSuccessGasUsed) {
      if (gasUsedMonthly.length >= 1) {
        return formatFilValue(gasUsedMonthly.reduce((prev, current) => prev + parseInt(current.gas_used), 0))
      }
      return { value: 0 }
    }
    return undefined
  }, [gasUsedMonthly, isSuccessGasUsed])

  const [filteredDailyGasConsumption, setFilteredDailyGasConsumption] = useState<GasUsedProps[] | undefined>(undefined)

  const gasUsedCurrentWeek = useMemo(() => {
    if (isSuccessGasUsedWeekly && gasUsedWeekly && gasUsedWeekly.length > 1) {
      return getGasUsedCurrentWeek(gasUsedWeekly.toReversed())
    }
    return undefined
  }, [gasUsedWeekly, isSuccessGasUsedWeekly])

  /**
   * Effect hook
   * filters daily gas consumption data
   */
  useEffect(() => {
    if (isSuccessGasUsedDaily && gasUsedDaily) {
      setFilteredDailyGasConsumption(gasUsedDaily)
    } else {
      setFilteredDailyGasConsumption(undefined)
    }
  }, [gasUsedDaily, isSuccessGasUsedDaily])

  return (
    <Grid container xs={12} spacing={'1rem'}>
      <Grid item container xs={12} md={3} spacing={'1rem'}>
        {/* Total Gas Consumption */}
        <Grid item xs={6} md={12} data-testid={'total-gas-used'}>
          <ItemTile title={'Total Gas Consumption'} loading={getLoadingStatus(isLoadingGasUsed, isSuccessGasUsed)} size="medium" hasBorder>
            {gasUsedTotal !== undefined ? (
              <StatsTile
                data={{
                  value: gasUsedTotal.value,
                  unit: gasUsedTotal.unit,
                }}
              />
            ) : null}
          </ItemTile>
        </Grid>

        {/* Gas Consumption Current Week */}
        <Grid item xs={6} md={12} data-testid={'gas-used-this-week'}>
          <ItemTile
            title={'Gas Used in the Current Week'}
            loading={getLoadingStatus(isLoadingGasUsedWeekly, isSuccessGasUsedWeekly)}
            size="medium"
            hasBorder
          >
            {gasUsedCurrentWeek !== undefined ? (
              <StatsTile
                data={{
                  value: `${gasUsedCurrentWeek > 0 ? '+' : ''}${gasUsedCurrentWeek.toFixed(1)}%`,
                }}
                description={'Compared to Last Week'}
              />
            ) : null}
          </ItemTile>
        </Grid>
      </Grid>

      <Grid item container xs={12} md={9}>
        {/* Daily Gas Consumption */}
        <Grid item xs={12} md={12} height={'25rem'} data-testid={'daily-gas-consumption'}>
          <ItemTile
            title={'Daily Gas Consumption'}
            downloadIcon
            data={gasUsedDaily}
            selectorAction={setFilteredDailyGasConsumption}
            dateLabel={'bucket'}
            loading={getLoadingStatus(isLoadingGasUsedDaily, isSuccessGasUsedDaily)}
            hasBorder
            defaultFilter={gasUsedDaily ? 'one_year' : 'all'}
          >
            {filteredDailyGasConsumption ? (
              <LineChart
                data={{
                  x: {
                    values: filteredDailyGasConsumption.map(({ bucket }: { bucket: string }) => bucket),
                    formatter: getDateUTC,
                  },
                  y: {
                    name: 'Gas',
                    ...getFormattedFilValues(
                      filteredDailyGasConsumption.map((item: GasUsedProps) => ({
                        value: parseInt(item.gas_used),
                      }))
                    ),
                  },
                }}
                color={theme.palette.gradient1.level6}
              />
            ) : null}
          </ItemTile>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default GasUsedStats
