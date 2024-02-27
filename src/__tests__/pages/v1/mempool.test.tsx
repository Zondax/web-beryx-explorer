import { renderWithProviders } from '@/helpers/jest-react'
import { screen } from '@testing-library/react'

import MempoolController from '../../../../pages/v1/mempool'

describe('Mempool Page', () => {
  it('renders without crashing', async () => {
    await renderWithProviders(<MempoolController />)
    const elements = screen.getAllByText('Mempool')
    expect(elements.length).toBeGreaterThan(0)
  })
})
