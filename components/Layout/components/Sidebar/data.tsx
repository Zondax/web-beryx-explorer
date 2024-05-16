import React from 'react'

import { NetworkUniqueId, Networks } from '@/config/networks'
import {
  Activity,
  Book,
  CategoryNewEach,
  CertificateCheck,
  Compass,
  Cube,
  Dashboard,
  ExecutableProgram,
  GasStation,
  Home,
  RainDrop,
  TaskStar,
} from '@carbon/icons-react'

import { FIL2ETHIcon } from '../../../common/Icons'

/**
 * @enum PAGES
 * @description Enum for page names
 */
export enum PAGES {
  HOME = 'Home',
  EXPLORE = 'Explore',
  LEADERBOARD = 'Leaderboard',
  RECENT_ACTIVITY = 'Recent Activity',
  DASHBOARD = 'Dashboard',
  MEMPOOL = 'Mempool',
  FAUCET = 'Faucet',
  ADDRESS_CONVERTER = 'Address Converter',
  CONTRACT_VERIFIER = 'Contract Verifier',
  RPC = 'RPC Node',
  NOT_FOUND = '404',
  ERROR_500 = '500',
  INTERACT = 'Interact with Smart Contracts',
  ESTIMATE_GAS = 'Estimate Gas',
  TERMS_OF_SERVICE = 'Terms Of Service',
  CHANGELOG = 'Changelog',
  RESOURCES = 'Resources',
}

/**
 * @interface NavigationItemProps
 * @description Interface for navigation items
 */
export interface NavigationItemProps {
  icon: React.ReactNode
  name: PAGES
  path: string
  show: boolean
  networkIds: NetworkUniqueId[]
  new?: boolean
}

/**
 * @var navigationItems
 * @description Array of navigation items
 */
export const navigationItems: Array<NavigationItemProps> = [
  {
    icon: <Home size="24" />,
    name: PAGES.HOME,
    path: '/',
    show: true,
    networkIds: [Networks.mainnet.uniqueId, Networks.calibration.uniqueId],
  },
  {
    icon: <Compass size="24" />,
    name: PAGES.EXPLORE,
    path: '#',
    show: false,
    networkIds: [Networks.mainnet.uniqueId, Networks.calibration.uniqueId],
  },
  {
    icon: <TaskStar size="24" />,
    name: PAGES.LEADERBOARD,
    path: '/leaderboard',
    show: true,
    networkIds: [Networks.mainnet.uniqueId, Networks.calibration.uniqueId],
  },
  {
    icon: <Activity size="24" />,
    name: PAGES.RECENT_ACTIVITY,
    path: '/recent_activity',
    show: true,
    networkIds: [Networks.mainnet.uniqueId, Networks.calibration.uniqueId],
  },
  {
    icon: <Dashboard size="24" />,
    name: PAGES.DASHBOARD,
    path: '/dashboard',
    show: true,
    networkIds: [Networks.mainnet.uniqueId, Networks.calibration.uniqueId],
  },
  {
    icon: <CategoryNewEach size="24" />,
    name: PAGES.MEMPOOL,
    path: '/mempool',
    show: true,
    networkIds: [Networks.mainnet.uniqueId, Networks.calibration.uniqueId],
  },
  {
    icon: <RainDrop size="24" />,
    name: PAGES.FAUCET,
    path: '/faucet',
    show: true,
    networkIds: [Networks.calibration.uniqueId],
  },
  {
    icon: <FIL2ETHIcon size={24} />,
    name: PAGES.ADDRESS_CONVERTER,
    path: '/address_converter',
    show: true,
    networkIds: [Networks.mainnet.uniqueId, Networks.calibration.uniqueId],
  },
  {
    icon: <CertificateCheck size={24} />,
    name: PAGES.CONTRACT_VERIFIER,
    path: '/contract_verifier',
    show: true,
    networkIds: [Networks.mainnet.uniqueId, Networks.calibration.uniqueId],
  },
  {
    icon: <Cube size={24} />,
    name: PAGES.RPC,
    path: '/rpc',
    show: true,
    networkIds: [Networks.mainnet.uniqueId, Networks.calibration.uniqueId],
  },
  {
    icon: <GasStation size={24} />,
    name: PAGES.ESTIMATE_GAS,
    path: '/estimate_gas',
    show: true,
    networkIds: [Networks.mainnet.uniqueId, Networks.calibration.uniqueId],
    new: true,
  },
  {
    icon: <ExecutableProgram size={24} />,
    name: PAGES.INTERACT,
    path: '/interact',
    show: true,
    networkIds: [Networks.mainnet.uniqueId, Networks.calibration.uniqueId],
  },
  {
    icon: <Book size={24} />,
    name: PAGES.RESOURCES,
    path: '/resources',
    show: true,
    networkIds: [Networks.calibration.uniqueId, Networks.mainnet.uniqueId],
  },
]

export interface ResourcesItemProps {
  icon: React.ReactNode
  name: 'Resources'
  path: string
  show: boolean
  networkIds: string[]
  new?: boolean
}

export const resourcesItem: ResourcesItemProps = {
  icon: <Book size={24} />,
  name: 'Resources',
  path: '',
  show: true,
  networkIds: [Networks.calibration.uniqueId, Networks.mainnet.uniqueId],
}
