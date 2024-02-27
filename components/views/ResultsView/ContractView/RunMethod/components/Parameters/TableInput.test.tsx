import { FormikProps } from 'formik'

import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { initialValues } from '../../RunMethod'
import { RunMethodFormValues } from '../../config'
import TableInput from './TableInput'

/**
 * Mocking the `updateValues` function from utils
 */
jest.mock('refactor/contractUtils', () => ({
  updateValues: jest.fn(() => ({ error: [], inputs: [] })),
  addCompleteField: jest.fn(),
}))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}))

const mockPartialFormik: Partial<jest.Mocked<FormikProps<RunMethodFormValues>>> = {
  values: initialValues,
  handleSubmit: jest.fn(),
  setValues: jest.fn(),
}
const mockFormik = mockPartialFormik as FormikProps<RunMethodFormValues>

/**
 * Test suite for TableInput component
 */
describe('TableInput', () => {
  /** Tests that the component correctly renders */
  test('should render TableInput component', () => {
    render(<TableInput formik={mockFormik} />)

    expect(screen.getByTestId('interact-table-input')).toBeInTheDocument()
  })
})
