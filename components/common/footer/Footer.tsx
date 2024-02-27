/**
 * footer component
 * @module Footer
 */
import Image from 'next/image'
import Link from 'next/link'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { themePath } from '@/theme/utils'
import { footerLinkStyle } from '@/utils/footer'
import { Grid, Typography, useTheme } from '@mui/material'
import { triggerCookieConsentBanner } from '@porscheofficial/cookie-consent-banner-react'

import { CoingeckoLink } from 'components/CoingeckoLink'

import Contact from './items/Contact'

/**
 * footer component
 *
 * @returns The footer component
 */
const Footer = (): JSX.Element => {
  const theme = useTheme()
  const { t } = useTranslation()

  /**
   * Handles the click event on the cookies settings
   *
   * @returns {void}
   */
  const cookiesHandleClick = useCallback(() => {
    triggerCookieConsentBanner({ showDetails: true })
  }, [])

  /**
   * Logo component
   *
   * @returns The Logo component
   */
  const Logo = () => (
    <a href={'https://zondax.ch/'} target={'_blank'} rel="noreferrer">
      <Image
        src={themePath('logos/zondax-contact.svg')}
        alt="zondax-logo"
        width={80}
        height={18}
        style={{
          maxWidth: '100%',
          height: 'auto',
        }}
      />
    </a>
  )

  /**
   * TermsAndConditionsLink component
   *
   * @returns The TermsAndConditionsLink component
   */
  const TermsAndConditionsLink = () => (
    <Typography variant="caption" sx={{ ...footerLinkStyle(theme), fontSize: '0.8rem' }}>
      <Link href={'/terms-of-service'} target={'_blank'}>
        {t('Terms & Conditions')}
      </Link>
    </Typography>
  )

  /**
   * PrivacyPolicyLink component
   *
   * @returns The PrivacyPolicyLink component
   */
  const PrivacyPolicyLink = () => (
    <Typography variant="subtitle2" sx={{ ...footerLinkStyle(theme), fontSize: '0.8rem' }}>
      <a href="https://zondax.ch/legal/privacy" target="_blank" rel="noreferrer">
        {t('Privacy Policy')}
      </a>
    </Typography>
  )

  /**
   * CookiesSettingsLink component
   *
   * @returns The CookiesSettingsLink component
   */
  const CookiesSettingsLink = () => (
    <Typography variant="caption" sx={{ ...footerLinkStyle(theme), fontSize: '0.8rem' }} onClick={cookiesHandleClick}>
      {t('Cookies Settings')}
    </Typography>
  )

  /**
   * ChangelogLink component
   *
   * @returns The ChangelogLink component
   */
  const ChangelogLink = () => (
    <Typography variant="caption" sx={{ ...footerLinkStyle(theme), fontSize: '0.8rem' }}>
      <Link href={'/changelog'} target={'_blank'}>
        {t('Changelog')}
      </Link>
    </Typography>
  )

  /**
   * FooterLinks component
   *
   * @returns The FooterLinks component
   */
  const FooterLinks = () => (
    <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column' }} gap={'0.25rem'}>
      <TermsAndConditionsLink />
      <PrivacyPolicyLink />
      <CookiesSettingsLink />
      <ChangelogLink />
    </Grid>
  )

  return (
    <Grid
      container
      gap={2}
      justifyContent="space-between"
      alignSelf="flex-end"
      sx={{
        alignItems: 'start',
        padding: { xs: '1.75rem 1rem', md: '1.75rem 6rem 2.5rem 6rem' },
        zIndex: 1,
      }}
    >
      <Grid container gap={{ xs: '2rem', md: '0.5rem' }}>
        <Grid item container xs={12} justifyContent={'space-between'}>
          <Logo />
          <Contact />
        </Grid>
        <FooterLinks />
        <Grid container>
          <CoingeckoLink />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Footer
