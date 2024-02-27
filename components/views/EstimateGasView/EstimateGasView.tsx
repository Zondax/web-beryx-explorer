/**
 * @file This file contains the AddressConverterView component which is used to convert addresses between Filecoin and Ethereum.
 */
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { LoadingStatus } from '@/config/config'
import { useEstimateGasByMethod, useServiceConfig } from '@/data/beryx'
import { useAppSettingsStore } from '@/store/ui/settings'
import { getLoadingStatus } from '@/utils/loadingStatus'
import { ExpandMore } from '@mui/icons-material'
import { Box, Grid, Unstable_Grid2 as Grid2, MenuItem, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'

import { TxTypeLabel } from 'components/common'
import { ItemTile } from 'components/widgets/Charts'

/**
 * EstimateGasView is a component that allows users to find out the probability of getting into the next block based on gas estimation.
 * @component
 */
const EstimateGasView = () => {
  const theme = useTheme()
  const { t } = useTranslation()
  const upMd = useMediaQuery(theme.breakpoints.up('md'))
  const network = useAppSettingsStore.getState().network

  const { data: serviceConfig, isLoading: isLoadingServiceConfig } = useServiceConfig(network)

  const [selectedMethod, setSelectedMethod] = useState<string | undefined>(undefined)

  const {
    data: gasEstimation,
    isLoading: isLoadingGasEstimation,
    isSuccess: isSuccessGasEstimation,
  } = useEstimateGasByMethod(network, selectedMethod)

  /**
   * HandleMethod is a function that handles the change event of the input method field.
   * @param {ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} event - The change event of the input field.
   */
  const handleMethod = useCallback((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSelectedMethod(event.target.value)
  }, [])

  /**
   * Memoized function that generates the list of available methods for gas estimation.
   * It maps through the allowed methods from the service configuration and creates MenuItems for each.
   *
   * @returns {React.ReactNode} List of MenuItems containing available gas estimation methods.
   */
  const methodSelectItems = useMemo(() => {
    const availableMethods = serviceConfig?.fees.estimate.allowed_methods
    if (availableMethods?.length) {
      return availableMethods.map(({ method_name }) => (
        <MenuItem key={`method - ${method_name}`} value={method_name} id={`methodItem - ${method_name}`}>
          <Typography variant={'body2'} color="text.primary" sx={{ textTransform: 'capitalize' }}>
            {method_name}
          </Typography>
        </MenuItem>
      ))
    }
    return (
      <MenuItem>
        <Typography variant={'body2'} color="text.primary">
          No available methods
        </Typography>
      </MenuItem>
    )
  }, [serviceConfig])

  /**
   * Callback function that renders a pair of grid items for a given title and value.
   *
   * @param {string} title - The title of the row.
   * @param {string} value - The value of the row.
   * @returns {React.ReactNode} Grid items containing the title and value.
   */
  const renderRow = useCallback(
    (title: string, unit: string, value: string) => (
      <>
        <Grid item xs={6} display={'flex'} alignItems={'center'}>
          <Typography variant="subtitle1" data-testid={'item-tile-heading'} pt={'1px'}>
            {t(title)} {`(${unit})`}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography
            variant="captionMono"
            color="text.primary"
            textAlign={'right'}
            sx={{ whitSspace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: 16 }}
          >
            {value}
          </Typography>
        </Grid>
      </>
    ),
    [t]
  )

  /**
   * useEffect hook to set the default selected method when the service configuration is available.
   * It sets the selected method to 'Send' if available, otherwise, it selects the first available method.
   */
  useEffect(() => {
    if (serviceConfig && serviceConfig.fees.estimate.allowed_methods.length !== 0) {
      const sendMethod = serviceConfig.fees.estimate.allowed_methods.find(({ method_name }) => method_name === 'Send')
      setSelectedMethod(sendMethod?.method_name ?? serviceConfig.fees.estimate.allowed_methods[0].method_name)
    }
  }, [serviceConfig])

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
        alignItems: 'center',
        justifyContent: 'center',
      }}
      key={'estimate gas view'}
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
        <Grid
          item
          container
          spacing={0}
          width={'100%'}
          maxWidth={{ xs: '100%', md: '30rem' }}
          marginTop={{ xs: '1rem', md: '0' }}
          pb={'4rem'}
        >
          <Grid item xs={12} p={{ xs: '0 1rem', md: 0 }}>
            <Typography variant={upMd ? 'h3' : 'h5'} textAlign={upMd ? 'center' : 'left'}>
              {t('Gas Estimator')}
            </Typography>
          </Grid>
          <Grid item xs={12} p={{ xs: '0 1rem', md: 0 }}>
            <Typography
              variant={upMd ? 'body1' : 'body2'}
              component={'p'}
              color={'text.secondary'}
              mt={0.5}
              mb={'2rem'}
              textAlign={upMd ? 'center' : 'left'}
            >
              {t(
                'Find out what are the chances to get in the next block. Please choose a method as gas prices vary depending on the method. A block is created every 30 seconds.'
              )}
            </Typography>
            <Grid item xs={12}>
              <TextField
                id="method"
                label={t('Method')}
                size="large"
                color="level1"
                value={selectedMethod ?? ''}
                onChange={handleMethod}
                select
                fullWidth
                SelectProps={{
                  IconComponent: ExpandMore,
                }}
              >
                {methodSelectItems}
              </TextField>
            </Grid>
          </Grid>
        </Grid>
        {selectedMethod ? (
          <Grid container gap={'0.5rem'} justifyContent={'center'} pb={'0.5rem'}>
            <Typography variant="body2" pt={'3px'}>
              {t('Method')}:
            </Typography>
            <TxTypeLabel label={`${selectedMethod[0].toUpperCase()}${selectedMethod.slice(1)}`} />
          </Grid>
        ) : null}
        <Typography variant="h5" data-testid={'item-tile-heading'} pb={2} fontSize={16} textAlign={'center'}>
          {t('Probability to get in the next block')}
        </Typography>
        <Grid container spacing={'1rem'} maxWidth={{ md: '80%' }}>
          {[
            { probability: 0.5, category: 'Low' },
            { probability: 0.7, category: 'Medium' },
            { probability: 0.9, category: 'High' },
          ].map(({ probability, category }) => (
            <Grid item xs={12} md={4} key={`estimate gas - ${category}`}>
              <ItemTile
                title={category}
                loading={isLoadingServiceConfig ? LoadingStatus.Loading : getLoadingStatus(isLoadingGasEstimation, isSuccessGasEstimation)}
                size="medium"
                hasBorder
                subheader={
                  <Typography
                    variant="subtitle1"
                    data-testid={'item-tile-heading'}
                    sx={{ span: { color: theme.palette.text.primary } }}
                    pt={'2px'}
                  >
                    <span>{probability * 100}%</span> {t('chances to get in the next block')}
                  </Typography>
                }
              >
                <Grid container>
                  {renderRow(
                    'Gas Limit',
                    'attoFIL',
                    gasEstimation?.find(elem => probability == elem.probability)?.gas_limit.toFixed(2) ?? '-'
                  )}
                  {renderRow(
                    'Gas Premium',
                    'attoFIL',
                    gasEstimation?.find(elem => probability == elem.probability)?.gas_premium.toFixed(2) ?? '-'
                  )}
                </Grid>
              </ItemTile>
            </Grid>
          ))}
        </Grid>
      </Grid2>
    </Box>
  )
}
export default EstimateGasView
