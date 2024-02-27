import { renderWithProviders } from '@/helpers/jest-react'

import MempoolTransactionStatus from './MempoolTransactionStatus'

/**
 * This test suite checks the behaviour of the MempoolTransactionStatus component.
 */
describe('MempoolTransactionStatus', () => {
  /**
   * Ensures that the MempoolTransactionStatus component renders without crashing.
   */
  it('renders loading', async () => {
    const { getByTestId } = await renderWithProviders(<MempoolTransactionStatus last_seen="2023-12-12T16:46:35.292931673Z" />)
    expect(getByTestId('transaction-status-box')).toBeInTheDocument()
  })

  /**
   * Ensures that the correct icon is rendered for an Ok status.
   */
  it('renders mempool status', async () => {
    const { getByTestId } = await renderWithProviders(<MempoolTransactionStatus last_seen={undefined} />)
    expect(getByTestId('status-icon-mempool')).toBeInTheDocument()
  })
})
