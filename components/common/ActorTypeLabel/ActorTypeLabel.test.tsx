import { renderWithProviders } from '@/helpers/jest-react'
import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'

import ActorTypeLabel from './ActorTypeLabel'

/**
 * Test suite for ActorTypeLabel component
 */
describe('ActorTypeLabel', () => {
  /**
   * Test if the label text is rendered correctly
   */
  it('renders the label text', () => {
    renderWithProviders(<ActorTypeLabel label="Test Label" />)

    expect(screen.getByText('Test Label')).toBeInTheDocument()
  })
})
