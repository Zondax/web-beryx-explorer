import { FormikProps } from 'formik'
import { act } from 'react'

import { Networks } from '@/config/networks'
import { hookHelper } from '@/helpers/jest'
import { renderWithProviders } from '@/helpers/jest-react'
import { useSearchStore } from '@/store/data/search'
import { fireEvent, screen } from '@testing-library/react'

import { initialValues } from '../RunMethod'
import { RunMethodFormValues, defaultUnit } from '../config'
import Buttons from './Buttons'

const mockPartialFormik: Partial<jest.Mocked<FormikProps<RunMethodFormValues>>> = {
  values: initialValues,
  handleSubmit: jest.fn(),
  setValues: jest.fn(),
}
const mockFormik = mockPartialFormik as FormikProps<RunMethodFormValues>

const mockPartialWriteFormik: Partial<jest.Mocked<FormikProps<RunMethodFormValues>>> = {
  values: {
    method: undefined,
    type: 'payable',
    amount: undefined,
    unitAmount: defaultUnit,
    requestBody: [],
  },
  handleSubmit: jest.fn(),
  setValues: jest.fn(),
}
const mockWriteFormik = mockPartialWriteFormik as FormikProps<RunMethodFormValues>

beforeEach(() => {
  const searchStore = hookHelper(useSearchStore)

  act(() => {
    searchStore().setSearchInputNetwork(Networks.calibraiton)
  })
})

// Begin test suite
describe('Buttons', () => {
  // Test handling of tutorial button click
  it('should trigger handleOpenTutorial when "Read Tutorial" button is clicked', async () => {
    const handleOpenTutorial = jest.fn()
    await renderWithProviders(<Buttons handleOpenTutorial={handleOpenTutorial} formik={mockFormik} />)
    fireEvent.click(screen.getByText('Read Tutorial'))
    expect(handleOpenTutorial).toHaveBeenCalled()
  })

  // Test tooltip display when no form errors present
  it('should not display tooltip when there are no form errors', async () => {
    const { container } = await renderWithProviders(<Buttons formik={mockFormik} handleOpenTutorial={jest.fn()} />)
    fireEvent.mouseOver(screen.getByRole('button', { name: 'Run Method' }))

    const tooltip = container.querySelector('.MuiTooltip-tooltip')
    expect(tooltip).toBeNull()
  })

  // Test helper text display in tooltip when no form errors present
  it('should not display "helper" text in tooltip when there are no form errors', async () => {
    const helper = 'Helper text'
    await renderWithProviders(
      <Buttons
        formik={mockFormik}
        helper={helper}
        handleOpenTutorial={() => {
          throw new Error('Function not implemented.')
        }}
      />
    )
    expect(screen.queryByText('Helper text')).toBeNull()
  })

  // Test button and tooltip display when a payable method is selected
  it('should display "Connect Wallet to Run" button without tooltip if the selected method is payable', async () => {
    const { container } = await renderWithProviders(<Buttons formik={mockWriteFormik} handleOpenTutorial={jest.fn()} />)
    expect(screen.getByRole('button', { name: 'Connect Wallet to Run' })).toBeDefined()
    fireEvent.mouseOver(screen.getByRole('button', { name: 'Connect Wallet to Run' }))

    const tooltip = container.querySelector('.MuiTooltip-tooltip')
    expect(tooltip).toBeNull()
  })
})
