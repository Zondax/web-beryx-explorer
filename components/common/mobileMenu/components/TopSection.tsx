import Image from 'next/image'
import Link from 'next/link'
import { useCallback } from 'react'

import { themePath } from '@/theme/utils'
import { Close, Menu } from '@carbon/icons-react'
import { Box, Unstable_Grid2 as Grid2, Grow, IconButton, Tooltip, useTheme } from '@mui/material'

import { BoxNetworkSelector } from '../../../Layout/components/TopBar'
import { SearchBar, SearchButton } from '../../index'

/**
 * Props for the component `TopLevelProps`
 *
 * @property isMenuOpen - flag denotes whether menu is open or not.
 * @property isSearchOpen - flag denotes whether search is open or not.
 * @property setIsSearchOpen - function to set search's state.
 */
interface TopLevelProps {
  isMenuOpen: boolean
  isSearchOpen: boolean
  toggleMenu: () => void
  setIsSearchOpen: (prop: boolean) => void
}

/**
 * Top navigation section including Beryx logo, search bar, and menu button.
 *
 * @public
 * @param props - properties passed down from parent component.
 */
const TopSection = ({ isMenuOpen, isSearchOpen, toggleMenu, setIsSearchOpen }: TopLevelProps) => {
  const theme = useTheme()
  const toggleSearch = useCallback(() => {
    setIsSearchOpen(!isSearchOpen)
  }, [isSearchOpen, setIsSearchOpen])

  const TopLevelGrid = (
    <Grid2
      container
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 'fit-content',
        width: '100%',
      }}
    >
      <Box sx={{ marginLeft: theme.spacing(0.5) }}>
        <Link href="/">
          <Image
            src={themePath('logos/beryx_full_mobile.svg')}
            alt="Beryx Logo"
            width={75}
            height={24}
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        </Link>
      </Box>
      <Grid2
        container
        sx={{
          display: 'flex',
          gap: '0.5rem',
          height: 'fit-content',
          alignItems: 'center',
        }}
      >
        {!isMenuOpen && <SearchButton isSearchOpen={isSearchOpen} toggleSearch={toggleSearch} />}
        <Tooltip title="Menu" placement="bottom" key={'mobile menu Settings'}>
          <IconButton color="primary" onClick={toggleMenu}>
            {isMenuOpen ? <Close size="24" /> : <Menu size="24" />}
          </IconButton>
        </Tooltip>
      </Grid2>
    </Grid2>
  )

  const SearchGrid = (
    <Grow in={isSearchOpen}>
      <Grid2
        container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          alignItems: 'center',
          height: isSearchOpen ? 'fit-content' : 0,
          width: '100%',
        }}
      >
        <BoxNetworkSelector />
        <SearchBar hasSearchButton={false} properties={{ maxWidth: '40rem' }} mobileMenu navbar />
      </Grid2>
    </Grow>
  )

  return (
    <>
      {TopLevelGrid}
      {SearchGrid}
    </>
  )
}

export default TopSection
