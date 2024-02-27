import { renderWithProviders } from '@/helpers/jest-react'
import { screen, waitFor } from '@testing-library/react'

import HeroSection from './HeroSection'

/**
 * HeroSection component tests.
 */
describe('HeroSection', () => {
  /**
   * Test if HeroSection renders without crashing.
   */
  it('renders without crashing', async () => {
    await renderWithProviders(<HeroSection />)
    await waitFor(() => expect(screen.getByText('Start exploring the Filecoin Network.')).toBeInTheDocument())
    expect(screen.getByText('Start exploring the Filecoin Network.')).toBeInTheDocument()
  })
})
