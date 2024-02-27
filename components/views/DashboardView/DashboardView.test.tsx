import { renderWithProviders } from '@/helpers/jest-react'
import { screen, waitFor } from '@testing-library/react'

import DashboardView from './DashboardView'

describe('HomeView', () => {
  it('renders without crashing', async () => {
    await renderWithProviders(<DashboardView />)
    await waitFor(() => expect(screen.getByText('General')).toBeInTheDocument())
    expect(screen.getByText('Contracts')).toBeVisible()
    expect(screen.getByText('Gas Used in the Current Week')).toBeVisible()
    expect(screen.getByText('Daily Contract Creates')).toBeVisible()
  })
})
