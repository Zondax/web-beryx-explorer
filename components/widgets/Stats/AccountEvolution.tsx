import { useMemo } from 'react'

import { useTransactions } from '@/data/beryx'
import { useSearchStore } from '@/store/data/search'
import { getLoadingStatus } from '@/utils/loadingStatus'
import { Grid } from '@mui/material'
import { Transaction } from '@zondax/beryx/dist/filecoin/api/types'

import { ItemTile, StatsTile } from 'components/widgets/Charts'

import BalanceChart from '../../views/ResultsView/GeneralView/Tabs/Overview/BalanceChart'

/**
 * The AccountEvolution component
 */
const AccountEvolution = () => {
  const inputValue = useSearchStore(s => s.searchInputValue)
  const objectType = useSearchStore(s => s.searchItemType)
  const network = useSearchStore(s => s.searchInputNetwork)

  const {
    data: receivedTransactions,
    isLoading: isLoadingReceivedTxs,
    isSuccess: isSuccessReceivedTxs,
  } = useTransactions({
    input: inputValue,
    network,
    type: objectType,
    method: 'receiver',
    level: 'main',
    evm: false,
    sort: undefined,
    page: { page: 1 },
  })

  const {
    data: sentTransactions,
    isLoading: isLoadingSentTxs,
    isSuccess: isSuccessSentTxs,
  } = useTransactions({
    input: inputValue,
    network,
    type: objectType,
    method: 'sender',
    level: 'main',
    evm: false,
    sort: undefined,
    page: { page: 1 },
  })

  const totalReceivedTxs = useMemo(() => {
    return receivedTransactions?.transactions !== undefined
      ? receivedTransactions.transactions.filter(({ tx_type }: Transaction) => tx_type !== 'Fee').length
      : undefined
  }, [receivedTransactions])

  const totalSentTxs = useMemo(() => {
    return sentTransactions?.transactions !== undefined
      ? sentTransactions.transactions.filter(({ tx_type }: Transaction) => tx_type !== 'Fee').length
      : undefined
  }, [sentTransactions])

  return (
    <Grid container xs={12} spacing={'1rem'}>
      {/* Account Balance Change */}
      <Grid item container xs={12} md={6} height={'25rem'} data-testid={'account-balance-change'}>
        <BalanceChart />
      </Grid>
      <Grid item container xs={12} md={6} spacing={'1rem'}>
        {/* Number of Received Transactions */}
        <Grid item xs={6} md={6} data-testid="total-number-of-received-transactions">
          <ItemTile
            title={'Number of Received Transactions'}
            loading={getLoadingStatus(isLoadingReceivedTxs, isSuccessReceivedTxs)}
            size="medium"
            hasBorder
          >
            {totalReceivedTxs !== undefined ? (
              <StatsTile
                data={{
                  value: totalReceivedTxs,
                }}
              />
            ) : null}
          </ItemTile>
        </Grid>
        {/* Number of Sent Transactions */}
        <Grid item xs={6} md={6} data-testid="total-number-of-sent-transactions">
          <ItemTile
            title={'Number of Sent Transactions'}
            loading={getLoadingStatus(isLoadingSentTxs, isSuccessSentTxs)}
            size="medium"
            hasBorder
          >
            {totalSentTxs !== undefined ? (
              <StatsTile
                data={{
                  value: totalSentTxs,
                }}
              />
            ) : null}
          </ItemTile>
        </Grid>
        {/* Total Number of Transactions */}
        <Grid item xs={12} md={12} data-testid="total-number-of-transactions">
          <ItemTile
            title={'Total Number of Transactions'}
            loading={getLoadingStatus(isLoadingSentTxs, isSuccessSentTxs)}
            size="medium"
            hasBorder
          >
            {totalReceivedTxs !== undefined || totalSentTxs !== undefined ? (
              <StatsTile
                data={{
                  value: totalReceivedTxs + totalSentTxs,
                }}
              />
            ) : null}
          </ItemTile>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default AccountEvolution
