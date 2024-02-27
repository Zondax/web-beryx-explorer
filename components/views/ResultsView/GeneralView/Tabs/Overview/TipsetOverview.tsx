import { useTranslation } from 'react-i18next'

import { LoadingStatus } from '@/config/config'
import { ObjectType } from '@/routes/parsing'
import { useSearchStore } from '@/store/data/search'
import { newDateFormat } from '@/utils/dates'
import { useMediaQuery, useTheme } from '@mui/material'

import BeryxLink from '../../../../../common/BeryxLink'
import BooleanLabel from '../../../../../common/BooleanLabel'
import OverviewItem from './OverviewItem'

/**
 * TipsetOverview is a functional component that renders the overview of a tipset.
 * It uses several hooks to fetch the necessary data and then maps over the data to render each item in the overview.
 *
 * @returns A fragment containing the mapped overview items.
 */
const TipsetOverview = () => {
  /**
   * The search value from the store.
   * @type {string}
   */
  const searchValue: string = useSearchStore(s => s.searchInputValue)

  /**
   * The search result JSON from the store.
   */
  const searchResultJson = useSearchStore(s => s.searchResult.json)

  /**
   * The loading status of the JSON from the store.
   */
  const jsonLoadingStatus = useSearchStore(s => s.searchResult.jsonLoadingStatus)

  /**
   * The network from the store.
   */
  const network = useSearchStore(s => s.searchInputNetwork)

  /**
   * The theme from the useTheme hook.
   */
  const theme = useTheme()

  /**
   * A boolean indicating whether the screen is up medium size.
   */
  const upMd = useMediaQuery(theme.breakpoints.up('md'))

  /**
   * The translation function from the useTranslation hook.
   */
  const { t } = useTranslation()

  /**
   * The data for the overview items.
   */
  const overviewItemsData = [
    {
      isLoading: jsonLoadingStatus === LoadingStatus.Loading,
      label: t('Tipset Height'),
      description: undefined,
      content: (
        <BeryxLink
          limitCharacters={upMd ? 0 : undefined}
          disableTooltip
          inputType={ObjectType.TIPSET}
          network={network}
          value={searchResultJson?.height || searchValue}
          isColored
        />
      ),
      icon: undefined,
    },
    {
      isLoading: jsonLoadingStatus === LoadingStatus.Loading,
      label: t('Tipset CID'),
      description: undefined,
      content: searchResultJson?.tipset_cid ? (
        <BeryxLink
          limitCharacters={'auto'}
          disableTooltip
          inputType={ObjectType.TIPSET}
          network={network}
          value={searchResultJson?.tipset_cid}
          isColored
        />
      ) : undefined,
      icon: undefined,
    },
    {
      isLoading: jsonLoadingStatus === LoadingStatus.Loading,
      label: t('Canonical'),
      description: t('Indicates whether is part of the canonical chain') ?? '',
      content: typeof searchResultJson?.canonical === 'boolean' ? <BooleanLabel value={searchResultJson?.canonical} /> : undefined,
      icon: undefined,
    },
    {
      isLoading: jsonLoadingStatus === LoadingStatus.Loading,
      label: t('Time'),
      description: t('Indicates the timestamp or time at which the tipset occurred') ?? '',
      content: searchResultJson?.timestamp ? newDateFormat(searchResultJson.timestamp, 'UTC', true) : undefined,
      icon: undefined,
    },
    {
      isLoading: jsonLoadingStatus === LoadingStatus.Loading,
      label: t('Parent Tipset CID'),
      description: t('Indicates the CID of the parent tipset') ?? '',
      content: searchResultJson?.parent_tipset_cid ? (
        <BeryxLink
          limitCharacters={'auto'}
          disableTooltip
          inputType={ObjectType.TIPSET}
          network={network}
          value={searchResultJson?.parent_tipset_cid}
          isColored
        />
      ) : undefined,
      icon: undefined,
    },
    {
      isLoading: jsonLoadingStatus === LoadingStatus.Loading,
      label: t('Number of Transactions'),
      description: t('Indicates the total number of transactions in the tipset. Internal messages are not included.') ?? '',
      content: searchResultJson?.total_txs !== undefined ? searchResultJson?.total_txs : undefined,
      icon: undefined,
    },
  ]

  return (
    <>
      {overviewItemsData.map(item => (
        <OverviewItem
          key={`${item.label}-${item.description}`}
          isLoading={item.isLoading}
          label={item.label}
          description={item.description}
          content={item.content}
          icon={item.icon}
        />
      ))}
    </>
  )
}

export default TipsetOverview
