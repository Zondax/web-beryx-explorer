import { useEffect, useMemo, useState } from 'react'

import { ContractsProps } from '@/api-client/beryx.types'
import { useContractInvokesByAddress } from '@/data/beryx'
import { useSearchStore } from '@/store/data/search'
import { getContractInvokesCurrentWeek, getFormattedValues } from '@/utils/dashboardFormatter'
import { getDateUTC } from '@/utils/dates'
import { getLoadingStatus } from '@/utils/loadingStatus'
import { Grid, useTheme } from '@mui/material'

import BarChart from 'components/common/Charts/BarChart'
import { ItemTile, StatsTile } from 'components/widgets/Charts'

/**
 * The ContractsStats component
 */
const ContractsStats = () => {
  const theme = useTheme()
  const inputValue = useSearchStore(s => s.searchInputValue)
  const network = useSearchStore(s => s.searchInputNetwork)

  const [filteredDailyContractInvokes, setFilteredDailyContractInvokes] = useState<ContractsProps[] | undefined>(undefined)

  const {
    data: contractInvokes,
    isLoading: isLoadingContractInvokes,
    isSuccess: isSuccessContractInvokes,
  } = useContractInvokesByAddress(inputValue, network, 'monthly', true)

  const {
    data: contractInvokesWeekly,
    isLoading: isLoadingContractInvokesWeekly,
    isSuccess: isSuccessContractInvokesWeekly,
  } = useContractInvokesByAddress(inputValue, network, 'weekly', true)

  const {
    data: contractInvokesDaily,
    isLoading: isLoadingContractInvokesDaily,
    isSuccess: isSuccessContractInvokesDaily,
  } = useContractInvokesByAddress(inputValue, network, 'daily', true)

  const contractInvokesTotal = useMemo(() => {
    if (isSuccessContractInvokes) {
      if (contractInvokes.length >= 1) {
        return contractInvokes.reduce((prev, current) => prev + current.count, 0)
      }
      return 0
    }
    return undefined
  }, [contractInvokes, isSuccessContractInvokes])

  /**
   * Calculate number of Contract Invokes Past Week
   */
  const contractInvokesCurrentWeek = useMemo(() => {
    if (isSuccessContractInvokesWeekly && contractInvokesWeekly.length > 1) {
      return getContractInvokesCurrentWeek(contractInvokesWeekly)
    }

    return undefined
  }, [contractInvokesWeekly, isSuccessContractInvokesWeekly])

  /**
   * Effect hook
   * filters daily gas consumption data
   */
  useEffect(() => {
    if (isSuccessContractInvokesDaily && contractInvokesDaily) {
      setFilteredDailyContractInvokes(contractInvokesDaily)
    } else {
      setFilteredDailyContractInvokes(undefined)
    }
  }, [contractInvokesDaily, isSuccessContractInvokesDaily])

  return (
    <Grid container spacing={'1rem'}>
      <Grid item container xs={12} md={3} spacing={'1rem'}>
        {/* Number of Contract Invokes */}
        <Grid item xs={6} md={12} data-testid={'contracts-invokes'}>
          <ItemTile
            title={'Number of Contract Invokes'}
            loading={getLoadingStatus(isLoadingContractInvokes, isSuccessContractInvokes)}
            size="medium"
            hasBorder
          >
            {contractInvokesTotal !== undefined ? (
              <StatsTile
                data={{
                  value: contractInvokesTotal,
                }}
              />
            ) : null}
          </ItemTile>
        </Grid>

        {/* Number of Unique Contract Invokes */}
        <Grid item xs={6} md={12} data-testid={'unique-contracts-invokes'}>
          <ItemTile
            title={'Number of Contract Invokes in the Current Week'}
            loading={getLoadingStatus(isLoadingContractInvokesWeekly, isSuccessContractInvokesWeekly)}
            size="medium"
            hasBorder
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

      <Grid item container xs={12} md={9}>
        {/* Daily Contract Invokes */}
        <Grid item xs={12} md={12} height={'25rem'} data-testid={'daily-contract-invokes'}>
          <ItemTile
            title={'Daily Contract Invokes'}
            downloadIcon
            data={contractInvokesDaily}
            selectorAction={setFilteredDailyContractInvokes}
            dateLabel={'bucket'}
            defaultFilter={'one_year'}
            loading={getLoadingStatus(isLoadingContractInvokesDaily, isSuccessContractInvokesDaily)}
            hasBorder
          >
            {filteredDailyContractInvokes ? (
              <BarChart
                data={{
                  x: {
                    values: filteredDailyContractInvokes.map(({ bucket }: { bucket: string }) => bucket),
                    formatter: getDateUTC,
                  },
                  y: {
                    name: 'Contract Invokes',
                    ...getFormattedValues({
                      values: filteredDailyContractInvokes.map((item: ContractsProps) => ({
                        value: item.count,
                      })),
                    }),
                  },
                }}
                color={theme.palette.primary.main}
              />
            ) : null}
          </ItemTile>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ContractsStats
