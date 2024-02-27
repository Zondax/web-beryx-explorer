import { renderWithProviders } from '@/helpers/jest-react'
import { screen } from '@testing-library/react'

import DashboardController from '../../../pages/dashboard'

describe('Dashboard Page', () => {
  it('renders without crashing', async () => {
    await renderWithProviders(<DashboardController />)
    const elements = screen.getAllByText('Dashboard')
    expect(elements.length).toBeGreaterThan(0)
  })
})
