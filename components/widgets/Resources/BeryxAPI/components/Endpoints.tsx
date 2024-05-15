import { useTranslation } from 'react-i18next'

import { Api_1, ArrowUpRight } from '@carbon/icons-react'
import { Box, Unstable_Grid2 as Grid, Paper, Typography, useTheme } from '@mui/material'

import { endpoints } from './BeryxAPIData'
import EndpointTile from './EndpointTile'

/**
 * The Endpoints component provides a UI that showcases the different API endpoints provided
 * by Beryx. It makes use of various components and helper libraries to style and format the
 * details for optimal user experience.
 *
 * @returns A styled component showcasing the Beryx API endpoints
 */
const Endpoints = () => {
  /**
   * useTheme is a custom React hook allowing access to the Material-UI theme.
   */
  const theme = useTheme()

  /**
   * useTranslation is a hook provided by the i18next module that exposes the t function.
   * This function gets the translation for a given key from the current language pack.
   */
  const { t } = useTranslation()

  return (
    <Box
      // variant={'elevation'}
      // elevation={2}
      sx={{
        padding: { xs: '1rem', md: '1.5rem' },
        borderRadius: '12px',
        border: `1px solid ${theme.palette.border?.level0}`,
        overflow: 'hidden',
      }}
    >
      <Grid container spacing={'3rem'} justifyContent={'center'}>
        <Grid xs={12} md={5}>
          <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Api_1 size={20} />
              <Typography variant="body1" component="h2" color={'text.primary'}>
                Endpoints
              </Typography>
            </Box>

            <Box>
              <Typography variant="h4" component="h2" fontSize={'1.25rem'} maxWidth={'25ch'} lineHeight={1.3}>
                {t('Navigate the Filecoin Blockchain while discovering Beryx API endpoints')}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid container xs={12} md={7} spacing={'0.75rem'}>
          {endpoints.map(item => (
            <Grid xs={12} key={`Beryx Endpoint ${item.endpoint}`}>
              <EndpointTile method={item.method} endpoint={item.endpoint} link={item.src} />
            </Grid>
          ))}
          <Grid xs={12} key={'Beryx Endpoint cta'}>
            <a href={'https://docs.zondax.ch/openapi'} target="_blank" rel="noreferrer">
              <Paper
                variant={'outlined'}
                sx={{
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: { xs: '1rem 1.5rem', md: '0.75rem 1rem' },
                  backgroundColor: theme.palette.background.level0,
                  borderColor: theme.palette.background.level2,
                  ':hover': { backgroundColor: theme.palette.background.level2 },
                }}
              >
                <Typography variant="body1" component="p" color={'text.primary'}>
                  {t('See more')}
                </Typography>

                <ArrowUpRight />
              </Paper>
            </a>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Endpoints
