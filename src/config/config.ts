import { TFunction } from 'i18next'

import { ObjectType } from '@/routes/parsing'
import { CategoryItem } from '@porscheofficial/cookie-consent-banner/dist/types/components/cookie-consent-banner/types'

/**
 * @enum dataType
 * @description Enum for data types.
 */
export enum dataType {
  address = 'address',
  height = 'height',
  hash = 'hash',
}

/**
 * @enum inputType
 * @description Enum for input types.
 */
export enum InputType {
  FILECOIN_ADDRESS = 'filecoin_address',
  ETHEREUM_ID = 'ethereum_id',
  HEIGHT = 'height',
  HASH = 'hash',
  UNKNOWN = 'unknown',
}
export type BeryxInputTypes = 'address' | 'height' | 'hash' | 'block-cid'

/**
 * @enum inputType
 * @description Enum for input types.
 */
export const beryxInputType: { [key in ObjectType]: BeryxInputTypes } = {
  contract: 'address',
  address: 'address',
  tipset: 'height',
  txs: 'hash',
  'block-cid': 'block-cid',
  unknown: 'hash',
}

/**
 * @enum chainDecimals
 * @description Enum for chain decimals.
 */
export enum chainDecimals {
  filecoin = 18,
}

/**
 * @constant cookieAuthExpirationInSeconds
 * @description Cookie authentication token expiration time in seconds.
 */
export const cookieAuthExpirationInSeconds = 12 * 3600

/**
 * @constant cookieAuthTokenName
 * @description Name of the cookie authentication token.
 */
export const cookieAuthTokenName = 'beryxAuthToken'

/**
 * @constant amountFormat
 * @description Big Number amount format.
 */
export const amountFormat = {
  prefix: '',
  decimalSeparator: '.',
  groupSeparator: ' ',
  groupSize: 3,
  secondaryGroupSize: 0,
  fractionGroupSeparator: ' ',
  fractionGroupSize: 0,
  suffix: '',
}

/**
 * @constant currentApiVersion
 * @description Current API version.
 */
export const currentApiVersion = 'v3'

/**
 * @typedef BeryxUrl
 * @description Type for chain agnostic URL.
 */
export type BeryxUrl = {
  data: string
  tools: string
  stats: string
  node: string
  backend: string
  faucet: string
  baseApiUrl: string
  baseProtectedApiUrl: string
}

/**
 * @function getBeryxUrl
 * @description Function to get chain agnostic URL.
 * @param chainSlug - Chain slug.
 * @param networkName - Network name.
 * @returns - Chain agnostic URL.
 */
export const getBeryxUrl = (chainSlug: string, networkName: string): BeryxUrl => {
  return {
    data: `https://api.zondax.ch/${chainSlug}/data/${currentApiVersion}/${networkName}`,
    tools: `https://api.zondax.ch/${chainSlug}/tools/${currentApiVersion}/${networkName}`,
    stats: `https://api.zondax.ch/${chainSlug}/stats/${currentApiVersion}/${networkName}`,
    node: `https://api.zondax.ch/${chainSlug}/node/${networkName}/rpc/v1`,
    backend: `https://api.zondax.ch/${chainSlug}/decoder/v3/${networkName}`,
    faucet: `https://api.zondax.ch/${chainSlug}/faucet/${networkName}`,
    baseApiUrl: 'https://api.zondax.ch',
    baseProtectedApiUrl: 'https://protected-api.zondax.ch',
  }
}

export enum servicePaths {
  getBeryxApiToken = '/auth/token',
}

/**
 * @function ConsentAvailableCategories
 * @description Function to get available consent categories.
 * @param t - Translation function.
 * @returns - Array of category items.
 */
export const ConsentAvailableCategories = (t: TFunction<'translation', undefined>): CategoryItem[] => [
  {
    key: 'technical',
    description: t('Required for this service to properly run'),
    label: t('Technical'),
    isMandatory: true,
  },
  {
    key: 'analytics',
    description: t('Help us to improve your experience!'),
    label: t('Analysis cookies'),
  },
]

/**
 * @constant developerResources
 * @description Array of developer resources URLs.
 */
export const developerResources: string[] = [
  'https://github.com/filecoin-project/filecoin-solidity',
  'https://ethindia.co',
  'https://www.npmjs.com/package/@zondax/beryx',
  'https://fvm.filecoin.io/',
  'https://github.com/filecoin-project/awesome-filecoin/tree/main',
]

/**
 * @constant eventLinks
 * @description Array of event links.
 */
export const eventLinks: string[] = ['https://fil-bangalore.io', 'https://ethindia.co']

/**
 * @constant CMSRevalidationPeriodInSeconds
 * @description CMS revalidation period in seconds.
 */
export const CMSRevalidationPeriodInSeconds = 120

/**
 * @constant GoogleAnalyticsTrackingId
 * @description Google Analytics tracking ID.
 */
export const GoogleAnalyticsTrackingId = process.env.NEXT_PUBLIC_GA_TRACKING_ID
/**
 * @constant GoogleTagManagerTrackingId
 * @description Google Tag Manager tracking ID.
 */
export const GoogleTagManagerTrackingId = process.env.NEXT_PUBLIC_GTM_TRACKING_ID

/**
 * @constant MarkerIO_ID
 * @description Marker.io ID.
 */
export const MarkerIO_ID = '63c94edd11d6e78036d5eeb3'

/**
 * @constant CloudflareTurnstileSiteKey
 * @description Cloudflare Turnstile site key.
 */
export const CloudflareTurnstileSiteKey: string = process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY ?? ''
/**
 * @constant CloudflareTurnstileSecretKey
 * @description Cloudflare Turnstile secret key.
 */
export const CloudflareTurnstileSecretKey: string = process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY ?? ''

/**
 * @constant truncateMaxCharacters
 * @description Maximum characters for truncation.
 */
export const truncateMaxCharacters = 16

/**
 * @constant MuiDataGridProLicense
 * @description MUI Data Grid Pro license.
 */
export const MuiDataGridProLicense = process.env.NEXT_PUBLIC_MUI_GRID_LICENSE

/**
 * @constant languageMap
 * @description Map of languages.
 */
export const languageMap = {
  en: 'English',
  es: 'Español',
}

/**
 * @constant timezoneMap
 * @description Map of timezones.
 */
export const timezoneMap = {
  user: 'User Timezone',
  utc: 'UTC',
}

/**
 * Language
 * @description Type for language.
 */
export type Language = keyof typeof languageMap
/**
 * Timezone
 * @description Type for timezone.
 */
export type Timezone = keyof typeof timezoneMap

/**
 * @enum LoadingStatus
 * @description Enum for loading status.
 */
export enum LoadingStatus {
  Idle = 'idle', // Initial state
  Loading = 'loading', // Data is being fetched
  Success = 'success', // Data was successfully fetched
  Error = 'error', // An error occurred while fetching data
}

/**
 * @constant beryxExplorerVersion
 * @description Beryx Explorer version.
 */
export const beryxExplorerVersion = 'v1'

/**
 * frequencyType
 * @description Type for frequency.
 */
export type FrequencyType = 'hourly' | 'daily' | 'weekly' | 'monthly'
