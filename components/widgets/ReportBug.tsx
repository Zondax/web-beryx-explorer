import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { themePath } from '@/theme/utils'
import { Grid, Grow, Typography } from '@mui/material'
import { useCookieConsent } from '@porscheofficial/cookie-consent-banner-react'

/**
 * This is a functional component for reporting bugs.
 * It checks for cookie consent and renders UI accordingly.
 * In case of no consent, it will display only text message,
 * otherwise it will display additional arrow pointing to Marker feedback tool.
 * The arrow grows in when it enters the viewport.
 */
const ReportBug = () => {
  /**
   * Hook for getting accepted cookie categories.
   * Used to check if the user has accepted analytics cookies.
   */
  const acceptedCategories = useCookieConsent()

  /**
   * State for tracking if Marker.io is allowed.
   * It's enabled if analytics cookies are accepted.
   */
  const [isMarkerIoEnabled, setIsMarkerIoEnabled] = useState(Boolean(acceptedCategories.includes('analytics')))

  /**
   * State for tracking if the widget is in viewport.
   */
  const [isInViewport, setIsInViewport] = useState(false)

  /**
   * Creating a reference to the widget's DOM element.
   */
  const widgetRef = useRef<HTMLDivElement>(null)

  const { t } = useTranslation()

  /**
   * This function checks if the widget is in viewport.
   */
  const checkIfInViewport = () => {
    if (!widgetRef.current || !window) {
      return
    }
    setIsInViewport(window.pageYOffset + window.innerHeight - widgetRef.current?.offsetTop > 250)
  }

  /**
   * useEffect hook for scroll event.
   * It checks if the widget is in viewport on each scroll.
   */
  useEffect(() => {
    /**
     * This function is an event handler for the scroll event.
     * It calls the checkIfInViewport function to check if the widget is in the viewport.
     */
    const onScroll = () => {
      checkIfInViewport()
    }
    // Adding the onScroll function as an event listener for the scroll event.
    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /**
   * useEffect hook for setting the state of Marker.io.
   * It depends on whether the user accepted analytics cookies.
   */
  useEffect(() => {
    setIsMarkerIoEnabled(Boolean(acceptedCategories.includes('analytics')))
  }, [acceptedCategories])

  /**
   * Markup to display when the user did not consent to the analytics cookies.
   */
  const markupNoConsent = (
    <>
      <Typography color="text.secondary" variant="body1" component={'p'} marginBottom={5} textAlign="center" maxWidth={'30rem'}>
        {t('We would like to know your opinion. Please accept cookies to share your feedback with us.')}
      </Typography>
      <Grow in={isInViewport} {...(isInViewport ? { timeout: 500 } : {})}>
        <Image
          src="/images/arrow_drawn_down.svg"
          alt="Pointer to Marker.io"
          width={60}
          height={60}
          style={{
            maxWidth: '100%',
            height: 'auto',
          }}
        />
      </Grow>
    </>
  )

  /**
   * Markup to point to the Marker.io when user gives consent.
   */
  const pointToMarker = (
    <Typography color="text.secondary" variant="body1" component={'p'} marginBottom={5} textAlign="center" maxWidth={'30rem'}>
      {t('We would like to know your opinion. See the arrow? Click over there to send feedback')}
    </Typography>
  )

  /**
   * Return the main component rendering.
   */
  return (
    <Grid
      ref={widgetRef}
      container
      direction="column"
      sx={{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '4rem 0',
        margin: { xs: '0 1rem', md: '0 0 13rem 0' },
      }}
    >
      <Image
        src={themePath('report_bug.svg')}
        alt="report bug image"
        width={80}
        height={80}
        style={{
          maxWidth: '100%',
          height: 'auto',
        }}
      />
      <Typography variant="h3" component={'h2'} textAlign="center" maxWidth={'40rem'} mb={1} mt={2}>
        {t('Have a bug to report or a feature request?')}
      </Typography>
      {isMarkerIoEnabled ? pointToMarker : markupNoConsent}
      <Grow in={isMarkerIoEnabled && isInViewport} {...(isInViewport ? { timeout: 500 } : {})}>
        <Image
          src="/images/arrow_drawn.svg"
          alt="Pointer to Marker.io"
          width={120}
          height={120}
          style={{
            position: 'fixed',
            zIndex: 200,
            bottom: 'calc(80vh / 2)',
            right: '3rem',
            maxWidth: '100%',
            height: 'auto',
          }}
        />
      </Grow>
    </Grid>
  )
}

export default ReportBug
