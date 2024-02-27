import { FormikProps } from 'formik'
import Link from 'next/link'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { ContractVerificationRequirements } from '@/api-client/beryx.types'
import { Checkbox, FormControl, Grid, Typography, useTheme } from '@mui/material'

/**
 * Component for displaying Terms and Conditions with a checkbox.
 *
 * @param params parameters
 * @param params.formik object from formik
 *
 * @returns terms and conditions component
 */
const TermsAndConditions = ({ formik }: { formik: FormikProps<ContractVerificationRequirements> }) => {
  const theme = useTheme()
  const { t } = useTranslation()

  const handleTermsCheckbox = useCallback(() => formik.setFieldValue('checkTerms', !formik.values.checkTerms), [formik])

  return (
    <Grid item xs={12}>
      <Grid container alignItems={'center'} marginLeft={'-11px'}>
        <FormControl>
          <Checkbox
            checked={formik.values.checkTerms}
            id="verify-form-check-terms"
            onChange={handleTermsCheckbox}
            sx={{ svg: { fill: theme.palette.text.primary } }}
          />
        </FormControl>
        <Typography sx={{ color: theme.palette.text.primary }}>
          {t('I agree with the')}{' '}
          <Link href={'/terms-of-service'} target={'_blank'} style={{ color: theme.palette.primary.light, cursor: 'pointer' }}>
            {t('Terms and Conditions')}
          </Link>
        </Typography>
      </Grid>
    </Grid>
  )
}
export default TermsAndConditions
