import { Networks } from '@/config/networks'
import { renderWithProviders } from '@/helpers/jest-react'
import { screen } from '@testing-library/react'

import Genesis from './Genesis'

// Defining mock network type for testing
const mockNetwork = Networks.mainnet

// Test suite for genesis Component
describe('Genesis', () => {
  // Test case: to check if genesis component is correctly rendered
  test('renders genesis component', async () => {
    // Rendering genesis Component with mock network data
    await renderWithProviders(<Genesis network={mockNetwork} />)

    // Expecting that the rendered component contains the text 'Network Information'
    expect(screen.getByText(/Network Information/i)).toBeInTheDocument()
  })
})
