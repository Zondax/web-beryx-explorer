/**
 * Dynamic imports for CodeSnippet and Endpoints components
 * @see https://nextjs.org/docs/advanced-features/dynamic-import
 */
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'

import { themePath } from '@/theme/utils'
import { Box, Button, Unstable_Grid2 as Grid, Typography } from '@mui/material'

/**
 * Asynchronously load CodeSnippet component
 */
const CodeSnippet = dynamic(() => import('./components/CodeSnippet'))

/**
 * Asynchronously load Endpoints component
 */
const Endpoints = dynamic(() => import('./components/Endpoints'))

/**
 * BeryxAPI component
 * @returns JSX.Element
 */
const BeryxAPI = () => {
  /**
   * Use the useTranslation hook to have access to `t` function for translations
   * @see https://react.i18next.com/latest/usetranslation-hook
   */
  const { t } = useTranslation()

  return (
    <Box
      /**
       * Component styling using Material UI System
       * @see https://mui.com/system/basics/
       */
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '100%',
        padding: { xs: '0 1rem', md: 'inherit' },
      }}
    >
      <Box
        sx={{
          marginBottom: '3rem',
          padding: '0 1rem',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            display: { xs: 'none', md: 'inline-block' },
            position: 'absolute',
            width: '27rem',
            height: '27rem',
            bottom: '-12rem',
            right: 0,
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              width: '27rem',
              height: '27rem',
              top: 0,
              right: 0,
            }}
          >
            <Image
              src={themePath('rocket_api.svg')}
              alt="Transaction icon"
              loading={'eager'}
              fill
              sizes={'100vh'}
              style={{
                maxWidth: '100%',
              }}
            />
          </Box>
        </Box>
        <Typography variant="h3" component={'h2'} gutterBottom textAlign={'left'}>
          {t('Explore Beryx API')}
        </Typography>
        <Typography variant="body1" component={'p'} maxWidth={{ xs: '100%', md: '60ch' }} mb={'2rem'} textAlign={'left'}>
          {t(
            'Beryx indexes and exposes via a public API Filecoin historical and real-time data. We provide historical transactions of every account, interactions with multisig accounts, fees details and many more.'
          )}
        </Typography>
        <Grid container justifyContent="flex-start" gap={2} alignItems={'center'}>
          <Button href="https://auth.zondax.ch/docs" target="_blank" variant={'contained'} size="medium">
            {t('Get free token')}
          </Button>

          <Button href="https://docs.zondax.ch/beryx-api" target="_blank" variant={'outlined'} size="medium">
            {t('Visit documentation')}
          </Button>
        </Grid>
      </Box>

      <CodeSnippet />

      <Endpoints />

      <Box
        sx={{
          alignSelf: 'center',
          justifySelf: 'center',
          padding: '3rem 2rem 0 2rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <Typography variant="body1" component="p" textAlign={'center'}>
          {t('Dont forget that in order to access the Beryx API, youll need an API token.')}
        </Typography>
        <Button href="https://docs.zondax.ch/beryx-api" target="_blank" variant={'contained'} size="medium">
          {t('Visit documentation')}
        </Button>
      </Box>
    </Box>
  )
}

export default BeryxAPI
