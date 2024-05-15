import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Settings } from '@carbon/icons-react'
import { ClickAwayListener } from '@mui/base'
import { Box, Grow, IconButton, Tooltip, useTheme } from '@mui/material'

import { Popups, SettingsPopup } from './components'

/**
 * Buttons component.
 *
 * This component provides the interface for the top bar buttons.
 *
 * @param menuItems - The menu items.
 * @param setMenuItems - The function to set the menu items.
 *
 * @returns The JSX element of the Buttons component.
 */
const SettingsButton = () => {
  const { t } = useTranslation()
  const theme = useTheme()
  const [open, setOpen] = useState(false)

  const handleClick = useCallback(() => {
    setOpen(prev => !prev)
  }, [setOpen])

  const handleClickAway = useCallback(() => {
    setOpen(false)
  }, [setOpen])

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box>
        <Tooltip title={t('Settings')} placement="bottom" key={'topbar item settings'} disableInteractive arrow>
          <IconButton
            className="rotateAnimationContainer"
            color="info"
            id={'topbar-settings-button'}
            onClick={handleClick}
            sx={{
              backgroundColor: open ? theme.palette.background.level2 : undefined,
            }}
          >
            <Settings className="rotateAnimation" />
          </IconButton>
        </Tooltip>

        <Grow in={open} {...(open ? { timeout: 300 } : {})}>
          <Box
            sx={{
              transformOrigin: '100% 0 0',
              position: 'absolute',
              right: '0.5rem',
              top: '3rem',
            }}
          >
            <Popups name={t('Settings')} handleMenuPopup={handleClick}>
              <SettingsPopup />
            </Popups>
          </Box>
        </Grow>
      </Box>
    </ClickAwayListener>
  )
}

export default SettingsButton
