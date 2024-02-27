import { useTranslation } from 'react-i18next'

import { TABLE_TYPE } from '@/config/tables'
import { ObjectType } from '@/routes/parsing'
import { useSearchStore } from '@/store/data/search'
import { InspectData } from '@carbon/pictograms-react'
import { Box, useTheme } from '@mui/material'

import SearchTables from '../../../../widgets/SearchTables/SearchTables'

/**
 * Component responsible for transactions data presentation.
 * It generates a table of transactions according to the selected network,
 * the current search input value and the selected search type.
 */
const Transactions = () => {
  const theme = useTheme()
  const { t } = useTranslation()

  // Get the current search input value from redux store.
  const inputValue = useSearchStore(s => s.searchInputValue)
  // Get the selected network from store.
  const network = useSearchStore(s => s.searchInputNetwork)
  // Get the selected search type from store.
  const searchType = useSearchStore(s => s.searchType)

  const inputType = useSearchStore(s => s.searchType)

  return (
    <Box height={'100%'}>
      {network && inputValue && searchType ? (
        <SearchTables
          tableType={TABLE_TYPE.TRANSACTIONS}
          noRowsText={inputType === ObjectType.TXS ? t('No internal messages') : t('No transactions')}
          noRowsIcon={<InspectData color={theme.palette.text.secondary} />}
        />
      ) : null}
    </Box>
  )
}

export default Transactions
