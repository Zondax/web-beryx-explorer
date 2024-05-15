import axios, { AxiosError } from 'axios'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useBeryxApiToken } from '@/api-client/apiTokens'
import { BeryxToken } from '@/api-client/auth'
import { fetchAddressValid, fetchFilForm } from '@/api-client/beryx'
import { getBeryxUrl } from '@/config/config'
import useAppSettingsStore from '@/store/ui/settings'
import useWalletStore from '@/store/wallets/wallet'
import { Button, CircularProgress, Grid, Unstable_Grid2 as Grid2, Typography, useTheme } from '@mui/material'

import { FaucetErrorContent, SuccessContent, WalletConnected, WalletNotConnected } from './components'

const imageSize = 500

type faucetErrors = 'too_many_requests' | 'default'

const faucter_error_messages: { [key in faucetErrors]: string } = {
  too_many_requests: "Kindly hold on for a moment, it seems you've made a recent token request.",
  default: 'There was an error in the Faucet. Please use the feedback tool in the navbar to report it.',
}

/**
 * InputProps
 * @property value - The value of the input field.
 * @property error - The error message related to the input field.
 */
export interface InputProps {
  value?: string
  error?: string
}

/**
 * @class FaucetView
 * @description This component contains the logic and UI of the Faucet feature.
 */
const FaucetView = () => {
  // Hooks and stores
  const theme = useTheme()
  const { network } = useAppSettingsStore(state => ({ network: state.network }))
  const { data: authToken } = useBeryxApiToken()

  const { isConnected } = useWalletStore(s => s)
  const { filAddr } = useWalletStore(s => s.walletInfo)
  const { t } = useTranslation()

  // Local state
  const [step, setStep] = useState<number>(1)
  const [challengeToken, setChallengeToken] = useState<string>('')
  const [input, setInput] = useState<InputProps>({})
  const [faucetError, setFaucetError] = useState<string | undefined>(undefined)
  const [cid, setCid] = useState<string | undefined>(undefined)
  const [status, setStatus] = useState<'fulfilled' | 'pending' | 'failed' | undefined>(undefined)

  /**
   * @function handleInput
   * @description This function handles the input field state.
   * @param data - The new state of the input field.
   */
  const handleInput = useCallback(
    (data: InputProps) => {
      setInput(prev => ({ ...prev, ...data }))
    },
    [setInput]
  )

  useEffect(() => {
    if (isConnected) {
      setStep(2)
    } else {
      setStep(1)
    }
  }, [isConnected])

  /**
   * @function resetSteps
   * @description This function resets the steps of the faucet process.
   */
  const resetSteps = useCallback(() => {
    setStatus(undefined)
    setFaucetError(undefined)
    if (isConnected) {
      setStep(2)
    } else {
      setStep(1)
    }
  }, [isConnected, setStep, setStatus, setFaucetError])

  /**
   * @function reqTokens
   * @description This function requests tokens from the faucet.
   */
  const reqTokens = useCallback(
    async (authToken?: BeryxToken) => {
      setStatus('pending')
      if (!isConnected && !input.value) {
        return
      }
      let address
      if (isConnected) {
        address = filAddr
      } else if (input.value) {
        const isValid = await fetchAddressValid(input.value, network)
        if (!isValid) {
          setStatus('failed')
          handleInput({ error: t('Invalid address') })
          return
        }
        address = input.value
        if (input.value.startsWith('0x')) {
          const filAddr = await fetchFilForm(input.value, network)
          if (filAddr === 'error') {
            setStatus('failed')
            handleInput({ error: t('Invalid address') })
            return
          }
          address = filAddr
        }
      }

      try {
        const response = await axios.post(
          `${getBeryxUrl(network.chainSlug, network.name).faucet}`,
          {
            address,
            challenge: { data: challengeToken },
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              'Content-Type': 'application/json',
            },
          }
        )
        const data = response.data

        setStep(3)

        if (data.message.indexOf('too many requests') > -1) {
          setStatus('failed')
          setFaucetError(t(faucter_error_messages['too_many_requests']))
          return
        }

        if (data.message === 'challenge not passed') {
          setStatus('failed')
          setFaucetError(t(faucter_error_messages['default']))
          return
        }
        if (data.message === 'OK') {
          setStatus('fulfilled')
          setCid(data.cid)
        }
      } catch (error) {
        if (error instanceof AxiosError && error.response?.data.message.indexOf('too many requests') > -1) {
          setStatus('failed')
          setFaucetError(t(faucter_error_messages['too_many_requests']))
          return
        }

        setStatus('failed')
        setFaucetError(t(faucter_error_messages['default']))
      }
    },
    [challengeToken, filAddr, handleInput, input.value, isConnected, network, t]
  )

  const isGetTokensButtonDisabled =
    (input.value === undefined && !isConnected) || challengeToken === '' || input.error !== undefined || status === 'pending'

  const handleReqTokensButton = useCallback(() => reqTokens(authToken), [authToken, reqTokens])

  const getTokensButton = (
    <Button
      id="get-tokens-button"
      onClick={handleReqTokensButton}
      disabled={isGetTokensButtonDisabled}
      variant="contained"
      size="large"
      fullWidth
      sx={{
        height: 'fit-content',
        minWidth: '12rem',
      }}
    >
      <input hidden type="submit" />

      <Typography variant="body1" fontFamily={'Sora'} fontWeight={500} sx={{ color: 'inherit' }} alignItems={'center'}>
        {status === 'pending' ? <CircularProgress variant="indeterminate" color="secondary" size="small" thickness={8} /> : t('Get Tokens')}
      </Typography>
    </Button>
  )

  return (
    <Grid2 container direction="column" sx={{ width: '100%', display: 'flex', alignItems: 'center', padding: '0 1rem' }}>
      <Grid2
        container
        bgcolor="background.level0"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '40rem',
          maxWidth: '100%',
          borderRadius: '12px',
          marginTop: '5rem',
        }}
      >
        <Grid2
          container
          sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flex: '1 0 0',
            minHeight: '12rem',
            borderRadius: '12px 12px 0 0',
            padding: '2rem',
            overflow: 'hidden',
            borderBottom: '1px solid',
            borderColor: theme.palette.border?.level0,
          }}
        >
          <Image
            src={'/images/faucet_image_fil.svg'}
            alt={'warp'}
            height={imageSize}
            width={imageSize}
            style={{
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        </Grid2>
        <Grid2
          container
          bgcolor="background.level0"
          sx={{
            zIndex: 101,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            minHeight: '16rem',
            borderRadius: '0 0 8px 8px',
            padding: '2rem 3rem',
          }}
        >
          <Grid container spacing={0} width={'100%'}>
            <Grid item xs={12}>
              <Typography variant="body1" sx={{ textAlign: 'center', marginBottom: '0.2rem', zIndex: 99, textTransform: 'capitalize' }}>
                {network.name}
              </Typography>
              <Typography variant="h2" sx={{ textAlign: 'center', marginBottom: '0.5rem', zIndex: 100 }}>
                Faucet
              </Typography>
            </Grid>
            <Grid item xs={12}>
              {step === 1 && !faucetError && (
                <WalletNotConnected
                  input={input}
                  handleInput={handleInput}
                  setChallengeToken={setChallengeToken}
                  getTokensButton={getTokensButton}
                />
              )}
              {step === 2 && !faucetError && <WalletConnected getTokensButton={getTokensButton} setChallengeToken={setChallengeToken} />}
              {(step === 3 || faucetError) &&
                (faucetError ? (
                  <FaucetErrorContent faucetError={faucetError} resetSteps={resetSteps} />
                ) : (
                  <SuccessContent cid={cid} network={network} />
                ))}
            </Grid>
          </Grid>
        </Grid2>
      </Grid2>
    </Grid2>
  )
}
export default FaucetView
