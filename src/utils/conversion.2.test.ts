/**
 * Importing necessary functions from conversion module
 */
import { cellAmount, convertMetricSI } from './conversion'

/**
 * Test values for metric conversion
 * Each object in the array represents a test case
 * input: the value to be converted
 * from: the current metric prefix
 * to: the target metric prefix
 * output: the expected result after conversion
 */
const testValues = [
  {
    input: '1',
    from: 'default',
    to: 'kilo',
    output: '0.001',
  },
  {
    input: '1',
    from: 'kilo',
    to: 'milli',
    output: '1000000',
  },
  {
    input: '5.7',
    from: 'centi',
    to: 'nano',
    output: '57000000',
  },
  {
    input: '5.7',
    from: 'centi',
    to: 'nano',
    output: '57000000',
  },
  {
    input: '1000000',
    from: 'centi',
    to: 'nano',
    output: '10000000000000',
  },
  {
    input: '439000000',
    from: 'kilo',
    to: 'nano',
    output: '439000000000000000000',
  },
  {
    input: '1.523',
    from: 'default',
    to: 'centi',
    output: '152.3',
  },
  {
    input: '1.54132515',
    from: 'default',
    to: 'centi',
    output: '154.132515',
  },
  {
    input: '12',
    from: 'milli',
    to: 'default',
    output: '0.012',
  },
  {
    input: '0',
    from: 'milli',
    to: 'default',
    output: '0',
  },
]

/**
 * Test suite for metric conversion
 * For each test case in testValues, it checks if the conversion result matches the expected output
 */
describe('Metric conversion', () => {
  testValues.forEach(item => {
    test('1 to kilo', () => {
      expect(convertMetricSI(item.input, item.from, item.to)).toBe(item.output)
    })
  })
})

/**
 * Test values for cell amount formatting
 * Each object in the array represents a test case
 * input: the value to be formatted
 * output: the expected result after formatting
 */
const inputValues = [
  { input: '51.328073630067231027', output: '51.328073630067231027' },
  { input: '51', output: '51.00' },
  { input: '51.0', output: '51.00' },
]

/**
 * Test suite for cell amount formatting
 * For each test case in inputValues, it checks if the formatting result matches the expected output
 */
test('Cell Amount Formatter', () => {
  inputValues.forEach(item => {
    expect(cellAmount(item.input)).toBe(item.output)
  })
})
