/**
 * Form component for smart contract verification
 * @module components/SmartContract/Form
 */
import { FormikProps } from 'formik'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import Turnstile from 'react-turnstile'

import { ContractVerificationRequirements } from '@/api-client/beryx.types'
import { CloudflareTurnstileSiteKey } from '@/config/config'
import { useSearchStore } from '@/store/data/search'
import { Alert, Box, FormHelperText, Grid, Typography, useTheme } from '@mui/material'

import FilecoinIcon from '../../../Icons/Filecoin'
import { SourceCode, VerifyButton } from './Sections'

/**
 * Form component for smart contract verification.
 * @function
 * @name Form
 * @param formik - Formik library functions and values.
 * @param address - Contract address.
 * @returns The rendered component.
 */

const Form = ({ formik, address }: { formik: FormikProps<ContractVerificationRequirements>; address: string | undefined }) => {
  const theme = useTheme()
  const searchNetwork = useSearchStore(s => s.searchInputNetwork)
  const { t } = useTranslation()

  /**
   * This function is responsible for setting the token.
   */
  const handleOnVerifyCaptcha = useCallback((token: string) => formik.setFieldValue('cloudflare', token), [formik])

  return (
    <Grid container flexDirection={'column'} gap={'2rem'} justifyContent={'space-between'}>
      <Grid container flexDirection={'column'} width={'100%'} justifyContent={'center'}>
        <Typography variant="h3" textAlign={'center'} mb={'1rem'}>
          {t('Verify contract')}
        </Typography>
        <Typography variant="body1" mb={'1rem'}>
          {t('Source code verification provides transparency for users interacting with smart contracts.')}
        </Typography>
        <Box mb={'1rem'}>
          <Typography variant="body1" gutterBottom>
            {t('Contract address')}:
          </Typography>
          <Typography variant="captionMono">{address}</Typography>
        </Box>

        <Typography variant="body1" gutterBottom>
          Network:
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: '0.5rem',
            alignItems: 'center',
          }}
        >
          <FilecoinIcon size={14} />
          <Typography variant="caption" textTransform={'capitalize'}>
            {searchNetwork?.name}
          </Typography>
        </Box>
      </Grid>
      <Alert severity="warning" variant={'outlined'} sx={{ padding: '0.5rem 1rem' }}>
        {t('We currently do not offer support for upgradable and proxy contracts.')}
      </Alert>
      <Box width={'100%'}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={4}>
            <SourceCode formik={formik} address={address} />
            <Grid item container justifyContent={'center'} xs={12}>
              <Box>
                <Turnstile sitekey={CloudflareTurnstileSiteKey} onVerify={handleOnVerifyCaptcha} theme={theme.palette.mode} />
                <FormHelperText sx={{ color: '#f44336' }}>{formik.errors.cloudflare}</FormHelperText>
              </Box>
            </Grid>
            <VerifyButton formik={formik} />
          </Grid>
        </form>
      </Box>
    </Grid>
  )
}

export default Form
