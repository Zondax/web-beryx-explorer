import React, { ReactNode, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import {
  Book,
  CategoryNewEach,
  CertificateCheck,
  ChevronDown,
  ChevronUp,
  Cube,
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
  const [currentHoveredMenu, setCurrentHoveredMenu] = React.useState<number | null>(null)

  /**
   * Handles hovering over a menu item by updating the current hovered menu number.
   * @param menuNumber The number of the menu item being hovered over.
   */
  const handleHoverMenu = useCallback(
    (menuNumber: number) => {
      setCurrentHoveredMenu(menuNumber)
    },
    [setCurrentHoveredMenu]
  )

  /**
   * Handles mouse leave event on the menu by resetting the current hovered menu to null.
   */
  const handleMouseLeaveMenu = useCallback(() => {
    setCurrentHoveredMenu(null)
  }, [setCurrentHoveredMenu])

  /**
   * Component representing a menu option with hover functionality.
   * @param itemNumber The number of the menu item.
   * @param name The name of the menu option.
   * @param children The content of the menu option.
   */
  const MenuOption = ({ itemNumber, name, children }: { itemNumber: number; name: string; children: ReactNode }) => (
    <Box
      sx={{
        position: 'relative',
      }}
    >
      <Button
        id={`menu-item-${itemNumber}`}
        variant={'link'}
        endIcon={currentHoveredMenu === itemNumber ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        onMouseOver={() => handleHoverMenu(itemNumber)}
        onMouseOut={handleMouseLeaveMenu}
        sx={{
          zIndex: 1304,
        }}
      >
        {t(name)}
      </Button>
      <Box
        sx={{
          position: 'absolute',
          top: '100%',
          left: '-0.5rem',
          display: currentHoveredMenu === itemNumber ? 'inline-block' : 'none',
          padding: '0.5rem',
        }}
        onMouseOver={() => handleHoverMenu(itemNumber)}
        onMouseOut={handleMouseLeaveMenu}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            backgroundColor: theme.palette.background.level0,
            border: '1px solid',
            borderColor: theme.palette.border?.level0,
            borderRadius: '8px',
            padding: '0.5rem',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  )

  return (
    <ClickAwayListener onClickAway={handleMouseLeaveMenu}>
      <Box
        className="desktop-topbar"
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.125rem',
          justifyContent: 'space-between',
        }}
      >
        <MenuOption itemNumber={1} name={'Recent Activity'}>
          <MenuItem onClick={handleMouseLeaveMenu} component="a" href="/recent_activity?tab=tipsets">
            <Cube size={16} color={theme.palette.text.secondary} style={{ marginRight: '0.5rem' }} /> {t('Tipsets')}
          </MenuItem>
          <MenuItem onClick={handleMouseLeaveMenu} component="a" href="/recent_activity?tab=transactions">
            <QueryQueue size={16} color={theme.palette.text.secondary} style={{ marginRight: '0.5rem' }} /> {t('Transactions')}
          </MenuItem>
          <MenuItem onClick={handleMouseLeaveMenu} component="a" href="/recent_activity?tab=contracts">
            <Document size={16} color={theme.palette.text.secondary} style={{ marginRight: '0.5rem' }} /> {t('Contracts')}
          </MenuItem>
          <MenuItem onClick={handleMouseLeaveMenu} component="a" href="/mempool">
            <CategoryNewEach size={16} color={theme.palette.text.secondary} style={{ marginRight: '0.5rem' }} /> {t('Mempool')}
          </MenuItem>
        </MenuOption>

        <MenuOption itemNumber={2} name={'Insights'}>
          <MenuItem onClick={handleMouseLeaveMenu} component="a" href="/leaderboard?tab=rich-list">
            <TaskStar size={16} color={theme.palette.text.secondary} style={{ marginRight: '0.5rem' }} /> {t('Rich List')}
          </MenuItem>
          <MenuItem onClick={handleMouseLeaveMenu} component="a" href="/dashboard#gas-used-stats">
            <GasStation size={16} color={theme.palette.text.secondary} style={{ marginRight: '0.5rem' }} /> {t('Gas Stats')}
          </MenuItem>
          <MenuItem onClick={handleMouseLeaveMenu} component="a" href="/dashboard#contract-stats">
            <Document size={16} color={theme.palette.text.secondary} style={{ marginRight: '0.5rem' }} /> {t('Contract Stats')}
          </MenuItem>
          <MenuItem onClick={handleMouseLeaveMenu} component="a" href="/mempool?tab=stats">
            <CategoryNewEach size={16} color={theme.palette.text.secondary} style={{ marginRight: '0.5rem' }} /> {t('Mempool Stats')}
          </MenuItem>
        </MenuOption>
        <MenuOption itemNumber={3} name={'Dev Tools'}>
          <MenuItem
            onClick={handleMouseLeaveMenu}
            sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            component="a"
            href="/address_converter"
          >
            <FIL2ETHIcon size={16} color={theme.palette.text.secondary} /> {t('Address Converter')}
          </MenuItem>
          <MenuItem onClick={handleMouseLeaveMenu} component="a" href="/rpc">
            <Cube size={16} color={theme.palette.text.secondary} style={{ marginRight: '0.5rem' }} /> {t('RPC')}
          </MenuItem>
          <MenuItem onClick={handleMouseLeaveMenu} component="a" href="/faucet">
            <RainDrop size={16} color={theme.palette.text.secondary} style={{ marginRight: '0.5rem' }} /> {t('Faucet')}
          </MenuItem>
          <MenuItem onClick={handleMouseLeaveMenu} component="a" href="/estimate_gas">
            <GasStation size={16} color={theme.palette.text.secondary} style={{ marginRight: '0.5rem' }} /> {t('Gas Estimator')}
          </MenuItem>
          <MenuItem onClick={handleMouseLeaveMenu} component="a" href="/interact">
            <ExecutableProgram size={16} color={theme.palette.text.secondary} style={{ marginRight: '0.5rem' }} />{' '}
            {t('Contract Interaction')}
          </MenuItem>
          <MenuItem onClick={handleMouseLeaveMenu} component="a" href="/contract_verifier">
            <CertificateCheck size={16} color={theme.palette.text.secondary} style={{ marginRight: '0.5rem' }} />{' '}
            {t('Contract Verification')}
          </MenuItem>
          <MenuItem onClick={handleMouseLeaveMenu} component="a" href="/resources">
            <Book size={16} color={theme.palette.text.secondary} style={{ marginRight: '0.5rem' }} /> {t('Resources')}
          </MenuItem>
        </MenuOption>
      </Box>
    </ClickAwayListener>
  )
}

export default MenuItems
