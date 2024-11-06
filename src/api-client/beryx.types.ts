import { networksName } from '@/config/networks'

/**
 * Represents a unique identifier for a query cursor.
 * @type {string}
 */
export type QueryCursor = string & { readonly __brand: unique symbol }

/**
 * Represents a unique identifier for a compiler version.
 * @type {string}
 */
export type CompilerVersion = string & { readonly __brand: unique symbol }

/**
 * Represents a Tipset.
 * @interface
 */
export interface Tipset {
  base_fee: number
  blocks_cid: string[]
  blocks_info: {
    BlockCid: string
    Miner: string
  }[]
  canonical: boolean
  create_timestamp: string
  height: number
  id: string
  parent_tipset_cid: string
  timestamp: string
  tipset_cid: string
  total_txs: number
}

/**
 * Represents the verification data for a contract.
 * @interface
 */
export interface ContractVerifiedData {
  constructorParams: Record<string, string[]>
  contractAddress: string
  contractName: string
  datetime: number
  licenses: string[]
  optimizerRuns: number
  solc: string[]
  sourceCID: string
  verificationType: string
  verifiers: string[]
}

/**
 * Represents the available compilers for a contract.
 * @interface
 */
export interface ContractCompilers {
  available_compilers: CompilerVersion[]
}

/**
 * Represents the requirements for contract verification.
 * @interface
 */
export interface ContractVerificationRequirements {
  file: File | undefined
  hasMetadataFile: boolean
  entrypoint?: string
  compilerVersion: string
  licenses: string[]
  address: string
  optimize?: boolean
  numberOfRuns?: number
  checkTerms: boolean
  cloudflare: string
  contractName?: string
}

/**
 * Represents a list of contract verifications.
 * @interface
 */
export interface ContractVerificationList {
  next_cursor: QueryCursor
  data: ContractVerifiedData[]
}

/**
 * Represents a rich list.
 * @interface
 */
export interface RichList {
  last_seen_height: number
  balance: string
  ratio: number
  actor_type: string
  first_seen: string
  last_seen: string
  unified_account: string
}

/**
 * GasUsedProps
 * @property bucket - The bucket property.
 * @property gas_used - The gas used property.
 */
export interface GasUsedProps {
  bucket: string
  gas_used: string
}

/**
 * ContractsProps
 * @property bucket - The bucket property.
 * @property count - The count property.
 */
export interface ContractsProps {
  bucket: string
  count: number
}

/**
 * GlobalBaseFee
 * @property base_fee_avg - The base fee average.
 * @property base_fee_max - The base fee max.
 * @property base_fee_min - The base fee min.
 * @property bucket - The date.
 */
export interface GlobalBaseFee {
  base_fee_avg: number
  base_fee_max: number
  base_fee_min: number
  bucket: string
}

/**
 * GasProbabilities
 * @property probability - The probability.
 * @property gas_limit - The gas limit.
 * @property gas_premium - The gas premiun.
 */
export interface GasProbabilities {
  probability: number
  gas_limit: number
  gas_premium: number
}

/**
 * GasProbabilities
 * @property probability - The probability.
 * @property gas_limit - The gas limit.
 * @property gas_premium - The gas premiun.
 */
export interface BaseFeeEstimation {
  gas_probabilities: GasProbabilities[]
  date_time: string
}

/**
 * SearchTypeProps
 * @property chain - The chain property.
 * @property network - The network property.
 * @property type - The coutypent property.
 * @property sub_type - The sub_type property.
 * @property indexed - A boolean property.
 */
export interface SearchType {
  chain: 'fil'
  network: (typeof networksName)[number]
  type: 'cid' | 'height' | 'address' | 'eth_address' | 'eth_hash'
  sub_type?: 'tx_cid' | 'tipset_cid' | 'block_cid' | 'eth_event_hash' | 'eth_tx_hash'
  indexed: boolean
}

/**
 * Represents a snapshot of value flow at a specific height.
 *
 * @interface ValueFlow
 * @property height - The height at which the snapshot was taken.
 * @property value - The value associated with the snapshot.
 */
export interface ValueFlow {
  height: number
  value: string
}

/**
 * Represents optional parameters for querying statistical data.
 *
 * @interface StatsParams
 * @property sort_by - The field by which the results should be sorted (optional).
 * @property limit - The maximum number of results to retrieve (optional).
 * @property cursor - A cursor related to the pagination (optional).
 */
export interface StatsParams {
  sort_by?: string
  limit?: number
  cursor?: string
}

/*
 * AccountsByGasUsed
 * @property tx_from - The tx_from property.
 * @property gas_used - The gas used property.
 */
export interface AccountsByGasUsed {
  tx_from: string
  gas_used: number
}

/**
 * ContractsByUniqueUsers
 * @property tx_to - The tx_to property.
 * @property count - The count property.
 */
export interface ContractsByUniqueUsers {
  tx_to: string
  count: number
}

/**
 * ServiceConfig
 * @property gas - The gas config.
 */
export interface ServiceConfig {
  fees: { estimate: { allowed_methods: { method_name: string }[] } }
}

/**
 * Represents information about a smart contract, including bytecode, instructions, ABI, and verification details.
 */
export interface ContractInfo {
  bytecode: string
  instructions: string[]
  selectors: Record<string, string>
  abi: AbiItem[]
  ERC: any[]
  verified: {
    datetime: number
    solc: string[]
    licenses: string[]
    verifiers: string[]
    verificationType: string
    sourceCID: string
    constructorParams: Record<string, any>
    optimizerRuns: number
    contractName: string
    contractAddress: string
  }
}

/**
 * Represents an item in the ABI (Application Binary Interface) of a smart contract function.
 */
export interface AbiItem {
  inputs: InputProps[]
  anonymous?: boolean
  name: string
  outputs?: InputProps[]
  stateMutability: string
  type: string
}

/**
 * Represents a parameter or return value in the ABI of a smart contract function.
 */
export interface InputProps {
  components?: InputProps[]
  internalType: string
  name: string
  type: string
}

/**
 * Represents the value exchanged by transactions in a tipset (block).
 */
export interface ValueExchangedByTipset {
  inbound: string
  outbound: string
  height: number
}

/**
 * Represents the direction of a value exchange transaction.
 * - 'inbound': Indicates transactions where value is received.
 * - 'outbound': Indicates transactions where value is sent.
 * - 'all': Indicates all transactions, regardless of direction.
 */
export type ValueExchangeDirection = 'inbound' | 'outbound' | 'all'

/**
 * Represents the type of actor involved in a value exchange transaction.
 * - 'evm': Indicates transactions involving an Ethereum Virtual Machine (EVM) actor.
 * - 'all': Indicates all types of actors, regardless of type.
 */
export type ValueExchangeActorType = 'evm' | 'all'

/**
 * Represents the top value exchanged.
 */
export interface TopValueExchanged {
  height: number
  unified_account: string
  actor_type?: string
  inbound?: number
  outbound?: number
  exchanged?: number
}

/**
 * Represents the events .
 */
export interface Events {
  height: number
  tipset_cid: string
  id: string
  tx_cid: string
  log_index: number
  emitter: string
  type: string
  selector_id: string
  selector_sig: string
  reverted: boolean
  canonical: boolean
  search_id: string
}

/**
 * Represents the evm event details.
 */
export interface EvmEventDetails {
  data: string
  topics: string[]
}

/**
 * Represents the evm event details.
 */
export interface NativeEventDetails {
  [key: string]: {
    flags: number
    key: string
    value: string
  }
}

/**
 * Represents the event details.
 */
export interface EventDetails extends Events {
  metadata: EvmEventDetails | NativeEventDetails
}

/**
 * Represents the proposal.
 */
export interface Proposal {
  multisig_address: string
  proposal_id: number
  height: number
  tx_cid: string
  signer: string
  action_type: string
  value: { [key: string]: string }
  create_timestamp: string
  id: string
  tx_type_to_executed: string
}

/**
 * Represents the LockedBalance.
 */
export interface LockedBalance {
  amount: string
  lock_epoch: number
  unlock_epoch: number
}

/**
 * Represents the MultisigState.
 */
export interface MultisigState {
  signers: string[]
  num_approvals_threshold: number
  locked_balance: LockedBalance
  last_tipset_processed: number
}

/**
 * Represents the MultisigAddressInfo.
 */
export interface MultisigAddressInfo {
  signers: string
  locked_balance: LockedBalance
  last_tipset_processed: number
  id: string
  multisig_address: string
  tx_cid: string
  action_type: string
  height: number
  create_timestamp: string
  value: { [key: string]: string }
}

/**
 * Represents the ERC20 tokens.
 * @interface
 */
export interface TokenInfo {
  ticker: string
  contract_address: string
  description: string
  decimals: number
  total_supply: number
  creation_date: string
  holders_count: number
}

/**
 * Represents the balance of an account for a token.
 * @interface
 */
export interface TokenHolding {
  balance: string
  ticker: string
  contract_address: string
  height: number
  decimals: number
  description: string
}
