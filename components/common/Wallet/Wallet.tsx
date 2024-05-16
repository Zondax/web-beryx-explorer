import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { truncateMaxCharacters } from '@/config/config'
import { NetworkType } from '@/config/networks'
import { ObjectType } from '@/routes/parsing'
import useAppSettingsStore from '@/store/ui/settings'
import { LedgerWalletError, useLedgerWalletStore } from '@/store/wallets/ledger'
import useWalletStore, { WalletProvider } from '@/store/wallets/wallet'
import { boxShadow } from '@/theme/hoverEffect'
import { ChevronLeft, Close, Logout, Renew, View } from '@carbon/icons-react'
import { Box, Button, CircularProgress, IconButton, Theme, Tooltip, Typography, useTheme } from '@mui/material'

import BeryxLink from '../BeryxLink/BeryxLink'
import LedgerIcon from '../Icons/Ledger'
import MetamaskIcon from '../Icons/Metamask'
import Account from './Account/Account'
import ChooseLedgerAddress from './ChooseLedgerAddress'
import DeviceLocked from './DeviceLocked'
import WalletOptions from './WalletOptions'

/**
 * Function to render the provider icon based on the wallet provider.
 *
 * @param provider - The wallet provider.
 * @param size - The size of the icon.
 *
 * @returns - Returns the JSX Element of the icon based on the provider or null if the provider is not recognized.
 */
export const renderProviderIcon = (provider: WalletProvider, size: number, theme: Theme) => {
  switch (provider) {
    case WalletProvider.METAMASK:
      return <MetamaskIcon size={size} />
    case WalletProvider.LEDGER:
      return <LedgerIcon size={size} color={theme.palette.text.primary} />
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
  const { setIsChoosingAddress } = useLedgerWalletStore(s => s)

  const handleClose = useCallback(() => {
    handleMenuPopup()
    setIsChoosingAddress(false)
  }, [handleMenuPopup, setIsChoosingAddress])

  return (
    <Box sx={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
      {isConnected && (
        <>
          <Tooltip title={t('Disconnect wallet')} disableInteractive arrow>
            <Button size="medium" variant="outlined" onClick={disconnectWallet} startIcon={<Logout width={15} />}>
              <Typography>Disconnect</Typography>
            </Button>
          </Tooltip>
          <Tooltip title={t('Refresh')} disableInteractive arrow>
            <IconButton className="rotateAnimationContainer" color="info" onClick={gather}>
              {isLoading ? <CircularProgress size={14} /> : <Renew className="rotateAnimation" width={16} />}
            </IconButton>
          </Tooltip>
        </>
      )}
      <Tooltip title={t('Close')} disableInteractive arrow>
        <IconButton className="shrinkDisappearAnimationContainer" color="info" onClick={handleClose}>
          <Close className="shrinkDisappear" />
        </IconButton>
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
  const theme = useTheme()
  const { isChoosingAddress, setIsChoosingAddress } = useLedgerWalletStore(s => s)

  const handleBack = useCallback(() => {
    setIsChoosingAddress(false)
  }, [setIsChoosingAddress])

  return (
    <Box
      sx={{
        width: '100%',
        height: '3.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: { xs: '0 0.5rem 0 1rem', md: '0 0.5rem 0 1rem' },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {isChoosingAddress ? (
          <IconButton className="flyLeftAnimationContainer" color="info" size="medium" onClick={handleBack}>
            <ChevronLeft className="flyLeft" width={14} />
          </IconButton>
        ) : null}
        {isConnected && filAddr ? (
          <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            {provider ? (
              <Box sx={{ display: 'flex', flexShrink: 0, alignItems: 'center' }}>
                {renderProviderIcon(provider as WalletProvider, 15, theme)}
              </Box>
            ) : null}
            <BeryxLink inputType={ObjectType.ADDRESS} value={filAddr} limitCharacters={truncateMaxCharacters} network={networkName} />
          </Box>
        ) : (
          <Typography variant="h5" pl={'1rem'}>
            Connect your wallet
          </Typography>
        )}
      </Box>
      {isChoosingAddress ? null : (
        <Buttons
          isConnected={isConnected}
          isLoading={isLoading}
          gather={gather}
          disconnectWallet={disconnectWallet}
          handleMenuPopup={handleMenuPopup}
        />
      )}
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
  const { isConnected, provider, disconnectWallet, gatherData, isLoading } = useWalletStore(s => s)
  const { network } = useAppSettingsStore(state => ({ network: state.network }))
  const { filAddr } = useWalletStore(s => s.walletInfo)
  const { isChoosingAddress, error: ledgerError } = useLedgerWalletStore(s => s)

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

  const renderWalletContent = useCallback(() => {
    if (isConnected) {
      if (ledgerError && ledgerError === LedgerWalletError.DEVICE_LOCKED && provider === WalletProvider.LEDGER) {
        return <DeviceLocked />
      }
      if (isChoosingAddress) {
        return <ChooseLedgerAddress />
      }
      return <Account />
    }
    return <WalletOptions />
  }, [isConnected, ledgerError, provider, isChoosingAddress])

  return (
    <Box
      sx={{
        transformOrigin: '100% 0 0',
        zIndex: '200',
        border: `1px solid ${theme.palette.border?.level0}`,
        borderRadius: '10px',
        background: theme.palette.background.level0,
        width: '31.75rem',
        boxShadow: boxShadow(theme.palette.mode),
        height: 'fit-content',
        maxHeight: 'calc(100dvh - 7rem)',
        transition: 'height 0.3s ease',
        overflow: 'hidden',
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
      {renderWalletContent()}
    </Box>
  )
}

export default Wallet
