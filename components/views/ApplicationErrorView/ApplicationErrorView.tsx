import { useRouter } from 'next/router'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { Edit } from '@carbon/icons-react'
import { Box, Divider, Grid, Unstable_Grid2 as Grid2, Typography, useTheme } from '@mui/material'

import NotFoundTile from '../../common/NotFoundTile'

/**
 * ApplicationErrorView is a functional component that displays an error page.
 * It utilizes the `useTheme` hook from `@mui/material` to access the application's theme settings.
 *
 * @param {ApplicationErrorViewProps} props The props containing optional error and errorInfo.
 * @returns The JSX element rendering the error view.
 */
const ApplicationErrorView: React.FC = () => {
  const theme = useTheme()
  const router = useRouter()
  const { t } = useTranslation()

  let errorDescription: React.ReactNode

  /**
   * Navigates to the home page.
   * This function uses the router to navigate back to the home page.
   * @returns
   */
  const goToHomePage = useCallback(() => {
    router.push('/')
  }, [router])

  return (
    <Grid2
      container
      sx={{
        justifyContent: 'center',
        width: '100%',
        position: 'relative',
      }}
    >
      <Box position={'absolute'} top={{ xs: 50, md: 50 }} zIndex={0}>
        <Typography fontSize={240} sx={{ color: 'transparent', WebkitTextStroke: `1px ${theme.palette.text.secondary}66` }}>
          Error
        </Typography>
      </Box>
      <Grid2
        container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '2rem 0',
          margin: { xs: '6rem 1rem', md: '15rem 0rem' },
          zIndex: 1,
        }}
      >
        <Grid container flexDirection={'column'} alignItems={'center'} minHeight={'8rem'}>
          <Typography
            variant="h3"
            sx={{
              marginBottom: '1rem',
              textAlign: 'center',
              textTransform: 'capitalize',
            }}
            data-testid={'title-application-error'}
          >
            {t('Application Error')}
          </Typography>
        </Grid>
        <Divider light sx={{ width: '100%', mb: '5rem' }} orientation={'horizontal'} />

        {errorDescription}

        <Grid container flexDirection={'column'} gap={'1rem'} mb={'5rem'} alignItems={'center'}>
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

        <Typography variant={'subtitle1'} sx={{ margin: '1rem 0 5rem 0', maxWidth: '40ch', textAlign: 'center' }}>
          <Box component={'span'} pr={'0.35rem'}>
            {t('To report a bug please use the Feedback button in the navbar')}
          </Box>
          <Box component={'span'} position={'absolute'}>
            <Edit size="16" />
          </Box>
        </Typography>
      </Grid2>
    </Grid2>
  )
}

export default ApplicationErrorView
