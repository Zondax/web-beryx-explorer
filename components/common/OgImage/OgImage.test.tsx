import { Networks } from '@/config/networks'
import { renderWithProviders } from '@/helpers/jest-react'
import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'

import OgImage from './OgImage'

/**
 * Test suite for OgImage component
 */
describe('OgImage', () => {
  /**
   * Test that the OgImage component can be rendered without crashing
   */
  it('renders without crashing', async () => {
    await renderWithProviders(<OgImage input="input" chain="chain" network={Networks.mainnet} title="title" isVerified items={[]} />)
    expect(screen.getByText('input')).toBeInTheDocument()
    expect(screen.getByText('chain')).toBeInTheDocument()
    expect(screen.getByText('mainnet')).toBeInTheDocument()
    expect(screen.getByText('title')).toBeInTheDocument()
  })

  /**
   * Test that the items are rendered correctly in the OgImage component
   */
  it('renders items correctly', async () => {
    const items = [
      { label: 'label1', value: 'value1', valueType: 'string' },
      { label: 'label2', value: 'value2', valueType: 'string' },
    ]
    await renderWithProviders(<OgImage input="input" chain="chain" network={Networks.mainnet} title="title" isVerified items={items} />)
    items.forEach(item => {
      expect(screen.getByText(item.label)).toBeInTheDocument()
      expect(screen.getByText(item.value)).toBeInTheDocument()
    })
  })

  /**
   * Test that the items with undefined value are not rendered in the OgImage component
   */
  it('does not render items with undefined value', async () => {
    const items = [
      { label: 'label1', value: undefined, valueType: 'string' },
      { label: 'label2', value: 'value2', valueType: 'string' },
    ]
    await renderWithProviders(<OgImage input="input" chain="chain" network={Networks.mainnet} title="title" isVerified items={items} />)
    expect(screen.queryByText('label1')).not.toBeInTheDocument()
    expect(screen.getByText('label2')).toBeInTheDocument()
    expect(screen.getByText('value2')).toBeInTheDocument()
  })
})
