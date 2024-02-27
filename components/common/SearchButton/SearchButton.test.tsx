// Importing necessary libraries for component testing
import { renderWithProviders } from '@/helpers/jest-react'
import { fireEvent } from '@testing-library/react'

// Importing the component to be tested
import SearchButton from './SearchButton'

// Describing a test block for the SearchButton component
describe('SearchButton', () => {
  // Test case: Check if the component renders without any crash
  it('renders without crashing', async () => {
    // Mock function for toggleSearch prop
    const toggleSearch = jest.fn()

    // Using destructuring to get getByRole function from render method
    const { getByRole } = await renderWithProviders(<SearchButton toggleSearch={toggleSearch} isSearchOpen={false} />)

    // Assertion: Checking if the button is present in the document
    expect(getByRole('button')).toBeInTheDocument()
  })

  // Test case: Check if toggleSearch is called on button click
  it('calls toggleSearch on button click', async () => {
    // Mock function for toggleSearch prop
    const toggleSearch = jest.fn()

    // Using destructuring to get getByRole function from render method
    const { getByRole } = await renderWithProviders(<SearchButton toggleSearch={toggleSearch} isSearchOpen={false} />)

    // Simulating a button click
    fireEvent.click(getByRole('button'))

    // Assertion: Checking if the function has been called
    expect(toggleSearch).toHaveBeenCalled()
  })
})
