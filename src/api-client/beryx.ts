import { AxiosError } from 'axios'

import { BeryxInputTypes, FrequencyType, getBeryxUrl } from '@/config/config'
import { NetworkType } from '@/config/networks'

import { BeryxMethodType } from '../../components/widgets/SearchTables/config'
import {
  BaseFeeEstimation,
  ContractCompilers,
  ContractInfo,
  ContractVerificationList,
  ContractVerifiedData,
  ContractsProps,
  GasUsedProps,
  GlobalBaseFee,
  SearchType,
  ServiceConfig,
  StatsParams,
  Tipset,
  ValueFlow,
} from './beryx.types'
import { authenticatedREST } from './rest'

/**
 * @description Function to expect a single valid result from a list of promises.
 * @param promises - The list of promises.
 * @returns The single valid result, undefined if all fail with error 400, or throws an error if any fails with errors different from 400.
 */
const expectSingleValidResult = async (promises: Promise<string>[]): Promise<string | undefined> => {
  const results = await Promise.allSettled(promises)
  const successfulResults = results.filter((result): result is PromiseFulfilledResult<string> => result.status === 'fulfilled')

  if (successfulResults.length > 0) {
    const uniqueResults = [...new Set(successfulResults.map(result => result.value))]
    if (uniqueResults.length === 1) {
      return uniqueResults[0]
    }
    throw new Error('More than one unique successful result')
  }

  const errorResults = results.filter((result): result is PromiseRejectedResult => result.status === 'rejected')

  if (errorResults.every(result => (result.reason as AxiosError).response?.status === 400)) {
    return undefined
  }

  throw errorResults[0].reason
}

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

/**
 * @description Function to get the Filecoin address form.
 * @param ethAddress - The input string.
 * @param network - The network type.
 * @returns The response data.
 */
export const fetchAddressFilForm = async (ethAddress: string, network: NetworkType) => {
  const restAPI = await authenticatedREST()
  const myUrl = `${getBeryxUrl(network.chainSlug, network.name).tools}/convert/address/EthToFil/${ethAddress}`
  const res = await restAPI.get(myUrl)
  return res.data
}

/**
 * @description Function to get the Filecoin hash form.
 * @param ethHash - The input string.
 * @param network - The network type.
 * @returns The response data.
 */
export const fetchHashFilForm = async (ethHash: string, network: NetworkType) => {
  const restAPI = await authenticatedREST()
  const myUrl = `${getBeryxUrl(network.chainSlug, network.name).tools}/convert/hash/EthToFil/${ethHash}`
  const res = await restAPI.get(myUrl)
  return res.data
}

/**
 * @description Function to get the Ethereum address form.
 * @param filAddress - The input string.
 * @param network - The network type.
 * @returns The response data.
 */
export const fetchAddressEthForm = async (filAddress: string, network: NetworkType) => {
  const restAPI = await authenticatedREST()
  const myUrl = `${getBeryxUrl(network.chainSlug, network.name).tools}/convert/address/FilToEth/${filAddress}`
  const res = await restAPI.get(myUrl)
  return res.data
}

/**
 * @description Function to get the Ethereum hash form.
 * @param filHash - The input string.
 * @param network - The network type.
 * @returns The response data.
 */
export const fetchHashEthForm = async (filHash: string, network: NetworkType) => {
  const restAPI = await authenticatedREST()
  const myUrl = `${getBeryxUrl(network.chainSlug, network.name).tools}/convert/hash/FilToEth/${filHash}`
  const res = await restAPI.get(myUrl)
  return res.data
}

/**
 * Retrieves the Filecoin form of the input.
 * @param ethHashOrAddress - The input string.
 * @param network - The network type.
 * @returns The Filecoin form, undefined if both fail with error 400, or throws an error if any fails with errors different from 400.
 */
export const fetchFilForm = async (ethHashOrAddress: string, network: NetworkType): Promise<string | undefined> => {
  return await expectSingleValidResult([fetchHashFilForm(ethHashOrAddress, network), fetchAddressFilForm(ethHashOrAddress, network)])
}

/**
 * @description Function to get the Ethereum form.
 * @param filHashOrAddress - The input string.
 * @param network - The network type.
 * @returns The Ethereum form or 'error'.
 */
export const fetchEthForm = async (filHashOrAddress: string, network: NetworkType): Promise<string | undefined> => {
  return await expectSingleValidResult([fetchHashEthForm(filHashOrAddress, network), fetchAddressEthForm(filHashOrAddress, network)])
}

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

/**
 * @param input - The input string.
 * @description Function to get the transaction details.
 * @param network - The network type.
 * @returns The response data.
 */
export const fetchTransactionDetails = async (input: string, network: NetworkType) => {
  const restAPI = await authenticatedREST()
  const myUrl = `${getBeryxUrl(network.chainSlug, network.name).data}/transactions/id/${input}`
  const res = await restAPI.get(myUrl)
  return res.data
}

/**
 * @description Function to get the transaction parameters.
 * @param input - The input string.
 * @param network - The network type.
 * @returns The response data.
 */
export const fetchTransactionParams = async (input: string, network: NetworkType) => {
  const restAPI = await authenticatedREST()
  const myUrl = `${getBeryxUrl(network.chainSlug, network.name).backend}/transaction/decode/${input}`
  const res = await restAPI.get(myUrl)
  return res.data
}

/**
 * @description Function to get the tipset transactions.
 * @param height - The height string.
 * @param network - The network type.
 * @returns The response data.
 */
export const fetchTransactionsByHeight = async (
  height: number,
  network: NetworkType,
  queryParams?: { [key: string]: string | undefined }
) => {
  const restAPI = await authenticatedREST()
  const myUrl = `${getBeryxUrl(network.chainSlug, network.name).data}/transactions/height/${height}`
  const res = await restAPI.get(myUrl, { params: { limit: '100', ...queryParams } })
  return res.data
}

/**
 * @description Function to get the address transactions.
 * @param address - The input string.
 * @param network - The network type.
 * @param methodType
 * @returns The response data.
 */
export const fetchTransactionsByAddress = async (
  address: string,
  network: NetworkType,
  methodType: BeryxMethodType | undefined,
  queryParams?: { [key: string]: string | undefined }
) => {
  const restAPI = await authenticatedREST()
  const myUrl = `${getBeryxUrl(network.chainSlug, network.name).data}/transactions/address/${address}${methodType ? `/${methodType}` : ''}`
  const res = await restAPI.get(myUrl, { params: { limit: '100', ...queryParams } })
  return res.data
}

/**
 * @description Function to get the transactions.
 * @param txHash - The input string.
 * @param network - The network type.
 * @returns The response data.
 */
export const fetchTransactionsByHash = async (
  txHash: string,
  network: NetworkType,
  queryParams?: { [key: string]: string | undefined }
) => {
  const restAPI = await authenticatedREST()
  const myUrl = `${getBeryxUrl(network.chainSlug, network.name).data}/transactions/hash/${txHash}`
  const res = await restAPI.get(myUrl, { params: { limit: '100', ...queryParams } })
  return res.data
}

/**
 * @description Function to get the transactions.
 * @param hash - The input string.
 * @param network - The network type.
 * @returns The response data.
 */
export const fetchTransactionsByBlock = async (hash: string, network: NetworkType, queryParams?: { [key: string]: string | undefined }) => {
  const restAPI = await authenticatedREST()
  const myUrl = `${getBeryxUrl(network.chainSlug, network.name).data}/transactions/block-cid/${hash}`
  const res = await restAPI.get(myUrl, { params: { limit: '100', ...queryParams } })
  return res.data
}

/**
 * @description Function to get the transactions.
 * @param txHash - The input string.
 * @param network - The network type.
 * @returns The response data.
 */
export const fetchTransactions = async (
  txHash: string,
  txType: BeryxInputTypes,
  network: NetworkType,
  method?: 'receiver' | 'sender',
  queryParams?: { [key: string]: string | undefined }
) => {
  const restAPI = await authenticatedREST()
  const myUrl = `${getBeryxUrl(network.chainSlug, network.name).data}/transactions/${txType}/${txHash}${method ? `/${method}` : ''}`

  const res = await restAPI.get(myUrl, { params: { limit: '100', ...queryParams } })

  return res.data
}

/**
 * @description Function to get the address evm transactions.
 * @param address - The input string.
 * @param network - The network type.
 * @param methodType
 * @returns The response data.
 */
export const fetchEvmTransactionsByAddress = async (
  address: string,
  network: NetworkType,
  methodType: BeryxMethodType | undefined,
  queryParams?: { [key: string]: string | undefined }
) => {
  const restAPI = await authenticatedREST()
  const myUrl = `${getBeryxUrl(network.chainSlug, network.name).data}/transactions/evm/address/${address}${
    methodType ? `/${methodType}` : ''
  }`
  const res = await restAPI.get(myUrl, { params: { limit: '100', ...queryParams } })
  return res.data
}

/**
 * @description Function to get the tipset evm transactions.
 * @param height - The height string.
 * @param network - The network type.
 * @returns The response data.
 */
export const fetchEvmTransactionsByHeight = async (
  height: number,
  network: NetworkType,
  queryParams?: { [key: string]: string | undefined }
) => {
  const restAPI = await authenticatedREST()
  const myUrl = `${getBeryxUrl(network.chainSlug, network.name).data}/transactions/evm/height/${height}`
  const res = await restAPI.get(myUrl, { params: { limit: '100', ...queryParams } })
  return res.data
}

/**
 * @description Function to get the evm transactions by hash.
 * @param txHash - The input string.
 * @param network - The network type.
 * @returns The response data.
 */
export const fetchEvmTransactionsByHash = async (
  txHash: string,
  network: NetworkType,
  queryParams?: { [key: string]: string | undefined }
) => {
  const restAPI = await authenticatedREST()
  const myUrl = `${getBeryxUrl(network.chainSlug, network.name).data}/transactions/evm/hash/${txHash}`
  const res = await restAPI.get(myUrl, { params: { limit: '100', ...queryParams } })
  return res.data
}

/**
 * @description Function to get the evm transactions by block.
 * @param hash - The input string.
 * @param network - The network type.
 * @returns The response data.
 */
export const fetchEvmTransactionsByBlock = async (
  hash: string,
  network: NetworkType,
  queryParams?: { [key: string]: string | undefined }
) => {
  const restAPI = await authenticatedREST()
  const myUrl = `${getBeryxUrl(network.chainSlug, network.name).data}/transactions/evm/block-cid/${hash}`
  const res = await restAPI.get(myUrl, { params: { limit: '100', ...queryParams } })
  return res.data
}

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

/**
 * @description Function to get the account information.
 * @param address - The input string.
 * @param network - The network type.
 * @returns The response data.
 */
export const fetchAccountInfo = async (address: string, network: NetworkType) => {
  const restAPI = await authenticatedREST()
  const myUrl = `${getBeryxUrl(network.chainSlug, network.name).data}/account/info/${address}`
  const res = await restAPI.get(myUrl)
  return res.data
}

/**
 * @description Function to get the account balance.
 * @param input - The input string.
 * @param network - The network type.
 * @returns The response data.
 */
export const fetchAccountBalance = async (input: string, network: NetworkType) => {
  const restAPI = await authenticatedREST()
  const myUrl = `${getBeryxUrl(network.chainSlug, network.name).data}/account/balance/${input}`
  const res = await restAPI.get(myUrl)
  return res.data
}

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

/**
 * @description Function to get the tipset.
 * @param height - The input string.
 * @param network - The network type.
 * @returns The response data.
 */
export const fetchTipsetByHeight = async (height: number, network: NetworkType): Promise<Tipset> => {
  const restAPI = await authenticatedREST()
  const myUrl = `${getBeryxUrl(network.chainSlug, network.name).data}/tipset/height/${height}`
  const res = await restAPI.get(myUrl)

  return res.data[0]
}

/**
 * @description Function to get the tipset.
 * @param tipsetCid - The input hash.
 * @param network - The network type.
 * @returns The response data.
 */
export const fetchTipsetByHash = async (tipsetCid: string, network: NetworkType): Promise<Tipset> => {
  const restAPI = await authenticatedREST()
  const myUrl = `${getBeryxUrl(network.chainSlug, network.name).data}/tipset/hash/${tipsetCid}`
  const res = await restAPI.get(myUrl)
  // For now, we only use the first result
  return res.data[0]
}

/**
 * Gets a block.
 * @param blockCid - The height of the tipset to get.
 * @param network - The network to use for the request.
 * @returns A promise that resolves to the tipset, or 'error' if the request failed.
 */
export const fetchBlockByHash = async (blockCid: string, network: NetworkType) => {
  const restAPI = await authenticatedREST()
  const myUrl = `${network.url}/tipset/block-cid/${blockCid}`
  const res = await restAPI.get(myUrl)

  return res.data
}

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
/**
 * Fetches verification status for a address input and network.
 * @param address - The address
 * @param network - The network value.
 * @returns - A promise that resolves to the verification status
 */
export const fetchContractVerified = async (network: NetworkType, address: string): Promise<ContractVerifiedData | undefined> => {
  const restAPI = await authenticatedREST()
  const myUrl = `${getBeryxUrl(network.chainSlug, network.name).backend}/contract/verified/${address}`
  const res = await restAPI.get(myUrl)

  if (typeof res.data.verified == 'boolean') {
    if (!res.data.verified) {
      return undefined
    }

    if (res.data.verified) {
      throw new Error('Unexpected response. verified should be an object')
    }
  }

  return res.data.verified
}

/**
 * Fetches verification status for a given input and network.
 * @param network - The network value.
 * @returns - A promise that resolves to the verification status or 'error'.
 */
export const fetchContractCompilers = async (network: NetworkType): Promise<ContractCompilers> => {
  const restAPI = await authenticatedREST()
  const myUrl = `${getBeryxUrl(network.chainSlug, network.name).backend}/contract/verification/compilers`
  const res = await restAPI.get(myUrl)
  return res.data
}

/**
 * Fetches verification status for a given network.
 * @param network - The network value.
 * @returns - A promise that resolves to a list of verification data
 */
export const fetchContractsVerified = async (
  network: NetworkType,
  queryParams?: { [key: string]: string | undefined }
): Promise<ContractVerificationList> => {
  const restAPI = await authenticatedREST()
  const myUrl = `${getBeryxUrl(network.chainSlug, network.name).backend}/contracts/verified`
  const res = await restAPI.get(myUrl, { params: { limit: '100', ...queryParams } })
  return res.data as ContractVerificationList
}

/**
 * @description Function to get the contracts created.
 * @param network - The network type.
 * @param frequency - The frequency type.
 * @returns The response data.
 */
export const fetchContractsCreate = async (
  network: NetworkType,
  frequency: FrequencyType,
  params?: StatsParams
): Promise<{ results: ContractsProps[]; next_cursor: string }> => {
  const restAPI = await authenticatedREST()
  const myUrl = `${getBeryxUrl(network.chainSlug, network.name).stats}/contract/global/create/${frequency}`
  const res = await restAPI.get(myUrl, { params })
  return res.data
}

/**
 * @description Function to get the contracts created by address.
 * @param address - The address value.
 * @param network - The network type.
 * @param frequency - The frequency type.
 * @returns The response data.
 */
export const fetchContractsCreateByAddress = async (
  address: string,
  network: NetworkType,
  frequency: FrequencyType,
  params?: StatsParams
): Promise<{ results: ContractsProps[]; next_cursor: string }> => {
  const restAPI = await authenticatedREST()
  const myUrl = `${getBeryxUrl(network.chainSlug, network.name).stats}/contract/${address}/create/${frequency}`
  const res = await restAPI.get(myUrl, { params })
  return res.data
}

/**
 * @description Function to get the contracts invoked.
 * @param network - The network type.
 * @param frequency - The frequency type.
 * @returns The response data.
 */
export const fetchContractInvokes = async (
  network: NetworkType,
  frequency: FrequencyType,
  params?: StatsParams
): Promise<{ results: ContractsProps[]; next_cursor: string }> => {
  const restAPI = await authenticatedREST()
  const myUrl = `${getBeryxUrl(network.chainSlug, network.name).stats}/contract/global/invoke/${frequency}`
  const res = await restAPI.get(myUrl, { params })
  return res.data
}

/**
 * @description Function to get the contracts invoked by address.
 * @param address - The address value.
 * @param network - The network type.
 * @param frequency - The frequency type.
 * @returns The response data.
 */
export const fetchContractInvokeByAddress = async (
  address: string,
  network: NetworkType,
  frequency: FrequencyType,
  params?: StatsParams
): Promise<{ results: ContractsProps[]; next_cursor: string }> => {
  const restAPI = await authenticatedREST()
  const myUrl = `${getBeryxUrl(network.chainSlug, network.name).stats}/contract/${address}/invoke/${frequency}`
  const res = await restAPI.get(myUrl, { params })
  return res.data
}

/**
 * @description Function to get the unique contracts invoked by address.
 * @param address - The address value.
 * @param network - The network type.
 * @param frequency - The frequency type.
 * @returns The response data.
 */
export const fetchUniqueContractInvokeByAddress = async (
  address: string,
  network: NetworkType,
  frequency: FrequencyType,
  params?: StatsParams
): Promise<{ results: ContractsProps[]; next_cursor: string }> => {
  const restAPI = await authenticatedREST()
  const myUrl = `${getBeryxUrl(network.chainSlug, network.name).stats}/contract/${address}/invoke/unique/${frequency}`
  const res = await restAPI.get(myUrl, { params })
  return res.data
}

/**
 * Decodes the contract using the provided Ethereum address and network type.
 * @param ETHAddress
 * @param network
 */
export const fetchContractDecoded = async (ETHAddress: string, network: NetworkType): Promise<ContractInfo> => {
  const restAPI = await authenticatedREST()
  const myUrl = `${getBeryxUrl(network.chainSlug, network.name).backend}/contract/decode/${ETHAddress}`
  const res = await restAPI.get(myUrl)
  return res.data
}

/**
 * Submits contract verification data to the Beryx API.
 * @param network - The network type.
 * @param contractData - The contract verification requirements.
 * @returns - A promise that resolves to the contract verified data.
 */
export const postContractVerify = async (network: NetworkType, contractData: FormData): Promise<ContractVerifiedData> => {
  const restAPI = await authenticatedREST({ 'Content-Type': 'multipart/form-data' })
  const myUrl = `${getBeryxUrl(network.chainSlug, network.name).backend}/contract/verification`

  const res = await restAPI.post(myUrl, contractData)
  return res.data as ContractVerifiedData
}

/**
 * @description Function to get the global base fee.
 * @param network - The network type.
 * @param frequency - The frequency type.
 * @param params - Params to fetch.
 * @returns The response data.
 */
export const fetchGlobalBaseFee = async (
  network: NetworkType,
  frequency: FrequencyType,
  params?: StatsParams
): Promise<{ results: GlobalBaseFee[]; next_cursor: string }> => {
  const restAPI = await authenticatedREST()
  const myUrl = `${getBeryxUrl(network.chainSlug, network.name).stats}/fees/base/global/${frequency}`
  const res = await restAPI.get(myUrl, { params })
  return res.data
}

/**
 * @description Function to get fee estimation based on the specified method.
 * @param network - The network type.
 * @param method - The method type.
 * @returns The response data.
 */
export const fetchEstimateFees = async (network: NetworkType, method: string): Promise<BaseFeeEstimation> => {
  const restAPI = await authenticatedREST()
  const myUrl = `${getBeryxUrl(network.chainSlug, network.name).stats}/fees/estimate/${method}`
  const res = await restAPI.get(myUrl)
  return res.data
}

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

/**
 * @description Function to get the rich list.
 * @param network - The network type.
 * @returns The response data.
 */
export const fetchRichList = async (network: NetworkType) => {
  const restAPI = await authenticatedREST()
  const myUrl = `${getBeryxUrl(network.chainSlug, network.name).stats}/rich-list/100`
  const res = await restAPI.get(myUrl)
  return res.data
}

/**
 * @description Function to get the gas used.
 * @param network - The network type.
 * @param frequency - The frequency type.
 * @returns The response data.
 */
export const fetchGasUsed = async (
  network: NetworkType,
  frequency: FrequencyType,
  params?: StatsParams
): Promise<{ results: GasUsedProps[]; next_cursor: string }> => {
  const restAPI = await authenticatedREST()
  const myUrl = `${getBeryxUrl(network.chainSlug, network.name).stats}/gas-used/global/${frequency}`
  const res = await restAPI.get(myUrl, { params })
  return res.data
}

/**
 * Fetches the address value flow data from the Beryx API.
 *
 * @param address - The address to fetch the value flow data for.
 * @param network - The network type.
 * @returns - The address value flow data
 */
export const fetchAddressValueFlow = async (
  address: string,
  network: NetworkType
): Promise<{ results: ValueFlow[]; next_cursor: string }> => {
  const restAPI = await authenticatedREST()
  const myUrl = `${getBeryxUrl(network.chainSlug, network.name).stats}/value-flow/${address}/latest`
  const res = await restAPI.get(myUrl)
  return res.data
}

/**
 * @description Function to get the gas used.
 * @param network - The network type.
 * @param frequency - The frequency type.
 * @returns The response data.
 */
export const fetchGasUsedByAddress = async (
  address: string,
  network: NetworkType,
  frequency: FrequencyType,
  params?: StatsParams
): Promise<{ results: GasUsedProps[]; next_cursor: string }> => {
  const restAPI = await authenticatedREST()
  const myUrl = `${getBeryxUrl(network.chainSlug, network.name).stats}/gas-used/${address}/${frequency}`
  const res = await restAPI.get(myUrl, { params })
  return res.data
}

/**
 * @description Function to get the top contracts by unique users.
 * @param network - The network type.
 * @returns The response data.
 */
export const fetchTopContracts = async (network: NetworkType) => {
  const restAPI = await authenticatedREST()
  const myUrl = `${getBeryxUrl(network.chainSlug, network.name).stats}/leaderboard/contracts/top/unique-users`
  const res = await restAPI.get(myUrl, { params: { limit: '50' } })
  return res.data
}

/**
 * @description Function to get the top accounts by gas used.
 * @param network - The network type.
 * @returns The response data.
 */
export const fetchTopAccountsByGasUsed = async (network: NetworkType) => {
  const restAPI = await authenticatedREST()
  const myUrl = `${getBeryxUrl(network.chainSlug, network.name).stats}/leaderboard/accounts/top/gas-used`
  const res = await restAPI.get(myUrl, { params: { limit: '50' } })
  return res.data
}

/**
 * @description Function to get the top contracts by invokes.
 * @param network - The network type.
 * @returns The response data.
 */
export const fetchTopContractsByInvokes = async (network: NetworkType) => {
  const restAPI = await authenticatedREST()
  const myUrl = `${getBeryxUrl(network.chainSlug, network.name).stats}/contract/top/invokes`
  const res = await restAPI.get(myUrl)
  return res.data
}

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

/**
 * @description Function to check if an address is valid.
 * @param ethHashOrAddress - The input string.
 * @param network - The network type.
 * @returns True if the address is valid, false otherwise.
 */
export const fetchAddressValid = async (ethHashOrAddress: string, network: NetworkType) => {
  const result = await expectSingleValidResult([
    fetchHashFilForm(ethHashOrAddress, network),
    fetchAddressFilForm(ethHashOrAddress, network),
  ])
  return result !== undefined
}

/**
 * @description Returns detailed information about the identifier, including its type and, if applicable, subtype.
 * @param input - The input string.
 * @param network - The network type.
 * @returns the chain, network, type, sub_type and if it's indexed.
 */
export const fetchSearchType = async (input: string, network: NetworkType): Promise<SearchType[]> => {
  const restAPI = await authenticatedREST()
  const myUrl = `${getBeryxUrl(network.chainSlug, network.name).data}/search/full/${input}`
  const res = await restAPI.get(myUrl)
  return res.data.results
}

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

/**
 * @description Function to get base fee estimation based on the specified method.
 * @returns The response data.
 */
export const fetchConfig = async (network: NetworkType): Promise<ServiceConfig> => {
  const restAPI = await authenticatedREST()
  const myUrl = `${getBeryxUrl(network.chainSlug, network.name).data}/dynamic-config`
  const res = await restAPI.get(myUrl)
  return res.data
}
