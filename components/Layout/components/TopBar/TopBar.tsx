import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'

import { boxShadow } from '@/theme/hoverEffect'
import { themePath } from '@/theme/utils'
import { Box, ClickAwayListener, Unstable_Grid2 as Grid2, Grow, useMediaQuery, useTheme } from '@mui/material'

import { BoxNetworkSelector } from '.'
import { SearchBar, SearchButton } from '../../../common'
import FeedbackButton from './Buttons/FeedbackButton'
import NotificationButton from './Buttons/NotificationButton'
import SettingsButton from './Buttons/SettingsButton'
import ThemeButton from './Buttons/ThemeButton'
import WalletButton from './Buttons/WalletButton'
import MenuItems from './MenuItems'
import Height from './Stats/Height'
import Price from './Stats/Price'
import TipsetTimestamp from './Stats/TipsetTimestamp'

/**
 * @function BeryxLogo
 * @description The BeryxLogo component.
 * @returns The JSX code for the BeryxLogo component.
 */
const BeryxLogo = () => (
  <Box width={'4.5rem'} height={'fit-content'} display={'flex'} justifyContent={'center'} mr={'0.25rem'}>
    <Link href="/" style={{ height: 34.9 }}>
      <Image
        src={themePath('logos/beryx_full_mobile.svg')}
        alt="Beryx Logo"
        width={90}
        height={34.9}
        style={{
          maxWidth: '100%',
        }}
      />
    </Link>
  </Box>
)

/**
 * @interface TopBarProps
 * @description Interface for TopBar component props
 * @property hasSearchBar - Determines if the search bar is present
 * @property pageTitle - Title of the page
 */
interface TopBarProps {
  hasSearchBar?: boolean
  pageTitle?: string
}

/**
 * @function TopBar
 * @description TopBar component
 * @param props - Props for the TopBar component
 * @returns - Rendered TopBar component
 */
const TopBar = ({ hasSearchBar = true }: TopBarProps) => {
  const theme = useTheme()
  const isLgDesktop = useMediaQuery(useTheme().breakpoints.up('lg'))

  const [menuItems, setMenuItems] = useState<{ [key: string]: { isOpen: boolean } }>({
    notifications: { isOpen: false },
    settings: { isOpen: false },
    wallet: { isOpen: false },
  })

  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const [_isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    /**
     * @function handleScroll
     * @description Handle the scroll event
     * @returns {void}
     */
    const handleScroll = () => {
      const offset = window.scrollY
      if (offset > 90) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  /**
   * @function closeMenuPopups
   * @description Closes all menu popups
   * @returns {void}
   */
  const closeMenuPopups = useCallback(
    function () {
      const menuItemsNew = { ...menuItems }
      Object.keys(menuItemsNew).forEach(keyName => {
        menuItemsNew[keyName].isOpen = false
      })

      setMenuItems(() => menuItemsNew)
    },
    [menuItems]
  )

  /**
   * @function toggleSearch
   * @description Toggles the search bar open or closed
   * @returns
   */
  const toggleSearch = useCallback(() => {
    setIsSearchOpen(!isSearchOpen)
  }, [isSearchOpen])

  /**
   * @function handleClickAway
   * @description Closes all menu popups when clicking away
   * @returns
   */
  const handleClickAway = useCallback(() => {
    closeMenuPopups()
  }, [closeMenuPopups])

  useEffect(() => {
    if (isLgDesktop && isSearchOpen) {
      setIsSearchOpen(false)
    }
  }, [isLgDesktop, isSearchOpen])

  const Search =
    hasSearchBar && !isLgDesktop ? (
      <SearchButton isSearchOpen={isSearchOpen} toggleSearch={toggleSearch} />
    ) : hasSearchBar && isLgDesktop ? (
      <SearchBar properties={{ maxWidth: '25rem', minWidth: '20rem', maxHeight: theme.spacing(5) }} border />
    ) : null

  /**
   * @description Renders the left side of the second level menu.
   */
  const LeftSide = (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <BeryxLogo />
      <BoxNetworkSelector />
      <MenuItems />
    </Box>
  )

  /**
   * @description Renders the right side of the second level menu.
   */
  const RightSide = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '0.5rem',
      }}
    >
      {Search}
      {hasSearchBar && <WalletButton level="second" />}
    </Box>
  )

  /**
   * @description Renders the first level menu.
   */
  const FirstLevelMenu = (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '3rem',
        width: '100%',
        padding: '0 1rem 0 1.75rem',
        borderBottom: '1px solid',
        borderColor: theme.palette.border?.level1,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'baseline', gap: '0.875rem' }}>
        <Price />
        <Height />
        <TipsetTimestamp />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <FeedbackButton />
        <NotificationButton />
        <ThemeButton />
        <SettingsButton />
        {!hasSearchBar && <WalletButton level="first" />}
      </Box>
    </Box>
  )

  /**
   * @description Renders the second level menu.
   */
  const SecondLevelMenu = (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '3rem',
        width: '100%',
        padding: '0 1rem 0 1.5rem',
        borderBottom: '1px solid',
        borderColor: theme.palette.border?.level1,
      }}
    >
      {LeftSide}
      {RightSide}
    </Box>
  )

  /**
   * @description Renders the search bar.
   */
  const SearchComponent = (
    <Grow in={isSearchOpen}>
      <Grid2
        container
        sx={{
          position: 'absolute',
          top: '4rem',
          left: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          alignItems: 'center',
          height: 'fit-content',
          width: '100%',
        }}
      >
        <Box sx={{ boxShadow: boxShadow(theme.palette.mode) }}>
          <SearchBar border />
        </Box>
      </Grid2>
    </Grow>
  )

  return (
    <ClickAwayListener mouseEvent={'onMouseUp'} onClickAway={handleClickAway}>
      <Box
        sx={{
          position: 'fixed',
          right: 0,
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          width: 'calc(100%)',
          backgroundColor: theme.palette.background.level1,
        }}
      >
        {FirstLevelMenu}
        {SecondLevelMenu}
        {SearchComponent}
      </Box>
    </ClickAwayListener>
  )
}

/**
 * @exports TopBar
 */
export default TopBar
