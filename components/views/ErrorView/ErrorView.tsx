import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { Box, Divider, Grid, Unstable_Grid2 as Grid2, Typography, alpha, useTheme } from '@mui/material'

import NotFoundTile from '../../common/NotFoundTile'

/**
 * ErrorView component is a functional component that shows a view when an application error occurs.
 * It uses different modules for routing, translation of texts, and material UI for CSS and JSX.
 * @returns JSX.Element ErrorView
 */
const ErrorView = () => {
  const theme = useTheme() // creates a theme instance
  const router = useRouter() // creates a router instance
  const { t } = useTranslation() // creates a translation instance

  /**
   * This function redirects a user to the home page.
   * @returns {void}
   */
  const goToHomePage = useCallback(() => {
    router.push('/')
  }, [router])

  /**
   * The main renderer function for ErrorView component.
   * It returns JSX and CSS for the Error View page.
   * @returns JSX.Element
   */
  return (
    <Grid2
      container
      sx={{
        justifyContent: 'center',
        width: '100%',
        position: 'relative',
      }}
    >
      <Box position={'absolute'} top={{ xs: 50, md: 100 }} zIndex={0}>
        <Typography
          variant={'subtitle1'}
          sx={{
            textAlign: 'center',
            fontSize: '8rem',
            fontWeight: 'bold',
            color: theme.palette.background.level0,
            backgroundColor: theme.palette.background.level0,
            textShadow: `-1px -1px 0 ${alpha(theme.palette.background.level2, 0.6)}, 1px -1px 0 ${alpha(
              theme.palette.background.level2,
              0.6
            )}, -1px 1px 0 ${alpha(theme.palette.background.level2, 0.6)}, 1px 1px 0 ${alpha(theme.palette.background.level2, 0.6)}`,
          }}
        >
          Oops!
        </Typography>
      </Box>
      <Grid2
        container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '2rem 0',
          margin: { xs: '6rem 1rem', md: '10rem 0rem' },
          zIndex: 1,
        }}
      >
        <Grid container flexDirection={'column'} alignItems={'center'} minHeight={'8rem'}>
          {/* Header */}
          <Typography
            variant="h3"
            sx={{
              marginBottom: '1rem',
              textAlign: 'center',
              textTransform: 'capitalize',
            }}
            data-testid={'title-error-view'}
          >
            {t('Error')}
          </Typography>
          <Typography variant={'subtitle1'} sx={{ margin: '1rem 0 1rem 0', maxWidth: '75ch', textAlign: 'center' }}>
            {t("Dashboard couldn't be loaded.")}
          </Typography>
        </Grid>
        <Divider light sx={{ width: '100%', mb: '3.5rem' }} orientation={'horizontal'} />

        {/* Go to Home page */}
        <Grid container flexDirection={'column'} gap={'1rem'} mb={'5rem'}>
          <NotFoundTile
            data={{
              title: 'Go to home page',
              description: 'Continue your adventure',
              icon: 'rocket',
            }}
            action={goToHomePage}
            key={'go-to-home-action-tile'}
          />
        </Grid>

        {/* Report a bug */}
        <Typography variant={'subtitle1'} sx={{ margin: '1rem 0 5rem 0', maxWidth: '40ch', textAlign: 'center' }}>
          {t('To report a bug please use the Feedback tool from the right side of the screen.')}
        </Typography>
      </Grid2>
    </Grid2>
  )
}

export default ErrorView
