// Importing necessary modules.
import { renderWithProviders } from '@/helpers/jest-react'
import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'

import { VerificationFailed } from './VerificationFailed'

/**
 * VerificationFailed suite contains test-cases related to VerificationFailed component.
 * @module VerificationFailedTest
 */
describe('VerificationFailed', () => {
  /**
   * Test case that checks if the VerificationFailed component renders without any errors.
   */
  it('renders without crashing', async () => {
    /*
     * Rendering VerificationFailed component with error as 'Test error'.
     * This is required for the Verification failed component to process
     * and display a corresponding error message.
     */
    await renderWithProviders(<VerificationFailed error="Test error" />)

    /*
     * Expecting the document to have 'Source Code Not Verified' text after the component renders.
     * This assertion checks if the 'Source Code Not Verified' headline is showing correctly.
     */
    expect(screen.getByText('Source Code Not Verified')).toBeInTheDocument()

    /*
     * Expecting the document to have "The contract couldn't be verified. The reason is: Test error".
     * This assertion checks if the 'Test error' passed to the VerificationFailed component is showing correctly.
     */
    expect(screen.getByText("The contract couldn't be verified. The reason is: Test error")).toBeInTheDocument()
  })
})
