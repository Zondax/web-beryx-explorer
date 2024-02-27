import { TABLE_TYPE } from '@/config/tables'
import { useRichList } from '@/data/beryx'
import { useAppSettingsStore } from '@/store/ui/settings'

import Table from 'components/widgets/Table'

/**
 * RichList Component.
 * @returns RichList component
 */
const RichList = () => {
  const { network } = useAppSettingsStore(state => ({ network: state.network }))
  const { data: richList, isLoading: richListIsLoading } = useRichList(network)

  return (
    <Table
      key="list of richest addresses on the blockchain"
      rowData={richList?.results ?? []}
      mode="normal"
      tableType={TABLE_TYPE.LEADERBOARD}
      disableColumnFilter
      disableColumnReorder
      loading={richListIsLoading}
      rowWatch
    />
  )
}

export default RichList
