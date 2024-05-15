// Importing required libraries and components
import { FormikProps } from 'formik'
import { useCallback } from 'react'

import { InputProps } from '@/api-client/beryx.types'
import { ActionFunction, copyComponents, modifyReqBody } from '@/refactor/contractUtils'
import { Add, TrashCan } from '@carbon/icons-react'
import { IconButton, useTheme } from '@mui/material'

import { InternalInputProps } from '../../../../config'
import { RunMethodFormValues } from '../../../config'
import { ActionTypes, rowHeight } from './Row'

// Define the parameters for the ActionButtons component
interface ActionButtonsParams {
  indexes: number[]
  formik: FormikProps<RunMethodFormValues>
  action: ActionTypes
}

/**
 * ActionButtons component allows adding and deleting elements in the array
 * @param props - React properties passed to the component
 * @returns - the ActionButtons component.
 */
const ActionButtons = ({ action, indexes, formik }: ActionButtonsParams) => {
  const theme = useTheme()
  const buttonWidth = rowHeight
  /**
   * addElem function is responsible for adding an element to the array
   * @param elem - the element to be added
   * @param index - the index of the array to add the element
   * @param searchedIndex - the index used for comparing
   * @returns - returns the modified elem
   */
  const addElem: ActionFunction = useCallback(
    (elem: InternalInputProps, index: number, searchedIndex: number): InternalInputProps => {
      // Compare if the position in which we are searching is the same of the indicated one (in indexs)
      if (index === indexes[searchedIndex]) {
        if (searchedIndex !== indexes.length - 1) {
          elem.components = elem.components?.map((subElem: InternalInputProps, subIndex: number) => {
            return addElem(subElem, subIndex, searchedIndex + 1)
          })
        } else if (elem.parsedType.components) {
          // If the position is the last one, we add a new element
          const newElem: InternalInputProps = copyComponents(elem.parsedType.components)
          newElem.name = `position${elem.components?.length}`

          elem.components = elem.components ? [...elem.components, newElem] : [newElem]
        }
      }
      return elem
    },
    [indexes]
  )

  /**
   * deleteElem function is responsible for removing an element from the array
   * @param elem - the element to be deleted
   * @param index - the index of the array to remove the element
   * @param searchedIndex - the index used for comparing
   * @returns - returns the modified elem
   */
  const deleteElem: ActionFunction = useCallback(
    (elem: InternalInputProps, index: number, searchedIndex: number): InternalInputProps => {
      // Compare if the position in which we are searching is the same of the indicated one (in indexs)
      if (index === indexes[searchedIndex]) {
        // If the position is the penultimate, we should eliminate the elem with the same index that the last one of searchedIndex
        if (searchedIndex !== indexes.length - 2) {
          elem.components = elem.components?.map((subElem: InternalInputProps, subIndex: number) => {
            return deleteElem(subElem, subIndex, searchedIndex + 1)
          })
        } else {
          const filteredComponents = elem.components?.filter((subElem: InputProps, subIndex: number) => {
            return subIndex !== indexes[indexes.length - 1]
          })

          if (filteredComponents?.length === 0) {
            elem.components = []
          } else {
            elem.components = filteredComponents?.map((subElem: InternalInputProps, subIndex: number) => {
              subElem.name = `position${subIndex}`
              return subElem
            })
          }
        }
      }
      return elem
    },
    [indexes]
  )

  /**
   * handleDeleteBody function is responsible for deleting an element from the request
   * @returns - void
   */
  const handleDeleteBody = useCallback(() => {
    modifyReqBody(formik, indexes, deleteElem)
  }, [formik, indexes, deleteElem])

  /**
   * handleAddBody function is responsible for adding new element to the request
   * @returns - void
   */
  const handleAddBody = useCallback(() => {
    modifyReqBody(formik, indexes, addElem)
  }, [formik, indexes, addElem])

  // Display Add or Delete button based on the given action
  switch (action) {
    case 'add':
      return (
        <IconButton
          data-testid="add-button"
          color="info"
          sx={{
            width: buttonWidth,
            height: '100%',
            bgcolor: theme.palette.background.level3,
            borderRadius: '0.5rem',
            display: 'flex',
            justifyItems: 'center',
            '&:hover': {
              bgcolor: theme.palette.primary.main,
            },
          }}
          onClick={handleAddBody}
        >
          <Add width={18} height={18} color={'FFF'} />
        </IconButton>
      )
    case 'delete':
      return (
        <IconButton
          color="info"
          data-testid="delete-button"
          sx={{
            width: buttonWidth,
            height: '100%',
            bgcolor: theme.palette.background.level3,
            borderRadius: '0.5rem',
            display: 'flex',
            justifyItems: 'center',
            '&:hover': {
              bgcolor: theme.palette.primary.main,
            },
          }}
          onClick={handleDeleteBody}
        >
          <TrashCan width={16} height={16} color={'FFF'} />
        </IconButton>
      )
    default:
      return null
  }
}

export default ActionButtons
