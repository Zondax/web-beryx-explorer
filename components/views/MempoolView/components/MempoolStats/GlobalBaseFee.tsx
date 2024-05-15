/**
 * Imports necessary dependencies.
 */
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { StatsFrequency, statsFrequencyMapped } from '@/config/config'
import { useGlobalBaseFee } from '@/data/beryx'
import useAppSettingsStore from '@/store/ui/settings'
import { getLoadingStatus } from '@/utils/loadingStatus'

import StatsTile from 'components/views/MempoolView/components/StatsTile'
import { ItemTile } from 'components/widgets/Charts'

/**
 * GlobalBaseFee statistics component.
 */
const GlobalBaseFee = ({ rangeSelected }: { rangeSelected: StatsFrequency }) => {
  const { t } = useTranslation()
  const network = useAppSettingsStore(s => s.network)

  const {
    data: globalBaseFeeDaily,
    isLoading: isLoadingGlobalBaseFeeDaily,
    isSuccess: isSuccessGlobalBaseFeeDaily,
  } = useGlobalBaseFee(network, statsFrequencyMapped[rangeSelected], false, { sort_by: 'bucket:desc' })

  /* Position of the base fee element to show */
  const baseFeeIndex = useMemo(() => {
    // If the selected range is previous hour, the second elem is taken. Otherwise, the first element.
    return rangeSelected === 'previous_hour' ? 1 : 0
  }, [rangeSelected])

  /* Global Base Fee Bar */
  return (
    <ItemTile
      title={t('Global Base Fee')}
      tooltip={'Global Base Fee statistics for a specified period.'}
      loading={getLoadingStatus(isLoadingGlobalBaseFeeDaily, isSuccessGlobalBaseFeeDaily)}
      size="medium"
      rightLabel={'attoFIL'}
      hasBorder
    >
      {isSuccessGlobalBaseFeeDaily && globalBaseFeeDaily ? (
        <StatsTile
          data={{
            items: [
              {
                label: 'Avg',
                value: globalBaseFeeDaily[baseFeeIndex].base_fee_avg,
              },
            ],
            min: globalBaseFeeDaily[baseFeeIndex].base_fee_min,
            max: globalBaseFeeDaily[baseFeeIndex].base_fee_max,
          }}
        />
      ) : null}
    </ItemTile>
  )
}

export default GlobalBaseFee
