import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import useWalletStore from '@/store/wallets/wallet'

/**
 * Component Imports
 */
// import useWalletStore from 'store/wallets/wallet'
import { Box, Button, CircularProgress } from '@mui/material'
import { Transaction } from '@zondax/beryx/dist/filecoin/api/types'

import { NoRows } from '../../../widgets/Table'
import TransactionTile, { TransactionType } from '../TransactionTile'

/**
 * Represents Incoming Transactions for a wallet.
 *
 * @component
 * @param props - Component properties
 * @param props.handleSeeMore - Function to handle see more option on transactions list
 * @param props.visibleTxNumber - Number of visible transactions
 *
 * @returns Incoming transactions elements
 */
const IncomingTransactions = ({
  handleSeeMore,
  visibleTxNumber,
}: {
  handleSeeMore: (e: React.MouseEvent, type: string) => void
  visibleTxNumber: number
}) => {
  const { filAddr, network, incomingTransactions } = useWalletStore(s => s.walletInfo)
  const { isLoading } = useWalletStore(s => s)
  const { t } = useTranslation()

  const filteredTxs = useMemo(() => {
    return incomingTransactions?.filter(({ tx_type }) => tx_type !== 'Fee')
  }, [incomingTransactions])

  const handleSeeMoreButton = useCallback((e: React.MouseEvent) => handleSeeMore(e, 'incoming'), [handleSeeMore])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '1rem',
        overflow: 'auto',
        backgroundColor: 'background.level0',
      }}
      key={'Wallet Incoming Txs Panel Tab'}
    >
      {filteredTxs?.length ? (
        <>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}
          >
            {filteredTxs.slice(0, visibleTxNumber).map((tx: Transaction) => {
              return (
                <TransactionTile
                  type={tx.tx_type as TransactionType}
                  status={tx.status}
                  hash={tx.tx_cid}
                  amount={tx.amount.toString()}
                  unit={network?.currency.symbol ?? ''}
                  direction={tx.tx_from === filAddr ? 'from' : 'to'}
                  method={tx.tx_type}
                  timestamp={tx.tx_timestamp}
                  opacity={isLoading ? 0.5 : 1}
                  network={network}
                  key={`${filAddr} incoming transaction ${tx.tx_cid} with id ${tx.id}`}
                />
              )
            })}
          </Box>

          {filteredTxs.length > visibleTxNumber ? (
            <Button variant={'inputType'} onClick={handleSeeMoreButton}>
              {t('See more')}
            </Button>
          ) : null}
        </>
      ) : (
        <Box sx={{ height: '15rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <NoRows
            text={isLoading ? 'Loading...' : 'No incoming transactions yet'}
            icon={isLoading ? <CircularProgress size={20} /> : undefined}
          />
        </Box>
      )}
    </Box>
  )
}

export default IncomingTransactions
