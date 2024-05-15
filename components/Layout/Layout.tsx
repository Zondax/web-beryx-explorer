import { SnackbarProvider } from 'notistack'
import React, { useMemo } from 'react'

import { Box, GlobalStyles, NoSsr, darken, useMediaQuery, useTheme } from '@mui/material'

import { ConsentBlock } from 'components/consent/ConsentBlock'

import UserResources from '../common/Resources/Resources'
import Footer from '../common/footer'
import MobileMenu from '../common/mobileMenu'
import { BottomBar, Notifications, TopBar } from './components'
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
const Layout = ({ children, hasSearchBar = true, pageTitle }: LayoutProps) => {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

  const renderTopBar = useMemo(() => {
    if (isDesktop) {
      return <TopBar pageTitle={pageTitle} hasSearchBar={hasSearchBar} />
    }
    return null
  }, [hasSearchBar, isDesktop, pageTitle])

  const renderMobileMenu = useMemo(() => {
    if (!isDesktop) {
      return <MobileMenu />
    }
    return null
  }, [isDesktop])

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
          height: 'fit-content',
          paddingTop: isDesktop ? '6rem' : '7rem',
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

  const globalStyles = useMemo(
    () => ({
      body: { background: `${theme.palette.background.level1} !important`, colorScheme: theme.palette.mode },
      '*::-webkit-scrollbar': {
        width: '8px',
        height: '8px',
      },
      '*::-webkit-scrollbar-corner': {
        width: '8px',
        height: '8px',
      },
      '*::-webkit-scrollbar-thumb': {
        backgroundColor: darken(`${theme.palette.border?.level2}55`, 0.3),
        borderRadius: '8px',
      },
      '*::-webkit-scrollbar-track': {
        borderRadius: '8px',
        backgroundColor: theme.palette.background.level2,
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
          <UserResources />
          <GlobalStyles styles={globalStyles} />
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
