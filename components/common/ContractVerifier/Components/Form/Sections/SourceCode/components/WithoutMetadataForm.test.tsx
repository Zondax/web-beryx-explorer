import { Formik, FormikProps } from 'formik'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

import { ContractVerificationRequirements } from '@/api-client/beryx.types'
import { setTestAuthToken } from '@/helpers/jest'
import { renderWithProviders } from '@/helpers/jest-react'
import '@testing-library/jest-dom'
import { fireEvent } from '@testing-library/react'

import { initialValues } from '../../../../../ContractVerifier'
import WithoutMetadataForm from './WithoutMetadataForm'

const mockPartialFormik: Partial<jest.Mocked<FormikProps<ContractVerificationRequirements>>> = {
  values: initialValues,
  handleSubmit: jest.fn(),
  setValues: jest.fn(),
  handleChange: jest.fn(),
}
const mockFormik = mockPartialFormik as FormikProps<ContractVerificationRequirements>
const mockCompilers = { available_compilers: ['0.8.21', '0.8.20', '0.8.19'] }

const server = setupServer(
  rest.post('https://protected-api.zondax.ch/auth/token', (req, res, ctx) => {
    return res(ctx.json({ token: 'TOKEN_TEST' }))
  }),
  rest.get('https://api.zondax.ch/fil/decoder/v3/mainnet/contract/verification/compilers', (req, res, ctx) => {
    return res(ctx.json(mockCompilers))
  })
)

/**
 * Test suite for WithoutMetadataForm
 */
describe('WithoutMetadataForm', () => {
  beforeAll(async () => {
    server.listen()
    await setTestAuthToken()
  })

  /**
   * Test case: Check if the form renders without crashing
   */
  it('renders without crashing', async () => {
    // Render the form
    const { getByLabelText } = await renderWithProviders(
      <Formik initialValues={initialValues} onSubmit={jest.fn()}>
        <WithoutMetadataForm formik={mockFormik} />
      </Formik>
    )
    expect(getByLabelText('Contract Name')).toBeInTheDocument()
  })

  /**
   * Test case: Form fields trigger handleChange on change
   */
  it('triggers handleChange when input fields are changed', async () => {
    // Render the form
    const { getByLabelText } = await renderWithProviders(
      <Formik initialValues={initialValues} onSubmit={jest.fn()}>
        <WithoutMetadataForm formik={mockFormik} />
      </Formik>
    )

    // Simulate a change event on Contract Name input
    fireEvent.change(getByLabelText('Contract Name'), { target: { value: 'Test Contract' } })

    // Expect that handleChange is called when input fields are changed
    expect(mockFormik.handleChange).toHaveBeenCalled()
  })
})
