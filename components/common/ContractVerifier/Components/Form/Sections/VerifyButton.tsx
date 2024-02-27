import { FormikProps } from 'formik'
import { useTranslation } from 'react-i18next'

import { ContractVerificationRequirements } from '@/api-client/beryx.types'
import { Button, CircularProgress, Grid, Typography } from '@mui/material'

/**
 * VerifyButton Component
 *
 * This component renders a button which changes state based on Formik's object errors and submission status.
 *
 * @param formik - This formik object is a state container which holds the form state.
 * @property formik.errors - A map of field names and corresponding error messages
 * @property formik.isSubmitting - Represents the form submission status.
 *
 * @returns A JSX element that displays a submit button with circular progress during form submission.
 */
const VerifyButton = ({ formik }: { formik: FormikProps<ContractVerificationRequirements> }) => {
  const { t } = useTranslation()
  return (
    <Grid item container justifyContent={'center'} xs={12}>
      <Button disabled={Object.keys(formik.errors).length !== 0} size="medium" variant="contained" fullWidth type="submit">
        <Typography variant="body1" fontFamily={'Sora'} fontWeight={500} sx={{ color: '#E2E4EC' }} alignItems={'center'}>
          {formik.isSubmitting ? <CircularProgress variant="indeterminate" thickness={8} color="primary" size="small" /> : t('Verify')}
        </Typography>
      </Button>
    </Grid>
  )
}
export default VerifyButton
