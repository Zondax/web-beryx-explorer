import { useMemo } from 'react'

import { muifyHtml } from '@/utils/muifyHtml'
import { Typography, useMediaQuery, useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import { PostOrPage } from '@tryghost/content-api'

/**
 * @interface ArticleViewProps
 * @desc This interface defines the properties for the ArticleView component.
 * @property {PostOrPage | null} article - The article to be displayed.
 */
interface ArticleViewProps {
  article?: PostOrPage | null
}

/**
 * @function ArticleView
 * @desc This component displays an article.
 * @param {ArticleViewProps} { article } - The properties for the component.
 * @returns {JSX.Element} The ArticleView component.
 */
const ArticleView = ({ article }: ArticleViewProps) => {
  const theme = useTheme()
  const upMd = useMediaQuery(theme.breakpoints.up('md'))

  /**
   * @desc This is where the article's HTML is muified and stored in a variable.
   * @returns The muified HTML of the article.
   */
  const muifiedHtml = useMemo(() => {
    return article?.html && muifyHtml(article?.html)
  }, [article?.html])

  return (
    <Box
      data-testid="article-view"
      sx={{
        borderRadius: '8px',
        overflowY: 'auto',
        width: '100%',
        height: upMd ? 'calc(100dvh - 2.25rem - 4rem)' : 'fit-content',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          backgroundColor: theme.palette.background.level1,
          borderRadius: '8px',
          width: 'fit-content',
          height: 'fit-content',
          display: 'flex',
          flexDirection: 'column',
          padding: { xs: '0 2rem 4rem 2rem', md: '0 3rem 5rem 3rem' },
          position: 'relative',
        }}
      >
        <Box
          sx={{
            position: 'sticky',
            top: 0,
            backgroundColor: theme.palette.background.level1,
            zIndex: 1,
            paddingTop: { xs: '3rem', md: '4rem' },
            boxShadow: `0 10px 20px ${theme.palette.background.level1}`,
          }}
        >
          <Typography variant="h3" mb={{ xs: '2rem', md: '3rem' }}>
            {article?.title}
          </Typography>
        </Box>
        <Box
          sx={{
            maxWidth: { xs: '100%', md: '75ch' },
          }}
        >
          {muifiedHtml}
        </Box>
      </Box>
    </Box>
  )
}

export default ArticleView
