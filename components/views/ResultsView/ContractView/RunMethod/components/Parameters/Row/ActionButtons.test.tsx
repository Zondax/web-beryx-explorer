import { FormikProps } from 'formik'
import { act } from 'react-dom/test-utils'

import { renderWithProviders } from '@/helpers/jest-react'
import { fireEvent, render, screen } from '@testing-library/react'

import { initialValues } from '../../../RunMethod'
import { RunMethodFormValues } from '../../../config'
import ActionButtons from './ActionButtons'

const mockPartialFormik: Partial<jest.Mocked<FormikProps<RunMethodFormValues>>> = {
  values: initialValues,
  handleSubmit: jest.fn(),
  setValues: jest.fn(),
}
const mockFormik = mockPartialFormik as FormikProps<RunMethodFormValues>

/**
 * @description Suite of tests for ActionButton component
 */
describe('ActionButtons', () => {
  // Define mock variables for testing
  const mockIndexs = [0]
  mockFormik.values = {
    requestBody: [
      {
        components: [
          {
            components: undefined,
            parsedType: { type: 'bytes' },
            name: 'data',
            type: 'bytes',
            internalType: 'bytes',
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
      },
    ],
  }

  /**
   * @description Test for rendering add button
   **/
  test('renders add button', async () => {
    await renderWithProviders(<ActionButtons action={'add'} indexes={mockIndexs} formik={mockFormik as FormikProps<RunMethodFormValues>} />)
    const addButton = screen.getByTestId('add-button')
    expect(addButton).toBeInTheDocument()
  })

  /**
   * @description Test for rendering delete button
   **/
  test('renders delete button', async () => {
    await renderWithProviders(
      <ActionButtons action={'delete'} indexes={mockIndexs} formik={mockFormik as FormikProps<RunMethodFormValues>} />
    )
    const deleteButton = screen.getByTestId('delete-button')
    expect(deleteButton).toBeInTheDocument()
  })

  /**
   * @description Test for calling modifyReqBody with addElem when add button is clicked
   **/
  test('calls modifyReqBody with addElem when add button is clicked', async () => {
    await renderWithProviders(<ActionButtons action={'add'} indexes={mockIndexs} formik={mockFormik as FormikProps<RunMethodFormValues>} />)

    const addButton = screen.getByTestId('add-button')

    act(() => {
      fireEvent.click(addButton)
      expect(mockFormik.setValues).toHaveBeenCalledWith(
        expect.objectContaining({
          requestBody: expect.arrayContaining([
            expect.objectContaining({
              name: 'data',
              type: 'bytes[]',
              parsedType: expect.objectContaining({
                type: 'array',
                lengthType: 'dynamic',
                length: 1,
              }),
            }),
          ]),
        })
      )
    })
  })

  /**
   * @description Test for calling modifyReqBody with deleteElem when delete button is clicked
   **/
  test('calls modifyReqBody with deleteElem when delete button is clicked', () => {
    render(<ActionButtons action={'delete'} indexes={mockIndexs} formik={mockFormik as FormikProps<RunMethodFormValues>} />)
    const deleteButton = screen.getByTestId('delete-button')

    fireEvent.click(deleteButton)

    expect(mockFormik.setValues).toHaveBeenCalledWith(
      expect.objectContaining({
        requestBody: expect.arrayContaining([
          expect.objectContaining({
            name: 'data',
            type: 'bytes[]',
            parsedType: expect.objectContaining({
              type: 'array',
              lengthType: 'dynamic',
              length: 1,
            }),
          }),
        ]),
      })
    )
  })
})
