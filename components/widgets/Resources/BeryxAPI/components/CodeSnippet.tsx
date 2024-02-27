/**
 * Module dependencies.
 */
import { useTranslation } from 'react-i18next'

import { getContentType } from '@/utils/download'
import { Unstable_Grid2 as Grid, useMediaQuery, useTheme } from '@mui/material'

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
    <Grid container spacing={'1rem'} justifyContent={'center'}>
      <Grid xs={12} md={6} height={{ xs: '25rem', md: '30rem' }} sx={{ p: { textTransform: 'none' } }}>
        <Panel
          title={isDesktop ? t('Code Snippet') : undefined}
          contentToDownload={''}
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
      </Grid>
      <Grid xs={12} md={6} height={{ xs: '25rem', md: '30rem' }}>
        <Panel contentToDownload={''} title={t('Response')}>
          <CodeBlock
            key={'Beryx API tipset example response'}
            readOnly
            content={response}
            contentType={getContentType(typeof response)}
            fillResizablePanel
          />
        </Panel>
      </Grid>
    </Grid>
  )
}

export default CodeSnippet
