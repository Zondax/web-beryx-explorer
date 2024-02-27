import { renderWithProviders } from '@/helpers/jest-react'
import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'

import ProjectTile, { ProjectInterface } from './ProjectTile'

/**
 * Unit tests for ProjectTile component.
 */
describe('ProjectTile', () => {
  // Mock props of ProjectInterface type
  const mockProps: ProjectInterface = {
    title: 'Test Title',
    description: 'Test Description',
    linkDesc: 'Test Link Description',
    linkUrl: 'https://testurl.com',
  }

  /**
   * Test if the ProjectTile component can render without crashing.
   */
  it('renders without crashing', async () => {
    await renderWithProviders(<ProjectTile {...mockProps} />)
    // Checks for the presence of the title, description, and link description in the document
    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
    expect(screen.getByText('Test Link Description')).toBeInTheDocument()
  })

  /**
   * Test to see whether the render ProjectTile contains a link with the correct href attribute.
   */
  it('has a link with the correct href', async () => {
    await renderWithProviders(<ProjectTile {...mockProps} />)
    // Checks if the link has correct href attribute
    expect(screen.getByRole('link')).toHaveAttribute('href', 'https://testurl.com')
  })
})
