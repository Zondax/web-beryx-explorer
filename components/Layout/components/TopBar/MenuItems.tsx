import React, { ReactNode, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import {
  Book,
  CategoryNewEach,
  CertificateCheck,
  ChevronDown,
  ChevronUp,
  Cube,
  Currency,
  Document,
  ExecutableProgram,
  GasStation,
  QueryQueue,
  RainDrop,
  TaskStar,
} from '@carbon/icons-react'
import { Box, Button, ClickAwayListener, MenuItem } from '@mui/material'
import { useTheme } from '@mui/system'

import { FIL2ETHIcon } from 'components/common/Icons'

/**
 * Creates the menu items components.
 */
const MenuItems: React.FC = () => {
  const theme = useTheme()
  const { t } = useTranslation()
  const [currentOpenedMenu, setCurrentOpenedMenu] = React.useState<string[] | null>(null)

  /**
   * Handles opening a menu item by updating the current hovered menu number.
   * @param menuNumber The number of the menu item being hovered over.
   */
  const handleOpenMenu = useCallback(
    (menuId: string) => {
      if (currentOpenedMenu?.includes(menuId)) {
        return
      }
      setCurrentOpenedMenu(prev => {
        if (prev === null) {
          return [menuId]
        }
        const isSubMenu = menuId.includes('.')
        if (isSubMenu) {
          return prev.includes(menuId) ? prev : [...prev, menuId]
        }
        // Clear other primary menus if this is a primary menu
        const filteredPrev = prev.filter(id => id.includes('.'))
        return filteredPrev.includes(menuId) ? filteredPrev : [menuId, ...filteredPrev]
      })
    },
    [currentOpenedMenu]
  )

  /**
   * Handles closing a menu item by updating the current hovered menu number.
   */
  const handleCloseMenu = useCallback(
    (menuId: string) => {
      setCurrentOpenedMenu(prev => {
        if (prev === null) {
          return null
        }
        return prev.includes(menuId) ? prev.filter(item => item !== menuId && !item.startsWith(menuId + '.')) : prev
      })
    },
    [setCurrentOpenedMenu]
  )

  /**
   * Handles toggling a menu item by updating the current hovered menu number.
   */
  const handleToggleMenu = useCallback(
    (menuId: string) => {
      setCurrentOpenedMenu(prev => {
        if (prev === null) {
          return null
        }
        return prev.includes(menuId) ? prev.filter(item => item !== menuId) : [...prev, menuId]
      })
    },
    [setCurrentOpenedMenu]
  )

  /**
   * Handles closing all menu items by clearing the current hovered menu state.
   */
  const handleCloseAllMenus = useCallback(() => {
    setCurrentOpenedMenu(null)
  }, [setCurrentOpenedMenu])

  /**
   * Handles mouse hover over a menu item by updating the current hovered menu state.
   */
  const handleMouseOver = useCallback(
    (menuId: string) => {
      if (currentOpenedMenu?.includes(menuId)) {
        return
      }
      setCurrentOpenedMenu(prev => {
        if (prev === null) {
          return [menuId]
        }
        return prev.includes(menuId) ? prev.filter(item => item !== menuId) : [...prev, menuId]
      })
    },
    [currentOpenedMenu]
  )

  /**
   * Component representing a menu option with hover functionality.
   * @param itemNumber The number of the menu item.
   * @param name The name of the menu option.
   * @param children The content of the menu option.
   */
  const MenuOption = ({
    menuId,
    name,
    icon,
    children,
    nested = false,
  }: {
    menuId: string
    name: string
    icon?: ReactNode
    children: ReactNode
    nested?: boolean
  }) => (
    <Box
      sx={{
        position: 'relative',
      }}
      onMouseLeave={event => {
        if (!nested) {
          handleCloseMenu(menuId)
        } else {
          event.preventDefault()
        }
      }}
    >
      <Button
        id={`menu-item-${menuId}`}
        variant={'link'}
        endIcon={currentOpenedMenu && currentOpenedMenu.includes(menuId) ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        onClick={e => {
          if (nested) {
            e.stopPropagation()
            handleToggleMenu(menuId)
          }
        }}
        onMouseOver={event => {
          if (!nested) {
            handleOpenMenu(menuId)
          } else {
            event.preventDefault()
          }
        }}
        sx={{
          zIndex: 1304,
          borderRadius: nested ? '6px' : null,
          width: nested ? '100%' : null,
          justifyContent: 'space-between',
          paddingX: nested ? '1rem' : '0.5rem',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: nested ? '15px' : 'auto', whiteSpace: 'nowrap' }}>
          {icon} {t(name)}
        </Box>
      </Button>
      <Box
        sx={{
          position: !nested ? 'absolute' : 'relative',
          top: '100%',
          left: '-0.5rem',
          display: currentOpenedMenu && currentOpenedMenu.includes(menuId) ? 'inline-block' : 'none',
          padding: nested ? '0.5rem 0' : '0.5rem',
        }}
        onMouseOver={() => (!nested ? handleMouseOver(menuId) : null)}
        onMouseLeave={() => (!nested ? handleCloseMenu(menuId) : null)}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            backgroundColor: theme.palette.background.level0,
            border: nested ? 'none' : '1px solid',
            borderColor: theme.palette.border?.level0,
            borderRadius: '10px',
            padding: nested ? '0 0 0 2rem' : '0.5rem',
            '& *': {
              borderRadius: '6px',
            },
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  )

  return (
    <ClickAwayListener onClickAway={() => handleCloseAllMenus()}>
      <Box
        className="desktop-topbar"
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.125rem',
          justifyContent: 'space-between',
        }}
      >
        <MenuOption menuId={'1'} name={'Recent Activity'}>
          <MenuItem onClick={() => handleCloseMenu('1')} component="a" href="/recent_activity?tab=tipsets">
            <Cube size={16} color={theme.palette.text.secondary} style={{ marginRight: '0.5rem' }} /> {t('Tipsets')}
          </MenuItem>
          <MenuItem onClick={() => handleCloseMenu('1')} component="a" href="/recent_activity?tab=transactions">
            <QueryQueue size={16} color={theme.palette.text.secondary} style={{ marginRight: '0.5rem' }} /> {t('Transactions')}
          </MenuItem>
          <MenuItem onClick={() => handleCloseMenu('1')} component="a" href="/recent_activity?tab=contracts">
            <Document size={16} color={theme.palette.text.secondary} style={{ marginRight: '0.5rem' }} /> {t('Contract Invokes')}
          </MenuItem>
          <MenuItem onClick={() => handleCloseMenu('1')} component="a" href="/tokens">
            <Currency size={16} color={theme.palette.text.secondary} style={{ marginRight: '0.5rem' }} /> {t('Tokens')}
          </MenuItem>
          <MenuItem onClick={() => handleCloseMenu('1')} component="a" href="/mempool">
            <CategoryNewEach size={16} color={theme.palette.text.secondary} style={{ marginRight: '0.5rem' }} /> {t('Mempool')}
          </MenuItem>
        </MenuOption>

        <MenuOption menuId={'2'} name={'Insights'}>
          <MenuOption
            menuId={'2.1'}
            name={'Accounts Leaderboard'}
            icon={<TaskStar size={16} color={theme.palette.text.secondary} style={{ marginRight: '0.5rem' }} />}
            nested
          >
            <MenuItem onClick={() => handleCloseMenu('2')} component="a" href="/leaderboard?tab=rich-list">
              {t('Top Accounts by Balance')}
            </MenuItem>
            <MenuItem onClick={() => handleCloseMenu('2')} component="a" href="/leaderboard?tab=top-accounts">
              {t('Top Accounts by Gas Used')}
            </MenuItem>
            <MenuItem onClick={() => handleCloseMenu('2')} component="a" href="/leaderboard?tab=top-accounts-by-value-exchanged">
              {t('Top Accounts by Value Exchanged')}
            </MenuItem>
          </MenuOption>

          <MenuOption
            menuId={'2.2'}
            name={'Contracts Leaderboard'}
            icon={<TaskStar size={16} color={theme.palette.text.secondary} style={{ marginRight: '0.5rem' }} />}
            nested
          >
            <MenuItem onClick={() => handleCloseMenu('2')} component="a" href="/contracts_leaderboard?tab=richest-contracts">
              {t('Top Contracts by Balance')}
            </MenuItem>
            <MenuItem onClick={() => handleCloseMenu('2')} component="a" href="/contracts_leaderboard?tab=top-contracts">
              {t('Top Contracts by Unique Users')}
            </MenuItem>
            <MenuItem onClick={() => handleCloseMenu('2')} component="a" href="/contracts_leaderboard?tab=top-contracts-by-invokes">
              {t('Top Contracts by Invokes')}
            </MenuItem>
            <MenuItem onClick={() => handleCloseMenu('2')} component="a" href="/contracts_leaderboard?tab=top-contracts-by-value-exchanged">
              {t('Top Contracts by Value Exchanged')}
            </MenuItem>
          </MenuOption>

          <MenuItem onClick={() => handleCloseMenu('2')} component="a" href="/dashboard#gas-used-stats">
            <GasStation size={16} color={theme.palette.text.secondary} style={{ marginRight: '0.5rem' }} /> {t('Gas Stats')}
          </MenuItem>
          <MenuItem onClick={() => handleCloseMenu('2')} component="a" href="/dashboard#contract-stats">
            <Document size={16} color={theme.palette.text.secondary} style={{ marginRight: '0.5rem' }} /> {t('Contract Stats')}
          </MenuItem>
          <MenuItem onClick={() => handleCloseMenu('2')} component="a" href="/mempool?tab=stats">
            <CategoryNewEach size={16} color={theme.palette.text.secondary} style={{ marginRight: '0.5rem' }} /> {t('Mempool Stats')}
          </MenuItem>
        </MenuOption>
        <MenuOption menuId={'3'} name={'Dev Tools'}>
          <MenuItem
            onClick={() => handleCloseMenu('3')}
            sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            component="a"
            href="/address_converter"
          >
            <FIL2ETHIcon size={16} color={theme.palette.text.secondary} /> {t('Address Converter')}
          </MenuItem>
          <MenuItem onClick={() => handleCloseMenu('3')} component="a" href="/rpc">
            <Cube size={16} color={theme.palette.text.secondary} style={{ marginRight: '0.5rem' }} /> {t('RPC')}
          </MenuItem>
          <MenuItem onClick={() => handleCloseMenu('3')} component="a" href="/faucet">
            <RainDrop size={16} color={theme.palette.text.secondary} style={{ marginRight: '0.5rem' }} /> {t('Faucet')}
          </MenuItem>
          <MenuItem onClick={() => handleCloseMenu('3')} component="a" href="/estimate_gas">
            <GasStation size={16} color={theme.palette.text.secondary} style={{ marginRight: '0.5rem' }} /> {t('Gas Estimator')}
          </MenuItem>
          <MenuItem onClick={() => handleCloseMenu('3')} component="a" href="/interact">
            <ExecutableProgram size={16} color={theme.palette.text.secondary} style={{ marginRight: '0.5rem' }} />{' '}
            {t('Contract Interaction')}
          </MenuItem>
          <MenuItem onClick={() => handleCloseMenu('3')} component="a" href="/contract_verifier">
            <CertificateCheck size={16} color={theme.palette.text.secondary} style={{ marginRight: '0.5rem' }} />{' '}
            {t('Contract Verification')}
          </MenuItem>
          <MenuItem onClick={() => handleCloseMenu('3')} component="a" href="/resources">
            <Book size={16} color={theme.palette.text.secondary} style={{ marginRight: '0.5rem' }} /> {t('Resources')}
          </MenuItem>
        </MenuOption>
      </Box>
    </ClickAwayListener>
  )
}

export default MenuItems
