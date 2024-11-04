import { TABLE_TYPE } from '@/config/tables'
import { useRichList } from '@/data/beryx'
import useAppSettingsStore from '@/store/ui/settings'

import Table from 'components/widgets/Table'

/**
 * RichestContracts Component.
 * @returns RichestContracts component
 */
const RichestContracts = () => {
  const { network } = useAppSettingsStore(state => ({ network: state.network }))
  const { data: richList, isLoading: richListIsLoading } = useRichList(network, 'evm')

  return (
    <Table
      key="list of richest contracts on the blockchain"
      rowData={richList?.results ?? []}
      hideBorder
      mode="normal"
      tableType={TABLE_TYPE.RICHEST_CONTRACTS}
      disableColumnFilter
      disableColumnReorder
      loading={richListIsLoading}
      rowWatch
    />
  )
}

export default RichestContracts
