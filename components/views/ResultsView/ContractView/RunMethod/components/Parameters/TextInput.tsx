import { FormikProps } from 'formik'
import { useCallback } from 'react'

import { Box } from '@mui/material'

import CodeBlock from '../../../../../../widgets/CodeBlock'
import { RunMethodFormValues } from '../../config'

/**
 * Interface for text input properties
 */
interface TextInputProps {
  /**
   * Formik object which is used to manage forms state
   */
  formik: FormikProps<RunMethodFormValues>
}

/**
 * TextInput component which contains a code block and handle changes on it.
 */
const TextInput = ({ formik }: TextInputProps) => {
  /**
   * Handle the change on the code block by updating the requestBodyString value in formik.
   *
   * @param value - The new code block value.
   */
  const handleCodeBlockChange = useCallback(
    (value: string | undefined) => {
      formik.setFieldValue('requestBodyString', value === '' ? undefined : value)
    },
    [formik]
  )

  return (
    <Box data-testid="code-block-text-input" mt={'0.5rem'}>
      <CodeBlock onChange={handleCodeBlockChange} content={formik.values.requestBodyString ?? ''} isInput readOnly={false} />
    </Box>
  )
}

export default TextInput
