import { throttle } from 'lodash'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { DetailsProps, TransactionData, useMempoolStore } from '@/store/data/mempool'
import useAppSettingsStore from '@/store/ui/settings'

import { MempoolTransactionsTable } from '../../ResultsView/GeneralView/Tabs/Mempool'

/**
 * MempoolTablePanel is a component that renders the Mempool Transactions Table with the current mempool data.
 * @returns A React component that displays the mempool transactions table.
 */
const MempoolTablePanel = ({ searchValue }: { searchValue?: string }) => {
  const { network } = useAppSettingsStore(state => ({ network: state.network }))

  const mempoolTransactions = useRef(useMempoolStore.getState().transactions)
  const mempoolLoading = useMempoolStore(s => s.loading)
  const setDetails = useMempoolStore(s => s.setDetails)
  const [throttledItems, setThrottledItems] = useState<TransactionData[]>([])
  const throttledItemsRef = useRef<TransactionData[]>([])

  /**
   * @function filteredRows
   * @description Filters the rows of the table based on the search value.
   * @returns An array of filtered transaction data.
   */
  const filteredRows = useMemo(() => {
    const activeTxs = throttledItems.filter(elem => elem.last_seen === undefined)
    const details: DetailsProps = {
      numberOfItems: activeTxs.length.toString(),
    }
    setDetails(details)

    return throttledItems.filter(row => {
      if (!searchValue || searchValue === '') {
        return true
      }
      const search = searchValue.toLowerCase()
      return Object.values(row).some(value => typeof value === 'string' && value.toLowerCase().includes(search))
    })
  }, [throttledItems, setDetails, searchValue])

  /**
   * @function updateTable
   * @description Updates the table with the current mempool transactions.
   */
  const updateTable = useCallback(() => {
    if (throttledItemsRef.current.length > 0 || mempoolTransactions.current.length > 0) {
      throttledItemsRef.current = mempoolTransactions.current
      setThrottledItems(mempoolTransactions.current)
    }
  }, [mempoolTransactions, throttledItemsRef])

  /**
   * @function useEffect
   * @description Subscribes to the mempool store and updates the table at regular intervals.
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
   * @function useEffect
   * @description Clears the table when the network changes.
   */
  useEffect(() => {
    setThrottledItems([])
  }, [network])

  /**
   * @function useEffect
   * @description Updates the table when the mempool transactions are received for the first time after the network change.
   */
  useEffect(() => {
    if (!mempoolLoading && mempoolTransactions.current.length !== 0) {
      updateTable()
    }
  }, [mempoolLoading, updateTable])

  return (
    <MempoolTransactionsTable
      filteredRows={filteredRows}
      loading={mempoolLoading}
      noRowsText={
        searchValue
          ? `There are no transactions the mempool that include "${searchValue}"`
          : 'At the moment, there are no transactions in the mempool.'
      }
    />
  )
}

export default MempoolTablePanel
