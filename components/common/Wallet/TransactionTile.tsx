import BigNumber from 'bignumber.js'

import { amountFormat, chainDecimals, truncateMaxCharacters } from '@/config/config'
import { NetworkType } from '@/config/networks'
import { ObjectType } from '@/routes/parsing'
import { newDateFormat } from '@/utils/dates'
import { Box, Unstable_Grid2 as Grid, Tooltip, Typography, useTheme } from '@mui/material'

import BeryxLink from '../BeryxLink'
import MempoolTransactionStatus from '../MempoolTransactionStatus'
import { TypeTransactionIcon } from '../TypeTransactionIcon'

export type TransactionType = 'send' | 'receive' | 'mempool'

/**
 * Transaction Tile properties.
 *
 * @param type - Transaction type
 * @param status - Transaction status, possible values are 'mempool', 'Ok', 'Fail'
 * @param hash - Transaction hash
 * @param amount - Transaction amount
 * @param unit - Transaction unit for amount
 * @param direction - Transaction direction, possible values are 'to' or 'from'
 * @param method - Transaction method
 * @param timestamp - Time when the transaction was initiated
 * @param opacity - Opacity of the transaction tile
 * @param network - Network type
 */
interface TransactionTileProps {
  type: TransactionType
  status: string // 'mempool'|'Ok'|'Fail'
  hash: string
  amount: string | number
  unit: string
  direction: 'to' | 'from'
  method: string
  timestamp: string
  opacity?: number
  network?: NetworkType
  last_seen?: string
}

/**
 * Transaction Tile Component
 *
 * @param props - The transaction tile properties
 * @returns TransactionTile JSX component
 */
const TransactionTile = ({
  status,
  hash,
  amount,
  unit,
  direction,
  timestamp,
  method,
  opacity,
  network,
  last_seen,
}: TransactionTileProps) => {
  const theme = useTheme()

  return (
    <Grid
      container
      className={'wallet-transaction-tile'}
      gap={'0.5rem'}
      padding={'1rem'}
      flexWrap={'nowrap'}
      sx={{ borderRadius: '8px', border: `1px solid ${theme.palette.border?.level0}`, opacity }}
    >
      <Box
        sx={{
          height: '2rem',
          width: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '0.1rem',
          flexShrink: '0',
        }}
      >
        {last_seen ? <MempoolTransactionStatus last_seen={last_seen} /> : <TypeTransactionIcon status={status} direction={direction} />}
      </Box>
      <Grid container flexDirection={'column'} width={'100%'}>
        <Grid container>
          <Grid xs={7}>
            <BeryxLink
              inputType={ObjectType.TXS}
              value={hash}
              isColored={false}
              limitCharacters={truncateMaxCharacters}
              network={network}
            />
          </Grid>
          <Grid xs={5} justifyContent={'flex-end'}>
            <Typography variant="captionMono" component={'p'} fontWeight={600} textAlign={'right'}>
              {direction === 'to' ? '+' : '-'}
              {BigNumber(amount).div(Math.pow(10, chainDecimals.filecoin)).toFormat(2, amountFormat)} {unit}
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.25rem' }}>
          <Tooltip title={`${newDateFormat(timestamp, 'UTC', true)}`} arrow disableInteractive>
            <Typography variant="caption" color={'text.secondary'} sx={{ marginBottom: '0rem' }}>
              {newDateFormat(timestamp, undefined, false)}
            </Typography>
          </Tooltip>
          <Typography variant="caption" color={'text.secondary'} sx={{ marginBottom: '0rem' }}>
            • {method}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  )
}

export default TransactionTile
