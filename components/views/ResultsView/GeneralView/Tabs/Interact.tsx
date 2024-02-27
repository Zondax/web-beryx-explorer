/**
 * Import necessaries Modules
 */
import { useTranslation } from 'react-i18next'

import { TABLE_TYPE } from '@/config/tables'
import { useContractsStore } from '@/store/ui/contracts'
import { horizontalFadingBorder } from '@/theme/hoverEffect'
import { getContentType } from '@/utils/download'
import { InspectData, MobileDevices } from '@carbon/pictograms-react'
import { Box, Unstable_Grid2 as Grid, useMediaQuery, useTheme } from '@mui/material'

import TwoPanelHorizontal from '../../../../Layout/variants/TwoPanelHorizontal'
import CodeBlock from '../../../../widgets/CodeBlock'
import Panel from '../../../../widgets/Panel'
import SearchTables from '../../../../widgets/SearchTables/SearchTables'
import { NoRows } from '../../../../widgets/Table'
import { RunMethod } from '../../ContractView/RunMethod'

/**
 * Interact component
 */
const Interact = () => {
  /* Get theme values and translation function */
  const theme = useTheme()
  const { t } = useTranslation()

  /* Get contract data from store */
  const { rpcResponse: response, contractCode, ethAddress, decodingStatus } = useContractsStore()

  /* Breakpoint query */
  const upMd = useMediaQuery(useTheme().breakpoints.up('md'))

  /* If not upMd breakpoint - return NoRows component */
  if (!upMd) {
    return (
      <Box height={'100%'}>
        <NoRows text={'Interact feature is available only on desktop'} icon={<MobileDevices />} />
      </Box>
    )
  }

  /* Otherwise - return Two Panel grid */
  return (
    <TwoPanelHorizontal sizes={[60, 40]} minSizes={[600, 300]}>
      <Grid container height={'100%'} width={'100%'} sx={{ overflowY: 'auto', ...horizontalFadingBorder(theme) }}>
        <RunMethod abi={contractCode.functions} ETHAddress={ethAddress} status={decodingStatus} />
      </Grid>
      <Grid container height={'100%'} sx={{ border: `1px solid ${theme.palette.info.main}`, borderRadius: '6px' }}>
        <Panel
          contentToDownload={''}
          initialTab={response ? '0' : '1'}
          tabs={[{ name: t('Transactions') }, { name: t('Response'), disabled: response === '' }]}
          currentTab={response ? '1' : '0'}
        >
          <SearchTables
            tableType={TABLE_TYPE.TRANSACTIONS}
            noRowsText={'No transactions'}
            noRowsIcon={<InspectData color={theme.palette.text.secondary} />}
            hideBorder
          />
          <CodeBlock
            key={`contract file ${name}`}
            readOnly
            content={response}
            contentType={getContentType(typeof response)}
            fillResizablePanel
          />
        </Panel>
      </Grid>
    </TwoPanelHorizontal>
  )
}

/* Export Interact component */
export default Interact
