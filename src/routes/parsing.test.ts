import { ObjectType, parseSearchUrl } from './parsing'

/**
 * Test suite for parseSearchUrl function
 * @packageDocumentation
 */
describe('parseSearchUrl', () => {
  /**
   * Test case for invalid slug length
   * @test
   */
  it('should throw error for invalid slug length', () => {
    expect(() => parseSearchUrl(['fil'])).toThrow('invalid slug')
    expect(() => parseSearchUrl(['fil', 'mainnet', 'address', 'arg1', 'arg2'])).toThrow('invalid slug')
  })

  /**
   * Test case for invalid chain/network
   * @test
   */
  it('should throw error for invalid chain/network', () => {
    expect(() => parseSearchUrl(['invalid', 'mainnet', 'address'])).toThrow('chain/network [invalid/mainnet] is not supported')
  })

  /**
   * Test case for valid slug parsing
   * @test
   */
  it('should parse valid slug', () => {
    const result = parseSearchUrl(['fil', 'mainnet', 'address', 'arg1'])
    expect(result.network?.slug).toEqual('fil/mainnet')
    expect(result.objectType).toEqual(ObjectType.ADDRESS)
    expect(result.arguments).toEqual('arg1')
  })

  /**
   * Test case for case-insensitive chain/network
   * @test
   */
  it('should handle case-insensitive chain/network', () => {
    const result = parseSearchUrl(['FIL', 'MAINNET', 'ADDRESS', 'arg1'])
    expect(result.network?.slug).toEqual('fil/mainnet')
    expect(result.objectType).toEqual(ObjectType.ADDRESS)
  })

  /**
   * Test case for unsupported object types
   * @test
   */
  it('should throw error for unsupported object types', () => {
    expect(() => parseSearchUrl(['fil', 'mainnet', 'unsupported'])).toThrow('object type [unsupported] is not supported')
  })

  /**
   * Test case for slugs without arguments
   * @test
   */
  it('should parse slugs without arguments', () => {
    const result = parseSearchUrl(['fil', 'mainnet', 'address'])
    expect(result.arguments).toBeUndefined()
  })
})

describe('parseSearchUrl (legacy)', () => {
  /**
   * Test case for a valid URL.
   * The URL is split into segments and passed to the parseSearchUrl function.
   * The expected output is an object with the parsed segments.
   */
  test('test a valid URL', () => {
    const inputUrl = 'fil/calibration/tipset/12345'.split('/')
    const path = parseSearchUrl(inputUrl)

    expect(path.network?.name).toEqual('calibration')
    expect(path.objectType).toEqual('tipset')
    expect(path.arguments).toEqual('12345')
  })

  /**
   * Test case for an incomplete URL.
   * The URL is split into segments and passed to the parseSearchUrl function.
   * The function is expected to throw an error.
   */
  test('test an incomplete URL', () => {
    const inputUrl = 'someWrongUrl/'.split('/')
    expect(() => parseSearchUrl(inputUrl)).toThrow(Error)
  })

  /**
   * Test case for an invalid chain in the URL.
   * The URL is split into segments and passed to the parseSearchUrl function.
   * The function is expected to throw an error.
   */
  test('test an invalid chain in the URL', () => {
    const inputUrl = 'invalidChain/calibration/tipset/12345'.split('/')
    expect(() => parseSearchUrl(inputUrl)).toThrow(Error)
  })

  /**
   * Test case for an invalid network in the URL.
   * The URL is split into segments and passed to the parseSearchUrl function.
   * The function is expected to throw an error.
   */
  test('test an invalid network in the URL', () => {
    const inputUrl = 'fil/invalidNetwork/tipset/12345'.split('/')
    expect(() => parseSearchUrl(inputUrl)).toThrow(Error)
  })

  /**
   * Test case for an invalid objectType in the URL.
   * The URL is split into segments and passed to the parseSearchUrl function.
   * The function is expected to throw an error.
   */
  test('test an invalid objectType in the URL', () => {
    const inputUrl = 'fil/calibration/invalidObjectType/12345'.split('/')
    expect(() => parseSearchUrl(inputUrl)).toThrow(Error)
  })

  // should parse valid slug with all parameters
  it('should parse valid slug with all parameters', () => {
    const result = parseSearchUrl(['fil', 'mainnet', 'address', 'arg1'])
    expect(result.network?.slug).toEqual('fil/mainnet')
    expect(result.objectType).toEqual(ObjectType.ADDRESS)
    expect(result.arguments).toEqual('arg1')
  })

  // should handle case-insensitive chain/network
  it('should handle case-insensitive chain/network', () => {
    const result = parseSearchUrl(['FIL', 'MAINNET', 'ADDRESS', 'arg1'])
    expect(result.network?.slug).toEqual('fil/mainnet')
    expect(result.objectType).toEqual(ObjectType.ADDRESS)
  })

  // should parse slugs without arguments
  it('should parse slugs without arguments', () => {
    const result = parseSearchUrl(['fil', 'mainnet', 'address'])
    expect(result.arguments).toBeUndefined()
  })

  // should throw error for invalid chain/network
  it('should throw error for invalid chain/network', () => {
    expect(() => parseSearchUrl(['invalid', 'mainnet', 'address'])).toThrow('chain/network [invalid/mainnet] is not supported')
  })

  // should throw error for unsupported object types
  it('should throw error for unsupported object types', () => {
    expect(() => parseSearchUrl(['fil', 'mainnet', 'unsupported'])).toThrow('object type [unsupported] is not supported')
  })

  // Should handle case-insensitive object type

  /**
   * Should handle case-insensitive object type.
   * The function is called with a slug containing object type in uppercase.
   * The objectType should be 'address' regardless of the case.
   */
  test('should handle case-insensitive object type', () => {
    const result = parseSearchUrl(['fil', 'mainnet', 'ADDRESS', 'arg1'])
    expect(result.network?.slug).toEqual('fil/mainnet')
    expect(result.objectType).toEqual(ObjectType.ADDRESS)
  })
})
