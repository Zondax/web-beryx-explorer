import axios from 'axios'
import Head from 'next/head'

import { fetchTransactionDetails } from '@/api-client/beryx'
import { LoadingStatus } from '@/config/config'
import { NetworkType } from '@/config/networks'
import { useSearchStore } from '@/store/data/search'
import { captureException } from '@sentry/nextjs'

import { LinkCardCategory } from 'components/common/LinkCard/types'

import { PAGES } from '../../components/Layout/components/Sidebar'
import { LinkCardProps } from '../../components/common/LinkCard'

interface MetaDataProps {
  metaTitle: string
  metaDescription: string
  metaImage: string
  metaURL: string
  metaType?: 'website' | 'article'
  canonicalURL?: string
}
interface MetaTagsProps {
  metaData: MetaDataProps
}

// https://moz.com/learn/seo/meta-description#related-resources:~:text=Don't%20include%20double%20quotation%20marks
export const sanitizeDescription = (plainText?: string): undefined | string => {
  if (!plainText) {
    return
  }
  const description = plainText.replace(/"/g, '&quot;').replace(/'/g, '&apos;').replace(/\n/g, '')
  return description.length <= 180 ? description : `${description.slice(0, 179)}…`
}

/**
 * This function returns meta tags comprising primary meta tags, Open Graph/Facebook meta tags and Twitter meta tags.
 * @param metaData - The metadata props
 * @param type - The type of metadata. The default value is 'website'.
 * @returns The JSX of meta tags
 */
export const metaTags = ({ metaData }: MetaTagsProps) => {
  return (
    <Head>
      <title>{metaData.metaTitle}</title>

      {/* <!-- Primary Meta Tags --> */}
      <meta key="meta title" name="title" content={metaData.metaTitle} />
      <meta key="meta description" name="description" content={sanitizeDescription(metaData.metaDescription)} />

      {/* <!-- Open Graph / Facebook --> */}
      <meta key="og type" property="og:type" content={metaData.metaType || 'website'} />
      <meta key="og url" property="og:url" content={metaData.metaURL} />
      <meta key="og title" property="og:title" content={metaData.metaTitle} />
      <meta key="og description" property="og:description" content={sanitizeDescription(metaData.metaDescription)} />
      <meta key="og image" property="og:image" content={metaData.metaImage} />

      {/* <!-- Twitter --> */}
      <meta key="twitter card" property="twitter:card" content="summary_large_image" />
      <meta key="twitter url" property="twitter:url" content={metaData.metaURL} />
      <meta key="twitter title" property="twitter:title" content={metaData.metaTitle} />
      <meta key="twitter description" property="twitter:description" content={sanitizeDescription(metaData.metaDescription)} />
      <meta key="twitter image" property="twitter:image" content={metaData.metaImage} />

      {metaData.canonicalURL && <link rel="canonical" href={metaData.canonicalURL} />}
    </Head>
  )
}

/**
 * This function fetches metadata from given URL and returns an object containing title, description, URL, image URL and domain name of the website.
 * @param url - The URL to fetch data from
 * @returns An object containing the metadata if successful, 'error' otherwise
 */
export const fetchLinkMetaData = async (url: string) => {
  try {
    const urlObj = new URL(url)
    const domainName = urlObj.hostname

    const response = await axios.get(url)
    const html = response.data

    // Extract title
    const titleMatch = RegExp(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^'"]+)["'][^>]*>/).exec(html)
    const title = titleMatch ? titleMatch[1] : ''

    // Extract description
    const descriptionMatch = RegExp(/<meta[^>]+property=["']og:description["'][^>]+content=["']([^'"]+)["'][^>]*>/).exec(html)
    const description = descriptionMatch ? descriptionMatch[1] : ''

    // Extract image URL
    const imageUrlMatch = RegExp(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^'"]+)["'][^>]*>/).exec(html)
    const imageUrl = imageUrlMatch ? imageUrlMatch[1] : ''

    // Extract tab icon
    const iconMatch = RegExp(/<link[^>]+rel=["']icon["'][^>]+href=["']([^'"]+)["'][^>]*>/).exec(html)
    const icon = iconMatch ? iconMatch[1] : ''

    return {
      icon,
      title,
      description,
      imageUrl,
      url,
      domain: domainName,
    }
  } catch (error) {
    captureException(error)
    return 'error'
  }
}

/**
 * This function fetches metadata from an array of URLs.
 * @param links - The array of URLs
 * @returns An array containing the successfully fetched metadata
 */
export const fetchResourcesMetaData = async (links: string[]) => {
  const linksMetaData: LinkCardProps[] = []

  for (const link of links) {
    const metaData = await fetchLinkMetaData(link)
    if (metaData !== 'error') {
      linksMetaData.push({ ...metaData, category: LinkCardCategory.ECOSYSTEM })
    }
  }

  return linksMetaData
}
/**
 * This function fetches metadata for resource cards from an array of resource information.
 * @param resources - The array of resource information containing URLs and categories
 * @returns An array containing the successfully fetched metadata for resource cards
 */
export const fetchResourceCardsMetaData = async (resources: { url: string; category: LinkCardCategory; priority?: boolean }[]) => {
  const resourceCardsMetaData: LinkCardProps[] = []

  for (const resource of resources) {
    const metaData = await fetchResourcesMetaData([resource.url])
    if (metaData.length > 0) {
      const internalMetaData = { ...metaData[0], category: resource.category, priority: resource.priority ?? false }
      resourceCardsMetaData.push(internalMetaData)
    }
  }

  return resourceCardsMetaData
}

/**
 * This function returns metadata of a page.
 * @param page - The name of the page
 * @returns An object containing the metadata of the page
 */
export function getPageMetaData(page: PAGES): MetaDataProps {
  const defaultMeta: MetaDataProps = {
    metaTitle: 'Beryx: Blockchain Explorer, Dashboards, Faucet and Tools',
    metaDescription:
      'Beryx is a platform developed by Zondax that includes public historical data, streaming data and metrics for Filecoin blockchain.',
    metaImage: 'https://beryx.io/main.png',
    metaURL: 'https://beryx.io',
  }

  const pageMeta = {
    [PAGES.HOME]: defaultMeta,
    [PAGES.EXPLORE]: {
      ...defaultMeta,
      metaTitle: 'Beryx: Dive into the Filecoin Ecosystem',
      metaDescription:
        'Explore the vast Filecoin ecosystem with Beryx. Discover nodes, transactions, and more in an intuitive interface. Open 24/7.',
    },
    [PAGES.LEADERBOARD]: {
      ...defaultMeta,
      metaTitle: 'Leaderboard: Track Top Filecoin Performers | Beryx',
      metaDescription:
        "See who's leading in the Filecoin network with Beryx Leaderboard. Rankings updated daily to reflect the most active and influential nodes.",
      metaURL: 'https://beryx.io/leaderboard',
      metaImage: 'https://beryx.io/leaderboard.png',
    },
    [PAGES.CONTRACTS_LEADERBOARD]: {
      ...defaultMeta,
      metaTitle: 'Contracts Leaderboard: Track Top Filecoin Performers | Beryx',
      metaDescription:
        "See who's leading in the Filecoin network with Beryx Leaderboard. Rankings updated daily to reflect the most active and influential nodes.",
      metaURL: 'https://beryx.io/contracts_leaderboard',
      metaImage: 'https://beryx.io/leaderboard.png',
    },
    [PAGES.DASHBOARD]: {
      ...defaultMeta,
      metaTitle: 'Dashboard: Filecoin Insights at a Glance | Beryx',
      metaDescription:
        'Access personalized insights and metrics on the Filecoin network with your Beryx Dashboard. Monitor performance, transactions, and more.',
      metaURL: 'https://beryx.io/dashboard',
      metaImage: 'https://beryx.io/dashboard.png',
    },
    [PAGES.MEMPOOL]: {
      ...defaultMeta,
      metaTitle: 'Mempool: Real-time Transaction Monitoring | Beryx',
      metaDescription:
        'Stay updated with real-time transaction monitoring in the Filecoin network with Beryx Mempool. Explore pending transactions and mempool status.',
      metaURL: 'https://beryx.io/mempool',
      metaImage: 'https://beryx.io/mempool.png',
    },
    [PAGES.FAUCET]: {
      ...defaultMeta,
      metaTitle: 'Faucet: Get Filecoin Test Tokens | Beryx',
      metaDescription:
        'Claim Filecoin test tokens with Beryx Faucet. A crucial tool for developers and users for testing and development on the Filecoin network.',
      metaURL: 'https://beryx.io/faucet',
      metaImage: 'https://beryx.io/faucet.png',
    },
    [PAGES.ADDRESS_CONVERTER]: {
      ...defaultMeta,
      metaTitle: 'Address Converter: Filecoin Ethereum compatible | Beryx',
      metaDescription:
        'Easily convert Filecoin addresses with Beryx Address Converter. Supports multiple formats for seamless integration and usage.',
      metaURL: 'https://beryx.io/address-converter',
      metaImage: 'https://beryx.io/converter.png',
    },
    [PAGES.CONTRACT_VERIFIER]: {
      ...defaultMeta,
      metaTitle: 'Contract Verifier: Ensure Smart Contract Integrity by verifying source code | Beryx',
      metaDescription:
        'Verify the integrity of Filecoin smart contracts with Beryx Contract Verifier. A step towards secure and reliable contract deployment.',
      metaURL: 'https://beryx.io/contract-verifier',
      metaImage: 'https://beryx.io/verifier.png',
    },
    [PAGES.RPC]: {
      ...defaultMeta,
      metaTitle: 'Filecoin RPC Node: Access Filecoin Mainnet and Calibration Networks | Beryx',
      metaDescription:
        'Connect to the Filecoin network with Beryx Calibration Public RPC Node. Reliable access for developers and users alike.',
      metaURL: 'https://beryx.io/rpc',
      metaImage: 'https://beryx.io/rpc.png',
    },
    [PAGES.RECENT_ACTIVITY]: {
      ...defaultMeta,
      metaTitle: 'Recent Activity: Latest Filecoin Tipsets, Transactions and Contract Invokes | Beryx',
      metaDescription:
        'Keep up with the latest activity on the Filecoin network with Beryx. Real-time updates on transactions, tipsets, blocks, contracts and more.',
      metaURL: 'https://beryx.io/recent-activity',
      metaImage: 'https://beryx.io/activity.png',
    },
    [PAGES.NOT_FOUND]: {
      ...defaultMeta,
      metaTitle: '404: Page Not Found | Beryx',
      metaDescription:
        'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable on Beryx.',
      metaURL: 'https://beryx.io/404',
    },
    [PAGES.ERROR_500]: {
      ...defaultMeta,
      metaTitle: '500: Server Error | Beryx',
      metaDescription:
        "We're experiencing a server issue. Please try again later or contact support if the problem persists. Beryx is here to help.",
      metaURL: 'https://beryx.io/500',
    },
    [PAGES.INTERACT]: {
      ...defaultMeta,
      metaTitle: 'Interact with Filecoin Smart Contracts | Beryx',
      metaDescription:
        'Easily interact with Filecoin smart contracts using Beryx. A user-friendly interface for executing and testing smart contracts.',
      metaURL: 'https://beryx.io/interact',
      metaImage: 'https://beryx.io/interact.png',
    },
    [PAGES.ESTIMATE_GAS]: {
      ...defaultMeta,
      metaTitle: 'Gas Estimator: Optimize Your Transactions | Beryx',
      metaDescription:
        'Estimate gas costs for your Filecoin transactions with Beryx Gas Estimator. Optimize spending and improve transaction efficiency.',
      metaURL: 'https://beryx.io/estimate_gas',
      metaImage: 'https://beryx.io/estimate.png',
    },
    [PAGES.TERMS_OF_SERVICE]: {
      ...defaultMeta,
      metaTitle: 'Terms of Service | Beryx',
      metaDescription:
        'Understand the terms and conditions for using Beryx. Our commitment to transparency and user trust outlined in our Terms of Service.',
      metaURL: 'https://beryx.io/terms-of-service',
    },
    [PAGES.CHANGELOG]: {
      ...defaultMeta,
      metaTitle: 'Changelog: Stay Updated with New Features | Beryx',
      metaDescription:
        'Discover the latest updates, improvements, and new features on Beryx. Our changelog keeps you informed about our continuous development.',
      metaURL: 'https://beryx.io/changelog',
      metaImage: 'https://beryx.io/changelog.png',
    },
    [PAGES.RESOURCES]: {
      ...defaultMeta,
      metaTitle: 'Resources: Find the most relevant resources for Filecoin | Beryx',
      metaDescription:
        'Find the most relevant resources for Filecoin like documentation, events and social media. Beryx Resources is a collection of resources that are relevant to the Filecoin network.',
    },
    [PAGES.TOKENS]: {
      ...defaultMeta,
      metaTitle: 'Tokens: Explore Filecoin ERC20 Tokens | Beryx',
      metaDescription: 'Discover Filecoin ERC20 token details, including creation date, total supply, holders count, and more.',
      metaURL: 'https://beryx.zondax.ch/tokens',
      metaImage: 'https://beryx.zondax.ch/tokens.png',
    },
  }

  return pageMeta[page] || defaultMeta
}

/**
 * This function is used to fetch the metadata for a transaction identified by its id and network. It then stores the result in the store with the appropriate loading status.
 * @param id - The unique identifier of the transaction
 * @param tx_network - The type of the network; it can be 'mainnet', 'testnet' or 'calibration'
 */
export const fetchMetadata = async (id: string, tx_network: NetworkType) => {
  try {
    useSearchStore.getState().setSearchResultMetadata({ loadingStatus: LoadingStatus.Loading, data: undefined })

    const res = await fetchTransactionDetails(id, tx_network)
    if (res !== 'error' && res?.tx_metadata) {
      useSearchStore.getState().setSearchResultMetadata({ loadingStatus: LoadingStatus.Success, data: res.tx_metadata })
    } else {
      useSearchStore.getState().setSearchResultMetadata({ loadingStatus: LoadingStatus.Error, data: undefined })
    }
  } catch {
    useSearchStore.getState().setSearchResultMetadata({ loadingStatus: LoadingStatus.Error, data: undefined })
  }
}

/**
 * This function generates a custom message inviting users to explore more based on the type and value provided.
 * @param type - The type of the object (e.g., address, tx, height, etc.)
 * @param value - The value associated with the type.
 * @returns A custom message styled as a website metadata description.
 */
export const getMetadataDescriptionForItem = (type: string, value: string, network: string): string => {
  switch (type.toLowerCase()) {
    case 'address':
      return `View address ${value} in Filecoin ${network}. Find balance, ator type, Ethereum address or mempool activity. Analyze statistics including gas consumption, contract creates or invokes.`

    case 'txs':
    case 'tx':
    case 'transactions':
    case 'transaction':
      return `Check transaction details for ${value} in Filecoin ${network}, such as status, tipset height, transaction method, amount of gas used, metadata, transaction logs and internal messages.`

    case 'tipset':
      return `Inspect the tipset ${value} in Filecoin ${network}. Get insights into its composition and related transactions, view parent tipset, CID and blocks.`

    case 'block':
    case 'block-cid':
      return `Review the block with CID ${value} in Filecoin ${network} and see block miner, tipset height, filter transactions, and find its place in the chain.`

    default:
      return `Explore ${value} in Filecoin blockchain. Beryx is a platform developed by Zondax that includes public historical data, streaming data and metrics.`
  }
}
