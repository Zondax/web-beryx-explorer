import { renderWithProviders } from '@/helpers/jest-react'
import { fireEvent, screen } from '@testing-library/react'

import SearchBar from './SearchBar'

// Test suite for SearchBar
describe('SearchBar', () => {
  // Test to check if the component renders without crashing
  it('renders without crashing', async () => {
    await renderWithProviders(<SearchBar hasSearchButton={false} />)
    // Checking if the rendered component is in the document
    expect(screen.getByTestId('search-bar')).toBeInTheDocument()
  })

  // Test to check if the component handles input changes
  it('handles input change', async () => {
    await renderWithProviders(<SearchBar hasSearchButton={false} />)
    // Finding the input box and setting its value
    const input = screen.getByTestId('search-bar')
    const htmlInputElement = input.querySelector('input')
    if (htmlInputElement) {
      fireEvent.change(htmlInputElement, { target: { value: 'test' } })
      // Checking if the value is set correctly
      expect(htmlInputElement.value).toBe('test')
    } else {
      // Throwing an error if the input box couldn't be found
      throw new Error('Input element not found')
    }
  })
})
