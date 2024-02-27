import { renderWithProviders } from '@/helpers/jest-react'
import { TransactionNotification } from '@/store/ui/notifications'
import '@testing-library/jest-dom'

import Transaction from './Transaction'

describe('Transaction', () => {
  it('renders without crashing', async () => {
    const notification: TransactionNotification = {
      id: 'Test ID',
      title: 'Test Title',
      time: 'Test Time',
      status: 'confirm',
      tag: ['Test Tag'],
      date: '2022-01-01',
      method: 'Test Method',
      tx_to: 'Test Address',
      value: 'Test Value',
    }

    await renderWithProviders(<Transaction notification={notification} />)
  })
})
