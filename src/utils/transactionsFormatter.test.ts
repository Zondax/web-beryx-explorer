/**
 * @module transactionsFormatter.test
 * @description This module provides tests for the transactionsFormatter utility functions.
 */
import { isTransaction } from '@/utils/transactionsFormatter'
import { AccountInfo, Transaction } from '@zondax/beryx/dist/filecoin/api/types'

/**
 * @description Test data for correct input values
 */
const correctInputValues = [
  {
    amount: 10000000000000000000,
    canonical: true,
    gas_used: 10089382,
    height: 2700186,
    level: 0,
    status: 'Ok',
    tx_from: 'f410f43eydhx3zse4q5uhszdbxrdeugayog46bpjgh6a',
    tx_cid: 'bafy2bzacecc2qmykfi4axq2tjfc3xj4naeaygcqhj572muwqigehr443aifgu',
    tx_timestamp: '2023-03-20T11:33:00Z',
    tx_to: 'f410fogpbj7ftms5qkze32us6w3ckfugu5ivx4eoycoi',
    tx_type: 'InvokeContract',
    id: '0171a0e402209a0a2891f10d4f57d9d5f4cb97ab88124f8b7214efd03cc8e643b88744788709',
    search_id:
      'ODMzOTIxL2JhZnkyYnphY2VjcHl1M3M2enhtZmF6Mmt0eGt5YmZmZXp4a3k0a3pkZ3Rwc3A2bmNpeTd2bHR5aWNmdWFjL2JhZnkyYnphY2Vib3I1NGo2ZGxwc202cHZrb2RxM3BtNWhiYnFncnlmenE2YmZqcWx6emlkN3JoYjRkZGJlL2JhZnkyYnphY2VieHF0aXk2ZXBlYWM2YWM0NWlvYWZuZnhvZ3ZiemJzb292cWJycGV1dHJ0dHA0cHg3MjJhL2FhNjNiZmRmLThiOWItNTFhMC1hM2MwLTI2NDk1ZjMyM2EyOQ==',
    parent_id: '00000000-0000-0000-0000-000000000000',
    tipset_cid: 'bafy2bzacebor54j6dlpsm6pvkodq3pm5hbbqgryfzq6bfjqlzzid7rhb4ddbe',
    block_cid: 'bafy2bzacebor54j6dlpsm6pvkodq3pm5hbbqgryfzq6bfjqlzzid7rhb4ddbe',
  } as Transaction,
]
/**
 * @description Test data for incorrect input values
 */
const falseInputValues = [
  {
    actor_type: 'account',
    creation_tx_hash: '',
    eth_address: '',
    robust: 'f3vlx5btbwx2lpm3usvchodpkjpuulcwmzx5sl4elg2njtazz2eroboo6ktx2f2pglziusvif5yrtqflx57rtq',
    short: 'f02012146',
  } as AccountInfo,
]
/**
 * @description Test suite for determinateIsTransaction function
 */
describe('Determinate if the input is a transaction', () => {
  /**
   * @description Test case for correct input values
   */
  test('Correct value', () => {
    correctInputValues.forEach(item => {
      expect(isTransaction(item)).toBe(true)
    })
  })
  /**
   * @description Test case for incorrect input values
   */
  test('Wrong value', () => {
    falseInputValues.forEach(item => {
      expect(isTransaction(item)).toBe(false)
    })
  })

  // Verifies if the function handles null input correctly

  /**
   * @description Test case for null input
   */
  test('Null Input', () => {
    expect(isTransaction(null)).toBe(false)
  })

  // Determines if the input is a transaction with correct values

  /**
   * @description Test case for correct input values
   */
  test('Correct value', () => {
    correctInputValues.forEach(item => {
      expect(isTransaction(item)).toBe(true)
    })
  })

  // Checks if the function handles undefined input correctly

  /**
   * @description Test case for undefined input
   */
  test('Undefined Input', () => {
    expect(isTransaction(undefined)).toBe(false)
  })

  // Verifies if the function handles an empty object as input correctly

  /**
   * @description Test case for empty object input
   */
  test('Empty Object Input', () => {
    expect(isTransaction({})).toBe(false)
  })
})
