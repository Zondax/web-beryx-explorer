import { renderWithProviders } from '@/helpers/jest-react'
import '@testing-library/jest-dom'
import { fireEvent, screen, waitFor } from '@testing-library/react'

import QuestionMarker from './QuestionMarker'

/**
 * A series of unit tests for the 'QuestionMarker' component.
 */
describe('QuestionMarker', () => {
  const mockTitle = 'Test Title' // Mocked title prop for testing

  /**
   * Test case: Check if the component renders without any crashes.
   */
  it('renders without crashing', async () => {
    // Render the component
    await renderWithProviders(<QuestionMarker title={mockTitle} />)

    // Query the rendered component
    const questionMarkerElement = screen.getByRole('button')

    // Check if the component is in the document
    expect(questionMarkerElement).toBeInTheDocument()
  })

  /**
   * Test case: Check if the correct title is displayed in the tooltip.
   */
  it('displays the correct title in tooltip', async () => {
    // Render the component
    await renderWithProviders(<QuestionMarker title={mockTitle} />)

    // Query the rendered component
    const questionMarkerElement = screen.getByRole('button')

    // Check if the component is in the document
    expect(questionMarkerElement).toBeInTheDocument()

    // Trigger the mouseover event
    fireEvent.mouseOver(questionMarkerElement)

    // Wait for the tooltip to appear and check if it has the correct text
    await waitFor(() => {
      const tooltipElement = screen.getByText(mockTitle)
      expect(tooltipElement).toBeInTheDocument()
    })
  })
})
