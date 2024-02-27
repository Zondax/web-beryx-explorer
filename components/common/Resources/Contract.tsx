import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useResourcesStore } from '@/store/ui/resources'
import { getContentType } from '@/utils/download'
import { File, FileSystemObject } from '@/utils/serialize'
import { FileTransfer } from '@carbon/pictograms-react'
import { Box, CircularProgress, Typography, useTheme } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'

import TwoPanelHorizontal from '../../Layout/variants/TwoPanelHorizontal'
import CodeBlock from '../../widgets/CodeBlock'
import Panel, { PanelTab } from '../../widgets/Panel'
import NoRows from '../../widgets/Table/NoRows'
import { RenderFile, RenderFolder } from './FolderTree'
import { contracts } from './data'

/**
 * Functional component to handle and display Contract related functionalities.
 * @returns JSX.Element
 */
const Contract = () => {
  const theme = useTheme()
  const { t } = useTranslation()
  const openFile = useResourcesStore(s => s.openFile)
  const closeFile = useResourcesStore(s => s.closeFile)
  const currentContract = useResourcesStore(s => s.currentContract)
  const [contract, setContract] = useState<{ title: string; description: string; files: Record<string, FileSystemObject> } | undefined>(
    undefined
  )
  const [_tabs, setTabs] = useState<PanelTab[] | undefined>(undefined)

  const openedFiles = useResourcesStore(s => s.currentContractOpenedFiles)
  const currentContractFile = useResourcesStore(s => s.currentContractOpenedFile)

  const handleFileClick = useCallback(
    (fileName: string, file: File) => {
      openFile(fileName, file)
    },
    [openFile]
  )

  /**
   * Function callback to handle closing of tab.
   * @callback
   * @param fileName - Name of the file associated with the tab to be closed.
   */
  const handleCloseTab = useCallback(
    (fileName: string) => {
      closeFile(fileName)
    },
    [closeFile]
  )

  /**
   * A useEffect hook, to handle changes whenever currentContract changes.
   */
  useEffect(() => {
    if (currentContract) {
      setContract(contracts.find(contract => contract.title === currentContract))
    }
  }, [currentContract])

  /**
   * A useEffect hook, to handle changes whenever openedFiles changes.
   */
  useEffect(() => {
    if (openedFiles === undefined) {
      setTabs(undefined)
      return
    }

    setTabs(
      Object.keys(openedFiles).map((item: string) => {
        return { name: item, disabled: false, canClose: true, onClose: handleCloseTab }
      })
    )
  }, [handleCloseTab, openedFiles])

  if (!contract) {
    return (
      <Box sx={{ width: '100%', height: '90%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress size={24} />
      </Box>
    )
  }

  return (
    <TwoPanelHorizontal sizes={[25, 75]} minSizes={[300, 400]}>
      <Grid container height={'100%'} width={'100%'} sx={{ overflowY: 'auto' }}>
        <Box sx={{ width: '100%', border: '1px solid transparent' }}>
          <Typography variant="h4" fontWeight={600} paddingLeft={'1rem'} mb={'1rem'}>
            {currentContract ? t(currentContract) : null}
          </Typography>
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
        </Box>
      </Grid>
      <Grid container height={'100%'} sx={{ border: `1px solid ${theme.palette.info.main}`, borderRadius: '6px' }}>
        <Panel
          contentToDownload={''}
          floatingActionButtons
          tabs={
            openedFiles === undefined
              ? openedFiles
              : Object.keys(openedFiles).map((item: string) => {
                  return { name: item, disabled: false, canClose: true, onClose: handleCloseTab }
                })
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
    </TwoPanelHorizontal>
  )
}

export default Contract
