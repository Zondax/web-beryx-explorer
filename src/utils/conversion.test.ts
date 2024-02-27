/**
 * @file This file contains tests for the conversion utility functions.
 */
import { cellAmount, convertMetricSI, scientificToDecimal } from './conversion'

/**
 * Test suite for the convertMetricSI function.
 * It checks if the function correctly converts values between different metric prefixes.
 */
describe('convertMetricSI', () => {
  // Normal Conversions
  it('converts from kilo to default', () => {
    expect(convertMetricSI('1000', 'kilo', 'default')).toEqual('1000000')
  })

  it('converts from kilo to mega', () => {
    expect(convertMetricSI('1', 'kilo', 'mega')).toEqual('0.001')
  })

  it('converts from tera to giga', () => {
    expect(convertMetricSI('1', 'tera', 'giga')).toEqual('1000')
  })

  it('converts from milli to micro', () => {
    expect(convertMetricSI('1', 'milli', 'micro')).toEqual('1000')
  })

  // Edge Cases
  it('converts decimal values', () => {
    expect(convertMetricSI('1.5', 'kilo', 'mega')).toEqual('0.0015')
  })

  it('converts very large numbers', () => {
    expect(convertMetricSI('123456789012', 'kilo', 'default')).toEqual('123456789012000')
  })

  it('converts very small numbers', () => {
    expect(convertMetricSI('0.000123456789', 'default', 'micro')).toEqual('123.456789')
  })

  it('handles conversion to the same unit', () => {
    expect(convertMetricSI('100', 'kilo', 'kilo')).toEqual('100')
  })

  // Negative Cases
  it('handles negative values', () => {
    expect(convertMetricSI('-1000', 'kilo', 'default')).toEqual('-1000000')
  })

  // Potential Errors
  it('throws an error when an invalid from SI prefix is given', () => {
    expect(() => convertMetricSI('1000', 'invalidUnit', 'default')).toThrowError('Invalid SI prefix provided for [from]: invalidUnit')
  })

  it('throws an error when an invalid to SI prefix is given', () => {
    expect(() => convertMetricSI('1000', 'kilo', 'invalidUnit')).toThrowError('Invalid SI prefix provided for [to]: invalidUnit')
  })

  it('handles zero', () => {
    expect(convertMetricSI('0', 'kilo', 'mega')).toEqual('0')
  })

  // Input formats
  it('handles numbers without leading zeros', () => {
    expect(convertMetricSI('.123', 'default', 'milli')).toEqual('123')
  })

  it('handles numbers with trailing zeros', () => {
    expect(convertMetricSI('100.00', 'default', 'kilo')).toEqual('0.1')
  })
})

/**
 * Test suite for the scientificToDecimal function.
 * It checks if the function correctly converts scientific notation to decimal notation.
 */
describe('scientificToDecimal', () => {
  it('should handle positive whole numbers', () => {
    expect(scientificToDecimal(1e6)).toEqual('1000000')
    expect(scientificToDecimal(5e8)).toEqual('500000000')
  })

  it('should handle negative whole numbers', () => {
    expect(scientificToDecimal(-1e6)).toEqual('-1000000')
    expect(scientificToDecimal(-5e8)).toEqual('-500000000')
  })

  it('should handle positive decimals', () => {
    expect(scientificToDecimal(1.23e6)).toEqual('1230000')
    expect(scientificToDecimal(4.56e8)).toEqual('456000000')
  })

  it('should handle negative decimals', () => {
    expect(scientificToDecimal(-1.23e6)).toEqual('-1230000')
    expect(scientificToDecimal(-4.56e8)).toEqual('-456000000')
  })

  it('should handle very small positive numbers', () => {
    expect(scientificToDecimal(1.23e-6)).toEqual('0.00000123')
    expect(scientificToDecimal(1.23e-7)).toEqual('0.000000123')
  })

  it('should handle very small negative numbers', () => {
    expect(scientificToDecimal(-1.23e-6)).toEqual('-0.00000123')
    expect(scientificToDecimal(-1.23e-7)).toEqual('-0.000000123')
  })

  it('should handle numbers without scientific notation', () => {
    expect(scientificToDecimal(123456)).toEqual('123456')
    expect(scientificToDecimal(-123456)).toEqual('-123456')
    expect(scientificToDecimal(0.000123)).toEqual('0.000123')
  })

  it('should handle zero', () => {
    expect(scientificToDecimal(0)).toEqual('0')
  })
})

/**
 * Test suite for the cellAmount function.
 * It checks if the function correctly formats numbers without decimal places.
 */
describe('cellAmount', () => {
  it('should add .0 to numbers without decimal', () => {
    expect(cellAmount('100')).toEqual('100.00')
    expect(cellAmount('100.25')).toEqual('100.25')
  })
})
