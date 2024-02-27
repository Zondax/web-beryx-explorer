import { renderWithProviders } from '@/helpers/jest-react'
import { screen } from '@testing-library/react'

import AddressConverterController from '../../../pages/address_converter'

describe('Address Converter Page', () => {
  it('renders without crashing', async () => {
    await renderWithProviders(<AddressConverterController />)
    const elements = screen.getAllByText('Address Converter')
    expect(elements.length).toBeGreaterThan(0)
  })
})
