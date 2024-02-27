import { renderWithProviders } from '@/helpers/jest-react'
import { screen } from '@testing-library/react'

import Layout from './Layout'

describe('Layout', () => {
  it('renders without crashing', async () => {
    await renderWithProviders(<Layout />)
    const images = screen.getAllByRole('img')
    expect(images.length).toBeGreaterThan(0)
  })

  it('renders children when passed in', async () => {
    const testId = 'child-component'
    await renderWithProviders(
      <Layout>
        <div data-testid={testId} />
      </Layout>
    )
    expect(screen.getByTestId(testId)).toBeInTheDocument()
  })

  it('renders search bar when hasSearchBar prop is true', () => {
    renderWithProviders(<Layout hasSearchBar />)
    expect(screen.getByLabelText('Search')).toBeInTheDocument()
  })

  it('does not render search bar when hasSearchBar prop is false', () => {
    renderWithProviders(<Layout hasSearchBar={false} />)
    expect(screen.queryByRole('search')).toBeNull()
  })
})
