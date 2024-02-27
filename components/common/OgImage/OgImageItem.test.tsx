import { renderWithProviders } from '@/helpers/jest-react'
import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'

import { Filecoin } from '../Icons'
import OgImageItem from './OgImageItem'

/**
 * Unit tests for OgImageItem component.
 * This component is used to render an item with a label and a value.
 */
describe('OgImageItem', () => {
  /**
   * Test case to validate the rendering of the OgImageItem component.
   * Ensures that the label and the value provided to the component are rendered correctly.
   */
  it('renders correctly', async () => {
    await renderWithProviders(<OgImageItem label="Test Label" value="Test Value" />)

    expect(screen.getByText('Test Label')).toBeInTheDocument()
    expect(screen.getByText('Test Value')).toBeInTheDocument()
  })

  /**
   * Test case to check the non-rendering of the FilecoinIcon.
   * When valueType is not "fil", FilecoinIcon should not be rendered.
   */
  it('does not render FilecoinIcon when valueType is not "fil"', async () => {
    await renderWithProviders(<OgImageItem label="Test Label" value="Test Value" />)

    expect(screen.queryByTestId('filecoin-icon')).not.toBeInTheDocument()
  })

  /**
   * Test case to validate the rendering when valueType is "fil".
   * In this case, it is expected that FilecoinIcon is rendered.
   */
  it('renders FilecoinIcon when an icon is sent', async () => {
    await renderWithProviders(<OgImageItem label="Test Label" value="Test Value" icon={<Filecoin size={12} />} />)

    expect(screen.getByTestId('filecoin-icon')).toBeInTheDocument()
  })
})
