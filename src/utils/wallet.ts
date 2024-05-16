import Web3, { AbiInput } from 'web3'
import { RegisteredSubscription } from 'web3/lib/commonjs/eth.exports'

import { walletErrors } from '@/config/wallet'
import { parseRequest } from '@/refactor/contractUtils'
import { useContractsStore } from '@/store/ui/contracts'
import { useNotificationsStore } from '@/store/ui/notifications'

import { RunMethodFormValues } from 'components/views/ResultsView/ContractView/RunMethod/config'
import { FieldValues } from 'components/views/ResultsView/ContractView/config'

/**
 * Retrieves the transaction data for sending a transaction.
 * @param invokeData The form values containing the method details.
 * @param web3 The Web3 instance.
 * @returns The serialized transaction data string or undefined.
 */
export const getSendTransactionData = (invokeData: RunMethodFormValues, web3: Web3<RegisteredSubscription>): string | undefined => {
  // serialize transaction data
  let parsedReq: FieldValues[] = []

  // Check if method is provided
  if (!invokeData.method) {
    // Notify about wrong method arguments
    const { title, description } = walletErrors['WRONG_METHOD_ARGUMENTS']
    useNotificationsStore.getState().addNotification({
      title,
      description,
      status: 'error',
      tag: ['interact'],
    })
    return
  }

  // Parse request body
  if (invokeData.requestBodyString) {
    try {
      parsedReq = JSON.parse(invokeData.requestBodyString)
    } catch {
      // Notify about wrong method arguments
      const { title, description } = walletErrors['WRONG_METHOD_ARGUMENTS']
      useNotificationsStore.getState().addNotification({
        title,
        description,
        status: 'error',
        tag: ['interact'],
      })
      return
    }
  } else if (invokeData.requestBody) {
    parsedReq = parseRequest(invokeData.requestBody)
  }

  // Validate input parameters
  if ((invokeData.method.inputs.length > 0 && parsedReq.length === 0) || invokeData.method.inputs.length !== parsedReq.length) {
    // Notify about wrong method arguments
    const { title, description } = walletErrors['WRONG_METHOD_ARGUMENTS']
    useNotificationsStore.getState().addNotification({
      title,
      description,
      status: 'error',
      tag: ['interact'],
    })
    return
  }

  let serializedBody = ''
  try {
    // Encode parameters
    serializedBody = web3.eth.abi.encodeParameters(
      invokeData.method.inputs.map(elem => {
        return elem as unknown as AbiInput
      }),
      parsedReq
    )
  } catch {
    // Notify about parameters not being encoded
    const { title, description } = walletErrors['PARAMETERS_NOT_CODED']
    useNotificationsStore.getState().addNotification({
      title,
      description,
      status: 'error',
      tag: ['interact'],
    })
    return
  }

  let selector: string | undefined
  const selectors = useContractsStore.getState().contractCode.selectors
  for (const key in selectors) {
    if (selectors[key] && selectors[key].indexOf(invokeData.method.name) !== -1) {
      selector = key
      break
    }
  }
  if (!selector) {
    // Notify about default error
    const { title, description } = walletErrors['DEFAULT']
    useNotificationsStore.getState().addNotification({
      title,
      description,
      status: 'error',
      tag: ['interact'],
    })
    return
  }

  // Construct and return transaction data
  return `${selector}${serializedBody.slice(2)}`
}
