import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import LinkCardSmall from './LinkCardSmall'
import { LinkCardCategory } from './types'

/**
 * Group of tests associated with the LinkCardSmall Component
 */
describe('LinkCardSmall Component', () => {
  /**
   * Test to ensure the LinkCardSmall component renders without crashing
   */
  it('renders without crashing', () => {
    render(
      <LinkCardSmall
        category={LinkCardCategory.ECOSYSTEM}
        title="Test Title"
        description="Test Description"
        url="https://testurl.com"
        imageUrl="https://testurl.com/testimage.jpg"
        domain="testurl.com"
      />
    )
  })

  /**
   * Test to ensure the LinkCardSmall component renders the correct title
   */
  it('renders correct title', () => {
    render(
      <LinkCardSmall
        category={LinkCardCategory.ECOSYSTEM}
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
})
