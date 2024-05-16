import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useNotificationsStore } from '@/store/ui/notifications'
import { Notification } from '@carbon/icons-react'
import { ClickAwayListener } from '@mui/base'
import { Badge, Box, Grow, IconButton, Tooltip, useTheme } from '@mui/material'

import { Popups } from './components'
import NotificationsPopup from './components/NotificationsPopup'

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
const NotificationButton = () => {
  const { t } = useTranslation()
  const theme = useTheme()
  const { notifications } = useNotificationsStore()
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
        <Tooltip title={t('Notifications')} placement="bottom" key={'topbar item notifcation'} disableInteractive arrow>
          <Badge
            color="error"
            overlap="circular"
            badgeContent={notifications.length}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <IconButton
              className="bellAnimationContainer"
              color="info"
              id={'topbar-notifications-button'}
              onClick={handleClick}
              sx={{
                backgroundColor: open ? theme.palette.background.level2 : undefined,
              }}
            >
              <Notification className="bellAnimation" />
            </IconButton>
          </Badge>
        </Tooltip>

        <Grow in={open} {...(open ? { timeout: 300 } : {})}>
          <Box
            sx={{
              transformOrigin: '100% 0 0',
              position: 'absolute',
              right: '0.5rem',
              top: '3rem',
              maxHeight: `calc(100vh - ${theme.spacing(3)} - ${theme.spacing(7)})`,
            }}
          >
            <Popups name={t('Notifications')} handleMenuPopup={handleClick}>
              <NotificationsPopup />
            </Popups>
          </Box>
        </Grow>
      </Box>
    </ClickAwayListener>
  )
}

export default NotificationButton
