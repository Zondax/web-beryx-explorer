import { renderWithProviders } from '@/helpers/jest-react'
import '@testing-library/jest-dom'

import SourceCodeFileIcon from './CodeFileIcon'

/**
 * Test suite for SourceCodeFileIcon component
 */
describe('SourceCodeFileIcon', () => {
  /**
   * Test to check if 'EthereumIcon' is rendered correctly for .sol files
   */
  it('should render EthereumIcon for .sol files', async () => {
    const { container } = await renderWithProviders(<SourceCodeFileIcon fileName="test.sol" />)

    // Expecting the ethereum-icon class to be in the document
    expect(container.querySelector('.ethereum-icon')).toBeInTheDocument()
  })

  /**
   * Test to check if 'DataObject' is rendered correctly for .json files
   */
  it('should render DataObject for .json files', async () => {
    const { container } = await renderWithProviders(<SourceCodeFileIcon fileName="test.json" />)

    // Expecting the mui-data-object class to be in the document
    expect(container.querySelector('.mui-data-object')).toBeInTheDocument()
  })

  /**
   * Test to check if 'Notes' is rendered correctly for other file types
   */
  it('should render Notes for other file types', async () => {
    const { container } = await renderWithProviders(<SourceCodeFileIcon fileName="test.txt" />)

    // Expecting the mui-notes class to be in the document
    expect(container.querySelector('.mui-notes')).toBeInTheDocument()
  })
})
