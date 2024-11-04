import { act } from 'react'

import { Networks } from '@/config/networks'
import { advanceTimersByTimeHelper, hookHelper } from '@/helpers/jest'

import { DEBOUNCE_TIME, DetailsProps, TransactionData, useMempoolStore } from './mempool'

jest.useFakeTimers()

/**
 * @file This file contains tests for the useMempoolStore custom hook.
 */
describe('useMempoolStore', () => {
  /**
   * @description Mock data - transaction object to be used in tests
   */
  const mockTransaction: TransactionData = {
    first_seen: '2023-08-20',
    last_seen: '2023-08-21',
    nonce: 1,
    amount: '100',
    gas_fee_cap: 2,
    gas_premium: 3,
    gas_limit: 4,
    method_name: 'test',
    method: 5,
    tx_cid: 'tx_12345',
    tx_from: 'address1',
    tx_to: 'address2',
    deleted: false,
    deleted_at: '2023-08-22',
  }

  /**
   * @test This test verifies that a transaction can be successfully added to the transaction list.
   */
  it('should add an item to transactions', () => {
    const mempoolStore = hookHelper(useMempoolStore)

    act(() => {
      mempoolStore().addItem(mockTransaction, Networks.mainnet)
    })

    // keep in mind that the store is debounced
    advanceTimersByTimeHelper(DEBOUNCE_TIME * 2)

    act(() => {
      expect(mempoolStore().transactions).toContain(mockTransaction)
    })
  })

  /**
   * @test This test verifies that a transaction can be successfully removed from the transaction list.
   */
  it('should remove an item from transactions', () => {
    const mempoolStore = hookHelper(useMempoolStore)

    act(() => {
      mempoolStore().addItem(mockTransaction, Networks.mainnet)
      mempoolStore().removeItem(mockTransaction, Networks.mainnet)
    })

    // keep in mind that the store is debounced
    advanceTimersByTimeHelper(DEBOUNCE_TIME * 2)

    expect(mempoolStore().transactions).not.toContain(mockTransaction)
  })

  /**
   * @test This test verifies that the transaction list can be successfully updated with new snapshot data.
   */
  it('should update transactions with new snapshot data', () => {
    const mempoolStore = hookHelper(useMempoolStore)

    const mockSnapshot: TransactionData[] = [mockTransaction]

    act(() => {
      mempoolStore().updateSnapshot(mockSnapshot, Networks.mainnet)
    })

    act(() => {
      expect(mempoolStore().transactions).toEqual(mockSnapshot)
    })
  })

  /**
   * @test This test verifies that the state of the store can be successfully cleared.
   */
  it('should clear the store', () => {
    const mempoolStore = hookHelper(useMempoolStore)

    act(() => {
      mempoolStore().reset()
    })

    expect(mempoolStore().transactions).toEqual([])
    expect(mempoolStore().details).toEqual({
      numberOfItems: undefined,
    })
  })

  /**
   * @test This test verifies that the details (metadata) of the store can be successfully set.
   */
  it('should set the details', () => {
    const mempoolStore = hookHelper(useMempoolStore)

    const mockDetails: DetailsProps = {
      numberOfItems: '10',
    }

    act(() => {
      mempoolStore().setDetails(mockDetails)
    })

    expect(mempoolStore().details).toEqual(mockDetails)
  })

  // Verify that adding a transaction that already exists in the list does not create duplicates.

  /**
   * @test This test verifies that adding a transaction that already exists in the list does not create duplicates.
   */
  it('should not add duplicate transactions', () => {
    const mempoolStore = hookHelper(useMempoolStore)

    act(() => {
      mempoolStore().addItem(mockTransaction, Networks.mainnet)
    })
    act(() => {
      mempoolStore().addItem(mockTransaction, Networks.mainnet)
    })

    // keep in mind that the store is debounced
    advanceTimersByTimeHelper(DEBOUNCE_TIME * 2)

    expect(mempoolStore().transactions.filter((tx: TransactionData) => tx.tx_cid === mockTransaction.tx_cid)).toHaveLength(1)
  })

  // Verify that attempting to remove a transaction that does not exist in the list does not affect the list.

  /**
   * @test This test verifies that attempting to remove a transaction that does not exist in the list does not affect the list.
   */
  it('should not remove non-existent transactions', () => {
    const mempoolStore = hookHelper(useMempoolStore)

    act(() => {
      mempoolStore().removeItem(mockTransaction, Networks.mainnet)
    })

    // keep in mind that the store is debounced
    advanceTimersByTimeHelper(DEBOUNCE_TIME * 2)

    expect(mempoolStore().transactions).toEqual([])
  })

  // Verify that attempting to update a transaction that does not exist in the list does not affect the list.

  /**
   * @test This test verifies that attempting to update a transaction that does not exist in the list does not affect the list.
   */
  it('should not update non-existent transactions', () => {
    const mempoolStore = hookHelper(useMempoolStore)

    act(() => {
      mempoolStore().updateItem(mockTransaction, Networks.mainnet)
    })

    // keep in mind that the store is debounced
    advanceTimersByTimeHelper(DEBOUNCE_TIME * 2)

    expect(mempoolStore().transactions).toEqual([])
  })

  // Verify that a transaction can be successfully updated in the transaction list.
  it('should update an item in transactions', () => {
    const mempoolStore = hookHelper(useMempoolStore)

    act(() => {
      mempoolStore().addItem(mockTransaction, Networks.mainnet)
    })
    const updatedMockTransaction = { ...mockTransaction, amount: '100' }
    act(() => {
      mempoolStore().updateItem(updatedMockTransaction, Networks.mainnet)
    })

    // keep in mind that the store is debounced
    advanceTimersByTimeHelper(DEBOUNCE_TIME * 2)

    expect(mempoolStore().transactions).toContain(updatedMockTransaction)
  })

  // Verify that the transaction list can be successfully updated with multiple transactions in the snapshot.

  /**
   * @test This test verifies that the transaction list can be successfully updated with multiple transactions in the snapshot.
   */
  it('should handle multiple transactions in snapshot', () => {
    const mempoolStore = hookHelper(useMempoolStore)

    const mockSnapshot: TransactionData[] = [mockTransaction, mockTransaction]

    act(() => {
      mempoolStore().updateSnapshot(mockSnapshot, Networks.mainnet)
    })
    expect(mempoolStore().transactions).toEqual(mockSnapshot)
  })

  // Verify that the transaction list can be successfully updated with an empty snapshot.

  /**
   * @test This test verifies that the transaction list can be successfully updated with an empty snapshot.
   */
  it('should handle empty snapshot', () => {
    const mempoolStore = hookHelper(useMempoolStore)

    const mockSnapshot: TransactionData[] = []

    act(() => {
      mempoolStore().updateSnapshot(mockSnapshot, Networks.mainnet)
    })
    expect(mempoolStore().transactions).toEqual(mockSnapshot)
  })

  // Verify that multiple updates to the same transaction are handled correctly.

  /**
   * @test This test verifies that multiple updates to the same transaction are handled correctly.
   */
  it('should handle multiple updates to the same transaction', () => {
    const mempoolStore = hookHelper(useMempoolStore)

    act(() => {
      mempoolStore().addItem(mockTransaction, Networks.mainnet)
    })
    const updatedTransaction: TransactionData = {
      ...mockTransaction,
      amount: '200',
    }

    act(() => {
      mempoolStore().updateItem(updatedTransaction, Networks.mainnet)
    })
    act(() => {
      mempoolStore().updateItem(updatedTransaction, Networks.mainnet)
    })
    // keep in mind that the store is debounced
    advanceTimersByTimeHelper(DEBOUNCE_TIME * 2)

    expect(mempoolStore().transactions).toContain(updatedTransaction)
  })
})
