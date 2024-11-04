import BigNumber from 'bignumber.js'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { LoadingStatus, amountFormat } from '@/config/config'
import { useTransactions } from '@/data/beryx'
import { ObjectType } from '@/routes/parsing'
import { useSearchStore } from '@/store/data/search'
import { newDateFormat } from '@/utils/dates'
import { Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material'

import { LevelFilter } from 'components/widgets/SearchTables/config'

import BeryxLink from '../../../../../common/BeryxLink'
import OverviewItem from './OverviewItem'

/**
 * BlockOverview is a functional component that renders the overview of a block.
 * It uses several hooks to fetch the necessary data and then maps over the data to render each item in the overview.
 *
 * @returns A fragment containing the mapped overview items.
 */
const BlockOverview = () => {
  const theme = useTheme()
  const upMd = useMediaQuery(theme.breakpoints.up('md'))
  const { t } = useTranslation()

  const searchValue = useSearchStore(s => s.searchInputValue)
  const searchType = useSearchStore(s => s.searchType)
  const inputType = useSearchStore(s => s.searchInputType)
  const searchNetwork = useSearchStore(s => s.searchInputNetwork)
  const jsonLoadingStatus = useSearchStore(s => s.searchResult.jsonLoadingStatus)
  const searchResultJson = useSearchStore(s => s.searchResult.json)

  const miner = useMemo(() => {
    const result = searchResultJson?.blocks_info.find(({ BlockCid }: { BlockCid: string }) => BlockCid === searchValue)
    return result?.Miner
  }, [searchResultJson, searchValue])

  const queryParameters = useMemo(
    () => ({
      input: searchValue,
      network: searchNetwork,
      inputType,
      objectType: searchType,
      method: undefined,
      level: 'main' as LevelFilter,
      evm: false,
      sort: undefined,
      page: { page: 1 },
    }),
    [searchValue, searchNetwork, searchType, inputType]
  )

  /**
   * Request the transactions to get the total number of transactions
   */
  const { data: txsResult, isSuccess: isSuccessTxsResult, isLoading: isLoadingTxsResult } = useTransactions(queryParameters)

  /**
   * The data for the overview items.
   */
  const overviewItemsData = [
    {
      isLoading: false,
      label: t('Block ID'),
      description: undefined,
      content: (
        <BeryxLink
          limitCharacters={upMd ? 0 : undefined}
          disableTooltip
          inputType={ObjectType.TIPSET}
          network={searchNetwork}
          value={searchValue}
          isColored
        />
      ),
      icon: undefined,
    },
    {
      isLoading: jsonLoadingStatus === LoadingStatus.Loading,
      label: t('Tipset Height'),
      description: undefined,
      content: (
        <BeryxLink
          limitCharacters={upMd ? 0 : undefined}
          disableTooltip
          inputType={ObjectType.TIPSET}
          network={searchNetwork}
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
          network={searchNetwork}
          value={searchResultJson?.tipset_cid}
          isColored
        />
      ) : undefined,
      icon: undefined,
    },
    {
      isLoading: jsonLoadingStatus === LoadingStatus.Loading,
      label: t('Miner'),
      description: undefined,
      content: miner ? (
        <BeryxLink limitCharacters={'auto'} disableTooltip inputType={ObjectType.ADDRESS} network={searchNetwork} value={miner} isColored />
      ) : undefined,
      icon: undefined,
    },
    {
      isLoading: jsonLoadingStatus === LoadingStatus.Loading,
      label: t('Time'),
      description: t('Indicates the timestamp or time at which the block occurred'),
      content: searchResultJson?.timestamp ? (
        <Tooltip title={`${newDateFormat(searchResultJson.timestamp, 'UTC', true)}`} arrow disableInteractive>
          <Typography variant="caption">{`${newDateFormat(searchResultJson.timestamp, undefined, false)}`}</Typography>
        </Tooltip>
      ) : undefined,
      icon: undefined,
    },
    {
      isLoading: isLoadingTxsResult,
      label: t('Number of Transactions'),
      description: t('Specifies the total count of transactions within the block. Internal messages are excluded from this count.'),
      content: isSuccessTxsResult && txsResult?.total_txs ? BigNumber(txsResult.total_txs).toFormat(0, amountFormat) : '-',
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

export default BlockOverview
