import { renderWithProviders } from '@/helpers/jest-react'

import CodeBlock from './CodeBlock'

/**
 * CodeBlock component tests.
 */
describe('CodeBlock', () => {
  /**
   * Test if CodeBlock renders correctly with given content.
   */
  test('renders correctly with given content', () => {
    const testContent = '{"key": "value"}'

    renderWithProviders(<CodeBlock content={testContent} readOnly />)
  })

  /**
   * Test if CodeBlock renders correctly with no content.
   */
  test('renders correctly with no content', () => {
    renderWithProviders(<CodeBlock content={undefined} readOnly />)
  })

  /**
   * Test if CodeBlock renders correctly with dynamic height.
   */
  test('renders correctly with dynamic height', () => {
    const testContent = '{"key": "value"}'

    renderWithProviders(<CodeBlock content={testContent} readOnly dynamicHeight />)
  })

  /**
   * Test if CodeBlock renders correctly with resizable panel.
   */
  test('renders correctly with resizable panel', () => {
    const testContent = '{"key": "value"}'

    renderWithProviders(<CodeBlock content={testContent} readOnly fillResizablePanel />)
  })

  /**
   * Test if CodeBlock renders correctly with custom no content text.
   */
  test('renders correctly with custom no content text', () => {
    renderWithProviders(<CodeBlock readOnly noContentText="Custom no content text" />)
  })
})
