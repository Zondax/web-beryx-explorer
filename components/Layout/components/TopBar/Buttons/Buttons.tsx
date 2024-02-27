import { format } from 'date-fns-tz'
import { useSnackbar } from 'notistack'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { v4 } from 'uuid'

import { subscribeNatsSync } from '@/nats/useSubscribeNats'
import { ObjectType } from '@/routes/parsing'
import { useNatsStore } from '@/store/data/nats'
import { useNotificationsStore } from '@/store/ui/notifications'
import { useAppSettingsStore } from '@/store/ui/settings'
import useWalletStore from '@/store/wallets/wallet'
import { Notification, Settings, Wallet as WalletIcon } from '@carbon/icons-react'
import { Badge, Box, Grow, IconButton, Tooltip, useTheme } from '@mui/material'

import { BeryxLink } from '../../../../common'
import Wallet, { renderProviderIcon } from '../../../../common/Wallet/Wallet'
import { Popups, SettingsPopup } from './components'
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
const Buttons = ({
  menuItems,
  setMenuItems,
  properties,
}: {
  menuItems: { [key: string]: { isOpen: boolean } }
  setMenuItems: (params: { [key: string]: { isOpen: boolean } }) => void
  properties?: {
    borderRadius?: string
    maxHeight?: string
  }
}) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const { notifications } = useNotificationsStore()
  const { closeSnackbar } = useSnackbar()
  const height = properties?.maxHeight ?? theme.spacing(5)
  const borderRadius = properties?.borderRadius ?? '0.5rem'

  const [isSettingsOpen, _] = useState<boolean>(false)

  const { isConnected, provider, gatherData, openWallet, setOpenWallet, disconnectWallet } = useWalletStore(s => s)
  const { filAddr, ethAddr, network: walletNetwork } = useWalletStore(s => s.walletInfo)
  const { network } = useAppSettingsStore(state => ({ network: state.network }))
  const { addNotification } = useNotificationsStore()
  const natsConnections = useNatsStore(s => s.connections)

  // Handle menu popup.
  const handleMenuPopup = useCallback(
    (item: string) => {
      const menuItemsNew = { ...menuItems }
      Object.keys(menuItemsNew).forEach((keyName: string) => {
        menuItemsNew[keyName].isOpen = keyName === item ? !menuItemsNew[keyName].isOpen : false
      })

      setMenuItems(menuItemsNew)
    },
    [menuItems, setMenuItems]
  )

  /**
   * Handle notification popup.
   *
   * This function handles the notification popup.
   */
  const handleNotificationPopup = useCallback(
    function () {
      closeSnackbar()
      handleMenuPopup('notifications')
    },
    [closeSnackbar, handleMenuPopup]
  )

  useEffect(() => {
    if (menuItems.wallet.isOpen && isConnected) {
      if (network.uniqueId.toLowerCase() === walletNetwork?.uniqueId.toLowerCase()) {
        gatherData(false, true)
        subscribeNatsSync(network, 'mempool')
      } else {
        disconnectWallet()
        addNotification({
          id: v4(),
          title: 'Network not matching.',
          description: `Your wallet is currently linked to the ${walletNetwork?.project} ${walletNetwork?.name} network, however, the application you’re using operates on the ${network.project} ${network.name} network. To fully utilize all features, please switch your wallet’s network to match with the one in Beryx.`,
          time: format(new Date(), 'KK:mm aa'),
          date: format(new Date(), 'MMM dd'),
          status: 'error',
          tag: ['Wallet'],
        })
      }
    }
  }, [walletNetwork, gatherData, isConnected, menuItems, natsConnections, network, addNotification, disconnectWallet])

  useEffect(() => {
    if (openWallet) {
      handleMenuPopup('wallet')
      setOpenWallet(false)
    }
  }, [handleMenuPopup, openWallet, setOpenWallet])

  const address = useMemo(() => {
    return filAddr ?? ethAddr
  }, [filAddr, ethAddr])

  const handleSettingsPopup = useCallback(() => handleMenuPopup('settings'), [handleMenuPopup])
  const handleWalletPopup = useCallback(() => handleMenuPopup('wallet'), [handleMenuPopup])
  const handleNotificationsPopup = useCallback(() => handleMenuPopup('notifications'), [handleMenuPopup])

  return (
    <>
      <>
        <Tooltip title={t('Notifications')} placement="bottom" key={'topbar item notifcation'} disableInteractive arrow>
          <IconButton
            color="primary"
            sx={{
              maxHeight: height,
              height,
              borderRadius,
              padding: '0.58rem 1rem',
              backgroundColor: isSettingsOpen ? theme.palette.background.level2 : theme.palette.background.level1,
            }}
            onClick={handleNotificationPopup}
            id={'topbar-notifications-button'}
          >
            <Badge
              color="error"
              overlap="circular"
              badgeContent={notifications.length}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              sx={{ fontSize: '4px' }}
              invisible={notifications.length === 0}
            >
              <Notification size="20" />
            </Badge>
          </IconButton>
        </Tooltip>
        <Tooltip title={t('Settings')} placement="bottom" key={'topbar item settings'} disableInteractive arrow>
          <IconButton
            color="primary"
            id={'topbar-settings-button'}
            sx={{
              maxHeight: height,
              height,
              borderRadius,
              backgroundColor: isSettingsOpen ? theme.palette.background.level2 : theme.palette.background.level1,
            }}
            onClick={handleSettingsPopup}
          >
            <Settings size="20" />
          </IconButton>
        </Tooltip>
        <Tooltip
          title={!isConnected ? t('Connect wallet') : t('Open wallet')}
          placement="bottom"
          key={'topbar item Wallet'}
          disableInteractive
          arrow
        >
          <IconButton
            id="connect-wallet-navbar"
            color="primary"
            sx={{
              borderRadius,
              maxHeight: height,
              padding: '0.9rem 1rem',
            }}
            onClick={handleWalletPopup}
          >
            {isConnected && address ? (
              <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                {provider ? (
                  <Box sx={{ display: 'flex', flexShrink: 0, alignItems: 'center' }}>{renderProviderIcon(provider, 15)}</Box>
                ) : null}

                <BeryxLink
                  inputType={ObjectType.ADDRESS}
                  limitCharacters={10}
                  value={address}
                  hasCopyButton={false}
                  disableLink
                  isColored={false}
                  network={network}
                />
              </Box>
            ) : (
              <WalletIcon size={20} />
            )}
          </IconButton>
        </Tooltip>
      </>
      <Grow in={menuItems['settings'].isOpen} {...(menuItems['settings'].isOpen ? { timeout: 300 } : {})}>
        <Box
          sx={{
            transformOrigin: '100% 0 0',
            position: 'absolute',
            right: '1rem',
            top: '4.5rem',
          }}
        >
          <Popups name={t('Settings')} handleMenuPopup={handleSettingsPopup}>
            <SettingsPopup />
          </Popups>
        </Box>
      </Grow>
      <Grow in={menuItems['wallet'].isOpen} {...(menuItems['wallet'].isOpen ? { timeout: 300 } : {})}>
        <Box
          sx={{
            transformOrigin: '100% 0 0',
            position: 'absolute',
            right: '1rem',
            top: '4.5rem',
          }}
        >
          <Wallet handleMenuPopup={handleWalletPopup} />
        </Box>
      </Grow>
      <Grow in={menuItems['notifications'].isOpen} {...(menuItems['notifications'].isOpen ? { timeout: 300 } : {})}>
        <Box
          sx={{
            transformOrigin: '100% 0 0',
            position: 'absolute',
            right: '1rem',
            top: '4.5rem',
            height: `calc(100vh - ${theme.spacing(3)} - ${theme.spacing(7)})`,
          }}
        >
          <Popups name={t('Notifications')} handleMenuPopup={handleNotificationsPopup}>
            <NotificationsPopup />
          </Popups>
        </Box>
      </Grow>
    </>
  )
}

export default Buttons
