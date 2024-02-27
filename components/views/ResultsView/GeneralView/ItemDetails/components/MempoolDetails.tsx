import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useMempoolStore } from '@/store/data/mempool'
import { timeSince } from '@/utils/dates'
import { Unstable_Grid2 as Grid, Skeleton, Typography } from '@mui/material'

import { ItemInfo } from '../../ItemInformation'

/**
 * Functional React component that renders information related to the mempool data.
 */
const MempoolDetails = ({ tab }: { tab?: string }) => {
  const { numberOfItems } = useMempoolStore.getState().details
  const { t } = useTranslation()
  const loading = useMempoolStore.getState().loading
  const [lastDateUpdated, setLastDateUpdated] = useState<Date | undefined>(undefined)
  const [lastUpdate, setLastUpdate] = useState<string | undefined>(undefined)

  /**
   * Side effect for setting the last date updated.
   */
  useEffect(() => {
    setLastDateUpdated(new Date())
    setLastUpdate('0 seconds')
  }, [numberOfItems])

  /**
   * Side effect for updating the last update state.
   */
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined
    if (lastDateUpdated) {
      interval = setInterval(() => {
        setLastUpdate(() => {
          if (lastDateUpdated) {
            return timeSince(lastDateUpdated)
          }
        })
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [lastDateUpdated])

  const TransactionCount =
    !loading && numberOfItems ? (
      <ItemInfo label={t('Transaction count')} content={numberOfItems} icon={undefined} />
    ) : (
      <Skeleton variant="rounded" width={'15.75rem'} height={'1.5rem'} />
    )

  const LatestUpdate =
    !loading && lastUpdate && numberOfItems ? (
      <>
        <Typography variant="body1">•</Typography>
        <ItemInfo label={t('Latest update')} content={`${lastUpdate.toString()} ago`} icon={undefined} />
      </>
    ) : (
      <Skeleton variant="rounded" width={'15.75rem'} height={'1.5rem'} />
    )

  return (
    <Grid xs={12} container gap={'0.75rem'} rowGap={'0.5rem'}>
      {tab === '0' ? (
        <>
          {TransactionCount}
          {LatestUpdate}
        </>
      ) : null}
    </Grid>
  )
}

export default MempoolDetails
