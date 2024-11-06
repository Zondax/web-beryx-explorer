/**
 * `InteractView` is a component that provides an interface for interacting with smart contracts.
 */
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import useAppSettingsStore from '@/store/ui/settings'
import { themePath } from '@/theme/utils'
import { Button, CircularProgress, Grid, Unstable_Grid2 as Grid2, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import { FilEthAddress } from '@zondax/izari-filecoin/address'
import { NetworkPrefix } from '@zondax/izari-filecoin/artifacts'

const imageSize = 500

/**
 * `InteractView` is a functional component that provides an interface for interacting with smart contracts.
 * It uses the `useRouter` hook from `next/router` to handle routing.
 *
 * @returns The rendered JSX element
 */
const InteractView: React.FC = () => {
  const router = useRouter()
  const theme = useTheme()
  const { network } = useAppSettingsStore(state => ({ network: state.network }))
  const { t } = useTranslation()
  const upMd = useMediaQuery(theme.breakpoints.up('md'))

  const [inputValue, setInputValue] = useState<string | undefined>(undefined)
  const [inputError, setInputError] = useState<string | undefined>(undefined)
  const [status, setStatus] = useState<'fulfilled' | 'pending' | 'failed' | undefined>(undefined)

  /**
   * Handler for input field change event.
   *
   * @param event - The React.ChangeEvent targeting an input field
   */
  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputError(undefined)

      let filteredInput = event.target.value
      filteredInput = filteredInput.toLowerCase()
      filteredInput = filteredInput.replace(/ /g, '')
      if (filteredInput === '') {
        setInputValue(undefined)
        return
      }
      setInputValue(filteredInput)
    },
    [setInputError, setInputValue]
  )

  /**
   * Function for interacting with the contract.
   *
   * Gets called on submitting the form.
   * It will validate the address and navigate to the interaction page.
   */
  const gotToInteract = useCallback(() => {
    if (!inputValue) {
      return
    }

    setStatus('pending')

    if (inputValue?.startsWith('0x')) {
      try {
        const filAddr = FilEthAddress.fromEthAddress(NetworkPrefix.Mainnet, inputValue)
        router.push(`/fil/${network.name}/address/${filAddr}?tab=interact`, undefined, {
          shallow: true,
        })
        return
      } catch {
        setInputError(t('Invalid address') ?? '')
        setStatus('failed')
      }
    }

    try {
      FilEthAddress.fromString(inputValue).toEthAddressHex(true)
      router.push(`/fil/${network.name}/address/${inputValue}?tab=interact`, undefined, {
        shallow: true,
      })
    } catch {
      setInputError(t('Invalid address') ?? '')
      setStatus('failed')
    }
  }, [inputValue, router, network, t])

  return (
    <Grid2 container direction="column" sx={{ width: '100%', height: '80vh', display: 'flex', alignItems: 'center', padding: '0 1rem' }}>
      <Grid2
        container
        bgcolor="background.level0"
        sx={{
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '35rem',
          maxWidth: '100%',
          borderRadius: '12px',
          mt: '5rem',
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
            borderRadius: '8px',
            padding: '2rem',
            overflow: 'hidden',
          }}
        >
          <Image
            src={themePath('contract_ill.svg')}
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
            padding: '2rem',
          }}
        >
          <Grid container spacing={0} width={'100%'} maxWidth={'25.5rem'}>
            <Grid item xs={12} mb={'1rem'}>
              <Typography variant={upMd ? 'h3' : 'h5'} textAlign={upMd ? 'center' : 'left'}>
                {t('Interact with Smart Contracts')}
              </Typography>
            </Grid>
            <Grid item xs={12} mb={'3rem'}>
              <Typography
                variant={upMd ? 'body1' : 'body2'}
                component={'p'}
                color={'text.secondary'}
                textAlign={upMd ? 'center' : 'left'}
                maxWidth={'40ch'}
                margin={{ xs: 'unset', md: 'o auto' }}
              >
                {t(
                  'Explore the functionalities of your Smart Contract. Invoke methods, set input parameters, transfer tokens, interpret ABI, and examine the source code.'
                )}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-required"
                label={t('Contract address')}
                size="large"
                color="level1"
                value={inputValue ?? ''}
                onChange={handleInputChange}
                error={inputError !== undefined}
                helperText={inputError}
                fullWidth
              />
            </Grid>
            <Grid item container spacing={1} mt={'0.5rem'} xs={12} alignItems={'flex-start'}>
              <Grid item xs={12}>
                <Button
                  id={'interact-with-contract'}
                  onClick={gotToInteract}
                  disabled={inputValue === undefined || inputError !== undefined}
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={{
                    height: 'fit-content',
                    minWidth: '10rem',
                  }}
                >
                  <input hidden type="submit" />

                  <Typography variant="body1" fontFamily={'Sora'} fontWeight={500} sx={{ color: 'inherit' }} alignItems={'center'}>
                    {status === 'pending' ? (
                      <CircularProgress variant="indeterminate" color="secondary" size="small" thickness={8} />
                    ) : (
                      t('Interact')
                    )}
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid2>
      </Grid2>
    </Grid2>
  )
}

export default InteractView
