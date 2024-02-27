/**
 * The `WelcomeToBeryx` component is a React function component that represents
 * the welcome screen of the Beryx website.
 *
 * @example
 * // Returns the welcome screen section of the Beryx website
 * return <WelcomeToBeryx />
 */
import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

import { themePath } from '@/theme/utils'
import { Grid, Typography, useTheme } from '@mui/material'

import SearchBar from '../common/SearchBar'
import SearchExamples from './SearchExamples'

/**
 * `WelcomeToBeryx` is a React function component that represents the welcome screen of the Beryx website.
 * It uses the Material UI theme and the i18next translation hook.
 *
 * @returns A JSX element that represents the welcome screen of the Beryx website.
 */
const WelcomeToBeryx = (): JSX.Element => {
  const theme = useTheme()
  const { t } = useTranslation()

  return (
    <Grid
      container
      direction="column"
      sx={{
        alignItems: 'center',
        marginTop: { xs: `calc(5rem + ${theme.spacing(8)})`, md: '5rem' },
        zIndex: 1,
      }}
    >
      <Typography
        variant="h2"
        component={'h1'}
        fontWeight={600}
        sx={{
          maxWidth: '30ch',
          textAlign: 'center',
          marginBottom: '0.5rem',
        }}
      >
        Welcome to{' '}
        <span
          style={{
            background: 'radial-gradient(82.43% 2159.61% at 61.04% 91.89%, #3159C0 0%, #6E98D7 100%, #6A93D0 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Beryx
        </span>
      </Typography>
      <Grid container spacing={0} display="flex" justifyContent="center" alignItems="center" sx={{ marginBottom: '3rem' }}>
        <Typography
          variant="subtitle2"
          sx={{
            marginRight: '0.25rem',
          }}
        >
          {t('developed by')}
        </Typography>
        <Link href="https://zondax.ch/">
          <Image
            src={themePath('zondax_text.svg')}
            alt="zondax-logo"
            height={11}
            width={51}
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        </Link>
      </Grid>
      <SearchBar hasSearchButton={false} />
      <SearchExamples />
    </Grid>
  )
}

export default WelcomeToBeryx
