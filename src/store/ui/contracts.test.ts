import { act } from 'react-dom/test-utils'

import { hookHelper } from '@/helpers/jest'

import { useContractsStore } from './contracts'

describe('useContractsStore', () => {
  it('hookHelper works', () => {
    const contractsStore = hookHelper(useContractsStore)
    expect(contractsStore()).toBeDefined()
  })

  // The setEthAddress action should correctly update the ethAddress in the contract state.

  it('setEthAddress updates state correctly', () => {
    const contractsStore = hookHelper(useContractsStore)
    const mockAddress = '0x1234567890abcdef'
    act(() => {
      contractsStore().setEthAddress(mockAddress)
    })
    expect(contractsStore().ethAddress).toBe(mockAddress)
  })

  // The setRpcResponse action should correctly update the rpcResponse in the contract state.

  it('setRpcResponse updates state correctly', () => {
    const contractsStore = hookHelper(useContractsStore)
    const mockResponse = { data: 'mock data' }
    act(() => {
      contractsStore().setRpcResponse(mockResponse)
    })
    expect(contractsStore().rpcResponse).toEqual(mockResponse)
  })

  // The handleForm action should correctly update the form isOpen status in the contract state.

  it('handleForm updates state correctly', () => {
    const contractsStore = hookHelper(useContractsStore)
    const isOpen = true
    act(() => {
      contractsStore().handleForm(isOpen)
    })
    expect(contractsStore().form.isOpen).toEqual(isOpen)
  })

  // The setTestInteract action should update the testInteract in the contract state.

  // The setTestInteract action should correctly update the testInteract in the contract state.
  it('setTestInteract updates state correctly', () => {
    const contractsStore = hookHelper(useContractsStore)
    const mockValue = true
    act(() => {
      contractsStore().setTestInteract(mockValue)
    })
    expect(contractsStore().testInteract).toBe(mockValue)
  })

  // The setDecodingStatus action should update the decodingStatus in the contract state.

  // The setDecodingStatus action should correctly update the decodingStatus in the contract state.
  it('setDecodingStatus updates state correctly', () => {
    const contractsStore = hookHelper(useContractsStore)
    const mockDecodingStatus = 'mock decoding status'
    act(() => {
      contractsStore().setDecodingStatus(mockDecodingStatus)
    })
    expect(contractsStore().decodingStatus).toBe(mockDecodingStatus)
  })
})
