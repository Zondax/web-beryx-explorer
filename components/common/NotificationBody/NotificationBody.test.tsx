import { TransactionNotification } from '@/store/ui/notifications'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import NotificationBody from './NotificationBody'

describe('NotificationBody', () => {
  it('renders without crashing', () => {
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

    render(<NotificationBody notification={notification} isFromStore />)
    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })
})
