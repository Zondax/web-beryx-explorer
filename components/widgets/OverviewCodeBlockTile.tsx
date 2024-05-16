import { useCallback } from 'react'

import { downloadTxtFile, getContentType } from '@/utils/download'
import { copyContent } from '@/utils/text'
import { Copy, Download } from '@carbon/icons-react'
import { Box, IconButton, useTheme } from '@mui/material'

import CodeBlock from './CodeBlock'

/**
 * Props interface for `OverviewCodeBlockTile` component
 */
interface OverviewCodeBlockTileProps {
  /**
   * data to be processed and displayed.
   */
  data: any

  /**
   * label to be used during text file download.
   */
  label: string

  /**
   * height of the component. Default is 'min-content'.
   */
  height?: string

  /**
   * Word Wrap property. Default is 'off'.
   */
  wordWrap?: 'on' | 'off' | 'wordWrapColumn' | 'bounded'
}

/**
 * `OverviewCodeBlockTile` functional component definition
 */
const OverviewCodeBlockTile = ({ data, label, height = 'min-content' }: OverviewCodeBlockTileProps) => {
  const theme = useTheme()

  const handleCopyButton = useCallback(() => {
    copyContent(JSON.stringify(data, null, 2))
  }, [data])

  const handleDownloadButton = useCallback(() => {
    downloadTxtFile(data, `Beryx_Transaction_${label}_Parameters`, 'application/json', '.json')
  }, [data, label])

  return (
    <Box
      sx={{
        gap: '0.5rem',
        width: '100%',
        height,
        borderRadius: '8px',
        border: `1px solid ${theme.palette.background.level2}`,
        contain: 'paint',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: '0.5rem',
          position: 'absolute',
          right: '0.5rem',
          bottom: '0.5rem',
          zIndex: '400',
        }}
      >
        <IconButton color="info" onClick={handleCopyButton}>
          <Copy />
        </IconButton>
        <IconButton color="info" onClick={handleDownloadButton}>
          <Download />
        </IconButton>
      </Box>

      <CodeBlock
        key={`contract file ${name}`}
        readOnly
        content={data}
        contentType={getContentType(typeof data)}
        noContentText="No Parameters"
        fillResizablePanel
        wordWrap="off"
        dynamicHeight={height === 'min-content'}
      />
    </Box>
  )
}

export default OverviewCodeBlockTile
