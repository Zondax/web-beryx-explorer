import React, { SetStateAction, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import Turnstile from 'react-turnstile'

import { CloudflareTurnstileSiteKey } from '@/config/config'
import useWalletStore from '@/store/wallets/wallet'
import { Wallet } from '@carbon/icons-react'
import { Button, Divider, Grid, TextField, Typography, useTheme } from '@mui/material'

import { InputProps } from '../FaucetView'

/**
 * WalletNotConnected is a functional component that handles the state when the wallet is not connected.
 * It takes in four props: input, handleInput, setChallengeToken, and getTokensButton.
 *
 * @param props - The properties passed to the component.
 * @param props.input - The input properties.
 * @param props.handleInput - The function to handle input changes.
 * @param props.setChallengeToken - The function to set the challenge token.
 * @param props.getTokensButton - The JSX element for the get tokens button.
 *
 * @returns The WalletNotConnected component.
 */
const WalletNotConnected = ({
  input,
  handleInput,
  setChallengeToken,
  getTokensButton,
}: {
  input: InputProps
  handleInput: (props: InputProps) => void
  setChallengeToken: (value: SetStateAction<string>) => void
  getTokensButton: JSX.Element
}) => {
  const theme = useTheme()
  const { t } = useTranslation()

  const { setOpenWallet } = useWalletStore(s => s)

  /**
   * This function handle any change on the input field and sanitize it
   */
  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      handleInput({ error: undefined })
      let filteredInput = event.target.value
      filteredInput = filteredInput.toLowerCase()
      filteredInput = filteredInput.replace(/ /g, '')
      if (filteredInput === '') {
        handleInput({ value: undefined })
        return
      }
      handleInput({ value: filteredInput })
    },
    [handleInput]
  )

  /**
   * This function is responsible for showing the wallet connect option.
   * It sets the state of the wallet to open.
   */
  const handleConnectWallet = useCallback(() => {
    setOpenWallet(true)
  }, [setOpenWallet])

  /**
   * This function is responsible for setting the token.
   */
  const handleOnVerifyCaptcha = useCallback((token: string) => setChallengeToken(token), [setChallengeToken])

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="body1" sx={{ maxWidth: '50ch', textAlign: 'left', marginBottom: '1rem' }}>
          {t('Type in your Filecoin address or connect your wallet to receive hyperspace test FIL.')}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="outlined-required"
          label={t('Filecoin address')}
          size="large"
          color="level0"
          value={input.value ?? ''}
          onChange={handleInputChange}
          error={input.error !== undefined}
          helperText={input.error}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} mt={'16px'} sx={{ iframe: { width: '100% !important' } }}>
        <Turnstile sitekey={CloudflareTurnstileSiteKey} onVerify={handleOnVerifyCaptcha} theme={theme.palette.mode} />
      </Grid>
      <Grid item mt={2} xs={12}>
        {getTokensButton}
      </Grid>

      <Grid item mt={2} xs={12}>
        <Divider component="div" role="presentation">
          <Typography variant="caption" color="text.secondary">
            or
          </Typography>
        </Divider>
      </Grid>
      <Grid item mt={2} xs={12}>
        <Button
          id="connect-wallet-metamask-faucet"
          onClick={handleConnectWallet}
          variant={'contained'}
          startIcon={<Wallet size={20} />}
          size="large"
          fullWidth
          sx={{
            textTransform: 'capitalize',
            padding: '0.76rem 0.9rem 0.76rem 0.9rem',
          }}
        >
          {t('Connect Wallet to Run')}
        </Button>
      </Grid>
    </>
  )
}

export default WalletNotConnected
