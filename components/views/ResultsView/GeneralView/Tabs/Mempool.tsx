import { throttle } from 'lodash'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { TABLE_TYPE } from '@/config/tables'
import { TransactionData, useMempoolStore } from '@/store/data/mempool'
import { useSearchStore } from '@/store/data/search'
import { Box } from '@mui/material'

import Table from '../../../../widgets/Table'

/**
 * Interface for the MempoolTransactionsTableProps
 * @interface
 * @property filteredRows - An array of TransactionData for filtered rows
 * @property loading - A boolean indicating if the table is loading
 * @property {string[]} [noRowsText] - An optional array of strings for no rows text
 * @property {React.JSX.Element} [noRowsIcon] - An optional JSX element for no rows icon
 */
interface MempoolTransactionsTableProps {
  filteredRows: TransactionData[]
  loading: boolean
  noRowsText?: string
  noRowsIcon?: React.JSX.Element
  noBorderRadius?: boolean
}

/**
 * MempoolTransactionsTable is a functional component that renders a table with transaction data.
 *
 * @param props - The properties that define the table.
 * @param props.noRowsText - An optional array of strings for no rows text.
 * @param props.noRowsIcon - An optional JSX element for no rows icon.
 * @param props.filteredRows - An array of TransactionData for filtered rows.
 * @param props.loading - A boolean indicating if the table is loading.
 *
 * @returns A Table element that encapsulates the Mempool Transactions Table.
 */
export const MempoolTransactionsTable = ({
  noRowsText,
  noRowsIcon,
  filteredRows,
  loading,
  noBorderRadius = false,
}: MempoolTransactionsTableProps) => {
  return (
    <Table
      rowData={filteredRows}
      tableType={TABLE_TYPE.MEMPOOL}
      rowWatch
      mode="dev"
      hideBorder
      noRowsText={noRowsText}
      noRowsIcon={noRowsIcon}
      loading={loading}
      noBorderRadius={noBorderRadius}
    />
  )
}

/**
 * AddressMempool is a React component that uses the mempool to load transaction details
 * into a table specifically for a searched item. It loads the data based on the search input
 *
 * @return A Box element that encapsulates the Mempool Transactions Table
 */
export const AddressMempool = () => {
  const { t } = useTranslation()
  const searchValue: string = useSearchStore(s => s.searchInputValue)

  const isMempoolLoading = useMempoolStore(s => s.loading)
  const mempoolTransactionsRef = useRef(useMempoolStore.getState().transactions)
  const [throttleTxs, setThrottleTxs] = useState<TransactionData[]>([])
  const throttleTxsRef = useRef<TransactionData[]>([])

  /**
   * updateTable is a callback function that filters the transactions based on the search value
   * and updates the throttleTxs state if the new transactions array length is greater than 0.
   *
   * @callback
   * @returns {void}
   */
  const updateTable = useCallback(() => {
    const newTxs = mempoolTransactionsRef.current.filter(row => {
      return row.tx_from === searchValue || row.tx_to === searchValue
    })
    if (throttleTxsRef.current.length > 0 || newTxs.length > 0) {
      throttleTxsRef.current = newTxs
      setThrottleTxs(newTxs)
    }
  }, [searchValue])

  useEffect(() => {
    const unsubscribe = useMempoolStore.subscribe(state => (mempoolTransactionsRef.current = state.transactions))

    const throttleUpdate = throttle(updateTable, 3000)
    throttleUpdate()
    const intervalId = setInterval(throttleUpdate, 3000)

    return () => {
      unsubscribe()
      clearInterval(intervalId)
      throttleUpdate.cancel()
    }
  }, [updateTable])

  useEffect(() => {
    if (!isMempoolLoading && mempoolTransactionsRef.current.length !== 0) {
      updateTable()
    }
  }, [isMempoolLoading, updateTable])

  return (
    <Box height={'100%'}>
      <MempoolTransactionsTable
        filteredRows={throttleTxs}
        loading={isMempoolLoading}
        noRowsText={t('At the moment, this address has no transactions in mempool.')}
      />
    </Box>
  )
}
