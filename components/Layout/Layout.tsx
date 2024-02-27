import Image from 'next/image'
import { useRouter } from 'next/router'
import { SnackbarProvider } from 'notistack'
import React, { useMemo } from 'react'
import { Parallax } from 'react-scroll-parallax'

import { themePath } from '@/theme/utils'
import { Box, Fade, GlobalStyles, NoSsr, lighten, useMediaQuery, useTheme } from '@mui/material'

import { ConsentBlock } from 'components/consent/ConsentBlock'

import UserResources from '../common/Resources/Resources'
import Footer from '../common/footer'
import MobileMenu from '../common/mobileMenu'
import { BottomBar, Notifications, Sidebar, TopBar } from './components'
import { NotificationSnackbar } from './components/Notifications'
import { PAGES } from './components/Sidebar'

/**
 * Protocol of the layout properties.
 */
interface LayoutProps {
  children?: React.ReactNode
  activeTab?: PAGES
  hasSearchBar?: boolean
  pageTitle?: string
}

/**
 * The `layout` component which provides a consistent layout across different back office pages.
 * Contains a loading state whereby a `Loader` component is shown upon rendering the component.
 * The `Loader` component will disappear once the `loading` state is assigned a false boolean value.
 *
 * @param activeTab - Currently active tab on sidebar
 * @param children - Child content to be rendered in layout
 * @param hasSearchBar - Includes search bar if true
 * @param pageTitle - Current page title
 *
 * @returns The `layout` component that encapsulates the entire layout for the back office.
 */
const Layout = ({ activeTab, children, hasSearchBar = true, pageTitle }: LayoutProps) => {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
  const router = useRouter()
  const isHomePage = router.pathname === '/'
  const upMd = useMediaQuery(theme.breakpoints.up('md'))

  const renderSidebar = useMemo(() => {
    if (isDesktop) {
      return <Sidebar activeTab={activeTab} />
    }
    return null
  }, [isDesktop, activeTab])

  const renderTopBar = useMemo(() => {
    if (isDesktop) {
      return <TopBar pageTitle={pageTitle} hasSearchBar={hasSearchBar} />
    }
    return null
  }, [isDesktop, pageTitle, hasSearchBar])

  const renderMobileMenu = useMemo(() => {
    if (!isDesktop) {
      return <MobileMenu activeTab={activeTab} />
    }
    return null
  }, [isDesktop, activeTab])

  const renderBottomBar = useMemo(() => {
    if (isDesktop) {
      return <BottomBar />
    }
    return null
  }, [isDesktop])

  const renderFooter = useMemo(() => {
    if (!isDesktop) {
      return <Footer />
    }
    return null
  }, [isDesktop])

  const LayoutContent = useMemo(
    () => (
      <Box
        sx={{
          width: '100%',
          height: '100%',
          paddingLeft: isDesktop ? '5rem' : '0.5rem',
          paddingRight: '0.5rem',
          paddingTop: isDesktop ? '4rem' : '6.125rem',
          paddingBottom: isDesktop ? '1.75rem' : '0',
          display: 'flex',
          flexDirection: isDesktop ? 'row' : 'column',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {children}
        {renderFooter}
      </Box>
    ),
    [children, renderFooter, isDesktop]
  )

  const imageHeight = theme.palette.mode === 'light' ? (upMd ? '30rem' : '55rem') : upMd ? '32rem' : '55rem'

  const BackgroundImage = useMemo(
    () => (
      <Box
        sx={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          zIndex: 0,
          overflowX: 'hidden',
        }}
      >
        <Box
          sx={{
            width: '110vw',
            height: imageHeight,
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(calc(-50% - 2rem))',
            zIndex: 0,
            display: isHomePage ? 'inline-block' : 'none',
          }}
        >
          <Parallax
            easing={'easeIn'}
            style={{
              width: '100%',
              height: '100%',
              background: theme.palette.background.level0,
            }}
            startScroll={upMd ? 0 : undefined}
            endScroll={upMd ? 49 : undefined}
            shouldAlwaysCompleteAnimation={upMd}
            opacity={[0.8, upMd ? 0 : 0.8]}
            scale={[upMd ? 1.1 : 1, 1]}
          >
            <Fade in style={{ transitionDelay: '1000ms' }}>
              <Image
                src={themePath('new-year.webp')}
                fill
                sizes={'100vh'}
                loading={'eager'}
                alt={'background image'}
                priority
                style={{
                  objectFit: 'cover',
                  objectPosition: 'bottom 0 left 18%',
                  maxWidth: '100%',
                  mixBlendMode: theme.palette.mode === 'light' ? 'multiply' : 'lighten',
                }}
              />
            </Fade>
          </Parallax>
        </Box>
      </Box>
    ),
    [imageHeight, isHomePage, theme.palette.background.level0, theme.palette.mode, upMd]
  )

  const globalStyles = useMemo(
    () => ({
      body: { background: `${theme.palette.background.default} !important`, colorScheme: theme.palette.mode },
      '*::-webkit-scrollbar': {
        width: '8px',
        height: '8px',
      },
      '*::-webkit-scrollbar-corner': {
        width: '8px',
        height: '8px',
      },
      '*::-webkit-scrollbar-thumb': {
        backgroundColor: lighten(`${theme.palette.tableParentRowBackgroundFocused}55`, 0.3),
        borderRadius: '8px',
      },
      '*::-webkit-scrollbar-track': {
        borderRadius: '8px',
        backgroundColor: lighten(`${theme.palette.tableParentRowBackground}55`, 0.2),
      },
      '.indent-icon svg': {
        fill: theme.palette.text.secondary,
        color: theme.palette.text.secondary,
      },
      '.slick-thumb': {
        bottom: '-2.2rem !important',
      },
      '.slick-thumb li.slick-active svg': {
        color: '#3651DC',
      },
    }),
    [theme]
  )

  return (
    <NoSsr>
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={25000}
        Components={{
          default: NotificationSnackbar,
          error: NotificationSnackbar,
          info: NotificationSnackbar,
          success: NotificationSnackbar,
          warning: NotificationSnackbar,
        }}
      >
        <ConsentBlock />
        <Box sx={{ height: isDesktop ? '100vh' : 'fit-content', position: 'relative', zIndex: 1 }}>
          {BackgroundImage}
          <UserResources />
          <GlobalStyles styles={globalStyles} />
          {renderSidebar}
          {renderTopBar}
          {renderMobileMenu}
          {renderBottomBar}
          {LayoutContent}
        </Box>
        <Notifications />
      </SnackbarProvider>
    </NoSsr>
  )
}

export default Layout
