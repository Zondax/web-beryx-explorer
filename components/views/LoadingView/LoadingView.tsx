import { useTranslation } from 'react-i18next'

import { Box, CircularProgress, Grid, Unstable_Grid2 as Grid2, Grow, Typography, useTheme } from '@mui/material'

import BeryxSignet from '../../common/Icons/BeryxSignet'

/**
 * React component representing a loading screen with a spinner and loading text.
 * @param size - Specifies the size of the loading spinner. Can either be 'medium' or 'large'. Default is 'large'.
 * @returns A loading screen component.
 */
const LoadingView = ({ size = 'large' }: { size?: 'medium' | 'large' }) => {
  const theme = useTheme()
  const { t } = useTranslation()

  return (
    <Grid2
      container
      sx={{
        justifyContent: 'center',
        width: '100%',
        position: 'relative',
      }}
    >
      <Grid2
        container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: size === 'medium' ? 0 : '2rem 0',
          zIndex: 1,
        }}
      >
        <Grow in {...{ timeout: 1000 }}>
          <Grid container flexDirection={'column'} alignItems={'center'}>
            <Box
              sx={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CircularProgress thickness={1} size={size === 'medium' ? '2.5rem' : '5rem'} sx={{ color: theme.palette.text.primary }} />
              <Box
                sx={{
                  position: 'absolute',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <BeryxSignet color={theme.palette.text.primary} size={size === 'medium' ? 15 : 28} />
              </Box>
            </Box>

            <Typography
              variant={'subtitle1'}
              sx={{ margin: size === 'medium' ? '0.5rem 0 0.5rem 0' : '1rem 0 1rem 0', maxWidth: '75ch', textAlign: 'center' }}
              data-testid={'loading-view-text'}
            >
              {t('Loading...')}
            </Typography>
          </Grid>
        </Grow>
      </Grid2>
    </Grid2>
  )
}

export default LoadingView
