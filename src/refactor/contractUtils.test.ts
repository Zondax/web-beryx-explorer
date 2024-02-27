import { InputProps } from '@/api-client/beryx.types'

import { FieldValues, InternalInputProps } from '../../components/views/ResultsView/ContractView/config'
import {
  ParsedTypeProps,
  addCompleteField,
  cleanInput,
  getParsedType,
  parseRequest,
  updateValues,
  validateAddress,
  validateBytes,
} from './contractUtils'

export const testInputCases: InputProps[][] = [
  // Example 0
  [
    {
      components: undefined,
      internalType: 'bytes',
      name: 'data',
      type: 'bytes',
    },
    {
      components: undefined,
      internalType: 'bytes3',
      name: 'data',
      type: 'bytes3',
    },
    {
      components: undefined,
      internalType: 'bytes32',
      name: 'data',
      type: 'bytes32',
    },
    {
      components: undefined,
      internalType: 'bool[2]',
      name: 'position1',
      type: 'bool',
    },
    {
      internalType: 'bool[2]',
      name: 'flag',
      type: 'bool[2]',
    },
    {
      internalType: 'uint256[]',
      name: 'c',
      type: 'uint256[]',
    },
    {
      internalType: 'bool[2][]',
      name: 'newPairs',
      type: 'bool[2][]',
    },
    {
      components: [],
      internalType: 'tupple',
      name: 'flag',
      type: 'tuple',
    },
    { components: undefined, internalType: 'uint256', name: 'newSize', type: 'uint256' },
    {
      components: undefined,
      internalType: 'string',
      name: 'newPairs',
      type: 'string',
    },
    {
      components: undefined,
      internalType: 'address',
      name: 'newPairs',
      type: 'address',
    },
    // default case:
    {
      components: undefined,
      internalType: 'unknown',
      name: 'newPairs',
      type: 'unknown',
    },
  ],
]

export const testInternalInputCases: InternalInputProps[][] = [
  // Case 0
  [
    {
      components: [
        {
          components: [
            {
              internalType: 'uint256',
              name: 'c',
              parsedType: { type: 'number' },
              type: 'uint256',
            },
          ],
          internalType: 'uint256[][2][]',
          name: 'c',
          open: true,
          parsedType: {
            type: 'array',
            lengthType: 'dynamic',
            length: 1,
            index: 12,
          },
          type: 'uint256[]',
        },
      ],
      internalType: 'uint256[][]',
      name: 'c',
      open: true,
      parsedType: { type: 'array', lengthType: 'dynamic', length: 1, index: 14 },
      type: 'uint256[][]',
    },
  ],
  // Case 1
  [
    {
      components: [
        {
          components: [
            {
              internalType: 'uint256',
              name: 'c',
              parsedType: { type: 'number' },
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'c',
              parsedType: { type: 'number' },
              type: 'uint256',
              value: 12,
            },
          ],
          internalType: 'uint256[][2][]',
          name: 'c',
          open: true,
          parsedType: {
            type: 'array',
            lengthType: 'dynamic',
            length: 1,
            index: 12,
          },
          type: 'uint256[]',
        },
      ],
      internalType: 'uint256[][]',
      name: 'c',
      open: true,
      parsedType: { type: 'array', lengthType: 'dynamic', length: 1, index: 14 },
      type: 'uint256[][]',
    },
  ],
  // Case 2
  [
    {
      components: [
        {
          components: [
            {
              internalType: 'uint256',
              name: 'c',
              parsedType: { type: 'number' },
              type: 'uint256',
              value: 16,
            },
            {
              internalType: 'uint256',
              name: 'c',
              parsedType: { type: 'number' },
              type: 'uint256',
              value: 12,
            },
          ],
          internalType: 'uint256[][2][]',
          name: 'c',
          open: true,
          parsedType: {
            type: 'array',
            lengthType: 'dynamic',
            length: 1,
            index: 12,
          },
          type: 'uint256[]',
        },
      ],
      internalType: 'uint256[][]',
      name: 'c',
      open: true,
      parsedType: { type: 'array', lengthType: 'dynamic', length: 1, index: 14 },
      type: 'uint256[][]',
    },
  ],
  // Case 3
  [
    {
      components: [
        {
          components: [
            {
              internalType: '',
              name: 'c',
              parsedType: { type: 'number' },
              type: 'uint256',
            },
            {
              internalType: '',
              name: 'c',
              parsedType: { type: 'address' },
              type: 'address',
            },
            {
              internalType: '',
              name: 'c',
              parsedType: { type: 'bytes' },
              type: 'bytes',
            },
            {
              internalType: '',
              name: 'c',
              parsedType: { type: 'boolean' },
              type: 'boolean',
            },
            {
              internalType: '',
              name: 'c',
              parsedType: { type: 'string' },
              type: 'string',
            },
          ],
          internalType: '',
          name: 'c',
          open: true,
          parsedType: {
            type: 'object',
          },
          type: 'tuple',
        },
      ],
      internalType: 'uint256[][]',
      name: 'c',
      open: true,
      parsedType: { type: 'array', lengthType: 'dynamic', length: 1, index: 14 },
      type: 'uint256[][]',
    },
  ],
  // Case 4
  [
    {
      components: [
        {
          components: [
            {
              internalType: 'uint256',
              name: 'c',
              parsedType: { type: 'number' },
              type: 'uint256',
              value: 16,
            },
            {
              internalType: 'uint256',
              name: 'c',
              parsedType: { type: 'number' },
              type: 'uint256',
              value: 12,
            },
          ],
          internalType: 'uint256[][2][]',
          name: 'c',
          open: true,
          parsedType: {
            type: 'array',
            lengthType: 'dynamic',
            length: 1,
            index: 12,
          },
          type: 'uint256[]',
        },
      ],
      internalType: 'uint256[][]',
      name: 'c',
      open: true,
      parsedType: { type: 'array', lengthType: 'dynamic', length: 1, index: 14 },
      type: 'uint256[][]',
    },
  ],
  // Case 5
  [
    {
      internalType: '',
      name: 'c',
      parsedType: { type: 'number' },
      type: 'uint256',
      value: 16,
    },
    {
      internalType: '',
      name: 'c',
      parsedType: { type: 'address' },
      type: 'address',
    },
    {
      internalType: '',
      name: 'c',
      parsedType: { type: 'bytes' },
      type: 'bytes',
    },
    {
      internalType: '',
      name: 'c',
      parsedType: { type: 'boolean' },
      type: 'boolean',
    },
  ],
  // Case 6
  [
    {
      internalType: '',
      name: 'c',
      parsedType: { type: 'number' },
      type: 'uint256',
      value: 16,
    },
    {
      internalType: '',
      name: 'c',
      parsedType: { type: 'address' },
      type: 'address',
    },
    {
      internalType: '',
      name: 'c',
      parsedType: { type: 'bytes' },
      type: 'bytes',
    },
    {
      internalType: '',
      name: 'c',
      parsedType: { type: 'boolean' },
      type: 'boolean',
    },
  ],
]

// Test Utils from Interact Section
describe('getParsedType', () => {
  it('It should return an array', () => {
    const received: InputProps[] = testInputCases[0]

    const expected: ParsedTypeProps[] = [
      { type: 'bytes', length: undefined, lengthType: 'dynamic' },
      { type: 'bytes', length: 3, lengthType: 'fixed' },
      { type: 'bytes', length: 32, lengthType: 'fixed' },
      { type: 'boolean' },
      { type: 'array', lengthType: 'fixed', length: 2, index: 4 },
      { type: 'array', lengthType: 'dynamic', index: 7 },
      { type: 'array', lengthType: 'dynamic', index: 7 },
      { type: 'object' },
      { type: 'number' },
      { type: 'string' },
      { type: 'address' },
      { type: 'string' },
    ]

    received.forEach((input, index) => {
      const parsedType = getParsedType(input)
      expect(parsedType).toEqual(expected[index])
    })
  })
})

describe('validateBytes', () => {
  it('A length is sent. It should return true', () => {
    const received: { input: string; lengthExpected?: number }[] = [
      { input: '0x686f6c61', lengthExpected: 4 },
      { input: '0x6573746f20657320756e6120707275656261', lengthExpected: 18 },
    ]

    received.forEach(({ input, lengthExpected }) => {
      const result = validateBytes(input, lengthExpected)
      expect(result).toBe(true)
    })
  })

  it('The length is not sent. It should return true', () => {
    const received: { input: string; lengthExpected?: number }[] = [
      { input: '0x686f6c61' },
      { input: '0x6573746f20657320756e6120707275656261' },
    ]

    received.forEach(({ input }) => {
      const result = validateBytes(input)
      expect(result).toBe(true)
    })
  })

  it('The expected and received length do not match', () => {
    const received: { input: string; lengthExpected?: number }[] = [{ input: '0x686f6c61', lengthExpected: 2 }]

    received.forEach(({ input, lengthExpected }) => {
      const result = validateBytes(input, lengthExpected)
      expect(result).toBe(false)
    })
  })

  it('0x is missing', () => {
    const received: { input: string; lengthExpected?: number }[] = [{ input: '686f6c61', lengthExpected: 2 }, { input: '686f6c61' }]

    received.forEach(({ input, lengthExpected }) => {
      const result = validateBytes(input, lengthExpected)
      expect(result).toBe(false)
    })
  })

  it('The length is odd', () => {
    const received: { input: string; lengthExpected?: number }[] = [{ input: '0x6573746f20657320756e61207072756562611' }]

    received.forEach(({ input, lengthExpected }) => {
      const result = validateBytes(input, lengthExpected)
      expect(result).toBe(false)
    })
  })

  it('Incorrect characters', () => {
    const received: { input: string; lengthExpected?: number }[] = [{ input: '0x6573746f20657320756e61207072756562611ss' }]

    received.forEach(({ input, lengthExpected }) => {
      const result = validateBytes(input, lengthExpected)
      expect(result).toBe(false)
    })
  })
})

describe('validateAddress', () => {
  it('The address is correct', () => {
    const received: string[] = ['0xe462e2ea9793d421a0565b86016db31039f924f0']

    received.forEach(elem => {
      const result = validateAddress(elem)
      expect(result).toBe(true)
    })
  })

  it('The input is not an address', () => {
    const received: string[] = [
      'e462e2ea9793d421a0565b86016db31039f924f0',
      '0xe462e2ea9793d421a0565b86016db31039f924',
      'f410f4rrof2uxspkcdicwlodac3ntca47sjhqlumduzq',
      'f410f4rrof2uxspkcdicwlodac3ntca47sjhqlumduzqss',
    ]

    received.forEach(elem => {
      const result = validateAddress(elem)
      expect(result).toBe(false)
    })
  })
})

describe('addCompleteField', () => {
  it('One incomplete input', () => {
    const received: InternalInputProps[] = testInternalInputCases[0]

    const expected = {
      components: [
        {
          components: [
            {
              components: [
                {
                  internalType: 'uint256',
                  name: 'c',
                  parsedType: { type: 'number' },
                  type: 'uint256',
                  status: undefined,
                },
              ],
              internalType: 'uint256[][2][]',
              name: 'c',
              open: true,
              parsedType: {
                type: 'array',
                lengthType: 'dynamic',
                length: 1,
                index: 12,
              },
              type: 'uint256[]',
              status: undefined,
            },
          ],
          internalType: 'uint256[][]',
          name: 'c',
          open: true,
          parsedType: { type: 'array', lengthType: 'dynamic', length: 1, index: 14 },
          type: 'uint256[][]',
          status: undefined,
        },
      ],
      inputsStats: { completed: 0, total: 1 },
    }
    const result = addCompleteField(received)
    expect(result).toEqual(expected)
  })

  it('Two inputs - one complete and one incomplete ', () => {
    const received: InternalInputProps[] = testInternalInputCases[1]

    const expected = {
      components: [
        {
          components: [
            {
              components: [
                {
                  internalType: 'uint256',
                  name: 'c',
                  parsedType: { type: 'number' },
                  type: 'uint256',
                  status: undefined,
                },
                {
                  internalType: 'uint256',
                  name: 'c',
                  parsedType: { type: 'number' },
                  type: 'uint256',
                  value: 12,
                  status: 'completed',
                },
              ],
              internalType: 'uint256[][2][]',
              name: 'c',
              open: true,
              parsedType: {
                type: 'array',
                lengthType: 'dynamic',
                length: 1,
                index: 12,
              },
              type: 'uint256[]',
              status: undefined,
            },
          ],
          internalType: 'uint256[][]',
          name: 'c',
          open: true,
          parsedType: { type: 'array', lengthType: 'dynamic', length: 1, index: 14 },
          type: 'uint256[][]',
          status: undefined,
        },
      ],
      inputsStats: { completed: 1, total: 2 },
    }
    const result = addCompleteField(received)
    expect(result).toEqual(expected)
  })

  it('Two completed inputs', () => {
    const received: InternalInputProps[] = testInternalInputCases[2]

    const expected = {
      components: [
        {
          components: [
            {
              components: [
                {
                  internalType: 'uint256',
                  name: 'c',
                  parsedType: { type: 'number' },
                  type: 'uint256',
                  value: 16,
                  status: 'completed',
                },
                {
                  internalType: 'uint256',
                  name: 'c',
                  parsedType: { type: 'number' },
                  type: 'uint256',
                  value: 12,
                  status: 'completed',
                },
              ],
              internalType: 'uint256[][2][]',
              name: 'c',
              open: true,
              parsedType: {
                type: 'array',
                lengthType: 'dynamic',
                length: 1,
                index: 12,
              },
              type: 'uint256[]',
              status: 'completed',
            },
          ],
          internalType: 'uint256[][]',
          name: 'c',
          open: true,
          parsedType: { type: 'array', lengthType: 'dynamic', length: 1, index: 14 },
          type: 'uint256[][]',
          status: 'completed',
        },
      ],
      inputsStats: { completed: 2, total: 2 },
    }
    const result = addCompleteField(received)
    expect(result).toEqual(expected)
  })

  it('Five incompleted inputs (one is string type)', () => {
    const received: InternalInputProps[] = testInternalInputCases[3]

    const expected = {
      components: [
        {
          components: [
            {
              components: [
                {
                  internalType: '',
                  name: 'c',
                  parsedType: { type: 'number' },
                  type: 'uint256',
                },
                {
                  internalType: '',
                  name: 'c',
                  parsedType: { type: 'address' },
                  type: 'address',
                },
                {
                  internalType: '',
                  name: 'c',
                  parsedType: { type: 'bytes' },
                  type: 'bytes',
                },
                {
                  internalType: '',
                  name: 'c',
                  parsedType: { type: 'boolean' },
                  type: 'boolean',
                },
                {
                  internalType: '',
                  name: 'c',
                  parsedType: { type: 'string' },
                  type: 'string',
                  status: 'completed',
                },
              ],
              internalType: '',
              name: 'c',
              open: true,
              parsedType: {
                type: 'object',
              },
              type: 'tuple',
              status: undefined,
            },
          ],
          internalType: 'uint256[][]',
          name: 'c',
          open: true,
          parsedType: { type: 'array', lengthType: 'dynamic', length: 1, index: 14 },
          type: 'uint256[][]',
          status: undefined,
        },
      ],
      inputsStats: { completed: 1, total: 5 },
    }
    const result = addCompleteField(received)
    expect(result).toEqual(expected)
  })
})

describe('parseRequest - return a formated request', () => {
  it('Request with arrays', () => {
    const received: InternalInputProps[] = testInternalInputCases[4]

    const expected = [[[16, 12]]]

    const result = parseRequest(received)
    expect(result).toEqual(expected)
  })

  it('Request with tuple', () => {
    const received: InternalInputProps[] = [
      {
        components: [
          {
            internalType: 'string',
            name: 'c',
            parsedType: { type: 'string' },
            type: 'string',
            value: 'test',
          },
          {
            internalType: 'address',
            name: 'c',
            parsedType: { type: 'address' },
            type: 'uint256',
            value: '0xe462e2ea9793d421a0565b86016db31039f924f0',
          },
        ],
        internalType: 'tuple',
        name: 'c',
        open: true,
        parsedType: { type: 'object' },
        type: 'tuple',
      },
    ]

    const expected = [['test', '0xe462e2ea9793d421a0565b86016db31039f924f0']]

    const result = parseRequest(received)
    expect(result).toEqual(expected)
  })
})

describe('cleanInput', () => {
  it('All inputs except string return undefined', () => {
    const received: InternalInputProps[] = testInternalInputCases[5]

    received.forEach(elem => {
      const result = cleanInput(elem)
      expect(result).toBe(undefined)
    })
  })

  it('string return an empty string', () => {
    const received: InternalInputProps[] = [
      {
        internalType: '',
        name: 'c',
        parsedType: { type: 'string' },
        type: 'string',
      },
    ]

    received.forEach(elem => {
      const result = cleanInput(elem)
      expect(result).toBe('')
    })
  })
})

describe('isCompletedRow', () => {
  it('All inputs except string return undefined', () => {
    const received: InternalInputProps[] = testInternalInputCases[6]

    received.forEach(elem => {
      const result = cleanInput(elem)
      expect(result).toBe(undefined)
    })
  })

  it('string return an empty string', () => {
    const received: InternalInputProps[] = [
      {
        internalType: '',
        name: 'c',
        parsedType: { type: 'string' },
        type: 'string',
      },
    ]

    received.forEach(elem => {
      const result = cleanInput(elem)
      expect(result).toBe('')
    })
  })
})

describe('updateValues', () => {
  it('Send an input and values to replace in each component', () => {
    const received: { inputs: InternalInputProps[]; values?: FieldValues[] }[] = [
      { inputs: testInternalInputCases[6], values: [1, '0xe462e2ea9793d421a0565b86016db31039f924f0', '0xAB', true] },
      { inputs: testInternalInputCases[4], values: [[[2, 3]]] },
    ]

    const expected: InternalInputProps[][] = [
      [
        {
          internalType: '',
          name: 'c',
          parsedType: { type: 'number' },
          type: 'uint256',
          value: 1,
        },
        {
          internalType: '',
          name: 'c',
          parsedType: { type: 'address' },
          type: 'address',
          value: '0xe462e2ea9793d421a0565b86016db31039f924f0',
        },
        {
          internalType: '',
          name: 'c',
          parsedType: { type: 'bytes' },
          type: 'bytes',
          value: '0xAB',
        },
        {
          internalType: '',
          name: 'c',
          parsedType: { type: 'boolean' },
          type: 'boolean',
          value: true,
        },
      ],
      [
        {
          components: [
            {
              components: [
                {
                  internalType: 'uint256',
                  name: 'c',
                  parsedType: { type: 'number' },
                  type: 'uint256',
                  value: 2,
                },
                {
                  internalType: 'uint256',
                  name: 'c',
                  parsedType: { type: 'number' },
                  type: 'uint256',
                  value: 3,
                },
              ],
              internalType: 'uint256[][2][]',
              name: 'c',
              open: true,
              parsedType: {
                type: 'array',
                lengthType: 'dynamic',
                length: 1,
                index: 12,
              },
              type: 'uint256[]',
            },
          ],
          internalType: 'uint256[][]',
          name: 'c',
          open: true,
          parsedType: { type: 'array', lengthType: 'dynamic', length: 1, index: 14 },
          type: 'uint256[][]',
        },
      ],
    ]

    received.forEach(({ inputs, values }, index) => {
      const result = updateValues(inputs, values)
      expect(result).toStrictEqual({ error: false, inputs: expected[index] })
    })
  })

  it('Send an input and no values', () => {
    const received: { inputs: InternalInputProps[]; values?: FieldValues[] }[] = [
      { inputs: testInternalInputCases[6] },
      { inputs: testInternalInputCases[4] },
    ]

    const expected: InternalInputProps[][] = [
      [
        {
          internalType: '',
          name: 'c',
          parsedType: { type: 'number' },
          type: 'uint256',
          value: undefined,
        },
        {
          internalType: '',
          name: 'c',
          parsedType: { type: 'address' },
          type: 'address',
          value: undefined,
        },
        {
          internalType: '',
          name: 'c',
          parsedType: { type: 'bytes' },
          type: 'bytes',
          value: undefined,
        },
        {
          internalType: '',
          name: 'c',
          parsedType: { type: 'boolean' },
          type: 'boolean',
          value: undefined,
        },
      ],
      [
        {
          components: [
            {
              components: [
                {
                  internalType: 'uint256',
                  name: 'c',
                  parsedType: { type: 'number' },
                  type: 'uint256',
                  value: undefined,
                },
                {
                  internalType: 'uint256',
                  name: 'c',
                  parsedType: { type: 'number' },
                  type: 'uint256',
                  value: undefined,
                },
              ],
              internalType: 'uint256[][2][]',
              name: 'c',
              open: true,
              parsedType: {
                type: 'array',
                lengthType: 'dynamic',
                length: 1,
                index: 12,
              },
              type: 'uint256[]',
            },
          ],
          internalType: 'uint256[][]',
          name: 'c',
          open: true,
          parsedType: { type: 'array', lengthType: 'dynamic', length: 1, index: 14 },
          type: 'uint256[][]',
        },
      ],
    ]

    received.forEach(({ inputs, values }, index) => {
      const result = updateValues(inputs, values)
      expect(result).toStrictEqual({ error: false, inputs: expected[index] })
    })
  })

  it('Error, send an input and values with different length', () => {
    const received: { inputs: InternalInputProps[]; values?: FieldValues[] }[] = [
      { inputs: testInternalInputCases[6], values: [1, '0xe462e2ea9793d421a0565b86016db31039f924f0', '0xAB', true, 'hi'] },
      { inputs: testInternalInputCases[4], values: [[2, 3]] },
    ]

    received.forEach(({ inputs, values }) => {
      const result = updateValues(inputs, values)
      expect(result.error).toStrictEqual(true)
    })
  })
})
