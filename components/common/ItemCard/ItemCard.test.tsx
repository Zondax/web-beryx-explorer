import { renderWithProviders } from '@/helpers/jest-react'
import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'

import ItemCard from './ItemCard'

/**
 * The describe function is used for grouping related tests
 * Each test begins with the 'it' function that takes two arguments,
 * a string to describe the test and a function for the test itself.
 */
describe('ItemCard Component', () => {
  /**
   * This test verifies that the ItemCard component renders without crashing.
   */
  it('renders without crashing', async () => {
    await renderWithProviders(
      <ItemCard title="Test Title">
        <div>Test Child</div>
      </ItemCard>
    )
  })

  /**
   * This test verifies that the ItemCard component renders the correct title.
   */
  it('renders correct title', async () => {
    await renderWithProviders(
      <ItemCard title="Test Title">
        <div>Test Child</div>
      </ItemCard>
    )
    const titleElement = screen.getByText(/Test Title/)
    expect(titleElement).toBeInTheDocument()
  })

  /**
   * This test verifies that the ItemCard component renders the correct children.
   */
  it('renders correct children', async () => {
    await renderWithProviders(
      <ItemCard title="Test Title">
        <div>Test Child</div>
      </ItemCard>
    )
    const childElement = screen.getByText(/Test Child/)
    expect(childElement).toBeInTheDocument()
  })

  /**
   * This test verifies that if the 'enableCopy' prop is set to 'true'
   * then the ItemCard component should render the copy button.
   */
  it('renders copy button when copy prop is true', async () => {
    await renderWithProviders(
      <ItemCard title="Test Title" enableCopy>
        <div>Test Child</div>
      </ItemCard>
    )
    const copyButton = screen.getByLabelText(/Copy/)
    expect(copyButton).toBeInTheDocument()
  })

  /**
   * This test verifies that if the 'enableCopy' prop is set to 'false'
   * then the ItemCard component should not render the copy button.
   */
  it('does not render copy button when copy prop is false', async () => {
    await renderWithProviders(
      <ItemCard title="Test Title" enableCopy={false}>
        <div>Test Child</div>
      </ItemCard>
    )
    const copyButton = screen.queryByLabelText(/Copy/)
    expect(copyButton).not.toBeInTheDocument()
  })
})
