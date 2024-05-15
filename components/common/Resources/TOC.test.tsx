import { renderWithProviders } from '@/helpers/jest-react'
import { screen } from '@testing-library/react'

import TOC from './TOC'

/**
 * Array of resources. Each resource is represented as an object with a title,
 * description, page, and image.
 */
export const resources = [
  {
    title: 'Resource 1', // The title of the first resource
    description: 'Description 1', // Description of the first resource
    page: 'page1', // Page of the first resource
    image: '/', // Image of the first resource
  },
  {
    title: 'Resource 2', // The title of the second resource
    description: 'Description 2', // Description of the second resource
    page: 'page2', // Page of the second resource
    image: '/', // Image of the second resource
  },
]

/**
 * A test suite for the TOC component
 */
describe('TOC', () => {
  /**
   * Test case to verify that the TOC component renders without crashing
   */
  it('renders without crashing', async () => {
    await renderWithProviders(<TOC resourcesMetaInfo={[]} />)
    expect(screen.getByText('Resources')).toBeInTheDocument()
  })

  /**
   * Test case to ensure that the TOC component renders the correct number of resource tiles
   */
  it('renders the correct number of resource tiles', async () => {
    await renderWithProviders(<TOC resourcesMetaInfo={[]} />)
    const resourceTiles = screen.getAllByTestId('resource-tile')
    expect(resourceTiles).toHaveLength(resources.length)
  })
})
