import { confirmDistinctItems, isArrayType } from './arrays'

/**
 * Test suite for the distinctIds function.
 * This function is expected to remove duplicate objects based on id.
 */
describe('confirmUniqueItems', () => {
  /**
   * Test that the function removes duplicate objects based on id.
   */
  it('should remove duplicate objects based on id', () => {
    const array = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
      { id: 1, name: 'John Doe' },
      { id: 3, name: 'Smith' },
    ]
    const result = confirmDistinctItems(array, x => `${x.id}`)
    expect(result).toEqual([
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
      { id: 3, name: 'Smith' },
    ])
  })

  /**
   * Test that the function returns an empty array for empty input.
   */
  it('should return empty array for empty input', () => {
    const array: any[] = []
    const result = confirmDistinctItems(array, x => `${x.id}`)
    expect(result).toEqual([])
  })

  /**
   * Test that the function handles non-duplicate arrays correctly.
   */
  it('should handle non-duplicate arrays', () => {
    const array = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
    ]
    const result = confirmDistinctItems(array, x => `${x.id}`)
    expect(result).toEqual([
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
    ])
  })

  it('should return an empty array when given an empty array', () => {
    const result = confirmDistinctItems([], () => '')
    expect(result).toEqual([])
  })

  // Returns an array with unique items when given an array with duplicate items.

  it('should return an array with unique items when given an array with duplicate items', () => {
    const items = [{ id: 1 }, { id: 2 }, { id: 1 }, { id: 3 }]
    const keyMapping = (item: { id: number }) => item.id.toString()
    const result = confirmDistinctItems(items, keyMapping)
    expect(result).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }])
  })
})

/**
 * Test suite for the isArrayType function.
 * @module isArrayTypeTest
 */
describe('isArrayType', () => {
  /**
   * Test that the function returns null for non-array types.
   */
  it('should return null for non-array types', () => {
    expect(isArrayType('string')).toBeNull()
    expect(isArrayType('number')).toBeNull()
    expect(isArrayType('boolean')).toBeNull()
    expect(isArrayType('undefined')).toBeNull()
    expect(isArrayType('null')).toBeNull()
    expect(isArrayType('object')).toBeNull()
  })

  /**
   * Test that the function returns dynamic type for empty array types.
   */
  it('should return dynamic type for empty array types', () => {
    const result = isArrayType('[]')
    expect(result).not.toBeNull()
    expect(result?.type).toBe('dynamic')
  })

  /**
   * Test that the function returns fixed type for fixed array types.
   */
  it('should return fixed type for fixed array types', () => {
    const result = isArrayType('[5]')
    expect(result).not.toBeNull()
    expect(result?.type).toBe('fixed')
    expect(result?.length).toBe(5)
  })

  /**
   * Test that the function returns null for invalid array types.
   */
  it('should return null for invalid array types', () => {
    expect(isArrayType('[a]')).toBeNull()
    expect(isArrayType('[null]')).toBeNull()
    expect(isArrayType('[undefined]')).toBeNull()
    expect(isArrayType('[object]')).toBeNull()
  })

  /**
   * Test that the function returns correct type and length for multi-digit array types.
   */
  it('should return correct type and length for multi-digit array types', () => {
    const result = isArrayType('[10]')
    expect(result).not.toBeNull()
    expect(result?.type).toBe('fixed')
    expect(result?.length).toBe(10)
  })
})
