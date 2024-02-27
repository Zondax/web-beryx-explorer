import { SyntheticEvent, useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { TabContext, TabList } from '@mui/lab'
import TabPanel from '@mui/lab/TabPanel'
import { GlobalStyles, Unstable_Grid2 as Grid2, Grow, Tab, useTheme } from '@mui/material'

import { PAGES } from '../../Layout/components/Sidebar'
import { LatestInfo, MenuPanel, SettingsPanel, TopSection } from './components'

interface MobileMenuProps {
  hasSearchBar?: boolean
  activeTab?: PAGES
}

/**
 * Defines the component
 */
const MobileMenu = ({ activeTab }: MobileMenuProps) => {
  /** Creates necessary state variables */
  const theme = useTheme()
  const { t } = useTranslation()
  const topHeaderRef = useRef<HTMLDivElement>(null)
  const tabRef = useRef<HTMLDivElement>(null)

  const [topSectionHeight, setTopSectionHeight] = useState(0)
  const [tabsHeight, setTabsHeight] = useState<number | undefined>(() => {
    return tabRef.current?.getBoundingClientRect().height
  })
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [activeMenuTab, setActiveMenuTab] = useState<string>('menu')

  const toggleMenu = useCallback(() => {
    setIsSearchOpen(prevState => !isMenuOpen ?? !prevState)
    setIsMenuOpen(prevState => !prevState)
  }, [isMenuOpen])

  const handleTabChange = useCallback((event: SyntheticEvent<Element, Event>, value: unknown) => {
    setActiveMenuTab(value as string)
  }, [])

  const getContainerHeight = useCallback(() => {
    if (isMenuOpen) {
      return '100vh'
    }
    return isSearchOpen ? '14rem' : '6rem'
  }, [isMenuOpen, isSearchOpen])

  useEffect(() => {
    if (!topHeaderRef?.current || !tabRef?.current) {
      return
    }
    setTopSectionHeight(topHeaderRef.current?.getBoundingClientRect().height)
    setTabsHeight(tabRef.current?.getBoundingClientRect().height)
  }, [isMenuOpen, tabRef.current?.clientHeight])

  /** Returns the rendered component */
  const GlobalStylesComponent = <GlobalStyles styles={{ body: { overflow: isMenuOpen ? 'hidden' : '' } }} />
  const LatestInfoComponent = <LatestInfo />
  const TopSectionComponent = (
    <Grid2
      container
      ref={topHeaderRef}
      sx={{
        gap: '1rem',
      }}
    >
      <TopSection isMenuOpen={isMenuOpen} isSearchOpen={isSearchOpen} toggleMenu={toggleMenu} setIsSearchOpen={setIsSearchOpen} />
    </Grid2>
  )
  const TabContextComponent = (
    <TabContext value={activeMenuTab}>
      <Grow in>
        <Grid2
          container
          sx={{
            display: isMenuOpen ? 'auto' : 'none',
            flexDirection: 'column',
            alignItems: 'center',
            height: `calc(100vh - ${topSectionHeight}px - 37px - 1rem)`,
            width: '100%',
          }}
        >
          <TabList onChange={handleTabChange} aria-label="mobile menu tabs" ref={tabRef}>
            <Tab label={t('Menu')} id={'topbar-menu-button'} value={'menu'} />
            <Tab label={t('Settings')} id={'topbar-settings-button'} value={'settings'} />
          </TabList>
          <TabPanel value={'menu'} sx={{ padding: '0', height: `calc(100% - ${tabsHeight}px)` }}>
            <MenuPanel activeTab={activeTab} tabsHeight={tabsHeight} toggleMenu={toggleMenu} />
          </TabPanel>

          <TabPanel value={'settings'} sx={{ padding: '0', width: '100%', height: `calc(100% - ${tabsHeight}px)` }}>
            <SettingsPanel activeTab={activeTab} />
          </TabPanel>
        </Grid2>
      </Grow>
    </TabContext>
  )

  return (
    <Grid2
      container
      sx={{
        position: 'fixed',
        right: 0,
        zIndex: 200,
        display: 'flex',
        flexDirection: 'column',
        height: getContainerHeight(),
        gap: '1rem',
        width: 'calc(100%)',
        padding: theme.spacing(1),
        background: `linear-gradient(180deg, ${theme.palette.background.level0}FF 0%, ${theme.palette.background.level0}99 100%)`,
        backdropFilter: 'saturate(2) blur(20px)',
        transition: '200ms ease-in-out',
      }}
    >
      {GlobalStylesComponent}
      {LatestInfoComponent}
      {TopSectionComponent}
      {TabContextComponent}
    </Grid2>
  )
}

export default MobileMenu
