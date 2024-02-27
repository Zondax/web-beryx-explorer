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
  fetchEvmTransactionsByAddress,
  fetchEvmTransactionsByBlock,
  fetchEvmTransactionsByHash,
  fetchEvmTransactionsByHeight,
  fetchGasUsed,
  fetchGasUsedByAddress,
  fetchGlobalBaseFee,
  fetchRichList,
  fetchSearchType,
  fetchTopAccountsByGasUsed,
  fetchTopContracts,
  fetchTopContractsByInvokes,
  fetchTransactionsByAddress,
  fetchTransactionsByBlock,
  fetchTransactionsByHash,
  fetchTransactionsByHeight,
  fetchUniqueContractInvokeByAddress,
  postContractVerify,
} from '@/api-client/beryx'
import { fetchContractIPFS } from '@/api-client/beryx-clientonly'
import { ContractVerifiedData, ContractsProps, GasUsedProps, GlobalBaseFee, StatsParams } from '@/api-client/beryx.types'
import { FrequencyType } from '@/config/config'
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
export const useRichList = (network: NetworkType) => {
  return useQuery({
    queryFn: () => fetchRichList(network),
    queryKey: ['richlist', network.uniqueId],
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
 * useContractsVerified is a custom hook that uses the useQuery hook from React Query
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
 * @param input - The input to fetch the type.
 * @param network - The network.
 * @param frequency - The FrequencyType.
 * @returns result - The result of the query.
 */
export const useTransactions = ({
  input,
  network,
  type,
  method,
  level,
  evm,
  sort,
  page,
}: {
  input: string
  network: NetworkType | undefined
  type: ObjectType | undefined
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
      type,
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
          switch (type) {
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
    enabled: Boolean(input) && input !== '' && Boolean(network) && Boolean(type),
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
            const currentPage = await fetchGlobalBaseFee(network, frequency, { ...params, cursor: nextCursor })
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
