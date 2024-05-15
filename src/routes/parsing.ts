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
  TXS = 'txs',
  TIPSET = 'tipset',
  BLOCK = 'block-cid',
  UNKNOWN = 'unknown',
}

/**
 * Enum for object types
 */
export const formattedObjectType: { [key in ObjectType]: string } = {
  address: 'address',
  contract: 'contract',
  txs: 'transaction',
  tipset: 'tipset',
  'block-cid': 'block',
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
export const parseSearchUrl = (slug: InputSlug): SearchPath => {
  const parsedPath = new SearchPath()

  if (slug.length < 2 || slug.length > 4) {
    throw new Error('invalid slug')
  }

  // get chain+network
  const slugNetwork = `${slug[0]}/${slug[1]}`.toLowerCase()
  parsedPath.network = NetworkFindBySlug(slugNetwork)
  if (parsedPath.network === undefined) {
    throw new Error(`chain/network [${slugNetwork}] is not supported`)
  }

  // now obtain the object type
  const lowerSlug2 = slug[2].toLowerCase()
  if (ObjectTypeMapping[lowerSlug2] === undefined) {
    throw new Error(`object type [${slug[2]}] is not supported`)
  }
  parsedPath.objectType = ObjectTypeMapping[lowerSlug2]

  /////////////
  // Keep arguments in the original format
  parsedPath.arguments = slug[3]

  return parsedPath
}
