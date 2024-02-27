import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { fetchTransactionDetails } from '@/api-client/beryx'
import { useSearchStore } from '@/store/data/search'
import { getContentType } from '@/utils/download'
import { Close, Script } from '@carbon/icons-react'
import { Backdrop, Box, CircularProgress, Fade, Grid, IconButton, Modal, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material'

import CodeBlock from '../widgets/CodeBlock'
import Panel from '../widgets/Panel'
import { NoRows } from '../widgets/Table'

/**
 * Props for CodeView component
 */
interface CodeViewProps {
  content: {
    search_id: string
  }
}

/**
 * Creates a code panel which can display scripts, process commands and set up a backdrop
 *
 * @param content - the content of the code to display
 * @returns the CodeView component
 */
const CodeView = ({ content }: CodeViewProps) => {
  const theme = useTheme()
  const { t } = useTranslation()
  const [openCodeModal, setOpenCodeModal] = useState<boolean>(false)
  const [txDetails, setTxDetails] = useState<any>(content)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const upMd = useMediaQuery(useTheme().breakpoints.up('md'))
  const network = useSearchStore(s => s.searchInputNetwork)

  /**
   * Opens the modal, fetches transaction details if a search id exists, sets error state if an error occurs
   */
  const handleOpenModal = useCallback(async () => {
    setError(false)
    setOpenCodeModal(prev => !prev)

    if (!content.search_id || !network) {
      return
    }
    setLoading(true)
    try {
      const res = await fetchTransactionDetails(content.search_id, network)
      if (res !== 'error') {
        setTxDetails(res)
      }
    } catch {
      setError(true)
    }
    setLoading(false)
  }, [content, network, setError, setTxDetails, setOpenCodeModal, setLoading])

  /**
   * Closes the modal
   */
  const handleCloseModal = useCallback(() => {
    setOpenCodeModal(false)
  }, [])

  /**
   * Render the codeblock, loading or error screen
   */
  const renderCode = () => {
    if (!loading && !error) {
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
    return (
      <NoRows text={error ? "We couldn't find the data. Please try later." : 'Loading...'} icon={error ? null : <CircularProgress />} />
    )
  }

  return (
    <>
      <Tooltip title={t('View complete transaction information')} arrow disableInteractive>
        <IconButton color="info" sx={{ width: '2.25rem' }} onClick={handleOpenModal} data-testid="viewTransactionButton">
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
            data-testid="codeViewGrid"
            container
            bgcolor="background.level1"
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '50rem',
              maxWidth: upMd ? '80vw' : 'calc(100vw - 1rem)',
              border: `1px solid ${theme.palette.background.level2}`,
              boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.24), 0px 1px 3px rgba(0, 0, 0, 0.12)',
              borderRadius: '12px',
              filter: `drop-shadow(${theme.palette.mode === 'light' ? theme.shadows[2] : theme.shadows[3]})`,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.1rem',
              padding: '0.5rem',
            }}
          >
            <Grid container item xs={12} justifyContent={'space-between'} alignItems={'center'} padding={'0 0 0 1rem'}>
              <Typography variant="caption" color={'text.secondary'}>
                {t('Transaction details')}
              </Typography>
              <IconButton
                color="info"
                sx={{ width: '2.5rem', padding: '0.25rem', borderRadius: '8px', zIndex: 5 }}
                onClick={handleOpenModal}
              >
                <Close size={24} />
              </IconButton>
            </Grid>

            <Grid
              item
              xs={12}
              sx={{
                padding: '0.2rem',
              }}
            >
              <Box
                sx={{
                  gap: '0.5rem',
                  height: '40rem',
                  maxHeight: '80vh',
                  borderRadius: '8px',
                  border: `1px solid ${theme.palette.background.level2}`,
                }}
              >
                <Panel noTopbar>{renderCode()}</Panel>
              </Box>
            </Grid>
          </Grid>
        </Fade>
      </Modal>
    </>
  )
}

export default CodeView
