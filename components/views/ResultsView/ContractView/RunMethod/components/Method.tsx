/**
 * @module Method
 */
import { FormikProps } from 'formik'
import lodash from 'lodash'
import React, { ChangeEvent, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { InputProps } from '@/api-client/beryx.types'
import { LoadingStatus } from '@/config/config'
import { getParsedType } from '@/refactor/contractUtils'
import { getMethod } from '@/utils/contracts'
import { ExpandMore } from '@mui/icons-material'
import { Box, Unstable_Grid2 as Grid, MenuItem, TextField, Typography } from '@mui/material'

import { MethodFlag } from 'components/common/MethodFlag/MethodFlag'

import { ABIStatusText, DecodedABI, InternalInputProps } from '../../config'
import { initialValues } from '../RunMethod'
import { RunMethodFormValues } from '../config'

/**
 * @interface MethodProps
 * @property {any} formik - Formik instance
 * @property {string[]} methodTypes - Available method types
 * @property {DecodedABI[]} availableMethods - Available methods
 * @property {any} abi - ABI of the contract
 * @property {LoadingStatus} status - Loading status
 */
interface MethodProps {
  formik: FormikProps<RunMethodFormValues>
  methodTypes?: string[]
  availableMethods?: DecodedABI[]
  abi: any
  status?: LoadingStatus
}

/**
 * @function Method
 * @description Component for selecting and handling methods
 * @param props - Properties passed to the component
 * @returns {JSX.Element}
 */
const Method = ({ formik, methodTypes, availableMethods, abi, status }: MethodProps) => {
  // Global
  const { t } = useTranslation()

  /**
   * @function handleMethodType
   * @description Handles the selection of method type
   * @param e - Event
   */
  const handleMethodType = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      formik.setValues({ ...initialValues, type: e.target.value })
    },
    [formik]
  )

  const createReq = useCallback(function (input: InputProps): InternalInputProps {
    const parsedType = getParsedType(input)
    const newInput: InternalInputProps = { ...input, components: undefined, parsedType }

    if (parsedType.type === 'array') {
      if (!parsedType.length) {
        parsedType.length = 1 // default length
      }

      // Eliminate the brackets and create a row for each component
      const subinput = { ...input }
      subinput.type = newInput.type.slice(0, parsedType.index)

      const subInputs = []
      let currentIndex = 0

      while (currentIndex < parsedType.length) {
        subinput.name = `position${currentIndex}`
        subInputs.push(createReq(subinput))
        currentIndex++
      }

      if (parsedType.lengthType === 'dynamic') {
        newInput.parsedType.components = { ...subInputs[0] }
      }
      newInput.components = subInputs
      newInput.open = true
      return newInput
    }

    // Analyze if the type is an object
    if (parsedType.type === 'object') {
      newInput.open = true
      newInput.components = input.components?.map(function (subInput: InputProps) {
        return createReq(subInput)
      })
    }

    if (['string'].includes(parsedType.type)) {
      newInput.value = ''
    }
    newInput.internalType = ''

    return newInput
  }, [])

  /**
   * @function handleMethod
   * @description Handles the selection of method
   * @param e - Event
   */
  const handleMethod = useCallback(
    function (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
      const selectedMethodId = e.target.value

      const methodFound = lodash.values(availableMethods).find(function (func) {
        return func.id === selectedMethodId
      })
      if (!methodFound) {
        return
      }

      const reqBody = methodFound.inputs.map(function (input) {
        return createReq(input)
      })

      formik.setValues(function (prev: RunMethodFormValues) {
        return {
          ...prev,
          method: methodFound,
          requestBody: reqBody,
          requestBodyString: undefined,
        }
      })
    },
    [createReq, availableMethods, formik]
  )

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '0.125rem', padding: '0.5rem 1.25rem' }}>
      <Typography variant="caption" color={'text.primary'} fontWeight={600}>
        {t('Select a method')}
      </Typography>
      <Grid container spacing={1} alignItems={'flex-end'} sx={{ marginTop: '0.5rem' }}>
        <Grid xs={6}>
          <TextField
            id="select-method-type"
            size="large"
            color="level3"
            label={t('Type')}
            value={formik.values.type ?? ''}
            disabled={!methodTypes || !abi}
            select={Boolean(methodTypes)}
            SelectProps={{ IconComponent: ExpandMore }}
            fullWidth
            onChange={handleMethodType}
            sx={{
              minWidth: 'max-content',
              '& .MuiTypography-root': { height: 'auto' },
            }}
          >
            {methodTypes ? (
              methodTypes.map((method: string) => (
                <MenuItem key={`method-type-${method}`} value={method}>
                  <Box display={'flex'} alignItems={'center'} sx={{ gap: '0.5rem' }}>
                    <MethodFlag type={getMethod({ methodType: method })} />
                    {method}
                  </Box>
                </MenuItem>
              ))
            ) : (
              <MenuItem key={'method type disabled'} />
            )}
          </TextField>
        </Grid>
        <Grid xs={6}>
          <TextField
            id="select-method"
            size="large"
            color="level3"
            label={t('Method')}
            fullWidth
            select={Boolean(availableMethods)}
            SelectProps={{ IconComponent: ExpandMore }}
            value={formik.values.method?.id ?? ''}
            onChange={handleMethod}
            disabled={!availableMethods || !abi || !formik.values.type}
            sx={{
              minWidth: 'max-content',
            }}
          >
            {availableMethods ? (
              availableMethods.map((method: DecodedABI) => (
                <MenuItem key={`method-${method.name}`} value={method.id}>
                  {method.name}
                </MenuItem>
              ))
            ) : (
              <MenuItem key={'method disabled'} />
            )}
          </TextField>
        </Grid>
      </Grid>
      {/* ABI status */}
      <Grid container gap={1} alignItems="center">
        {status && <ABIStatusText status={status} />}
      </Grid>
    </Box>
  )
}

export default Method
