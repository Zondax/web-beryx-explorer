import { useEffect, useState } from 'react'

import { TABLE_TYPE } from '@/config/tables'
import { useContractsVerified } from '@/data/beryx'
import { PagesProps } from '@/store/data/search'
import { useAppSettingsStore } from '@/store/ui/settings'
import { Analyze } from '@carbon/pictograms-react'
import { Box } from '@mui/material'

import { initPaginationModel } from 'components/widgets/SearchTables/config'
import { CustomServerPagination } from 'components/widgets/Table/ServerPagination'

import Table from '../../../../widgets/Table'

/**
 * VerifiedContracts component.
 * Represents the table of verified contracts on the selected network.
 */
const VerifiedContracts = () => {
  /**
   * Take the current state of network.
   */
  const { network } = useAppSettingsStore(state => ({ network: state.network }))

  const [paginationModel, setPaginationModel] = useState(initPaginationModel)
  const [currentPage, setCurrentPage] = useState<PagesProps>({ page: 1 })
  const [fetchedPages, setFetchedPages] = useState<PagesProps[]>([{ page: 1 }])

  const {
    data: verifiedContracts,
    isFetching: contractsIsFetching,
    isSuccess: contractIsSuccess,
  } = useContractsVerified(network, currentPage)

  /**
   * Update the next cursor when the response is received
   */
  useEffect(() => {
    if (verifiedContracts?.next_cursor) {
      setFetchedPages(prev => [...prev, { page: currentPage.page + 1, cursor: verifiedContracts.next_cursor }])
    }
    // currentPage shouldn't be a dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verifiedContracts, setFetchedPages])

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

  return (
    <Box height={'100%'}>
      <Table
        rowData={contractIsSuccess ? verifiedContracts.data : []}
        mode="normal"
        tableType={TABLE_TYPE.VERIFIED_CONTRACTS}
        title="Verified Contracts"
        loading={contractsIsFetching}
        noRowsText={`No contracts were verified on ${network.name}`}
        noRowsIcon={<Analyze />}
        rowWatch
        paginationModel={paginationModel}
        setPaginationModel={setPaginationModel}
        paginationMode="server"
        serverPagination={CustomServerPagination({ fetchedPages, currentPage })}
      />
    </Box>
  )
}

export default VerifiedContracts
