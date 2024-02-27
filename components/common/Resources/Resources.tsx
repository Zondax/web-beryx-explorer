import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { useResourcesStore } from '@/store/ui/resources'
import { downloadSourceCode } from '@/utils/download'
import { ChevronLeft, Close, Download } from '@carbon/icons-react'
import { Backdrop, Box, Button, Modal, Typography, useMediaQuery, useTheme } from '@mui/material'

import Contract from './Contract'
import ContractMobile from './ContractMobile'
import Contracts from './Contracts'
import Documentation from './Documentation'
import DocumentationMobile from './DocumentationMobile'
import TOC from './TOC'
import { contracts } from './data'

/**
 * Displays user resources, these could be contracts, documentations and more.
 */
const UserResources = () => {
  const theme = useTheme()
  const { t } = useTranslation()
  const currentPage = useResourcesStore(s => s.currentPage)
  const setCurrentPage = useResourcesStore(s => s.setCurrentPage)
  const isOpen = useResourcesStore(s => s.isOpen)
  const setIsOpen = useResourcesStore(s => s.setIsOpen)
  const currentContract = useResourcesStore(s => s.currentContract)
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

  /**
   * Closes the modal.
   */
  const onClose = useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen])

  /**
   * Handles navigation between pages.
   * If the current page is 'contract', it navigates to 'contracts'.
   * Otherwise, it navigates to the undefined page.
   */
  const handleNavigation = useCallback(() => {
    if (currentPage === 'contract') {
      setCurrentPage('contracts')
      return
    }
    setCurrentPage(undefined)
  }, [currentPage, setCurrentPage])

  /**
   * Downloads the contract source code.
   * It finds the contract files by the current contract title and downloads the source code.
   */
  const downloadContract = useCallback(async () => {
    const contractFiles = contracts.find(item => item.title === currentContract)
    if (contractFiles !== undefined) {
      await downloadSourceCode(contractFiles.files, currentContract)
    }
  }, [currentContract])

  const handleClose = useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen])

  /**
   * TopBar component.
   * This component displays the 'Resources' title and a close button.
   */
  const TopBar = () => {
    return (
      <Box
        sx={{
          width: '100%',
          mb: '0.5rem',
          height: '3.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: `1px solid ${theme.palette.tableBorder}`,
          padding: { xs: '0 0.5rem 0 1rem', md: '0 0.5rem 0 2rem' },
        }}
      >
        <Typography variant="body1">{t('Resources')}</Typography>
        <Button variant={'text'} sx={{ minWidth: 'unset', padding: '0.5rem 0.7rem' }} onClick={handleClose}>
          <Close size={20} />
        </Button>
      </Box>
    )
  }

  /**
   * backButton component.
   * This component displays a back button if there is a current page.
   */
  const backButton = useMemo(() => {
    return currentPage ? (
      <Button
        variant={'text'}
        sx={{
          minWidth: 'unset',
          padding: '0.25rem 0.75rem 0.25rem 0.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          ':hover': { background: 'none' },
        }}
        onClick={handleNavigation}
      >
        <ChevronLeft />
        <Typography variant="caption" sx={{ color: 'inherit' }}>
          {t('Back')}
        </Typography>
      </Button>
    ) : null
  }, [currentPage, handleNavigation, t])

  /**
   * downloadButton component.
   * This component displays a download button if the current page is 'contract'.
   */
  const downloadButton = useMemo(() => {
    return currentPage === 'contract' ? (
      <Button
        id={'upload-ipfs'}
        onClick={downloadContract}
        variant="contained"
        size="medium"
        startIcon={<Download />}
        sx={{
          textTransform: 'capitalize',
          padding: '0.76rem 0.9rem 0.76rem 0.9rem',
        }}
      >
        {t('Download Contract')}
      </Button>
    ) : null
  }, [currentPage, downloadContract, t])

  /**
   * Content component.
   * This component displays the back button and the download button.
   */
  const Content = () => (
    <Box
      sx={{
        width: '100%',
        mb: '0.5rem',
        height: '3rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: { xs: '0 0.5rem 0 0.5rem', md: '0 0.5rem 0 1.25rem' },
      }}
    >
      {backButton}
      {downloadButton}
    </Box>
  )

  /**
   * MainContent component.
   * This component displays the main content based on the current page.
   */
  const MainContent = useMemo(() => {
    let content
    switch (currentPage) {
      case 'contracts':
        content = <Contracts />
        break
      case 'contract':
        content = isDesktop ? <Contract /> : <ContractMobile />
        break
      case 'documentation':
        content = isDesktop ? <Documentation /> : <DocumentationMobile />
        break
      default:
        content = <TOC />
    }
    return (
      <Box sx={{ height: 'calc(100% - 3.5rem - 4rem)', padding: { xs: '0 0.5rem 0.5rem 0.5rem', md: '0 0.5rem 0.5rem 1rem' } }}>
        {content} {/** The main content.*/}
      </Box>
    )
  }, [currentPage, isDesktop])

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: isDesktop ? '80%' : 'calc(100% - 0.5rem)',
          maxWidth: '120rem',
          height: '90%',
          minHeight: '40rem',
          bgcolor: 'background.level1',
          borderRadius: '10px',
          boxShadow: 24,
        }}
      >
        <TopBar />
        <Content />
        {MainContent}
      </Box>
    </Modal>
  )
}

export default UserResources
