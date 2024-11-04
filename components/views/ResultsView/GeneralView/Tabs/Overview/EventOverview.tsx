import BigNumber from 'bignumber.js'
import { useTranslation } from 'react-i18next'

import { LoadingStatus, amountFormat } from '@/config/config'
import { useEventsBySelector } from '@/data/beryx'
import { ObjectType } from '@/routes/parsing'
import { useSearchStore } from '@/store/data/search'
import { useMediaQuery, useTheme } from '@mui/material'

import { ActorTypeLabel } from 'components/common'

import BeryxLink from '../../../../../common/BeryxLink'
import OverviewItem from './OverviewItem'

/**
 * EventOverview is a functional component that renders the overview of an event.
 * It uses several hooks to fetch the necessary data and then maps over the data to render each item in the overview.
 *
 * @returns A fragment containing the mapped overview items.
 */
const EventOverview = () => {
  const theme = useTheme()
  const upMd = useMediaQuery(theme.breakpoints.up('md'))
  const { t } = useTranslation()

  const searchValue = useSearchStore(s => s.searchInputValue)
  const searchNetwork = useSearchStore(s => s.searchInputNetwork)
  const jsonLoadingStatus = useSearchStore(s => s.searchResult.jsonLoadingStatus)
  const searchResultJson = useSearchStore(s => s.searchResult.json)

  /**
   * Request the transactions to get the total number of transactions
   */
  const {
    data: eventsResult,
    isSuccess: isSuccessEventsResult,
    isLoading: isLoadingEventsResult,
  } = useEventsBySelector(searchValue, searchNetwork)

  /**
   * The data for the overview items.
   */
  const overviewItemsData = [
    {
      isLoading: false,
      label: t('Type'),
      description: undefined,
      content: searchResultJson ? <ActorTypeLabel label={searchResultJson.type ?? '-'} level={0} /> : '-',
      icon: undefined,
    },
    {
      isLoading: jsonLoadingStatus === LoadingStatus.Loading,
      label: t('Selector ID'),
      description: undefined,
      content: searchResultJson?.selector_id ? (
        <BeryxLink
          limitCharacters={upMd ? 0 : undefined}
          disableTooltip
          inputType={ObjectType.EVENT}
          network={searchNetwork}
          value={searchResultJson.selector_id}
          isColored
        />
      ) : (
        '-'
      ),
      icon: undefined,
    },
    {
      isLoading: jsonLoadingStatus === LoadingStatus.Loading,
      label: t('Signature'),
      description: undefined,
      content: searchResultJson?.selector_sig ? (
        <BeryxLink
          limitCharacters={upMd ? 0 : undefined}
          disableTooltip
          inputType={ObjectType.TIPSET}
          network={searchNetwork}
          value={searchResultJson.selector_sig}
          isColored
          disableLink
        />
      ) : (
        '-'
      ),
      icon: undefined,
    },
    {
      isLoading: isLoadingEventsResult,
      label: t('Number of Events'),
      description: t('Specifies the total count of events with this selector id.'),
      content: isSuccessEventsResult && eventsResult?.total_items ? BigNumber(eventsResult.total_items).toFormat(0, amountFormat) : '-',
      icon: undefined,
    },
  ]

  return (
    <>
      {overviewItemsData.map(item => {
        return (
          <OverviewItem
            key={`${item.label}-${item.description}`}
            isLoading={item.isLoading}
            label={item.label}
            description={item.description}
            content={item.content}
            icon={item.icon}
          />
        )
      })}
    </>
  )
}

export default EventOverview
