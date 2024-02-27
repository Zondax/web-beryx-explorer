import React from 'react'

import { ContractVerifiedData } from '@/api-client/beryx.types'
import { renderWithProviders } from '@/helpers/jest-react'
import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'

import { VerificationContent } from './VerificationBadgeContent'

/**
 * Test suite for VerificationContent component
 */
describe('VerificationContent', () => {
  /**
   * Test if the content is rendered correctly when the contract is verified
   */
  it('renders the content when contract is verified', async () => {
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

    await renderWithProviders(<VerificationContent verifiedData={verifiedData} />)

    expect(screen.getByText('Source Code Verified')).toBeInTheDocument()
  })

  /**
   * Test if the content is not rendered when the contract is not verified
   */
  it('does not render the content when contract is not verified', async () => {
    await renderWithProviders(<VerificationContent verifiedData={undefined} />)
  })
})
