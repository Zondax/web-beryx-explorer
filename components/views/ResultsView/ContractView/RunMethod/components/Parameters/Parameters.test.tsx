import { FormikProps } from 'formik'

import { renderWithProviders } from '@/helpers/jest-react'
import '@testing-library/jest-dom'
import { act, fireEvent, screen } from '@testing-library/react'

import { initialValues } from '../../RunMethod'
import { RunMethodFormValues } from '../../config'
import Parameters from './Parameters'

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
 * Skipping the test suite for Parameters component
 */
describe('Parameters', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  /** Tests that the component correctly switches to text input when the button is clicked */
  test('should switch to text input when button is clicked', () => {
    renderWithProviders(<Parameters formik={mockFormik} />)

    act(() => {
      fireEvent.click(screen.getByText('Switch to Text Input'))
    })

    expect(screen.getByTestId('code-block-text-input')).toBeInTheDocument()
    expect(screen.queryByTestId('interact-table-input')).not.toBeInTheDocument()
  })

  /** Tests that the component correctly switches to table input when the button is clicked */
  test('should switch to table input when button is clicked', () => {
    renderWithProviders(<Parameters formik={mockFormik} />)

    expect(screen.getByTestId('interact-table-input')).toBeInTheDocument()
    expect(screen.queryByTestId('code-block-text-input')).not.toBeInTheDocument()
  })

  /** Tests that formik values are correctly updated when handleParameters is called */
  test('should call updateValues and set formik values when handleParameters is called', () => {
    renderWithProviders(<Parameters formik={mockFormik} />)

    act(() => {
      fireEvent.click(screen.getByText('Switch to Text Input'))
    })

    expect(mockFormik.setValues).toHaveBeenCalledTimes(1)
    expect(mockFormik.setValues).toHaveBeenCalledWith({
      ...mockFormik.values,
      requestBodyString: undefined,
      requestBody: [],
    })
  })
})
