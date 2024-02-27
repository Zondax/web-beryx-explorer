/**
 * Imports from libraries
 */
import { FormikProps } from 'formik'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { updateValues } from '@/refactor/contractUtils'
import { CodeReference, Construction, HelpFilled, TableShortcut } from '@carbon/icons-react'
import { Box, Button, Tooltip, Typography, useTheme } from '@mui/material'

import { InternalInputProps } from '../../../config'
import { RunMethodFormValues } from '../../config'
import TableInput from './TableInput'
import TextInput from './TextInput'

/**
 * Props type declaration for Parameters
 */
interface ParametersProps {
  formik: FormikProps<RunMethodFormValues>
}

/**
 * Parameters functional component
 * @param formik - object containing Formik props and methods
 */
const Parameters = ({ formik }: ParametersProps) => {
  // Global
  const theme = useTheme()
  const { t } = useTranslation()

  // Boolean state to manage active table
  const [activeTable, setActiveTable] = useState<boolean>(true)

  /**
   * handler for handling parameter updates
   */
  const handleParameters = useCallback(() => {
    const body = formik.values.requestBody ? [...formik.values.requestBody] : ([] as InternalInputProps[])
    const response = updateValues(body)

    if (response?.inputs) {
      formik.setValues({ ...formik.values, requestBodyString: undefined, requestBody: response.inputs })
    }
    setActiveTable(prev => !prev)
  }, [formik, setActiveTable])

  /**
   * TooltipContent functional component
   */
  const TooltipContent = () => (
    <Tooltip
      title={'Example: [5] or [4,2]. For more information about method parameters, visit the functions file in Code tab.'}
      sx={{ maxWidth: '50ch' }}
      arrow
      disableInteractive
    >
      <HelpFilled style={{ cursor: 'help' }} color={theme.palette.text.secondary} />
    </Tooltip>
  )

  /**
   * BetaBox functional component
   */
  const BetaBox = () => (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        bgcolor: 'background.level2',
        p: '0 0.5rem',
        borderRadius: '8px',
      }}
    >
      <Construction width={12} height={12} color={theme.palette.text.secondary} />
      <Typography variant="caption" color={'text.secondary'}>
        beta
      </Typography>
    </Box>
  )

  /**
   * SwitchButton functional component
   */
  const SwitchButton = () => (
    <Button
      variant={'text'}
      color={'primary'}
      size={'small'}
      endIcon={activeTable ? <CodeReference size={16} /> : <TableShortcut size={16} />}
      onClick={handleParameters}
      sx={{ paddingX: '1rem' }}
    >
      {activeTable ? t('Switch to Text Input') : t('Switch to Table Input')}
    </Button>
  )

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '0.125rem', padding: '0.5rem 1.25rem' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Typography variant="caption" color={'text.primary'} fontWeight={600}>
            {t('Parameters Table')}
          </Typography>
          {!activeTable ? <TooltipContent /> : <BetaBox />}
        </Box>
        <SwitchButton />
      </Box>
      {activeTable ? <TableInput formik={formik} /> : <TextInput formik={formik} />}
    </Box>
  )
}

export default Parameters
