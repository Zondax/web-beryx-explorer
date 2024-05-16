import { FormikProps } from 'formik'
import { useTranslation } from 'react-i18next'

import { ContractVerificationRequirements } from '@/api-client/beryx.types'
import { useContractCompilers } from '@/data/beryx'
import useAppSettingsStore from '@/store/ui/settings'
import { ExpandMore } from '@mui/icons-material'
import { MenuItem, TextField, Typography } from '@mui/material'

/**
 * CompilerVersion component
 *
 * @param formik - formik instance
 * @param metadataNameFile - metadata name file
 *
 * @returns JSX.Element
 */
const CompilerVersion = ({
  formik,
  metadataNameFile,
}: {
  formik: FormikProps<ContractVerificationRequirements>
  metadataNameFile: string | undefined
}) => {
  const { network } = useAppSettingsStore(state => ({ network: state.network }))
  const { t } = useTranslation()

  const { data: compilersVersion } = useContractCompilers(network)

  return (
    <TextField
      select={!metadataNameFile}
      SelectProps={{ IconComponent: ExpandMore }}
      label={t('Select Compiler Version *')}
      size="large"
      color="level1"
      name="compilerVersion"
      fullWidth
      disabled={Boolean(metadataNameFile)}
      value={formik.values.compilerVersion}
      onChange={formik.handleChange}
      error={formik.touched?.compilerVersion && Boolean(formik.errors?.compilerVersion)}
      helperText={formik.touched?.compilerVersion && formik.errors?.compilerVersion}
      sx={{
        minWidth: 'max-content',
      }}
      inputProps={{ readOnly: Boolean(metadataNameFile) }}
    >
      {!metadataNameFile && compilersVersion?.available_compilers ? (
        compilersVersion.available_compilers.map((version: string) => (
          <MenuItem key={`compiler version ${version}`} value={version}>
            <Typography variant={'body2'} color="text.primary">
              {version}
            </Typography>
          </MenuItem>
        ))
      ) : (
        <MenuItem key={'compiler version empty'} value={''}>
          <Typography variant={'body2'} color="text.primary" />
        </MenuItem>
      )}
    </TextField>
  )
}
/**
 * Export CompilerVersion component
 */
export default CompilerVersion
