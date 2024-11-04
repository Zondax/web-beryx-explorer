import {
  fetchAddressValueFlow,
  fetchConfig,
  fetchContractCompilers,
  fetchContractInvokeByAddress,
  fetchContractInvokes,
  fetchContractVerified,
  fetchContractsCreate,
  fetchContractsCreateByAddress,
  fetchContractsVerified,
  fetchEstimateFees,
  fetchEventDetails,
  fetchEventsByAddress,
  fetchEventsByHash,
  fetchEventsByHeight,
  fetchEventsBySelector,
  fetchEvmTransactionsByAddress,
  fetchEvmTransactionsByBlock,
  fetchEvmTransactionsByHash,
  fetchEvmTransactionsByHeight,
  fetchGasUsed,
  fetchGasUsedByAddress,
  fetchGlobalBaseFee,
  fetchMultisigAddressProposals,
  fetchMultisigAddressState,
  fetchMultisigAddressStateTraces,
  fetchRichList,
  fetchSearchType,
  fetchTokenHoldings,
  fetchTokens,
  fetchTopAccountsByGasUsed,
  fetchTopAccountsByValueExchanged,
  fetchTopContracts,
  fetchTopContractsByInvokes,
  fetchTransactionsByAddress,
  fetchTransactionsByBlock,
  fetchTransactionsByHash,
  fetchTransactionsByHeight,
  fetchUniqueContractInvokeByAddress,
  fetchValueExchangeAtLatest,
  postContractVerify,
} from '@/api-client/beryx'
import { fetchContractIPFS } from '@/api-client/beryx-clientonly'
import {
  ContractVerifiedData,
  ContractsProps,
  GasUsedProps,
  GlobalBaseFee,
  StatsParams,
  ValueExchangeActorType,
  ValueExchangeDirection,
} from '@/api-client/beryx.types'
import { FrequencyType, InputType } from '@/config/config'
import { NetworkType } from '@/config/networks'
import { ObjectType } from '@/routes/parsing'
import { PagesProps } from '@/store/data/search'
import { completeContractsRange, completeGasRange } from '@/utils/dashboardFormatter'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { BeryxMethodType, LevelFilter, Sort } from 'components/widgets/SearchTables/config'

/**
 * useContractIPFS is a custom hook that uses the useQuery hook from React Query
 * to fetch the contract IPFS from the network.
 * @param network - The network to fetch the contract IPFS from.
 * @param input - The input string.
 * @returns result - The result of the query.
 */
export const useContractIPFS = (network: NetworkType, input: string | undefined) => {
  return useQuery({
    queryFn: () => (input ? fetchContractIPFS(network, input) : undefined),
    queryKey: ['contract-ipfs', network.uniqueId, input],
    staleTime: 1000 * 60 * 5,
    retry: true,
    enabled: Boolean(input) && Boolean(network),
  })
}

/**
 * useRichList is a custom hook that uses the useQuery hook from React Query
 * to fetch the rich list from the network.
 * @param network - The network to fetch the rich list from.
 * @returns result - The result of the query.
 */
export const useRichList = (network: NetworkType, actorType?: 'evm') => {
  const queryParams = {
    actor_type: actorType,
  }

  return useQuery({
    queryFn: () => fetchRichList(network, queryParams),
    queryKey: ['richlist', network.uniqueId, actorType],
    staleTime: 1000 * 60 * 5,
    retry: false,
  })
}

/**
 * useTopContracts is a custom hook that uses the useQuery hook from React Query
 * to fetch the top contracts list by unique users.
 * @param network - The network to fetch the list.
 * @returns result - The result of the query.
 */
export const useTopContracts = (network: NetworkType) => {
  return useQuery({
    queryFn: () => fetchTopContracts(network),
    queryKey: ['top-contracts', network.uniqueId],
    staleTime: 1000 * 60 * 5,
    retry: false,
  })
}

/**
 * useTopContractsByInvokes is a custom hook that uses the useQuery hook from React Query
 * to fetch the top contracts list by invokes.
 * @param network - The network to fetch the list.
 * @returns result - The result of the query.
 */
export const useTopContractsByInvokes = (network: NetworkType) => {
  return useQuery({
    queryFn: () => fetchTopContractsByInvokes(network),
    queryKey: ['top-contracts-by-invokes', network.uniqueId],
    staleTime: 1000 * 60 * 5,
    retry: false,
  })
}

/**
 * useTopAccountsByGasUsed is a custom hook that uses the useQuery hook from React Query
 * to fetch the top accounts by gas used.
 * @param network - The network to fetch the list.
 * @returns result - The result of the query.
 */
export const useTopAccountsByGasUsed = (network: NetworkType) => {
  return useQuery({
    queryFn: () => fetchTopAccountsByGasUsed(network),
    queryKey: ['top-accounts', network.uniqueId],
    staleTime: 1000 * 60 * 5,
    retry: false,
  })
}

/**
 * useContractVerified is a custom hook that uses the useQuery hook from React Query
 * to fetch the contract verification status from the network.
 * @param network - The network to fetch the contract verification status from.
 * @param address - The address of the contract.
 * @returns result - The result of the query.
 */
export const useContractVerified = (network: NetworkType, address: string) => {
  return useQuery({
    queryFn: () => fetchContractVerified(network, address),
    queryKey: ['contract-verify', network.uniqueId, address],
    staleTime: 1000 * 60 * 5,
    retry: true,
    enabled: Boolean(address) && Boolean(network),
  })
}

/**
 * useContractCompilers is a custom hook that uses the useQuery hook from React Query
 * to fetch the contract compilers from the network.
 * @param network - The network to fetch the contract compilers from.
 * @returns result - The result of the query.
 */
export const useContractCompilers = (network: NetworkType) => {
  return useQuery({
    queryFn: () => fetchContractCompilers(network),
    queryKey: ['contract-compilers', network.uniqueId],
    staleTime: 1000 * 60 * 5,
    retry: true,
  })
}

/**
 * useContractsVerified is a custom hook that uses the useQuery hook from React Query
 * to fetch the verified contracts from the network.
 * @param network - The network to fetch the verified contracts from.
 * @returns result - The result of the query.
 */
export const useContractsVerified = (network: NetworkType, page: PagesProps) => {
  const queryParams = {
    cursor: page.cursor,
  }

  return useQuery({
    queryFn: () => fetchContractsVerified(network, queryParams),
    queryKey: ['contract-verified', network.uniqueId, page.cursor],
    staleTime: 1000 * 60 * 5,
    retry: true,
  })
}

/**
 * usePostContractVerify is a custom hook that uses the useMutation hook from React Query
 * to post contract verification requirements to the network.
 * @returns result - The result of the mutation.
 *
 */
export const useMutationContractVerify = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ network, contractData }: { network: NetworkType; address: string; contractData: FormData }) =>
      postContractVerify(network, contractData),
    onSuccess: (
      _data: ContractVerifiedData,
      variables: {
        network: NetworkType
        address: string
        contractData: FormData
      }
    ) => {
      queryClient.invalidateQueries({ queryKey: ['contract-verify', variables.network.uniqueId, variables.address] })
    },
  })
}

/**
 * useSearchType is a custom hook that uses the useQuery hook from React Query
 * to fetch the the type of an input.
 * @param input - The input to fetch the type.
 * @param network - The network.
 * @returns result - The result of the query.
 */
export const useSearchType = (input: string, network: NetworkType) => {
  return useQuery({
    queryFn: () => fetchSearchType(input, network),
    queryKey: ['search', network.uniqueId, input],
    staleTime: 1000 * 60 * 5,
    retry: true,
    enabled: Boolean(input) && input !== '',
  })
}

/**
 * useGasUsedByAddress is a custom hook that uses the useQuery hook from React Query
 * to fetch the gas used by address.
 * @param input - The input to fetch the type.
 * @param network - The network type (e.g., 'mainnet') to fetch the gas used by address.
 * @param frequency - The frequency type (e.g., 'daily', 'weekly') indicating the time interval for data retrieval.
 * @param allPages - Flag to determine whether to fetch all pages of the gas used by address (optional).
 * @param params - Additional parameters for refining the the gas used by address query (optional).
 * @returns result - The result of the query.
 *
 */
export const useGasUsedByAddress = (
  input: string,
  network: NetworkType | undefined,
  frequency: FrequencyType,
  allPages?: boolean,
  params?: StatsParams
) => {
  return useQuery({
    queryFn: network
      ? async () => {
          let result: GasUsedProps[] = []
          let nextCursor: string | undefined
          let firstPage = true
          while ((nextCursor && nextCursor !== '') || firstPage) {
            const currentPage = await fetchGasUsedByAddress(input, network, frequency, { ...params, cursor: nextCursor })
            result = [...currentPage.results]
            nextCursor = allPages ? currentPage.next_cursor : undefined
            firstPage = false
          }
          return result
        }
      : undefined,
    queryKey: ['gas-used', network?.uniqueId, input, frequency, params?.toString(), allPages],
    staleTime: 1000 * 60 * 5,
    retry: true,
    enabled: Boolean(input) && input !== '' && Boolean(network) && Boolean(frequency),
    select: response => {
      return ['weekly', 'daily'].includes(frequency)
        ? completeGasRange({
            data: response,
            frequency,
          })
        : response
    },
  })
}

/**
 * useGasUsed is a custom hook that uses the useQuery hook from React Query
 * to fetch the gas used.
 * @param network - The network type (e.g., 'mainnet') to fetch the gas used.
 * @param frequency - The frequency type (e.g., 'daily', 'weekly') indicating the time interval for data retrieval.
 * @param allPages - Flag to determine whether to fetch all pages of gas used (optional).
 * @param params - Additional parameters for refining the gas used query (optional).
 * @returns result - The result of the query.
 *
 */
export const useGasUsed = (network: NetworkType | undefined, frequency: FrequencyType, allPages?: boolean, params?: StatsParams) => {
  return useQuery({
    queryFn: network
      ? async () => {
          let result: GasUsedProps[] = []
          let nextCursor: string | undefined
          let firstPage = true
          while ((nextCursor && nextCursor !== '') || firstPage) {
            const currentPage = await fetchGasUsed(network, frequency, { ...params, cursor: nextCursor })
            result = [...currentPage.results]
            nextCursor = allPages ? currentPage.next_cursor : undefined
            firstPage = false
          }
          return result
        }
      : undefined,
    queryKey: ['gas-used', network?.uniqueId, frequency, params?.toString(), allPages],
    staleTime: 1000 * 60 * 5,
    retry: true,
    enabled: Boolean(network) && Boolean(frequency),
    select: response => {
      return ['weekly', 'daily'].includes(frequency)
        ? completeGasRange({
            data: response,
            frequency,
          })
        : response
    },
  })
}

/**
 * useTransactions is a custom hook that uses the useQuery hook from React Query
 * to fetch the transactions.
 * @param input - What you're searching for.
 * @param network - Which blockchain network you're diving into.
 * @param inputType - The type of your input.
 * @param objectType - The kind of object you're interested in.
 * @param method - The method to filter transactions.
 * @param level - Filter by transaction level.
 * @param evm - Set true for EVM transactions.
 * @param sort - How you'd like your results sorted.
 * @param page - Pagination details.
 */
export const useTransactions = ({
  input,
  network,
  inputType,
  objectType,
  method,
  level,
  evm,
  sort,
  page,
}: {
  input: string
  network: NetworkType | undefined
  objectType: ObjectType | undefined
  inputType: InputType | undefined
  method: BeryxMethodType | undefined
  level: LevelFilter | undefined
  evm: boolean
  sort: Sort[] | undefined
  page: PagesProps
}) => {
  const formattedSort = sort && Object.keys(sort).length !== 0 ? sort.map(({ field, sort }) => `${field}:${sort}`).join(',') : undefined
  const queryParams = {
    cursor: page?.cursor,
    remove_internal_txs: level === 'main' ? '1' : undefined,
    remove_fee_txs: formattedSort ? '1' : undefined,
    limit: '100',
    sort_by: formattedSort,
  }
  const queryKey = [
    'search-transactions',
    [
      network?.uniqueId,
      objectType,
      inputType,
      input,
      method ?? '',
      queryParams.remove_internal_txs ?? '',
      queryParams.remove_fee_txs ?? '',
      evm,
      queryParams.sort_by?.toString() ?? '',
      queryParams.cursor ?? '',
    ].join('-'),
  ]

  return useQuery({
    queryFn: network
      ? async () => {
          let result
          switch (objectType) {
            case ObjectType.ADDRESS:
            case ObjectType.CONTRACT:
              result = evm
                ? await fetchEvmTransactionsByAddress(input, network, method, queryParams)
                : await fetchTransactionsByAddress(input, network, method, queryParams)
              break

            case ObjectType.TIPSET:
              result = evm
                ? await fetchEvmTransactionsByHeight(Number(input), network, queryParams)
                : await fetchTransactionsByHeight(Number(input), network, queryParams)
              break

            case ObjectType.TXS:
              result = evm
                ? await fetchEvmTransactionsByHash(input, network, queryParams)
                : await fetchTransactionsByHash(input, network, queryParams)
              break

            case ObjectType.BLOCK:
              result = evm
                ? await fetchEvmTransactionsByBlock(input, network, queryParams)
                : await fetchTransactionsByBlock(input, network, queryParams)
              break

            default:
              result = evm
                ? await fetchEvmTransactionsByHash(input, network, queryParams)
                : await fetchTransactionsByHash(input, network, queryParams)
          }
          return result
        }
      : undefined,
    queryKey,
    staleTime: 1000 * 60 * 40,
    retry: false,
    enabled: Boolean(input) && input !== '' && Boolean(network) && Boolean(objectType),
    select: response => {
      if (response.transactions) {
        response.transactions = response.transactions?.filter(({ tx_type }: { tx_type: string }) => tx_type !== 'Fee')
      }
      return response
    },
  })
}

/**
 * useAddressTotalTransactionsByMethod is a custom hook that uses the useQuery hook from React Query
 * to fetch the transactions.
 * @param input - The input to fetch the type.
 * @param network - The network.
 * @returns result - The result of the query.
 */
export const useAddressTotalTransactionsByMethod = (input: string, network: NetworkType | undefined) => {
  const queryParams = {
    remove_internal_txs: 'main',
    limit: '100',
  }

  return useQuery({
    queryFn: network
      ? async () => {
          const promiseReceiverTxs = fetchTransactionsByAddress(input, network, 'receiver', queryParams)
          const promiseSenderTxs = fetchTransactionsByAddress(input, network, 'sender', queryParams)

          const [receiverTxs, senderTxs] = await Promise.all([promiseReceiverTxs, promiseSenderTxs])
          return receiverTxs.total_txs + senderTxs.total_txs
        }
      : undefined,
    queryKey: ['search-total-transactions', network?.uniqueId, input],
    staleTime: 1000 * 60 * 5,
    placeholderData: true,
    retry: true,
    enabled: Boolean(input) && input !== '' && Boolean(network),
  })
}

/**
 * useContractsCreatesByAddress is a custom hook that uses the useQuery hook from React Query
 * to fetch contracts creates by address.
 * @param address - The address to fetch the contracts creates.
 * @param network - The network type (e.g., 'mainnet') to fetch the contract creates by address.
 * @param frequency - The frequency type (e.g., 'daily', 'weekly') indicating the time interval for data retrieval.
 * @param allPages - Flag to determine whether to fetch all pages of contract creates by address (optional).
 * @param params - Additional parameters for refining the contract creates by address query (optional).
 *
 * @returns result - The result of the query.
 */
export const useContractsCreatesByAddress = (
  address: string,
  network: NetworkType | undefined,
  frequency: FrequencyType,
  allPages?: boolean,
  params?: StatsParams
) => {
  return useQuery({
    queryFn: network
      ? async () => {
          let result: ContractsProps[] = []
          let nextCursor: string | undefined
          let firstPage = true
          while ((nextCursor && nextCursor !== '') || firstPage) {
            const currentPage = await fetchContractsCreateByAddress(address, network, frequency, { ...params, cursor: nextCursor })
            result = [...currentPage.results]
            nextCursor = allPages ? currentPage.next_cursor : undefined
            firstPage = false
          }
          return result
        }
      : undefined,
    queryKey: ['contracts-creates-by-address', network?.uniqueId, address, frequency, params?.toString(), allPages],
    staleTime: 1000 * 60 * 5,
    retry: true,
    enabled: Boolean(address) && address !== '' && Boolean(network) && Boolean(frequency),
  })
}

/**
 * useContractsCreates is a custom hook that uses the useQuery hook from React Query
 * to fetch contracts creates.
 * @param network - The network type (e.g., 'mainnet') to fetch the contract creates.
 * @param frequency - The frequency type (e.g., 'daily', 'weekly') indicating the time interval for data retrieval.
 * @param allPages - Flag to determine whether to fetch all pages of contract creates (optional).
 * @param params - Additional parameters for refining the contract creates query (optional).
 *
 * @returns result - The result of the query.
 */
export const useContractsCreates = (
  network: NetworkType | undefined,
  frequency: FrequencyType,
  allPages?: boolean,
  params?: StatsParams
) => {
  return useQuery({
    queryFn: network
      ? async () => {
          let result: ContractsProps[] = []
          let nextCursor: string | undefined
          let firstPage = true
          while ((nextCursor && nextCursor !== '') || firstPage) {
            const currentPage = await fetchContractsCreate(network, frequency, { ...params, cursor: nextCursor })
            result = [...currentPage.results]
            nextCursor = allPages ? currentPage.next_cursor : undefined
            firstPage = false
          }
          return result
        }
      : undefined,
    queryKey: ['contracts-creates', network?.uniqueId, frequency, params?.toString(), allPages],
    staleTime: 1000 * 60 * 5,
    retry: true,
    enabled: Boolean(network) && Boolean(frequency),
    select: response => {
      return ['weekly', 'daily'].includes(frequency)
        ? completeContractsRange({
            data: response,
            frequency,
          })
        : response
    },
  })
}

/**
 * useContractInvokesByAddress is a custom hook that uses the useQuery hook from React Query
 * to fetch contracts invokes by address.
 * @param address - The address to fetch the contracts invokes.
 * @param network - The network type (e.g., 'mainnet') to fetch the contract invokes.
 * @param frequency - The frequency type (e.g., 'daily', 'weekly') indicating the time interval for data retrieval.
 * @param allPages - Flag to determine whether to fetch all pages of contract invokes (optional).
 * @param params - Additional parameters for refining the contract invokes query (optional).
 *
 * @returns result - The result of the query.
 */
export const useContractInvokesByAddress = (
  address: string,
  network: NetworkType | undefined,
  frequency: FrequencyType,
  allPages?: boolean,
  params?: StatsParams
) => {
  return useQuery({
    queryFn: network
      ? async () => {
          let result: ContractsProps[] = []
          let nextCursor: string | undefined
          let firstPage = true
          while ((nextCursor && nextCursor !== '') || firstPage) {
            const currentPage = await fetchContractInvokeByAddress(address, network, frequency, { ...params, cursor: nextCursor })
            result = [...currentPage.results]
            nextCursor = allPages ? currentPage.next_cursor : undefined
            firstPage = false
          }
          return result
        }
      : undefined,
    queryKey: ['contracts-invokes-by-address', network?.uniqueId, address, frequency, params?.toString(), allPages],
    staleTime: 1000 * 60 * 5,
    retry: true,
    enabled: Boolean(address) && address !== '' && Boolean(network) && Boolean(frequency),
    select: response => {
      return ['weekly', 'daily'].includes(frequency)
        ? completeContractsRange({
            data: response,
            frequency,
          })
        : response
    },
  })
}

/**
 * useUniqueContractInvokesByAddress is a custom hook that uses the useQuery hook from React Query
 * to fetch unique contracts invokes by address.
 * @param address - The address to fetch the contracts invokes.
 * @param network - The network.
 * @param frequency - The FrequencyType.
 * @returns result - The result of the query.
 */
export const useUniqueContractInvokesByAddress = (address: string, network: NetworkType | undefined, frequency: FrequencyType) => {
  return useQuery({
    queryFn: network ? () => fetchUniqueContractInvokeByAddress(address, network, frequency) : undefined,
    queryKey: ['unique-contracts-invokes-by-address', network?.uniqueId, address, frequency],
    staleTime: 1000 * 60 * 5,
    retry: true,
    enabled: Boolean(address) && address !== '' && Boolean(network) && Boolean(frequency),
  })
}

/**
 * useContractInvokes is a custom hook that uses the useQuery hook from React Query
 * to fetch contracts invokes.
 *
 * @param network - The network type (e.g., 'mainnet') to fetch the contract invokes.
 * @param frequency - The frequency type (e.g., 'daily', 'weekly') indicating the time interval for data retrieval.
 * @param allPages - Flag to determine whether to fetch all pages of contract invokes (optional).
 * @param params - Additional parameters for refining the contract invokes query (optional).
 *
 * @returns result - The result of the query, including contract invokes data.
 */
export const useContractInvokes = (
  network: NetworkType | undefined,
  frequency: FrequencyType,
  allPages?: boolean,
  params?: StatsParams
) => {
  return useQuery({
    queryFn: network
      ? async () => {
          let result: ContractsProps[] = []
          let nextCursor: string | undefined
          let firstPage = true
          while ((nextCursor && nextCursor !== '') || firstPage) {
            const currentPage = await fetchContractInvokes(network, frequency, { ...params, cursor: nextCursor })
            result = [...currentPage.results]
            nextCursor = allPages ? currentPage.next_cursor : undefined
            firstPage = false
          }
          return result
        }
      : undefined,
    queryKey: ['contracts-invokes', network?.uniqueId, frequency, params?.toString(), allPages],
    staleTime: 1000 * 60 * 5,
    retry: true,
    enabled: Boolean(network) && Boolean(frequency),
    select: response => {
      return ['weekly', 'daily'].includes(frequency)
        ? completeContractsRange({
            data: response,
            frequency,
          })
        : response
    },
  })
}

/**
 * useAddressValueFlow is a custom hook that uses the useQuery hook from React Query
 * to fetch the value flow of an address.
 * @param address - The address to fetch the contracts invokes.
 * @param network - The network.
 * @returns result - The result of the query.
 */
export const useAddressValueFlow = (address: string, network: NetworkType | undefined) => {
  return useQuery({
    queryFn: network ? () => fetchAddressValueFlow(address, network) : undefined,
    queryKey: ['address-value-flow', network?.uniqueId, address],
    staleTime: 1000 * 60 * 5,
    retry: true,
    enabled: Boolean(network) && Boolean(address) && address !== '',
  })
}

/**
 * useGlobalBaseFee is a custom hook that uses the useQuery hook from React Query
 * to fetch the global base fee.
 *
 * @param network - The network type (e.g., 'mainnet') to fetch the contract invokes.
 * @param frequency - The frequency type (e.g., 'daily', 'weekly') indicating the time interval for data retrieval.
 * @param allPages - Flag to determine whether to fetch all pages of contract invokes (optional).
 * @param params - Additional parameters for refining the contract invokes query (optional).
 *
 * @returns result - The result of the query.
 */
export const useGlobalBaseFee = (network: NetworkType | undefined, frequency: FrequencyType, allPages?: boolean, params?: StatsParams) => {
  return useQuery({
    queryFn: network
      ? async () => {
          let result: GlobalBaseFee[] = []
          let nextCursor: string | undefined
          let firstPage = true
          while ((nextCursor && nextCursor !== '') || firstPage) {
            const currentPage = await fetchGlobalBaseFee(network, frequency, { ...params, cursor: nextCursor, limit: 830 })
            result = [...currentPage.results]
            nextCursor = allPages ? currentPage.next_cursor : undefined
            firstPage = false
          }
          return result
        }
      : undefined,
    queryKey: ['global-fees-base', network?.uniqueId, frequency, params?.toString(), allPages],
    staleTime: 1000 * 60 * 5,
    retry: true,
    enabled: Boolean(network) && Boolean(frequency),
  })
}

/**
 * useEstimateGasByMethod is a custom hook that uses the useQuery hook from React Query
 * to fetch the estimate gas by method.
 *
 * @param network - The network type (e.g., 'mainnet') to fetch the contract invokes.
 * @param frequency - The frequency type (e.g., 'daily', 'weekly') indicating the time interval for data retrieval.
 *
 * @returns result - The result of the query.
 */
export const useEstimateGasByMethod = (network: NetworkType | undefined, method?: string) => {
  return useQuery({
    queryFn: network && method ? async () => await fetchEstimateFees(network, method) : undefined,
    queryKey: ['global-fees', network?.uniqueId, method],
    staleTime: 1000 * 60 * 5,
    retry: false,
    enabled: Boolean(network) && Boolean(method),
    select: response => {
      return response.gas_probabilities
    },
  })
}

/**
 * useServiceConfig is a custom hook that uses the useQuery hook from React Query
 * to fetch get the service config.
 *
 * @returns result - The result of the query.
 */
export const useServiceConfig = (network: NetworkType | undefined) => {
  return useQuery({
    queryFn: network ? async () => await fetchConfig(network) : undefined,
    queryKey: ['service-config'],
    staleTime: 1000 * 60 * 5,
    retry: true,
  })
}

/**
 * useValueExchangeAtLatest is a custom hook that uses the useQuery hook from React Query
 * to fetch the inbound and outbound of a contract in each height.
 * @param contract - The contract address.
 * @param network - The contract network.
 * @returns result - The result of the query.
 */
export const useValueExchangeAtLatest = (network: NetworkType | undefined, contract: string) => {
  return useQuery({
    queryFn: network && contract ? () => fetchValueExchangeAtLatest(network, contract) : undefined,
    queryKey: ['value-exchange-at-latest', network?.uniqueId, contract],
    staleTime: 1000 * 60 * 5,
    enabled: Boolean(network) && Boolean(contract),
    retry: false,
  })
}

/**
 * useEvents is a custom hook that uses the useQuery hook from React Query
 * to fetch the events.
 * @param input - What you're searching for.
 * @param network - Which blockchain network you're diving into.
 * @param inputType - The type of your input.
 * @param objectType - The kind of object you're interested in.
 * @param method - The method to filter events.
 * @param sort - How you'd like your results sorted.
 * @param page - Pagination details.
 */
export const useEvents = ({
  input,
  network,
  inputType,
  objectType,
  sort,
  page,
}: {
  input: string
  network: NetworkType | undefined
  objectType: ObjectType | undefined
  inputType: InputType | undefined
  sort: Sort[] | undefined
  page: PagesProps
}) => {
  const formattedSort = sort && Object.keys(sort).length !== 0 ? sort.map(({ field, sort }) => `${field}:${sort}`).join(',') : undefined
  const queryParams = {
    cursor: page?.cursor,
    limit: '100',
    sort_by: formattedSort,
  }
  const queryKey = [
    'search-transactions',
    [network?.uniqueId, objectType, inputType, input, queryParams.sort_by?.toString() ?? '', queryParams.cursor ?? ''].join('-'),
  ]

  return useQuery({
    queryFn: network
      ? async () => {
          switch (objectType) {
            case ObjectType.ADDRESS:
            case ObjectType.CONTRACT:
              return await fetchEventsByAddress(input, network, queryParams)

            case ObjectType.TIPSET:
              return await fetchEventsByHeight(Number(input), network, queryParams)

            case ObjectType.TXS:
              return await fetchEventsByHash(input, network, queryParams)

            case ObjectType.EVENT:
              return await fetchEventsBySelector(input, network, queryParams)

            default:
              return await fetchEvmTransactionsByHash(input, network, queryParams)
          }
        }
      : undefined,
    queryKey,
    staleTime: 1000 * 60 * 40,
    retry: false,
    enabled: Boolean(input) && input !== '' && Boolean(network) && Boolean(objectType),
  })
}

/**
 * useTopAccountsByValueExchanged is a custom hook that uses the useQuery hook from React Query
 * to fetch the top contracts list by value exchanged.
 * @param network - The network to fetch the list.
 * @param direction - The value exchanged direction to fetch the list.
 * @param actorType - The actor type to fetch the list.
 * @returns result - The result of the query.
 */
export const useTopAccountsByValueExchanged = (
  network: NetworkType,
  direction: ValueExchangeDirection,
  actorType: ValueExchangeActorType
) => {
  return useQuery({
    queryFn: () => fetchTopAccountsByValueExchanged(network, direction, actorType),
    queryKey: ['top-accounts-by-value-exchanged', network.uniqueId, direction, actorType],
    staleTime: 1000 * 60 * 5,
    retry: false,
  })
}

/**
 * useEvents is a custom hook that uses the useQuery hook from React Query
 * to fetch the event details.
 * @param id - What you're searching for.
 * @param network - Which blockchain network you're diving into.
 */
export const useEventDetails = (id: string | undefined, network: NetworkType | undefined) => {
  return useQuery({
    queryFn: network && id ? () => fetchEventDetails(id, network) : undefined,
    queryKey: ['event-details', network?.uniqueId, id],
    staleTime: 1000 * 60 * 5,
    retry: false,
    enabled: Boolean(network) && Boolean(id),
  })
}

/**
 * useEventsBySelector is a custom hook that uses the useQuery hook from React Query
 * to fetch the event details.
 * @param id - What you're searching for.
 * @param network - Which blockchain network you're diving into.
 */
export const useEventsBySelector = (id: string | undefined, network: NetworkType | undefined) => {
  return useQuery({
    queryFn: network && id ? () => fetchEventsBySelector(id, network) : undefined,
    queryKey: ['events-by-selector', network?.uniqueId, id],
    staleTime: 1000 * 60 * 5,
    retry: false,
    enabled: Boolean(network) && Boolean(id),
  })
}

/**
 * useMultisigAddressState is a custom hook that uses the useQuery hook from React Query
 * to fetch the multisig address state.
 * @param address - What you're searching for.
 * @param network - Which blockchain network you're diving into.
 */
export const useMultisigAddressState = (address: string | undefined, network: NetworkType | undefined) => {
  return useQuery({
    queryFn: network && address ? () => fetchMultisigAddressState(network, address) : undefined,
    queryKey: ['multisig-address-state', network?.uniqueId, address],
    staleTime: 1000 * 60 * 5,
    retry: false,
    enabled: Boolean(network) && Boolean(address),
  })
}

/**
 *  * useMultisigAddressState is a useMultisigAddressStateTraces hook that uses the useQuery hook from React Query
 is a custom hook that uses the useQuery hook from React Query
 * to fetch the multisig address state trace.
 * @param address - What you're searching for.
 * @param network - Which blo
 * @param sort - How you'd like your results sorted.ckchain network you're diving into.
 * @param page - Pagination details.
 */
export const useMultisigAddressStateTraces = ({
  address,
  network,
  sort,
  page,
}: {
  address?: string
  network?: NetworkType
  sort: Sort[] | undefined
  page: PagesProps
}) => {
  const formattedSort = sort && Object.keys(sort).length !== 0 ? sort.map(({ field, sort }) => `${field}:${sort}`).join(',') : undefined
  const queryParams = {
    cursor: page?.cursor,
    sort_by: formattedSort,
  }

  return useQuery({
    queryFn: network && address ? () => fetchMultisigAddressStateTraces(network, address, queryParams) : undefined,
    queryKey: [
      'multisig-address-state-traces',
      network?.uniqueId,
      address,
      queryParams.sort_by?.toString() ?? '',
      queryParams.cursor ?? '',
    ],
    staleTime: 1000 * 60 * 5,
    retry: false,
    enabled: Boolean(network) && Boolean(address),
  })
}

/**
 * useMultisigAddressProposals is a custom hook that uses the useQuery hook from React Query
 * to fetch the multisig address proposals.
 * @param address - What you're searching for.
 * @param network - Which blockchain network you're diving into.
 */
export const useMultisigAddressProposals = ({
  address,
  network,
  sort,
  page,
}: {
  address?: string
  network?: NetworkType
  sort: Sort[] | undefined
  page: PagesProps
}) => {
  const formattedSort = sort && Object.keys(sort).length !== 0 ? sort.map(({ field, sort }) => `${field}:${sort}`).join(',') : undefined
  const queryParams = {
    cursor: page?.cursor,
    sort_by: formattedSort,
  }

  return useQuery({
    queryFn: network && address ? () => fetchMultisigAddressProposals(network, address, queryParams) : undefined,
    queryKey: ['multisig-address-proposals', network?.uniqueId, address, queryParams.sort_by?.toString() ?? '', queryParams.cursor ?? ''],
    staleTime: 1000 * 60 * 5,
    retry: false,
    enabled: Boolean(network) && Boolean(address),
  })
}

/**
 * useTokens is a custom hook that uses the useQuery hook from React Query
 * to fetch the ERC20 tokens from the network.
 * @param network - The network to fetch the verified contracts from.
 * @returns result - The result of the query.
 */
export const useTokens = (network: NetworkType) => {
  const queryParams = {
    sort: 'holders',
    order: 'desc',
  }
  return useQuery({
    queryFn: () => fetchTokens(network, queryParams),
    queryKey: ['tokens-list', network.uniqueId],
    staleTime: 1000 * 60 * 5,
    retry: true,
  })
}

/**
 * useTokenHoldings is a custom hook that uses the useQuery hook from React Query
 * to fetch the token holdings from the network.
 * @param network - The network to fetch the verified contracts from.
 * @returns result - The result of the query.
 */
export const useTokenHoldings = (network: NetworkType, address: string) => {
  const queryParams = {
    sort: 'holders',
    order: 'desc',
  }
  return useQuery({
    queryFn: () => fetchTokenHoldings(network, address, queryParams),
    queryKey: ['token-holdings', network.uniqueId, address],
    staleTime: 1000 * 60 * 5,
    retry: true,
  })
}
