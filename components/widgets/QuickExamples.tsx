import { ObjectType } from '@/routes/parsing'
import { useLatestStore } from '@/store/data/latest'
import { useAppSettingsStore } from '@/store/ui/settings'
import { timeSince } from '@/utils/dates'
import { CircularProgress, Grid, Grow, Typography } from '@mui/material'
import { Transaction } from '@zondax/beryx/dist/filecoin/api/types'

import BeryxLink from '../common/BeryxLink'

/**
 * QuickExamples is a functional React component.
 * It uses useSelector hooks to get the state's information about the latest transactions and tipsets.
 * It displays the latest transactions and tipsets in a responsive grid.
 */
const QuickExamples = () => {
  const { network } = useAppSettingsStore(state => ({ network: state.network }))

  const { latestTipsets, latestTransactions } = useLatestStore(s => s)
  const tipsetsStatus = latestTipsets?.length ? 'success' : 'loading'
  const transactionsStatus = latestTransactions?.length ? 'success' : 'loading'

  const tipsetItems = latestTipsets?.slice(0, 4).map((tipset: { height: number; tipset_timestamp: string }) => (
    <Grow in={Boolean(latestTipsets)} key={`${tipset.height}-${tipset.tipset_timestamp}`}>
      <Grid container direction="row" justifyContent="flex-start" alignItems="center" gap={1} height={25}>
        <Typography variant="body1" noWrap>
          {timeSince(tipset.tipset_timestamp)}
        </Typography>
        <BeryxLink inputType={ObjectType.TIPSET} value={tipset.height.toString()} network={network} />
      </Grid>
    </Grow>
  ))

  const transactionItems = latestTransactions?.slice(0, 4).map((transaction: Transaction) => (
    <Grow in={Boolean(latestTipsets)} key={transaction.id}>
      <Grid container direction="row" justifyContent="flex-start" alignItems="center" gap={1} height={25}>
        <Typography variant="body1" noWrap>
          {timeSince(transaction.tx_timestamp)}
        </Typography>
        <BeryxLink inputType={ObjectType.TXS} value={transaction.tx_cid} network={network} />
      </Grid>
    </Grow>
  ))

  return (
    <Grid container gap={{ xs: 6, md: 4, xl: 7 }} direction="row" justifyContent="center" sx={{ marginTop: '-2rem' }}>
      <Grid item xs={10} sm={7} md={4} lg={3} xl={3}>
        <Typography variant="h5">Latest tipsets</Typography>
        {tipsetsStatus === 'loading' && <CircularProgress size="small" thickness={4} />}
        {tipsetItems}
        {!latestTipsets && !tipsetsStatus && <Typography variant="body1">We could not get the information</Typography>}
      </Grid>
      <Grid item xs={10} sm={7} md={4} lg={3} xl={3}>
        <Typography variant="h5">Latest transactions</Typography>
        {transactionsStatus === 'loading' && <CircularProgress size="small" thickness={4} />}
        {transactionItems}
        {!latestTransactions && !transactionsStatus && <Typography variant="h5">We could not get the information</Typography>}
      </Grid>
    </Grid>
  )
}

export default QuickExamples
