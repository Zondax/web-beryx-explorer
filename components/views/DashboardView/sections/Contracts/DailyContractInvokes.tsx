/**
 * Importing dependencies from various modules
 */
import { useEffect, useState } from 'react'

import { ContractsProps } from '@/api-client/beryx.types'
import { useContractInvokes } from '@/data/beryx'
import { useAppSettingsStore } from '@/store/ui/settings'
import { getDateUTC } from '@/utils/dates'
import { getLoadingStatus } from '@/utils/loadingStatus'
import { Grid, useTheme } from '@mui/material'

import { LineChart } from '../../../../common/Charts'
import { ItemTile } from '../../../../widgets/Charts'

/**
 * A functional React component that returns a line chart of daily contract invokes
 */
const DailyContractInvokes = () => {
  const theme = useTheme()
  const network = useAppSettingsStore(s => s.network)

  const {
    data: contractInvokesDaily,
    isLoading: isLoadingContractInvokesDaily,
    isSuccess: isSuccessContractInvokesDaily,
  } = useContractInvokes(network, 'daily')

  const [filteredDailyContractInvokes, setFilteredDailyContractInvokes] = useState<ContractsProps[] | undefined>(undefined)

  // Hook to filter the daily contract invokes based on loading status
  useEffect(() => {
    if (isSuccessContractInvokesDaily && contractInvokesDaily) {
      setFilteredDailyContractInvokes(contractInvokesDaily)
    } else {
      setFilteredDailyContractInvokes(undefined)
    }
  }, [contractInvokesDaily, isSuccessContractInvokesDaily])

  return (
    <>
      {/* Visual Component for Daily Contract Invokes */}
      <Grid item xs={12} md={6} height={'25rem'} data-testid="daily-contract-invokes">
        <ItemTile
          title={'Daily Contract Invokes'}
          downloadIcon
          data={contractInvokesDaily}
          defaultFilter={contractInvokesDaily ? 'one_year' : 'all'}
          selectorAction={setFilteredDailyContractInvokes}
          dateLabel={'bucket'}
          loading={getLoadingStatus(isLoadingContractInvokesDaily, isSuccessContractInvokesDaily)}
        >
          {filteredDailyContractInvokes ? (
            <LineChart
              data={{
                x: {
                  values: filteredDailyContractInvokes.map(({ bucket }: { bucket: string }) => bucket),
                  formatter: getDateUTC,
                },
                y: {
                  name: 'Contract Invokes',
                  values: filteredDailyContractInvokes.map((item: { count: number }) => ({ value: item.count })),
                },
              }}
              color={theme.palette.gradient1.level3}
            />
          ) : null}
        </ItemTile>
      </Grid>
    </>
  )
}

// Exporting the component for use in other modules
export default DailyContractInvokes
