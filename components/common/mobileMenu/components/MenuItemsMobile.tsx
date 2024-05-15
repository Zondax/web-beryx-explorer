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
import { Box, Button, MenuItem } from '@mui/material'
import { useTheme } from '@mui/system'

import { FIL2ETHIcon } from 'components/common/Icons'

interface MenuItemProps {
  handleCloseTopMenu: () => void
}

/**
 * Creates the menu items components.
 */
const MenuItemsMobile: React.FC<MenuItemProps> = ({ handleCloseTopMenu }) => {
  const theme = useTheme()
  const { t } = useTranslation()
  const [openedItems, setOpenedItems] = React.useState<number[]>([])

  /**
   * Toggles the visibility of a specific menu item's children when clicked.
   * @param menuNumber The number of the menu item being toggled.
   */
  const handleToggleMenu = useCallback(
    (menuNumber: number) => {
      setOpenedItems(prev => {
        const isCurrentlyOpened = prev.includes(menuNumber)
        if (isCurrentlyOpened) {
          return prev.filter(item => item !== menuNumber)
        }
        return [...prev, menuNumber]
      })
    },
    [setOpenedItems]
  )

  const handleClose = useCallback(() => {
    setOpenedItems([])
    handleCloseTopMenu()
  }, [setOpenedItems, handleCloseTopMenu])

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
        size={'medium'}
        fullWidth
        endIcon={openedItems.includes(itemNumber) ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        onClick={() => handleToggleMenu(itemNumber)}
        sx={{
          fontSize: '1rem',
          height: '40px',
          borderRadius: '4px',
        }}
      >
        {t(name)}
      </Button>
      <Box
        sx={{
          padding: '0.5rem',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            height: openedItems.includes(itemNumber) ? 'auto' : 0,
            overflow: 'hidden',
            transition: 'height 0.3s ease-in-out',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  )

  return (
    <Box
      className="desktop-topbar"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.125rem',
        justifyContent: 'space-between',
        padding: '2rem 0.5rem 0rem 0.5rem',
      }}
    >
      <MenuOption itemNumber={1} name={'Recent Activity'}>
        <MenuItem onClick={handleClose} component="a" href="/recent_activity?tab=tipsets">
          <Cube size={16} color={theme.palette.text.secondary} style={{ marginRight: '0.5rem' }} /> {t('Tipsets')}
        </MenuItem>
        <MenuItem onClick={handleClose} component="a" href="/recent_activity?tab=transactions">
          <QueryQueue size={16} color={theme.palette.text.secondary} style={{ marginRight: '0.5rem' }} /> {t('Transactions')}
        </MenuItem>
        <MenuItem onClick={handleClose} component="a" href="/recent_activity?tab=contracts">
          <Document size={16} color={theme.palette.text.secondary} style={{ marginRight: '0.5rem' }} /> {t('Contracts')}
        </MenuItem>
        <MenuItem onClick={handleClose} component="a" href="/mempool">
          <CategoryNewEach size={16} color={theme.palette.text.secondary} style={{ marginRight: '0.5rem' }} /> {t('Mempool')}
        </MenuItem>
      </MenuOption>

      <MenuOption itemNumber={2} name={'Insights'}>
        <MenuItem onClick={handleClose} component="a" href="/leaderboard?tab=rich-list">
          <TaskStar size={16} color={theme.palette.text.secondary} style={{ marginRight: '0.5rem' }} /> {t('Rich List')}
        </MenuItem>
        <MenuItem onClick={handleClose} component="a" href="/dashboard#gas-used-stats">
          <GasStation size={16} color={theme.palette.text.secondary} style={{ marginRight: '0.5rem' }} /> {t('Gas Stats')}
        </MenuItem>
        <MenuItem onClick={handleClose} component="a" href="/dashboard#contract-stats">
          <Document size={16} color={theme.palette.text.secondary} style={{ marginRight: '0.5rem' }} /> {t('Contract Stats')}
        </MenuItem>
        <MenuItem onClick={handleClose} component="a" href="/mempool?tab=stats">
          <CategoryNewEach size={16} color={theme.palette.text.secondary} style={{ marginRight: '0.5rem' }} /> {t('Mempool Stats')}
        </MenuItem>
      </MenuOption>
      <MenuOption itemNumber={3} name={'Dev Tools'}>
        <MenuItem
          onClick={handleClose}
          sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          component="a"
          href="/address_converter"
        >
          <FIL2ETHIcon size={16} color={theme.palette.text.secondary} /> {t('Address Converter')}
        </MenuItem>
        <MenuItem onClick={handleClose} component="a" href="/rpc">
          <Cube size={16} color={theme.palette.text.secondary} style={{ marginRight: '0.5rem' }} /> {t('RPC')}
        </MenuItem>
        <MenuItem onClick={handleClose} component="a" href="/faucet">
          <RainDrop size={16} color={theme.palette.text.secondary} style={{ marginRight: '0.5rem' }} /> {t('Faucet')}
        </MenuItem>
        <MenuItem onClick={handleClose} component="a" href="/estimate_gas">
          <GasStation size={16} color={theme.palette.text.secondary} style={{ marginRight: '0.5rem' }} /> {t('Gas Estimator')}
        </MenuItem>
        <MenuItem onClick={handleClose} component="a" href="/interact">
          <ExecutableProgram size={16} color={theme.palette.text.secondary} style={{ marginRight: '0.5rem' }} /> {t('Contract Interaction')}
        </MenuItem>
        <MenuItem onClick={handleClose} component="a" href="/contract_verifier">
          <CertificateCheck size={16} color={theme.palette.text.secondary} style={{ marginRight: '0.5rem' }} /> {t('Contract Verification')}
        </MenuItem>
        <MenuItem onClick={handleClose} component="a" href="/resources">
          <Book size={16} color={theme.palette.text.secondary} style={{ marginRight: '0.5rem' }} /> {t('Resources')}
        </MenuItem>
      </MenuOption>
    </Box>
  )
}

export default MenuItemsMobile
