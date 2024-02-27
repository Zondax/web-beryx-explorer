import { renderWithProviders } from '@/helpers/jest-react'
import { screen } from '@testing-library/react'

import Currency from './Currency'

/**
 * Test suite for Currency component.
 */
describe('Currency', () => {
  /**
   * Test if the component renders without crashing.
   */
  it('renders without crashing', async () => {
    await renderWithProviders(<Currency icon={<span>Icon</span>} text="Test Currency" />)
    expect(screen.getByText('Test Currency')).toBeInTheDocument()
  })

  /**
   * Test if the correct icon is rendered.
   */
  it('renders the correct icon', async () => {
    await renderWithProviders(<Currency icon={<span>Icon</span>} text="Test Currency" />)
    expect(screen.getByText('Icon')).toBeInTheDocument()
  })

  /**
   * Test if any text is not rendered when the text prop is not provided.
   */
  it('does not render text when text prop is not provided', async () => {
    await renderWithProviders(<Currency icon={<span>Icon</span>} />)
    expect(screen.queryByText('Test Currency')).toBeNull()
  })
})
