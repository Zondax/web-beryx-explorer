import axios from 'axios'
import Head from 'next/head'

import { fetchTransactionDetails } from '@/api-client/beryx'
import { LoadingStatus, beryxExplorerVersion } from '@/config/config'
import { NetworkType } from '@/config/networks'
import { useSearchStore } from '@/store/data/search'
import { captureException } from '@sentry/nextjs'

import { PAGES } from '../../components/Layout/components/Sidebar'
import { LinkCardProps } from '../../components/common/LinkCard'

interface MetaDataProps {
  metaTitle: string
  metaDescription: string
  metaImage: string
  metaURL: string
}
interface MetaTagsProps {
  metaData: MetaDataProps
  type?: 'website' | 'article'
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
export const metaTags = ({ metaData, type = 'website' }: MetaTagsProps) => {
  return (
    <Head>
      <title>{metaData.metaTitle}</title>

      {/* <!-- Primary Meta Tags --> */}
      <meta key="meta title" name="title" content={metaData.metaTitle} />
      <meta key="meta description" name="description" content={sanitizeDescription(metaData.metaDescription)} />

      {/* <!-- Open Graph / Facebook --> */}
      <meta key="og type" property="og:type" content={type} />
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
      linksMetaData.push(metaData)
    }
  }

  return linksMetaData
}

/**
 * This function returns metadata of a page.
 * @param page - The name of the page
 * @returns An object containing the metadata of the page
 */
export function getPageMetaData(page: PAGES) {
  const defaultMeta = {
    metaTitle: 'Beryx',
    metaDescription:
      'Beryx is a platform developed by Zondax that includes public historical data, streaming data and metrics for Filecoin blockchain.',
    metaImage: 'https://beryx.zondax.ch/beryx-og.png',
    metaURL: 'https://beryx.zondax.ch',
  }

  const pageMeta = {
    [PAGES.HOME]: defaultMeta,
    [PAGES.EXPLORE]: {
      ...defaultMeta,
      metaTitle: 'Beryx - Explorer',
    },
    [PAGES.LEADERBOARD]: {
      ...defaultMeta,
      metaTitle: 'Beryx - Leaderboard',
      metaURL: 'https://beryx.zondax.ch/leaderboard',
    },
    [PAGES.DASHBOARD]: {
      ...defaultMeta,
      metaTitle: 'Beryx - Dashboard',
      metaURL: 'https://beryx.zondax.ch/dashboard',
    },
    [PAGES.MEMPOOL]: {
      ...defaultMeta,
      metaTitle: 'Beryx - Mempool',
      metaURL: `https://beryx.zondax.ch/${beryxExplorerVersion}/mempool`,
    },
    [PAGES.FAUCET]: {
      ...defaultMeta,
      metaTitle: 'Beryx - Faucet',
      metaURL: 'https://beryx.zondax.ch/faucet',
    },
    [PAGES.ADDRESS_CONVERTER]: {
      ...defaultMeta,
      metaTitle: 'Beryx - Address Converter',
      metaURL: 'https://beryx.zondax.ch/address-converter',
    },
    [PAGES.CONTRACT_VERIFIER]: {
      ...defaultMeta,
      metaTitle: 'Beryx - Contract Verifier',
      metaURL: 'https://beryx.zondax.ch/contract-verifier',
    },
    [PAGES.RPC]: {
      ...defaultMeta,
      metaTitle: 'Beryx - Calibration Public RPC Node',
      metaURL: 'https://beryx.zondax.ch/rpc',
    },
    [PAGES.RECENT_ACTIVITY]: {
      ...defaultMeta,
      metaTitle: 'Beryx - Recent Activity',
      metaURL: 'https://beryx.zondax.ch/recent-activity',
    },
    [PAGES.NOT_FOUND]: {
      ...defaultMeta,
      metaTitle: 'Beryx - 404',
      metaURL: 'https://beryx.zondax.ch/404',
    },
    [PAGES.INTERACT]: {
      ...defaultMeta,
      metaTitle: 'Beryx - Interact with Smart Contracts',
      metaURL: 'https://beryx.zondax.ch/interact',
    },
    [PAGES.ESTIMATE_GAS]: {
      ...defaultMeta,
      metaTitle: 'Beryx - Gas Estimator',
      metaURL: 'https://beryx.zondax.ch/estimate_gas',
    },
    [PAGES.TERMS_OF_SERVICE]: {
      ...defaultMeta,
      metaTitle: 'Beryx - Terms of Service',
      metaURL: 'https://beryx.zondax.ch/terms-of-service',
    },
    [PAGES.CHANGELOG]: {
      ...defaultMeta,
      metaTitle: 'Beryx - Changelog',
      metaURL: 'https://beryx.zondax.ch/changelog',
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
