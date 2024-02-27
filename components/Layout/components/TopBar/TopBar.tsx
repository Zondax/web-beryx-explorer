import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { ObjectType } from '@/routes/parsing'
import { useLatestStore } from '@/store/data/latest'
import { useAppSettingsStore } from '@/store/ui/settings'
import { themePath } from '@/theme/utils'
import { timeSince } from '@/utils/dates'
import { Box, ClickAwayListener, Unstable_Grid2 as Grid2, Grow, Theme, Typography, useMediaQuery, useTheme } from '@mui/material'

import { BoxNetworkSelector } from '.'
import { BeryxLink, SearchBar, SearchButton } from '../../../common'
import Buttons from './Buttons'

/**
 * @function BeryxLogo
 * @description The BeryxLogo component.
 * @returns The JSX code for the BeryxLogo component.
 */
const BeryxLogo = ({ theme }: { theme: Theme }) => (
  <Box width={'4.5rem'} height={'fit-content'} display={'flex'} justifyContent={'center'} pr={theme.spacing(1)}>
    <Link href="/" style={{ height: 39.9 }}>
      <Image
        src={themePath('logos/beryx_full.svg')}
        alt="Beryx Logo"
        width={46.7}
        height={39.9}
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
const TopBar = ({ pageTitle, hasSearchBar = true }: TopBarProps) => {
  const theme = useTheme()
  const { t } = useTranslation()
  const isLgDesktop = useMediaQuery(useTheme().breakpoints.up('lg'))

  const [menuItems, setMenuItems] = useState<{ [key: string]: { isOpen: boolean } }>({
    notifications: { isOpen: false },
    settings: { isOpen: false },
    wallet: { isOpen: false },
  })

  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { network } = useAppSettingsStore(state => ({ network: state.network }))

  const { latestTipsets, latestCurrencyRates } = useLatestStore()

  const selectedCurrency = useAppSettingsStore(s => s.fiatCurrency)

  const [isScrolled, setIsScrolled] = useState(false)
  const router = useRouter()
  const isHomePage = router.pathname === '/'

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

  const PriceWidget = useMemo(() => {
    if (!latestCurrencyRates) {
      return null
    }

    const currentPrice = latestCurrencyRates.find(({ currency }) => currency === selectedCurrency)

    return currentPrice ? (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'baseline',
          width: 'max-content',
          gap: '0.5rem',
          marginRight: '0.5rem',
        }}
      >
        <Typography variant="body1" lineHeight={1} fontSize={'0.75rem'} width={'max-content'}>
          {t('FIL price')}
        </Typography>
        <Typography
          variant="body1"
          color={'text.primary'}
          lineHeight={1}
          width={'max-content'}
          fontFamily="Sora"
          fontWeight={500}
          fontSize={'0.75rem'}
          id={'currency-value'}
          sx={{ textTransform: 'uppercase' }}
        >
          {currentPrice.price} {selectedCurrency}/FIL
        </Typography>
      </Box>
    ) : null
  }, [latestCurrencyRates, selectedCurrency, t])

  const TipsetHeight = useMemo(() => {
    if (!latestTipsets || latestTipsets.length === 0) {
      return null
    }

    return (
      <Box
        id={'tipset-height-value'}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'baseline',
          width: 'max-content',
          gap: '0rem',
          marginBottom: '-0.26rem',
          marginRight: '0.5rem',
        }}
      >
        <Typography variant="body1" lineHeight={1} fontSize={'0.75rem'} width={'max-content'}>
          {t('Tipset Height')}
        </Typography>
        <BeryxLink inputType={ObjectType.TIPSET} value={latestTipsets[0].height.toString()} network={network} />
      </Box>
    )
  }, [latestTipsets, network, t])

  const LatestTipset =
    latestTipsets && latestTipsets.length > 0 ? (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'baseline',
          width: 'max-content',
          gap: '0.5rem',
          marginRight: '0.5rem',
        }}
      >
        <Typography variant="body1" lineHeight={1} fontSize={'0.75rem'} width={'max-content'}>
          {t('Latest Tipset')}
        </Typography>
        <Typography
          variant="body1"
          color={'text.primary'}
          lineHeight={1}
          width={'max-content'}
          fontFamily="Sora"
          fontWeight={500}
          fontSize={'0.75rem'}
        >
          {`${timeSince(latestTipsets[0].tipset_timestamp)} ago`}
        </Typography>
      </Box>
    ) : null

  const Search =
    hasSearchBar && !isLgDesktop ? (
      <SearchButton
        isSearchOpen={isSearchOpen}
        toggleSearch={toggleSearch}
        properties={{
          borderRadius: !isHomePage || isScrolled ? '0.5rem' : '4px',
          maxHeight: !isHomePage || isScrolled ? theme.spacing(5) : theme.spacing(4),
        }}
      />
    ) : hasSearchBar && isLgDesktop ? (
      <SearchBar
        hasSearchButton={false}
        placeholder={`${t('Search in')} ${network.project} ${network.name}`}
        properties={{ maxWidth: '18rem', minWidth: '10rem', maxHeight: theme.spacing(5) }}
      />
    ) : null

  const TopLevel = (
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
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <BeryxLogo theme={theme} />
        <BoxNetworkSelector pageTitle={pageTitle} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '0.5rem',
          height: '100%',
          backgroundColor: !isHomePage || isScrolled ? 'none' : 'background.level1',
          transition: 'background-color 0.5s, filter 0.5s',
          borderRadius: '0.5rem',
          padding: '0.2rem 0.2rem 0.2rem 1.5rem',
        }}
      >
        {PriceWidget}
        {TipsetHeight}
        {LatestTipset}
        {Search}
        <Buttons
          menuItems={menuItems}
          setMenuItems={setMenuItems}
          properties={{
            borderRadius: !isHomePage || isScrolled ? '0.5rem' : '4px',
            maxHeight: !isHomePage || isScrolled ? theme.spacing(5) : theme.spacing(4),
          }}
        />
      </Box>
    </Grid2>
  )

  const SearchComponent = (
    <Grow in={isSearchOpen}>
      <Grid2
        container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          alignItems: 'center',
          height: 'fit-content',
          width: '100%',
        }}
      >
        <SearchBar hasSearchButton={false} properties={{ maxWidth: '2.85rem' }} />
      </Grid2>
    </Grow>
  )

  return (
    <ClickAwayListener mouseEvent={'onMouseUp'} onClickAway={handleClickAway}>
      <Grid2
        container
        sx={{
          position: 'fixed',
          right: 0,
          zIndex: 300,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          height: !isSearchOpen ? theme.spacing(7) : `calc(${theme.spacing(7)} + 4.5rem)`,
          gap: '1rem',
          width: 'calc(100%)',
          padding: '0 0.5rem',
          backgroundColor: isScrolled ? `${theme.palette.background.level0}DD` : 'none',
          backdropFilter: isScrolled ? 'saturate(2) blur(20px)' : 'none',
          transition: 'background-color 0.5s, filter 0.5s',
        }}
      >
        {TopLevel}
        {SearchComponent}
      </Grid2>
    </ClickAwayListener>
  )
}

/**
 * @exports TopBar
 */
export default TopBar
