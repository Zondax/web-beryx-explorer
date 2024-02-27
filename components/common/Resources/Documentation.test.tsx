import { renderWithProviders } from '@/helpers/jest-react'
import '@testing-library/jest-dom'
import { fireEvent, screen } from '@testing-library/react'

import Documentation from './Documentation'

describe('Documentation', () => {
  it('renders without crashing', async () => {
    await renderWithProviders(<Documentation />)
    expect(screen.getByText('Mocked Article')).toBeInTheDocument()
  })

  it('renders the introduction page by default', async () => {
    await renderWithProviders(<Documentation />)
    expect(screen.getByText('Introduction')).toBeInTheDocument()
  })

  it('renders the clicked file content', async () => {
    await renderWithProviders(<Documentation />)
    const file = screen.getByText('Introduction')
    fireEvent.click(file)
    expect(screen.getByText('Mocked Article')).toBeInTheDocument()
  })
})
