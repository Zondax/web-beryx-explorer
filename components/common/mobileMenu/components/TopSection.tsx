import Image from 'next/image'
import Link from 'next/link'
import { useCallback } from 'react'

import { themePath } from '@/theme/utils'
import { Close, Menu } from '@carbon/icons-react'
import { Box, IconButton, useTheme } from '@mui/material'

import NetworkSelector from 'components/Layout/components/TopBar/NetworkSelectorBox/NetworkSelector'

import { SearchButton } from '../../index'

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

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 'fit-content',
        width: '100%',
      }}
    >
      <Box sx={{ marginLeft: theme.spacing(1), paddingTop: '1px' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
          <Image
            src={themePath('logos/beryx_full.svg')}
            alt="Beryx Logo"
            width={49}
            height={22}
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        </Link>
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: '0.35rem',
          height: 'fit-content',
          alignItems: 'center',
          padding: '0.5rem',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <NetworkSelector buttonSize="large" />
        </Box>
        <SearchButton isSearchOpen={isSearchOpen} toggleSearch={toggleSearch} />
        <IconButton color="info" size="large" onClick={toggleMenu}>
          {isMenuOpen ? <Close /> : <Menu />}
        </IconButton>
      </Box>
    </Box>
  )
}

export default TopSection
