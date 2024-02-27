import { renderWithProviders } from '@/helpers/jest-react'
import { fireEvent } from '@testing-library/react'

import { RenderFile, RenderFolder } from './FolderTree'

/**
 * @module FolderTree
 */

/**
 * Test Suite for RenderFile and RenderFolder components
 */

describe('FolderTree', () => {
  /**
   * Test for RenderFile component
   * Checks if the RenderFile renders correctly, and if the file click event functions properly
   */
  test('RenderFile should render correctly', async () => {
    const handleFileClick = jest.fn()
    const { getByText } = await renderWithProviders(
      <RenderFile fileName="testFile" file={{ type: 'file', content: 'testContent' }} level={1} hasIcon handleFileClick={handleFileClick} />
    )
    fireEvent.click(getByText('testFile'))
    expect(handleFileClick).toHaveBeenCalledWith('testFile', { type: 'file', content: 'testContent' })
  })

  /**
   * Test for RenderFolder component
   * Checks if the RenderFolder renders correctly
   */
  test('RenderFolder should render correctly', async () => {
    const handleFileClick = jest.fn()
    const { getByText } = await renderWithProviders(
      <RenderFolder folderName="testFolder" folder={{ type: 'folder', children: {} }} level={1} hasIcon handleFileClick={handleFileClick} />
    )
    fireEvent.click(getByText('testFolder'))
    expect(getByText('testFolder')).toBeTruthy()
  })
})
