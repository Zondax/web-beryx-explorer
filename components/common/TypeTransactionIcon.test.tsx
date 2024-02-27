import { renderWithProviders } from '@/helpers/jest-react'
import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'

import { TypeTransactionIcon } from './TypeTransactionIcon'

describe('TypeTransactionIcon', () => {
  /**
   * Test for rendering incoming icon
   */
  test('renders incoming icon with status ok', async () => {
    await renderWithProviders(<TypeTransactionIcon status={'Ok'} direction={'to'} />)
    // Expect the details button to be in the document
    expect(screen.getByTestId('incoming-icon')).toBeInTheDocument()
    expect(screen.getByTestId('incoming-icon')).toHaveAttribute('color', '#2ABB53')
  })

  test('renders incoming icon with status error', async () => {
    await renderWithProviders(<TypeTransactionIcon status={'Error'} direction={'to'} />)
    // Expect the details button to be in the document
    expect(screen.getByTestId('incoming-icon')).toBeInTheDocument()
    expect(screen.getByTestId('incoming-icon')).toHaveAttribute('color', '#D01F34')
  })

  /**
   * Test for rendering mempool icon
   */
  test('renders mempool icon', async () => {
    await renderWithProviders(<TypeTransactionIcon status={'mempool'} direction={'to'} />)
    // Expect the details button to be in the document
    expect(screen.getByTestId('mempool-icon')).toBeInTheDocument()
  })

  /**
   * Test for rendering outgoing icon
   */
  test('renders outgoing icon with status ok', async () => {
    await renderWithProviders(<TypeTransactionIcon status={'Ok'} direction={'from'} />)
    // Expect the details button to be in the document
    expect(screen.getByTestId('outgoing-icon')).toBeInTheDocument()
    expect(screen.getByTestId('outgoing-icon')).toHaveAttribute('color', '#2ABB53')
  })

  test('renders outgoing icon with status error', async () => {
    await renderWithProviders(<TypeTransactionIcon status={'Error'} direction={'from'} />)
    // Expect the details button to be in the document
    expect(screen.getByTestId('outgoing-icon')).toBeInTheDocument()
    expect(screen.getByTestId('outgoing-icon')).toHaveAttribute('color', '#D01F34')
  })
})
