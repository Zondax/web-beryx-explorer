import { FormikProps } from 'formik'

import { ContractVerificationRequirements } from '@/api-client/beryx.types'
import { renderWithProviders } from '@/helpers/jest-react'
import '@testing-library/jest-dom'
import { fireEvent } from '@testing-library/react'

import { initialValues } from '../../../../../ContractVerifier'
import MetadataForm from './MetadataForm'

const mockPartialFormik: Partial<jest.Mocked<FormikProps<ContractVerificationRequirements>>> = {
  values: initialValues,
  handleSubmit: jest.fn(),
  setValues: jest.fn(),
}
const mockFormik = mockPartialFormik as FormikProps<ContractVerificationRequirements>

/**
 * @desc This function runs tests to validate the MetadataForm component.
 * @func describe
 * @param - This is the name for the group of the tests.
 * @param - This is the function that contains the tests.
 */
describe('MetadataForm', () => {
  /**
   * @desc It tests if the MetadataForm component renders without crashing.
   * @func it
   * @param - A string description of the test.
   * @param - The test function.
   */
  it('renders without crashing', async () => {
    const mockAction = jest.fn()

    const { getByText } = await renderWithProviders(
      <MetadataForm formik={mockFormik} setMetadataNameFile={mockAction} setMetadataError={mockAction} />
    )
    // Check if the MetadataForm component renders.
    expect(getByText('Upload your metadata from a *.json file')).toBeInTheDocument()
  })

  /**
   * @desc Skipped test that checks file input change from a json type file.
   * @func it
   * @param - A string description of the test.
   * @param - The test function.
   */
  it.skip('handles file input change - json', async () => {
    const setMetadataNameFile = jest.fn()
    const setMetadataError = jest.fn()

    const { getByLabelText } = await renderWithProviders(
      <MetadataForm formik={mockFormik} setMetadataNameFile={setMetadataNameFile} setMetadataError={setMetadataError} />
    )
    // Create a new file object having file type of 'json'.
    const file = new File(['{}'], 'chucknorris.json', { type: 'json' })
    const input = getByLabelText('Upload your metadata from a *.json file')
    fireEvent.change(input, { target: { files: [file] } })

    /**
     * @class MockFileReader
     * @desc This class mocks the FileReader class for testing purposes.
     */
    class MockFileReader {
      /**
       * @method readAsText
       * @desc This method mocks the readAsText method of the FileReader class.
       */
      readAsText = () => {
        ;(this as any).onloadend?.()
      }
      /**
       * @property result
       * @desc This property mocks the result property of the FileReader class.
       */
      result = JSON.stringify({ key: 'value' })
    }

    // Mock FileReader
    window.FileReader = MockFileReader as any

    // Allow the event handlers to complete
    // Increase the timeout to give the handler more time
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Check the initial call of setMetadataNameFile
    // Expect the first argument of the first call to be undefined
    expect(setMetadataNameFile.mock.calls[0][0]).toBeUndefined()

    // Check the initial call of setMetadataError
    // Expect the first argument of the first call to be undefined
    expect(setMetadataError.mock.calls[0][0]).toBeUndefined()

    // Check the subsequent call of setMetadataNameFile
    // Expect the second call to be defined
    expect(setMetadataNameFile.mock.calls[1]).toBeDefined()

    // Check the first argument of the second call of setMetadataNameFile
    // Expect it to be the name of the uploaded file
    expect(setMetadataNameFile.mock.calls[1][0]).toEqual('chucknorris.json')
  })

  /**
   * @desc Skipped test that checks metadata deletion.
   * @func it
   * @param - A string description of the test.
   * @param - The test function.
   */
  it.skip('handles metadata deletion', async () => {
    const setMetadataNameFile = jest.fn()
    const setMetadataError = jest.fn()

    const { getByLabelText, getByText } = await renderWithProviders(
      <MetadataForm formik={mockFormik} setMetadataNameFile={setMetadataNameFile} setMetadataError={setMetadataError} />
    )
    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' })
    const input = getByLabelText('Upload your metadata from a *.json file')
    fireEvent.change(input, { target: { files: [file] } })
    const deleteButton = getByText('Delete')
    fireEvent.click(deleteButton)
    // Check if calling the function after deleting metadata resets it
    expect(setMetadataNameFile).toHaveBeenCalledWith(undefined)
    expect(setMetadataError).toHaveBeenCalledWith(undefined)
  })
})
