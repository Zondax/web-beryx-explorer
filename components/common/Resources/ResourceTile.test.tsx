import { renderWithProviders } from '@/helpers/jest-react'
import '@testing-library/jest-dom'
import { fireEvent } from '@testing-library/react'

import ResourceTile from './ResourceTile'

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => {
    return <div {...props} />
  },
}))

/**
 * Test suite for ResourceTile component
 */
describe('ResourceTile', () => {
  /**
   * Test case to confirm that the ResourceTile component renders correctly.
   */
  it('renders correctly', async () => {
    // Mock function to handle click events
    const handleTileClick = jest.fn()

    // Render the ResourceTile component by passing the required props
    const { getByText } = await renderWithProviders(
      <ResourceTile image="testImage.jpg" title="Test Title" id="testId" description="Test Description" handleTileClick={handleTileClick} />
    )

    // Assertions to check if the title and description are rendered correctly
    expect(getByText('Test Title')).toBeInTheDocument()
    expect(getByText('Test Description')).toBeInTheDocument()
  })

  /**
   * Test case to confirm that the click handler is called with correct argument on clicking the tile.
   */
  it('calls handleTileClick on click', async () => {
    // Mock function to handle click events
    const handleClick = jest.fn()

    // Render the ResourceTile component by passing the required props
    const { getByText } = await renderWithProviders(
      <ResourceTile image="testImage.jpg" title="Test Title" id="testId" description="Test Description" handleTileClick={handleClick} />
    )

    // Simulate a click event on the title of the component
    fireEvent.click(getByText('Test Title'))

    // Assertion to check if the click handler was called with correct id
    expect(handleClick).toHaveBeenCalledWith('testId')
  })
})
