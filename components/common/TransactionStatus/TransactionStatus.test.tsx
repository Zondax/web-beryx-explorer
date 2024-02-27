import { renderWithProviders } from '@/helpers/jest-react'

import TransactionStatus from './TransactionStatus'

/**
 * This test suite checks the behaviour of the TransactionStatus component.
 */
describe('TransactionStatus', () => {
  /**
   * Ensures that the TransactionStatus component renders without crashing.
   */
  it('renders without crashing', async () => {
    const { getByTestId } = await renderWithProviders(<TransactionStatus status="Ok" />)
    expect(getByTestId('transaction-status-box')).toBeInTheDocument()
  })

  /**
   * Ensures that the correct icon is rendered for an Ok status.
   */
  it('renders correct icon for Ok status', async () => {
    const { getByTestId } = await renderWithProviders(<TransactionStatus status="Ok" />)
    expect(getByTestId('status-icon-ok')).toBeInTheDocument()
  })

  /**
   * Ensures that the correct icon is rendered for a Mempool status.
   */
  it('renders correct icon for Mempool status', async () => {
    const { getByTestId } = await renderWithProviders(<TransactionStatus status="Mempool" />)
    expect(getByTestId('status-icon-mempool')).toBeInTheDocument()
  })

  /**
   * Ensures that the correct icon is rendered for a Loading status.
   */
  it('renders correct icon for Loading status', async () => {
    const { getByTestId } = await renderWithProviders(<TransactionStatus status="Loading" />)
    expect(getByTestId('status-icon-loading')).toBeInTheDocument()
  })

  /**
   * Ensures that the correct icon is rendered for an undefined status.
   */
  it('renders correct icon for undefined status', async () => {
    const { getByTestId } = await renderWithProviders(<TransactionStatus />)
    expect(getByTestId('status-icon-undefined')).toBeInTheDocument()
  })
})
