/**
 * This component renders a table tile.
 *
 * @component
 * @param props The component properties.
 * @param props.data An array containing the table's data.
 * @param props.type Type of the table.
 *
 * @returns The component's rendered elements.
 */
import { useCallback } from 'react'

import { createColumnDefs } from '@/components/muigrid/standard/columnDefs'
import { TABLE_TYPE } from '@/config/tables'
import { Box, LinearProgress } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

import { NoRows } from '../Table'

const TableTile = ({ data, type }: { data: any[]; type?: TABLE_TYPE }) => {
  /**
   * This variable holds column definition data.
   * @type {Array<GridColDef>}
   */
  const columnDefs: GridColDef[] = createColumnDefs(type)

  const getRowClassName = useCallback(() => 'simple-row', [])
  const getRowHeight = useCallback(() => 30, [])

  return (
    <Box display={'flex'} alignSelf={'flex-start !important'} height={'calc(100% - 4rem)'} width={'100%'} alignItems={'flex-start'}>
      <DataGrid
        disableDensitySelector
        getRowHeight={getRowHeight}
        density={'compact'}
        columnHeaderHeight={40}
        getRowClassName={getRowClassName}
        columns={columnDefs}
        rows={data}
        loading={false}
        slots={{
          loadingOverlay: LinearProgress,
          noResultsOverlay: () => <NoRows position={'center'} />,
          noRowsOverlay: () => <NoRows position={'inherit'} />,
        }}
        disableColumnFilter
        hideFooter
      />
    </Box>
  )
}

export default TableTile
