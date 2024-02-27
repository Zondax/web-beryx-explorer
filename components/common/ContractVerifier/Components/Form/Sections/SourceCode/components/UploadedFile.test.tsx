import { renderWithProviders } from '@/helpers/jest-react'
import '@testing-library/jest-dom'

import UploadedFile from './UploadedFile'

/**
 * Test suite for UploadedFile component
 */
describe('UploadedFile', () => {
  /**
   * Test case to ensure UploadedFile component renders without crashing
   */
  it('renders without crashing', async () => {
    const mockAction = jest.fn()

    const { container } = await renderWithProviders(<UploadedFile value="test" action={mockAction} />)

    // Check if the rendered content is in the Document
    expect(container).toBeInTheDocument()
  })

  /**
   * Test case to check if the action prop method gets called on click
   */
  it('calls action on click', async () => {
    // Create a mock function for action prop
    const mockAction = jest.fn()

    const { getByText } = await renderWithProviders(<UploadedFile value="test" action={mockAction} />)

    // Simulate a click event and check if the mock function has been called
    getByText('test').click()
    expect(mockAction).toHaveBeenCalled()
  })
})
