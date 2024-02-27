import { act } from 'react-dom/test-utils'

import { renderWithProviders } from '@/helpers/jest-react'
import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'

import Countdown from './Countdown'

// Use Jest to replace native timers (like setTimeout, setInterval, clearTimeout and clearInterval)
// with mock functions in tests.
jest.useFakeTimers()

/**
 * Unit test for the 'Countdown' component.
 */
describe('Countdown', () => {
  /**
   * It checks if the Countdown component is successfully rendered without crashing.
   */
  it('should render without crashing', async () => {
    const mockAction = jest.fn()

    // Render the Countdown component with action function as a prop
    await renderWithProviders(<Countdown action={mockAction} />)

    // Expect that a progressbar element is available in the document
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  /**
   * It checks if action function is called after countdown.
   */
  it('should call action function after countdown', async () => {
    // Mock function for action
    const mockAction = jest.fn()

    // Render the Countdown component with the mockAction() as a prop
    await renderWithProviders(<Countdown action={mockAction} />)

    // Manipulate timers to mimick countdown
    act(() => {
      jest.advanceTimersByTime(4000)
    })

    // Expect that the mockAction() is called after the countdown
    expect(mockAction).toHaveBeenCalled()
  })
})
