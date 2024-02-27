import { renderWithProviders } from '@/helpers/jest-react'
import { triggerCookieConsentBanner } from '@porscheofficial/cookie-consent-banner-react'
import '@testing-library/jest-dom'
import { fireEvent, screen } from '@testing-library/react'

import Footer from './Footer'

/**
 * Mocking the external module '@porscheofficial/cookie-consent-banner-react'
 * and its function 'triggerCookieConsentBanner'
 */
jest.mock('@porscheofficial/cookie-consent-banner-react', () => ({
  triggerCookieConsentBanner: jest.fn(),
}))

/**
 * Test suite for the footer component.
 */
describe('<footer />', () => {
  /**
   * Clear all mocks before each test.
   */
  beforeEach(() => {
    jest.clearAllMocks()
  })

  /**
   * Test to check if the footer renders with essential elements.
   */
  it('renders the footer with essential elements', async () => {
    await renderWithProviders(<Footer />)
    expect(screen.getByAltText('zondax-logo')).toBeInTheDocument()
  })

  /**
   * Test to check if the footer has a link to the Zondax website.
   */
  it('has a link to the Zondax website', async () => {
    await renderWithProviders(<Footer />)
    const zondaxLink = screen.getByAltText('zondax-logo').closest('a')
    expect(zondaxLink).toHaveAttribute('href', 'https://zondax.ch/')
  })

  /**
   * Test to check if the terms modal opens when "Terms & Conditions" is clicked.
   * Skipped for now.
   */
  it.skip('opens the terms modal when "Terms & Conditions" is clicked', async () => {
    await renderWithProviders(<Footer />)
    fireEvent.click(screen.getByText('Terms & Conditions'))
    // Wait for the modal to be in the document
    const modal = await screen.findByRole('dialog')
    // Check if the modal is visible
    expect(modal).toBeVisible()
  })

  /**
   * Test to check if the cookie banner is triggered on "Cookies Settings" click.
   */
  it('triggers the cookie banner on "Cookies Settings" click', async () => {
    await renderWithProviders(<Footer />)
    fireEvent.click(screen.getByText('Cookies Settings'))
    expect(triggerCookieConsentBanner).toHaveBeenCalledWith({ showDetails: true })
  })

  /**
   * Test to check if the footer links to the privacy policy.
   */
  it('links to the privacy policy', async () => {
    await renderWithProviders(<Footer />)
    const privacyLink = screen.getByText('Privacy Policy').closest('a')
    expect(privacyLink).toHaveAttribute('href', 'https://zondax.ch/legal/privacy')
  })
})
