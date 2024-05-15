import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import useWalletStore from '@/store/wallets/wallet'
import { Box, Button, CircularProgress } from '@mui/material'
import { Transaction } from '@zondax/beryx/dist/filecoin/api/types'

import { NoRows } from '../../../widgets/Table'
import TransactionTile, { TransactionType } from '../TransactionTile'

/**
 * OutgoingTransactions is a functional component that renders the outgoing transactions of a wallet.
 * It uses the Material UI theme for styling.
 *
 * @param props - The properties that define the component's behavior and display.
 * @param props.handleSeeMore - A function to handle the "See More" button click event.
 * @param props.visibleTxNumber - The number of visible transactions.
 *
 * @returns The rendered JSX element.
 */
const OutgoingTransactions = ({
  handleSeeMore,
  visibleTxNumber,
}: {
  handleSeeMore: (e: React.MouseEvent, type: string) => void
  visibleTxNumber: number
}) => {
  // Get the wallet information from the wallet store.
  const { filAddr, network: walletNetwork, outgoingTransactions } = useWalletStore(s => s.walletInfo)
  // Get the loading status from the wallet store.
  const { isLoading } = useWalletStore(s => s)
  // Get the translation function from the i18next library.
  const { t } = useTranslation()

  const handleSeeMoreCallback = useCallback(
    (e: React.MouseEvent) => {
      handleSeeMore(e, 'outgoing')
    },
    [handleSeeMore]
  )

  const filteredTxs = useMemo(() => {
    return outgoingTransactions?.filter(({ tx_type }) => tx_type !== 'Fee')
  }, [outgoingTransactions])

  // Render the component.
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
      key={'Wallet Outgoing Txs Panel Tab'}
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
                  unit={walletNetwork?.currency.symbol ?? ''}
                  direction={tx.tx_from === filAddr ? 'from' : 'to'}
                  method={tx.tx_type}
                  timestamp={tx.tx_timestamp}
                  opacity={isLoading ? 0.5 : 1}
                  network={walletNetwork}
                  key={`${filAddr} outgoing transaction ${tx.tx_cid} with id ${tx.id}`}
                />
              )
            })}
          </Box>

          {filteredTxs.length > visibleTxNumber ? (
            <Button variant={'inputType'} onClick={handleSeeMoreCallback}>
              {t('See more')}
            </Button>
          ) : null}
        </>
      ) : (
        <Box sx={{ height: '15rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <NoRows
            text={isLoading ? 'Loading...' : 'No outgoing transactions yet'}
            icon={isLoading ? <CircularProgress size={20} /> : undefined}
          />
        </Box>
      )}
    </Box>
  )
}

export default OutgoingTransactions
