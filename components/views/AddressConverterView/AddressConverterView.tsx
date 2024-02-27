/**
 * @file This file contains the AddressConverterView component which is used to convert addresses between Filecoin and Ethereum.
 */
import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { copyContent } from '@/utils/text'
import { ChevronDown, Copy, Renew } from '@carbon/icons-react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  CircularProgress,
  Grid,
  Unstable_Grid2 as Grid2,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { FilEthAddress } from '@zondax/izari-filecoin/address'
import { NetworkPrefix } from '@zondax/izari-filecoin/artifacts'

import { FAQData } from './FAQData'

/**
 * AddressConverterView is a component that allows users to convert addresses between Filecoin and Ethereum.
 * It provides a user interface for inputting an address, selecting the conversion direction, and displaying the converted address.
 * It also includes a section for frequently asked questions.
 */
const AddressConverterView = () => {
  const theme = useTheme()
  const { t } = useTranslation()
  const upMd = useMediaQuery(theme.breakpoints.up('md'))

  const [expanded, setExpanded] = useState<string | false>('panel1')

  const [inputValue, setInputValue] = useState<string | undefined>(undefined)
  const [resultAddress, setResultAddress] = useState<string | undefined>(undefined)
  const [inputError, setInputError] = useState<string | undefined>(undefined)
  const [conversionWay, setConversionWay] = useState<'FIL2ETH' | 'ETH2FIL'>('FIL2ETH')
  const [status, setStatus] = useState<'fulfilled' | 'pending' | 'failed' | undefined>(undefined)

  /**
   * handleInputChange is a function that handles the change event of the input field.
   * It sets the input value and clears any input errors.
   * @param event - The change event of the input field.
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
   * convertAddress is an asynchronous function that converts the input address based on the selected conversion direction.
   * It sets the status to 'pending' before starting the conversion, and to 'fulfilled' or 'failed' depending on the result.
   */
  const convertAddress = useCallback(
    async function () {
      if (!inputValue) {
        return
      }

      setStatus('pending')

      if (conversionWay === 'FIL2ETH') {
        try {
          const ethAddr = FilEthAddress.fromString(inputValue).toEthAddressHex(true)
          setResultAddress(ethAddr)
          setStatus('fulfilled')
          return
        } catch {
          setInputError(t('Invalid address') ?? '')
          setStatus('failed')
          return
        }
      }

      try {
        const filAddr = await FilEthAddress.fromEthAddress(NetworkPrefix.Mainnet, inputValue)
        setResultAddress(filAddr.toString())
        setStatus('fulfilled')
        return
      } catch {
        setInputError(t('Invalid address') ?? '')
        setStatus('failed')
        return
      }
    },
    [inputValue, conversionWay, t]
  )

  /**
   * swapWay is a function that swaps the conversion direction and clears the result address and input error.
   */
  const swapWay = useCallback(
    function () {
      setResultAddress(undefined)
      setInputError(undefined)
      if (conversionWay === 'FIL2ETH') {
        setConversionWay('ETH2FIL')
        return
      }
      setConversionWay('FIL2ETH')
    },
    [conversionWay]
  )

  /**
   * handleChange is a function that handles the change event of the accordion.
   * It sets the expanded panel based on the new expanded state.
   * @param panel - The panel that the change event occurred on.
   * @returns - A function that handles the change event.
   */
  function handleChange(panel: string) {
    return function (event: React.SyntheticEvent, newExpanded: boolean) {
      setExpanded(newExpanded ? panel : false)
    }
  }

  /**
   * renderContent is a function that renders the content of the conversion button based on the status and conversion direction.
   * @returns - The content of the conversion button.
   */
  const renderContent = () => {
    if (status === 'pending') {
      return <CircularProgress variant="indeterminate" color="secondary" size="small" thickness={8} />
    }

    if (conversionWay === 'FIL2ETH') {
      return `${t('Convert to ')} ETH`
    }

    return `${t('Convert to ')} FIL`
  }

  const handleCopyButton = useCallback(() => copyContent(resultAddress ?? ''), [resultAddress])

  return (
    <Box
      sx={{
        // Eliminate the topbar and header height
        height: upMd ? 'calc(100dvh - 2.25rem - 4rem)' : 'fit-content',
        minHeight: '30rem',
        transition: { xs: 'height 0.2s ease-in-out', md: 'none' },
        width: '100%',
        display: 'flex',
        flexDirection: upMd ? 'row' : 'column',
        gap: upMd ? '1rem' : '3rem',
        borderRadius: '8px',
        background: theme.palette.background.level1,
        padding: upMd ? '1rem' : '1rem 0.5rem 0.5rem 0.5rem',
      }}
      key={'results view panel'}
    >
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Grid2
          container
          sx={{
            zIndex: 101,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            minHeight: '16rem',
          }}
        >
          <Grid item container spacing={0} width={'100%'} maxWidth={{ xs: '100%', md: '25rem' }} marginTop={{ xs: '1rem', md: '0' }}>
            <Grid item xs={12}>
              <Typography variant={upMd ? 'h3' : 'h5'} textAlign={upMd ? 'center' : 'left'}>
                {t('Address converter')}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant={upMd ? 'body1' : 'body2'}
                component={'p'}
                color={'text.secondary'}
                mt={0.5}
                mb={'2rem'}
                textAlign={upMd ? 'center' : 'left'}
              >
                {conversionWay === 'FIL2ETH'
                  ? t('Type in a Filecoin Address to see its Ethereum version and vice versa.')
                  : t('Type in an Ethereum Address to see its Filecoin version and vice versa.')}
              </Typography>
              <Grid item xs={12}>
                <TextField
                  id="converter-incoming-address"
                  label={conversionWay === 'FIL2ETH' ? t('Filecoin address') : t('Ethereum address')}
                  size="large"
                  color="level1"
                  value={inputValue ?? ''}
                  onChange={handleInputChange}
                  error={inputError !== undefined}
                  helperText={inputError}
                  fullWidth
                />
              </Grid>
              <Grid item container spacing={1} mt={'0.5rem'} xs={12} alignItems={'flex-start'} flexWrap={'nowrap'}>
                <Grid item width={'100%'}>
                  <Button
                    id={`convert-to-${conversionWay === 'FIL2ETH' ? 'eth' : 'fil'}`}
                    onClick={convertAddress}
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
                      {renderContent()}
                    </Typography>
                  </Button>
                </Grid>
                <Grid item width={'fit-content'}>
                  <Button
                    onClick={swapWay}
                    variant="contained"
                    size="large"
                    sx={{
                      height: 'fit-content',
                      minWidth: '1rem',
                    }}
                  >
                    <Renew size={20} color={'#fff'} />
                  </Button>
                </Grid>
              </Grid>
              <Grid item xs={12} mt={'0.5rem'} sx={{ minHeight: '6.25rem' }}>
                {resultAddress && (
                  <TextField
                    id="converter-outgoing-address"
                    label={conversionWay === 'FIL2ETH' ? t('Ethereum address') : t('Filecoin address')}
                    color="level1"
                    value={resultAddress}
                    onChange={handleInputChange}
                    sx={{ marginTop: '0.5rem' }}
                    multiline
                    maxRows={4}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton color="info" onClick={handleCopyButton} sx={{ color: theme.palette.text.secondary }}>
                            <Copy />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    fullWidth
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid2>
      </Box>
      <Box
        sx={{
          height: '100%',
          width: upMd ? '35rem' : '100%',
          flexShrink: '0',
          display: 'flex',
          justifySelf: 'flex-end',
          flexDirection: 'column',
          borderRadius: '8px',
          background: upMd ? theme.palette.background.level2 : 'transparent',
          padding: upMd ? '1.25rem 1rem 1rem 1rem' : 'none',
          overflow: 'auto',
        }}
      >
        <Typography variant="h5" mb={'1.25rem'} fontWeight={700}>
          {t('Frequently Asked Questions')}
        </Typography>
        {FAQData(t).map((item, index) => (
          <Accordion key={`Accordion ${item.question}`} expanded={expanded === index.toString()} onChange={handleChange(index.toString())}>
            <AccordionSummary expandIcon={<ChevronDown />}>
              <Typography variant="h5">{item.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="caption" color="text.tertiary">
                {item.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
        <Typography variant="caption" component={'p'} mt={'2rem'} color="text.tertiary">
          {t('For more information about addresses, please visit')}{' '}
          <Link href="https://docs.filecoin.io/basics/the-blockchain/addresses/" target="_blank">
            Addresses
          </Link>{' '}
          or{' '}
          <Link href="https://docs.filecoin.io/smart-contracts/filecoin-evm-runtime/address-types/#delegated-addresses" target="_blank">
            Address type
          </Link>{' '}
          {t('articles from Filecoins documentation.')}
        </Typography>
      </Box>
    </Box>
  )
}
export default AddressConverterView
