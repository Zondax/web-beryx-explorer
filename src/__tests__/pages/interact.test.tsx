import { renderWithProviders } from '@/helpers/jest-react'
import { screen } from '@testing-library/react'

import InteractController from '../../../pages/interact'

describe('Interact Page', () => {
  it('renders without crashing', async () => {
    await renderWithProviders(<InteractController />)
    const elements = screen.getAllByText('Interact')
    expect(elements.length).toBeGreaterThan(0)
  })
})
