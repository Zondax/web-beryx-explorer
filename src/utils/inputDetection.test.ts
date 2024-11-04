/**
 * This file contains tests for the input detection utility functions.
 * The functions being tested are:
 * - decodeInput: This function decodes an input string and returns an object containing the type of the input and its Filecoin form.¿
 * - startsWithFAndNumber: This function checks if a string starts with 'f' followed by a number and returns a boolean.
 *
 * The tests are organized into two describe blocks:
 * - 'Decode input': This block contains tests for the decodeInput function. It tests the function with various inputs and checks if the output matches the expected output.
 *
 * The tests use two arrays of test data:
 * - decodeInputValues: This array contains objects with an 'input', 'network', and 'output' property. The 'input' is the string to be tested, the 'network' is the network type, and the 'output' is the expected result of the decodeInput function.
 */
import { SearchType } from '@/api-client/beryx.types'
import { InputType } from '@/config/config'
import { InputErrors } from '@/config/inputErrors'
import { setTestAuthToken } from '@/helpers/jest'
import { ObjectType } from '@/routes/parsing'
import { DecodedInput, decodeInput, startsWithFAndNumber } from '@/utils/inputDetection'

beforeAll(async () => {
  await setTestAuthToken()
})

const decodeInputValues: { input: string; type: SearchType; output: DecodedInput }[] = [
  {
    input: '2708613',
    type: {
      chain: 'fil',
      network: 'calibration',
      type: 'height',
      indexed: true,
    },
    output: {
      inputType: InputType.HEIGHT,
      objectType: ObjectType.TIPSET,
      objectMainType: ObjectType.TIPSET,
      filForm: '2708613',
      ethForm: undefined,
    },
  },
  {
    input: 'f410fogpbj7ftms5qkze32us6w3ckfugu5ivx4eoycoi',
    type: {
      chain: 'fil',
      network: 'mainnet',
      type: 'address',
      indexed: true,
    },
    output: {
      inputType: InputType.FILECOIN_ADDRESS,
      objectType: ObjectType.ADDRESS,
      objectMainType: ObjectType.ADDRESS,
      filForm: 'f410fogpbj7ftms5qkze32us6w3ckfugu5ivx4eoycoi',
      ethForm: '0x719e14fcb364bb05649bd525eb6c4a2d0d4ea2b7',
    },
  },
  {
    input: 'bafy2bzacecc2qmykfi4axq2tjfc3xj4naeaygcqhj572muwqigehr443aifgu',
    type: {
      chain: 'fil',
      network: 'mainnet',
      type: 'cid',
      sub_type: 'tx_cid',
      indexed: true,
    },
    output: {
      inputType: InputType.HASH,
      objectType: ObjectType.TXS,
      objectMainType: ObjectType.TXS,
      filForm: 'bafy2bzacecc2qmykfi4axq2tjfc3xj4naeaygcqhj572muwqigehr443aifgu',
      ethForm: undefined,
    },
  },
  {
    input: 'bafy2bzaceb2udtsfnbz6viwq3mscy4msh4tcr5lhy7fscweovpsk4ksnl4sgu',
    type: {
      chain: 'fil',
      network: 'mainnet',
      type: 'cid',
      sub_type: 'block_cid',
      indexed: true,
    },
    output: {
      inputType: InputType.HASH,
      objectType: ObjectType.BLOCK,
      objectMainType: ObjectType.BLOCK,
      filForm: 'bafy2bzaceb2udtsfnbz6viwq3mscy4msh4tcr5lhy7fscweovpsk4ksnl4sgu',
      ethForm: undefined,
    },
  },
]

describe('Decode input', () => {
  decodeInputValues.forEach(({ input, type, output }) => {
    test(`Decode input: ${input} on ${type.network}`, async () => {
      expect(await decodeInput(input, type)).toEqual(output)
    })
  })

  it('should return true for valid inputs', () => {
    const validInputs = ['f0abc', 'f1def', 'f2ghi', 'f3jkl', 'f4mno']
    validInputs.forEach(input => {
      expect(startsWithFAndNumber(input)).toBe(true)
    })
  })

  it('should return false for invalid inputs', () => {
    const invalidInputs = ['f5abc', 'f9xyz', 'a1mno', '']
    invalidInputs.forEach(input => {
      expect(startsWithFAndNumber(input)).toBe(false)
    })
  })
})

describe('Input type detection', () => {
  // Verifies that decodeInput returns an error for empty input

  test('Verifies that decodeInput returns an error for empty input', async () => {
    const input = ''
    const type: SearchType = {
      chain: 'fil',
      network: 'calibration',
      type: 'height',
      indexed: true,
    }
    const expectedOutput: DecodedInput = { error: InputErrors.NO_INPUT, objectType: undefined, filForm: undefined, ethForm: undefined }
    const output = await decodeInput(input, type)
    expect(output).toEqual(expectedOutput)
  })
})
