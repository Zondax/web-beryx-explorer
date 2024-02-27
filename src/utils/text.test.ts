/**
 * @module text.test
 * @description This module provides tests for the text utility functions.
 */
import { copyContent, filterSearchInput, truncateMiddleOfString } from './text'

/**
 * @description Test suite for Text Utility Functions
 */
describe('Text Utility Functions', () => {
  /**
   * @description Test suite for filterSearchInput function
   */
  describe('filterSearchInput', () => {
    const testCases = [
      { input: '0xF134aB1', expected: '0xf134ab1' },
      { input: '0x65f0b4e77F56C7a6d43d05B7aF5E75d6f26b8cee', expected: '0x65f0b4e77f56c7a6d43d05b7af5e75d6f26b8cee' },
      { input: ' 0x65f0b4e77F56C7a6d43d05B7aF5E75d6f26B8cee ', expected: '0x65f0b4e77f56c7a6d43d05b7af5e75d6f26b8cee' }, // Testing for leading and trailing spaces
      { input: '0X65F0B4E77F56C7A6D43D05B7AF5E75D6F26B8CEE', expected: '0x65f0b4e77f56c7a6d43d05b7af5e75d6f26b8cee' }, // Testing for uppercase input
      { input: '0x65f0b4e77f56c7a6d43d05b7af5e75d6f26b8cee ', expected: '0x65f0b4e77f56c7a6d43d05b7af5e75d6f26b8cee' }, // Testing for trailing spaces
      { input: ' 0X65F0B4E77F56C7A6D43D05B7AF5E75D6F26B8CEE ', expected: '0x65f0b4e77f56c7a6d43d05b7af5e75d6f26b8cee' }, // Testing for leading spaces and uppercase input
    ]

    /**
     * @description Test case for filterSearchInput function
     */
    test.each(testCases)('should correctly filter search input', ({ input, expected }) => {
      expect(filterSearchInput(input)).toBe(expected)
    })
  })

  /**
   * @description Test suite for truncateMiddleOfString function
   */
  describe('truncateMiddleOfString', () => {
    test('should correctly truncate middle of string', () => {
      const input = '1234567890'
      const expected = '123...890'
      expect(truncateMiddleOfString(input, 6)).toBe(expected)
    })

    test('should return original string if maxLength is greater than string length', () => {
      const input = '1234567890'
      const expected = '1234567890'
      expect(truncateMiddleOfString(input, 20)).toBe(expected)
    })
  })

  /**
   * @description Test suite for copyContent function
   */
  describe('copyContent', () => {
    test('should call navigator.clipboard.writeText with correct argument', async () => {
      const writeTextMock = jest.fn()
      Object.defineProperty(global.navigator, 'clipboard', { value: { writeText: writeTextMock }, writable: true })
      const input = 'test'
      await copyContent(input)
      expect(writeTextMock).toHaveBeenCalledWith(input)
    })

    test('should throw an error when navigator.clipboard.writeText fails', async () => {
      const error = new Error('Test error')
      Object.defineProperty(global.navigator, 'clipboard', { value: { writeText: () => Promise.reject(error) }, writable: true })
      await expect(copyContent('test')).rejects.toThrow(error.message)
    })
  })
})
