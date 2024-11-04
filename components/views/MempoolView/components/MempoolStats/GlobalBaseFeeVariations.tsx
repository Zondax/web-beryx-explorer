/**
 * Imports necessary dependencies.
 */
import { useMemo } from 'react'

import { GlobalBaseFee } from '@/api-client/beryx.types'
import { StatsFrequency } from '@/config/config'
import { useGlobalBaseFee } from '@/data/beryx'
import useAppSettingsStore from '@/store/ui/settings'
import { getFormattedFilValues } from '@/utils/dashboardFormatter'
import { getDateUTC } from '@/utils/dates'
import { getLoadingStatus } from '@/utils/loadingStatus'
import { useTheme } from '@mui/material'

import { LineChart } from 'components/common/Charts'
import { ItemTile } from 'components/widgets/Charts'
import { rangeValues } from 'components/widgets/Charts/ItemTile'

/**
 * GlobalBaseFeeVariations statistics component.
 */
const GlobalBaseFeeVariations = ({ rangeSelected }: { rangeSelected: StatsFrequency }) => {
  const theme = useTheme()
  const network = useAppSettingsStore(s => s.network)

  /**
   * Hook to get global base fee
   */
  const {
    data: globalBaseFeeDaily,
    isLoading: isLoadingGlobalBaseFeeDaily,
    isSuccess: isSuccessGlobalBaseFeeDaily,
  } = useGlobalBaseFee(network, rangeSelected === StatsFrequency.PREVIOUS_WEEK ? 'daily' : 'hourly', false, { sort_by: 'bucket:desc' })

  const filteredBaseFeeVariations: GlobalBaseFee[] | undefined = useMemo(() => {
    if (!globalBaseFeeDaily || !Array.isArray(globalBaseFeeDaily)) {
      return
    }

    // Get the date in milisecond with 00:00:00
    const firstDate =
      Math.floor(new Date().getTime() / 86400000) * 86400000 -
      (rangeSelected === StatsFrequency.PREVIOUS_WEEK ? rangeValues['seven_days'] : 86400000)

    const filtered = globalBaseFeeDaily.filter((elem: GlobalBaseFee) => new Date(elem['bucket']).getTime() >= firstDate)

    return filtered
  }, [globalBaseFeeDaily, rangeSelected])

  /* Global Base Fee Bar */
  return (
    <ItemTile
      title={'Base Fee Variations'}
      tooltip={'Global Base Fee Variations for a specified period.'}
      loading={getLoadingStatus(isLoadingGlobalBaseFeeDaily, isSuccessGlobalBaseFeeDaily)}
      size="medium"
      href={'/dashboard#base-fee-variations-stats'}
      hasBorder
    >
      {filteredBaseFeeVariations ? (
        <LineChart
          data={{
            x: {
              values: filteredBaseFeeVariations.toReversed().map(({ bucket }: { bucket: string }) => bucket),
              formatter: getDateUTC,
            },
            y: {
              name: 'Gas',
              ...getFormattedFilValues(
                filteredBaseFeeVariations.toReversed().map((item: GlobalBaseFee) => ({
                  value: item.base_fee_avg,
                }))
              ),
            },
          }}
          color={theme.palette.gradient1.level3}
          hideDataZoom
          basicChart
          tooltipHour={rangeSelected !== StatsFrequency.PREVIOUS_WEEK}
        />
      ) : null}
    </ItemTile>
  )
}

export default GlobalBaseFeeVariations
