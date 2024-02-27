import { renderWithProviders } from '@/helpers/jest-react'
import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'

import General from './General'

/**
 * Test Suite for Dashboard General component
 */
describe('Dashboard General', () => {
  /**
   * Test: Does not render the first tile if there is no data
   */
  it('does not render the first tile if there is no data', async () => {
    await renderWithProviders(<General />)

    // Check if the first tile is not rendered
    expect(screen.queryByTestId('gas-used-this-week')).toBeInTheDocument()
    expect(screen.queryByTestId('avg-gas-used-past-24-hours')).toBeInTheDocument()
    expect(screen.queryByTestId('daily-gas-consumption')).toBeInTheDocument()
  })
})
