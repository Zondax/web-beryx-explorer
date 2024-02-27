import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { downloadTxtFile } from '@/utils/download'
import { Download } from '@carbon/icons-react'
import { IconButton, Tooltip } from '@mui/material'

/**
 * @module DownloadColumn
 * @description This module provides a DownloadColumn component. It provides a button allowing the user to download row data.
 * @param - The properties to configure the component.
 * @param row - The data row to be downloaded.
 * @param fileName - The name of the file to be downloaded.
 */
export const DownloadColumn = ({ row, fileName }: { row: any; fileName: string }) => {
  const { t } = useTranslation()

  const handleClick = useCallback(() => {
    // Triggers the download of the row data as a JSON file
    downloadTxtFile(row, fileName, 'application/json', '.json')
  }, [row, fileName])

  /**
   * @description This function returns a Tooltip component with an IconButton inside. The IconButton triggers the download of the row data as a JSON file when clicked.
   * @returns A Tooltip component with an IconButton inside.
   */
  return (
    <Tooltip title={t('Download row data')} arrow disableInteractive>
      <IconButton color="info" aria-label="Download" sx={{ width: '2.25rem' }} onClick={handleClick}>
        <Download />
      </IconButton>
    </Tooltip>
  )
}
