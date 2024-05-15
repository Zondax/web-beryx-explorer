/**
 * @file This file contains the components for rendering files and folders in a tree structure.
 * @module FolderTree
 */
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useResourcesStore } from '@/store/ui/resources'
import { File, Folder } from '@/utils/serialize'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { ListItemIcon } from '@mui/material'
import Collapse from '@mui/material/Collapse'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'

import SourceCodeFileIcon from '../CodeFileIcon/CodeFileIcon'
import FolderIcon from '../Icons/FolderIcon'
import FolderOpenIcon from '../Icons/FolderOpenIcon'

/**
 * @function RenderFile
 * @description This function component renders a file in the tree structure.
 * @param props - The properties passed to the component.
 * @param props.fileName - The name of the file.
 * @param props.file - The file object.
 * @param props.level - The level of the file in the tree structure.
 * @param props.hasIcon - Whether the file has an icon.
 * @param props.handleFileClick - The function to handle file click.
 */
export const RenderFile = ({
  fileName,
  file,
  level,
  hasIcon,
  handleFileClick,
}: {
  fileName: string
  file: File
  level: number
  hasIcon: boolean
  handleFileClick: (fileName: string, file: File) => void
}) => {
  const { t } = useTranslation()
  const openedFile = useResourcesStore(s => s.documentationCurrentFile)

  /**
   * @function handleClick
   * @description This function handles the click event on the file.
   * It calls the handleFileClick function passed as a prop with the fileName and file as arguments.
   */
  const handleClick = useCallback(() => {
    handleFileClick(fileName, file)
  }, [fileName, file, handleFileClick])

  return (
    <ListItemButton onClick={handleClick} selected={openedFile === file.content} sx={{ ml: 3 * level, gap: '0.2rem' }}>
      {hasIcon ? (
        <ListItemIcon sx={{ minWidth: '1.5rem' }}>
          <SourceCodeFileIcon fileName={fileName} />
        </ListItemIcon>
      ) : null}

      <ListItemText
        primary={t(fileName)}
        primaryTypographyProps={{
          style: {
            whiteSpace: 'normal',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: '1',
            WebkitBoxOrient: 'vertical',
          },
        }}
      />
    </ListItemButton>
  )
}

/**
 * @function RenderFolder
 * @description This function component renders a folder in the tree structure.
 * @param props - The properties passed to the component.
 * @param props.folderName - The name of the folder.
 * @param props.folder - The folder object.
 * @param props.level - The level of the folder in the tree structure.
 * @param props.hasIcon - Whether the folder has an icon.
 * @param props.handleFileClick - The function to handle file click.
 */
export const RenderFolder = ({
  folderName,
  folder,
  level,
  hasIcon,
  handleFileClick,
}: {
  folderName: string
  folder: Folder
  level: number
  hasIcon: boolean
  handleFileClick: (fileName: string, file: File) => void
}) => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  /**
   * @function handleClick
   * @description This function toggles the open state of the folder.
   */
  const handleClick = useCallback(() => {
    setOpen(!open)
  }, [open])

  return (
    <>
      <ListItemButton onClick={handleClick} sx={{ ml: 3 * level, gap: '0.2rem' }}>
        {hasIcon ? (
          <ListItemIcon sx={{ minWidth: '1.5rem' }}>{open ? <FolderOpenIcon size={16} /> : <FolderIcon size={15} />}</ListItemIcon>
        ) : null}
        <ListItemText primary={t(folderName)} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List dense component="div" disablePadding>
          {Object.entries(folder.children).map(([name, item]) =>
            item.type === 'folder' ? (
              <RenderFolder
                folderName={name}
                folder={item}
                level={level + 1}
                hasIcon={hasIcon}
                key={`folder ${name} - ${level}`}
                handleFileClick={handleFileClick}
              />
            ) : (
              <RenderFile
                fileName={name}
                file={item}
                level={level + 1}
                key={`file ${name} - ${level}`}
                handleFileClick={handleFileClick}
                hasIcon={hasIcon}
              />
            )
          )}
        </List>
      </Collapse>
    </>
  )
}
