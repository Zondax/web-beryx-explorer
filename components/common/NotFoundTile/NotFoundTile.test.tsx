import { renderWithProviders } from '@/helpers/jest-react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import NotFoundTile, { GenericParams, notFoundIcons } from './NotFoundTile'

/**
 * Represents the necessary information for NotFoundTile when
 * it's acting as a "Refresh" button.
 */
const mockData1: GenericParams = {
  title: 'Refresh',
  description: 'Perform the search again',
  icon: 'refresh' as notFoundIcons,
}

/**
 * Represents the necessary information for NotFoundTile when
 * it's acting as a "Go home" button.
 */
const mockData2: GenericParams = {
  title: 'go to home',
  description: 'Perform the search again',
  icon: 'rocket' as notFoundIcons,
}

/**
 * Test suit for NotFoundTile
 */
describe('NotFoundTile', () => {
  /**
   * Test case for correct rendering when NotFoundTile acts as a "Refresh" button
   */
  test('renders Refresh', async () => {
    const mockAction = jest.fn()

    await renderWithProviders(<NotFoundTile data={mockData1} action={mockAction} />)

    expect(screen.getByText(/Refresh/i)).toBeInTheDocument()
    expect(screen.getByText(/Perform the search again/i)).toBeInTheDocument()
    expect(screen.getByTestId('refresh-icon')).toBeInTheDocument()
  })

  /**
   * Test case for correct rendering when NotFoundTile acts as a "Go home" button
   */
  test('renders Go to home', () => {
    const mockAction = jest.fn()

    render(<NotFoundTile data={mockData2} action={mockAction} />)

    expect(screen.getByText(/Go to home/i)).toBeInTheDocument()
    expect(screen.getByText(/Perform the search again/i)).toBeInTheDocument()
    expect(screen.getByTestId('rocket-icon')).toBeInTheDocument()
  })
})
