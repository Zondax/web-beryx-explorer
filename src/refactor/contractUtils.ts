import { FormikProps } from 'formik'

import { InputProps } from '@/api-client/beryx.types'
import { FormInputsProps } from '@/store/ui/contracts'
import { isArrayType } from '@/utils/arrays'

import { rowGap, rowHeight } from '../../components/views/ResultsView/ContractView/RunMethod/components/Parameters/Row'
import { RunMethodFormValues } from '../../components/views/ResultsView/ContractView/RunMethod/config'
import { FieldValues, InternalInputProps } from '../../components/views/ResultsView/ContractView/config'

/**
 * Deletes the value of an input. If the input is a string, the value is set to an empty string ('').
 *
 * @param input - An object of type InternalInputProps.
 *
 * @returns The cleaned input value.
 */
export const cleanInput = (input: InternalInputProps) => {
  return !['string'].includes(input.parsedType.type) ? undefined : ''
}

/**
 * Analyzes if the input row is completed.
 * To be considered completed, all components inside the row must be completed.
 *
 * @param elem - An array of InternalInputProps.
 *
 * @returns A boolean indicating whether all components in the row are completed.
 */
export const isCompletedRow = (elem: InternalInputProps[]): boolean => {
  return elem.every(function (i) {
    return i.status === 'completed'
  })
}

/**
 * Checks if an input is completed.
 * If the input is of type string, it is always considered completed (even if it's null).
 *
 * @param elem - An object of type InternalInputProps.
 *
 * @returns A boolean indicating whether the input is completed.
 */
export const isCompletedInput = (elem: InternalInputProps): boolean => {
  let isCompleted = true
  if (!['string'].includes(elem.parsedType.type) && (elem.value === undefined || elem.value === null)) {
    isCompleted = false
  }
  return isCompleted
}

/**
 * Creates a deep copy of the internal inputs.
 * @param input - The internal input props to be copied.
 * @returns A deep copy of the provided internal input props.
 */
export const copyComponents = (input: InternalInputProps): InternalInputProps => {
  const newInput = { ...input }
  if (['array', 'object'].includes(input.parsedType.type)) {
    const newComp = input.components?.map(elem => {
      return copyComponents(elem)
    })
    newInput.components = newComp ? [...newComp] : undefined
  } else {
    newInput.value = cleanInput(input)
  }

  return newInput
}

/**
 * Add the same number of components that has the values. It's for dynamic components.
 *
 * @param components - A InternalInputProps. It's the original component.
 * @param currentValue - An array of values completed for the user.
 *
 * @returns An array of InternalInputProps with the same lenght that the currentValue.
 */
export const handleDynamicComponents = (components: InternalInputProps, currentValue: FieldValues[]): InternalInputProps[] => {
  const newComponents: InternalInputProps[] = []
  for (let i = 0; i < currentValue.length; i++) {
    const newElem: InternalInputProps = copyComponents(components)
    newElem.name = `position${i}`
    newComponents.push(newElem)
  }
  return newComponents
}

/**
 * Updates the values of the given elements with the provided values or default values if no values are provided.
 * If there is a mismatch in the length of the elements and values, an error is returned.
 * For 'array' and 'object' types, the function is called recursively to update their components.
 * For other types, the value is updated directly.
 *
 * @param elem - An array of InternalInputProps.
 * @param values - An optional array of values to replace the existing values.
 *
 * @returns An object containing a boolean indicating whether an error occurred and an optional array of updated InternalInputProps.
 */
export const updateValues = (elem: InternalInputProps[], values?: FieldValues[]): { error?: boolean; inputs?: InternalInputProps[] } => {
  if (values && elem.length !== values.length) {
    return { error: true }
  }

  let errorOccurred = false
  const updatedInputs = elem.map((input, index) => {
    const currentValue = values ? values[index] : undefined

    if (['array', 'object'].includes(input.parsedType.type)) {
      let newComponents = input.components ?? []

      if (
        currentValue &&
        Array.isArray(currentValue) &&
        input.parsedType.lengthType === 'dynamic' &&
        input.parsedType.components &&
        input.components?.length !== currentValue.length
      ) {
        newComponents = handleDynamicComponents(input.parsedType.components, currentValue)
      }

      const { error: currentError, inputs: updatedComponent } = updateValues(
        newComponents,
        Array.isArray(currentValue) ? currentValue : undefined
      )

      if (currentError) {
        errorOccurred = true
      }

      input.components = updatedComponent
    } else {
      input.value = currentValue !== null && currentValue !== undefined && !Array.isArray(currentValue) ? currentValue : cleanInput(input)
    }

    return input
  })

  return { error: errorOccurred, inputs: updatedInputs }
}

/**
 * Calculates the arrow height of a row.
 *
 * @param inputs - An array of InternalInputProps.
 * @param indexs - An array of indices.
 *
 * @returns The calculated arrow height.
 */
export const getArrowHeight = (inputs: InternalInputProps[], indexs: number[]) => {
  let height: number = rowHeight + rowGap
  let fieldFound = false // Indicate if the selected field was found
  let searchedIndex = 0 // Position of the indexs array in which we are searching

  const getComponentsHeight = (elem: InternalInputProps[], index: number, open: boolean | undefined) => {
    height += rowHeight

    if (open) {
      elem.forEach((subElem, i) => {
        if (subElem.components) {
          getComponentsHeight(subElem.components, i, subElem.open)
        } else {
          height += rowHeight + rowGap
        }
      })
    } else {
      height += rowGap
    }
  }

  /**
   * Calculates the height of a given element.
   *
   * @param elem - An array of InternalInputProps.
   * @param index - The index of the current element.
   * @param open - A boolean indicating whether the element is open or not.
   */
  const getHeight = (elem: InternalInputProps[], index: number, open: boolean | undefined) => {
    if (fieldFound) {
      return
    }
    const addHeight = searchedIndex >= indexs.length - 1

    if (addHeight && index < indexs[searchedIndex]) {
      getComponentsHeight(elem, index, open)
    }

    if (index === indexs[searchedIndex]) {
      // It means, it's the last index. We finish calculating the height
      if (searchedIndex === indexs.length - 1) {
        fieldFound = true
        return
      }
      if (addHeight) {
        height += rowHeight + rowGap
      }
      searchedIndex += 1
      elem.forEach((subElem, i) => {
        getHeight(subElem.components ?? [], i, subElem.open)
      })
    }
  }

  inputs?.forEach(({ components, open }, index) => {
    if (components && !fieldFound) {
      getHeight(components, index, open)
    }
  })

  return height
}

/**
 * Parses the requestBody saved and returns the formatted request to send through web3.
 * Review the test to find an example.
 *
 * @param request - An array of InternalInputProps.
 *
 * @returns An array of parsed requests.
 */
export const parseRequest = (request: InternalInputProps[]): FieldValues[] => {
  return request.map(({ components, value }: InternalInputProps) => {
    /**
     * If the current element has components, recursively parse the request for its components.
     * Otherwise, return the value of the current element or null if it's undefined.
     *
     * @param components - An array of InternalInputProps.
     * @param value - The value of the current element.
     *
     * @returns The parsed request for the current element.
     */
    if (components) {
      return parseRequest(components)
    }
    return value ?? null
  })
}

/**
 * Adds a 'complete' field to each component in the inputs array based on whether it is complete or not.
 * @param inputs - An array of InternalInputProps.
 * @returns An object containing an array of updated components and an object with the statistics of the inputs.
 */
export const addCompleteField = (inputs: InternalInputProps[]): { components: InternalInputProps[]; inputsStats: FormInputsProps } => {
  const tableInputs: FormInputsProps = { completed: 0, total: 0 }

  const result = inputs.map((elem: InternalInputProps) => {
    const completeElem: InternalInputProps = { ...elem }
    // If the element type is either 'array' or 'object' and has components, recursively add 'complete' field to its components.
    if (['array', 'object'].includes(elem.parsedType.type) && elem.components) {
      const subResult = addCompleteField(elem.components)
      completeElem.components = subResult.components

      // If the element status is not 'error', update the completed count and status based on the subResult statistics.
      if (elem.status !== 'error') {
        tableInputs.completed += subResult.inputsStats.completed
        completeElem.status = subResult.inputsStats.completed === subResult.inputsStats.total ? 'completed' : undefined
      }
      tableInputs.total += subResult.inputsStats.total
    } else {
      // If the element status is not 'error' and the input is completed, update the status and completed count.
      if (completeElem.status !== 'error' && isCompletedInput(elem)) {
        completeElem.status = 'completed'
        tableInputs.completed += 1
      }
      tableInputs.total += 1
    }
    return completeElem
  })

  return { components: result, inputsStats: tableInputs }
}

/**
 * Type for the action function used in modifyReqBody function.
 * @param elem - The current element being processed in the array.
 * @param index - The index of the current element being processed in the array.
 * @param searchedIndex - The position of the indexs array in which we are searching.
 */
export type ActionFunction = (elem: InternalInputProps, index: number, searchedIndex: number) => InternalInputProps

/**
 * Modifies the request body of the formik object based on the provided action function.
 * @param formik - The formik object whose request body is to be modified.
 * @param indexs - An array of indices indicating the position of the field to be updated in the request body.
 * @param action - The action function to be applied on the field to be updated.
 */
export const modifyReqBody = (formik: FormikProps<RunMethodFormValues>, indexs: number[], action: ActionFunction) => {
  const newParameters = formik.values.requestBody ? [...formik.values.requestBody] : []
  let fieldChanged = false // Indicate if the selected field was changed
  const searchedIndex = 0 // Position of the indexs array in which we are searching

  const finalResult = newParameters.map((elem: InternalInputProps, currentIndex: number) => {
    // If the field to update was found, the rest of request body doesn't change
    if (fieldChanged) {
      return elem
    }
    if (currentIndex === indexs[searchedIndex]) {
      fieldChanged = true
    }

    return action(elem, currentIndex, searchedIndex)
  })

  formik.setValues({ ...formik.values, requestBody: finalResult })
}

/**
 * Interface for the parsed type properties.
 * @property type - The type of the parsed property. It can be 'array', 'object', 'string', 'number', 'boolean', 'bytes', or 'address'.
 * @property [lengthType] - The length type of the parsed property. It can be 'fixed' or 'dynamic'.
 * @property [length] - The length of the parsed property.
 * @property [index] - The index of the parsed property.
 * @property {InternalInputProps} [components] - The clean component. It will be present if the input is a dynamic array.
 */
export interface ParsedTypeProps {
  type: 'array' | 'object' | 'string' | 'number' | 'boolean' | 'bytes' | 'address'
  lengthType?: 'fixed' | 'dynamic'
  length?: number
  index?: number
  components?: InternalInputProps // the clean component. It'll be if the input is a dynamic array
}

/**
 * Analize the received type from the API and return the internal type:
 * ParsedTypeProps
 */
export const getParsedType = (input: InputProps): ParsedTypeProps => {
  const isArray = isArrayType(input.type)
  if (isArray) {
    return {
      type: 'array',
      lengthType: isArray.type,
      length: isArray.length,
      index: isArray.index,
    }
  }

  if (input.type === 'tuple') {
    return { type: 'object' }
  }

  if (input.type.includes('int')) {
    return { type: 'number' }
  }

  if (input.type.includes('bool')) {
    return { type: 'boolean' }
  }

  if (input.type.includes('address')) {
    return { type: 'address' }
  }

  if (input.type.includes('bytes')) {
    const tempLength = input.type.replace('bytes', '')
    const length = !isNaN(parseInt(tempLength)) ? parseInt(tempLength) : undefined
    return { type: 'bytes', length, lengthType: length ? 'fixed' : 'dynamic' }
  }

  return { type: 'string' }
}

/**
 * Analize the received byte input and return true if:
 * * the input starts with 0x
 * * the elementes are in [A-F,0-9,a-f]
 * * the received and expected length match
 */
export const validateBytes = (input: string, lengthExpected?: number): boolean => {
  const regex = /^(0x[A-F0-9a-f]{1,})$/g
  const matches = regex.exec(input)
  if (!matches) {
    return false
  }

  const bytesLength = input.slice(2).length
  if (lengthExpected && bytesLength !== lengthExpected * 2) {
    return false
  }

  return !(!lengthExpected && bytesLength % 2 !== 0)
}

/**
 * Analize the received input is an address. Return true if the input:
 * * starts with 0x,
 * * is byte20
 */
export const validateAddress = (input: string): boolean => {
  const regex = /^(0x[A-F0-9a-f]{40})$/g
  const matches = regex.exec(input)
  return matches !== null
}

/**
 * Calculates the left padding for a row based on its depth in the tree.
 * @param value - The depth of the row in the tree.
 * @returns A string representing the calculated left padding.
 */
export const getPaddingLeftRow = (value: number) => {
  return `calc(${value - 1} * 2rem)`
}
