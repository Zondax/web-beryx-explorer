import { NetworkType } from '@/config/networks'
import { ObjectType } from '@/routes/parsing'
import { ExtendedTransaction, defaultCollapse } from '@/store/data/search'
import { captureException } from '@sentry/nextjs'
import { Transaction } from '@zondax/beryx/dist/filecoin/api/types'

/**
 * Checks if the provided body is a Transaction.
 * @param body - The body to check.
 * @returns Returns true if the body is a Transaction, false otherwise.
 */
export const isTransaction = (body: unknown): body is Transaction => {
  return Boolean((body as Transaction)?.tx_cid)
}

/**
 * Adds a unique path to each transaction in a given array, representing its position in the transaction tree.
 * Duplicates are removed, and any duplicated transactions are logged as errors.
 *
 * @param transactions - An array of transactions to process.
 * @param inputValue - The input value, such as an address or hash, used for search.
 * @param inputType - The type of the input (ObjectType) being searched for.
 * @param network - The network type on which the transactions are performed.
 * @returns An array of transactions with unique paths added.
 */
export const addTransactionsTreePath = (
  transactions: Transaction[],
  inputValue: string,
  inputType: ObjectType | undefined,
  network: NetworkType | undefined
) => {
  const uniqueTransactions = []
  const seenIds: Set<string> = new Set()

  for (const transaction of transactions) {
    const transactionId = transaction.id.toString()

    if (!seenIds.has(transactionId)) {
      uniqueTransactions.push(transaction)
      seenIds.add(transactionId)
    } else {
      captureException(new Error('Duplicated Transactions'), {
        extra: {
          description: `Found duplicated transaction for: ${inputType} ${inputValue} in ${network?.name} with id: ${transactionId}`,
        },
      })
    }
  }

  transactions = uniqueTransactions

  // If the search type is transaction, internal transactions are only showed
  if (inputType === ObjectType.TXS) {
    transactions = transactions.filter(({ level }: { level: number }) => level !== 0)
  }

  const sortedTxs: ExtendedTransaction[] = []
  const usedParentIds: { parentId: string; repeats: number }[] = []

  transactions
    .sort((x: Transaction, y: Transaction) => x.level - y.level)
    .forEach((tx: Transaction) => {
      const newTransaction: ExtendedTransaction = { ...tx, path: [] }

      // If the tx is level 0, it is added
      if (newTransaction.level === 0) {
        newTransaction.path = [tx.id]
        sortedTxs.push(newTransaction)
        return
      }

      // Find if the parent tx is present
      const index = sortedTxs.findIndex(({ id }) => id === tx.parent_id)

      if (index !== -1) {
        sortedTxs[index].collapse = defaultCollapse
        newTransaction.path = [...sortedTxs[index].path, tx.id]
        let siblingsTxs = 0 // sibling txs, txs with the same parent_id

        // Find if there is a sibling tx in sortedTxs or if it's the first one with this parent_id
        const indexUsedParentId = usedParentIds.findIndex(({ parentId }) => parentId === tx.parent_id)

        if (indexUsedParentId !== -1) {
          // As there is sibling txs in sortedTxs, the tx is added after all of theme.
          siblingsTxs = usedParentIds[indexUsedParentId].repeats
          usedParentIds[indexUsedParentId].repeats += 1
        } else {
          // The tx is the frist with this parent_id
          usedParentIds.push({ parentId: tx.parent_id, repeats: 1 })
        }

        // The tx is added after it's parent tx and it's sibling txs
        sortedTxs.splice(index + 1 + siblingsTxs, 0, newTransaction)
        return
      }

      newTransaction.path = [tx.id]
      sortedTxs.push(newTransaction)
    })

  return sortedTxs
}
