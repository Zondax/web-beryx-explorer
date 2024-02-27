import { useEffect, useState } from 'react'

import { ContractsProps } from '@/api-client/beryx.types'
import { useContractsCreates } from '@/data/beryx'
import { useAppSettingsStore } from '@/store/ui/settings'
import { getDateUTC } from '@/utils/dates'
import { getLoadingStatus } from '@/utils/loadingStatus'
import { Grid, useTheme } from '@mui/material'

import { LineChart } from '../../../../common/Charts'
import { ItemTile } from '../../../../widgets/Charts'

const DailyContractCreates = () => {
  const network = useAppSettingsStore(s => s.network)
  /**
   * Get the contracts.
   * @type {object}
   */
  const {
    data: contractsCreatesDaily,
    isLoading: isLoadingContractsCreatesDaily,
    isSuccess: isSuccessContractsCreatesDaily,
  } = useContractsCreates(network, 'daily')

  /**
   *  Use theme provided by the parent component.
   */
  const theme = useTheme()

  /**
   * @type {React.useState}
   * Create a state variable for filtered contracts created on daily basis.
   */
  const [filteredContractCreatesDaily, setFilteredContractCreatesDaily] = useState<ContractsProps[] | undefined>(undefined)

  /**
   * @function
   * @name useEffect
   * Handle state updates when changes occurred in daily contract creations.
   */
  useEffect(() => {
    if (isSuccessContractsCreatesDaily && contractsCreatesDaily) {
      setFilteredContractCreatesDaily(contractsCreatesDaily)
    } else {
      setFilteredContractCreatesDaily(undefined)
    }
  }, [contractsCreatesDaily, isSuccessContractsCreatesDaily])

  return (
    <>
      {/* Contract Creates Daily */}
      <Grid item xs={12} md={6} height={'25rem'} data-testid="contract-creates-daily">
        <ItemTile
          title={'Daily Contract Creates'}
          downloadIcon
          data={contractsCreatesDaily}
          defaultFilter={contractsCreatesDaily ? 'one_year' : 'all'}
          selectorAction={setFilteredContractCreatesDaily}
          dateLabel={'bucket'}
          loading={getLoadingStatus(isLoadingContractsCreatesDaily, isSuccessContractsCreatesDaily)}
        >
          {filteredContractCreatesDaily ? (
            <LineChart
              data={{
                x: {
                  values: filteredContractCreatesDaily.map(({ bucket }: { bucket: string }) => bucket),
                  formatter: getDateUTC,
                },
                y: {
                  name: 'Contract Creates',
                  values: filteredContractCreatesDaily.map((item: { count: number }) => ({ value: item.count })),
                },
              }}
              color={theme.palette.gradient1.level6}
            />
          ) : null}
        </ItemTile>
      </Grid>
    </>
  )
}

/**
 * @exports
 * Export the DailyContractCreates component by default.
 */
export default DailyContractCreates
