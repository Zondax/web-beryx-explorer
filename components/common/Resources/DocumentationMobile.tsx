import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useResourcesStore } from '@/store/ui/resources'
import { File } from '@/utils/serialize'
import { validateLanguage } from '@/utils/translate'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { Box, Collapse, List, ListItemButton, ListItemText, useTheme } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'

import Article from './Article'
import { RenderFile, RenderFolder } from './FolderTree'
import { documentationContent } from './data'

/**
 * DocumentationMobile component.
 * This component is responsible for rendering the mobile version of the documentation.
 * It includes a collapsible menu with the documentation content and an area to display the selected documentation file.
 * @component
 */
const DocumentationMobile = () => {
  const theme = useTheme()

  /**
   * Translation hook from i18next library.
   * @type {i18n}
   */
  const { i18n } = useTranslation()

  /**
   * State callback for setting the documentation file currently opened.
   * @type {Function}
   */
  const setOpenedFile = useResourcesStore(s => s.setDocumentationCurrentFile)

  /**
   * State for the documentation file currently opened.
   * @type {string}
   */
  const openedFile = useResourcesStore(s => s.documentationCurrentFile)

  /**
   * State for managing whether the documentation menu is open or not.
   * @type {boolean}
   */
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  /**
   * Function to handle when a documentation file is clicked.
   * It sets the clicked file as the currently opened file.
   * @param fileName - The name of the file that gets clicked.
   * @param file - The data of the clicked file.
   * @example
   * handleClick('myFile', myFileData)
   */
  const handleClick = useCallback(
    (fileName: string, file: File) => {
      setOpenedFile(file.content)
    },
    [setOpenedFile]
  )

  /**
   * Function to handle the opening and closing of the documentation menu.
   * It toggles the state of isMenuOpen.
   * @example
   * handleMenu()
   */
  const handleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev)
  }, [])

  /**
   * Effect that checks whether a change in language invalidates the currently opened file.
   * If it does, the file is changed to the language valid equivalent.
   */
  useEffect(() => {
    const newOpenedFile = validateLanguage(i18n.language, openedFile)
    if (newOpenedFile) {
      setOpenedFile(newOpenedFile)
    }
  }, [i18n.language, openedFile, setOpenedFile])

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
            <ListItemText secondary={'Documentation'} />
            {isMenuOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={isMenuOpen} timeout="auto" unmountOnExit sx={{ padding: '0.5rem' }}>
            {Object.entries(documentationContent(i18n.language)).map(([name, item]) =>
              item.type === 'folder' ? (
                <RenderFolder
                  folderName={name}
                  folder={item}
                  level={0}
                  key={`folder ${name} - 1`}
                  handleFileClick={handleClick}
                  hasIcon={false}
                />
              ) : (
                <RenderFile fileName={name} file={item} level={0} key={`file ${name} - 1`} handleFileClick={handleClick} hasIcon={false} />
              )
            )}
          </Collapse>
        </List>
      </Grid>
      <Grid
        container
        height={'100%'}
        sx={{ border: `1px solid ${theme.palette.info.main}`, borderRadius: '6px', padding: '2rem 1rem', overflowY: 'auto' }}
      >
        <Article content={openedFile ?? `/docs/${i18n.language}/introduction.mdx`} />
      </Grid>
    </Box>
  )
}

/**
 * Default export of DocumentationMobile component.
 */
export default DocumentationMobile
