import { ObjectType } from '@/routes/parsing'

import RichList from 'components/views/Leaderboard/Tabs/RichList'
import RichestContracts from 'components/views/Leaderboard/Tabs/RichestContracts'
import TopAccounts from 'components/views/Leaderboard/Tabs/TopAccounts'
import TopAccountsByValueExchanged from 'components/views/Leaderboard/Tabs/TopAccountsByValueExchanged'
import TopContracts from 'components/views/Leaderboard/Tabs/TopContracts'
import TopContractsByInvokes from 'components/views/Leaderboard/Tabs/TopContractsByInvokes'
import TopContractsByValueExchanged from 'components/views/Leaderboard/Tabs/TopContractsByValueExchanged'
import Events from 'components/views/ResultsView/GeneralView/Tabs/Events'
import Proposals from 'components/views/ResultsView/GeneralView/Tabs/Proposals'
import StateTrace from 'components/views/ResultsView/GeneralView/Tabs/Trace'

import Blocks from '../../components/views/ResultsView/GeneralView/Tabs/Blocks'
import ContractFiles from '../../components/views/ResultsView/GeneralView/Tabs/ContractFiles/ContractFiles'
import Interact from '../../components/views/ResultsView/GeneralView/Tabs/Interact'
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
    id: 'contract',
    name: 'Contract',
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
  richestContracts: {
    id: 'richest-contracts',
    name: 'Richest Contracts',
    content: <RichestContracts />,
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
  topAccountsByValueExchanged: {
    id: 'top-accounts-by-value-exchanged',
    name: 'Top Accounts By Value Exchanged',
    content: <TopAccountsByValueExchanged />,
    show: true,
  },
  topContractsByValueExchanged: {
    id: 'top-contracts-by-value-exchanged',
    name: 'Top Contracts By Value Exchanged',
    content: <TopContractsByValueExchanged />,
    show: true,
  },
  events: {
    id: 'events',
    name: 'Events',
    content: <Events />,
    show: true,
    beta: true,
  },
  proposals: {
    id: 'proposals',
    name: 'Proposals',
    content: <Proposals />,
    show: true,
    beta: true,
  },
  stateTrace: {
    id: 'state-trace',
    name: 'State Trace',
    content: <StateTrace />,
    show: true,
    beta: true,
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
  address: [
    itemTabs.overview,
    itemTabs.transactions,
    itemTabs.mempool,
    itemTabs.stats,
    itemTabs.events,
    itemTabs.proposals,
    itemTabs.stateTrace,
  ],
  /**
   * Tabs for block type items.
   */
  'block-cid': [itemTabs.overview, itemTabs.transactions],
  /**
   * Tabs for tipset type items.
   */
  tipset: [itemTabs.overview, itemTabs.transactions, itemTabs.events],
  /**
   * Tabs for transaction type items.
   */
  txs: [itemTabs.overview, itemTabs.internalMessages, itemTabs.events],
  /**
   * Tabs for contract type items.
   */
  contract: [itemTabs.overview, itemTabs.transactions, itemTabs.mempool, itemTabs.code, itemTabs.interact, itemTabs.stats, itemTabs.events],
  /**
   * Tabs for events type items.
   */
  event: [itemTabs.overview, itemTabs.events],
  /**
   * Tabs for ERC20 type items.
   */
  erc20: [itemTabs.overview, itemTabs.transactions, itemTabs.mempool, itemTabs.code, itemTabs.interact, itemTabs.stats],
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
export const leaderboardTabs: TabProps[] = [itemTabs.richList, itemTabs.topAccounts, itemTabs.topAccountsByValueExchanged]

/**
 * Function to generate tabs for contracts leaderboard.
 * @param t - Translation function from i18next.
 * @returns An array of TabProps.
 */
export const contractsLeaderboardTabs: TabProps[] = [
  itemTabs.richestContracts,
  itemTabs.topContracts,
  itemTabs.topContractsByInvokes,
  itemTabs.topContractsByValueExchanged,
]

/**
 * Function to generate tabs for contract verifier page.
 * @param t - Translation function from i18next.
 * @returns An array of TabProps.
 */
export const contractVerifierTabs: TabProps[] = [itemTabs.verified_contracts]

export const statsComponentsMap: { [key in ObjectType]?: React.ReactNode } = {
  [ObjectType.ADDRESS]: <AddressStats />,
  [ObjectType.CONTRACT]: <ContractStats />,
  [ObjectType.ERC20]: <ContractStats />,
  [ObjectType.TXS]: null,
  [ObjectType.BLOCK]: null,
  [ObjectType.TIPSET]: null,
  [ObjectType.UNKNOWN]: null,
}
