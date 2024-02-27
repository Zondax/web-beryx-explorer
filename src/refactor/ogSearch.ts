import BigNumber from 'bignumber.js'

import { fetchBeryxApiToken } from '@/api-client/apiTokens'
import { ContractVerifiedData } from '@/api-client/beryx.types'
import { amountFormat, chainDecimals, getBeryxUrl } from '@/config/config'
import { NetworkType, projectIcons } from '@/config/networks'
import { newDateFormat } from '@/utils/dates'
import { formatBalance } from '@/utils/format'
import { truncateMiddleOfString } from '@/utils/text'

/**
 * Fetches the verification status for a given address and network.
 * @param address - The address to verify.
 * @param network - The network to use for verification.
 * @returns - A promise that resolves to the verification status.
 */
export const fetchContractVerified = async (
  network: NetworkType,
  address: string,
  token: string
): Promise<ContractVerifiedData | undefined> => {
  const myUrl = `${getBeryxUrl(network.chainSlug, network.name).backend}/contract/verified/${address}`
  const res = await fetch(myUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const data = await res.json()

  if (typeof data.verified == 'boolean') {
    if (!data.verified) {
      return undefined
    }

    if (data.verified) {
      throw new Error('Unexpected response. verified should be an object')
    }
  }

  return data.verified
}

/**
 * Fetches account information for a given address and network.
 * @param address - The address to fetch information for.
 * @param network - The network to use for fetching information.
 * @returns - The response data containing account information.
 */
const fetchAccountInfo = async (address: string, network: NetworkType, authToken: string) => {
  const myUrl = `${getBeryxUrl(network.chainSlug, network.name).data}/account/info/${address}`
  const res = await fetch(myUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  })
  return res.json()
}

/**
 * Fetches account balance for a given address and network.
 * @param input - The address to fetch balance for.
 * @param network - The network to use for fetching balance.
 * @returns - The response data containing account balance.
 */
const fetchAccountBalance = async (input: string, network: NetworkType, authToken: string) => {
  const myUrl = `${getBeryxUrl(network.chainSlug, network.name).data}/account/balance/${input}`
  const res = await fetch(myUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  })
  return res.json()
}

/**
 * Fetches tipset by height for a given network.
 * @param height - The height of the tipset.
 * @param network - The network to use for fetching tipset.
 * @returns - The response data containing tipset information.
 */
const fetchTipsetByHeight = async (height: number, network: NetworkType, authToken: string) => {
  const myUrl = `${getBeryxUrl(network.chainSlug, network.name).data}/tipset/height/${height}`
  const res = await fetch(myUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  })
  const data = await res.json()

  return data[0]
}

/**
 * Fetches block by CID for a given network.
 * @param cid - The CID of the block.
 * @param network - The network to use for fetching block.
 * @returns - The response data containing block information.
 */
const fetchBlockByCID = async (cid: string, network: NetworkType, authToken: string) => {
  const myUrl = `${getBeryxUrl(network.chainSlug, network.name).data}/tipset/block-cid/${cid}`
  const res = await fetch(myUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  })
  const data = await res.json()
  return data
}

/**
 * Fetches transactions by hash for a given network.
 * @param txHash - The hash of the transaction.
 * @param network - The network to use for fetching transactions.
 * @param queryParams - The query parameters.
 * @returns - The response data containing transactions.
 */
const fetchTransactionsByHash = async (
  txHash: string,
  network: NetworkType,
  authToken: string,
  queryParams?: { [key: string]: string | undefined }
) => {
  const myUrl = `${getBeryxUrl(network.chainSlug, network.name).data}/transactions/hash/${txHash}`
  let url = myUrl
  let params: Record<string, string> = {}
  if (queryParams) {
    params = Object.fromEntries(Object.entries(queryParams).map(([key, value]) => [key, value || '']))
    const queryParamsString = new URLSearchParams(params).toString()
    url = `${url}?${queryParamsString}`
  }

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  })
  return res.json()
}

/**
 * Fetches transactions by CID for a given network.
 * @param cid - The CID of the transaction.
 * @param network - The network to use for fetching transactions.
 * @param queryParams - The query parameters.
 * @returns - The response data containing transactions.
 */
const fetchTransactionsByCID = async (
  cid: string,
  network: NetworkType,
  authToken: string,
  queryParams?: { [key: string]: string | undefined }
) => {
  const myUrl = `${getBeryxUrl(network.chainSlug, network.name).data}/transactions/block-cid/${cid}`
  let url = myUrl
  let params: Record<string, string> = {}
  if (queryParams) {
    params = Object.fromEntries(Object.entries(queryParams).map(([key, value]) => [key, value || '']))
    const queryParamsString = new URLSearchParams(params).toString()
    url = `${url}?${queryParamsString}`
  }

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  })
  return res.json()
}

/**
 * Fetches and formats account data for a given address and network.
 * @param inputValue - The address to fetch data for.
 * @param network - The network to use for fetching data.
 * @returns - A promise that resolves to the formatted account data.
 */
const getOgAddressData = async (inputValue: string, network: NetworkType, authToken: string) => {
  const accountInfoPromise = fetchAccountInfo(inputValue, network, authToken)
  const accountBalancePromise = fetchAccountBalance(inputValue, network, authToken)
  const [accountInfo, accountBalance] = await Promise.all([accountInfoPromise, accountBalancePromise])

  return [
    {
      label: 'Address',
      value: truncateMiddleOfString(inputValue, 16),
      valueType: 'address',
    },
    accountBalance?.balances && {
      label: 'Balance (FIL)',
      value: BigNumber(formatBalance(accountBalance?.balances)).toFormat(2, amountFormat),
      valueType: 'fil',
      icon: projectIcons[network.project] ? projectIcons[network.project]({ size: 32 }) : null,
    },
    accountInfo?.actor_type &&
      accountInfo?.actor_type !== 'evm' && {
        label: 'Actory Type',
        value: accountInfo?.actor_type,
        valueType: 'string',
      },
    accountInfo?.created_at && {
      label: 'Created at',
      value: newDateFormat(accountInfo?.created_at, 'UTC', true),
      valueType: 'string',
    },
    accountInfo?.creator_address && {
      label: 'Creator Address',
      value: truncateMiddleOfString(accountInfo?.creator_address, 16),
      valueType: 'string',
    },
  ].filter(Boolean)
}

/**
 * Fetches and formats tipset data for a given height and network.
 * @param height - The height of the tipset.
 * @param network - The network to use for fetching data.
 * @returns - A promise that resolves to the formatted tipset data.
 */
const getOgTipsetData = async (height: number, network: NetworkType, authToken: string) => {
  const tipsetInfo = await fetchTipsetByHeight(height, network, authToken)

  return [
    {
      label: 'Tipset Height',
      value: truncateMiddleOfString(height.toString(), 16),
      valueType: 'address',
    },
    tipsetInfo?.timestamp && {
      label: 'Timestamp',
      value: newDateFormat(tipsetInfo?.timestamp, 'UTC', true),
      valueType: 'string',
    },
    tipsetInfo?.total_txs && {
      label: 'Transaction count',
      value: tipsetInfo.total_txs,
      valueType: 'string',
    },
  ].filter(Boolean)
}

/**
 * Fetches and formats block data for a given CID and network.
 * @param cid - The CID of the block.
 * @param network - The network to use for fetching data.
 * @returns - A promise that resolves to the formatted block data.
 */
const getOgBlockData = async (cid: string, network: NetworkType, authToken: string) => {
  const tipsetInfo = await fetchBlockByCID(cid, network, authToken)
  const transactions = await fetchTransactionsByCID(cid, network, authToken)

  return [
    {
      label: 'Block ID',
      value: truncateMiddleOfString(cid, 16),
      valueType: 'address',
    },
    tipsetInfo?.timestamp && {
      label: 'Timestamp',
      value: newDateFormat(tipsetInfo?.timestamp, 'UTC', true),
      valueType: 'string',
    },
    tipsetInfo?.blocks_info && {
      label: 'Miner',
      value: tipsetInfo.blocks_info?.find((block: { BlockCid: string; Miner: string }) => block.BlockCid === cid)?.Miner,
      valueType: 'string',
    },
    transactions?.total_txs && {
      label: 'Transaction count',
      value: transactions.transactions.filter((tx: { level: number; tx_type: string }) => tx.tx_type !== 'Fee' && tx.level === 0).length,
      valueType: 'number',
    },
  ].filter(Boolean)
}

/**
 * Fetches and formats transaction data for a given hash and network.
 * @param txHash - The hash of the transaction.
 * @param network - The network to use for fetching data.
 * @returns - A promise that resolves to the formatted transaction data.
 */
const getOgTransactionData = async (txHash: string, network: NetworkType, authToken: string) => {
  const transactions = await fetchTransactionsByHash(txHash, network, authToken)
  const tx = transactions.transactions.find(
    (element: { tx_type: string; level: number }) => element.tx_type !== 'Fee' && element.level === 0
  )

  return [
    {
      label: 'Transaction Hash',
      value: truncateMiddleOfString(txHash, 16),
      valueType: 'address',
    },
    tx?.tx_timestamp && {
      label: 'Timestamp',
      value: newDateFormat(tx?.tx_timestamp, 'UTC', true),
      valueType: 'string',
    },
    tx?.amount !== undefined && {
      label: 'Value (FIL)',
      value: BigNumber(tx?.amount)
        .div(Math.pow(10, chainDecimals.filecoin))
        .toFormat(2, amountFormat),
      valueType: 'fil',
      icon: projectIcons[network.project] ? projectIcons[network.project]({ size: 32 }) : null,
    },
    tx?.tx_type && {
      label: 'Method',
      value: tx?.tx_type,
      valueType: 'string',
    },
  ].filter(Boolean)
}

/**
 * Fetches and formats data based on input type (address, tipset, or transactions) for a given input and network.
 * @param inputValue - The input value.
 * @param network - The network to use for fetching data.
 * @param inputType - The type of input (address, tipset, or transactions).
 * @returns - A promise that resolves to the formatted data or 'error'.
 */
export const getOgImageData = async (inputValue: string, network: NetworkType, inputType: string) => {
  const authToken = await fetchBeryxApiToken()

  try {
    switch (inputType) {
      case 'address': {
        return await getOgAddressData(inputValue, network, authToken)
      }
      case 'tipset': {
        const height = parseInt(inputValue)
        if (isNaN(height)) {
          throw new Error('Invalid height')
        }
        return await getOgTipsetData(height, network, authToken)
      }
      case 'block-cid': {
        return await getOgBlockData(inputValue, network, authToken)
      }
      case 'tx':
      case 'txs':
      case 'transaction':
      case 'transactions': {
        return await getOgTransactionData(inputValue, network, authToken)
      }
      default:
        return 'error'
    }
  } catch {
    return 'error'
  }
}
