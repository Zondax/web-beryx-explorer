import { renderWithProviders } from '@/helpers/jest-react'
import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'

import NewFlag from './NewFlag'

describe('NewFlag', () => {
  it('should render "New" text', () => {
    renderWithProviders(<NewFlag />)
    expect(screen.getByText('New')).toBeInTheDocument()
  })
})
