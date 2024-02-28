import type { AppProps } from 'next/app'
import Head from 'next/head'
import { appWithI18Next, useSyncLanguage } from 'ni18n'
import 'react-reflex/styles.css'
import { ParallaxProvider } from 'react-scroll-parallax'

import { MuiDataGridProLicense } from '@/config/config'
import { Networks } from '@/config/networks'
import { useSubscribeNats } from '@/nats/useSubscribeNats'
import { useAppSettingsStore } from '@/store/ui/settings'
import { getThemeOptions } from '@/theme/theme'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { LicenseInfo } from '@mui/x-license-pro'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { ni18nConfig } from '../ni18n.config'
import '../styles/index.scss'

if (MuiDataGridProLicense) {
  // Set the license key for MuiDataGridPro
  LicenseInfo.setLicenseKey(MuiDataGridProLicense ?? '')
}

/**
 * The main application component.
 * It sets up the theme, language, and other global settings.
 * It also wraps the main application component with necessary providers.
 */
function AppInternal({ Component, pageProps }: AppProps) {
  const { theme: themeSelected } = useAppSettingsStore()
  const theme = createTheme(getThemeOptions(themeSelected))
  const queryClient = new QueryClient()

  const localLanguage = useAppSettingsStore(s => s.language)
  useSyncLanguage(localLanguage ?? 'en')

  // Separate content to reduce JSX depth
  const content = (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )

  // Render the main application component wrapped with necessary providers
  return (
    <ThemeProvider theme={theme}>
      <ParallaxProvider>
        <CssBaseline />
        <Head>
          <title>Beryx</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        {content}
      </ParallaxProvider>
    </ThemeProvider>
  )
}

/**
 * The main application component.
 * It simply renders the AppInternal component.
 */
function App(appProps: AppProps) {
  const { network } = useAppSettingsStore()

  // Base subscribes to NATS
  useSubscribeNats(network.project === 'filecoin' ? Networks.mainnet : network, 'base')

  return <AppInternal {...appProps} />
}

// Export the main application component wrapped with i18n
export default appWithI18Next(App, ni18nConfig)