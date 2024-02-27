import { Networks } from '@/config/networks'
import { renderWithProviders } from '@/helpers/jest-react'
import { ObjectType } from '@/routes/parsing'
import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'

import BeryxLink from './BeryxLink'

/**
 * Mocks for the BeryxLink component
 */
const mockNetwork = Networks.mainnet
const mockInputType = ObjectType.ADDRESS
const mockValue = 'TestValue'

/**
 * Begin suite of tests for the BeryxLink component
 */
describe('BeryxLink', () => {
  /**
   * Test if BeryxLink renders without crashing when passed both network and inputType params
   */
  it('renders an active link without crashing', () => {
    renderWithProviders(<BeryxLink tooltipText="TestTooltip" network={mockNetwork} inputType={mockInputType} value={mockValue} />)
    expect(screen.getByTestId('beryx-active-link')).toBeInTheDocument()
  })

  /**
   * BeryxLink renders a disabled link when therea are no network param
   */
  it('renders without network', () => {
    renderWithProviders(<BeryxLink tooltipText="Test Tooltip" inputType={mockInputType} value={mockValue} />)

    expect(screen.getByTestId('beryx-disabled-link')).toBeInTheDocument()
  })

  /**
   * Test if BeryxLink renders as disabled
   */
  it('renders disabled link', () => {
    renderWithProviders(
      <BeryxLink tooltipText="Test Tooltip" network={mockNetwork} inputType={mockInputType} value={mockValue} disableLink />
    )

    expect(screen.getByTestId('beryx-disabled-link')).toBeInTheDocument()
  })

  /**
   * Test if BeryxLink renders with a copy button
   */
  it('renders with a copy button', () => {
    renderWithProviders(
      <BeryxLink tooltipText="Test Tooltip" network={mockNetwork} inputType={mockInputType} value={mockValue} hasCopyButton />
    )

    expect(screen.getByRole('button', { name: 'Copy' })).toBeInTheDocument()
  })

  /**
   * Test if BeryxLink renders without a copy button when hasCopyButton prop is set to false
   */
  it('renders without copy button', () => {
    renderWithProviders(
      <BeryxLink tooltipText="Test Tooltip" network={mockNetwork} inputType={mockInputType} value={mockValue} hasCopyButton={false} />
    )

    expect(screen.queryByRole('button', { name: 'Copy' })).not.toBeInTheDocument()
  })

  /**
   * Test if BeryxLink renders with tooltip disabled when disableTooltip prop is set to true
   */
  it.skip('renders with tooltip disabled', () => {
    renderWithProviders(
      <BeryxLink tooltipText="Test Tooltip" network={mockNetwork} inputType={mockInputType} value={mockValue} disableTooltip />
    )

    expect(screen.getByTestId('beryx-active-link')).toBeInTheDocument()
    expect(screen.getByTestId('beryx-active-link')).toHaveAttribute('title', 'Test Tooltip')
  })
})
