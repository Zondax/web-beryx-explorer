import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { InputType, LoadingStatus } from '@/config/config'
import { NetworkType } from '@/config/networks'
import { ObjectType } from '@/routes/parsing'
import { TransactionData } from '@/store/wallets/wallet'
import { captureException } from '@sentry/nextjs'
import { Transaction } from '@zondax/beryx/dist/filecoin/api/types'

/**
 * Loading status type
 */
type loadingStatusType = 'loading' | undefined

/**
 * PagesProps interface
 * @interface PagesProps
 * @property page - The page number
 * @property [cursor] - The cursor string
 */
export interface PagesProps {
  page: number
  cursor?: string
  totalTxs?: number
}

export const defaultCollapse = false

export interface ExtendedTransaction extends Transaction {
  path: string[]
  hide?: boolean
  collapse?: boolean // if this variable is different to undefined, it indicates that the transaction has children.
}

/**
 * @description SearchResult interface
 */
interface searchResultInterface {
  loadingStatus: loadingStatusType
  jsonLoadingStatus: LoadingStatus
  json?: any // use (AccountInfo & AccountBalance) | Tipset | Transaction
  mempoolJson?: any
  transactions: any
  transactionsCount: {
    totalCount: number | undefined
    fetchedPages: PagesProps[] // pages and their corresponding cursors
    hasNext: boolean
  }
  transaction?: Transaction

  metadata: {
    loadingStatus: LoadingStatus
    data: any
  }
  foundInAnotherNetwork: boolean
}

/**
 * @description CurrentResult interface
 */
interface CurrentResultInterface {
  transactions: ExtendedTransaction[]
  totalTxs?: number
}

interface SearchState {
  currentResult?: CurrentResultInterface
  searchHistoryValue: {
    network: NetworkType
    type: ObjectType
    value: string
  }[]
  searchInputValue: string
  searchItemType: ObjectType
  searchInputNetwork?: NetworkType
  // @deprecated migrate to react-query
  searchResult: searchResultInterface
  searchInputType: InputType | undefined
  searchType: ObjectType | undefined
  fetchError: boolean
  isContract: boolean
}

const InitialState: SearchState = {
  searchInputValue: '',
  searchItemType: ObjectType.UNKNOWN,
  searchInputNetwork: undefined,
  // @deprecated migrate to react-query
  searchResult: {
    loadingStatus: undefined,
    jsonLoadingStatus: LoadingStatus.Loading,
    json: undefined,
    mempoolJson: undefined,
    transactionsCount: { totalCount: undefined, fetchedPages: [{ page: 1 }], hasNext: true },
    transactions: undefined,
    transaction: undefined,
    foundInAnotherNetwork: false,
    metadata: { loadingStatus: LoadingStatus.Idle, data: undefined },
  },
  searchHistoryValue: [],
  searchInputType: undefined,
  searchType: undefined,
  // @deprecated migrate to react-query
  fetchError: false,
  isContract: false,
}

interface SearchActions {
  pushSearchHistoryValue: (value: { network: NetworkType; type: ObjectType; value: string }) => void
  setSearchInputValue: (value: string) => void
  setSearchItemType: (itemType: ObjectType) => void
  setSearchInputNetwork: (network: NetworkType) => void
  // @deprecated migrate to react-query
  setSearchResultJson: (json: any) => void
  addToSearchResultJson: (additionalJson: any) => void
  // @deprecated migrate to react-query
  setSearchResultMempoolJson: (mempoolJson: any) => void
  // @deprecated migrate to react-query
  setSearchResultTxs: (transactions: TransactionData[]) => void
  setCurrentResult: ({ transactions, totalTxs }: { transactions: ExtendedTransaction[]; totalTxs?: number }) => void
  updateCurrentTxs: (transactions: ExtendedTransaction[]) => void
  // @deprecated migrate to react-query
  setSearchResultTxsPages: (nextPage: { page: number; cursor: string } | undefined, total_items?: number) => void
  // @deprecated migrate to react-query
  setSearchTotalItems: (total_items?: number) => void
  // @deprecated migrate to react-query
  replaceSearchResultTxsPages: (nextPage: { page: number; cursor: string }) => void
  // @deprecated migrate to react-query
  setLoadingStatus: (status: loadingStatusType) => void
  // @deprecated migrate to react-query
  setJsonLoadingStatus: (status: LoadingStatus) => void
  // @deprecated migrate to react-query
  setSearchResultTx: (transaction: any) => void
  // @deprecated migrate to react-query
  setSearchType: (searchType: ObjectType) => void
  // @deprecated migrate to react-query
  setSearchInputType: (searchInputType: InputType | undefined) => void
  // @deprecated migrate to react-query
  appendSearchResultJson: (json: object) => void
  // @deprecated migrate to react-query
  cleanSearchResultTx: () => void
  // @deprecated migrate to react-query
  cleanSearchInputValue: () => void
  // @deprecated migrate to react-query
  cleanExplorerResponse: () => void
  // @deprecated migrate to react-query
  setSearchResultMetadata: (metadata: { loadingStatus: LoadingStatus; data: any[] | undefined }) => void
  // @deprecated migrate to react-query
  setFetchError: (error: boolean) => void
  setIsContract: (isContract: boolean) => void
  // @deprecated migrate to react-query
  setFoundInAnotherNetwork: (found: boolean) => void
}

export const useSearchStore = create<SearchState & SearchActions>()(
  immer((set, get) => ({
    ...InitialState,
    pushSearchHistoryValue: (value: { network: NetworkType; type: ObjectType; value: string }) => {
      set(state => {
        if (state.searchHistoryValue.length < 15) {
          state.searchHistoryValue.unshift(value)
        } else {
          state.searchHistoryValue.pop()
          state.searchHistoryValue.unshift(value)
        }
      })
    },
    setSearchInputValue: (value: string) =>
      set(state => {
        state.searchInputValue = value
      }),
    setSearchItemType: (itemType: ObjectType) =>
      set(state => {
        state.searchItemType = itemType
      }),
    setSearchInputNetwork: (network: NetworkType) =>
      set(state => {
        state.searchInputNetwork = network
      }),
    setSearchResultJson: (json: any) =>
      set(state => {
        state.searchResult.json = json
      }),
    addToSearchResultJson: (additionalJson: any) => {
      set(state => {
        if (state.searchResult.json) {
          state.searchResult.json = { ...state.searchResult.json, ...additionalJson }
        } else {
          state.searchResult.json = additionalJson
        }
      })
    },
    setSearchResultMempoolJson: (mempoolJson: any) =>
      set(state => {
        state.searchResult.mempoolJson = mempoolJson
      }),
    setCurrentResult: ({ transactions, totalTxs }: { transactions: ExtendedTransaction[]; totalTxs?: number }) =>
      set(state => {
        state.currentResult = { transactions, totalTxs }
      }),
    updateCurrentTxs: (transactions: ExtendedTransaction[]) => {
      if (get().currentResult) {
        set(state => {
          state.currentResult = { totalTxs: state.currentResult?.totalTxs, transactions }
        })
      }
    },
    setSearchResultTxs: (transactions: any) => {
      // Temporary fix
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
              description: `Found duplicated transaction for: ${get().searchItemType} ${get().searchInputValue} in ${
                get().searchInputNetwork?.name
              } with id: ${transactionId}`,
            },
          })
        }
      }

      transactions = uniqueTransactions

      const keyPaths: string[][] = []
      const txs: any[] = []

      // If the search type is transaction, internal transactions are only showed
      if (get().searchType === ObjectType.TXS) {
        transactions = transactions.filter(({ level }: { level: number }) => level !== 0)
      }

      transactions
        .sort((x: any, y: any) => x.level - y.level)
        .forEach((tx: any) => {
          const elem: any = { ...tx }
          switch (elem.level) {
            case 0:
              if (elem.tx_type !== 'Fee') {
                elem['path'] = [elem.id]
              }
              break
            default: {
              let path = keyPaths.find(arrayPath => arrayPath[elem.level - 1] === elem.parent_id)
              if (!path && elem.level !== 1) {
                // Case in which the parent transaction is internal, but the main transaction is not present
                path = keyPaths.find(arrayPath => arrayPath[0] === elem.parent_id)
              }
              if (path) {
                elem['path'] = [...path, elem.id]
              } else {
                // If the parent tx isn't, the tx is added in a first level
                elem['path'] = [elem.id]
                break
              }
            }
          }
          keyPaths.push(elem.path)
          txs.push(elem)
        })
      set(state => {
        state.searchResult.transactions = txs
      })
    },
    setSearchResultTxsPages: (nextPage: { page: number; cursor: string } | undefined, total_items?: number) => {
      const totalCount = total_items ? { totalCount: total_items } : {}
      // There is no next page
      if (!nextPage) {
        set(state => {
          state.searchResult.transactionsCount = {
            ...state.searchResult.transactionsCount,
            hasNext: false,
            ...totalCount,
          }
        })
        return
      }
      // There is next page
      if (!get().searchResult.transactionsCount.fetchedPages.find(({ page }) => page === nextPage?.page)) {
        // Create a copy of the fetchedPages array
        const newPage = [...get().searchResult.transactionsCount.fetchedPages]
        newPage.push(nextPage)
        set(state => {
          state.searchResult.transactionsCount = {
            ...state.searchResult.transactionsCount,
            hasNext: true,
            fetchedPages: newPage,
            ...totalCount,
          }
        })
      } else {
        set(state => {
          state.searchResult.transactionsCount = {
            ...state.searchResult.transactionsCount,
            hasNext: true,
            ...totalCount,
          }
        })
      }
    },
    setSearchTotalItems: (total_items?: number) => {
      set(state => {
        state.searchResult.transactionsCount = {
          ...state.searchResult.transactionsCount,
          totalCount: total_items,
        }
      })
    },
    replaceSearchResultTxsPages: (nextPage: { page: number; cursor: string }) => {
      // There is next page
      const index = get().searchResult.transactionsCount.fetchedPages.findIndex(({ page }) => page === nextPage.page)
      const newFetchedPages = get().searchResult.transactionsCount.fetchedPages
      newFetchedPages.splice(index, 1, nextPage)
      set(state => {
        state.searchResult.transactionsCount = {
          ...state.searchResult.transactionsCount,
          fetchedPages: newFetchedPages,
        }
      })
    },
    setLoadingStatus: (status: loadingStatusType) =>
      set(state => {
        state.searchResult.loadingStatus = status
      }),
    setJsonLoadingStatus: (status: LoadingStatus) =>
      set(state => {
        state.searchResult.jsonLoadingStatus = status
      }),
    setSearchResultTx: (transaction: any) =>
      set(state => {
        state.searchResult.transaction = transaction
      }),
    setSearchType: (searchType: ObjectType) =>
      set(state => {
        state.searchType = searchType
      }),
    setSearchInputType: (searchInputType: InputType | undefined) =>
      set(state => {
        state.searchInputType = searchInputType
      }),
    appendSearchResultJson: (json: any) => {
      if (get().searchResult.json === undefined) {
        set(state => {
          state.searchResult.json = json
        })
      } else {
        set(state => {
          state.searchResult.json = { ...state.searchResult.json, ...json }
        })
      }
    },
    cleanSearchResultTx: () =>
      set(state => {
        state.searchResult = {
          ...state.searchResult,
          transactionsCount: { totalCount: undefined, fetchedPages: [{ page: 1 }], hasNext: true },
          transactions: undefined,
        }
      }),
    cleanSearchInputValue: () =>
      set(state => {
        state.searchInputValue = ''
      }),
    cleanExplorerResponse: () =>
      set(state => {
        state.searchInputValue = ''
        state.searchResult = {
          loadingStatus: undefined,
          jsonLoadingStatus: LoadingStatus.Idle,
          json: undefined,
          mempoolJson: undefined,
          transactionsCount: { totalCount: undefined, fetchedPages: [{ page: 1 }], hasNext: true },
          transactions: undefined,
          transaction: undefined,
          foundInAnotherNetwork: false,
          metadata: { loadingStatus: LoadingStatus.Idle, data: undefined },
        }
        state.currentResult = undefined
        state.isContract = false
        state.searchType = undefined
      }),
    setSearchResultMetadata: (metadata: { loadingStatus: LoadingStatus; data: any[] | undefined }) =>
      set(state => {
        state.searchResult.metadata = { ...metadata }
      }),
    setFetchError: (error: boolean) =>
      set(state => {
        state.fetchError = error
      }),
    setIsContract: (isContract: boolean) =>
      set(state => {
        state.isContract = isContract
      }),
    setFoundInAnotherNetwork: (found: boolean) =>
      set(state => {
        state.searchResult.foundInAnotherNetwork = found
      }),
  }))
)
