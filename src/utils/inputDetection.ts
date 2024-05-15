/**
 * This file contains utility functions for detecting the type of an input string.
 * It exports three functions:
 * - decodeInput: This function decodes an input string and returns an object containing the type of the input and its Filecoin form.
 * - startsWithFAndNumber: This function checks if a string starts with 'f' followed by a number and returns a boolean.
 *
 * @module inputDetection
 */
import { fetchFilForm } from '@/api-client/beryx'
import { SearchType } from '@/api-client/beryx.types'
import { InputType } from '@/config/config'
import { Networks } from '@/config/networks'
import { ObjectType } from '@/routes/parsing'
import { FilEthAddress } from '@zondax/izari-filecoin/address'
import { NetworkPrefix } from '@zondax/izari-filecoin/artifacts'

export type DecodedInput = {
  error?: string
  inputType?: InputType
  objectType?: ObjectType
  filForm?: string
  ethForm?: string
}

export const inputTypesMapped: { [key: string]: InputType } = {
  cid: InputType.HASH,
  eth_hash: InputType.HASH,
  eth_address: InputType.ETHEREUM_ID,
  address: InputType.FILECOIN_ADDRESS,
  height: InputType.HEIGHT,
}

export const objectTypesMapped: { [key: string]: ObjectType } = {
  tx_cid: ObjectType.TXS,
  tipset_cid: ObjectType.TIPSET,
  block_cid: ObjectType.BLOCK,
  eth_hash: ObjectType.TXS,
  eth_address: ObjectType.ADDRESS,
  address: ObjectType.ADDRESS,
  height: ObjectType.TIPSET,
}

/**
 * This function decodes an input string and returns an object containing the type of the input and its Filecoin form.
 * @param input - The input string to be decoded.
 * @param searchType - The search type returned for the endpoint /search.
 * @returns - An object containing the type of the input and its Filecoin form.
 */
export const decodeInput = async (input: string, searchType: SearchType): Promise<DecodedInput> => {
  if (input === '') {
    return { error: 'no input' }
  }
  const decodedInput: DecodedInput = {}
  decodedInput.inputType = inputTypesMapped[searchType.type]

  decodedInput.objectType = objectTypesMapped[searchType.type === 'cid' ? searchType.sub_type ?? 'tx_cid' : searchType.type]
  if (decodedInput.objectType === ObjectType.ADDRESS) {
    switch (searchType.type) {
      case 'eth_address':
        decodedInput.filForm = FilEthAddress.fromEthAddress(NetworkPrefix.Mainnet, input).toString() // filAddr
        decodedInput.ethForm = input
        break
      case 'address':
        try {
          decodedInput.ethForm = FilEthAddress.fromString(input).toEthAddressHex(true) // ethAddr
        } catch {
          decodedInput.ethForm = undefined
        }
        decodedInput.filForm = input
        break
      default:
    }
  }

  if (searchType.type === 'eth_hash') {
    const filHash = await fetchFilForm(input, Networks[searchType.network])
    if (!filHash) {
      return { error: 'ETH address not recognized' }
    }
    decodedInput.filForm = filHash
    decodedInput.ethForm = input
  }

  decodedInput.filForm = decodedInput.filForm ?? input

  return decodedInput
}

/**
 * This function checks if a string starts with 'f' followed by a number and returns a boolean.
 * @param value - The string to be checked.
 * @returns - True if the string starts with 'f' followed by a number, false otherwise.
 */
export const startsWithFAndNumber = (value: string) => {
  const regex = /^f[0-4]/
  return regex.test(value)
}
