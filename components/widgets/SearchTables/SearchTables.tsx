import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { GridPagination, GridSortModel } from '@/components/muigrid/types'
import { TABLE_TYPE } from '@/config/tables'
import { useTransactions } from '@/data/beryx'
import { ObjectType } from '@/routes/parsing'
import { ExtendedTransaction, PagesProps, useSearchStore } from '@/store/data/search'
import { useNotificationsStore } from '@/store/ui/notifications'
import { addTransactionsTreePath } from '@/utils/transactionsFormatter'
import { Box, Grid } from '@mui/material'
import { LabelDisplayedRowsArgs } from '@mui/material/TablePagination'

import Table from '../Table'
import DisplayedRows from './DisplayedRows'
import { Filters, Sort, errorDescriptions, initMethodsTypeOptions, initPaginationModel, methodMapped, methodsType } from './config'

/**
 * @interface SearchTablesProps
 * @description Interface for SearchTables component props
 * @property type - Type of the table
 * @property title - Title of the table
 * @property isMobile - Flag indicating if the device is mobile
 * @property hideFooter - Flag indicating if the footer should be hidden
 * @property noRowsText - Text to display when there are no rows
 * @property noRowsIcon - Icon to display when there are no rows
 * @property limitRows - Limit the number of rows
 * @property hideBorder - Flag indicating if the border should be hidden
 * @property sort - Sort model for the table
 */
interface SearchTablesProps {
  tableType?: TABLE_TYPE
  title?: string
  isMobile?: boolean
  hideFooter?: boolean
  noRowsText?: string
  noRowsIcon?: React.JSX.Element
  limitRows?: number
  hideBorder?: boolean
  noBorderRadius?: boolean
  sort?: Sort[]
}

/**
 * @function SearchTables
 * @description This component displays a table with search results.
 * @param props - Component props
 * @returns Rendered component
 */
const SearchTables = ({
  tableType: propTableType,
  title,
  isMobile = false,
  noRowsText,
  noRowsIcon,
  hideFooter = false,
  limitRows,
  hideBorder = false,
  noBorderRadius = false,
  sort: propSort,
}: SearchTablesProps) => {
  const router = useRouter()

  const { searchInputNetwork: network, searchType, searchInputType, searchInputValue, currentResult, setCurrentResult } = useSearchStore()

  const addNotification = useNotificationsStore(s => s.addNotification)

  const [filters, setFilters] = useState<Filters>(() => {
    const currentFilters: Filters = { level: searchType === ObjectType.TXS ? undefined : 'main', evm: false }
    if (searchType === ObjectType.ADDRESS) {
      const typeParam = router.query.type as string
      if (methodsType.includes(typeParam)) {
        currentFilters.methodType = [...initMethodsTypeOptions].map(elem => {
          const newOption = { ...elem }
          newOption.active = elem.method === typeParam
          return newOption
        })
      } else {
        currentFilters.methodType = [...initMethodsTypeOptions].map(option => {
          const newOption = { ...option }
          newOption.active = newOption.method === 'all'
          newOption.disabled = false
          return newOption
        })
      }
      return currentFilters
    }
    currentFilters.methodType = undefined
    return currentFilters
  })

  const [sort, setSort] = useState<Sort[] | undefined>(propSort ?? [])
  const [totalTxs, setTotalTxs] = useState<number | undefined>(undefined)
  const [fetchedPages, setFetchedPages] = useState<PagesProps[]>([{ page: 1 }])
  const [paginationModel, setPaginationModel] = useState(initPaginationModel)
  const [isFirstSearch, setIsFirstSearch] = useState<boolean>(true)

  /**
   * Update the page when the paginationModel changes (the user changes the page).
   */
  const currentPage = useMemo(() => {
    const page = fetchedPages.find(({ page }: { page: number }) => page === paginationModel.page + 1)
    return page ?? { page: 1 }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginationModel.page])

  /**
   * The table type depends on the propTableType or the search type.
   */
  const tableType = useMemo(() => {
    if (propTableType) {
      return propTableType
    }

    switch (searchType) {
      case ObjectType.TIPSET:
        return TABLE_TYPE.TIPSET_TRANSACTIONS
      case ObjectType.BLOCK:
        return TABLE_TYPE.BLOCK_TRANSACTIONS
      case ObjectType.TXS:
        return TABLE_TYPE.INTERNAL_TRANSACTIONS
      default:
        return TABLE_TYPE.TRANSACTIONS
    }
  }, [searchType, propTableType])

  /**
   * Handle the filters. If the filter change, the pagination goes back to the first page.
   */
  const handleFilterChange = useCallback((newFilters: Filters) => {
    setFilters(newFilters)
    setPaginationModel(initPaginationModel)
    setFetchedPages([{ page: 1 }])
  }, [])

  /**
   * Parameters that will be sent in the request.
   */
  const queryParameters = useMemo(() => {
    const currentType = filters.methodType?.find(({ active }) => active)
    const activeMethodType = currentType ? methodMapped[currentType.method] : undefined

    return {
      input: searchInputValue,
      network,
      inputType: searchInputType,
      objectType: searchType,
      method: activeMethodType,
      level: filters.level,
      evm: filters.evm,
      sort,
      page: currentPage,
    }
  }, [searchInputValue, network, searchType, searchInputType, filters, sort, currentPage])

  /**
   * Request the transactions
   */
  const {
    data: txsResult,
    isLoading: isLoadingTxsResult,
    error: errorTxsResult,
    isSuccess: isSuccessTxsResult,
  } = useTransactions(queryParameters)

  /**
   * Label to display in the Server Pagination component
   */
  const labelDisplayedRows = useCallback(
    (paginationInfo: LabelDisplayedRowsArgs) => {
      // Number of transactions included in the previous pages
      const seenTxs = fetchedPages.reduce((prev, current) => {
        if (current.page < currentPage.page) {
          return prev + (current.totalTxs ?? 0)
        }
        return prev
      }, 0)

      // If there is a number of total transactions, the pagination is showed in the footer.
      const initElem = totalTxs !== 0 ? seenTxs + 1 : 0
      const lastElem = totalTxs !== 0 ? seenTxs + (currentResult?.transactions.length ?? 0) : totalTxs

      return (
        <Grid container alignItems={'center'}>
          {totalTxs !== undefined ? (
            <DisplayedRows isLoading={isLoadingTxsResult} totalTxs={totalTxs} initElem={initElem} lastElem={lastElem} />
          ) : null}
          Page {paginationInfo.page + 1}
        </Grid>
      )
    },
    [currentPage, fetchedPages, isLoadingTxsResult, totalTxs, currentResult?.transactions]
  )

  /**
   * Server Pagination component
   */
  const ServerPagination = useMemo(() => {
    const hasNext = fetchedPages.find(({ page }: { page: number }) => page === currentPage.page + 1)
    return (
      <GridPagination
        slotProps={{
          actions: {
            nextButton: { disabled: !hasNext },
            previousButton: { disabled: isLoadingTxsResult || currentPage.page === 1 },
          },
        }}
        labelDisplayedRows={labelDisplayedRows}
      />
    )
  }, [fetchedPages, currentPage, isLoadingTxsResult, labelDisplayedRows])

  /**
   * Change the request if the received error is 4001 and the method type is All.
   * Otherwise, trigger a notification.
   */
  useEffect(() => {
    if (errorTxsResult && errorTxsResult instanceof AxiosError) {
      const isAllOption = filters.methodType?.find(({ active }) => active)?.method === 'all'
      const errorCode = errorTxsResult.response?.data.error_code
      if (isAllOption) {
        if (errorCode === 4001) {
          const newFilters = {
            ...filters,
            methodType: [...initMethodsTypeOptions].map(option => {
              const newOption = { ...option }
              newOption.active = option.method === 'incoming'
              newOption.disabled = option.method === 'all'
              return newOption
            }),
          }
          handleFilterChange(newFilters)
        }
      } else if (errorCode && errorDescriptions[errorCode]) {
        addNotification({
          title: '',
          description: errorDescriptions[errorCode],
          status: 'error',
          tag: ['search'],
        })
        setSort([])
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorTxsResult, addNotification, handleFilterChange])

  /**
   * Update the next cursor when the response is received
   */
  useEffect(() => {
    /**
     * Return the rows with an id in case they don't have and limit rows if limitRows is present.
     */
    let rows = txsResult?.transactions ?? []
    if (searchType === ObjectType.TXS) {
      rows = rows?.filter((element: { level: number }) => element.level !== 0)
    }
    if (limitRows) {
      rows = rows?.slice(0, limitRows ?? undefined)
    }

    /**
     * Save the last result in the store.
     */
    if (isSuccessTxsResult && txsResult?.transactions) {
      const newCurrentResult: { transactions: ExtendedTransaction[]; totalTxs?: number } = {
        transactions: addTransactionsTreePath(rows ?? [], searchInputValue, searchType, network),
      }

      if (txsResult.total_txs) {
        let newTotalTxs = txsResult.total_txs
        // If the object type is a tx, the elem with level 0 is deleted.
        // The total transctions only should include the internal ones.
        if (txsResult.total_txs !== 0 && searchType === ObjectType.TXS) {
          newTotalTxs -= 1
        }
        newCurrentResult.totalTxs = newTotalTxs
        setTotalTxs(newTotalTxs)
      }
      setCurrentResult(newCurrentResult)
      if (txsResult?.transactions.length === 0) {
        setTotalTxs(0)

        const currentType = filters.methodType?.find(({ active }) => active)
        const activeMethodType = currentType ? currentType.method : undefined

        // If the user is searching "All" transactions, all is disabled and there are no incoming transactions,
        // the filter will change automatically to "Outgoing"
        if (isFirstSearch && activeMethodType === 'incoming' && [undefined, 'all'].includes(router.query.type as string)) {
          setIsFirstSearch(false)
          const newFilters = {
            ...filters,
            methodType: filters.methodType
              ? [...filters.methodType].map(option => {
                  const newOption = { ...option }
                  newOption.active = option.method === 'outgoing'
                  return newOption
                })
              : [],
          }
          handleFilterChange(newFilters)
        }
      } else {
        setIsFirstSearch(false)
      }
    }
    /**
     * Save the total number of current transactions and the data of the next page.
     */
    if (txsResult?.next_cursor) {
      let addedNextPage = false
      const updatedFetchedPages = fetchedPages.map(elem => {
        if (elem.page === currentPage.page) {
          elem.totalTxs = txsResult.transactions.length
        }
        if (elem.page === currentPage.page + 1) {
          addedNextPage = true
        }
        return elem
      })

      if (!addedNextPage) {
        updatedFetchedPages.push({ page: currentPage.page + 1, cursor: txsResult.next_cursor })
      }
      setFetchedPages(updatedFetchedPages)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [txsResult, isSuccessTxsResult, setFetchedPages, setCurrentResult])

  /**
   * Handle the sort of columns. If the sort is changed, the pagination goes back to the first page.
   */
  const handleSortModelChange = useCallback((sortModel: GridSortModel) => {
    const newSort = sortModel.filter(({ sort }) => sort).map(({ field, sort }) => ({ field, sort }) as Sort)

    setPaginationModel(initPaginationModel)
    setFetchedPages([{ page: 1 }])

    // The sort selected for the user
    setSort(newSort)
  }, [])

  /**
   * Indicate whether the table has to be a tree table with collapsing functionality.
   */
  const collapse = useMemo(() => {
    if (searchType === ObjectType.TXS) {
      return true
    }

    return filters.level === 'all'
  }, [searchType, filters])

  return (
    <Box width={'100%'} height={isMobile ? '40rem' : '100%'}>
      <Table
        rowData={currentResult?.transactions ?? []}
        loading={isLoadingTxsResult}
        mode="normal"
        tableType={tableType}
        title={title}
        rowWatch
        hideFooter={hideFooter}
        filters={filters}
        setFilters={handleFilterChange}
        treeData
        disableColumnFilter
        disableColumnReorder
        noRowsText={noRowsText}
        noRowsIcon={noRowsIcon}
        paginationModel={paginationModel}
        setPaginationModel={setPaginationModel}
        paginationMode="server"
        serverPagination={ServerPagination}
        hideBorder={hideBorder}
        noBorderRadius={noBorderRadius}
        sortModel={sort}
        sortingMode={'server'}
        onSortModelChange={handleSortModelChange}
        collapse={collapse}
      />
    </Box>
  )
}

export default SearchTables
