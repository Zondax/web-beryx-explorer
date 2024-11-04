import { useState } from 'react'

import { GlobalBaseFee } from '@/api-client/beryx.types'
import { useGlobalBaseFee } from '@/data/beryx'
import useAppSettingsStore from '@/store/ui/settings'
import { getFormattedFilValues } from '@/utils/dashboardFormatter'
import { getDateUTC } from '@/utils/dates'
import { getLoadingStatus } from '@/utils/loadingStatus'
import { Grid, useTheme } from '@mui/material'

import { LineChart } from 'components/common/Charts'
import { ItemTile } from 'components/widgets/Charts'

/**
 * BaseFeeVariations is a React functional component
 */
const BaseFeeVariations = () => {
  const theme = useTheme()
  const network = useAppSettingsStore(s => s.network)

  /**
   * Hook to get global base fee
   */
  const {
    data: globalBaseFeeDaily,
    isLoading: isLoadingGlobalBaseFeeDaily,
    isSuccess: isSuccessGlobalBaseFeeDaily,
  } = useGlobalBaseFee(network, 'daily', false, { sort_by: 'bucket:desc' })

  const [filteredBaseFeeVariations, setFilteredBaseFeeVariations] = useState<GlobalBaseFee[] | undefined>(undefined)

  return (
    <Grid item xs={12} md={12} data-testid={'base-fee-variation'} id={'base-fee-variations-stats'} sx={{ minHeight: '20rem' }}>
      <ItemTile
        title={'Base Fee Variations'}
        downloadIcon
        data={globalBaseFeeDaily}
        defaultFilter={globalBaseFeeDaily ? 'one_year' : 'all'}
        selectorAction={setFilteredBaseFeeVariations}
        dateLabel={'bucket'}
        loading={getLoadingStatus(isLoadingGlobalBaseFeeDaily, isSuccessGlobalBaseFeeDaily)}
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
          />
        ) : null}
      </ItemTile>
    </Grid>
  )
}

export default BaseFeeVariations
