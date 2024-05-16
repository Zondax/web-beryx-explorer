/**
 * @module Sidebar
 */
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useWindowSize } from 'usehooks-ts'

import useAppSettingsStore from '@/store/ui/settings'
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
import { Box, ClickAwayListener, Grid, Unstable_Grid2 as Grid2, Grow, Typography, useTheme } from '@mui/material'

import IsolatedButton from './IsolatedButton'
import SidebarButton from './SidebarButton'
import { NavigationItemProps, PAGES, navigationItems } from './data'

/**
 * @interface SideBarProps
 * @description Props for Sidebar component
 */
interface SideBarProps {
  activeTab?: PAGES
}

/**
 * @function Sidebar
 * @description Sidebar component
 * @param props - Props for Sidebar component
 * @returns Rendered Sidebar component
 */
const Sidebar = ({ activeTab }: SideBarProps) => {
  const theme = useTheme()
  const { network } = useAppSettingsStore(state => ({ network: state.network }))
  const { t } = useTranslation()
  const [visibleItems, setVisibleItems] = useState<number>(navigationItems.length)
  const { height } = useWindowSize()
  const [currentNavigationItems, setCurrentNavigationItems] = useState<Array<NavigationItemProps>>(
    navigationItems.filter(item => (item.show || activeTab === item.name) && item.networkIds.includes(network.uniqueId))
  )
  const [activeMoreItems, setActiveMoreItems] = useState<boolean>(false)

  /**
   * Calculate the number of items which can be visible depends of the height of the screen.
   */
  useEffect(() => {
    const FOOTER_NAVBAR_BUTTON_SPACES_HEIGHT = 154.5
    const ITEM_HEIGHT = 60
    const calculatedTxNumber = Math.floor((height - FOOTER_NAVBAR_BUTTON_SPACES_HEIGHT) / ITEM_HEIGHT)
    setVisibleItems(Math.max(calculatedTxNumber, 1))
  }, [height])

  /**
   * Open or close the more items popup.
   */
  const handleMoreItems = useCallback(() => {
    setActiveMoreItems(prevState => !prevState)
  }, [])

  /**
   * Close the more items popup.
   */
  const closeMoreItems = useCallback(() => {
    if (activeMoreItems) {
      setActiveMoreItems(false)
    }
  }, [activeMoreItems])

  /**
   * Return the label depends of the the activeMoreItems variable.
   */
  const getLabel = useCallback(() => {
    return activeMoreItems ? 'Less' : 'More'
  }, [activeMoreItems])

  /**
   * Handle the current navigation item.
   */
  useEffect(() => {
    setCurrentNavigationItems(
      navigationItems.filter(item => (item.show || activeTab === item.name) && item.networkIds.includes(network.uniqueId))
    )
  }, [activeTab, network])

  return (
    <ClickAwayListener onClickAway={closeMoreItems}>
      <Grid2
        container
        sx={{
          zIndex: 210,
          position: 'fixed',
          top: '4rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          width: '5rem',
          padding: '0 0 0.5rem 0.5rem',
        }}
      >
        <Grid2
          container
          id={'sidebar-container'}
          bgcolor="background.level1"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '1rem',
            width: '4rem',
            padding: '0.5rem',
            borderRadius: '0.5rem',
          }}
        >
          {currentNavigationItems.slice(0, visibleItems).map(item => (
            <SidebarButton type={'iconButton'} item={item} activeTab={activeTab} tooltip key={`sidebar-item-${item.name}`} />
          ))}
        </Grid2>
        {currentNavigationItems.length <= visibleItems ? null : (
          <IsolatedButton
            handleClick={handleMoreItems}
            label={getLabel()}
            icon={
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '2rem',
                  height: '2rem',
                }}
              >
                <Typography variant="body2" height={16}>
                  {t(getLabel())}
                </Typography>
                {activeMoreItems ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
              </Box>
            }
          />
        )}
        <Grow in={activeMoreItems}>
          <Box
            position={'absolute'}
            bgcolor={'background.level1'}
            width={'max-content'}
            bottom={'0.5rem'}
            left={'5.5rem'}
            zIndex={1}
            borderRadius={'0.5rem'}
            border={`1px solid ${theme.palette.tableChildRowBackgroundFocused}`}
            display={'flex'}
            flexDirection={'column'}
            gap={'0.5rem'}
            sx={{
              padding: '0.5rem',
            }}
          >
            {currentNavigationItems.slice(visibleItems).map(item => (
              <Grid container width={'100%'} key={`sidebar-item-${item.name}`}>
                <SidebarButton type={'button'} item={item} activeTab={activeTab} />
              </Grid>
            ))}
          </Box>
        </Grow>
      </Grid2>
    </ClickAwayListener>
  )
}

export default Sidebar
