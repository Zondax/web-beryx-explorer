import { useCallback, useMemo } from 'react'

import { GridPagination } from '@/components/muigrid/types'
import { PagesProps } from '@/store/data/search'
import { LabelDisplayedRowsArgs } from '@mui/material'

export const CustomServerPagination = ({
  fetchedPages,
  currentPage,
}: {
  fetchedPages: PagesProps[]
  currentPage: PagesProps
}): JSX.Element => {
  /**
   * Label to display in the Server Pagination component
   */
  const labelDisplayedRows = useCallback((paginationInfo: LabelDisplayedRowsArgs) => {
    return <>Page {paginationInfo.page + 1}</>
  }, [])

  /**
   * Server Pagination component
   */
  const ServerPagination = useMemo(() => {
    const hasNext = fetchedPages.find(({ page }: { page: number }) => page === currentPage.page + 1)
    return <GridPagination slotProps={{ actions: { nextButton: { disabled: !hasNext } } }} labelDisplayedRows={labelDisplayedRows} />
  }, [fetchedPages, currentPage, labelDisplayedRows])

  return ServerPagination
}
