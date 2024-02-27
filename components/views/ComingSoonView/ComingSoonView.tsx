import { useRouter } from 'next/router'
import { useCallback } from 'react'

import { Button, Unstable_Grid2 as Grid2, Typography, useTheme } from '@mui/material'
import { Stack } from '@mui/system'

import { colors } from '../../../styles/colors'

/**
 * `ComingSoonView` is a component that renders "Coming Soon" view.
 * @returns ComingSoonView component rendered.
 */
const ComingSoonView = () => {
  // This hook returns the `theme` object.
  const theme = useTheme()
  // This hook allows to access the `router` object.
  const router = useRouter()

  const handleGoBackButton = useCallback(() => {
    router.push('/', undefined, {
      shallow: true,
    })
  }, [router])

  return (
    <>
      <Grid2
        container
        sx={{
          justifyContent: 'center',
          zIndex: 1,
          width: '100%',
        }}
      >
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
          <Typography
            variant="h2"
            sx={{
              marginBottom: '1.25rem',
              color: theme.palette.text.secondary,
              textAlign: 'center',
            }}
          >
            Coming Soon
          </Typography>
          <Typography sx={{ marginBottom: '3rem', color: theme.palette.text.secondary, maxWidth: '75ch', textAlign: 'center' }}>
            Stay tuned. Network dashboard is on the way.
          </Typography>
          <Button
            variant="contained"
            sx={{
              height: '38px',
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
            onClick={handleGoBackButton}
          >
            Go back to home page
          </Button>
        </Grid2>
      </Grid2>

      <Stack sx={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: '0rem' }} spacing={2} />
    </>
  )
}

export default ComingSoonView
