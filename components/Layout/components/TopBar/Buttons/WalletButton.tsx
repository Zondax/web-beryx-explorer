import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { subscribeNatsSync } from '@/nats/useSubscribeNats'
import { ObjectType } from '@/routes/parsing'
import useAppSettingsStore from '@/store/ui/settings'
import useWalletStore from '@/store/wallets/wallet'
import { Wallet as WalletIcon } from '@carbon/icons-react'
import { ClickAwayListener } from '@mui/base'
import { Box, Grow, IconButton, Tooltip, useTheme } from '@mui/material'

import { BeryxLink } from 'components/common'
import Wallet, { renderProviderIcon } from 'components/common/Wallet/Wallet'

interface WalletButtonProps {
  level?: 'first' | 'second'
}

/**
 * WalletButton component.
 *
 * This component renders a button in the top bar for wallet interactions.
 *
 * @param {WalletButtonProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
const WalletButton: React.FC<WalletButtonProps> = ({ level = 'second' }) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const { isConnected, provider, gatherData, openWallet, setOpenWallet, switchChain } = useWalletStore(s => s)
  const { filAddr, ethAddr, network: walletNetwork } = useWalletStore(s => s.walletInfo)
  const { network } = useAppSettingsStore(state => ({ network: state.network }))
  const [open, setOpen] = useState<boolean>(false)

  const address = useMemo(() => filAddr ?? ethAddr, [filAddr, ethAddr])

  const handleClick = useCallback(() => {
    setOpen(prev => !prev)
  }, [])

  const handleClickAway = useCallback(() => {
    setOpen(false)
  }, [])

  useEffect(() => {
    if (isConnected && walletNetwork) {
      if (network.uniqueId.toLowerCase() === walletNetwork.uniqueId.toLowerCase()) {
        gatherData(false, true)
        subscribeNatsSync(network, 'mempool')
      } else {
        switchChain(network)
        setOpen(true)
      }
    }
  }, [walletNetwork, gatherData, isConnected, network, switchChain, handleClick])

  useEffect(() => {
    if (openWallet) {
      setOpen(true)
      setOpenWallet(false)
    }
  }, [openWallet, setOpenWallet])

  const renderWallet = useCallback(() => {
    return (
      <Box>
        <Tooltip
          title={!isConnected ? t('Connect wallet') : t('Open wallet')}
          placement="bottom"
          key={'topbar item Wallet'}
          disableInteractive
          arrow
        >
          <IconButton
            id="connect-wallet-navbar"
            onClick={handleClick}
            color="info"
            sx={{
              width: isConnected && address ? 'max-content !important' : undefined,
              backgroundColor: open ? theme.palette.background.level2 : undefined,
            }}
          >
            {isConnected && address ? (
              <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                {provider ? (
                  <Box sx={{ display: 'flex', flexShrink: 0, alignItems: 'center' }}>{renderProviderIcon(provider, 15, theme)}</Box>
                ) : null}

                <BeryxLink
                  inputType={ObjectType.ADDRESS}
                  limitCharacters={10}
                  value={address}
                  hasCopyButton={false}
                  disableLink
                  disableTooltip
                  isColored={false}
                  network={network}
                />
              </Box>
            ) : (
              <WalletIcon />
            )}
          </IconButton>
        </Tooltip>

        <Grow in={open} {...(open ? { timeout: 300 } : {})}>
          <Box
            sx={{
              transformOrigin: '100% 0 0',
              position: 'absolute',
              right: '0.5rem',
              top: level === 'second' ? '6rem' : '3rem',
            }}
          >
            <Wallet handleMenuPopup={handleClick} />
          </Box>
        </Grow>
      </Box>
    )
  }, [address, handleClick, isConnected, level, network, open, provider, t, theme])

  if (open) {
    return <ClickAwayListener onClickAway={handleClickAway}>{renderWallet()}</ClickAwayListener>
  }

  return renderWallet()
}

export default WalletButton
