import { renderWithProviders } from '@/helpers/jest-react'
import { screen } from '@testing-library/react'

import LeaderboardController from '../../../pages/leaderboard'

describe('Leaderboard Page', () => {
  it('renders without crashing', async () => {
    await renderWithProviders(<LeaderboardController />)
    const elements = screen.getAllByText('Leaderboard')
    expect(elements.length).toBeGreaterThan(0)
  })
})
