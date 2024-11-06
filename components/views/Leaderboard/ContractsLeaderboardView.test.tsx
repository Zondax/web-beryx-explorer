import { renderWithProviders } from '@/helpers/jest-react'
import { screen } from '@testing-library/react'

import ContractsLeaderboardView from './ContractsLeaderboardView'

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: {},
    pathname: '',
    replace: jest.fn(),
  }),
}))

/**
 * Describes a test suite for ContractsLeaderboardView component.
 */
describe('ContractsLeaderboardView', () => {
  /**
   * Test case: Should render the page and show the panel.
   */
  it('Should render the page and show the panel', async () => {
    await renderWithProviders(<ContractsLeaderboardView />)

    const title = screen.getByTestId('leaderbord-panel')
    const richList = screen.getByText('Richest Contracts')
    const topContracts = screen.getByText('Top Contracts By Unique Users')
    const topContractsByInvokes = screen.getByText('Top Contracts By Invokes')
    const topContractsByValueExchanged = screen.getByText('Top Contracts By Value Exchanged')
    expect(title).toBeDefined()
    expect(richList).toBeVisible()
    expect(topContractsByValueExchanged).toBeVisible()
    expect(topContracts).toBeVisible()
    expect(topContractsByInvokes).toBeVisible()
  })
})
