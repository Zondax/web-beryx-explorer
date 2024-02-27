import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'

import DocumentationMobile from './DocumentationMobile'

describe('DocumentationMobile', () => {
  it('renders without crashing', () => {
    render(<DocumentationMobile />)
    expect(screen.getByText('Mocked Article')).toBeInTheDocument()
  })

  it('renders the introduction page by default', () => {
    render(<DocumentationMobile />)
    expect(screen.getByText('Documentation')).toBeInTheDocument()
  })

  it('renders the clicked file content', () => {
    render(<DocumentationMobile />)
    const file = screen.getByText('Documentation')
    fireEvent.click(file)
    expect(screen.getByText('Mocked Article')).toBeInTheDocument()
  })
})
