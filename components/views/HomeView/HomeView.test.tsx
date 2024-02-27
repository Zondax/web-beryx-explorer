import { renderWithProviders } from '@/helpers/jest-react'
import { screen, waitFor } from '@testing-library/react'

import HomeView from './HomeView'

describe('HomeView', () => {
  it('renders without crashing', async () => {
    await renderWithProviders(<HomeView resourcesMetaInfo={[]} />)
    await waitFor(() => expect(screen.getByText('Cheers to a year full of accomplishments')).toBeInTheDocument())
    expect(screen.getByText('Cheers to a year full of accomplishments')).toBeInTheDocument()
  })
})
