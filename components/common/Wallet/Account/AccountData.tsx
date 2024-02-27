import { useTranslation } from 'react-i18next'

import { truncateMaxCharacters } from '@/config/config'
import { ObjectType } from '@/routes/parsing'
import useWalletStore, { WalletProvider } from '@/store/wallets/wallet'
import { Link, WarningAltFilled } from '@carbon/icons-react'
import { Box, Unstable_Grid2 as Grid, Skeleton, Tooltip, Typography, useTheme } from '@mui/material'

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

  const { t } = useTranslation()

  return (
    <>
      {provider === WalletProvider.VIEW_ONLY ? (
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
            <WarningAltFilled size={20} color={theme.palette.warning.light} />
          </Box>
          <Typography variant="body2" color={theme.palette.warning.light}>
            {t('You are in tracking mode, not connected to a wallet of this address. In this mode, you can not invoke contracts')}
          </Typography>
        </Box>
      ) : undefined}

      <Grid container flexDirection={'column'} alignItems={'center'} justifyContent={'center'} gap={'0.5rem'} margin={'3rem 0 1rem 0'}>
        {network ? (
          <>
            <Box id={'wallet-account-chain-network'} sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <Typography variant="subtitle1" component={'p'} sx={{ textAlign: 'center', textTransform: 'capitalize' }}>
                {network.project} • {network.name}
              </Typography>{' '}
              {provider === WalletProvider.VIEW_ONLY ? (
                <Tooltip title={t('The account network is linked to the network selector from the top.')}>
                  <Link size={16} style={{ cursor: 'help' }} />
                </Tooltip>
              ) : undefined}
            </Box>

            <Typography
              id={'wallet-account-balance'}
              variant="captionMono"
              component={'h1'}
              fontWeight={600}
              fontSize={'1.75rem'}
              sx={{ textAlign: 'center', opacity: isLoading ? 0.2 : 1, transition: 'opacity 0.2s ease' }}
            >
              {balance !== undefined ? (
                `${balance} ${network.currency.symbol}`
              ) : (
                <Skeleton id={'wallet-account-balance-skeleton'} width={'16rem'} />
              )}
            </Typography>
          </>
        ) : (
          <>
            <Typography variant="subtitle1" component={'p'} color={theme.palette.tableChildrenRowBorder} sx={{ textAlign: 'center' }}>
              {t('Loading...')}
            </Typography>
            <Typography
              variant="captionMono"
              component={'p'}
              color={theme.palette.tableChildrenRowBorder}
              fontWeight={600}
              fontSize={'1.75rem'}
              sx={{ textAlign: 'center' }}
            >
              0.00
            </Typography>
          </>
        )}
      </Grid>

      <Grid container flexDirection={'column'} alignItems={'center'} gap={'0.5rem'} margin={'1rem 0'}>
        <Grid container id={'wallet-account-addresses'} flexDirection={'column'} alignItems={'flex-end'} gap={'0.5rem'} margin={'1rem 0'}>
          {filAddr ? (
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem' }}>
              <Typography variant="caption" color={'text.secondary'} sx={{ marginBottom: '0rem', textAlign: 'center' }}>
                {t('FIL Address')}:
              </Typography>
              <Box sx={{ backgroundColor: theme.palette.background.level2, padding: '0 0 0 0.75rem', borderRadius: '4px' }}>
                <BeryxLink inputType={ObjectType.ADDRESS} value={filAddr} limitCharacters={truncateMaxCharacters} isColored={false} />
              </Box>
            </Box>
          ) : null}

          {ethAddr ? (
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem' }}>
              <Typography variant="caption" color={'text.secondary'} sx={{ marginBottom: '0rem', textAlign: 'center' }}>
                {t('ETH Address:')}
              </Typography>
              <Box sx={{ backgroundColor: theme.palette.background.level2, padding: '0 0 0 0.75rem', borderRadius: '4px' }}>
                <BeryxLink inputType={ObjectType.ADDRESS} value={ethAddr} limitCharacters={truncateMaxCharacters} isColored={false} />
              </Box>
            </Box>
          ) : null}
        </Grid>
      </Grid>
    </>
  )
}

export default AccountData
