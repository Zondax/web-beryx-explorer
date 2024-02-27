import { formatFilValue, formatValue } from './numbers'

const decimalValues = [
  {
    input: 1000000000000,
    output: { value: 1, unit: 'T' },
  },
  {
    input: 1000000,
    output: { value: 1, unit: 'M' },
  },
  {
    input: 1000000,
    output: { value: 1, unit: 'M' },
  },
  {
    input: 1000,
    output: { value: 1, unit: 'K' },
  },
]

const filValues = [
  {
    input: 1000000,
    output: { value: 1, unit: 'nanoFIL' },
  },
  {
    input: 1000000000000000,
    output: { value: 1, unit: 'FIL' },
  },
]
describe('Numbers', () => {
  describe('formatValue', () => {
    it('should format values correctly', () => {
      decimalValues.forEach(({ input, output }) => {
        const result = formatValue(input)
        expect(result).toEqual(output)
      })
    })
  })

  describe('formatFilValue', () => {
    it('should format FIL values correctly', () => {
      filValues.forEach(({ input, output }) => {
        const result = formatFilValue(input)
        expect(result).toEqual(output)
      })
    })
  })
})
