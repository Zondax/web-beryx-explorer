import columnDefinitions from '@/components/muigrid/columnsDefs'
import { ObjectType } from '@/routes/parsing'
import {
  Calendar,
  Cube,
  DataCategorical,
  DoubleInteger,
  EventsAlt,
  GasStationFilled,
  Hashtag,
  IbmCloudVpcEndpoints,
  Identification,
  InProgressWarning,
  IncreaseLevel,
  License,
  Login,
  Logout,
  Policy,
  TransformBinary,
  Trophy,
  WatsonHealth3DSoftware,
} from '@carbon/icons-react'

import FilecoinIcon from 'components/common/Icons/Filecoin'

const {
  treeColumn,
  actorTypeColumn,
  amountColumn,
  beryxLinkColumn,
  booleanColumn,
  boxColumn,
  codeViewColumn,
  compilerColumn,
  downloadColumn,
  downloadIpfs,
  licenseColumn,
  mempoolTransactionStatusColumn,
  methodTypeColumn,
  minerColumn,
  numberColumn,
  optimizationColumn,
  percentageRange,
  rankColumn,
  stringColumn,
  timeColumn,
  timeSinceColumn,
  transactionDetailsColumn,
  transactionStatusColumn,
  transactionTypeColumn,
} = columnDefinitions

/**
 * Enum for table types
 * @enum {string}
 */
export enum TABLE_TYPE {
  /** Latest tipsets table type */
  LATEST_TIPSETS = 'latest_tipsets',
  /** Tipsets table type */
  TIPSETS = 'tipsets',
  /** Transactions table type */
  TRANSACTIONS = 'transactions',
  /** Transactions table type */
  BLOCK_TOP_TRANSACTIONS = 'block_top_transactions',
  /** Internal transactions table type */
  INTERNAL_TRANSACTIONS = 'internal_transactions',
  /** Tipset transactions table type */
  TIPSET_TRANSACTIONS = 'tipset_transactions',
  /** Block transactions table type */
  BLOCK_TRANSACTIONS = 'block_transactions',
  /** Tipset miners table type */
  TIPSET_MINERS = 'tipset_miners',
  /** Mempool table type */
  MEMPOOL = 'mempool',
  /** Contracts table type */
  CONTRACTS = 'contracts',
  /** Verified contracts table type */
  VERIFIED_CONTRACTS = 'verified_contracts',
  /** Recent activity transactions table type */
  RECENT_ACTIVITY_TRANSACTIONS = 'recent_activity_transactions',
  /** Transactions logs table type */
  TRANSACTIONS_LOGS = 'transactions_logs',
  /** Leaderboard table type */
  LEADERBOARD = 'leaderboard',
  /** Latest transactions table type */
  LATEST_TRANSACTIONS = 'latest_transactions',
  /** Dashboard top accounts by gas table type */
  DASHBOARD_TOP_ACCOUNTS_BY_GAS = 'dashboard_top_accounts_by_gas',
  /** Dashboard top addresses count table type */
  DASHBOARD_TOP_ADDRESSES_COUNT = 'dashboard_top_addresses_count',
  /** Dashboard top addresses count by contract table type */
  DASHBOARD_TOP_ADDRESSES_COUNT_BY_CONTRACT = 'dashboard_top_addresses_count_by_contract',
  /** Dashboard top invoked count table type */
  DASHBOARD_TOP_INVOKED_COUNT = 'dashboard_top_invoked_count',
  /** Contracts creates table type */
  CONTRACTS_CREATES = 'contracts_creates',
  /** Contracts invokes table type */
  CONTRACTS_INVOKES = 'contracts_invokes',
  /** Contracts invokes home table type */
  CONTRACTS_INVOKES_HOME = 'contracts_invokes_home',
  /** Gas used table type */
  GAS_USED = 'gas_used',
  /** Rich list table type */
  RICH_LIST = 'rich_list',
  /** Top accounts by gas used */
  TOP_ACCOUNTS_BY_GAS_USED = 'top_accounts_by_gas_used',
  /** Top contracts by unique users */
  TOP_CONTRACTS_BY_UNIQUE_USERS = 'top_contracts_by_unique_users',
  /** Top contracts by invokes */
  TOP_CONTRACTS_BY_INVOKES = 'top_contracts_by_invokes',
}

/**
 * columnDefsNormalInterface
 */
export const columnDefsNormal = {
  latest_tipsets: [
    timeSinceColumn({ field: 'tipset_timestamp', label: 'When', headerIcon: <Calendar /> }),
    beryxLinkColumn({ field: 'height', label: 'Height', inputType: ObjectType.TIPSET, minWidth: 100, headerIcon: <Cube /> }),
    minerColumn({ field: 'miners', label: 'Miners', headerIcon: <EventsAlt /> }),
  ],
  tipsets: [
    beryxLinkColumn({
      field: 'height',
      label: 'Height',
      inputType: ObjectType.TIPSET,
      minWidth: 100,
      headerIcon: <Cube />,
      sortable: true,
    }),
    booleanColumn({ field: 'canonical', label: 'Canonical', headerIcon: <InProgressWarning />, sortable: true }),
    timeColumn({ field: 'tipset_timestamp', label: 'Timestamp', headerIcon: <Calendar />, sortable: true }),
    boxColumn({
      field: 'blocks_info-1',
      label: 'Block IDs',
      subfield: 'BlockCid',
      inputType: ObjectType.BLOCK,
      padding: '0.2rem 0',
      headerIcon: <DoubleInteger />,
      sortable: false,
    }),
    boxColumn({
      field: 'blocks_info-2',
      label: 'Miners',
      subfield: 'Miner',
      inputType: ObjectType.ADDRESS,
      disableLink: false,
      padding: '0.2rem 0',
      headerIcon: <WatsonHealth3DSoftware />,
      sortable: false,
    }),
    minerColumn({ field: 'blocks_info', label: 'Miners Count', minWidth: 120, maxWidth: 120, headerIcon: <EventsAlt />, sortable: false }),
    codeViewColumn(),
    downloadColumn({ fileName: 'tipset' }),
  ],
  tipset_transactions: [
    transactionStatusColumn({ field: 'status', label: 'Status' }),
    beryxLinkColumn({
      field: 'tx_cid',
      label: 'Hash',
      inputType: ObjectType.TXS,
      headerIcon: <DoubleInteger />,
      indent: true,
    }),
    beryxLinkColumn({ field: 'tx_from', label: 'From', inputType: ObjectType.ADDRESS, headerIcon: <Logout />, sortable: true }),
    beryxLinkColumn({ field: 'tx_to', label: 'To', inputType: ObjectType.ADDRESS, headerIcon: <Login />, sortable: true }),
    methodTypeColumn({ field: 'tx_type', label: 'Method', headerIcon: <DataCategorical />, sortable: true }),
    beryxLinkColumn({
      field: 'block_cid',
      label: 'Block CID',
      inputType: ObjectType.BLOCK,
      disableLink: false,
      headerIcon: <DoubleInteger />,
    }),
    amountColumn({
      field: 'amount',
      label: 'Amount (FIL)',
      headerIcon: <FilecoinIcon size={15} color1="#e2ebfe49" color2="#000" />,
      sortable: true,
    }),
    numberColumn({
      field: 'gas_used',
      label: 'Gas Used (attoFIL)',
      minWidth: 150,
      headerIcon: <GasStationFilled />,
      sortable: true,
      decimals: 0,
    }),
    transactionDetailsColumn(),
    downloadColumn({ fileName: 'tipset_transactions' }),
  ],
  block_transactions: [
    transactionStatusColumn({ field: 'status', label: 'Status' }),
    beryxLinkColumn({
      field: 'tx_cid',
      label: 'Hash',
      inputType: ObjectType.TXS,
      headerIcon: <DoubleInteger />,
      indent: true,
    }),
    beryxLinkColumn({ field: 'tx_from', label: 'From', inputType: ObjectType.ADDRESS, headerIcon: <Logout />, sortable: true }),
    beryxLinkColumn({ field: 'tx_to', label: 'To', inputType: ObjectType.ADDRESS, headerIcon: <Login />, sortable: true }),
    methodTypeColumn({ field: 'tx_type', label: 'Method', headerIcon: <DataCategorical />, sortable: true }),
    amountColumn({
      field: 'amount',
      label: 'Amount (FIL)',
      headerIcon: <FilecoinIcon size={15} color1="#e2ebfe49" color2="#000" />,
      sortable: true,
    }),
    numberColumn({
      field: 'gas_used',
      label: 'Gas Used (attoFIL)',
      minWidth: 150,
      headerIcon: <GasStationFilled />,
      sortable: true,
      decimals: 0,
    }),
    transactionDetailsColumn(),
    downloadColumn({ fileName: 'tipset_transactions' }),
  ],
  block_top_transactions: [
    transactionStatusColumn({ field: 'status', label: 'Status' }),
    beryxLinkColumn({
      field: 'tx_cid',
      label: 'Hash',
      inputType: ObjectType.TXS,
      headerIcon: <DoubleInteger />,
      indent: true,
    }),
    beryxLinkColumn({ field: 'tx_from', label: 'From', inputType: ObjectType.ADDRESS, headerIcon: <Logout />, sortable: false }),
    beryxLinkColumn({ field: 'tx_to', label: 'To', inputType: ObjectType.ADDRESS, headerIcon: <Login />, sortable: false }),
    methodTypeColumn({ field: 'tx_type', label: 'Method', headerIcon: <DataCategorical />, sortable: false }),
    amountColumn({
      field: 'amount',
      label: 'Amount (FIL)',
      headerIcon: <FilecoinIcon size={15} color1="#e2ebfe49" color2="#000" />,
      sortable: false,
    }),
    numberColumn({
      field: 'gas_used',
      label: 'Gas Used (attoFIL)',
      minWidth: 150,
      headerIcon: <GasStationFilled />,
      sortable: false,
      decimals: 0,
    }),
    transactionDetailsColumn(),
    downloadColumn({ fileName: 'tipset_transactions' }),
  ],
  tipset_miners: [
    beryxLinkColumn({
      field: 'BlockCid',
      label: 'Block CID',
      disableLink: false,
      inputType: ObjectType.BLOCK,
      headerIcon: <DoubleInteger />,
    }),
    beryxLinkColumn({ field: 'Miner', label: 'Miner', inputType: ObjectType.ADDRESS, headerIcon: <WatsonHealth3DSoftware /> }),
    codeViewColumn(),
    downloadColumn({ fileName: 'tipset_transactions' }),
  ],
  internal_transactions: [
    transactionStatusColumn({ field: 'status', label: 'Status' }),
    beryxLinkColumn({
      field: 'tx_cid',
      label: 'Hash',
      inputType: ObjectType.TXS,
      headerIcon: <DoubleInteger />,
      indent: true,
    }),
    timeColumn({ field: 'tx_timestamp', label: 'Timestamp', isUTC: true, headerIcon: <Calendar />, sortable: true }),
    beryxLinkColumn({
      field: 'height',
      label: 'Height',
      inputType: ObjectType.TIPSET,
      minWidth: 100,
      headerIcon: <Cube />,
      sortable: true,
    }),
    beryxLinkColumn({ field: 'tx_from', label: 'From', inputType: ObjectType.ADDRESS, headerIcon: <Logout />, sortable: true }),
    beryxLinkColumn({ field: 'tx_to', label: 'To', inputType: ObjectType.ADDRESS, headerIcon: <Login />, sortable: true }),
    methodTypeColumn({ field: 'tx_type', label: 'Method', headerIcon: <DataCategorical />, sortable: true }),
    amountColumn({
      field: 'amount',
      label: 'Amount (FIL)',
      headerIcon: <FilecoinIcon size={15} color1="#e2ebfe49" color2="#000" />,
      sortable: true,
    }),
    transactionDetailsColumn(),
    downloadColumn({ fileName: 'transaction' }),
  ],
  transactions: [
    transactionTypeColumn({ field: 'type', label: 'Type' }),
    beryxLinkColumn({
      field: 'tx_cid',
      label: 'Hash',
      inputType: ObjectType.TXS,
      headerIcon: <DoubleInteger />,
      indent: true,
      sortable: true,
    }),
    timeColumn({ field: 'tx_timestamp', label: 'Timestamp', isUTC: true, headerIcon: <Calendar />, sortable: true }),
    beryxLinkColumn({
      field: 'height',
      label: 'Height',
      inputType: ObjectType.TIPSET,
      minWidth: 100,
      headerIcon: <Cube />,
      sortable: true,
    }),
    beryxLinkColumn({ field: 'tx_from', label: 'From', inputType: ObjectType.ADDRESS, headerIcon: <Logout />, sortable: true }),
    beryxLinkColumn({ field: 'tx_to', label: 'To', inputType: ObjectType.ADDRESS, headerIcon: <Login />, sortable: true }),
    methodTypeColumn({ field: 'tx_type', label: 'Method', headerIcon: <DataCategorical />, sortable: true }),
    amountColumn({
      field: 'amount',
      label: 'Amount (FIL)',
      headerIcon: <FilecoinIcon size={15} color1="#e2ebfe49" color2="#000" />,
      sortable: true,
    }),
    numberColumn({
      field: 'gas_used',
      label: 'Gas Used (attoFIL)',
      minWidth: 150,
      headerIcon: <GasStationFilled />,
      sortable: true,
      decimals: 0,
    }),
    transactionDetailsColumn(),
    downloadColumn({ fileName: 'transaction' }),
  ],
  recent_activity_transactions: [
    transactionStatusColumn({ field: 'status', label: 'Status', sortable: true }),
    beryxLinkColumn({
      field: 'tx_cid',
      label: 'Hash',
      inputType: ObjectType.TXS,
      headerIcon: <DoubleInteger />,
      sortable: true,
    }),
    timeColumn({ field: 'tx_timestamp', label: 'Timestamp', isUTC: true, headerIcon: <Calendar />, sortable: true }),
    beryxLinkColumn({
      field: 'height',
      label: 'Height',
      inputType: ObjectType.TIPSET,
      minWidth: 100,
      headerIcon: <Cube />,
      sortable: true,
    }),
    beryxLinkColumn({ field: 'tx_from', label: 'From', inputType: ObjectType.ADDRESS, headerIcon: <Logout />, sortable: true }),
    beryxLinkColumn({ field: 'tx_to', label: 'To', inputType: ObjectType.ADDRESS, headerIcon: <Login />, sortable: true }),
    methodTypeColumn({ field: 'tx_type', label: 'Method', headerIcon: <DataCategorical />, sortable: true }),
    amountColumn({
      field: 'amount',
      label: 'Amount (FIL)',
      headerIcon: <FilecoinIcon size={15} color1="#e2ebfe49" color2="#000" />,
      sortable: true,
    }),
    numberColumn({
      field: 'gas_used',
      label: 'Gas Used (attoFIL)',
      minWidth: 150,
      headerIcon: <GasStationFilled />,
      sortable: true,
      decimals: 0,
    }),
    transactionDetailsColumn(),
    downloadColumn({ fileName: 'transaction' }),
  ],
  latest_transactions: [
    transactionStatusColumn({ field: 'status', label: 'Status' }),
    beryxLinkColumn({ field: 'tx_cid', label: 'Hash', inputType: ObjectType.TXS, headerIcon: <DoubleInteger /> }),
    beryxLinkColumn({ field: 'tx_from', label: 'From', inputType: ObjectType.ADDRESS, headerIcon: <Logout /> }),
    methodTypeColumn({ field: 'tx_type', label: 'Method', headerIcon: <DataCategorical /> }),
  ],
  mempool: [
    mempoolTransactionStatusColumn({ field: 'last_seen', label: 'Status' }),
    timeColumn({ field: 'first_seen', label: 'Timestamp', sortable: true }),
    beryxLinkColumn({ field: 'tx_cid', label: 'Hash', inputType: ObjectType.TXS, headerIcon: <DoubleInteger />, sortable: true }),
    beryxLinkColumn({ field: 'tx_from', label: 'From', inputType: ObjectType.ADDRESS, headerIcon: <Logout />, sortable: true }),
    beryxLinkColumn({ field: 'tx_to', label: 'To', inputType: ObjectType.ADDRESS, headerIcon: <Login />, sortable: true }),
    methodTypeColumn({ field: 'method_name', label: 'Method', headerIcon: <DataCategorical />, sortable: true }),
    amountColumn({
      field: 'amount',
      label: 'Amount (FIL)',
      headerIcon: <FilecoinIcon size={15} color1="#e2ebfe49" color2="#000" />,
      sortable: true,
    }),
    numberColumn({
      field: 'gas_limit',
      label: 'Gas Limit',
      minWidth: 160,
      headerIcon: <GasStationFilled />,
      sortable: true,
      decimals: 0,
    }),
    numberColumn({
      field: 'gas_premium',
      label: 'Gas Premium (attoFIL)',
      minWidth: 180,
      headerIcon: <GasStationFilled />,
      sortable: true,
      decimals: 0,
    }),
    codeViewColumn(),
    downloadColumn({ fileName: 'mempool_transaction' }),
  ],
  contracts: [
    transactionStatusColumn({ field: 'status', label: 'Status', sortable: true }),
    beryxLinkColumn({ field: 'tx_to', label: 'Contract', inputType: ObjectType.ADDRESS, headerIcon: <Policy />, sortable: true }),
    timeColumn({ field: 'tx_timestamp', label: 'When', headerIcon: <Calendar />, sortable: true }),
    beryxLinkColumn({
      field: 'height',
      label: 'Height',
      inputType: ObjectType.TIPSET,
      minWidth: 100,
      headerIcon: <Cube />,
      sortable: true,
    }),
    beryxLinkColumn({ field: 'tx_from', label: 'Who invoked it', inputType: ObjectType.ADDRESS, headerIcon: <Logout />, sortable: true }),
    beryxLinkColumn({ field: 'tx_cid', label: 'Hash', inputType: ObjectType.TXS, headerIcon: <DoubleInteger />, sortable: true }),
    amountColumn({
      field: 'amount',
      label: 'Amount (FIL)',
      headerIcon: <FilecoinIcon size={15} color1="#e2ebfe49" color2="#000" />,
      sortable: true,
    }),
    numberColumn({
      field: 'gas_used',
      label: 'Gas Used (attoFIL)',
      minWidth: 150,
      headerIcon: <GasStationFilled />,
      sortable: true,
      decimals: 0,
    }),
    codeViewColumn(),
    downloadColumn({ fileName: 'contract' }),
  ],
  contracts_invokes: [
    timeColumn({ field: 'bucket', label: 'Date', isUTC: true }),
    beryxLinkColumn({ field: 'tx_to', label: 'To', inputType: ObjectType.ADDRESS }),
    numberColumn({ field: 'count', label: 'Count' }),
    codeViewColumn(),
  ],
  contracts_invokes_home: [
    transactionStatusColumn({ field: 'status', label: 'Status' }),
    beryxLinkColumn({ field: 'tx_to', label: 'Contract', inputType: ObjectType.ADDRESS, headerIcon: <Policy /> }),
    timeColumn({ field: 'tx_timestamp', label: 'When', headerIcon: <Calendar /> }),
    beryxLinkColumn({ field: 'height', label: 'Height', inputType: ObjectType.TIPSET, minWidth: 100, headerIcon: <Cube /> }),
    beryxLinkColumn({ field: 'tx_from', label: 'Who invoked it', inputType: ObjectType.ADDRESS, headerIcon: <Logout /> }),
    amountColumn({ field: 'amount', label: 'Amount (FIL)', headerIcon: <FilecoinIcon size={15} color1="#e2ebfe49" color2="#000" /> }),
    numberColumn({ field: 'gas_used', label: 'Gas Used (attoFIL)', minWidth: 150, headerIcon: <GasStationFilled /> }),
  ],
  contracts_creates: [
    timeColumn({ field: 'bucket', label: 'Date', isUTC: true }),
    beryxLinkColumn({ field: 'tx_from', label: 'From', inputType: ObjectType.ADDRESS }),
    numberColumn({ field: 'count', label: 'Count' }),
    codeViewColumn(),
  ],
  gas_used: [
    timeColumn({ field: 'bucket', label: 'Date', isUTC: true }),
    beryxLinkColumn({ field: 'tx_from', label: 'From', inputType: ObjectType.ADDRESS }),
    numberColumn({ field: 'count', label: 'Gas Used' }),
    codeViewColumn(),
  ],
  rich_list: [
    rankColumn({ field: 'id', label: 'Rank', headerIcon: <Trophy /> }),
    beryxLinkColumn({ field: 'account', label: 'Account', inputType: ObjectType.ADDRESS, headerIcon: <DoubleInteger />, maxWidth: 150 }),
    amountColumn({ field: 'balance', label: 'Balance (FIL)', headerIcon: <FilecoinIcon size={15} color1="#e2ebfe49" color2="#000" /> }),
    codeViewColumn(),
    downloadColumn({ fileName: 'account' }),
  ],
  verified_contracts: [
    beryxLinkColumn({
      field: 'contractAddress',
      label: 'Address',
      inputType: ObjectType.ADDRESS,
      headerIcon: <DoubleInteger />,
      sortable: false,
    }),
    stringColumn({ field: 'contractName', label: 'Contract Name', headerIcon: <Identification />, sortable: false }),
    compilerColumn({ field: 'solc', label: 'Compiler', headerIcon: <TransformBinary />, sortable: false }),
    optimizationColumn({ field: 'optimizerRuns', label: 'Optimization', headerIcon: <IncreaseLevel />, sortable: false }),
    licenseColumn({ field: 'licenses', label: 'Licenses', headerIcon: <License />, sortable: false }),
    timeSinceColumn({ field: 'datetime', label: 'Last Time Verified', headerIcon: <Calendar />, minWidth: 135, sortable: false }),
    downloadIpfs({ field: 'sourceCID' }),
  ],
  transactions_logs: [
    beryxLinkColumn({ field: 'address', label: 'Address', inputType: ObjectType.ADDRESS, headerIcon: <Logout /> }),
    beryxLinkColumn({
      field: 'blockHash',
      label: 'Block Hash',
      inputType: ObjectType.TXS,
      disableLink: true,
      headerIcon: <DoubleInteger />,
    }),
    beryxLinkColumn({
      field: 'blockNumber',
      label: 'Block Number',
      inputType: ObjectType.TXS,
      disableLink: true,
    }),
    stringColumn({ field: 'logIndex', label: 'Log Index' }),
    booleanColumn({ field: 'removed', label: 'Removed', sortable: true }),
    codeViewColumn(),
    downloadColumn({ fileName: 'account' }),
  ],
  dashboard_top_accounts_by_gas: [
    beryxLinkColumn({
      field: 'tx_from',
      label: 'tx_from',
      inputType: ObjectType.ADDRESS,
      hasCopyButton: false,
      disableLimitCharacters: true,
      headerIcon: <IbmCloudVpcEndpoints />,
    }),
    numberColumn({ field: 'value', label: 'Gas Used (attoFIL)', decimals: 0 }),
  ],
  dashboard_top_addresses_count: [
    beryxLinkColumn({
      field: 'tx_from',
      label: 'tx_from',
      inputType: ObjectType.ADDRESS,
      hasCopyButton: false,
      disableLimitCharacters: true,
      headerIcon: <IbmCloudVpcEndpoints />,
    }),
    percentageRange({
      field: 'value',
      label: 'Count',
      sortable: true,
      width: 170,
      headerIcon: <Hashtag />,
    }),
  ],
  dashboard_top_addresses_count_by_contract: [
    beryxLinkColumn({
      field: 'tx_from',
      label: 'tx_from',
      inputType: ObjectType.ADDRESS,
      hasCopyButton: false,
      headerIcon: <IbmCloudVpcEndpoints />,
    }),
    percentageRange({
      field: 'value',
      label: 'Count',
      sortable: true,
      width: 170,
      headerIcon: <Hashtag />,
    }),
  ],
  dashboard_top_invoked_count: [
    beryxLinkColumn({
      field: 'tx_to',
      label: 'tx_to',
      inputType: ObjectType.ADDRESS,
      hasCopyButton: false,
      headerIcon: <IbmCloudVpcEndpoints />,
    }),
    percentageRange({
      field: 'value',
      label: 'Count',
      sortable: true,
      width: 170,
      headerIcon: <Hashtag />,
    }),
  ],
  leaderboard: [
    rankColumn({ field: 'id', label: 'Rank' }),
    beryxLinkColumn({
      field: 'unified_account',
      label: 'Address',
      inputType: ObjectType.ADDRESS,
      headerIcon: <DoubleInteger />,
      sortable: true,
    }),
    timeColumn({ field: 'first_seen', label: 'First Seen', isUTC: true, headerIcon: <Calendar /> }),
    timeColumn({ field: 'last_seen', label: 'Last Seen', isUTC: true, headerIcon: <Calendar /> }),
    beryxLinkColumn({
      field: 'last_seen_height',
      label: 'Last seen Height',
      inputType: ObjectType.TIPSET,
      minWidth: 150,
      headerIcon: <Cube />,
    }),
    actorTypeColumn({ field: 'actor_type', label: 'Actor Type', headerIcon: <DataCategorical /> }),
    amountColumn({
      field: 'balance',
      label: 'Balance (FIL)',
      minWidth: 150,
      headerIcon: <FilecoinIcon size={15} color1="#e2ebfe49" color2="#000" />,
    }),
    numberColumn({
      field: 'ratio',
      label: 'Ratio',
      minWidth: 150,
      headerIcon: <Hashtag />,
      headerTooltip: "Represents the account's balance as a percentage of the total system balance.",
      decimals: 2,
    }),
  ],
  top_contracts_by_unique_users: [
    rankColumn({ field: 'id', label: 'Rank' }),
    beryxLinkColumn({ field: 'tx_to', label: 'To', inputType: ObjectType.ADDRESS, headerIcon: <Login />, disableLimitCharacters: true }),
    numberColumn({
      field: 'count',
      label: 'Unique Users',
      minWidth: 150,
      maxWidth: 200,
      headerIcon: <Hashtag />,
      sortable: true,
      decimals: 0,
    }),
  ],
  top_accounts_by_gas_used: [
    rankColumn({ field: 'id', label: 'Rank' }),
    beryxLinkColumn({ field: 'tx_from', label: 'From', inputType: ObjectType.ADDRESS, headerIcon: <Logout /> }),
    numberColumn({
      field: 'gas_used',
      label: 'Gas Used (attoFIL)',
      minWidth: 150,
      headerIcon: <GasStationFilled />,
      sortable: true,
      decimals: 0,
    }),
  ],
  top_contracts_by_invokes: [
    rankColumn({ field: 'id', label: 'Rank' }),
    beryxLinkColumn({ field: 'tx_to', label: 'To', inputType: ObjectType.ADDRESS, headerIcon: <Login />, disableLimitCharacters: true }),
    numberColumn({
      field: 'count',
      label: 'Invokes',
      minWidth: 150,
      maxWidth: 200,
      headerIcon: <Hashtag />,
      sortable: true,
      decimals: 0,
    }),
  ],
}

export const treeColumnDef = treeColumn({ field: 'group', label: 'Group' })
