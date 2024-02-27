import { TABLE_TYPE } from '@/config/tables'
import { useTopContractsByInvokes } from '@/data/beryx'
import { useAppSettingsStore } from '@/store/ui/settings'

import Table from 'components/widgets/Table'

/**
 * TopContracts Component.
 * @returns TopContracts component
 */
const TopContractsByInvokes = () => {
  const { network } = useAppSettingsStore(state => ({ network: state.network }))
  const { data: topContracts, isLoading: topContractsIsLoading } = useTopContractsByInvokes(network)

  return (
    <Table
      key="list of top contracts by invokes on the blockchain"
      rowData={topContracts?.results ?? []}
      mode="normal"
      tableType={TABLE_TYPE.TOP_CONTRACTS_BY_INVOKES}
      disableColumnFilter
      disableColumnReorder
      loading={topContractsIsLoading}
      rowWatch
    />
  )
}

export default TopContractsByInvokes
