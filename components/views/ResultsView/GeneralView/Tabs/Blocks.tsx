import { TABLE_TYPE } from '@/config/tables'
import { useSearchStore } from '@/store/data/search'
import { Build } from '@carbon/pictograms-react'
import { Box } from '@mui/material'

import Table from '../../../../widgets/Table'

/**
 * Blocks component renders a Table to display blocks related data depending on the search input value.
 * It uses useSelector hook to access the state of the application and select the search input value
 * and associated result data. If no data is available, a custom message is displayed to the user.
 * @component
 * @example
 * return (
 *   <Blocks />
 * )
 */
const Blocks = () => {
  /**
   * useSelector hook used to select a search input value from the store.
   * @name inputValue
   * @type {string}
   */
  const inputValue = useSearchStore(s => s.searchInputValue)

  /**
   * useSelector hook is used to select the search result json data from the store.
   * @name searchResultJson
   * @type {object}
   */
  const searchResultJson = useSearchStore(s => s.searchResult.json)

  return (
    /**
     * A Box component from MUI to act as a container.
     * If inputValue is not null, it renders a Table component with the respective props.
     */
    <Box height={'100%'}>
      {inputValue ? (
        <Table
          rowData={searchResultJson?.blocks_info ?? []}
          tableType={TABLE_TYPE.TIPSET_MINERS}
          rowWatch
          mode="dev"
          noRowsText={'Something went wrong. There must be at least a miner. Try refreshing the page.'}
          noRowsIcon={<Build />}
        />
      ) : null}
    </Box>
  )
}

export default Blocks
