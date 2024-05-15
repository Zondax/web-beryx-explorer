import { useCallback, useState } from 'react'

import { Box, GlobalStyles, useTheme } from '@mui/material'

import Height from 'components/Layout/components/TopBar/Stats/Height'
import Price from 'components/Layout/components/TopBar/Stats/Price'
import TipsetTimestamp from 'components/Layout/components/TopBar/Stats/TipsetTimestamp'

import Footer from '../footer/Footer'
import { MenuItemsMobile, SettingsPanel, TopSection } from './components'
import MobileSearch from './components/MobileSearch'

/**
 * Defines the component
 */
const MobileMenu = () => {
  /** Creates necessary state variables */
  const theme = useTheme()

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const toggleMenu = useCallback(() => {
    if (isSearchOpen) {
      setIsSearchOpen(false)
    }
    setIsMenuOpen(prevState => !prevState)
  }, [isSearchOpen])

  const toggleSearch = useCallback(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false)
    }
    setIsSearchOpen(prevState => !prevState)
  }, [isMenuOpen])

  /** Returns the rendered component */
  const GlobalStylesComponent = <GlobalStyles styles={{ body: { overflow: isMenuOpen ? 'hidden' : '' } }} />

  return (
    <Box
      sx={{
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        height: isMenuOpen || isSearchOpen ? '100dvh' : 'fit-content',
        width: '100%',
        backgroundColor: theme.palette.background.level1,
        borderBottom: '1px solid',
        borderColor: theme.palette.border?.level0,
        overflowY: 'auto',
      }}
    >
      {GlobalStylesComponent}

      {/* Logo and buttons */}
      <TopSection isMenuOpen={isMenuOpen} isSearchOpen={isSearchOpen} toggleMenu={toggleMenu} setIsSearchOpen={toggleSearch} />

      {/* Search bar */}
      <Box
        sx={{
          display: isSearchOpen && !isMenuOpen ? 'flex' : 'none',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          gap: '1rem',
        }}
      >
        <MobileSearch />
      </Box>

      {/* Menu items and settings */}
      <Box
        sx={{
          display: isMenuOpen ? 'flex' : 'none',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          gap: '1rem',
          height: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            gap: '1rem',
          }}
        >
          <MenuItemsMobile handleCloseTopMenu={toggleMenu} />
          <SettingsPanel setIsMenuOpen={setIsMenuOpen} />
        </Box>

        <Footer />
      </Box>

      {/* Live Stats */}
      <Box
        sx={{
          display: isMenuOpen || isSearchOpen ? 'none' : 'flex',
          alignItems: 'baseline',
          gap: '0.75rem',
          padding: '0.5rem',
          borderTop: '1px solid',
          borderColor: theme.palette.border?.level0,
          overflowX: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        <Price />
        <Height />
        <TipsetTimestamp />
      </Box>
    </Box>
  )
}

export default MobileMenu
