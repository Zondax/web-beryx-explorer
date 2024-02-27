import { renderWithProviders } from '@/helpers/jest-react'
import { screen } from '@testing-library/react'

import LeaderboardView from './LeaderboardView'

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: {},
    pathname: '',
    replace: jest.fn(),
  }),
}))

/**
 * Describes a test suite for LeaderbordView component.
 */
describe('LeaderbordView', () => {
  /**
   * Test case: Should render the page and show the panel.
   */
  it('Should render the page and show the panel', async () => {
    await renderWithProviders(<LeaderboardView />)

    const title = screen.getByTestId('leaderbord-panel')
    const richList = screen.getByText('Rich List')
    const topContracts = screen.getByText('Top Contracts By Unique Users')
    const topAccounts = screen.getByText('Top Accounts By Gas Used')
    expect(title).toBeDefined()
    expect(richList).toBeVisible()
    expect(topAccounts).toBeVisible()
    expect(topContracts).toBeVisible()
  })
})
