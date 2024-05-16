import Image from 'next/image'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

import { useSearchStore } from '@/store/data/search'
import { themePath } from '@/theme/utils'
import { Button, Unstable_Grid2 as Grid2, Typography, useTheme } from '@mui/material'

import { colors } from '../../../styles/colors'
import Countdown from '../../common/Countdown'

/**
 * NotFoundView is a component that renders a view when a resource is not found.
 */
const NotFoundView = () => {
  const theme = useTheme()

  // The search history from the store
  const history = useSearchStore(s => s.searchHistoryValue)

  // The history router from next js
  const router = useRouter()

  /**
   * A method to retry the last search from the history
   */
  const handleRetryClick = useCallback(() => {
    router.push(`/search/fil/${history[0].network}/${history[0].type}/${history[0].value}`, undefined, {
      shallow: true,
    })
  }, [router, history])

  const handleGoBackClick = useCallback(() => {
    router.push('/', undefined, {
      shallow: true,
    })
  }, [router])

  /**
   * NotFoundImage is a component that renders an image when a resource is not found.
   */
  const NotFoundImage = () => (
    <Image
      src={themePath('error_shape.svg')}
      alt="Not found image"
      width={150}
      height={150}
      style={{
        maxWidth: '100%',
        height: 'auto',
      }}
    />
  )

  /**
   * NotFoundTitle is a component that renders a title when a resource is not found.
   */
  const NotFoundTitle = () => (
    <Typography
      variant="h3"
      sx={{
        marginBottom: '1.25rem',
        textAlign: 'center',
      }}
    >
      Not found
    </Typography>
  )

  /**
   * NotFoundDescription is a component that renders a description when a resource is not found.
   */
  const NotFoundDescription = () => (
    <Typography sx={{ marginBottom: '1.25rem', color: theme.palette.text.secondary, maxWidth: '75ch', textAlign: 'center' }}>
      We didn&apos;t find <strong>{history[0].value}</strong> in <strong>{history[0].network.name}</strong> network.
      <br />
      But we&apos;ll keep trying in…
    </Typography>
  )

  /**
   * GoBackButton is a component that renders a button to go back to the home page.
   */
  const GoBackButton = () => (
    <Button
      variant="contained"
      sx={{
        height: '38px',
        width: '170px',
        backgroundColor: colors.blue150,
        color: colors.gray50,
        padding: { xs: '6px 32px !important', sm: '6px 16px !important' },
        textTransform: 'none',
        '&:hover': {
          borderColor: colors.blue200,
          backgroundColor: colors.blue50,
          color: colors.gray850,
        },
      }}
      onClick={handleGoBackClick}
    >
      Go back to home page
    </Button>
  )

  /**
   * RefreshButton is a component that renders a button to refresh the page.
   */
  const RefreshButton = () => (
    <Button
      variant="contained"
      sx={{
        height: '38px',
        width: '170px',
        backgroundColor: colors.blue150,
        color: colors.gray50,
        padding: { xs: '6px 32px !important', sm: '6px 16px !important' },
        textTransform: 'none',
        '&:hover': {
          borderColor: colors.blue200,
          backgroundColor: colors.blue50,
          color: colors.gray850,
        },
      }}
      onClick={handleRetryClick}
    >
      Refresh now
    </Button>
  )

  /**
   * NotFoundButtons is a component that renders a set of buttons when a resource is not found.
   */
  const NotFoundButtons = () => (
    <Grid2
      container
      sx={{
        gap: '1rem',
        alignItems: 'center',
        marginTop: '3rem',
      }}
    >
      <GoBackButton />
      <RefreshButton />
    </Grid2>
  )

  return (
    <Grid2
      container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2rem 0',
        margin: { xs: '5rem 1rem', md: '10rem 0rem' },
      }}
    >
      <NotFoundImage />
      <NotFoundTitle />
      <NotFoundDescription />
      <Countdown action={handleRetryClick} />
      <NotFoundButtons />
    </Grid2>
  )
}

export default NotFoundView
