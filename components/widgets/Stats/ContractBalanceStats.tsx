import BigNumber from 'bignumber.js'
import { useEffect, useMemo, useState } from 'react'

import { ValueExchangedByTipset } from '@/api-client/beryx.types'
import { LoadingStatus, amountFormat } from '@/config/config'
import { TABLE_TYPE } from '@/config/tables'
import { useValueExchangeAtLatest } from '@/data/beryx'
import { useSearchStore } from '@/store/data/search'
import { formatBalance } from '@/utils/format'
import { Grid } from '@mui/material'

import BalanceChart from 'components/views/ResultsView/GeneralView/Tabs/Overview/BalanceChart'
import { ItemTile, StatsTile } from 'components/widgets/Charts'

import Table from '../Table'

interface ValueExchangedExtended extends ValueExchangedByTipset {
  balance?: number
}
/**
 * The ContractBalanceStats component
 */
const ContractBalanceStats = () => {
  const searchResultJson = useSearchStore(s => s.searchResult.json)
  const searchValue: string = useSearchStore(s => s.searchInputValue)
  const network = useSearchStore(s => s.searchInputNetwork)

  const [balance, setBalance] = useState<string | undefined>(undefined)
  const loadingBalance = useMemo(() => (balance === undefined ? LoadingStatus.Loading : LoadingStatus.Success), [balance])

  const { data: valueExchanged, isLoading: isLoadingValueExchanged } = useValueExchangeAtLatest(network, searchValue)

  const valueExchangedResult = useMemo(() => {
    if (!valueExchanged?.results) {
      return []
    }
    let balance = 0
    return valueExchanged.results
      .sort((a, b) => a.height - b.height)
      .map((elem: ValueExchangedByTipset) => {
        balance += parseInt(elem.inbound)
        balance -= parseInt(elem.outbound)

        if (balance < 0) {
          return elem
        }
        const newElem: ValueExchangedExtended = { ...elem, balance }
        return newElem
      })
  }, [valueExchanged])

  /**
   * useEffect hook to set the balance state.
   *
   * This hook is triggered when the searchResultJson changes. If the searchResultJson has a balances property,
   * it formats the balance and sets it to the balance state.
   *
   * @returns {void}
   */
  useEffect(() => {
    if (searchResultJson?.balances) {
      const balance = BigNumber(formatBalance(searchResultJson?.balances))

      if (balance.isLessThan(BigNumber(0.01))) {
        setBalance(balance.toFormat(amountFormat))
      } else {
        setBalance(balance.dp(2, BigNumber.ROUND_DOWN).toFormat(2, amountFormat))
      }
    }
  }, [searchResultJson])

  return (
    <Grid container spacing={'1rem'}>
      {/* Balance in Contract */}
      <Grid item container xs={12} md={9} height={'25rem'} data-testid={'account-balance-chart'}>
        <BalanceChart title={'Balance in Contract'} />
      </Grid>
      <Grid item container xs={12} md={3} spacing={'1rem'}>
        {/* Number of Contract Invokes */}
        <Grid item xs={6} md={12} height={{ md: 'calc(100% / 2)' }} data-testid={'contracts-invokes'}>
          <ItemTile title={'Balance'} loading={loadingBalance} size="medium" hasBorder>
            {balance !== undefined ? <StatsTile data={{ value: balance, unit: 'FIL' }} /> : null}
          </ItemTile>
        </Grid>
      </Grid>
      {/* Contract Value Exchanged by Height */}
      <Grid item container xs={12} height={'25rem'}>
        <Table
          key="contract value exchanged by height"
          rowData={valueExchangedResult}
          hideBorder
          mode="normal"
          tableType={TABLE_TYPE.VALUE_EXCHANGED_BY_HEIGHT}
          disableColumnFilter
          disableColumnReorder
          loading={isLoadingValueExchanged}
          title={'Contract Value Exchanged by Height'}
          rowWatch
          paginationMode={'client'}
        />
      </Grid>
    </Grid>
  )
}

export default ContractBalanceStats
