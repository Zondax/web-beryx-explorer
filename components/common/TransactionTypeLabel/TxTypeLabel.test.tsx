import { renderWithProviders } from '@/helpers/jest-react'
import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'

import TxTypeLabel from './TxTypeLabel'

/**
 * Component test suite
 * @function
 * @name describe
 * @param 'TxTypeLabel' - Name of the test suite
 */
describe('TxTypeLabel', () => {
  /**
   * Test case - checks if component rendering happens without the app crashing
   * @function
   * @name it
   * @param 'renders without crashing' - description of test case
   */
  it('renders without crashing', async () => {
    await renderWithProviders(<TxTypeLabel label="Test Label" />)
    const labelElement = screen.getByText(/Test Label/i)
    expect(labelElement).toBeInTheDocument()
  })

  /**
   * Test case - checks if the label given to the component is displayed correctly
   * @function
   * @name it
   * @param 'renders with correct label' - description of the test case
   */
  it('renders with correct label', async () => {
    await renderWithProviders(<TxTypeLabel label="Test Label" />)
    const labelElement = screen.getByText(/Test Label/i)
    expect(labelElement).toHaveTextContent('Test Label')
  })
})
