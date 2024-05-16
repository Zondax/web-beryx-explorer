import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { fetchTransactionDetails, fetchTransactionParams } from '@/api-client/beryx'
import { useSearchStore } from '@/store/data/search'
import { boxShadow } from '@/theme/hoverEffect'
import { getContentType } from '@/utils/download'
import { Close, Script } from '@carbon/icons-react'
import {
  Backdrop,
  Box,
  CircularProgress,
  Fade,
  Unstable_Grid2 as Grid,
  IconButton,
  Modal,
  Tooltip,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { Transaction } from '@zondax/beryx/dist/filecoin/api/types'

import CodeBlock from '../widgets/CodeBlock'
import Panel from '../widgets/Panel'
import { NoRows } from '../widgets/Table'

/**
 * Interface for TransactionDetailsProps.
 * @interface
 * @property {any} content - Content object containing initial transaction data.
 */
interface TransactionDetailsProps {
  content: Transaction | any
}

/**
 * TransactionDetails component provides UI and methods for retrieving and displaying detailed data about a specific blockchain transaction.
 * It utilizes various utility functions to fetch detailed data and parameters of a transaction from the network.
 *
 * @component
 * @param Content object containing initial transaction data.
 */
const TransactionDetails = ({ content }: TransactionDetailsProps) => {
  const theme = useTheme()
  const { t } = useTranslation()
  const [openCodeModal, setOpenCodeModal] = useState<boolean>(false)
  const [params, setParams] = useState<any>(undefined)
  const [loadingMetadata, setLoadingMetadata] = useState<boolean>(false)
  const [loadingParams, setLoadingParams] = useState<boolean>(false)
  const [txDetails, setTxDetails] = useState<any>(content)

  const [_errorMetadata, setErrorMetadata] = useState<boolean>(false)
  const [_errorParams, setErrorParams] = useState<boolean>(false)

  const upMd = useMediaQuery(useTheme().breakpoints.up('md'))
  const network = useSearchStore(s => s.searchInputNetwork)

  /**
   * Fetches metadata for the transaction.
   */
  const fetchMetadata = useCallback(async () => {
    if (!content.search_id || !network) {
      return
    }
    setLoadingMetadata(true)
    try {
      const res = await fetchTransactionDetails(content.search_id, network)
      if (res !== 'error') {
        setTxDetails(res)
      }
    } catch {
      setErrorMetadata(true)
    }
    setLoadingMetadata(false)
  }, [content.search_id, network])

  /**
   * Fetches parameters for the transaction.
   */
  const fetchParams = useCallback(async () => {
    if (!content.tx_cid || !network) {
      return
    }

    setLoadingParams(true)
    try {
      const res = await fetchTransactionParams(content.tx_cid, network)
      if (res !== 'error') {
        setParams(res)
      }
    } catch {
      setErrorParams(true)
    }
    setLoadingParams(false)
  }, [content.tx_cid, network])

  /**
   * Handles opening of the modal.
   */
  const handleOpenModal = useCallback(async () => {
    setLoadingMetadata(true)
    setOpenCodeModal(prev => !prev)

    await fetchMetadata()
    await fetchParams()
  }, [fetchMetadata, fetchParams, setLoadingMetadata, setOpenCodeModal])

  /**
   * Handles closing of the modal.
   */
  const handleCloseModal = useCallback(() => {
    setOpenCodeModal(false)
  }, [])

  /**
   * Renders parameters for the transaction.
   */
  function renderParams() {
    if (loadingParams) {
      return <NoRows key={'tx params no rows'} position="center" text={t('Loading...') ?? ''} icon={<CircularProgress />} />
    }
    return (
      <CodeBlock
        key={`contract file ${name}`}
        readOnly
        content={params}
        contentType={getContentType(typeof params)}
        noContentText="No Parameters"
        fillResizablePanel
      />
    )
  }

  /**
   * Renders full details for the transaction.
   */
  function renderFullDetails() {
    if (loadingMetadata) {
      return <NoRows key={'tx fullDetails no rows'} position="center" text={'Loading...'} icon={<CircularProgress />} />
    }
    return (
      <CodeBlock
        key={`contract file ${name}`}
        readOnly
        content={txDetails}
        contentType={getContentType(typeof txDetails)}
        fillResizablePanel
      />
    )
  }

  /**
   * Renders metadata for the transaction.
   */
  function renderMetadata() {
    if (loadingMetadata) {
      return <NoRows key={'tx metadata no rows'} position="center" text={'Loading...'} icon={<CircularProgress />} />
    }
    return (
      <CodeBlock
        key={`contract file ${name}`}
        readOnly
        content={txDetails?.tx_metadata}
        contentType={getContentType(typeof txDetails)}
        fillResizablePanel
      />
    )
  }

  return (
    <>
      <Tooltip title={t('View transaction parameters')} arrow disableInteractive>
        <IconButton data-testid={'transaction-details-button'} color="info" sx={{ width: '2.25rem' }} onClick={handleOpenModal}>
          <Script />
        </IconButton>
      </Tooltip>

      <Modal
        open={openCodeModal}
        onClose={handleCloseModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openCodeModal}>
          <Grid
            data-testid={'transaction-details-modal'}
            container
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '50rem',
              maxWidth: upMd ? '80vw' : 'calc(100vw - 1rem)',
              boxShadow: boxShadow(theme.palette.mode),
              borderRadius: '12px',
              overflow: 'hidden',
              filter: `drop-shadow(${theme.palette.mode === 'light' ? theme.shadows[2] : theme.shadows[3]})`,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.1rem',
              padding: '0rem',
              border: `1px solid ${theme.palette.border?.level0}`,
              backgroundColor: theme.palette.background?.level1,
            }}
          >
            <Grid xs={12}>
              <Box
                sx={{
                  gap: '0.5rem',
                  height: '40rem',
                  maxHeight: '80vh',
                  borderRadius: '8px',
                }}
              >
                <Panel
                  tabs={[{ name: t('Full Transaction Details') }, { name: 'Metadata' }, { name: t('Decoded Parameters') }]}
                  actionButtons={[
                    <IconButton
                      key="transaction-details-close-button"
                      color="info"
                      onClick={handleCloseModal}
                      data-testid={'transaction-details-close-button'}
                    >
                      <Close />
                    </IconButton>,
                  ]}
                >
                  {[renderFullDetails(), renderMetadata(), renderParams()]}
                </Panel>
              </Box>
            </Grid>
          </Grid>
        </Fade>
      </Modal>
    </>
  )
}

export default TransactionDetails
