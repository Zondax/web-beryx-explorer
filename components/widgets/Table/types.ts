import { TABLE_TYPE } from '@/config/tables'
import { GridCallbackDetails, GridFeatureMode, GridSortModel } from '@mui/x-data-grid-pro'

import { Filters } from '../SearchTables/config'
import { NoRowsPosition } from './NoRows'

export interface PaginationModel {
  page: number
  pageSize: number
}

/**
 * Type for PaginationMode
 */
export type PaginationMode = 'client' | 'server'

/**
 * Interface for TableProps
 */
export interface TableProps {
  rowData: any[]
  mode: 'normal' | 'dev'
  tableType: TABLE_TYPE
  onRowsScrollEnd?: () => void
  handleRowFocusChange?: (row: any) => void
  fixedHeight?: boolean
  hideBorder?: boolean
  noBorderRadius?: boolean
  getRowClassName?: (row: any) => string
  loading?: boolean
  title?: string
  filters?: Filters
  setFilters?: (filters: Filters) => void
  noRowsText?: string
  noRowsIcon?: JSX.Element
  noRowsPosition?: NoRowsPosition
  paginationMode?: PaginationMode
  serverPagination?: JSX.Element
  hideFooter?: boolean
  pageSizeOptions?: number[]
  paginationModel?: PaginationModel
  setPaginationModel?: (model: PaginationModel) => void
  disableColumnReorder?: boolean
  disableColumnFilter?: boolean
  rowWatch?: boolean
  treeData?: boolean
  sortModel?: GridSortModel
  sortingMode?: GridFeatureMode
  onSortModelChange?: (model: GridSortModel, details: GridCallbackDetails<any>) => void
  collapse?: boolean
  getDetailPanelHeight?: (row: any) => number | 'auto'
  getDetailPanelContent?: (row: any) => JSX.Element
  selectedRowIndex?: number
}
