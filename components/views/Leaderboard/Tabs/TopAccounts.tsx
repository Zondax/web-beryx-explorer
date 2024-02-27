import { TABLE_TYPE } from '@/config/tables'
import { useTopAccountsByGasUsed } from '@/data/beryx'
import { useAppSettingsStore } from '@/store/ui/settings'

import Table from 'components/widgets/Table'

/**
 * TopAccounts Component.
 * @returns TopAccounts component
 */
const TopAccounts = () => {
  const { network } = useAppSettingsStore(state => ({ network: state.network }))
  const { data: topAccountsByGasUsed, isLoading: topAccountsByGasUsedIsLoading } = useTopAccountsByGasUsed(network)

  return (
    <Table
      key="list of top accounts on the blockchain"
      rowData={topAccountsByGasUsed?.results ?? []}
      mode="normal"
      tableType={TABLE_TYPE.TOP_ACCOUNTS_BY_GAS_USED}
      disableColumnFilter
      disableColumnReorder
      loading={topAccountsByGasUsedIsLoading}
      rowWatch
    />
  )
}

export default TopAccounts
