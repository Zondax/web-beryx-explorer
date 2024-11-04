import { AxiosError } from 'axios'
import { useCallback, useEffect, useState } from 'react'

import { GridSortDirection, GridSortModel } from '@/components/muigrid/types'
import { TABLE_TYPE } from '@/config/tables'
import { useMultisigAddressStateTraces } from '@/data/beryx'
import { PagesProps, useSearchStore } from '@/store/data/search'
import { useNotificationsStore } from '@/store/ui/notifications'
import { Analyze } from '@carbon/pictograms-react'
import { Box } from '@mui/material'

import { Sort, errorDescriptions, initPaginationModel } from 'components/widgets/SearchTables/config'
import Table from 'components/widgets/Table'
import { CustomServerPagination } from 'components/widgets/Table/ServerPagination'

interface StateTracesProps {
  hideFooter?: boolean
  title?: string
}
/**
 * Component responsible for trace data presentation.
 * It generates a table of state trace according to the selected network,
 * the current search input value and the selected search type.
 */
const StateTraces = ({ hideFooter = false, title }: StateTracesProps) => {
  // Get the current search input value from redux store.
  const address = useSearchStore(s => s.searchInputValue)
  // Get the selected network from store.
  const network = useSearchStore(s => s.searchInputNetwork)

  const addNotification = useNotificationsStore(s => s.addNotification)

  const [paginationModel, setPaginationModel] = useState(initPaginationModel)
  const [currentPage, setCurrentPage] = useState<PagesProps>({ page: 1 })
  const [fetchedPages, setFetchedPages] = useState<PagesProps[]>([{ page: 1 }])
  const [sort, setSort] = useState<Sort[] | undefined>([])

  /**
   * Request for all proposals.
   */
  const {
    data: stateTraces,
    isFetching: stateTracesIsFetching,
    isSuccess: stateTracesIsSuccess,
    error: stateTracesError,
  } = useMultisigAddressStateTraces({ address, network, sort, page: currentPage })

  /**
   * Handle the sort of columns. If the sort is changed, the pagination goes back to the first page.
   */
  const handleSortModelChange = useCallback((sortModel: GridSortModel) => {
    const newSort = sortModel.filter(({ sort }: { sort: GridSortDirection }) => sort).map(({ field, sort }) => ({ field, sort }) as Sort)

    setPaginationModel(initPaginationModel)
    setFetchedPages([{ page: 1 }])

    // The sort selected for the user
    setSort(newSort)
  }, [])

  /**
   * Update the next cursor when the response is received
   */
  useEffect(() => {
    if (stateTraces?.next_cursor) {
      setFetchedPages(prev => [...prev, { page: currentPage.page + 1, cursor: stateTraces.next_cursor }])
    }
    // currentPage shouldn't be a dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateTraces, setFetchedPages])

  /**
   * Update the page when the paginationModel changes (the user changes the page).
   */
  useEffect(() => {
    // Another page is required or the paginationModel changed
    const page = fetchedPages.find(({ page }: { page: number }) => page === paginationModel.page + 1)

    if (page) {
      setCurrentPage(page)
    }
    // fetchedPages shouldn't be a dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginationModel])

  /**
   * Change the request if the received error is 4001 and the method type is All.
   * Otherwise, trigger a notification.
   */
  useEffect(() => {
    if (stateTracesError && stateTracesError instanceof AxiosError) {
      const errorCode = stateTracesError.response?.data.error_code
      if (errorCode && errorDescriptions[errorCode]) {
        addNotification({
          title: '',
          description: errorDescriptions[errorCode],
          status: 'error',
          tag: ['search'],
        })
      }
      setSort([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateTracesError, addNotification])

  return (
    <Box height={'100%'}>
      <Table
        rowData={stateTracesIsSuccess ? stateTraces.traces : []}
        mode="normal"
        tableType={TABLE_TYPE.STATE_TRACE}
        hideBorder
        loading={stateTracesIsFetching}
        noRowsText={`No state traces on ${network?.name}`}
        noRowsIcon={<Analyze />}
        rowWatch
        paginationModel={paginationModel}
        setPaginationModel={setPaginationModel}
        paginationMode="server"
        serverPagination={CustomServerPagination({ fetchedPages, currentPage })}
        onSortModelChange={handleSortModelChange}
        hideFooter={hideFooter}
        title={title}
      />
    </Box>
  )
}

export default StateTraces
