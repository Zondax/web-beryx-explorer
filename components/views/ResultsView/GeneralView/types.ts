import React from 'react'

export enum SearchItemType {
  ADDRESS = 'address',
  TIPSET = 'tipset',
  TRANSACTION = 'transaction',
  CONTRACT = 'contract',
  UNKNOWN = 'unknown',
  MEMPOOL = 'mempool',
}

export type TabProps = {
  id: string
  name: string
  content?: React.JSX.Element
  show: boolean
  disable?: boolean
  beta?: boolean
}

export interface SearchedItemTabProps {
  overview: TabProps
  internalMessages: TabProps
  transactions: TabProps
  miners: TabProps
  mempool: TabProps
  code: TabProps
  interact: TabProps
  verified_contracts: TabProps
  stats: TabProps
  richList: TabProps
  topContracts: TabProps
  topAccounts: TabProps
  topContractsByInvokes: TabProps
  topAccountsByValueExchanged: TabProps
  topContractsByValueExchanged: TabProps
  events: TabProps
  proposals: TabProps
  stateTrace: TabProps
  richestContracts: TabProps
}
