import { renderWithProviders } from '@/helpers/jest-react'
import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'

import Contracts from './Contracts'

/**
 * @description: Unit test suite for Dashboard Contracts
 */

describe('Dashboard Contracts', () => {
  /**
   * Test to ensure first tile is rendered if there is data
   */
  it('renders the first tile if there is data', async () => {
    await renderWithProviders(<Contracts />)

    expect(screen.getByTestId('total-number-of-contracts')).toBeInTheDocument()
    expect(screen.queryByTestId('contract-creates-daily')).toBeInTheDocument()
    expect(screen.queryByTestId('daily-contract-invokes')).toBeInTheDocument()
    expect(screen.queryByTestId('number-of-contract-invokes-today')).toBeInTheDocument()
    expect(screen.queryByTestId('number-of-contract-invokes-week')).toBeInTheDocument()
    expect(screen.queryByTestId('number-of-contracts-invokes-this-week')).toBeInTheDocument()
    expect(screen.queryByTestId('number-of-contracts-created-today')).toBeInTheDocument()
    expect(screen.queryByTestId('number-of-contracts-created-this-week')).toBeInTheDocument()
  })
})
