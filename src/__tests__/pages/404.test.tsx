import { renderWithProviders } from '@/helpers/jest-react'
import { screen } from '@testing-library/react'

import ErrorController from '../../../pages/404'

describe('404 Page', () => {
  it('renders without crashing', async () => {
    await renderWithProviders(<ErrorController />)
    expect(screen.getByText('Page Not Found')).toBeInTheDocument()
  })
})
