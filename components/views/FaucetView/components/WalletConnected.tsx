/**
 * This is the WalletConnected component that handles wallet connections and displays appropriate UI responses
 *
 * @component
 * @param   {Object}    props                     The component props.
 * @param   {React.JSX.Element}    props.getTokensButton   A JSX element for the "Get Tokens" button.
 * @param   {Function}  props.setChallengeToken   A function to set the challenge token, typically called upon successful wallet verification.
 *
 * @example
 * <WalletConnected
 *    getTokensButton={<button id="token-button">Get Tokens</button>}
 *    setChallengeToken={(token: string) => console.log(token)}
 * />
 *
 * @return  {ReactNode}                           Displays the layout based on the connection status of the wallet.
 */
import React, { SetStateAction, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import Turnstile from 'react-turnstile'

import { truncateMaxCharacters } from '@/config/config'
import { ObjectType } from '@/routes/parsing'
import { useAppSettingsStore } from '@/store/ui/settings'
import useWalletStore from '@/store/wallets/wallet'
import { Alert, Box, Grid, Typography, useTheme } from '@mui/material'

import { BeryxLink } from '../../../common'

/**
 * WalletConnected is a component that handles wallet connections and displays appropriate UI responses.
 *
 * @param props - The component props.
 * @param props.getTokensButton - A JSX element for the "Get Tokens" button.
 * @param props.setChallengeToken - A function to set the challenge token, typically called upon successful wallet verification.
 *
 * @returns - Displays the layout based on the connection status of the wallet.
 */
const WalletConnected = ({
  getTokensButton,
  setChallengeToken,
}: {
  getTokensButton: React.JSX.Element
  setChallengeToken: (value: SetStateAction<string>) => void
}) => {
  const theme = useTheme()
  const { t } = useTranslation()
  const { network } = useAppSettingsStore(state => ({ network: state.network }))
  const { filAddr, network: walletNetwork } = useWalletStore(s => s.walletInfo)

  /**
   * This function is responsible for setting the token.
   */
  const handleOnVerifyCaptcha = useCallback((token: string) => setChallengeToken(token), [setChallengeToken])

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="body1" sx={{ maxWidth: '50ch', textAlign: 'left', marginBottom: '1rem' }}>
          {t('Well done! You have connected your wallet. Press the button to receive test FIL.')}
        </Typography>
      </Grid>
      <Grid item xs={12} mb={'1rem'}>
        {filAddr ? (
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem' }}>
            <Typography variant="caption" color={'text.secondary'} sx={{ marginBottom: '0rem', textAlign: 'center' }}>
              Address:
            </Typography>
            <Box sx={{ backgroundColor: theme.palette.background.level2, padding: '0 0 0 0.75rem', borderRadius: '4px' }}>
              <BeryxLink
                inputType={ObjectType.ADDRESS}
                value={filAddr}
                network={walletNetwork}
                isColored={false}
                limitCharacters={truncateMaxCharacters}
              />
            </Box>
          </Box>
        ) : null}
      </Grid>

      {walletNetwork?.uniqueId !== network.uniqueId ? (
        <Grid item xs={12} mb={'1rem'}>
          <Alert severity="warning" variant={'outlined'} sx={{ padding: '0.5rem 1rem' }}>
            {t(
              'Your account is connected with a different network. If you proceed, we will send funds to this address but in the Filecoin Calibration network.'
            )}
          </Alert>
        </Grid>
      ) : undefined}
      <Grid item xs={12}>
        <Turnstile
          sitekey={process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY ?? ''}
          onVerify={handleOnVerifyCaptcha}
          theme={theme.palette.mode}
        />
      </Grid>
      <Grid item mt={2} xs={12}>
        {getTokensButton}
      </Grid>
    </>
  )
}

export default WalletConnected
