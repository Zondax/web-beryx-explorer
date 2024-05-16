import { throttle } from 'lodash'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { NetworkFindByName } from '@/config/networks'
import { TransactionData, useMempoolStore } from '@/store/data/mempool'
import useAppSettingsStore from '@/store/ui/settings'
import useWalletStore, { WalletProvider } from '@/store/wallets/wallet'
import { Box, Button, CircularProgress } from '@mui/material'

import { NoRows } from '../../../widgets/Table'
import TransactionTile from '../TransactionTile'

/**
 * MempoolTransactions component
 *
 * @param props - Component properties
 * @param props.visibleTxNumber - Number of visible transactions
 *
 * @returns MempoolTransactions component JSX
 */
const MempoolTransactions = ({ visibleTxNumber }: { visibleTxNumber: number }): JSX.Element => {
  const { t } = useTranslation()
  const router = useRouter()

  const { filAddr, network: walletNetwork } = useWalletStore(s => s.walletInfo)
  const { isLoading, provider, setNetwork: setWalletNetwork } = useWalletStore(s => s)
  const { network } = useAppSettingsStore(state => ({ network: state.network }))

  /**
   * Holds the current state's transactions
   */
  const mempoolTransactions = useRef(useMempoolStore.getState().transactions)

  /**
   * Throttled items state
   */
  const [throttledItems, setThrottledItems] = useState<TransactionData[]>([])

  /**
   * Network change flag state
   */
  const [networkChanged, setNetworkChanged] = useState<boolean>(false)

  /**
   * Handler for the 'See More' button click
   * Navigates to mempool page
   * @param e - Click event
   */
  const handleSeeMoreMempool = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      return router.push('/mempool', undefined, {
        shallow: true,
      })
    },
    [router]
  )

  /**
   * Filter mempool transactions
   * If no filAddr is available, returns all throttled items
   * If a filAddr is available, only transactions that include it are returned
   */
  const filteredMempoolTxs = useMemo(() => {
    return throttledItems.filter(row => {
      if (!filAddr) {
        return true
      }
      const search = filAddr.toLowerCase()
      return Object.values(row).some(value => typeof value === 'string' && value.toLowerCase().includes(search))
    })
  }, [throttledItems, filAddr])

  /**
   * Update table data
   * If the network is the same as the current chain,
   * throttled items are set to the current mempool transactions
   */
  const updateTable = useCallback(() => {
    if (network.name.toLowerCase() === walletNetwork?.name.toLowerCase()) {
      setThrottledItems(mempoolTransactions.current)
    }
  }, [walletNetwork, network.name])

  /**
   * Subscribe to mempool store
   * Unsubscribe and clean up on unmount
   */
  useEffect(() => {
    const unsubscribe = useMempoolStore.subscribe(state => (mempoolTransactions.current = state.transactions))

    const throttleUpdate = throttle(updateTable, 3000)
    throttleUpdate()
    const intervalId = setInterval(throttleUpdate, 3000)

    return () => {
      unsubscribe()
      clearInterval(intervalId)
      throttleUpdate.cancel()
    }
  }, [updateTable])

  /**
   * Update network
   * Clear the table when the network changes
   */
  useEffect(() => {
    setThrottledItems([])
    setNetworkChanged(true)

    if (provider === WalletProvider.VIEW_ONLY) {
      const tmpNetwork = NetworkFindByName(network.name)
      if (tmpNetwork) {
        setWalletNetwork(tmpNetwork)
      }
    }
  }, [setWalletNetwork, network, provider])

  /**
   * Update network and table data after network change
   * If the network has changed, and there are mempool transactions
   * network change flag is set to false and table data is updated
   */
  useEffect(() => {
    if (networkChanged && mempoolTransactions.current.length !== 0) {
      setNetworkChanged(false)
      updateTable()
    }
  }, [networkChanged, updateTable, mempoolTransactions])

  /**
   * update the table data when isLoading flag is changed
   */
  useEffect(() => {
    updateTable()
  }, [isLoading, updateTable])

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
      key={'Wallet Mempool Txs Panel Tab'}
    >
      {filteredMempoolTxs?.length ? (
        <>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}
          >
            {filteredMempoolTxs.slice(0, visibleTxNumber).map(tx => {
              return (
                <TransactionTile
                  type={'mempool'}
                  status={'mempool'}
                  hash={tx.tx_cid}
                  amount={tx.amount}
                  unit={walletNetwork?.currency.symbol ?? ''}
                  direction={tx.tx_from === filAddr ? 'from' : 'to'}
                  method={tx.method_name}
                  timestamp={tx.first_seen}
                  opacity={isLoading ? 0.5 : 1}
                  network={walletNetwork}
                  key={`${filAddr} transaction mempool ${tx.tx_cid}`}
                  last_seen={tx.last_seen}
                />
              )
            })}
          </Box>

          {filteredMempoolTxs.length > visibleTxNumber ? (
            <Button variant={'inputType'} onClick={handleSeeMoreMempool}>
              {t('See more in Mempool')}
            </Button>
          ) : null}
        </>
      ) : (
        <Box sx={{ height: '15rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <NoRows
            text={isLoading ? 'Loading...' : 'No transactions in Mempool at the moment'}
            icon={isLoading ? <CircularProgress size={20} /> : undefined}
          />
        </Box>
      )}
    </Box>
  )
}

export default MempoolTransactions
