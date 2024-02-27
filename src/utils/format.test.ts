/**
 * This test suite is for the 'formatBalance' function in 'utils/format'.
 * The function takes an array of objects as input, where each object represents a currency and its value.
 * The function returns a string representation of the total balance in the format 'xx.xxxxxx'.
 */
import { formatBalance } from '@/utils/format'
import { Balance } from '@zondax/beryx/dist/filecoin/api/types'

/**
 * The input value for the test case.
 * It is an array of objects, where each object has a 'currency' and 'value' property.
 * 'currency' is an object with 'symbol' and 'decimals' properties.
 * 'value' is a string representation of the currency value.
 */
const values: { input: Balance[]; output: string }[] = [
  {
    input: [
      {
        currency: { symbol: 'FIL', decimals: 18 },
        value: '51328073630067231027',
      },
    ],
    output: '51.328073630067231027',
  },
  {
    input: [
      {
        currency: { symbol: 'BTC', decimals: 8 },
        value: '100000000',
      },
    ],
    output: '1',
  },
  {
    input: [
      {
        currency: { symbol: 'ETH', decimals: 18 },
        value: '1000000000000000000',
      },
    ],
    output: '1',
  },
  {
    input: [
      {
        currency: { symbol: 'ETH', decimals: 18 },
        value: '-1000000000000000000',
      },
    ],
    output: '-1',
  },
  {
    input: [
      {
        currency: { symbol: 'BTC', decimals: 8 },
        value: '0',
      },
    ],
    output: '0',
  },
  {
    input: [
      {
        currency: { symbol: 'FIL', decimals: 18 },
        value: '99999999999999999999999999999999999999',
      },
    ],
    output: '99999999999999999999.999999999999999999',
  },
]

/**
 * Test case for the 'formatBalance' function.
 * The function is expected to return the correct balance when the 'inputValue' is passed as an argument.
 */
test('Format Balance', () => {
  values.forEach(({ input, output }) => {
    expect(formatBalance(input)).toBe(output)
  })
})
