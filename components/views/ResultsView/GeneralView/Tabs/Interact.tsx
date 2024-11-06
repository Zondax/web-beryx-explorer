/**
 * Import necessaries Modules
 */
import { throttle } from 'lodash'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { TABLE_TYPE } from '@/config/tables'
import { TransactionData, useMempoolStore } from '@/store/data/mempool'
import { useSearchStore } from '@/store/data/search'
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
import { MempoolTransactionsTable } from './Mempool'

/**
 * Interact component
 */
const Interact = () => {
  /* Get theme values and translation function */
  const theme = useTheme()
  const { t } = useTranslation()

  /* Get contract data from store */
  const { rpcResponse: response, contractCode, ethAddress, decodingStatus } = useContractsStore()

  const searchValue: string = useSearchStore(s => s.searchInputValue)

  const isMempoolLoading = useMempoolStore(s => s.loading)
  const mempoolTransactionsRef = useRef(useMempoolStore.getState().transactions)
  const [throttleTxs, setThrottleTxs] = useState<TransactionData[]>([])
  const throttleTxsRef = useRef<TransactionData[]>([])

  /**
   * updateTable is a callback function that filters the transactions based on the search value
   * and updates the throttleTxs state if the new transactions array length is greater than 0.
   *
   * @callback
   * @returns {void}
   */
  const updateTable = useCallback(() => {
    const newTxs = mempoolTransactionsRef.current.filter(row => {
      return row.tx_from === searchValue || row.tx_to === searchValue
    })
    if (throttleTxsRef.current.length > 0 || newTxs.length > 0) {
      throttleTxsRef.current = newTxs
      setThrottleTxs(newTxs)
    }
  }, [searchValue])

  useEffect(() => {
    const unsubscribe = useMempoolStore.subscribe(state => (mempoolTransactionsRef.current = state.transactions))

    const throttleUpdate = throttle(updateTable, 3000)
    throttleUpdate()
    const intervalId = setInterval(throttleUpdate, 3000)

    return () => {
      unsubscribe()
      clearInterval(intervalId)
      throttleUpdate.cancel()
    }
  }, [updateTable])

  useEffect(() => {
    if (!isMempoolLoading && mempoolTransactionsRef.current.length !== 0) {
      updateTable()
    }
  }, [isMempoolLoading, updateTable])

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
      <Grid container height={'100%'} width={'100%'} sx={{ overflowY: 'auto', ...horizontalFadingBorder(theme, 'right') }}>
        <RunMethod abi={contractCode.functions} ETHAddress={ethAddress} status={decodingStatus} />
      </Grid>
      <Grid container height={'100%'} sx={{ borderRadius: '12px', overflow: 'hidden' }}>
        <Panel
          contentToDownload={''}
          initialTab={response ? '0' : '1'}
          tabs={[{ name: t('Transactions') }, { name: t('Mempool') }, { name: t('Response'), disabled: response === '' }]}
          currentTab={throttleTxs.length > 0 ? '1' : response ? '2' : '0'}
        >
          <SearchTables
            tableType={TABLE_TYPE.TRANSACTIONS}
            noRowsText={'No transactions'}
            noRowsIcon={<InspectData color={theme.palette.text.secondary} />}
            hideBorder
            noBorderRadius
          />
          <MempoolTransactionsTable
            filteredRows={throttleTxs}
            loading={isMempoolLoading}
            noRowsText={t('At the moment, this address has no transactions in mempool.')}
            noBorderRadius
          />
          <CodeBlock
            key={'read contract response'}
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
