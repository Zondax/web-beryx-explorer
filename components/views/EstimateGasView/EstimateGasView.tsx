/**
 * @file This file contains the AddressConverterView component which is used to convert addresses between Filecoin and Ethereum.
 */
import { HTMLAttributes, SyntheticEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { LoadingStatus } from '@/config/config'
import { useEstimateGasByMethod, useServiceConfig } from '@/data/beryx'
import useAppSettingsStore from '@/store/ui/settings'
import { sortArray } from '@/utils/arrays'
import { getLoadingStatus } from '@/utils/loadingStatus'
import { ExpandMore } from '@mui/icons-material'
import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteRenderInputParams,
  Box,
  Grid,
  Unstable_Grid2 as Grid2,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'

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
  const handleMethod = useCallback(
    (
      _event: SyntheticEvent<Element, Event>,
      value: string | null,
      _reason: AutocompleteChangeReason,
      _details?: AutocompleteChangeDetails<string> | undefined
    ) => {
      setSelectedMethod(value ?? undefined)
    },
    []
  )

  const methods = useMemo(() => {
    const availableMethods = serviceConfig?.fees.estimate.allowed_methods
    if (availableMethods?.length) {
      const methodsArray = availableMethods.map(({ method_name }) => method_name)
      return sortArray(methodsArray, ['InvokeContract', 'Send'])
    }
    return []
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

  // This component renders an Autocomplete input field.
  const renderAutocompleteInput = useCallback(
    (params: AutocompleteRenderInputParams) => <TextField {...params} id="method" label={t('Method')} />,
    [t]
  )

  // This component provides a custom Paper component for wrapping children.
  const getPaperComponent = useCallback(
    ({ children }: HTMLAttributes<HTMLElement>) => <Paper style={{ backgroundColor: theme.palette.background.level1 }}>{children}</Paper>,
    [theme]
  )

  // This component renders an ItemTile with dynamic content based on gas estimation data.
  const getCategoryItem = useCallback(
    (probability: number, category: string) => (
      <Grid item xs={12} md={4} key={`estimate gas - ${category}`}>
        <ItemTile
          title={category}
          loading={isLoadingServiceConfig ? LoadingStatus.Loading : getLoadingStatus(isLoadingGasEstimation, isSuccessGasEstimation)}
          size="medium"
          hasBorder
          subheader={
            <Typography
              variant="subtitle1"
              component={'p'}
              data-testid={'item-tile-heading'}
              sx={{ span: { color: theme.palette.text.primary } }}
              pt={'8px'}
            >
              <span>{probability * 100}%</span> {t('chances to get in the next block')}
            </Typography>
          }
        >
          <Grid container>
            {/* Renders a row with gas limit data */}
            {renderRow('Gas Limit', 'attoFIL', gasEstimation?.find(elem => probability === elem.probability)?.gas_limit.toString() ?? '-')}
            {/* Renders a row with gas premium data */}
            {renderRow(
              'Gas Premium',
              'attoFIL',
              gasEstimation?.find(elem => probability === elem.probability)?.gas_premium.toString() ?? '-'
            )}
          </Grid>
        </ItemTile>
      </Grid>
    ),
    [isLoadingServiceConfig, isLoadingGasEstimation, isSuccessGasEstimation, theme.palette, gasEstimation, renderRow, t]
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
        height: { xs: 'fit-content', md: 'calc(100dvh - 6rem - 1.75rem)' },
        minHeight: '40rem',
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
            <Typography variant={upMd ? 'h3' : 'h5'} component={'h1'} textAlign={upMd ? 'center' : 'left'}>
              {t('Gas Estimator')}
            </Typography>
          </Grid>
          <Grid item xs={12} p={{ xs: '0 1rem', md: 0 }}>
            <Typography
              variant={upMd ? 'body1' : 'body2'}
              component={'p'}
              color={'text.secondary'}
              mt={1}
              mb={'2.5rem'}
              textAlign={upMd ? 'center' : 'left'}
            >
              {t(
                'Find out what are the chances to get in the next block. Please choose a method as gas prices vary depending on the method. A block is created every 30 seconds.'
              )}
            </Typography>
            <Grid item xs={12}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={methods}
                size="large"
                onChange={handleMethod}
                PaperComponent={getPaperComponent}
                popupIcon={<ExpandMore />}
                renderInput={renderAutocompleteInput}
                noOptionsText={t('No available methods')}
              />
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
        <Typography variant="h5" component={'h3'} data-testid={'item-tile-heading'} pb={6} fontSize={18} textAlign={'center'}>
          {t('Probability to get in the next block')}
        </Typography>
        <Grid container spacing={'1rem'} maxWidth={{ md: '95%', lg: '80%' }}>
          {[
            { probability: 0.5, category: 'Low' },
            { probability: 0.7, category: 'Medium' },
            { probability: 0.9, category: 'High' },
          ].map(({ probability, category }) => getCategoryItem(probability, category))}
        </Grid>
      </Grid2>
    </Box>
  )
}
export default EstimateGasView
