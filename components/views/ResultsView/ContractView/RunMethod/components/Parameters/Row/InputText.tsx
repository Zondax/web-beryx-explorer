/**
 * @module InputText
 */
import { FormikProps } from 'formik'
import { useCallback, useState } from 'react'

import {
  handleDynamicComponents,
  modifyReqBody,
  parseRequest,
  updateValues,
  validateAddress,
  validateBytes,
} from '@/refactor/contractUtils'
import { Box, TextField, useTheme } from '@mui/material'

import { FieldValues, InternalInputProps } from '../../../../config'
import { RunMethodFormValues } from '../../../config'
import ActionButtons from './ActionButtons'
import { ActionTypes, commonRowStyles } from './Row'

/**
 * @interface InputTextParams
 * @property {InternalInputProps} input - The input properties
 * @property {number[]} indexs - The indices
 * @property {any} formik - The formik object
 * @property {ActionTypes[]} [actions] - The actions
 */
interface InputTextParams {
  input: InternalInputProps
  indexs: number[]
  formik: FormikProps<RunMethodFormValues>
  actions?: ActionTypes[]
}

/**
 * InputText component
 * @param props - The properties
 * @returns The rendered JSX element
 */
const InputText = ({ input, indexs, formik, actions = [] }: InputTextParams) => {
  const theme = useTheme()

  const [value, setValue] = useState<string | number | boolean | undefined>(() => {
    if (['array', 'object'].includes(input.parsedType.type)) {
      return input.components ? JSON.stringify(parseRequest(input.components)) : undefined
    }
    return undefined
  })

  /**
   * @function updateCompleteInput
   * @param params - The parameters
   * @param params.components - The components
   * @param [params.values] - The values
   * @param [params.setError] - The setError flag
   */
  const updateCompleteInput = useCallback(
    ({ components, values, setError }: { components: InternalInputProps[]; values?: FieldValues[]; setError?: boolean }) => {
      const { error, inputs: updatedComponent } = updateValues(components, values)
      if (error || !updatedComponent) {
        updateCompleteInput({ components: input.components ?? [], setError: true })
        return
      }

      const newParameters = formik.values.requestBody ? [...formik.values.requestBody] : []
      let fieldChanged = false // Indicate if the selected field was changed
      const searchedIndex = 0 // Position of the indexs array in which we are searching

      /**
       * @function updateReqBody
       * @param elem - The element
       * @param index - The index
       * @param searchedIndex - The searched index
       * @param updatedComponent - The updated component
       * @returns The updated element
       */
      const updateReqBody = (elem: InternalInputProps, index: number, searchedIndex: number, updatedComponent: InternalInputProps[]) => {
        if (index === indexs[searchedIndex]) {
          fieldChanged = true

          if (searchedIndex !== indexs.length - 1) {
            elem.components?.forEach((subElem: InternalInputProps, subIndex: number) => {
              updateReqBody(subElem, subIndex, searchedIndex + 1, updatedComponent)
            })
          } else {
            elem.components = updatedComponent
            elem.status = setError ? 'error' : undefined
          }
        }
        return elem
      }

      /**
       * @function finalResult
       * @param newParameters - The new parameters
       * @returns The final result
       */
      const finalResult = newParameters.map((elem: InternalInputProps, currentIndex: number) => {
        if (fieldChanged) {
          return elem
        }
        return updateReqBody(elem, currentIndex, searchedIndex, updatedComponent)
      })
      formik.setValues({ ...formik.values, requestBody: finalResult })
    },
    [formik, indexs, input]
  )

  /**
   * @function handleInputs
   * @param value - The value
   * @param indexs - The indices
   */
  const handleInputs = useCallback(
    (value: string, indexs: number[]) => {
      if (['array', 'object'].includes(input.parsedType.type) && input.components) {
        setValue(value)
        let formatedValues = []
        try {
          formatedValues = JSON.parse(value)
        } catch {
          updateCompleteInput({ components: input.components, setError: true })
          return
        }

        if (!Array.isArray(formatedValues)) {
          updateCompleteInput({ components: input.components, setError: true })
          return
        }

        let newComponents = input.components
        if (input.parsedType.lengthType === 'dynamic' && input.parsedType.components) {
          newComponents = handleDynamicComponents(input.parsedType.components, formatedValues)
        }
        updateCompleteInput({ components: newComponents, values: formatedValues })
        return
      }

      /**
       * @function handleInput
       * @description This function handles the input changes and updates the element's value and status based on the input type.
       * @param elem - The element to be updated.
       * @param index - The index of the element in the array.
       * @param searchedIndex - The index of the searched element.
       * @returns The updated element.
       */
      const handleInput = (elem: InternalInputProps, index: number, searchedIndex: number) => {
        if (index === indexs[searchedIndex]) {
          if (searchedIndex !== indexs.length - 1) {
            elem.components?.forEach((subElem: InternalInputProps, i: number) => {
              handleInput(subElem, i, searchedIndex + 1)
            })
          } else {
            elem.status = undefined
            switch (input.parsedType.type) {
              case 'boolean':
                if (value === 'true' || value === 'false') {
                  elem.value = JSON.parse(value)
                  setValue(undefined)
                } else {
                  elem.value = null
                  elem.status = value !== '' ? 'error' : undefined
                  setValue(value)
                }
                break
              case 'number':
                elem.value = value === '' || !value ? null : parseInt(value)
                break
              case 'bytes':
                if (validateBytes(value, elem.parsedType.length)) {
                  elem.value = value
                  setValue(undefined)
                } else {
                  elem.value = null
                  elem.status = value !== '' ? 'error' : undefined
                  setValue(value)
                }
                break
              case 'address':
                if (validateAddress(value)) {
                  elem.value = value
                  setValue(undefined)
                } else {
                  elem.value = null
                  elem.status = value !== '' ? 'error' : undefined
                  setValue(value)
                }
                break
              default:
                elem.value = value
            }
          }
        }
        return elem
      }

      modifyReqBody(formik, indexs, handleInput)
    },
    [input, formik, updateCompleteInput]
  )

  const handleInputChange = useCallback(
    (e: { target: { value: string } }) => {
      handleInputs(e.target.value, indexs)
    },
    [indexs, handleInputs]
  )

  return (
    <Box display={'flex'} width={'100%'} height={'100%'} gap={'0.5rem'}>
      <Box width={'100%'} height={'100%'} borderRadius={'0 0.5rem 0.5rem 0'} sx={{ ...commonRowStyles }}>
        {!input.open ? (
          <TextField
            data-testid="row-text-input"
            size="medium"
            color="level0"
            name="value"
            type={['number'].includes(input.parsedType.type) ? 'number' : 'any'}
            value={value ? value : input.value ?? ''}
            InputProps={{ inputProps: { min: 0 } }}
            onChange={handleInputChange}
            fullWidth
            sx={{
              border: `1px solid ${input.status === 'error' ? theme.palette.error.main : theme.palette.background.level2} !important`,
              borderRadius: '0.5rem',
            }}
          />
        ) : null}
      </Box>
      {actions.length !== 0
        ? actions.map((elem: ActionTypes) => <ActionButtons formik={formik} indexes={indexs} action={elem} key={elem} />)
        : null}
    </Box>
  )
}

export default InputText
