import { renderWithProviders } from '@/helpers/jest-react'
import { screen } from '@testing-library/react'

import HeaderInfo from './HeaderInfo'

/**
 * HeaderInfo component tests.
 */
describe('HeaderInfo', () => {
  /**
   * Test if HeaderInfo renders correctly with given datetimeInfo.
   */
  test('renders correctly with given datetimeInfo', async () => {
    await renderWithProviders(<HeaderInfo datetimeInfo="2022-01-01 00:00:00" />)
    expect(screen.getByText('2022-01-01 00:00:00')).toBeInTheDocument()
  })
})
