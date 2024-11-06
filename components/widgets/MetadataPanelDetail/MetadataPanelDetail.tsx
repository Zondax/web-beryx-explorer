import { EvmEventDetails, NativeEventDetails } from '@/api-client/beryx.types'
import { useEventDetails } from '@/data/beryx'
import { useSearchStore } from '@/store/data/search'
import { getLoadingStatus } from '@/utils/loadingStatus'
import Box from '@mui/material/Box'
import { GridRenderCellParams, GridTreeNodeWithRender } from '@mui/x-data-grid'

import DetailPanelLayout from '../DetailPanelLayout'
import EthMetadataDetail from './EthMetadataDetail'
import NativeMetadataDetail from './NativeMetadataDetail'

interface MetadataPanelDetailProps {
  params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
}

const MetadataPanelDetail: React.FC<MetadataPanelDetailProps> = ({ params }) => {
  // Get the selected network from store.
  const network = useSearchStore(s => s.searchInputNetwork)
  const isNative = params.row.type === 'native'

  /**
   * Request for the details of the selected event.
   */
  const {
    data: eventDetails,
    isLoading: eventDetailsIsLoading,
    isSuccess: eventDetailsIsSuccess,
  } = useEventDetails(params.row?.search_id ? params.row.search_id : undefined, network)

  return (
    <Box display={'flex'} width={'100%'} height={'100%'}>
      <DetailPanelLayout loading={getLoadingStatus(eventDetailsIsLoading, eventDetailsIsSuccess)}>
        {isNative ? (
          <NativeMetadataDetail metadata={(eventDetails?.metadata as NativeEventDetails) ?? {}} />
        ) : (
          <EthMetadataDetail
            metadata={{ data: eventDetails?.metadata.data ?? '', topics: eventDetails?.metadata.topics ?? '' } as EvmEventDetails}
          />
        )}
      </DetailPanelLayout>
    </Box>
  )
}

export default MetadataPanelDetail
