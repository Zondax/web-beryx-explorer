import { renderWithProviders } from '@/helpers/jest-react'
import { screen } from '@testing-library/react'

import ErrorView from './ErrorView'

/**
 * Test suite for ErrorView
 */
describe('ErrorView', () => {
  /**
   * Test to check if ErrorView renders successfully
   */
  it('should render ', async () => {
    await renderWithProviders(<ErrorView />)
    /**
     * Check if the title is defined
     */
    const title = screen.getByTestId('title-error-view')
    expect(title).toBeDefined()
  })
})
