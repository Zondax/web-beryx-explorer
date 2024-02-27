import { FormikProps } from 'formik'
import { ChangeEvent, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { ContractVerificationRequirements } from '@/api-client/beryx.types'
import { Upload } from '@carbon/icons-react'
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
  useTheme,
} from '@mui/material'
import { Theme } from '@mui/material/styles'

import TermsAndConditions from '../TermsAndConditions'
import { MetadataForm, UploadedFile, WithoutMetadataForm } from './components'

/**
 * Function to style the upload button
 * @param theme - The theme object from Material UI
 * @returns An object containing the styles for the upload button
 */
export const styleUploadButton = (theme: Theme) => ({
  height: 'min-content',
  width: '100%',
  backgroundColor: theme.palette.background.level0,
  justifyContent: 'space-between',
})

/**
 * Component to upload source code
 * @param formik - Formik context
 * @param address - Ethereum address as a string
 */
const SourceCode = ({ formik, address }: { formik: FormikProps<ContractVerificationRequirements>; address?: string }) => {
  const theme = useTheme()
  const { t } = useTranslation()

  const [metadataNameFile, setMetadataNameFile] = useState<string | undefined>(undefined)
  const [metadataError, setMetadataError] = useState<string | undefined>(undefined)
  const [customFileError, setCustomFileError] = useState<string | undefined>(undefined)

  // Delete uploaded files when they are clicked
  const fileInput = document.getElementById('file') as HTMLInputElement

  fileInput?.addEventListener('click', function () {
    fileInput.value = ''
  })

  /**
   * Function to handle uploading file
   * @param e - Event object
   */
  const handleUploadFile = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]?.size >= 1048576) {
        setCustomFileError('Uploaded file is too big. Limit: 1MB')
        return
      }
      setCustomFileError(undefined)
      const file = e.target.files ? e.target.files[0] : undefined
      formik.setFieldValue('file', file)
    },
    [formik, setCustomFileError]
  )

  /**
   * Deletes the uploaded file and resets the form values.
   * This function is used to delete the uploaded file and reset the form values related to the file.
   * It sets the metadataNameFile and metadataError states to undefined and resets the formik values.
   */
  const deleteFile = useCallback(() => {
    setMetadataNameFile(undefined)
    setMetadataError(undefined)
    formik.setValues({ ...formik.values, entrypoint: '', compilerVersion: '', licenses: [], file: undefined })
  }, [setMetadataNameFile, setMetadataError, formik])

  const handleRadioGroup = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      formik.setValues((prev: ContractVerificationRequirements) => ({
        ...prev,
        hasMetadataFile: e.target.value !== 'false',
        entrypoint: undefined,
        licenses: [],
        compilerVersion: '',
        optimize: false,
        numberOfRuns: undefined,
        contractName: undefined,
      }))
      setMetadataNameFile(undefined)
    },
    [formik, setMetadataNameFile]
  )

  return (
    <Grid item container>
      {/* Source Code */}
      <FormLabel id="verify-form-upload-source-code-label" sx={{ marginBottom: '0.5rem' }}>
        {t('Source Code')}
      </FormLabel>
      <Grid container gap={'0.5rem'} mb={'2rem'}>
        <Grid item xs={12}>
          <FormControl
            fullWidth
            size="small"
            error={formik.touched.file && Boolean(formik.errors.file) && formik.values.file === undefined}
            id="verify-form-upload-source-code"
          >
            <Button
              variant="inputType"
              component="label"
              size="large"
              endIcon={<Upload size={16} color={theme.palette.text.primary} />}
              sx={styleUploadButton(theme)}
            >
              <Typography variant="body2" color="text.primary">
                {t('Upload *.zip or *.sol file *')}
              </Typography>
              <Box component={'input'} type="file" id={'file'} name={'file'} accept={'.zip,.sol'} hidden onChange={handleUploadFile} />
            </Button>
            {(formik.touched.file && Boolean(formik.errors.file)) ||
              (customFileError && (
                <FormHelperText id={'source-code-file-error'} sx={{ color: '#f44336' }}>
                  {customFileError || formik.errors.file}
                </FormHelperText>
              ))}
          </FormControl>
        </Grid>
        {formik.values.file && <UploadedFile value={formik.values.file.name} action={deleteFile} />}
      </Grid>
      {/* Do you have a metadata .json file? */}
      <FormControl>
        <Grid container mb={'2rem'}>
          <Grid item xs={12}>
            <FormLabel id="verify-form-metadata-radio-buttons">{t('Do you have a metadata .json file?')}</FormLabel>
          </Grid>
          <Grid item xs={12}>
            <RadioGroup
              row
              id="verify-form-metadata-radio-buttons"
              aria-labelledby="verify-form-metadata-radio-buttons"
              value={formik.values.hasMetadataFile}
              onChange={handleRadioGroup}
            >
              <FormControlLabel
                value
                control={
                  <Radio
                    sx={{
                      color: 'pink',
                      '&.Mui-checked': {
                        color: 'pink',
                      },
                    }}
                  />
                }
                label={t('Yes')}
                sx={{
                  '.MuiFormControlLabel-label': formik.values.hasMetadataFile
                    ? {
                        color: theme.palette.text.primary,
                      }
                    : {},
                }}
              />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="No"
                sx={{
                  '.MuiFormControlLabel-label': !formik.values.hasMetadataFile
                    ? {
                        color: theme.palette.text.primary,
                      }
                    : {},
                }}
              />
            </RadioGroup>
          </Grid>
        </Grid>
      </FormControl>
      {/* With metadata */}
      {formik.values.hasMetadataFile ? (
        <MetadataForm
          formik={formik}
          metadataNameFile={metadataNameFile}
          setMetadataNameFile={setMetadataNameFile}
          metadataError={metadataError}
          setMetadataError={setMetadataError}
        />
      ) : null}
      {/* Without metadata */}
      {!formik.values.hasMetadataFile || metadataNameFile ? (
        <WithoutMetadataForm formik={formik} metadataNameFile={metadataNameFile} />
      ) : null}
      {/* Terms and Conditions */}
      {address && <TermsAndConditions formik={formik} />}
    </Grid>
  )
}

export default SourceCode
