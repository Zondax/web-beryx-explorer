import { ReactNode } from 'react'

import { PagesProps } from '@/store/data/search'

import { PaginationModel } from '../Table/types'

// Switch Received / Sent, present only in the address result table
export const methodsType = ['all', 'incoming', 'outgoing']
export type MethodType = (typeof methodsType)[number]

export type MethodsTypeOption = { icon?: ReactNode; method: MethodType; disabled?: boolean; active?: boolean }[]
export const initMethodsTypeOptions: MethodsTypeOption = [
  {
    method: 'all',
    active: true,
  },
  {
    method: 'incoming',
  },
  {
    method: 'outgoing',
  },
]

export type BeryxMethodType = 'receiver' | 'sender'
export const methodMapped: { [key in MethodType]: BeryxMethodType | undefined } = {
  all: undefined,
  incoming: 'receiver',
  outgoing: 'sender',
}
export const methodDescription: { [key: string]: string } = {
  all_disabled:
    'Due to the abundance of transactions associated with this address, the display of all entries has been disabled. Please choose between viewing incoming transactions or outgoing transactions.',
  all: 'Transactions received by the address.',
  incoming: 'Transactions received by the address.',
  outgoing: 'Transactions sent from the address.',
}

// export const defaultType = methodsType[0]

// Switch Main / All, present only in the transactions result table except in the transactions result table
export type LevelFilter = 'main' | 'all'
export interface Filters {
  methodType?: MethodsTypeOption
  level?: LevelFilter
  evm: boolean
}
export const levelType: LevelFilter[] = ['main', 'all']

export const levelDescription: { [key in LevelFilter]: string } = {
  main: 'Main transactions.',
  all: 'All transactions, including internal messages.',
}

export interface Sort {
  field: string
  sort: 'asc' | 'desc'
}

export const initPaginationModel: PaginationModel = { page: 0, pageSize: 50 }

export interface QueryOptions {
  filters: Filters
  sort?: Sort[]
  page: PagesProps
}

export const errorDescriptions: { [key: number]: string } = {
  4001: 'Too many rows for sorting. Sorting is disabled.',
}
