import { renderWithProviders } from '@/helpers/jest-react'
import { screen } from '@testing-library/react'

import BaselineController from '../../../../pages/dev/baseline'

// Mock the router
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}))

describe('Baseline Page', () => {
  it('renders without crashing', async () => {
    await renderWithProviders(<BaselineController />)
    const elements = screen.getAllByText('This page is only available in development')
    expect(elements.length).toBeGreaterThan(0)
  })
})
