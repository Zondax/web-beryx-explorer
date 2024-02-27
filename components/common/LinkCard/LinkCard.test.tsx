import { renderWithProviders } from '@/helpers/jest-react'
import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'

import LinkCard from './LinkCard'

/**
 * Group of tests associated with the LinkCard Component
 */
describe('LinkCard Component', () => {
  /**
   * Test to ensure the LinkCard component renders without crashing
   */
  it('renders without crashing', async () => {
    await renderWithProviders(
      <LinkCard
        title="Test Title"
        description="Test Description"
        url="https://testurl.com"
        imageUrl="https://testurl.com/testimage.jpg"
        domain="testurl.com"
      />
    )
  })

  /**
   * Test to ensure the LinkCard component renders the correct title
   */
  it('renders correct title', async () => {
    await renderWithProviders(
      <LinkCard
        title="Test Title"
        description="Test Description"
        url="https://testurl.com"
        imageUrl="https://testurl.com/testimage.jpg"
        domain="testurl.com"
      />
    )

    const titleElement = screen.getByText(/Test Title/)
    expect(titleElement).toBeInTheDocument()
  })

  /**
   * Test to ensure the LinkCard component renders the correct description
   */
  it('renders correct description', async () => {
    await renderWithProviders(
      <LinkCard
        title="Test Title"
        description="Test Description"
        url="https://testurl.com"
        imageUrl="https://testurl.com/testimage.jpg"
        domain="testurl.com"
      />
    )

    const descriptionElement = screen.getByText(/Test Description/)
    expect(descriptionElement).toBeInTheDocument()
  })
})
