/**
 * @file This file contains the ContractMobile component which is used to display contract details in a mobile-friendly format.
 */
import { useCallback, useEffect, useState } from 'react'

import { useResourcesStore } from '@/store/ui/resources'
import { getContentType } from '@/utils/download'
import { File, FileSystemObject } from '@/utils/serialize'
import { FileTransfer } from '@carbon/pictograms-react'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { Box, CircularProgress, Collapse, List, ListItemButton, ListItemText, useTheme } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'

import CodeBlock from '../../widgets/CodeBlock'
import Panel, { PanelTab } from '../../widgets/Panel'
import NoRows from '../../widgets/Table/NoRows'
import { RenderFile, RenderFolder } from './FolderTree'
import { contracts } from './data'

/**
 * ContractMobile is a component that displays contract details in a mobile-friendly format.
 * It allows users to view and interact with contract files.
 */
const ContractMobile = () => {
  const theme = useTheme()
  const openFile = useResourcesStore(s => s.openFile)
  const closeFile = useResourcesStore(s => s.closeFile)
  const currentContract = useResourcesStore(s => s.currentContract)
  const [contract, setContract] = useState<{ title: string; description: string; files: Record<string, FileSystemObject> } | undefined>(
    undefined
  )
  const [_tabs, setTabs] = useState<PanelTab[] | undefined>(undefined)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const openedFiles = useResourcesStore(s => s.currentContractOpenedFiles)
  const currentContractFile = useResourcesStore(s => s.currentContractOpenedFile)

  /**
   * handleFileClick is a callback function that opens a file when clicked.
   * @param fileName - The name of the file to open.
   * @param file - The file object to open.
   */
  const handleFileClick = useCallback(
    (fileName: string, file: File) => {
      openFile(fileName, file)
    },
    [openFile]
  )

  /**
   * handleMenu is a callback function that toggles the menu open or closed.
   */
  const handleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev)
  }, [])

  /**
   * handleCloseTab is a callback function that closes a tab when clicked.
   * @param fileName - The name of the file to close.
   */
  const handleCloseTab = useCallback(
    (fileName: string) => {
      closeFile(fileName)
    },
    [closeFile]
  )

  /**
   * useEffect hook to set the current contract when it changes.
   */
  useEffect(() => {
    if (currentContract) {
      setContract(contracts.find(contract => contract.title === currentContract))
    }
  }, [currentContract])

  /**
   * useEffect hook to set the tabs when the opened files change.
   */
  useEffect(() => {
    if (openedFiles === undefined) {
      setTabs(undefined)
      return
    }

    setTabs(Object.keys(openedFiles).map((item: string) => ({ name: item, disabled: false, canClose: true, onClose: handleCloseTab })))
  }, [handleCloseTab, openedFiles])

  if (!contract) {
    return (
      <Box sx={{ width: '100%', height: '90%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress size={24} />
      </Box>
    )
  }

  return (
    <Box sx={{ position: 'relative', paddingTop: '4.1rem', height: '100%' }}>
      <Grid
        container
        width={'100%'}
        sx={{
          overflowY: isMenuOpen ? 'auto' : 'hidden',
          position: 'absolute',
          top: '0',
          left: '0',
          zIndex: 180,
          background: theme.palette.background.level1,
          border: `1px solid ${theme.palette.info.main}`,
          borderRadius: '6px',
        }}
      >
        <List dense component="div" disablePadding sx={{ width: '100%' }}>
          <ListItemButton onClick={handleMenu} sx={{ height: '3.5rem', mt: '0', gap: '0.2rem' }}>
            <ListItemText secondary={`${currentContract}`} />
            {isMenuOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={isMenuOpen} timeout="auto" unmountOnExit sx={{ padding: '0.5rem' }}>
            {Object.entries(contract?.files).map(([name, item]) =>
              item.type === 'folder' ? (
                <RenderFolder
                  folderName={name}
                  folder={item}
                  level={0}
                  key={`folder ${name} - 1`}
                  handleFileClick={handleFileClick}
                  hasIcon
                />
              ) : (
                <RenderFile fileName={name} file={item} level={0} key={`file ${name} - 1`} handleFileClick={handleFileClick} hasIcon />
              )
            )}
          </Collapse>
        </List>
      </Grid>
      <Grid container height={'100%'} sx={{ border: `1px solid ${theme.palette.info.main}`, borderRadius: '6px' }}>
        <Panel
          contentToDownload={''}
          floatingActionButtons
          tabs={
            openedFiles === undefined
              ? openedFiles
              : Object.keys(openedFiles).map((item: string) => ({ name: item, disabled: false, canClose: true, onClose: handleCloseTab }))
          }
          currentTab={currentContractFile?.openedFilesIndex}
        >
          {openedFiles === undefined ? (
            <NoRows text={['No opened files']} icon={<FileTransfer color={theme.palette.text.secondary} />} />
          ) : (
            Object.entries(openedFiles).map(([name, file]) => {
              return (
                <CodeBlock
                  key={`contract file ${name}`}
                  readOnly
                  content={file.content}
                  contentType={getContentType(typeof file.content)}
                  fillResizablePanel
                  wordWrap={'wordWrapColumn'}
                />
              )
            })
          )}
        </Panel>
      </Grid>
    </Box>
  )
}

export default ContractMobile
