import { renderWithProviders } from '@/helpers/jest-react'
import { screen } from '@testing-library/react'

import LoadingView from './LoadingView'

// Test Component.
describe('LoadingView', () => {
  it('should render ', () => {
    renderWithProviders(<LoadingView />)
    const title = screen.getByTestId('loading-view-text')
    expect(title).toBeDefined()
  })
})
