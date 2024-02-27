import { renderWithProviders } from '@/helpers/jest-react'
import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'

import CanonicalLabel from './CanonicalLabel'

/**
 * Unit Test: CanonicalLabel
 * This test suite checks if the CanonicalLabel component is rendered correctly when the isCanonical prop is true or false.
 */
describe('CanonicalLabel', () => {
  /**
   * @test {CanonicalLabel}
   * This test inspects if the CanonicalLabel component correctly renders 'Yes' when isCanonical is true.
   */
  it('renders correctly when isCanonical is true', async () => {
    // Render the component with the theme provider
    await renderWithProviders(<CanonicalLabel isCanonical />)
    // Search for the 'Yes' text in the document. If found, it means that the component has rendered successfully
    expect(screen.getByText('Yes')).toBeInTheDocument()
  })

  /**
   * @test {CanonicalLabel}
   * This test checks if the CanonicalLabel component correctly renders 'No' when the isCanonical prop is false
   */
  it('renders correctly when isCanonical is false', async () => {
    // Render the component with the theme provider
    await renderWithProviders(<CanonicalLabel isCanonical={false} />)
    // Search for the 'No' text in the document. If found, it means that the component has rendered successfully
    expect(screen.getByText('No')).toBeInTheDocument()
  })
})
