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
import { InputErrors } from '@/config/inputErrors'
import { Networks } from '@/config/networks'
import { ObjectType } from '@/routes/parsing'
import { FilEthAddress } from '@zondax/izari-filecoin/address'
import { NetworkPrefix } from '@zondax/izari-filecoin/artifacts'

// This type represents the structure of decoded input. It includes optional fields for various forms and types.
export type DecodedInput = {
  error?: InputErrors
  inputType?: InputType
  objectType?: ObjectType
  objectMainType?: ObjectType // object used for the url
  filForm?: string
  ethForm?: string
}

// This object maps string keys to InputType values. It helps in identifying the type of input received.
const inputTypesMapped: { [key: string]: InputType } = {
  cid: InputType.HASH,
  eth_hash: InputType.HASH,
  eth_address: InputType.ETHEREUM_ID,
  address: InputType.FILECOIN_ADDRESS,
  height: InputType.HEIGHT,
  event_id: InputType.FILECOIN_EVENT,
}

// This object maps string keys to ObjectType values. It is used to determine the object
// type based on the type and subtype received from the Beryx API.
const beryxTypesMapped: { [key: string]: ObjectType } = {
  cid_tx_cid: ObjectType.TXS,
  cid: ObjectType.TXS,
  cid_tipset_cid: ObjectType.TIPSET,
  cid_block_cid: ObjectType.BLOCK,
  eth_hash_eth_tx_hash: ObjectType.TXS,
  eth_address: ObjectType.ADDRESS,
  eth_address_eth_contract_erc20: ObjectType.ERC20,
  address_eth_contract_erc20: ObjectType.ERC20,
  address: ObjectType.ADDRESS,
  height: ObjectType.TIPSET,
  eth_hash_eth_event_hash: ObjectType.EVENT,
  event_id: ObjectType.EVENT,
}

// This object maps ObjectType values to string labels.
// It is used to display labels depending on the input object type.
const objectTypeLabels: { [key in ObjectType]: string } = {
  [ObjectType.TXS]: 'Transaction',
  [ObjectType.TIPSET]: 'Tipset',
  [ObjectType.ADDRESS]: 'Address',
  [ObjectType.EVENT]: 'Event',
  [ObjectType.BLOCK]: 'Block',
  [ObjectType.CONTRACT]: 'Contract',
  [ObjectType.ERC20]: 'Contract',
  [ObjectType.UNKNOWN]: 'Input',
}

// This object maps specific ObjectType values to their main object type.
// It is used for determining the main object type regarding the object type.
export const objectMainTypeMapped: { [key: string]: ObjectType } = {
  [ObjectType.ERC20]: ObjectType.ADDRESS,
  [ObjectType.CONTRACT]: ObjectType.ADDRESS,
}

/**
 * This function decodes an input string and returns an object containing the type of the input and its Filecoin form.
 * @param input - The input string to be decoded.
 * @param searchType - The search type returned for the endpoint /search.
 * @returns - An object containing the type of the input and its Filecoin form.
 */
export const decodeInput = async (input: string, searchType: SearchType): Promise<DecodedInput> => {
  if (input === '') {
    return { error: InputErrors.NO_INPUT }
  }
  const decodedInput: DecodedInput = {}
  const type = searchType.sub_type ? `${searchType.type}_${searchType.sub_type}` : searchType.type
  decodedInput.inputType = inputTypesMapped[searchType.type]
  decodedInput.objectType = beryxTypesMapped[type]
  decodedInput.objectMainType = objectMainTypeMapped[decodedInput.objectType] ?? decodedInput.objectType

  if (decodedInput.objectType === ObjectType.ADDRESS) {
    switch (searchType.type) {
      case 'eth_address':
        decodedInput.filForm = FilEthAddress.fromEthAddress(
          Networks[searchType.network]?.isTestnet ? NetworkPrefix.Testnet : NetworkPrefix.Mainnet,
          input
        ).toString() // filAddr
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
    decodedInput.ethForm = input

    if (searchType.sub_type !== 'eth_event_hash') {
      const filHash = await fetchFilForm(input, Networks[searchType.network])

      if (!filHash) {
        return { error: InputErrors.ETH_ADDRESS_NOT_RECOGNIZED }
      }
      decodedInput.filForm = filHash
    }
  } else {
    decodedInput.filForm = decodedInput.filForm ?? input
  }

  if (!searchType.indexed) {
    if (decodedInput.objectType === ObjectType.ADDRESS) {
      decodedInput.error =
        decodedInput.inputType === InputType.ETHEREUM_ID
          ? InputErrors.VALID_ETH_ADDRESS_BUT_UNSEEN_ON_NETWORK
          : InputErrors.VALID_FIL_ADDRESS_BUT_UNSEEN_ON_NETWORK
    } else {
      decodedInput.error = `${objectTypeLabels[decodedInput.objectType]} Not Found` as InputErrors
    }
  }

  if (searchType.network === 'calibration' && input.startsWith('f') && decodedInput.error) {
    decodedInput.error = InputErrors.USE_TESTNET_ADDRESS
  }
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
