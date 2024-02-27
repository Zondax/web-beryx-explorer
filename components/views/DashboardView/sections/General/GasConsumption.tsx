/**
 * File imports
 */
import { useEffect, useState } from 'react'

import { GasUsedProps } from '@/api-client/beryx.types'
import { useGasUsed } from '@/data/beryx'
import { useAppSettingsStore } from '@/store/ui/settings'
import { getFormattedFilValues } from '@/utils/dashboardFormatter'
import { getDateUTC } from '@/utils/dates'
import { getLoadingStatus } from '@/utils/loadingStatus'
import { Grid, useTheme } from '@mui/material'

import { LineChart } from '../../../../common/Charts'
import { ItemTile } from '../../../../widgets/Charts'

/**
 * Represents the second section of the dashboard
 * @returns {
 *    JSX.Element
 * }
 */
const SecondSection = (): JSX.Element => {
  /**
   * States:
   * theme - color theme state
   * gasUsedDaily - daily used gas state
   * filteredDailyGasConsumption - filtered daily gas consumption
   */
  const theme = useTheme()

  const network = useAppSettingsStore(s => s.network)

  /**
   * Hook to get daily gas used by address
   */
  const { data: gasUsedDaily, isLoading: isLoadingGasUsedDaily, isSuccess: isSuccessGasUsedDaily } = useGasUsed(network, 'daily', true)

  const [filteredDailyGasConsumption, setFilteredDailyGasConsumption] = useState<GasUsedProps[] | undefined>(undefined)

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
    <Grid item container xs={12} md={9}>
      {/* Daily Gas Consumption*/}
      <Grid item xs={12} md={12} height={'25rem'} data-testid={'daily-gas-consumption'}>
        <ItemTile
          title={'Daily Gas Consumption'}
          downloadIcon
          data={gasUsedDaily}
          defaultFilter={gasUsedDaily ? 'one_year' : 'all'}
          selectorAction={setFilteredDailyGasConsumption}
          dateLabel={'bucket'}
          loading={getLoadingStatus(isLoadingGasUsedDaily, isSuccessGasUsedDaily)}
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
  )
}

export default SecondSection
