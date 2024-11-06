/**
 * @module BalanceChart
 */
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { LoadingStatus } from '@/config/config'
import { useAddressValueFlow } from '@/data/beryx'
import { useSearchStore } from '@/store/data/search'
import { getBalanceOverTime } from '@/utils/balance'
import { getDateUTCFromTimestamp } from '@/utils/dates'
import { FilUnits } from '@/utils/numbers'
import { ChartBubbleLine } from '@carbon/pictograms-react'
import { useTheme } from '@mui/material'

import { LineChart } from '../../../../../common/Charts'
import { ItemTile } from '../../../../../widgets/Charts'
import { NoRows } from '../../../../../widgets/Table'

/**
 * BalanceChart component
 * @component
 */
const BalanceChart = ({ title }: { title?: string }) => {
  const theme = useTheme()
  const { t } = useTranslation()

  const searchValue: string = useSearchStore(s => s.searchInputValue)
  const network = useSearchStore(s => s.searchInputNetwork)

  const [balances, setBalances] = useState<{ timestamp: number; value: string }[] | undefined>(undefined)
  const [filteredBalances, setFilteredBalances] = useState<{ timestamp: number; value: string }[] | undefined>(undefined)
  const [loadingStatus, setLoadingStatus] = useState<LoadingStatus>(LoadingStatus.Idle)

  const { data: addressValueFlow, isSuccess: isSuccessAddressValueFlow } = useAddressValueFlow(searchValue, network)

  /**
   * Effect to fetch balances over time
   */
  useEffect(() => {
    setLoadingStatus(LoadingStatus.Loading)
    /**
     * Asynchronous function to fetch balances over time.
     * It calls the getBalanceOverTime function with the searchValue and network as parameters.
     * If the response is not an error, it sets the balances state with the response and updates the loadingStatus to Success.
     * If the response is an error, it updates the loadingStatus to Error.
     */
    const getBalancesOverTime = () => {
      if (!network || !isSuccessAddressValueFlow || !addressValueFlow) {
        setLoadingStatus(LoadingStatus.Error)
        return
      }
      const balanceOverTime = getBalanceOverTime(searchValue, network, addressValueFlow.results)

      if (balanceOverTime !== 'error') {
        setBalances(balanceOverTime)
        setLoadingStatus(LoadingStatus.Success)
        return
      }
      setLoadingStatus(LoadingStatus.Error)
    }
    getBalancesOverTime()
  }, [network, searchValue, addressValueFlow, isSuccessAddressValueFlow])

  /**
   * Effect to filter balances
   */
  useEffect(() => {
    if (loadingStatus === LoadingStatus.Success && balances) {
      setFilteredBalances(balances)
    } else {
      setFilteredBalances(undefined)
    }
  }, [balances, loadingStatus])

  return (
    <ItemTile
      title={t(title ?? 'Account Balance Change')}
      data={balances}
      defaultFilter={balances?.length ? 'one_year' : 'all'}
      selectorAction={setFilteredBalances}
      dateLabel={'timestamp'}
      loading={loadingStatus}
      padding="0.25rem !important"
    >
      {loadingStatus === LoadingStatus.Success && filteredBalances && filteredBalances.length > 0 ? (
        <LineChart
          data={{
            x: {
              values: filteredBalances.map((item: { timestamp: number; value: string }) => item.timestamp.toString()),
              formatter: getDateUTCFromTimestamp,
            },
            y: {
              values: filteredBalances.map((item: { timestamp: number; value: string }) => ({ value: parseFloat(item.value) })),
              unit: 'FIL' as FilUnits,
            },
          }}
          color={theme.palette.primary.main}
        />
      ) : (
        <NoRows
          position="center"
          icon={<ChartBubbleLine />}
          text={loadingStatus === LoadingStatus.Error ? 'There was an error fetching the data' : 'There is no data in this time range'}
        />
      )}
    </ItemTile>
  )
}

export default BalanceChart
