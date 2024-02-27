import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { ConsentBlock } from './ConsentBlock'

/**
 * Test suite for ConsentBlock component
 */
describe('ConsentBlock', () => {
  /**
   * Test to check if the ConsentBlock component renders without any crash
   */
  it.skip('renders without crashing', () => {
    render(<ConsentBlock />)
    expect(screen.getByText('Agree')).toBeInTheDocument()
  })

  /**
   * Test to check if the "ConsentManager" component gets rendered within the ConsentBlock component
   */
  it.skip('renders the ConsentManager component', () => {
    render(<ConsentBlock />)
    expect(screen.getByTestId('consent-manager')).toBeInTheDocument()
  })

  /**
   * Test to check if the "MarkerIO" component gets rendered when the technical cookies are accepted
   */
  it.skip('renders the MarkerIO component when technical cookies are accepted', () => {
    render(<ConsentBlock />)
    // Mock the useCookieConsent hook to return ['technical']
    jest.spyOn(require('@porscheofficial/cookie-consent-banner-react'), 'useCookieConsent').mockReturnValue(['technical'])
    expect(screen.getByTestId('marker-io')).toBeInTheDocument()
  })

  /**
   * Test to check if the "GoogleAnalytics" component does not get rendered when the analytic cookies are not accepted
   */
  it('does not render the GoogleAnalytics component when analytics cookies are not accepted', () => {
    render(<ConsentBlock />)
    // Mock the useCookieConsent hook to return ['technical']
    jest.spyOn(require('@porscheofficial/cookie-consent-banner-react'), 'useCookieConsent').mockReturnValue(['technical'])
    expect(screen.queryByTestId('google-analytics')).not.toBeInTheDocument()
  })
})
