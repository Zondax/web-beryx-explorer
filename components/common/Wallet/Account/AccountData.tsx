import Image from 'next/image'
import { useCallback, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { truncateMaxCharacters } from '@/config/config'
import { ObjectType } from '@/routes/parsing'
import { useLedgerWalletStore } from '@/store/wallets/ledger'
import useWalletStore, { WalletProvider } from '@/store/wallets/wallet'
import { hoverEffect } from '@/theme/hoverEffect'
import { WarningAltFilled } from '@carbon/icons-react'
import { Box, Button, Skeleton, Tooltip, Typography, useTheme } from '@mui/material'

import BetaLabel from 'components/common/BetaLabel/BetaLabel'
import { Filecoin } from 'components/common/Icons'

import BeryxLink from '../../BeryxLink'

/**
 * `AccountData` is a React component that displays user's wallet information.
 * Includes FIL and ETH addresses, user balance, and network information.
 * It also notifies the user if they're in a tracking mode and not directly connected to a wallet.
 */
const AccountData = () => {
  const theme = useTheme()
  const { filAddr, ethAddr, balance, network } = useWalletStore(s => s.walletInfo)
  const { isLoading, provider } = useWalletStore(s => s)
  const { setIsChoosingAddress, app } = useLedgerWalletStore(s => s)

  const cardRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = cardRef.current
    if (el) {
      const cardHalo = el.querySelector('.card-halo') as HTMLElement
      const cardHaloIridecent = el.querySelector('.card-halo-iridecent') as HTMLElement

      el.style.zIndex = 'auto'

      hoverEffect(el, cardHalo, el.clientHeight, el.clientWidth, theme, 3, 1.01, true, cardHaloIridecent)
    }
  }, [theme])

  const { t } = useTranslation()

  const handleChangeAddress = useCallback(() => {
    setIsChoosingAddress(true)
  }, [setIsChoosingAddress])

  const renderWarning = () => {
    if (provider === WalletProvider.VIEW_ONLY) {
      return (
        <Box
          sx={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
            padding: '0.25rem 1rem',
            margin: '0 0',
            background: `${theme.palette.warning.main}${theme.palette.mode === 'light' ? '23' : '33'}`,
          }}
        >
          <Box sx={{ display: 'flex', flexShrink: 0, alignItems: 'center' }}>
            <WarningAltFilled size={20} color={theme.palette.warning.main} />
          </Box>
          <Typography variant="body2" color={theme.palette.warning.main}>
            {t('You are in tracking mode, not connected to a wallet of this address. In this mode, you can not invoke contracts')}
          </Typography>
        </Box>
      )
    }
    if (provider === WalletProvider.LEDGER) {
      if (app === 'ETH') {
        return (
          <Box
            sx={{
              display: 'flex',
              gap: '1rem',
              alignItems: 'center',
              padding: '0.25rem 1rem',
              margin: '0 0',
              background: `${theme.palette.warning.main}${theme.palette.mode === 'light' ? '23' : '33'}`,
            }}
          >
            <Box sx={{ display: 'flex', flexShrink: 0, alignItems: 'center' }}>
              <WarningAltFilled size={20} color={theme.palette.warning.main} />
            </Box>
            <Typography variant="body2" color={theme.palette.warning.main}>
              {t('At the moment we only support blind signing for EVM Native addresses (f410...).')}
            </Typography>
          </Box>
        )
      }
      return (
        <Box
          sx={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
            padding: '0.25rem 1rem',
            margin: '0 0',
            background: `${theme.palette.background.level2}`,
          }}
        >
          <Box sx={{ display: 'flex', flexShrink: 0, alignItems: 'center' }}>
            <BetaLabel />
          </Box>
          <Typography variant="body2" color={theme.palette.text.secondary}>
            {t('Ledger integration is in beta. Please report any issues you encounter using the feedback tool from the top bar.')}
          </Typography>
        </Box>
      )
    }
  }

  return (
    <>
      {renderWarning()}
      <Box
        ref={cardRef}
        sx={{
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          width: 'calc(100% - 3.7rem)',
          minHeight: '240px',
          padding: '1.125rem 1rem',
          borderRadius: '16px',
          boxShadow: `0 4px 8px ${theme.palette.mode === 'dark' ? theme.palette.background.level1 : theme.palette.background.level2}`,
          backgroundColor: theme.palette.background.level0,
          border: `1px solid ${theme.palette.border?.level0}`,
          color: theme.palette.primary.contrastText,
          margin: provider === WalletProvider.LEDGER ? '1.125rem auto 0.5rem auto' : '1.875rem auto 0.75rem auto',
          '.noise-overlay': {
            opacity: 0,
            transition: 'opacity 0.2s ease',
          },
          '&:hover': {
            '.noise-overlay': {
              opacity: theme.palette.mode === 'dark' ? 0.2 : 0.07,
            },
          },
        }}
      >
        {/* Filecoin Logo */}
        <Box sx={{ position: 'relative' }}>
          <Box sx={{ position: 'absolute', top: '-0.2rem', left: '-0.5rem' }}>
            <Filecoin size={40} color1={'transparent'} color2={theme.palette.text.primary} />
          </Box>
        </Box>

        {/* Account Actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem' }}>
          <Box>
            {provider === WalletProvider.LEDGER ? (
              <Tooltip title={t('Choose a different address or swith to EVM native addresses.')} disableInteractive arrow>
                <Button size="medium" variant="outlined" onClick={handleChangeAddress}>
                  <Typography>Switch Account</Typography>
                </Button>
              </Tooltip>
            ) : undefined}
          </Box>
        </Box>

        {/* Balance */}
        <Box
          sx={{
            position: 'absolute',
            top: '5rem',
            left: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <Typography variant="body1" sx={{ fontSize: '0.875rem' }}>
            {t('Your Balance')}
          </Typography>
          <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Typography
              variant="h6"
              component="span"
              sx={{
                fontWeight: '600',
                fontSize: '2.3rem',
                color: isLoading ? theme.palette.border?.level0 : theme.palette.text.primary,
                transition: 'opacity 0.2s ease',
              }}
            >
              {balance !== undefined ? `${balance} ${network?.currency.symbol}` : <Skeleton width="16rem" />}
            </Typography>
          </Box>
        </Box>

        {/* Network and Address */}
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '0.25rem' }}>
          <Box sx={{ pointerEvents: 'none' }}>
            <Typography variant="body1" sx={{ fontSize: '0.875rem', textTransform: 'capitalize' }}>
              {network?.project} {network?.name}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <Typography variant="body2" sx={{ fontSize: '0.875rem', pointerEvents: 'none' }}>
              {t('Account Address')}
            </Typography>
            {filAddr ? (
              <Box>
                <BeryxLink
                  network={network}
                  inputType={ObjectType.ADDRESS}
                  value={filAddr}
                  limitCharacters={truncateMaxCharacters}
                  isColored={false}
                />
              </Box>
            ) : null}
            {ethAddr ? (
              <Box>
                <BeryxLink
                  network={network}
                  inputType={ObjectType.ADDRESS}
                  value={ethAddr}
                  limitCharacters={truncateMaxCharacters}
                  isColored={false}
                />
              </Box>
            ) : null}
          </Box>
        </Box>
        <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          <Image
            src={'/images/noise.png'}
            className="noise-overlay"
            quality={60}
            alt="noise1"
            fill
            style={{ objectFit: 'cover', mixBlendMode: theme.palette.mode === 'dark' ? 'overlay' : 'darken' }}
          />
        </Box>
        <div
          className="card-halo-iridecent"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            clipPath:
              theme.palette.mode === 'dark' ? 'polygon(2% 3%, 25% 3%, 25% 30%, 2% 30%, 2% 40%, 100% 40%, 100% 60%, 2% 60%)' : undefined,
          }}
        />
        <div className="card-halo" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none' }} />
      </Box>
    </>
  )
}

export default AccountData
