import FilecoinIcon from 'components/common/Icons/Filecoin'

import { getBeryxUrl } from './config'

export type NetworkUniqueId = string & { readonly __brand: unique symbol }

export type NetworkMetamaskId = string & { readonly __brand: unique symbol }

export type Currency = {
  symbol: string
  decimals: number
}

export interface NetworkIconProps {
  size: number
  color1?: string
  color2?: string
}

export interface NetworkType {
  uniqueId: NetworkUniqueId
  metamaskId: NetworkMetamaskId
  show: boolean
  project: string
  name: string
  isTestnet: boolean
  url: string
  slug: string | undefined
  chainSlug: string
  natSlug: string | undefined
  currency: Currency
  denomPrefix?: string
  rpcNode?: string
  chainId: number
}

/**
 * Array of chain properties
 * Referenced from https://chainlist.org/ and https://medium.com/@mwhc00/list-of-chain-ids-for-metamask-1b24cd7813af
 */
// https://chainlist.org/
// https://medium.com/@mwhc00/list-of-chain-ids-for-metamask-1b24cd7813af
export const Networks: { [key: string]: NetworkType } = {
  mainnet: {
    uniqueId: 'fil/mainnnet' as NetworkUniqueId,
    metamaskId: '0x13a' as NetworkMetamaskId,
    show: true,
    slug: 'fil/mainnet',
    natSlug: 'fil.mainnet',
    project: 'filecoin',
    chainSlug: 'fil',
    name: 'mainnet',
    isTestnet: false,
    url: `${getBeryxUrl('fil', 'mainnet').data}`,
    currency: {
      symbol: 'FIL',
      decimals: 18,
    },
    denomPrefix: 'f',
    rpcNode: 'https://api.zondax.ch/fil/node/mainnet/rpc/v1',
    chainId: 314,
  },
  calibration: {
    uniqueId: 'fil/calibration' as NetworkUniqueId,
    metamaskId: '0x4cb2f' as NetworkMetamaskId,
    show: true,
    slug: 'fil/calibration',
    natSlug: 'fil.calibration',
    project: 'filecoin',
    chainSlug: 'fil',
    name: 'calibration',
    isTestnet: true,
    url: `${getBeryxUrl('fil', 'calibration').data}`,
    currency: {
      symbol: 'tFIL',
      decimals: 18,
    },
    denomPrefix: 'f',
    rpcNode: 'https://api.zondax.ch/fil/node/calibration/rpc/v1',
    chainId: 314159,
  },
  ethereum: {
    uniqueId: 'eth/mainnet' as NetworkUniqueId,
    metamaskId: '0x1' as NetworkMetamaskId,
    show: false,
    slug: undefined,
    natSlug: undefined,
    project: 'ethereum',
    chainSlug: 'eth',
    name: 'mainnet',
    isTestnet: false,
    url: '',
    currency: {
      symbol: 'ETH',
      decimals: 18,
    },
    chainId: 1,
  },
}

export const networksName = Object.keys(Networks)

export const projectIcons: { [key: string]: (props: NetworkIconProps) => React.ReactElement } = {
  filecoin: FilecoinIcon,
}

/**
 * Function to find a network by its uniqueId.
 * @param uniqueId The network unique id
 * @returns The network with the given networkName, or undefined if no such network exists.
 */
export const getNetworkByUniqueId = (uniqueId: NetworkUniqueId): NetworkType | undefined => {
  const network = Object.entries(Networks).find(([_key, value]) => uniqueId === value.uniqueId)

  return network ? Networks[network[0]] : undefined
}

/**
 * Function to find a network by its networkName.
 * @param networkProject
 * @param networkName - The networkName of the network.
 * @returns The network with the given networkName, or undefined if no such network exists.
 */
export function networkFindByChainSlugAndName(networkChainSlug?: string, networkName?: string) {
  return Object.values(Networks).find(n => n.chainSlug === networkChainSlug && n.name === networkName)
}

/**
 * Function to find a network by its networkName.
 * @param networkName - The networkName of the network.
 * @returns The network with the given networkName, or undefined if no such network exists.
 */
export function NetworkFindByName(networkName: string) {
  return Object.values(Networks).find(n => n.name === networkName)
}

/**
 * Function to find a network by its slug.
 * @param slug - The slug of the network.
 * @returns The network with the given slug, or undefined if no such network exists.
 */
export function NetworkFindBySlug(slug: string) {
  return Object.values(Networks).find(n => n.slug === slug)
}

/**
 * Function to find a network by its unique ID.
 * @param uniqueId - The chain ID of the network.
 * @returns The network with the given unique ID, or undefined if no such network exists.
 */
export function NetworkFindByUniqueId(uniqueId: NetworkUniqueId) {
  return Object.values(Networks).find(n => n.uniqueId === uniqueId)
}

/**
 * Function to find a network by its metamask ID.
 * @param metamaskId - The metamask ID of the network.
 * @returns The network with the given metamask ID, or undefined if no such network exists.
 */
export function NetworkFindMetamaskId(metamaskId: NetworkMetamaskId) {
  return Object.values(Networks).find(n => n.metamaskId === metamaskId)
}
