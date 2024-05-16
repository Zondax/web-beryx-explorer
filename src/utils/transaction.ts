import Web3, { AbiInput } from 'web3'

import { parseRequest } from '@/refactor/contractUtils'
import { useContractsStore } from '@/store/ui/contracts'

import { RunMethodFormValues } from 'components/views/ResultsView/ContractView/RunMethod/config'
import { FieldValues } from 'components/views/ResultsView/ContractView/config'

export const parseInvokeMessageBodyString = (invokeData: RunMethodFormValues) => {
  let parsedReq: FieldValues[] = []

  if (invokeData.requestBodyString) {
    try {
      parsedReq = JSON.parse(invokeData.requestBodyString)
    } catch {
      throw new Error('There was an error while parsing the method parameters')
    }
  } else if (invokeData.requestBody) {
    parsedReq = parseRequest(invokeData.requestBody) // gives an array with all values
  }
  // make sure the input parameters match with what the method requires
  const hasMethodInputs = invokeData.method && invokeData.method.inputs.length > 0
  const isParsedReqEmpty = parsedReq.length === 0
  const isInputLengthMismatch = invokeData.method && invokeData.method.inputs.length !== parsedReq.length

  if (hasMethodInputs && (isParsedReqEmpty || isInputLengthMismatch)) {
    throw new Error('Wrong invoke arguments')
  }

  return parsedReq
}

export const serializeMessageBody = (invokeData: RunMethodFormValues) => {
  const web3 = new Web3(window.ethereum as any)

  const abiInput = invokeData.method?.inputs.map(elem => {
    return elem as unknown as AbiInput
  })

  if (!abiInput) {
    throw new Error('Error while serializing message')
  }
  // Serialize Body
  let serializedBody = ''
  try {
    const parsedReq = parseInvokeMessageBodyString(invokeData)
    serializedBody = web3.eth.abi.encodeParameters(abiInput, parsedReq)
  } catch {
    throw new Error('Error, Parameters could not be serialized')
  }

  // Add method/function selector as prefix
  let selector: string | undefined
  const selectors = useContractsStore.getState().contractCode.selectors
  if (invokeData.method) {
    for (const key in selectors) {
      if (selectors[key] && selectors[key].indexOf(invokeData.method.name) !== -1) {
        selector = key
        break
      }
    }
  }
  if (!selector) {
    throw new Error('Error, Unknown, selector')
  }

  const data = `${selector}${serializedBody.slice(2)}`

  return data
}
