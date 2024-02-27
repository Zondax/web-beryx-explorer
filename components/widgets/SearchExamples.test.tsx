import { renderWithProviders } from '@/helpers/jest-react'

import SearchExamples from './SearchExamples'

/**
 * SearchExamples component tests.
 */
describe('SearchExamples', () => {
  /**
   * Test if SearchExamples renders without crashing.
   */
  test('renders without crashing', () => {
    renderWithProviders(<SearchExamples />)
  })
})
