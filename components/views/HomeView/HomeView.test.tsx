import { renderWithProviders } from '@/helpers/jest-react'
import { screen, waitFor } from '@testing-library/react'

import HomeView from './HomeView'

describe('HomeView', () => {
  it('renders without crashing', async () => {
    await renderWithProviders(<HomeView resourcesMetaInfo={[]} />)
    await waitFor(() => expect(screen.getByText('Explore and Interact with Filecoin Ecosystem')).toBeInTheDocument())
    expect(screen.getByText('Explore and Interact with Filecoin Ecosystem')).toBeInTheDocument()
  })
})
