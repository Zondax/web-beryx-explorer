import { renderWithProviders } from '@/helpers/jest-react'
import { screen } from '@testing-library/react'

import BottomBar from './BottomBar'

describe('BottomBar', () => {
  it('renders without crashing', async () => {
    await renderWithProviders(<BottomBar />)
    expect(screen.getByText('Terms & Conditions')).toBeInTheDocument()
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument()
    expect(screen.getByText('Cookies Settings')).toBeInTheDocument()
  })

  it('opens Terms & Conditions in a new tab on click', async () => {
    await renderWithProviders(<BottomBar />)

    const termsAndConditionsLink = screen.getByText('Terms & Conditions')
    expect(termsAndConditionsLink).toHaveAttribute('target', '_blank')
  })
})
