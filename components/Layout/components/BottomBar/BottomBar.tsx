import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { themePath } from '@/theme/utils'
import { footerLinkStyle } from '@/utils/footer'
import { Box, Divider, Unstable_Grid2 as Grid2, Typography, useTheme } from '@mui/material'
import { triggerCookieConsentBanner } from '@porscheofficial/cookie-consent-banner-react'

import { CoingeckoLink } from 'components/CoingeckoLink'

/**
 * Component that renders the bottom bar of the page.
 * Contains links.
 */
const BottomBar = () => {
  const theme = useTheme()
  const { t } = useTranslation()

  const cookiesHandleClick = useCallback(() => {
    triggerCookieConsentBanner({ showDetails: true })
  }, [])

  const footerLinks = useMemo(
    () => (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '0.5rem',
          height: 'fit-content',
        }}
      >
        <a href="https://zondax.ch/" target="_blank" rel="noreferrer" style={{ transform: 'translate(0,0px)', marginRight: '1.5rem' }}>
          <Image
            src={themePath('zondax_text.svg')}
            alt="zondax-logo"
            height={10}
            width={48}
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        </a>
        <Typography variant="caption" sx={footerLinkStyle(theme)}>
          <Link href={'/terms-of-service'} target={'_blank'}>
            {t('Terms & Conditions')}
          </Link>
        </Typography>
        <Divider orientation="vertical" variant="middle" sx={{ margin: '6px 0' }} flexItem />

        <Typography variant="caption" sx={footerLinkStyle(theme)}>
          <a href="https://zondax.ch/legal/privacy" target="_blank" rel="noreferrer">
            {t('Privacy Policy')}
          </a>
        </Typography>

        <Divider orientation="vertical" variant="middle" sx={{ margin: '6px 0' }} flexItem />
        <Typography variant="caption" sx={footerLinkStyle(theme)} onClick={cookiesHandleClick}>
          {t('Cookies Settings')}
        </Typography>

        <Divider orientation="vertical" variant="middle" sx={{ margin: '6px 0' }} flexItem />
        <Typography variant="caption" sx={footerLinkStyle(theme)}>
          <Link href={'/changelog'} target={'_blank'}>
            {t('Changelog')}
          </Link>
        </Typography>
      </Box>
    ),
    [theme, t, cookiesHandleClick]
  )

  return (
    <Grid2
      container
      bgcolor="background.level0"
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        zIndex: 200,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '1.75rem',
        width: '100%',
        padding: '0 1rem 2px 5rem',
        borderTop: '1px solid #00000026',
      }}
    >
      <Grid2 container>{footerLinks}</Grid2>
      <CoingeckoLink />
    </Grid2>
  )
}

export default BottomBar
