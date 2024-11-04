import { useTranslation } from 'react-i18next'

import { NativeEventDetails } from '@/api-client/beryx.types'
import { TABLE_TYPE } from '@/config/tables'
import { Box, Typography } from '@mui/material'

import Table from '../Table'

/**
 * Component properties interface
 * */
interface NativeMetadataDetailProps {
  readonly metadata: NativeEventDetails
}

/**
 * The NativeMetadataDetail component.
 * @param row - data object
 */
function NativeMetadataDetail({ metadata }: NativeMetadataDetailProps) {
  const { t } = useTranslation()

  return (
    <Box height={'100%'} width={'100%'} pt={'0.5rem'}>
      <Typography variant="h6" color="text.secondary" component="p" mb="1rem" mt="0.25rem" ml="1rem" fontWeight="bold">
        {t('Event Metadata')}
      </Typography>
      <Table
        key="native metadata detail"
        rowData={metadata ? Object.values(metadata) : []}
        hideBorder
        fixedHeight="180px"
        mode="normal"
        tableType={TABLE_TYPE.NATIVE_EVENTS_METADATA}
        disableColumnFilter
        disableColumnReorder
        loading={false}
        rowWatch={false}
        selectedRowIndex={-1}
        hideFooter
        toolbar={undefined}
      />
    </Box>
  )
}

export default NativeMetadataDetail
