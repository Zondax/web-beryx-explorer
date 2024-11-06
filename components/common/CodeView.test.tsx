import { act } from 'react'

import { renderWithProviders } from '@/helpers/jest-react'
import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import CodeView from './CodeView'

/**
 * CodeView Component Test Suite
 */
describe('CodeView', () => {
  // Test Case: Check if CodeView component renders without crashing
  it('renders without crashing', async () => {
    // Render CodeView Component within Provider and ThemeProvider context
    await renderWithProviders(<CodeView content={{ search_id: 'XSXSSXS' }} type={'transaction'} />)
    // Check button with testId='viewTransactionButton' is in the document
    expect(screen.getByTestId('viewTransactionButton')).toBeInTheDocument()

    await act(async () => {
      // Simulate user click event on the button
      await userEvent.click(screen.getByTestId('viewTransactionButton'))
    })

    const codeViewGrid = await screen.findByTestId('codeViewGrid', {})
    expect(codeViewGrid).toBeInTheDocument()
  })
})
