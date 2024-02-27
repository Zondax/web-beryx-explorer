import { TABLE_TYPE } from '@/config/tables'
import { GridCallbackDetails, GridFeatureMode, GridSortModel } from '@mui/x-data-grid-pro'

export interface PaginationModel {
  page: number
  pageSize: number
}

/**
 * Type for NoRowsPosition
 */
export type NoRowsPosition = 'inherit' | 'left' | 'center' | 'right' | 'justify'

/**
 * Type for PaginationMode
 */
export type PaginationMode = 'client' | 'server'

/**
 * An interface containing the optional properties for the NoRows component.
 *
 * @interface NoRowsProps
 * @property text - Text to be displayed. It can be a string or an array of strings.
 * @property icon - Icon to be displayed.
 * @property position - Position of the text and icon.
 */
export interface NoRowsProps {
  text?: string[] | string
  icon?: JSX.Element | null
  position?: NoRowsPosition
}

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
  getRowClassName?: (row: any) => string
  loading?: boolean
  title?: string
  filters?: any
  setFilters?: (filters: any) => void
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
}
