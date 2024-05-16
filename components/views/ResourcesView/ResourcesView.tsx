import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { useResourcesStore } from '@/store/ui/resources'
import { downloadSourceCode } from '@/utils/download'
import { ChevronLeft, Download } from '@carbon/icons-react'
import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material'

import { LinkCardProps } from 'components/common/LinkCard'
import Contract from 'components/common/Resources/Contract'
import ContractMobile from 'components/common/Resources/ContractMobile'
import Contracts from 'components/common/Resources/Contracts'
import Documentation from 'components/common/Resources/Documentation'
import DocumentationMobile from 'components/common/Resources/DocumentationMobile'
import TOC from 'components/common/Resources/TOC'
import { contracts } from 'components/common/Resources/data'

/**
 * Interface for ResourcesProps
 * @interface
 * @property {LinkCardProps[]} resourcesMetaInfo - Array of metadata for resources to be displayed
 */
interface ResourcesProps {
  resourcesMetaInfo: LinkCardProps[]
}

/**
 * RecentActivityView component.
 * This component provides UI and methods for displaying recent activity.
 * @component
 */
const ResourcesView = ({ resourcesMetaInfo }: ResourcesProps) => {
  const theme = useTheme()
  const { t } = useTranslation()
  const currentPage = useResourcesStore(s => s.currentPage)
  const setCurrentPage = useResourcesStore(s => s.setCurrentPage)
  const currentContract = useResourcesStore(s => s.currentContract)
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

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
        height: '5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: { xs: '0 0.5rem 0 0.5rem', md: '0.5rem 0.5rem 0 1.25rem' },
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
        content = isDesktop ? (
          <Box sx={{ height: 'calc(100dvh - 13rem)', width: '100%' }}>
            <Contract />
          </Box>
        ) : (
          <ContractMobile />
        )
        break
      case 'documentation':
        content = isDesktop ? <Documentation /> : <DocumentationMobile />
        break
      default:
        content = <TOC resourcesMetaInfo={resourcesMetaInfo} />
    }
    return (
      <Box
        sx={{ height: 'calc(100% - 3.5rem - 4rem)', padding: { xs: '0 0.5rem 0.5rem 0.5rem', md: '0 0.5rem 0.5rem 1rem' }, width: '100%' }}
      >
        {content} {/** The main content.*/}
      </Box>
    )
  }, [currentPage, isDesktop, resourcesMetaInfo])

  return (
    <Box
      sx={{
        height: { xs: 'calc(100dvh - 6.75rem)', md: 'calc(100dvh - 6rem - 1.75rem)' },
        transition: { xs: 'height 0.2s ease-in-out', md: 'none' },
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        gap: '8px',
        bgcolor: 'background.level1',
        borderRadius: '8px',
      }}
      key={'results view panel'}
    >
      <Box
        sx={{
          height: '100%',
          overflowY: 'auto',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <Content />
        {MainContent}
      </Box>
    </Box>
  )
}
export default ResourcesView
