import { act } from 'react-dom/test-utils'

import { renderWithProviders } from '@/helpers/jest-react'
import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import TransactionDetails from './TransactionDetails'

describe('TransactionDetails', () => {
  /**
   * Test for rendering transaction details button
   */
  test('renders transaction details button', async () => {
    await renderWithProviders(
      <TransactionDetails
        content={{
          search_id:
            'Mjg5MDI0OS9iYWZ5MmJ6YWNlYmluZWFxcDd1cmxidW9wM2lia29vbmdmdTUyZWJsZHViM2ZpNm5mN3JtNjRudHA3c2I3dS9iYWZ5MmJ6YWNlY2JoZWM0bTdzYWl5MjZjaGFvZnJxZHFncTNzamV2YzVnNHBvZHEzYXdteTNob2l2b2Z4by9iYWZ5MmJ6YWNlZHdwbHFnZHB4c2c0cXl3cHQ0ZzVodG1xbzVyeXN1ejUzeGg2NnFqYTZ2dTc1ZzQ3a2xicy80ZmI5MTBlOC05YTNlLTVjMzUtYjg1NS04NDkxOTFmM2Q3YmM=',
          tx_cid: 'bafy2bzacedwplqgdpxsg4qywpt4g5htmqo5rysuz53xh66qja6vu75g47klbs',
        }}
      />
    )
    // Expect the details button to be in the document
    expect(screen.getByTestId('transaction-details-button')).toBeInTheDocument()
  })

  /**
   * Test for rendering transaction details modal when button is clicked
   */
  test('renders transaction details modal when button is clicked', async () => {
    await renderWithProviders(
      <TransactionDetails
        content={{
          search_id:
            'Mjg5MDI0OS9iYWZ5MmJ6YWNlYmluZWFxcDd1cmxidW9wM2lia29vbmdmdTUyZWJsZHViM2ZpNm5mN3JtNjRudHA3c2I3dS9iYWZ5MmJ6YWNlY2JoZWM0bTdzYWl5MjZjaGFvZnJxZHFncTNzamV2YzVnNHBvZHEzYXdteTNob2l2b2Z4by9iYWZ5MmJ6YWNlZHdwbHFnZHB4c2c0cXl3cHQ0ZzVodG1xbzVyeXN1ejUzeGg2NnFqYTZ2dTc1ZzQ3a2xicy80ZmI5MTBlOC05YTNlLTVjMzUtYjg1NS04NDkxOTFmM2Q3YmM=',
          tx_cid: 'bafy2bzacedwplqgdpxsg4qywpt4g5htmqo5rysuz53xh66qja6vu75g47klbs',
        }}
      />
    )

    act(() => {
      fireEvent.click(screen.getByTestId('transaction-details-button'))
    })

    await waitFor(async () => {
      const modal = await screen.findByTestId('transaction-details-modal')
      expect(modal).toBeInTheDocument()
    })
  })

  test('closes transaction details modal when close button is clicked', async () => {
    render(
      <TransactionDetails
        content={{
          search_id:
            'Mjg5MDI0OS9iYWZ5MmJ6YWNlYmluZWFxcDd1cmxidW9wM2lia29vbmdmdTUyZWJsZHViM2ZpNm5mN3JtNjRudHA3c2I3dS9iYWZ5MmJ6YWNlY2JoZWM0bTdzYWl5MjZjaGFvZnJxZHFncTNzamV2YzVnNHBvZHEzYXdteTNob2l2b2Z4by9iYWZ5MmJ6YWNlZHdwbHFnZHB4c2c0cXl3cHQ0ZzVodG1xbzVyeXN1ejUzeGg2NnFqYTZ2dTc1ZzQ3a2xicy80ZmI5MTBlOC05YTNlLTVjMzUtYjg1NS04NDkxOTFmM2Q3YmM=',
          tx_cid: 'bafy2bzacedwplqgdpxsg4qywpt4g5htmqo5rysuz53xh66qja6vu75g47klbs',
        }}
      />
    )

    act(() => {
      fireEvent.click(screen.getByTestId('transaction-details-button'))
    })

    // Find the modal in the document
    const modal = await screen.findByTestId('transaction-details-modal')

    // Expect the modal to be in the document
    expect(modal).toBeInTheDocument()

    act(() => {
      // Simulate close button click
      fireEvent.click(screen.getByTestId('transaction-details-close-button'))
    })

    // Wait for the modal to be removed from the document
    await waitFor(() => {
      expect(screen.queryByTestId('transaction-details-modal')).not.toBeInTheDocument()
    })
  })
})
