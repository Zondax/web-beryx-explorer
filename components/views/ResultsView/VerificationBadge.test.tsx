import React from 'react'

import { ContractVerifiedData } from '@/api-client/beryx.types'
import { renderWithProviders } from '@/helpers/jest-react'
import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'

import VerificationBadge from './VerificationBadge'

/**
 * Test suite for VerificationBadge component
 */
describe('VerificationBadge', () => {
  /**
   * Test if the badge is rendered correctly when the contract is verified
   */
  it('renders the badge when contract is verified', () => {
    const verifiedData: ContractVerifiedData = {
      constructorParams: {},
      contractAddress: '0x123',
      contractName: 'Test Contract',
      datetime: 1633027582,
      licenses: ['MIT'],
      optimizerRuns: 200,
      solc: ['0.8.0'],
      sourceCID: 'Qm123',
      verificationType: 'Automated',
      verifiers: ['0x456'],
    }
    renderWithProviders(<VerificationBadge verification={verifiedData} />)

    expect(screen.getByText('Verified')).toBeInTheDocument()
  })

  /**
   * Test if the badge is not rendered when the contract is not verified
   */
  it('does not render the badge when contract is not verified', () => {
    renderWithProviders(<VerificationBadge verification={undefined} />)
  })
})
