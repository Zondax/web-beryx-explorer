import { renderWithProviders } from '@/helpers/jest-react'
import { screen } from '@testing-library/react'

import RecentActivityController from '../../../pages/recent_activity'

describe('Recent Activity Page', () => {
  it('renders without crashing', async () => {
    await renderWithProviders(<RecentActivityController />)
    const elements = screen.getAllByText('Recent Activity')
    expect(elements.length).toBeGreaterThan(0)
  })
})
