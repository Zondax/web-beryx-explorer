import { renderWithProviders } from '@/helpers/jest-react'
import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'

import BooleanLabel from './BooleanLabel'

describe('BooleanLabel', () => {
  it('should render "Yes" when canonical is true', () => {
    renderWithProviders(<BooleanLabel value />)
    expect(screen.getByText('Yes')).toBeInTheDocument()
  })

  it('should render "No" when canonical is false', () => {
    renderWithProviders(<BooleanLabel value={false} />)
    expect(screen.getByText('No')).toBeInTheDocument()
  })

  it('should not render when canonical is undefined', () => {
    renderWithProviders(<BooleanLabel value={undefined} />)
    expect(screen.queryByText('Yes')).not.toBeInTheDocument()
    expect(screen.queryByText('No')).not.toBeInTheDocument()
  })
})
