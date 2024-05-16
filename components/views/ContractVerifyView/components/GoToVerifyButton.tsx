import { useRouter } from 'next/router'
import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { fetchFilForm } from '@/api-client/beryx'
import { useContractsStore } from '@/store/ui/contracts'
import useAppSettingsStore from '@/store/ui/settings'
import { Search } from '@carbon/icons-react'
import { Box, CircularProgress, Grid, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'

/**
 * GoToVerifyButton Component
 *
 * Contains form for entering a contract address and a navigation feature on successful verification
 */
const GoToVerifyButton = () => {
  const router = useRouter()
  const { t } = useTranslation()
  const upMd = useMediaQuery(useTheme().breakpoints.up('md'))

  const { network } = useAppSettingsStore(state => ({ network: state.network }))
  const handleForm = useContractsStore.getState().handleForm

  const [inputValue, setInputValue] = useState<string | undefined>(undefined)
  const [inputError, setInputError] = useState<string | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(false)

  /**
   * handleInputChange event handler
   * @param event change event
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
   * goToVerify perform validation on entered contract address and perform navigation
   */
  const goToVerify = useCallback(async () => {
    if (!inputValue) {
      setInputError('Please enter the contract address.')
      return
    }
    setLoading(true)
    let searchValue = inputValue

    const filForm = await fetchFilForm(inputValue, network)
    if (!filForm) {
      setLoading(false)
      setInputError(t("Sorry! We don't recognize this address. Please double check, there might be a typo.") ?? '')
      return
    }

    if (!upMd) {
      setLoading(false)
      setInputError(t("Sorry! We don't have this functionality for mobile version. Please try it on desktop version.") ?? '')
      return
    }

    searchValue = filForm

    handleForm(true)
    router.push(`/search/fil/${network.name}/address/${searchValue}`, undefined, {
      shallow: true,
    })
  }, [inputValue, setInputError, setLoading, handleForm, network, router, t, upMd])

  /**
   * handleKeyDown event handler
   * @param event keydown event
   */
  const handleKeyDown = useCallback(
    async (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        await goToVerify()
      }
    },
    [goToVerify]
  )

  return (
    <Grid
      container
      gap={1}
      sx={{
        width: { xs: '100%', sm: 'fit-content' },
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        flex: 'auto',
        position: 'relative',
      }}
    >
      {loading ? <CircularProgress size={16} sx={{ position: 'absolute', right: '1rem', top: '50%', zIndex: '200' }} /> : null}
      <TextField
        id="outlined-required"
        label={
          <Box display="flex" gap={'0.5rem'} alignItems={'center'}>
            <Search />
            <Typography variant="body1" textTransform={'none'}>
              {t('Contract Address')}
            </Typography>
          </Box>
        }
        size="large"
        color="level1"
        value={inputValue ?? ''}
        onChange={handleInputChange}
        sx={{
          marginTop: '1rem',
        }}
        error={inputError !== undefined}
        helperText={inputError}
        fullWidth
        onKeyDown={handleKeyDown}
      />
    </Grid>
  )
}
export default GoToVerifyButton
