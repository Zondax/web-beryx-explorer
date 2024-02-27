/**
 * Import necessary dependencies and components.
 */
import { useCallback } from 'react'

import { useContractsStore } from '@/store/ui/contracts'
import { getContentType } from '@/utils/download'
import { FileTransfer } from '@carbon/pictograms-react'
import { useTheme } from '@mui/material'

import CodeBlock from '../../../../../widgets/CodeBlock'
import Panel from '../../../../../widgets/Panel'
import { NoRows } from '../../../../../widgets/Table'

/**
 * Component to display contract files in a panel.
 * @returns JSX.Element
 */
const ContractFilesPanel = () => {
  const theme = useTheme()
  const closeFile = useContractsStore.getState().closeFile
  const { openedFiles, currentFile: currentOpenedFile } = useContractsStore(s => s.code)
  const updateCurrentOpenedFile = useContractsStore.getState().updateCurrentOpenedFile

  /**
   * Function to handle closing a tab.
   * @param fileName {string} - The name of the file to be closed.
   */
  const handleCloseTab = (fileName: string) => {
    closeFile(fileName)
  }

  /**
   * Function to handle changing tabs.
   * @param value {number} - The index of the file found in openedFiles object.
   */
  const handleChangeTab = useCallback(
    (value: string) => {
      updateCurrentOpenedFile(Number(value))
    },
    [updateCurrentOpenedFile]
  )

  const tabs = Object.keys(openedFiles ?? []).map(item => ({ name: item, disabled: false, canClose: true, onClose: handleCloseTab }))

  return (
    <Panel
      contentToDownload={''}
      floatingActionButtons
      tabs={tabs.length > 0 ? tabs : undefined}
      currentTab={currentOpenedFile?.openedFilesIndex}
      scrollButtons={'auto'}
      onTabChange={handleChangeTab}
    >
      {Object.keys(openedFiles).length === 0 ? (
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
            />
          )
        })
      )}
    </Panel>
  )
}

/**
 * Export the ContractFilesPanel component.
 */
export default ContractFilesPanel
