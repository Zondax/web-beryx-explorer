/**
 * Represents a CurrencyRate.
 * @interface
 */
export interface CurrencyRate {
  currency: string
  date: string
  price: number
}

/**
 * Represents a Tipset.
 * @interface
 */
export interface Tipset {
  base_fee: number
  blocks_cid: string[]
  blocks_info: { BlockCid: string; Miner: string }[]
  canonical: boolean
  height: number
  id: string
  parent_tipset_cid: string
  tipset_cid: string
  tipset_timestamp: string
}
