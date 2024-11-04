/**
 * @file This file contains the SourceCodeTab component which displays the source code of a contract in a folder structure.
 * @module components/widgets/SearchedItem/FolderStructure/SourceCodeTab
 */
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useContractsStore } from '@/store/ui/contracts'
import { File, Folder } from '@/utils/serialize'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { Box, Collapse, List, ListItemButton, ListItemIcon, ListItemText, Tooltip, Typography } from '@mui/material'

import CodeFileIcon from '../common/CodeFileIcon'
import { FolderIcon, FolderOpenIcon } from '../common/Icons'

/**
 * RenderFile component is used to render a file in the folder structure.
 * @param props - The properties passed to the component.
 * @param props.fileName - The name of the file.
 * @param props.file - The file object.
 * @param props.level - The level of the file in the folder structure.
 */
export const RenderFile = ({ fileName, file, level }: { fileName: string; file: File; level: number }) => {
  const { currentFile: currentOpenedFile } = useContractsStore(s => s.code)
  const openFile = useContractsStore(s => s.openFile)

  /**
   * @function handleClick
   * @description Handles the click event on the file. It dispatches the setCurrentTab action and opens the file.
   */
  const handleClick = useCallback(() => {
    openFile({ fileName, file })
  }, [fileName, file, openFile])

  const isSelected = currentOpenedFile?.content === file.content

  return (
    <ListItemButton onClick={handleClick} selected={isSelected} sx={{ ml: 3 * level, gap: '0.2rem' }}>
      <ListItemIcon sx={{ minWidth: '1.5rem' }}>
        <CodeFileIcon fileName={fileName} />
      </ListItemIcon>
      <ListItemText
        primary={fileName}
        primaryTypographyProps={{
          style: {
            whiteSpace: 'normal',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: '2',
            WebkitBoxOrient: 'vertical',
          },
        }}
      />
    </ListItemButton>
  )
}

/**
 * RenderFolder component is used to render a folder in the folder structure.
 * @param props - The properties passed to the component.
 * @param props.folderName - The name of the folder.
 * @param props.folder - The folder object.
 * @param props.level - The level of the folder in the folder structure.
 */
export const RenderFolder = ({
  folderName,
  folder,
  level,
  disabled,
}: {
  folderName: string
  folder: Folder
  level: number
  disabled?: boolean
}) => {
  const [open, setOpen] = useState(false)

  /**
   * Handles the click event on the folder.
   * Toggles the open state of the folder.
   */
  const handleClick = useCallback(() => {
    if (disabled) {
      return
    }
    setOpen(!open)
  }, [open, disabled])

  return (
    <>
      <ListItemButton onClick={handleClick} sx={{ ml: 3 * level, gap: '0.2rem' }} disabled={disabled}>
        <ListItemIcon sx={{ minWidth: '1.5rem' }}>{open ? <FolderOpenIcon size={16} /> : <FolderIcon size={15} />}</ListItemIcon>
        <ListItemText primary={folderName} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List dense component="div" disablePadding>
          {Object.entries(folder.children).map(([name, item]) =>
            item.type === 'folder' ? (
              <RenderFolder folderName={name} folder={item} level={level + 1} key={`folder ${name} - ${level}`} />
            ) : (
              <RenderFile fileName={name} file={item} level={level + 1} key={`file ${name} - ${level}`} />
            )
          )}
        </List>
      </Collapse>
    </>
  )
}

/**
 * SourceCodeTab component is used to display the source code of a contract in a folder structure.
 */
const SourceCodeTab = () => {
  const sourceCode = useContractsStore(state => state.contractCode.sourceCode)

  const { t } = useTranslation()

  return (
    <Box sx={{ width: '100%', mb: '0.5rem' }}>
      <Typography
        variant="caption"
        component={'p'}
        color="text.secondary"
        sx={{
          display: { xs: 'none', md: 'flex' },
          paddingBottom: '0.45rem',
          margin: '1rem 0 1rem 1.25rem',
          borderBottom: '1px solid',
          borderColor: 'border.level1',
        }}
      >
        {t('Contract files')}
      </Typography>

      {sourceCode['Source Code'] === undefined && (
        <Tooltip title={t('Source code is not available because the contract is not verified.')}>
          <span>
            <RenderFolder
              folderName={'Source Code'}
              folder={{ type: 'folder', children: {} }}
              level={0}
              key={`folder ${name} - 1`}
              disabled
            />
          </span>
        </Tooltip>
      )}

      {Object.entries(sourceCode || {}).map(([name, item]) => {
        if (name === 'Source Code') {
          return item.type === 'folder' ? (
            <RenderFolder folderName={name} folder={item} level={0} key={`folder ${name} - 1`} />
          ) : (
            <RenderFile fileName={name} file={item} level={0} key={`file ${name} - 1`} />
          )
        }
        return null
      })}

      <Typography
        variant="caption"
        component={'p'}
        color="text.secondary"
        sx={{
          display: { xs: 'none', md: 'flex' },
          paddingBottom: '0.45rem',
          margin: '2.5rem 0 1rem 1.25rem',
          borderBottom: '1px solid',
          borderColor: 'border.level1',
        }}
      >
        {t('Other files')}
      </Typography>

      {Object.entries(sourceCode || {}).map(([name, item]) => {
        if (name === 'Source Code') {
          return null
        }
        return item.type === 'folder' ? (
          <RenderFolder folderName={name} folder={item} level={0} key={`folder ${name} - 1`} />
        ) : (
          <RenderFile fileName={name} file={item} level={0} key={`file ${name} - 1`} />
        )
      })}
    </Box>
  )
}

export default SourceCodeTab
