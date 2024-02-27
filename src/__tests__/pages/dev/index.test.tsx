import { renderWithProviders } from '@/helpers/jest-react'
import { screen } from '@testing-library/react'

import DevOnlyPage from '../../../../pages/dev'

describe('DevOnlyPage', () => {
  it('renders without crashing', async () => {
    await renderWithProviders(<DevOnlyPage />)
    const elements = screen.getAllByText('[dev] NATS')
    expect(elements.length).toBeGreaterThan(0)
  })
})
