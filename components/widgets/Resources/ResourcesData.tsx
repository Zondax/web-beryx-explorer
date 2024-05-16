/**
 * @module ResourcesData
 * @description This module exports interfaces and data for the Resources component.
 */
import { LinkCardCategory } from 'components/common/LinkCard/types'

import { LinkCardProps } from '../../common/LinkCard'

/**
 * @interface ProjectInterface
 * @description Interface for individual project data.
 * @property title - The title of the project.
 * @property description - The description of the project.
 * @property linkDesc - The description of the project link.
 * @property linkUrl - The URL of the project link.
 */
export interface ProjectInterface {
  title: string
  description: string
  linkDesc: string
  linkUrl: string
}

/**
 * @interface ProjectsInterface
 * @description Interface for a collection of projects.
 * @property title - The title of the collection.
 * @property {ProjectInterface[]} cards - The array of projects in the collection.
 */
export interface ProjectsInterface {
  title: string
  cards: ProjectInterface[]
}

/**
 * @constant cardData
 * @description Array of project collections.
 * @type {ProjectsInterface[]}
 */
export const cardData: ProjectsInterface[] = [
  {
    title: 'The Beryx dev suite',
    cards: [
      {
        title: 'Beryx Api',
        description: 'Indexes and exposes via a public API Filecoin historical and real-time data.',
        linkDesc: 'Get your free token',
        linkUrl: 'https://docs.zondax.ch/beryx-api',
      },
      {
        title: 'Beryx Client Tool for JS',
        description: 'Use beryx-client in your project. It is super fast and will give you access to the entire API.',
        linkDesc: 'Install the npm package',
        linkUrl: 'https://www.npmjs.com/package/@zondax/beryx',
      },
    ],
  },
  {
    title: 'About FVM & FEVM',
    cards: [
      {
        title: 'FEVM hackathon',
        description: 'Learn about the first hackathon on the Filecoin Virtual Machine.',
        linkDesc: 'Learn more',
        linkUrl: 'https://fevm.ethglobal.com/',
      },
      {
        title: 'FVM',
        description: 'The goal of the FVM project is to add general programmability to the Filecoin blockchain.',
        linkDesc: 'Learn more',
        linkUrl: 'https://fvm.filecoin.io/',
      },
    ],
  },
  {
    title: 'Other resources',
    cards: [
      {
        title: 'Filecoin.sol',
        description:
          'The library that allows Solidity smart contracts to seamlessly call methods on Filecoin built-in actors, as well as to access Filecoin specific syscalls idiomatically.',
        linkDesc: 'Try it now',
        linkUrl: 'https://docs.zondax.ch/fevm/filecoin-solidity',
      },
      {
        title: 'Hyperspace Public RPC Node',
        description: 'If your project requires data retrieval, you can refer to our publicly available hosted endpoint of Lotus.',
        linkDesc: 'Try it now',
        linkUrl: 'https://api.zondax.ch/fil/node/hyperspace/rpc/v1',
      },
    ],
  },
]

/**
 * @constant otherResources
 * @description Array of other resources.
 * @type {LinkCardProps[]}
 */
export const otherResources: LinkCardProps[] = [
  {
    title: 'InterPlanetary Consensus',
    description: 'InterPlanetary Consensus (IPC) is a revolutionary blockchain technology that powers planetary-scale web3 apps.',
    url: 'https://ipc.space/',
    imageUrl: '/images/ipc.png',
    domain: 'ipc.space',
    category: LinkCardCategory.ECOSYSTEM,
  },
  {
    title: 'Filecoin',
    description: 'Filecoin has 262 repositories available. Follow their code on GitHub.',
    url: 'https://github.com/filecoin-project',
    imageUrl: '/images/filecoin-git.png',
    domain: 'github.com',
    category: LinkCardCategory.ECOSYSTEM,
  },
  {
    title: 'Lotus',
    description: 'Lotus is the reference implementation of the Filecoin blockchain.',
    url: 'https://lotus.filecoin.io/',
    imageUrl: '/images/lotus.png',
    domain: 'lotus.filecoin.io',
    category: LinkCardCategory.DEVELOPERS,
  },
  {
    title: 'Filecoin (@Filecoin) on X',
    description:
      'Filecoin ⨎ is the largest decentralized data storage marketplace, protocol, & cryptocurrency. Twitter account is community managed.',
    url: 'https://twitter.com/Filecoin',
    imageUrl: '/images/filecoin-x.png',
    domain: 'twitter.com',
    category: LinkCardCategory.SOCIAL_EVENTS,
  },
  {
    title: 'Filecoin Slack',
    description: 'Join the Filecoin community on Slack.',
    url: 'https://filecoin.io/slack',
    imageUrl: '/images/filecoin-slack.png',
    domain: 'filecoin.io',
    category: LinkCardCategory.SOCIAL_EVENTS,
  },
  {
    title: 'Beryx API',
    description: 'Indexes and exposes via a public API Filecoin historical and real-time data.',
    url: 'https://docs.zondax.ch/beryx-api',
    imageUrl: '/images/beryx.png',
    domain: 'docs.zondax.ch',
    category: LinkCardCategory.DEVELOPERS,
  },
  {
    title: 'Filecoin FVM contracts on Cookbook',
    description:
      'The Filecoin Virtual Machine (FVM) is a runtime environment for smart contracts (also called actors) on the Filecoin network. FVM brings user programmability to Filecoin, unleashing the enormous potential of an open data economy.',
    url: 'https://www.cookbook.dev/filecoin',
    imageUrl: '/images/cookbook.png',
    domain: 'www.cookbook.dev',
    category: LinkCardCategory.DEVELOPERS,
  },
  {
    title: 'Orbit Filecoin x Cyber Science Katowice !',
    description:
      'Hey there! Join us at Orbit Filecoin x Cyber Science Katowice for a deep dive into the world of decentralized storage and cybersecurity.',
    url: 'https://www.eventbrite.com/e/orbit-filecoin-x-cyber-science-katowice-tickets-872433832077',
    imageUrl: '/images/filecoin-e1.png',
    domain: 'www.eventbrite.com',
    category: LinkCardCategory.SOCIAL_EVENTS,
  },
  {
    title: 'ETHWarsaw & Orbit Filecoin',
    description: 'Welcome to the ultimate Web3 tech with Orbit Filecoin and ETHWarsaw  in the heart of  Warsaw!',
    url: 'https://www.eventbrite.com/e/ethwarsaw-orbit-filecoin-tickets-873379029187',
    imageUrl: '/images/filecoin-e2.png',
    domain: 'www.eventbrite.com',
    category: LinkCardCategory.SOCIAL_EVENTS,
  },
  {
    title: 'Filecoin Orbit Meetup - Intro to Filecoin and Interplanetary Consensus',
    description: "Join us for a chill Filecoin Meetup where we'll chat about Filecoin and Interplanetary Consensus (IPC)!",
    url: 'https://www.eventbrite.com/e/filecoin-orbit-meetup-intro-to-filecoin-and-interplanetary-consensus-tickets-867725569537',
    imageUrl: '/images/filecoin-e3.png',
    domain: 'www.eventbrite.com',
    category: LinkCardCategory.SOCIAL_EVENTS,
  },
  {
    title: 'Filecoin Ecosystem',
    description: 'Filecoin interactive ecosystem dashboard.',
    url: 'https://ecosystem.filecoin.io/?filters=enabled&tags=FVM',
    imageUrl: '/images/filecoin-eco.png',
    domain: 'ecosystem.filecoin.io',
    category: LinkCardCategory.ECOSYSTEM,
  },
]
