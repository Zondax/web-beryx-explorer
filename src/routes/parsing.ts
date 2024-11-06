import { NetworkFindBySlug, NetworkType } from '@/config/networks'

/**
 * Type for input slug
 */
export type InputSlug = Array<string>

/**
 * Enum for object types
 */
export enum ObjectType {
  ADDRESS = 'address',
  CONTRACT = 'contract',
  ERC20 = 'erc20',
  TXS = 'txs',
  TIPSET = 'tipset',
  BLOCK = 'block-cid',
  EVENT = 'event',
  UNKNOWN = 'unknown',
}

/**
 * Enum for object types
 */
export const formattedObjectType: { [key in ObjectType]: string } = {
  address: 'address',
  contract: 'contract',
  erc20: 'ERC20 Token',
  txs: 'transaction',
  tipset: 'tipset',
  'block-cid': 'block',
  event: 'event',
  unknown: 'unknown',
}

/**
 * Mapping for object types
 */
const ObjectTypeMapping: { [key: string]: ObjectType } = {
  transactions: ObjectType.TXS,
  transaction: ObjectType.TXS,
  tx: ObjectType.TXS,
  txs: ObjectType.TXS,
  tipset: ObjectType.TIPSET,
  block: ObjectType.BLOCK,
  'block-cid': ObjectType.BLOCK,
  height: ObjectType.TIPSET,
  address: ObjectType.ADDRESS,
  account: ObjectType.ADDRESS,
  event: ObjectType.EVENT,
}

/**
 * Class for search path
 */
export class SearchPath {
  public network?: NetworkType
  public objectType?: ObjectType
  public arguments?: string
}

/**
 * Function to parse and validate input slugs
 * @param slug - The input slug to parse
 * @returns The parsed search path
 */
export const parseSearchUrl = (slug: InputSlug, chainSlug: string): SearchPath => {
  const parsedPath = new SearchPath()

  if (slug.length < 2 || slug.length > 3) {
    throw new Error('invalid slug')
  }

  // get chain+network
  const slugNetwork = `${chainSlug}/${slug[0]}`.toLowerCase()
  parsedPath.network = NetworkFindBySlug(slugNetwork)
  if (parsedPath.network === undefined) {
    throw new Error(`chain/network [${slugNetwork}] is not supported`)
  }

  // now obtain the object type
  const lowerSlug2 = slug[1].toLowerCase()
  if (ObjectTypeMapping[lowerSlug2] === undefined) {
    throw new Error(`object type [${slug[1]}] is not supported`)
  }
  parsedPath.objectType = ObjectTypeMapping[lowerSlug2]

  /////////////
  // Keep arguments in the original format
  parsedPath.arguments = slug[2]

  return parsedPath
}
