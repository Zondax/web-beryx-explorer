import { renderWithProviders } from '@/helpers/jest-react'
import { screen } from '@testing-library/react'

import SearchController from '../../../../../pages/fil/[[...slug]]'

describe('Search Page', () => {
  it('renders without crashing', async () => {
    await renderWithProviders(<SearchController slug={undefined} />)
    const searchButton = screen.getByRole('button', { name: /search/i })
    expect(searchButton).toBeInTheDocument()
  })
})
