/**
 * @file This file contains the MetadataForm component which is used to handle the metadata of the contract.
 * This component allows the user to upload a metadata file, parses the file and updates the form values accordingly.
 * It also provides the functionality to delete the uploaded metadata file.
 *
 * @module components/MetadataForm
 */
import { FormikProps } from 'formik'
import { ChangeEvent, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { ContractVerificationRequirements } from '@/api-client/beryx.types'
import { Upload } from '@carbon/icons-react'
import { Box, Button, FormControl, FormHelperText, FormLabel, Grid, Typography, useTheme } from '@mui/material'

import { styleUploadButton } from '../SourceCode'
import UploadedFile from './UploadedFile'

/**
 * MetadataForm is a form component for handling contract metadata.
 *
 * @param formik - Formik instance.
 * @param [metadataNameFile] - Name of the uploaded metadata file.
 * @param setMetadataNameFile - Function to set the name of the uploaded metadata file.
 * @param [metadataError] - Error message related to metadata file.
 * @param setMetadataError - Function to set the error message related to metadata file.
 */
const MetadataForm = ({
  formik,
  metadataNameFile,
  setMetadataNameFile,
  metadataError,
  setMetadataError,
}: {
  formik: FormikProps<ContractVerificationRequirements>
  metadataNameFile?: string
  setMetadataNameFile: (name?: string) => void
  metadataError?: string
  setMetadataError: (error?: string) => void
}) => {
  const theme = useTheme()
  const { t } = useTranslation()

  // Get the metadata file input element
  const metadataFileInput = document.getElementById('metadata-file') as HTMLInputElement

  // Clear the input value when the input is clicked
  metadataFileInput?.addEventListener('click', function () {
    metadataFileInput.value = ''
  })

  /**
   * Parse the metadata file.
   * Extract the necessary information and return it, or return an error message.
   * @param metadata - The metadata object.
   * @return The parsed data or an error message.
   */
  const parseMetadata = (metadata: { [key: string]: any }) => {
    const dataToUpdate: { [key: string]: string | string[] | boolean } = {}

    Object.keys(metadata).forEach(elem => {
      switch (elem) {
        case 'compiler': {
          dataToUpdate.compilerVersion = metadata[elem].version.split('+')[0]
          break
        }
        case 'sources': {
          const sourcesObject = Object.keys(metadata[elem])[0]
          for (const subElem in metadata[elem][sourcesObject]) {
            if (subElem === 'license') {
              const license = metadata[elem][sourcesObject][subElem]
              dataToUpdate.licenses = typeof license === 'string' ? license.split(',') : license
            }
          }
          break
        }
        case 'settings': {
          dataToUpdate.optimize = metadata[elem].optimizer?.enabled ?? false
          dataToUpdate.numberOfRuns = metadata[elem].optimizer?.runs ?? undefined
          if (metadata[elem].compilationTarget) {
            const compilationTargetKeys = Object.keys(metadata[elem].compilationTarget)
            if (compilationTargetKeys.length > 0) {
              dataToUpdate.contractName = metadata[elem].compilationTarget[compilationTargetKeys[0]]
              dataToUpdate.entrypoint = compilationTargetKeys[0]
            }
          }
          break
        }
        default:
      }
    })

    if (!dataToUpdate['compilerVersion']) {
      return { error: 'The file has to contain the compiler version' }
    } else if (!dataToUpdate['licenses']) {
      return { error: 'The file has to contain the licenses' }
    }
    return { data: dataToUpdate }
  }

  /**
   * Handles the metadata file input change.
   * This function is triggered when a user selects a file to upload.
   * It reads the file, parses the JSON content, and updates the form values or sets an error message.
   * @param e - The event object, containing the selected file.
   */
  const handleMetadata = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      // Reset any previous metadata error and file name
      setMetadataError(undefined)
      setMetadataNameFile(undefined)

      // Create a new FileReader instance
      const fileReader = new FileReader()

      // Initialize a result object to store the parsed data or an error message
      let result: { data?: { [key: string]: string | boolean | string[] }; error?: string } = {}

      // Define what happens when the file has been read
      fileReader.onload = event => {
        // Check if the read operation was successful
        if (event.target && typeof event.target.result == 'string') {
          // Parse the file content as JSON
          const file = JSON.parse(event.target.result)

          // Parse the metadata from the file
          result = parseMetadata(file)

          // If there is no error, update the form values with the parsed data
          if (!result.error && e.target.files) {
            setMetadataNameFile(e.target.files[0].name)
            formik.setValues({ ...formik.values, ...result.data })
          } else {
            // If there is an error, set the error message
            setMetadataError(result.error)
          }
        }
      }
      if (e.target.files) {
        // Start reading the file as text
        fileReader.readAsText(e.target.files[0])
      }
    },
    [formik, setMetadataError, setMetadataNameFile]
  )

  /**
   * This function is responsible for deleting the uploaded metadata file.
   * It clears the metadata file name and error, and resets the form values.
   * Specifically, it sets the metadata file name and error to undefined, and resets the form values
   * for 'entrypoint', 'compilerVersion', and 'licenses' to their default states.
   */
  const deleteMetadataFile = useCallback(() => {
    setMetadataNameFile(undefined) // Clear the metadata file name
    setMetadataError(undefined) // Clear the metadata error
    // Reset the form values for 'entrypoint', 'compilerVersion', and 'licenses'
    formik.setValues({ ...formik.values, entrypoint: '', compilerVersion: '', licenses: [] })
  }, [setMetadataNameFile, setMetadataError, formik])

  // Render the MetadataForm component
  return (
    <Grid item container>
      {/* Metadata input */}
      <Grid container mb={'2rem'}>
        <FormLabel id="verify-form-upload-metadata-label" sx={{ marginBottom: '0.5rem' }}>
          Metadata
        </FormLabel>
        <Grid item xs={12} mb={'0.25rem'}>
          <FormControl fullWidth size="small" error={metadataError !== undefined} id="verify-form-upload-metadata">
            <Button
              variant="inputType"
              component="label"
              endIcon={<Upload size={16} color={theme.palette.text.primary} />}
              sx={styleUploadButton(theme)}
            >
              <Typography variant="body2" color="text.primary">
                {t('Upload your metadata from a *.json file')}
              </Typography>
              <Box component={'input'} type="file" id={'metadata-file'} accept={'.json'} hidden onChange={handleMetadata} />
            </Button>
            <FormHelperText id={'file-error'} sx={{ color: '#f44336' }}>
              {metadataError}
            </FormHelperText>
          </FormControl>
        </Grid>
        {metadataNameFile && <UploadedFile value={metadataNameFile} action={deleteMetadataFile} />}
      </Grid>
    </Grid>
  )
}

export default MetadataForm
