import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { useResourcesStore } from '@/store/ui/resources'
import { File } from '@/utils/serialize'
import { validateLanguage } from '@/utils/translate'
import { Box } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'

import Article from './Article'
import { RenderFile, RenderFolder } from './FolderTree'
import { documentationContent } from './data'

/**
 * Documentation component.
 * This component is responsible for rendering the documentation.
 * It includes a sidebar with the documentation content and an area to display the selected documentation file.
 * @component
 */
const Documentation = () => {
  const { i18n } = useTranslation()
  const setOpenedFile = useResourcesStore(s => s.setDocumentationCurrentFile)
  const openedFile = useResourcesStore(s => s.documentationCurrentFile)

  /**
   * Handles the clicked item in the files list.
   * @param  {string} fileName - The name of the clicked file.
   * @param  {File} file - The File object includes the content and type.
   */
  const handleClick = useCallback(
    (fileName: string, file: File) => {
      setOpenedFile(file.content)
    },
    [setOpenedFile]
  )

  /**
   * Validates that the opened file exists in the new language when the language or the currently opened file changes.
   * If a translation of the opened file doesn't exist in the new language, it defaults to the introduction file of the new language.
   * @effect
   */
  useEffect(() => {
    const newOpenedFile = validateLanguage(i18n.language, openedFile)
    if (newOpenedFile) {
      setOpenedFile(newOpenedFile)
    }
  }, [i18n.language, openedFile, setOpenedFile])

  return (
    <Grid container spacing={'1rem'} width={'100%'} height={'100%'}>
      <Grid xs={3} height={'100%'} overflow={'auto'}>
        <Box data-testid="documentation-sidebar" sx={{ width: '100%', padding: '0.5rem' }}>
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
        </Box>
      </Grid>
      <Grid xs={9} height={'100%'} overflow={'auto'} px={'2.5rem'}>
        <Article content={openedFile ?? `/docs/${i18n.language}/01-index.mdx`} />
      </Grid>
    </Grid>
  )
}

export default Documentation
