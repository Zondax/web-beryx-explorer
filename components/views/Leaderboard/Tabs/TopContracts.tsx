import { TABLE_TYPE } from '@/config/tables'
import { useTopContracts } from '@/data/beryx'
import useAppSettingsStore from '@/store/ui/settings'

import Table from 'components/widgets/Table'

/**
 * TopContracts Component.
 * @returns TopContracts component
 */
const TopContracts = () => {
  const { network } = useAppSettingsStore(state => ({ network: state.network }))
  const { data: topContracts, isLoading: topContractsIsLoading } = useTopContracts(network)

  return (
    <Table
      key="list of top contracts by unique users on the blockchain"
      rowData={topContracts?.results ?? []}
      mode="normal"
      hideBorder
      tableType={TABLE_TYPE.TOP_CONTRACTS_BY_UNIQUE_USERS}
      disableColumnFilter
      disableColumnReorder
      loading={topContractsIsLoading}
      rowWatch
    />
  )
}

export default TopContracts
