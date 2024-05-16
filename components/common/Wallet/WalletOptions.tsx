import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import useAppSettingsStore from '@/store/ui/settings'
import { useLedgerWalletStore } from '@/store/wallets/ledger'
import useWalletStore, { WalletProvider } from '@/store/wallets/wallet'
import { CloseFilled } from '@carbon/icons-react'
import { Box, Button, CircularProgress, Unstable_Grid2 as Grid, TextField, Tooltip, Typography, debounce, useTheme } from '@mui/material'

import { BetaBox } from 'components/views/ResultsView/ContractView/RunMethod/components/Parameters/Parameters'

import LedgerIcon from '../Icons/Ledger'
import MetamaskIcon from '../Icons/Metamask'

/**
 * `WalletOptions` is a React component that provides the user with options to connect
 * to a wallet provider such as MetaMask or to track an address.
 *
 * @returns the `WalletOptions` component
 */
const WalletOptions = () => {
  const { t } = useTranslation()
  const theme = useTheme()
  const { network } = useAppSettingsStore(state => ({ network: state.network }))

  const { connectWallet, isLoading, provider, error } = useWalletStore(s => s)
  const { isLoading: ledgerIsLoading, error: ledgerError } = useLedgerWalletStore(s => s)

  const [address, setAddress] = useState<string | undefined>(undefined)
  const [inputError, setInputError] = useState<string | undefined>(undefined)

  /**
   * This function handles the action to connect to MetaMask when the user clicks the
   * respective button.
   *
   * @param e - the event of the user's mouse click
   */
  const handleConnectMetamask = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      connectWallet(WalletProvider.METAMASK)
    },
    [connectWallet]
  )

  /**
   * This function handles the action to connect to Ledger when the user clicks the
   * respective button.
   *
   * @param e - the event of the user's mouse click
   */
  const handleConnectLedger = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      // setConnection()
      connectWallet(WalletProvider.LEDGER)
    },
    [connectWallet]
  )

  /**
   * This function handles the action to track an address when the user clicks the
   * respective button.
   */
  const handleTrackAddress = useCallback(() => {
    connectWallet(WalletProvider.VIEW_ONLY, address, network)
  }, [network, address, connectWallet])

  /**
   * This function handles the "Enter" key press, during which it will attempt to connect to
   * a WalletProvider's network if the `network` and `address` is defined.
   *
   * @param event - the event of the user's key press
   */
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        if (!network || !address) {
          return
        }
        connectWallet(WalletProvider.VIEW_ONLY, address, network)
      }
    },
    [network, address, connectWallet]
  )

  /**
   * This function handles the changes to the input value in the text field,
   * primarily for cleaning up and preparing the targer value.
   *
   * @param e - the event of the user's input change
   */
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputError(undefined)
    let filteredInput = e.target.value
    filteredInput = filteredInput.toLowerCase()
    filteredInput = filteredInput.replace(/ /g, '')

    if (filteredInput === '') {
      setAddress(undefined)
      return
    }

    setAddress(filteredInput)
  }

  /**
   * This hook sets any changes to the `error` state to `inputError`.
   */
  useEffect(() => {
    setInputError(error)
  }, [error])

  /**
   * Debounces the input change handler to avoid unnecessary computation.
   */
  const debouncedChangeHandler = useMemo(() => debounce(handleInputChange, 300), [])

  const renderStatusIcon = useCallback((status?: 'loading' | 'error' | 'success') => {
    switch (status) {
      case 'loading':
        return <CircularProgress size={12} thickness={6} />
      case 'error':
        return <CloseFilled color="red" />
      default:
        return null
    }
  }, [])

  /* Rendering the main component */
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        width: '100%',
        padding: '0 1rem 1rem 1rem',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          width: '100%',
          padding: '0 1rem 1rem 1rem',
        }}
      >
        <Typography variant="caption" component={'p'} color={'text.secondary'}>
          {t("If you don't have a wallet yet, you can select a provider and create one now.")}
        </Typography>
        <Grid
          container
          height={'100%'}
          sx={{
            border: `1px solid ${theme.palette.border?.level0}`,
            borderRadius: '6px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'auto',
          }}
        >
          {/* MetaMask */}
          <Grid
            id={'connect2metamask-button'}
            container
            xs={12}
            alignItems={'center'}
            gap={2}
            onClick={handleConnectMetamask}
            role="button"
            sx={{
              height: '3.5rem',
              padding: '0.75rem 1.25rem',
              cursor: 'pointer',
              borderBottom: `1px solid ${theme.palette.border?.level0}`,
              ':hover': {
                background: theme.palette.background.level2,
              },
              ':active': {
                background: theme.palette.background.level1,
              },
            }}
          >
            <Grid xs={0.7} display={'flex'} alignItems={'center'} gap={'0.5rem'}>
              <MetamaskIcon size={18} />
            </Grid>
            <Grid xs={9} container alignItems={'center'} sx={{ gap: '0.5rem' }}>
              <Typography variant="body1" component={'p'} color={'text.primary'} fontWeight={600}>
                MetaMask
              </Typography>
            </Grid>
            {isLoading && provider === WalletProvider.METAMASK ? (
              <Grid xs={1} container alignItems={'center'} justifyContent={'flex-end'}>
                <CircularProgress size={16} />
              </Grid>
            ) : null}
          </Grid>

          {/* Ledger */}
          <Grid
            id={'connect2ledger-button'}
            container
            xs={12}
            alignItems={'center'}
            gap={2}
            onClick={handleConnectLedger}
            role="button"
            sx={{
              height: '3.5rem',
              padding: '0.75rem 1.25rem',
              cursor: 'pointer',
              ':hover': {
                background: theme.palette.background.level2,
              },
              ':active': {
                background: theme.palette.background.level1,
              },
            }}
          >
            <Grid xs={0.7} display={'flex'} alignItems={'center'} gap={'0.5rem'}>
              <LedgerIcon size={18} color={theme.palette.text.primary} />
            </Grid>
            <Grid xs={1.7} container alignItems={'center'} sx={{ gap: '0.5rem' }}>
              <Typography variant="body1" component={'p'} color={'text.primary'} fontWeight={600}>
                Ledger
              </Typography>
            </Grid>
            <Grid xs={2}>
              <Tooltip
                title={t('Ledger integration is in beta. Please report any issues you encounter using the feedback tool from the top bar.')}
                disableInteractive
                arrow
              >
                <BetaBox />
              </Tooltip>
            </Grid>
            <Grid xs={6} container alignItems={'center'} gap={1}>
              {renderStatusIcon(ledgerIsLoading ? 'loading' : ledgerError ? 'error' : 'success')}
              <Typography variant="caption" component={'p'} color={'text.secondary'}>
                {ledgerIsLoading ? t('Connecting...') : ledgerError ? ledgerError : null}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      {/* Address tracker */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          width: '100%',
          padding: '0 1rem 1rem 1rem',
        }}
      >
        <Typography variant="caption" component={'p'} color={'text.secondary'}>
          {t('or just track an address')}
        </Typography>
        <TextField
          id={'track-address-input'}
          label={t('Address')}
          size="large"
          color="level1"
          name="amount"
          type="string"
          InputProps={{ inputProps: { min: 0 } }}
          onChange={debouncedChangeHandler}
          fullWidth
          error={Boolean(inputError)}
          helperText={inputError ? error : undefined}
          onKeyDown={handleKeyDown}
        />
        <Button
          id={'track-address-button'}
          variant={'contained'}
          onClick={handleTrackAddress}
          disabled={!address}
          sx={{ borderRadius: '0.375rem', height: '2.75rem' }}
        >
          {t('Track address')}
        </Button>
      </Box>
    </Box>
  )
}

export default WalletOptions
