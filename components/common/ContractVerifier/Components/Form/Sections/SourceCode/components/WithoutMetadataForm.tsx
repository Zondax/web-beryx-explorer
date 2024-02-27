/**
 * An implementation of a form without metadata.
 *
 * This form includes fields for compiler version, license selection, contract name, source contract file
 * and options to optimize.
 *
 * @param props - Props for the component.
 * @param props.formik - The Formik object.
 * @param [props.metadataNameFile] - The name of the metadata file.
 */
import { FormikProps } from 'formik'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { ContractVerificationRequirements } from '@/api-client/beryx.types'
import { translate } from '@/utils/translate'
import { ExpandMore } from '@mui/icons-material'
import { Box, Checkbox, FormControlLabel, Grid, InputAdornment, MenuItem, TextField, Typography, useTheme } from '@mui/material'

import QuestionMarker from '../../../../../../QuestionMarker'
import { available_licenses, tooltipsDescription } from '../../../../../config'
import CompilerVersion from './CompilerVersion'

/**
 * WithoutMetadataForm component.
 * This component is a form without metadata.
 * It includes fields for compiler version, license selection, contract name, source contract file
 * and options to optimize.
 *
 * @param props - Props for the component.
 * @param props.formik - The Formik object.
 * @param [props.metadataNameFile] - The name of the metadata file.
 */
const WithoutMetadataForm = ({
  formik,
  metadataNameFile,
}: {
  formik: FormikProps<ContractVerificationRequirements>
  metadataNameFile?: string
}) => {
  const theme = useTheme()
  const { t } = useTranslation()

  const handleOptimizeCheckbox = useCallback(() => {
    formik.setValues((prev: ContractVerificationRequirements) => ({
      ...prev,
      optimize: !prev.optimize,
      numberOfRuns: prev.optimize ? undefined : 200,
    }))
  }, [formik])

  /**
   * sourceContractFile is a TextField component for the source contract file.
   * It is only rendered if the file type is 'application/zip'.
   */
  const sourceContractFile =
    formik.values.file && formik.values.file.type === 'application/zip' ? (
      <TextField
        label={t('Source Contract File *')}
        size="large"
        color="level1"
        name="entrypoint"
        disabled={Boolean(metadataNameFile)}
        fullWidth
        value={formik.values.entrypoint ? formik.values.entrypoint : ''}
        onChange={formik.handleChange}
        error={formik.touched.entrypoint && Boolean(formik.errors.entrypoint)}
        helperText={formik.touched.entrypoint && formik.errors.entrypoint}
        sx={{
          minWidth: 'max-content',
        }}
      />
    ) : null

  /**
   * licenseItems is a list of MenuItem components for the available licenses.
   * It is only rendered if there is no metadataNameFile.
   */
  const licenseItems =
    !metadataNameFile &&
    available_licenses.map(({ shortName, longName }) => (
      <MenuItem key={`compiler version ${shortName}`} value={shortName}>
        <Checkbox checked={formik.values.licenses?.includes(shortName)} />
        <Typography variant="body2" color="text.primary">
          {`${longName} (${shortName})`}
        </Typography>
      </MenuItem>
    ))

  /**
   * optimizeCheckbox is a Checkbox component for the optimize option.
   * It is disabled if there is a metadataNameFile.
   */
  const optimizeCheckbox = (
    <Checkbox
      checked={formik.values.optimize}
      disabled={Boolean(metadataNameFile)}
      id={'verify-form-optimize-checkbox'}
      onChange={handleOptimizeCheckbox}
      sx={{
        svg: { fill: metadataNameFile ? theme.palette.text.secondary : theme.palette.text.primary },
      }}
    />
  )

  /**
   * optimizeTextField is a TextField component for the number of runs.
   * It is only rendered if the optimize option is selected.
   */
  const optimizeTextField = formik.values.optimize && (
    <TextField
      label={t('Optimize')}
      size="large"
      color="level1"
      name="numberOfRuns"
      disabled={Boolean(metadataNameFile)}
      fullWidth
      type="number"
      value={formik.values.numberOfRuns ? formik.values.numberOfRuns : ''}
      onChange={formik.handleChange}
      error={formik.touched.numberOfRuns && Boolean(formik.errors.numberOfRuns)}
      helperText={formik.touched.numberOfRuns && formik.errors.numberOfRuns}
      sx={{
        minWidth: 'max-content',
      }}
    />
  )

  /**
   * sourceContractFileGrid is a Grid item that contains the sourceContractFile component.
   */
  const sourceContractFileGrid = (
    <Grid item xs={12}>
      {sourceContractFile}
    </Grid>
  )
  /**
   * compilerVersionGrid is a Grid item that contains the CompilerVersion component.
   */
  const compilerVersionGrid = (
    <Grid item xs={12}>
      <CompilerVersion formik={formik} metadataNameFile={metadataNameFile} />
    </Grid>
  )
  /**
   * licenseTextFieldGrid is a Grid item that contains a TextField component for the license selection.
   */
  const licenseTextFieldGrid = (
    <Grid item xs={12}>
      <TextField
        select={!metadataNameFile}
        SelectProps={{
          IconComponent: ExpandMore,
          multiple: true,
          renderValue: (selected: unknown) => (Array.isArray(selected) ? selected.join(', ') : (selected as string)),
        }}
        label={t('Select License *')}
        size="large"
        color="level1"
        name="licenses"
        disabled={Boolean(metadataNameFile)}
        fullWidth
        value={formik.values.licenses || []}
        onChange={formik.handleChange}
        error={formik.touched?.licenses && Boolean(formik.errors?.licenses)}
        helperText={formik.touched?.licenses && formik.errors?.licenses}
        sx={{
          maxWidth: '100%',
          '.MuiInputBase-input': {
            textOverflow: 'ellipsis',
          },
        }}
        inputProps={{ readOnly: Boolean(metadataNameFile) }}
      >
        {licenseItems}
      </TextField>
    </Grid>
  )
  /**
   * contractNameTextFieldGrid is a Grid item that contains a TextField component for the contract name.
   */
  const contractNameTextFieldGrid = (
    <Grid item xs={12}>
      <TextField
        label={t('Contract Name')}
        size="small"
        name="contractName"
        disabled={Boolean(metadataNameFile)}
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <QuestionMarker title={translate(t, tooltipsDescription.contractName)} key={'contract name'} />
            </InputAdornment>
          ),
        }}
        value={formik.values.contractName ? formik.values.contractName : ''}
        onChange={formik.handleChange}
        error={formik.touched?.contractName && Boolean(formik.errors?.contractName)}
        helperText={formik.touched?.contractName && formik.errors?.contractName}
        sx={{
          minWidth: 'max-content',
          '.MuiInputBase-root': {
            backgroundColor: theme.palette.background.level0,
            borderRadius: '8px',
            padding: '0 0.5rem',
          },
          '.Mui-disabled': {
            opacity: 0.8,
          },
        }}
      />
    </Grid>
  )
  /**
   * optimizeCheckboxGrid is a Grid item that contains a FormControlLabel component for the optimizeCheckbox.
   */
  const optimizeCheckboxGrid = (
    <Grid item xs={5}>
      <FormControlLabel
        id="verify-form-optimize-label"
        control={optimizeCheckbox}
        label={
          <Box display={'flex'} alignItems={'center'}>
            <Typography color={metadataNameFile ? 'text.secondary' : 'text.primary'}>{t('Optimize')}</Typography>
            <QuestionMarker
              title={metadataNameFile ? translate(t, tooltipsDescription.optimizeDisabled) : translate(t, tooltipsDescription.optimize)}
              key={'optimizer contract verifier'}
            />
          </Box>
        }
      />
    </Grid>
  )
  /**
   * optimizeTextFieldGrid is a Grid item that contains the optimizeTextField component.
   */
  const optimizeTextFieldGrid = (
    <Grid item xs={7}>
      {optimizeTextField}
    </Grid>
  )

  /**
   * The component returns a Grid container with the defined Grid items.
   */
  return (
    <Grid container spacing={2}>
      {sourceContractFileGrid}
      {compilerVersionGrid}
      {licenseTextFieldGrid}
      {contractNameTextFieldGrid}
      {optimizeCheckboxGrid}
      {optimizeTextFieldGrid}
    </Grid>
  )
}

export default WithoutMetadataForm
