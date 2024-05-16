import { AxiosError } from 'axios'
import { useFormik } from 'formik'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { ContractVerificationRequirements } from '@/api-client/beryx.types'
import { useMutationContractVerify } from '@/data/beryx'
import useAppSettingsStore from '@/store/ui/settings'
import { Unstable_Grid2 as Grid2, useTheme } from '@mui/material'

import { Form, ResultsView, Tutorial } from './Components'
import { FormNames, steps, validationSchema } from './config'

/**
 * Initialize values for the contract verification form.
 */
export const initialValues: ContractVerificationRequirements = {
  file: undefined,
  hasMetadataFile: true,
  compilerVersion: '',
  licenses: [],
  address: '',
  checkTerms: false,
  cloudflare: '',
}

/**
 * ContractVerifier component is responsible for handling contract verification operations.
 *
 * @param address - the contract address.
 * @returns ContractVerifier component.
 */
const ContractVerifier = ({ address }: { address: string }) => {
  const theme = useTheme()
  const { t } = useTranslation()
  const formikRef = useRef<any>()

  const { network } = useAppSettingsStore(state => ({ network: state.network }))
  const contractVerifyMutation = useMutationContractVerify()

  const setErrorForField = useCallback((field: string, message: string) => {
    formikRef.current?.setFieldError(field, message)
  }, [])

  const formOnSubmit = useCallback(
    (verificationRequirements: ContractVerificationRequirements, actions: { setSubmitting: (isSubmitting: boolean) => void }) => {
      actions.setSubmitting(true)

      // We need to clone here to avoid looping references
      const valueToSubmit: ContractVerificationRequirements = {
        ...verificationRequirements,
      }

      if (!valueToSubmit.cloudflare) {
        actions.setSubmitting(false)
        setErrorForField('cloudflare', 'The token could not be validated')
        return
      }

      const FD = new FormData()

      // Push our data into our FormData object
      Object.entries(valueToSubmit).forEach(([name, value]) => {
        const formName = FormNames[name as keyof typeof FormNames]
        if (formName && value && value?.length !== 0) {
          const valueStr = typeof value === 'number' ? value.toString() : value
          const isLicenses = (name as keyof typeof FormNames) === 'licenses'
          const isNumberOfRuns = (name as keyof typeof FormNames) === 'numberOfRuns'

          const finalValue = isLicenses ? value.join(', ') : valueStr

          // The number of runs is not sent if the optimize is false
          if (!(isNumberOfRuns && !valueToSubmit.optimize)) {
            FD.append(formName, finalValue)
          }
        }
      })

      FD.append('challenge', verificationRequirements.cloudflare)

      contractVerifyMutation.mutate({ network, contractData: FD, address: valueToSubmit.address })

      actions.setSubmitting(false)
    },
    [network, contractVerifyMutation, setErrorForField]
  )

  const values = useMemo(() => {
    return address ? { ...initialValues, address } : initialValues
  }, [address])

  const formik = useFormik<ContractVerificationRequirements>({
    initialValues: values,
    validationSchema,
    validateOnMount: true,
    onSubmit: formOnSubmit,
  })

  /**
   * Resets the form to its initial state.
   */
  const cleanForm = useCallback(() => {
    formik.resetForm()
    contractVerifyMutation.reset()
  }, [formik, contractVerifyMutation])

  useEffect(() => {
    formikRef.current = formik
  }, [formik])

  useEffect(() => {
    if (contractVerifyMutation.isPending) {
      formik.setSubmitting(true)
    }
    if (contractVerifyMutation.isSuccess) {
      formik.setSubmitting(false)
    }
  }, [contractVerifyMutation, formik])

  /**
   * Render ContractVerifier component.
   */
  return (
    <Grid2
      container
      bgcolor="background.level1"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        width: 'min-content',
        maxWidth: '100%',
        maxHeight: '80vh',
        borderRadius: theme.spacing(1),
        overflowY: 'hidden',
        contain: 'paint',
      }}
    >
      {!contractVerifyMutation.isError && !contractVerifyMutation.data ? (
        <>
          <Grid2
            container
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              width: '35rem',
              maxWidth: '100%',
              height: '100%',
              overflowY: 'auto',
              padding: { xs: '2.25rem 2rem', sm: '2.25rem 4.5rem' },
            }}
          >
            <Form formik={formik} address={address} />
          </Grid2>
          <Grid2 container sx={{ borderLeft: `1px solid ${theme.palette.info.main}`, width: '35rem', overflowY: 'auto' }}>
            <Tutorial steps={steps(t)} />
          </Grid2>
        </>
      ) : (
        <Grid2
          container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '35rem',
            maxWidth: '100%',
            height: '100%',
            overflowY: 'auto',
            padding: { xs: '2.25rem 2rem', sm: '2.25rem 4.5rem' },
          }}
        >
          <ResultsView
            response={{
              data: contractVerifyMutation.data,
              error: {
                isError: contractVerifyMutation.isError,
                description:
                  contractVerifyMutation.error instanceof AxiosError
                    ? contractVerifyMutation.error?.response?.data.error
                    : contractVerifyMutation.error?.message,
              },
            }}
            cleanForm={cleanForm}
          />
        </Grid2>
      )}
    </Grid2>
  )
}
export default ContractVerifier
