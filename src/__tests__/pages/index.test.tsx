import { renderWithProviders } from '@/helpers/jest-react'
import { screen } from '@testing-library/react'

import HomeController from '../../../pages'

describe('Home Page', () => {
  it('renders without crashing', async () => {
    await renderWithProviders(<HomeController />)
    const elements = screen.getAllByText('Home')
    expect(elements.length).toBeGreaterThan(0)
  })
})
