/**
 * Imports necessary dependencies.
 */
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { LoadingStatus } from '@/config/config'
import { TABLE_TYPE } from '@/config/tables'
import { StatisticsBaseProps } from '@/store/data/mempool'

import Table from 'components/widgets/Table'

/**
 * Mempool table statistics component.
 */
const MempoolTable = ({
  statistics,
  getLoadingStatus,
  selectedRowIndex,
}: {
  statistics?: { [key: string]: StatisticsBaseProps }
  getLoadingStatus: () => LoadingStatus
  selectedRowIndex?: number
}) => {
  const { t } = useTranslation()
  const [selectedRow, setSelectedRow] = useState<number>(0)

  useEffect(() => {
    setSelectedRow(selectedRowIndex ?? 0)
  }, [selectedRowIndex])

  /**
   * Returns a Grid component.
   */
  return (
    <Table
      key="Gas data by method"
      rowData={statistics ? Object.entries(statistics).map(([key, value]) => ({ method_name: key, ...value })) : []}
      hideBorder
      mode="normal"
      tableType={TABLE_TYPE.GAS_STATISTICS_BY_METHOD}
      disableColumnFilter
      disableColumnReorder
      loading={getLoadingStatus() === LoadingStatus.Loading}
      rowWatch
      hideFooter
      title={t('Mempool Stats by Method')}
      selectedRowIndex={selectedRow}
    />
  )
}

export default MempoolTable
