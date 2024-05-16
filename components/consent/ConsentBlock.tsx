import NextLink from 'next/link'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import useAppSettingsStore from '@/store/ui/settings'
import { Box, Link, Typography, useTheme } from '@mui/material'
import { useCookieConsent } from '@porscheofficial/cookie-consent-banner-react'

import { ConsentManager } from './ConsentManager'
import { GoogleAnalytics } from './GoogleAnalytics'
import { MarkerIO } from './MarkerIO'

/**
 * Component rendering the privacy and T&C agreement for the consent popup
 * Uses react-i18next for content translation
 */
export function ConsentContentPopup() {
  const { t } = useTranslation()
  return (
    <Typography variant="body1">
      {t('Zondax understands the importance of protecting and safeguarding your privacy. By using this website you agree with our')}{' '}
      <Link href={'https://zondax.ch/legal/privacy'} component={NextLink}>
        {t('Privacy Policy')}
      </Link>
      {' and '}
      <Link href={'https://zondax.ch/legal/terms'} component={NextLink}>
        {t('Terms and Conditions')}
      </Link>
    </Typography>
  )
}

/**
 * Component handling the conditional rendering of Cookie Consent components and trackers
 * Returns `ConsentManager`, `MarkerIO`,`GoogleAnalytics` based on accepted categories from cookie consent banner
 */
export function ConsentBlock() {
  const theme = useTheme()
  const acceptedCategories = useCookieConsent()
  const [onAcceptedCategories, setOnAcceptedCategories] = useState<string[]>([])
  const setHasFeedbackButton = useAppSettingsStore(s => s.setHasFeedbackButton)

  useEffect(() => {
    setOnAcceptedCategories(acceptedCategories)
  }, [acceptedCategories])

  useEffect(() => {
    if (onAcceptedCategories.includes('technical')) {
      setHasFeedbackButton(true)
    } else {
      setHasFeedbackButton(false)
    }
  }, [onAcceptedCategories, setHasFeedbackButton])

  return (
    <Box position={'relative'} zIndex={theme.zIndex.tooltip}>
      <ConsentManager />
      {Boolean(onAcceptedCategories.includes('technical')) && <MarkerIO />}
      {Boolean(onAcceptedCategories.includes('analytics')) && <GoogleAnalytics />}
    </Box>
  )
}
