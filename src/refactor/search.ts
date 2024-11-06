import { v4 } from 'uuid'

import {
  fetchAccountBalance,
  fetchAccountInfo,
  fetchBlockByHash,
  fetchContractDecoded,
  fetchEventsBySelector,
  fetchHashEthForm,
  fetchTipsetByHash,
  fetchTipsetByHeight,
  fetchTokenHoldings,
  fetchTransactionsByHash,
} from '@/api-client/beryx'
import { AbiItem } from '@/api-client/beryx.types'
import { InputType, LoadingStatus } from '@/config/config'
import { NetworkType } from '@/config/networks'
import { ObjectType } from '@/routes/parsing'
import { useMempoolStore } from '@/store/data/mempool'
import { useSearchStore } from '@/store/data/search'
import { useContractsStore } from '@/store/ui/contracts'
import { captureException } from '@sentry/nextjs'
import { FilEthAddress } from '@zondax/izari-filecoin/address'

import { DecodedABI } from 'components/views/ResultsView/ContractView/config'

/**
 * Interface for the response of the searchValue function.
 * @interface SearchValueResponse
 * @property error - Indicates if there was an error during the search.
 */
interface SearchValueResponse {
  error: boolean
}

/**
 * Asynchronously makes a request based on the input type and network name.
 * @param inputValue - The input value for the request.
 * @param inputType - The type of the input. Can be an address, tipset, or transaction.
 * @param networkName - The name of the network to make the request on.
 * @throws Will throw an error if the request fails.
 * @returns A promise that resolves to an object containing an error boolean and an optional response.
 * @deprecated move to backend generic search and react-query
 */
const makeRequest = async (
  inputValue: string,
  inputType: InputType | undefined,
  objectType: ObjectType | undefined,
  networkName: NetworkType,
  ethForm?: string
): Promise<{ error: boolean; response?: any }> => {
  const type = `${inputType}-${objectType}`

  switch (type) {
    case `${InputType.ETHEREUM_ID}-${ObjectType.ADDRESS}`:
    case `${InputType.FILECOIN_ADDRESS}-${ObjectType.ADDRESS}`: {
      try {
        const accountBalancePromise = fetchAccountBalance(inputValue, networkName)
        const accountInfoPromise = fetchAccountInfo(inputValue, networkName)
        let tokenHoldingsPromise

        if (ethForm) {
          tokenHoldingsPromise = fetchTokenHoldings(networkName, ethForm)
        } else {
          tokenHoldingsPromise = Promise.resolve(null) // Do not make the request if there is no ethForm
        }

        const response = await Promise.allSettled([accountBalancePromise, accountInfoPromise, tokenHoldingsPromise])

        const account = {}
        response.forEach(response => {
          if (response.status === 'fulfilled' && response.value !== null) {
            Object.assign(account, response.value)
          } else if (response.status === 'rejected') {
            captureException(response.reason)
          }
        })

        if (Object.keys(account).length !== 0) {
          return { error: false, response: account }
        }
        return { error: true }
      } catch (error) {
        return { error: true }
      }
    }
    case `${InputType.HASH}-${ObjectType.TIPSET}`: {
      try {
        const tipsetInfo = await fetchTipsetByHash(inputValue, networkName)
        const isError = !tipsetInfo

        return { error: isError, response: isError ? undefined : tipsetInfo }
      } catch (error) {
        return { error: true }
      }
    }
    case `${InputType.HEIGHT}-${ObjectType.TIPSET}`: {
      try {
        const tipsetHeight = Number(inputValue)
        if (isNaN(tipsetHeight)) {
          throw new Error(`Invalid tipset height: ${inputValue}`)
        }
        const tipsetInfo = await fetchTipsetByHeight(tipsetHeight, networkName)
        const isError = !tipsetInfo

        return { error: isError, response: isError ? undefined : tipsetInfo }
      } catch (error) {
        return { error: true }
      }
    }
    case `${InputType.HASH}-${ObjectType.TXS}`: {
      try {
        // Send the transaction to Beryx API
        const transactions = await fetchTransactionsByHash(inputValue, networkName)

        // Supporting the backend issue. If the transaction is not found, but the hash is valid, we receive an empty array
        if (transactions !== 'error' && transactions.transactions.length !== 0) {
          return { error: false, response: transactions }
        }

        // Search the transaction in Mempool. Wait 3 seconds to receive the first snapshot with transactions
        let mempoolTxs = useMempoolStore.getState().transactions

        if (!mempoolTxs || mempoolTxs.length === 0) {
          await new Promise(resolve => {
            setTimeout(resolve, 3000)
          })
        }

        mempoolTxs = useMempoolStore.getState().transactions

        if (mempoolTxs && mempoolTxs.length > 0) {
          const currentTx = mempoolTxs.find(item => item.tx_cid === inputValue)

          if (currentTx) {
            // The transaction was found in Mempool
            return { error: false, response: { mempoolTx: currentTx } }
          }
        }

        return { error: true }
      } catch (error) {
        return { error: true }
      }
    }
    case `${InputType.HASH}-${ObjectType.BLOCK}`: {
      try {
        // Send the transaction to Beryx API
        const blockInfo = await fetchBlockByHash(inputValue, networkName)
        if (blockInfo !== 'error') {
          return { error: false, response: blockInfo }
        }

        return { error: true }
      } catch (error) {
        return { error: true }
      }
    }
    case `${InputType.FILECOIN_EVENT}-${ObjectType.EVENT}`:
    case `${InputType.HASH}-${ObjectType.EVENT}`: {
      try {
        // Send the transaction to Beryx API
        const result = await fetchEventsBySelector(inputValue, networkName)
        if (Array.isArray(result.events) && result.events.length !== 0) {
          return { error: false, response: result.events }
        }

        return { error: true }
      } catch (error) {
        return { error: true }
      }
    }
    default:
      return { error: true }
  }
}

/**
 * Searches for a value based on the input value and type.
 * @param network
 * @param inputValue - The value to search for, should always be in FIL format.
 * @param inputType - The type of the input value.
 * @returns A promise that resolves to a SearchValueResponse object.
 * @deprecated move to backend generic search and react-query
 */
export const searchValue = async (
  network: NetworkType,
  inputValue: string,
  inputType: InputType | undefined,
  objectType: ObjectType | undefined
): Promise<SearchValueResponse> => {
  const { setContractCode, setEthAddress, setDecodingStatus } = useContractsStore.getState()
  const inputEthFrom = useContractsStore.getState().ethAddress

  const objectTypeDetected = objectType

  const searchResult: SearchValueResponse = { error: false }

  let ethForm: string | undefined = inputEthFrom

  switch (objectTypeDetected) {
    case ObjectType.ADDRESS: {
      useSearchStore.getState().setLoadingStatus('loading')
      useSearchStore.getState().setJsonLoadingStatus(LoadingStatus.Loading)

      if (!ethForm) {
        try {
          ethForm = FilEthAddress.fromString(inputValue).toEthAddressHex(true)
        } catch {
          // continue
        }
      }

      try {
        const { error, response } = await makeRequest(inputValue, inputType, objectType, network, ethForm)

        if (!error) {
          useSearchStore.getState().setSearchResultJson(response) // saving the account
          useSearchStore.getState().setLoadingStatus(undefined)
          useSearchStore.getState().setJsonLoadingStatus(LoadingStatus.Success)
        }
      } catch (error) {
        captureException(error)
        searchResult.error = true
      }

      break
    }
    case ObjectType.TIPSET: {
      useSearchStore.getState().setJsonLoadingStatus(LoadingStatus.Loading)

      try {
        const { error, response } = await makeRequest(inputValue, inputType, objectType, network)

        if (!error) {
          if (response.height !== inputValue) {
            useSearchStore.getState().setSearchInputValue(response.height)
          }
          useSearchStore.getState().setSearchResultJson(response) // saving tipsetInfo
          useSearchStore.getState().setJsonLoadingStatus(LoadingStatus.Success)
        } else {
          searchResult.error = true
        }
      } catch (error) {
        captureException(error)
        searchResult.error = true
      }
      break
    }
    case ObjectType.TXS: {
      useSearchStore.getState().setLoadingStatus('loading')
      useSearchStore.getState().setJsonLoadingStatus(LoadingStatus.Loading)

      try {
        const { error, response } = await makeRequest(inputValue, inputType, objectType, network)
        if (!error) {
          // it is a received transaction from api
          if (response.transactions) {
            let tx = response.transactions.find(
              (element: { tx_type: string; level: number }) => element.level === 0 && element.tx_type !== 'Fee'
            )

            if (!tx) {
              tx = response.transactions.find((element: { tx_type: string; level: number }) => element.level === 0)
              captureException(new Error('No main transaction'), {
                extra: {
                  description: 'There is no main transaction when searching transactions by hash. We will show the Fee transaction',
                },
              })
            }

            useSearchStore.getState().setSearchResultJson(tx)
            useSearchStore.getState().setSearchResultTxs(response.transactions)
            if (response.total_txs) {
              useSearchStore.getState().setSearchTotalItems(response.total_txs - 1)
            }
            useSearchStore.getState().setLoadingStatus(undefined)

            if (tx) {
              useSearchStore.getState().setJsonLoadingStatus(LoadingStatus.Success)
            } else {
              useSearchStore.getState().setJsonLoadingStatus(LoadingStatus.Error)
              searchResult.error = true
            }
          } else {
            // it is a mempool transaction
            useSearchStore.getState().setSearchResultMempoolJson(response.mempoolTx)
            useSearchStore.getState().setJsonLoadingStatus(LoadingStatus.Success)
          }
        } else {
          searchResult.error = true
          useSearchStore.getState().setJsonLoadingStatus(LoadingStatus.Error)
        }
      } catch (error) {
        useSearchStore.getState().setJsonLoadingStatus(LoadingStatus.Error)
        searchResult.error = true
        captureException(error)
      }

      if (!ethForm) {
        try {
          ethForm = await fetchHashEthForm(inputValue, network)
          ethForm = ethForm ?? inputValue
        } catch (e) {
          // there is no ethForm
        }
      }

      break
    }
    case ObjectType.BLOCK: {
      useSearchStore.getState().setLoadingStatus('loading')
      useSearchStore.getState().setJsonLoadingStatus(LoadingStatus.Loading)

      try {
        const { error, response } = await makeRequest(inputValue, inputType, objectType, network)

        if (!error) {
          useSearchStore.getState().setSearchResultJson(response) // saving the account
          useSearchStore.getState().setLoadingStatus(undefined)
          useSearchStore.getState().setJsonLoadingStatus(LoadingStatus.Success)
        } else {
          searchResult.error = true
          useSearchStore.getState().setJsonLoadingStatus(LoadingStatus.Error)
        }
      } catch (error) {
        useSearchStore.getState().setJsonLoadingStatus(LoadingStatus.Error)
        searchResult.error = true
        captureException(error)
      }
      break
    }
    case ObjectType.EVENT: {
      useSearchStore.getState().setLoadingStatus('loading')
      useSearchStore.getState().setJsonLoadingStatus(LoadingStatus.Loading)

      try {
        const { error, response } = await makeRequest(inputValue, inputType, objectType, network)

        if (!error) {
          useSearchStore.getState().setSearchResultJson(response[0]) // saving the account
          useSearchStore.getState().setLoadingStatus(undefined)
          useSearchStore.getState().setJsonLoadingStatus(LoadingStatus.Success)
        } else {
          searchResult.error = true
          useSearchStore.getState().setJsonLoadingStatus(LoadingStatus.Error)
        }
      } catch (error) {
        useSearchStore.getState().setJsonLoadingStatus(LoadingStatus.Error)
        searchResult.error = true
        captureException(error)
      }
      break
    }
    default: {
      throw new Error(`Invalid input type: ${objectTypeDetected}`)
    }
  }

  if (ethForm && ethForm !== 'error') {
    setEthAddress(ethForm)
  }

  if (objectTypeDetected === ObjectType.ADDRESS) {
    setDecodingStatus(LoadingStatus.Loading)
    try {
      const decoded = await fetchContractDecoded(inputValue, network)
      if (decoded === undefined) {
        setDecodingStatus(LoadingStatus.Error)
        useSearchStore.getState().setIsContract(false)
      } else {
        useSearchStore.getState().setIsContract(true)
        setContractCode({
          functions: decoded.abi.map((elem: AbiItem) => {
            const decodedAbi: DecodedABI = { ...elem, id: v4() }
            return decodedAbi
          }),
          byteCode: decoded.bytecode,
          erc: decoded.ERC,
          opCode: decoded.instructions,
          selectors: decoded.selectors,
        })
      }

      setDecodingStatus(LoadingStatus.Success)
    } catch (error) {
      captureException(error)
    }
  }
  return searchResult
}
