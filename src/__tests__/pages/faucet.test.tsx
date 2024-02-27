import { renderWithProviders } from '@/helpers/jest-react'
import { screen } from '@testing-library/react'

import FaucetController from '../../../pages/faucet'

describe('Faucet Page', () => {
  it('renders without crashing', async () => {
    await renderWithProviders(<FaucetController />)
    const elements = screen.getAllByText('Faucet')
    expect(elements.length).toBeGreaterThan(0)
  })
})
