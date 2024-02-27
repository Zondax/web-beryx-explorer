import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { fetchMetadata } from '@/components/metaData'
import { LoadingStatus } from '@/config/config'
import { TABLE_TYPE } from '@/config/tables'
import { useSearchStore } from '@/store/data/search'
import { InspectData } from '@carbon/pictograms-react'
import { Box, useTheme } from '@mui/material'

import OverviewCodeBlockTile from '../../../../widgets/OverviewCodeBlockTile'
import Table from '../../../../widgets/Table'
import OverviewItem from './Overview/OverviewItem'

/**
 * Component properties interface
 * */
interface DetailPanelContentProps {
  readonly row: any
}

/**
 * The Detail Panel Content component.
 * @param row - data object
 */
function DetailPanelContent({ row }: DetailPanelContentProps) {
  const theme = useTheme()
  const { t } = useTranslation()

  // Create an object to store repetitive data for OverviewItems
  const overviewItemsData = [
    { data: row.data, label: 'Data' },
    { data: row.topics, label: 'Topics' },
  ].map(({ data, label }) => ({
    label: `${t(label)}`,
    description: undefined,
    content: <OverviewCodeBlockTile data={data} label={label} wordWrap={'on'} />,
    icon: undefined,
    display: true,
  }))

  return (
    <Box
      height={'max-content'}
      bgcolor={'background.level1'}
      className={'detail-panel'}
      sx={{
        border: `1px solid ${theme.palette.tableBorder}`,
        borderTop: 'none',
        borderRadius: '0px 6px 0 6px',
        padding: '1rem',
      }}
    >
      <Box
        height={'max-content'}
        sx={{
          border: `1px solid ${theme.palette.tableBorder}`,
          borderRadius: '6px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto',
        }}
      >
        {overviewItemsData.map(item => {
          if (item.display) {
            return (
              <OverviewItem key={item.label} label={item.label} description={item.description} content={item.content} icon={item.icon} />
            )
          }
          return null
        })}
      </Box>
    </Box>
  )
}

/**
 * The Logs component
 */
const Logs = () => {
  const theme = useTheme()
  const network = useSearchStore(s => s.searchInputNetwork)
  const metadata = useSearchStore(s => s.searchResult.metadata)
  const searchResultJson = useSearchStore(s => s.searchResult.json)

  const setSearchResultMetadata = useSearchStore(s => s.setSearchResultMetadata)

  const getMetadata = useCallback(fetchMetadata, [setSearchResultMetadata])

  const getDetailPanelContent = useCallback(({ row }: { row: any }) => {
    return <DetailPanelContent row={row} />
  }, [])

  useEffect(() => {
    if (searchResultJson?.search_id !== undefined && !metadata.data && network) {
      getMetadata(searchResultJson?.search_id, network)
    }
  }, [getMetadata, searchResultJson, network, metadata.data])

  return (
    <Box height={'100%'}>
      <Table
        rowData={metadata.loadingStatus === LoadingStatus.Success && metadata.data && metadata.data.ethLogs ? metadata.data.ethLogs : []}
        mode="normal"
        tableType={TABLE_TYPE.TRANSACTIONS_LOGS}
        loading={metadata.loadingStatus === LoadingStatus.Loading}
        noRowsText={'No logs'}
        noRowsIcon={<InspectData color={theme.palette.text.secondary} />}
        getDetailPanelContent={getDetailPanelContent}
      />
    </Box>
  )
}

export default Logs
