import { renderWithProviders } from '@/helpers/jest-react'
import { screen } from '@testing-library/react'

import Network from './NetworkSelectorBox'

describe('NetworkSelectorBox', () => {
  it('renders without crashing', async () => {
    await renderWithProviders(<Network />)
    expect(screen.getByTestId('select-network-topbar')).toBeInTheDocument()
  })

  it('renders without title', async () => {
    await renderWithProviders(<Network />)
    expect(screen.getByTestId('select-network-topbar')).toBeInTheDocument()
  })
})
