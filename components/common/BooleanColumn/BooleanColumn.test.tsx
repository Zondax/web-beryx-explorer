import React from 'react'

import { renderWithProviders } from '@/helpers/jest-react'
import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'

import BooleanColumn from './BooleanColumn'

// Begin a test suite with a group of related tests on the 'BooleanColumn' component
describe('BooleanColumn', () => {
  // Test that when the value is true, BooleanColumn renders 'True'
  it('renders True when value is true', () => {
    renderWithProviders(<BooleanColumn value />)
    // Test Assertion: Checks that 'True' is rendered in the document.
    expect(screen.getByText('True')).toBeInTheDocument()
  })

  // Test that when the value is false, BooleanColumn renders 'False'
  it('renders False when value is false', () => {
    renderWithProviders(<BooleanColumn value={false} />)
    // Test Assertion: Checks that 'False' is rendered in the document.
    expect(screen.getByText('False')).toBeInTheDocument()
  })
})
