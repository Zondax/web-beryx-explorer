import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { truncateMaxCharacters } from '@/config/config'
import { NetworkType } from '@/config/networks'
import { ObjectType } from '@/routes/parsing'
import { useAppSettingsStore } from '@/store/ui/settings'
import useWalletStore, { WalletProvider } from '@/store/wallets/wallet'
import { boxShadow } from '@/theme/hoverEffect'
import { Close, Logout, Renew, View } from '@carbon/icons-react'
import { Box, Button, CircularProgress, Tooltip, useTheme } from '@mui/material'

import BeryxLink from '../BeryxLink/BeryxLink'
import MetamaskIcon from '../Icons/Metamask'
import Account from './Account/Account'
import WalletOptions from './WalletOptions'

/**
 * Function to render the provider icon based on the wallet provider.
 *
 * @param provider - The wallet provider.
 * @param size - The size of the icon.
 *
 * @returns - Returns the JSX Element of the icon based on the provider or null if the provider is not recognized.
 */
export const renderProviderIcon = (provider: WalletProvider, size: number) => {
  switch (provider) {
    case WalletProvider.METAMASK:
      return <MetamaskIcon size={size} />

    case WalletProvider.VIEW_ONLY:
      return <View width={size} />

    default:
      return null
  }
}

/**
 * Buttons component for the Wallet.
 *
 * @param props - The properties passed to the component.
 * @param props.isConnected - The connection status of the wallet.
 * @param props.isLoading - The loading status of the wallet.
 * @param props.gather - The function to gather data.
 * @param props.disconnectWallet - The function to disconnect the wallet.
 * @param props.handleMenuPopup - The function to handle the menu popup.
 *
 * @returns - The JSX element of the Buttons component.
 */
const Buttons: React.FC<{
  isConnected: boolean
  isLoading: boolean
  gather: () => void
  disconnectWallet: () => void
  handleMenuPopup: () => void
}> = ({ isConnected, isLoading, gather, disconnectWallet, handleMenuPopup }) => {
  const { t } = useTranslation()

  return (
    <Box sx={{ display: 'flex', gap: '0.125rem', alignItems: 'center' }}>
      {isConnected && (
        <>
          <Tooltip title={t('Refresh')} disableInteractive arrow>
            <Button variant={'text'} sx={{ minWidth: 'unset', padding: '0.5rem 0.95rem' }} onClick={gather}>
              {isLoading ? <CircularProgress size={14} /> : <Renew width={16} />}
            </Button>
          </Tooltip>
          <Tooltip title={t('Disconnect wallet')} disableInteractive arrow>
            <Button variant={'text'} sx={{ minWidth: 'unset', padding: '0.5rem 0.95rem' }} onClick={disconnectWallet}>
              <Logout width={15} />
            </Button>
          </Tooltip>
        </>
      )}
      <Tooltip title={t('Close')} disableInteractive arrow>
        <Button variant={'text'} sx={{ minWidth: 'unset', padding: '0.5rem 0.6rem' }} onClick={handleMenuPopup}>
          <Close size={20} />
        </Button>
      </Tooltip>
    </Box>
  )
}

/**
 * WalletHeader component for the Wallet.
 *
 * @param props - The properties passed to the component.
 * @param props.isConnected - The connection status of the wallet.
 * @param props.filAddr - The Filecoin address of the wallet.
 * @param props.provider - The provider of the wallet.
 * @param props.isLoading - The loading status of the wallet.
 * @param props.gather - The function to gather data.
 * @param props.disconnectWallet - The function to disconnect the wallet.
 * @param props.handleMenuPopup - The function to handle the menu popup.
 *
 * @returns - The JSX element of the WalletHeader component.
 */
const WalletHeader: React.FC<{
  isConnected: boolean
  filAddr: string | null
  provider: string | null
  network: NetworkType
  isLoading: boolean
  gather: () => void
  disconnectWallet: () => void
  handleMenuPopup: () => void
}> = ({ isConnected, filAddr, provider, network: networkName, isLoading, gather, disconnectWallet, handleMenuPopup }) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '3.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: isConnected ? 'space-between' : 'flex-end',
        padding: { xs: '0 0.5rem 0 1rem', md: '0 0.5rem 0 1rem' },
      }}
    >
      {isConnected && filAddr && (
        <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          {provider ? (
            <Box sx={{ display: 'flex', flexShrink: 0, alignItems: 'center' }}>{renderProviderIcon(provider as WalletProvider, 15)}</Box>
          ) : null}
          <BeryxLink inputType={ObjectType.ADDRESS} value={filAddr} limitCharacters={truncateMaxCharacters} network={networkName} />
        </Box>
      )}
      <Buttons
        isConnected={isConnected}
        isLoading={isLoading}
        gather={gather}
        disconnectWallet={disconnectWallet}
        handleMenuPopup={handleMenuPopup}
      />
    </Box>
  )
}

/**
 * Wallet component.
 *
 * This component provides the wallet interface.
 *
 * @returns - The JSX element of the Wallet component.
 */
const Wallet: React.FC<{ handleMenuPopup: () => void }> = ({ handleMenuPopup }) => {
  const theme = useTheme()
  const isConnected = useWalletStore(s => s.isConnected)
  const provider = useWalletStore(s => s.provider)
  const { disconnectWallet, gatherData, isLoading } = useWalletStore(s => s)
  const { network } = useAppSettingsStore(state => ({ network: state.network }))
  const { filAddr } = useWalletStore(s => s.walletInfo)

  /**
   * gather function.
   *
   * This function gathers data.
   *
   * @returns
   */
  const gather = useCallback(() => {
    gatherData(true, true)
  }, [gatherData])

  return (
    <Box
      sx={{
        transformOrigin: '100% 0 0',
        zIndex: '200',
        border: `1px solid ${theme.palette.tableBorder}`,
        borderRadius: '8px',
        background: theme.palette.background.level1,
        width: '31.75rem',
        boxShadow: boxShadow(theme.palette.mode),
      }}
    >
      <WalletHeader
        isConnected={isConnected}
        filAddr={filAddr ?? ''}
        provider={provider ?? ''}
        network={network}
        isLoading={isLoading}
        gather={gather}
        disconnectWallet={disconnectWallet}
        handleMenuPopup={handleMenuPopup}
      />
      {isConnected ? <Account /> : <WalletOptions />}
    </Box>
  )
}

export default Wallet
