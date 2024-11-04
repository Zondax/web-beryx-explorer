import { AxiosError } from 'axios'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { GridSortModel } from '@/components/muigrid/types'
import { TABLE_TYPE } from '@/config/tables'
import { useEvents } from '@/data/beryx'
import { PagesProps, useSearchStore } from '@/store/data/search'
import { useNotificationsStore } from '@/store/ui/notifications'
import { Analyze } from '@carbon/pictograms-react'
import { Box } from '@mui/material'

import { Sort, errorDescriptions, initPaginationModel } from 'components/widgets/SearchTables/config'
import Table from 'components/widgets/Table'
import { CustomServerPagination } from 'components/widgets/Table/ServerPagination'

interface EventProps {
  hideFooter?: boolean
  limitRows?: number
  title?: string
}
/**
 * Component responsible for events data presentation.
 * It generates a table of events according to the selected network,
 * the current search input value and the selected search type.
 */
const Events = ({ hideFooter = false, limitRows, title }: EventProps) => {
  // Get the current search input value from redux store.
  const inputValue = useSearchStore(s => s.searchInputValue)
  // Get the selected network from store.
  const network = useSearchStore(s => s.searchInputNetwork)
  // Get the selected search type from store.
  const searchType = useSearchStore(s => s.searchType)
  // Get the selected search input type from store.
  const inputType = useSearchStore(s => s.searchInputType)

  const addNotification = useNotificationsStore(s => s.addNotification)

  const [paginationModel, setPaginationModel] = useState(initPaginationModel)
  const [currentPage, setCurrentPage] = useState<PagesProps>({ page: 1 })
  const [fetchedPages, setFetchedPages] = useState<PagesProps[]>([{ page: 1 }])
  const [sort, setSort] = useState<Sort[] | undefined>([])

  /**
   * Parameters that will be sent in the request.
   */
  const queryParameters = useMemo(() => {
    return {
      input: inputValue,
      network,
      inputType,
      objectType: searchType,
      sort,
      page: currentPage,
    }
  }, [inputValue, network, searchType, inputType, sort, currentPage])

  /**
   * Request for all events.
   */
  const { data: events, isFetching: eventsIsFetching, isSuccess: eventsIsSuccess, error: eventsError } = useEvents(queryParameters)

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

  const finalEvents = useMemo(() => {
    if (!eventsIsSuccess) {
      return []
    }
    if (limitRows) {
      return events.events?.slice(0, limitRows ?? undefined)
    }
    return events.events
  }, [eventsIsSuccess, events, limitRows])

  /**
   * Update the next cursor when the response is received
   */
  useEffect(() => {
    if (events?.next_cursor) {
      setFetchedPages(prev => [...prev, { page: currentPage.page + 1, cursor: events.next_cursor }])
    }
    // currentPage shouldn't be a dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events, setFetchedPages])

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
    if (eventsError && eventsError instanceof AxiosError) {
      const errorCode = eventsError.response?.data.error_code
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
  }, [eventsError, addNotification])

  return (
    <Box height={'100%'}>
      <Table
        rowData={finalEvents}
        mode="normal"
        tableType={TABLE_TYPE.EVENTS}
        hideBorder
        loading={eventsIsFetching}
        noRowsText={`No events on ${network?.name}`}
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

export default Events
