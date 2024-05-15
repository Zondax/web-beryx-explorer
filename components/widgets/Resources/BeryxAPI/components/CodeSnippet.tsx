/**
 * Module dependencies.
 */
import { useTranslation } from 'react-i18next'

import { getContentType } from '@/utils/download'
import { Box, useMediaQuery, useTheme } from '@mui/material'

import CodeBlock from '../../../CodeBlock'
import Panel from '../../../Panel'
import { languageExample, response } from './BeryxAPIData'

/**
 * `CodeSnippet` is a React functional component that displays one block for displaying the API Code Snippet
 * and another block displaying the fetched API response.
 *
 * @returns Grid layout with two main blocks displaying API Code Snippet and corresponding response.
 */
const CodeSnippet = () => {
  // Generate translation hook
  const { t } = useTranslation()

  // Generate theme hook
  const theme = useTheme()

  // Setting viewport based on media queries
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'))

  return (
    <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" gap="1rem">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: { xs: '25rem', md: '30rem' },
          p: { textTransform: 'none' },
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      >
        <Panel
          title={isDesktop ? t('Code Snippet') : undefined}
          contentToDownload={''}
          tabBackgroundColor={theme.palette.background.level2}
          tabs={languageExample.map(item => {
            return { name: item.name }
          })}
        >
          {languageExample.map(item => {
            return (
              <CodeBlock
                key={`Beryx API code snippet ${item.name}`}
                readOnly
                content={item.code}
                contentType={item.language}
                fillResizablePanel
              />
            )
          })}
        </Panel>
      </Box>
      <Box
        sx={{
          width: '100%',
          height: { xs: '25rem', md: '30rem' },
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      >
        <Panel contentToDownload={''} title={t('Response')} tabBackgroundColor={theme.palette.background.level2}>
          <CodeBlock
            key={'Beryx API tipset example response'}
            readOnly
            content={response}
            contentType={getContentType(typeof response)}
            fillResizablePanel
          />
        </Panel>
      </Box>
    </Box>
  )
}

export default CodeSnippet
