import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { EvmEventDetails } from '@/api-client/beryx.types'

import OverviewItem from 'components/views/ResultsView/GeneralView/Tabs/Overview/OverviewItem'

import OverviewCodeBlockTile from '../OverviewCodeBlockTile'

/**
 * Component properties interface
 * */
interface EthMetadataDetailProps {
  readonly metadata: EvmEventDetails
}

/**
 * The Detail Panel Content component.
 * @param row - data object
 */
function EthMetadataDetail({ metadata }: EthMetadataDetailProps) {
  const { t } = useTranslation()

  const overviewItemsData = useMemo(
    () =>
      [
        { data: metadata.data, label: 'Data' },
        { data: metadata.topics, label: 'Topics' },
      ].map(({ data, label }) => ({
        label: `${t(label)}`,
        description: undefined,
        content: <OverviewCodeBlockTile data={data} label={label} wordWrap={'on'} height={'6.15rem'} />,
        icon: undefined,
        display: true,
      })),
    [metadata, t]
  )

  return overviewItemsData.map(item => {
    if (item.display) {
      return <OverviewItem key={item.label} label={item.label} description={item.description} content={item.content} icon={item.icon} />
    }
    return null
  })
}

export default EthMetadataDetail
