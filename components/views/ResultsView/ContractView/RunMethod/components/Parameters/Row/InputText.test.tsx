import { FormikProps } from 'formik'

import { renderWithProviders } from '@/helpers/jest-react'
import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'

import { InternalInputProps } from '../../../../config'
import { initialValues } from '../../../RunMethod'
import { RunMethodFormValues } from '../../../config'
import InputText from './InputText'

const mockPartialFormik: Partial<jest.Mocked<FormikProps<RunMethodFormValues>>> = {
  values: initialValues,
  handleSubmit: jest.fn(),
  setValues: jest.fn(),
}
const mockFormik = mockPartialFormik as FormikProps<RunMethodFormValues>

/**
 * Test cases for InputText component, tests include
 * checking rendering of both add and delete buttons
 * and the functionality of the row text input.
 */
describe('InputText', () => {
  /**
   * Mock input object
   */
  const mockInput: InternalInputProps = {
    components: [
      {
        components: undefined,
        internalType: '',
        name: 'position0',
        type: 'bytes',
        parsedType: {
          type: 'bytes',
        },
      },
      {
        components: undefined,
        internalType: '',
        name: 'position1',
        type: 'bytes',
        parsedType: {
          type: 'bytes',
        },
      },
    ],
    internalType: '',
    name: 'data',
    type: 'bytes[]',
    parsedType: {
      type: 'array',
      lengthType: 'dynamic',
      length: 1,
    },
  }

  /**
   * Mock indexes
   */
  const mockIndexs = [0]

  /**
   * Mock formik instance
   */
  mockFormik.values = {
    requestBody: [
      {
        components: [
          {
            components: undefined,
            parsedType: { type: 'bytes' },
            name: 'position0',
            type: 'bytes',
            internalType: 'bytes',
          },
          {
            components: undefined,
            parsedType: { type: 'bytes' },
            name: 'position1',
            type: 'bytes',
            internalType: 'bytes',
          },
        ],
        internalType: '',
        name: 'data',
        type: 'bytes[2]',
        open: true,
        parsedType: {
          type: 'array',
          lengthType: 'fixed',
          length: 2,
        },
      },
    ],
  }
  /**
   * Test case to check if add button is rendered
   */
  it('renders add button', async () => {
    await renderWithProviders(
      <InputText actions={['add']} input={mockInput} indexs={mockIndexs} formik={mockFormik as FormikProps<RunMethodFormValues>} />
    )
    const addButton = screen.getByTestId('add-button')
    expect(addButton).toBeInTheDocument()
  })

  /**
   * Test case to check if delete button is rendered
   */
  it('renders delete button', async () => {
    await renderWithProviders(
      <InputText actions={['delete']} input={mockInput} indexs={mockIndexs} formik={mockFormik as FormikProps<RunMethodFormValues>} />
    )
    const deleteButton = screen.getByTestId('delete-button')
    expect(deleteButton).toBeInTheDocument()
  })

  /**
   * Test case to check if input text field is
   * rendered when the row is closed
   */
  it('render input text because the row is closed', async () => {
    await renderWithProviders(
      <InputText actions={['delete']} input={mockInput} indexs={mockIndexs} formik={mockFormik as FormikProps<RunMethodFormValues>} />
    )
    const textInput = screen.getByTestId('row-text-input')
    expect(textInput).toBeInTheDocument()
  })

  /**
   * Test case to check if input text field is
   * not rendered when the row is open
   */
  it('render input text because the row is open', async () => {
    const newMockInput = { ...mockInput }
    newMockInput.open = true
    await renderWithProviders(
      <InputText actions={['delete']} input={newMockInput} indexs={mockIndexs} formik={mockFormik as FormikProps<RunMethodFormValues>} />
    )
    let elemFound = false
    try {
      screen.getByTestId('row-text-input')
      elemFound = true
    } catch {
      // Handle the case where element is not found
    }

    expect(elemFound).toBe(false)
  })
})
