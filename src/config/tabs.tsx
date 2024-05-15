import { ObjectType } from '@/routes/parsing'

import RichList from 'components/views/Leaderboard/Tabs/RichList'
import TopAccounts from 'components/views/Leaderboard/Tabs/TopAccounts'
import TopContracts from 'components/views/Leaderboard/Tabs/TopContracts'
import TopContractsByInvokes from 'components/views/Leaderboard/Tabs/TopContractsByInvokes'

import Blocks from '../../components/views/ResultsView/GeneralView/Tabs/Blocks'
import ContractFiles from '../../components/views/ResultsView/GeneralView/Tabs/ContractFiles/ContractFiles'
import Interact from '../../components/views/ResultsView/GeneralView/Tabs/Interact'
import Logs from '../../components/views/ResultsView/GeneralView/Tabs/Logs'
import { AddressMempool } from '../../components/views/ResultsView/GeneralView/Tabs/Mempool'
import Overview from '../../components/views/ResultsView/GeneralView/Tabs/Overview/Overview'
import AddressStats from '../../components/views/ResultsView/GeneralView/Tabs/Stats/AddressStats'
import ContractStats from '../../components/views/ResultsView/GeneralView/Tabs/Stats/ContractStats'
import Stats from '../../components/views/ResultsView/GeneralView/Tabs/Stats/Stats'
import Transactions from '../../components/views/ResultsView/GeneralView/Tabs/Transactions'
import VerifiedContracts from '../../components/views/ResultsView/GeneralView/Tabs/VerifiedContracts'
import { SearchedItemTabProps, TabProps } from '../../components/views/ResultsView/GeneralView/types'

/**
 * Function to generate the tabs for the searched item.
 * @param t - Translation function from i18next.
 * @returns - Returns the properties for the searched item tabs.
 */
export const itemTabs: SearchedItemTabProps = {
  overview: {
    id: 'overview',
    name: 'Overview',
    content: <Overview />,
    show: true,
  },
  internalMessages: {
    id: 'internalMessages',
    name: 'Internal Messages',
    content: <Transactions />,
    show: true,
  },
  transactions: {
    id: 'transactions',
    name: 'All Transactions',
    content: <Transactions />,
    show: true,
  },
  miners: {
    id: 'blocks',
    name: 'Blocks',
    content: <Blocks />,
    show: true,
  },
  mempool: {
    id: 'mempool',
    name: 'Mempool',
    content: <AddressMempool />,
    show: true,
  },
  code: {
    id: 'code',
    name: 'Code',
    content: <ContractFiles />,
    show: true,
  },
  interact: {
    id: 'interact',
    name: 'Interact',
    content: <Interact />,
    show: true,
  },
  verified_contracts: {
    id: 'verified_contracts',
    name: 'Latest Verified Contracts',
    content: <VerifiedContracts />,
    show: true,
  },
  logs: {
    id: 'logs',
    name: 'Logs',
    content: <Logs />,
    show: true,
  },
  stats: {
    id: 'stats',
    name: 'Stats',
    content: <Stats />,
    show: true,
  },
  richList: {
    id: 'rich-list',
    name: 'Rich List',
    content: <RichList />,
    show: true,
  },
  topAccounts: {
    id: 'top-accounts',
    name: 'Top Accounts By Gas Used',
    content: <TopAccounts />,
    show: true,
  },
  topContracts: {
    id: 'top-contracts',
    name: 'Top Contracts By Unique Users',
    content: <TopContracts />,
    show: true,
  },
  topContractsByInvokes: {
    id: 'top-contracts-by-invokes',
    name: 'Top Contracts By Invokes',
    content: <TopContractsByInvokes />,
    show: true,
  },
}

/**
 * Function to generate tabs for searched items.
 * @param t - Translation function from i18next.
 * @returns An object with keys as item types and values as arrays of TabProps.
 */
export const searchedItemTabs: { [key: string]: TabProps[] } = {
  /**
   * Tabs for address type items.
   */
  address: [itemTabs.overview, itemTabs.transactions, itemTabs.mempool, itemTabs.stats],
  /**
   * Tabs for block type items.
   */
  'block-cid': [itemTabs.overview, itemTabs.transactions],
  /**
   * Tabs for tipset type items.
   */
  tipset: [itemTabs.overview, itemTabs.transactions],
  /**
   * Tabs for transaction type items.
   */
  txs: [itemTabs.overview, itemTabs.internalMessages, itemTabs.logs],
  /**
   * Tabs for contract type items.
   */
  contract: [itemTabs.overview, itemTabs.transactions, itemTabs.mempool, itemTabs.code, itemTabs.interact, itemTabs.stats],
  /**
   * Tabs for unknown type items.
   */
  unknown: [itemTabs.overview, itemTabs.transactions],
}

/**
 * Function to generate tabs for leaderboard.
 * @param t - Translation function from i18next.
 * @returns An array of TabProps.
 */
export const leaderboardTabs: TabProps[] = [itemTabs.richList, itemTabs.topAccounts, itemTabs.topContracts, itemTabs.topContractsByInvokes]

/**
 * Function to generate tabs for contract verifier page.
 * @param t - Translation function from i18next.
 * @returns An array of TabProps.
 */
export const contractVerifierTabs: TabProps[] = [itemTabs.verified_contracts]

export const statsComponentsMap: { [key in ObjectType]?: React.ReactNode } = {
  [ObjectType.ADDRESS]: <AddressStats />,
  [ObjectType.CONTRACT]: <ContractStats />,
  [ObjectType.TXS]: null,
  [ObjectType.BLOCK]: null,
  [ObjectType.TIPSET]: null,
  [ObjectType.UNKNOWN]: null,
}
