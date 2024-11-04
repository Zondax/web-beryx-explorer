import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'

import { createColumnDefs } from '@/components/muigrid/pro/columnDefs'
import { TABLE_TYPE } from '@/config/tables'
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
import { Box, LinearProgress, Pagination, TablePaginationProps, styled, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import {
  DataGridPro,
  DataGridProProps,
  GridColDef,
  GridEventListener,
  GridPagination,
  GridRowClassNameParams,
  GridRowSpacingParams,
  gridPageCountSelector,
  useGridApiContext,
  useGridApiRef,
  useGridSelector,
} from '@mui/x-data-grid-pro'

import NoRows from './NoRows'
import Toolbar from './Toolbar'
import { TableProps } from './types'

/**
 * Styled Box Component
 */
const StyledBox = styled(Box)({
  '& .font-clickable': {
    color: 'rgb(73, 132, 220)',
  },
  '& .font-transparent ': {
    opacity: 0.35,
  },
})

/**
 * Pagination Component
 * @returns The rendered Pagination component
 */
function PaginationComponent({ page, onPageChange, className }: Pick<TablePaginationProps, 'page' | 'onPageChange' | 'className'>) {
  const apiRef = useGridApiContext()
  const pageCount = useGridSelector(apiRef, gridPageCountSelector)

  const handlePaginationChange = useCallback(
    (event: ChangeEvent<unknown>, newPage: number) => {
      onPageChange(event as any, newPage - 1)
    },
    [onPageChange]
  )

  return <Pagination className={className} count={pageCount} page={page + 1} onChange={handlePaginationChange} />
}

/**
 * Grid Pagination
 * @returns The rendered Grid Pagination component
 */
function CustomPagination() {
  return <GridPagination ActionsComponent={PaginationComponent} />
}

/**
 * Custom Row Selected
 * @returns The rendered Custom Row Selected component
 */
function CustomRowSelected() {
  return null
}

/**
 * ProTable Component - it is related to the pro version of mui table.
 * @param props - The props object
 * @returns The rendered Table component
 */
const ProTable = ({
  rowData,
  tableType,
  onRowsScrollEnd,
  handleRowFocusChange,
  treeData,
  fixedHeight,
  getRowClassName: getRowClassNameProp,
  loading,
  title,
  filters,
  setFilters,
  noRowsText,
  noRowsIcon,
  noRowsPosition,
  paginationMode,
  serverPagination,
  disableColumnFilter,
  hideFooter,
  noBorderRadius,
  pageSizeOptions,
  paginationModel,
  setPaginationModel,
  getDetailPanelContent,
  sortModel,
  sortingMode,
  onSortModelChange,
  selectedRowIndex,
  toolbar,
  getRowId,
  detailPanelExpandedRowIds,
  onDetailPanelExpandedRowIdsChange,
}: TableProps) => {
  const apiRef = useGridApiRef()
  const theme = useTheme()
  const upMd = useMediaQuery(theme.breakpoints.up('md'))

  const [defaultPaginationModel, setDefaultPaginationModel] = useState({
    page: 0,
    pageSize: 50,
  })

  const defaultPageSizeOptions = [defaultPaginationModel.pageSize]
  const columnDefs: GridColDef[] = createColumnDefs(tableType, Boolean(onRowsScrollEnd))

  const rowDataWithId = useMemo(() => {
    if (rowData === undefined) {
      return []
    }

    if (getRowId) {
      return rowData
    }

    return rowData.map((elem: { id?: string }, index: number) => {
      if (!elem.id) {
        return { ...elem, id: index.toString() }
      }
      return elem
    })
  }, [rowData, getRowId])

  /**
   * @description Event handler for key up event on a cell
   */
  const handleEvent = useCallback<GridEventListener<'cellKeyUp'>>(
    params => {
      apiRef.current.selectRow(params.id, true, true)

      if (handleRowFocusChange) {
        handleRowFocusChange(params.id)
      }
    },
    [apiRef, handleRowFocusChange]
  )

  /**
   * @description Definition for the grouping column
   */
  const groupingColDef: DataGridProProps['groupingColDef'] = {
    headerName: '',
    maxWidth: 45,
    flex: 1,
    valueFormatter: () => '',
  }

  /**
   * @description Function to get the class name for a row
   * @param row - The row data
   * @returns The class name
   */
  const getClassName = useCallback(
    (row: any) => {
      const columns = Object.keys(row)
      if (columns.length === 0 || !columns.includes('level') || !treeData) {
        return 'parent-row'
      }

      if (row.tx_type !== 'Fee' && row.level === 0) {
        return 'parent-row'
      }

      if (row.tx_type !== 'Fee' && row.path.length === 1 && row.level !== 0) {
        return 'alone-child-row'
      }

      return 'child-row'
    },
    [treeData]
  )

  /**
   * @description Function to get the class name for a row
   * @returns The class name
   */
  const getRowClassName = useCallback(
    (params: GridRowClassNameParams) => {
      return getClassName(params.row)
    },
    [getClassName]
  )

  /**
   * @description Function to get the spacing for a row
   * @param params - The parameters of the row
   */
  const getRowSpacing = useCallback(
    (params: GridRowSpacingParams) => {
      const className = getClassName(params.model)

      return {
        top: ['parent-row', 'alone-child-row'].includes(className) ? 8 : 0,
        bottom: params.isLastVisible ? 8 : 0,
      }
    },
    [getClassName]
  )

  /**
   * @description Event handler for focus in event on a cell
   */
  const handleRowFocus: GridEventListener<'cellFocusIn'> = useCallback(
    params => {
      if (handleRowFocusChange) {
        handleRowFocusChange(params.id)
      }
    },
    [handleRowFocusChange]
  )

  /**
   * @description Function to get the height for a row
   * @returns The height for the row
   */
  const getRowHeight = useCallback(() => {
    if (tableType === TABLE_TYPE.TIPSETS) {
      return 'auto'
    }
    if (upMd) {
      return 40
    }
    return 42
  }, [tableType, upMd])

  const getDetailPanelHeight = useCallback<NonNullable<DataGridProProps['getDetailPanelHeight']>>(() => 'auto' as const, [])

  /**
   * @function useEffect
   * @description This effect sets the keyboard focus on the table. If no row is selected and there are rows in the table, it selects the first row and triggers the handleRowFocusChange event. It checks the condition every second.
   * @returns
   */
  useEffect(() => {
    /**
     * @function setKeyboardFocus
     * @description This function selects the first row in the table and triggers the handleRowFocusChange event.
     * @returns
     */
    const setKeyboardFocus = () => {
      const api = apiRef?.current
      const defaultIndexRow = selectedRowIndex ?? 0
      if (api?.getAllColumns() && api?.getAllRowIds()) {
        apiRef.current.selectRow(defaultIndexRow, true, true)
        if (handleRowFocusChange) {
          handleRowFocusChange(defaultIndexRow)
        }
      }
    }
    /**
     * @function interval
     * @description This function checks every second if no row is selected and there are rows in the table. If so, it calls the setKeyboardFocus function.
     * @returns
     */
    const interval = setTimeout(() => {
      if (apiRef?.current.getSelectedRows().size === 0 && apiRef?.current.getAllRowIds().length !== 0) {
        setKeyboardFocus()
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [apiRef, rowDataWithId, tableType, handleRowFocusChange, selectedRowIndex])

  useEffect(() => {
    apiRef.current.subscribeEvent('cellKeyUp', handleEvent)
  }, [apiRef, handleEvent])

  const renderToolbar = useCallback(() => Toolbar({ title, filters, setFilters }), [title, filters, setFilters])
  const renderNoResultsOverlay = useCallback(
    () => <NoRows text={noRowsText} icon={noRowsIcon} position={noRowsPosition} />,
    [noRowsText, noRowsIcon, noRowsPosition]
  )

  const renderPagination = useCallback(() => {
    if (paginationMode === 'server' && serverPagination) {
      return serverPagination
    }

    return <CustomPagination />
  }, [paginationMode, serverPagination])

  const getTreeDataPath = useCallback((row: any) => row.path, [])

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.level0,
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: fixedHeight ?? '100%',
        borderRadius: noBorderRadius ? 0 : '12px',
        overflow: 'hidden',
      }}
    >
      <StyledBox sx={{ height: '100%', width: '100%' }} id={`table-${tableType}`}>
        <DataGridPro
          disableDensitySelector
          apiRef={apiRef}
          getRowHeight={getRowHeight}
          density={'compact'}
          columnHeaderHeight={40}
          getRowClassName={getRowClassNameProp ?? getRowClassName}
          columns={columnDefs}
          rows={rowDataWithId}
          onRowClick={handleRowFocus}
          loading={loading}
          slots={{
            detailPanelExpandIcon: KeyboardArrowDown,
            detailPanelCollapseIcon: KeyboardArrowUp,
            toolbar: toolbar ?? renderToolbar,
            loadingOverlay: LinearProgress,
            noResultsOverlay: renderNoResultsOverlay,
            noRowsOverlay: renderNoResultsOverlay,
            pagination: renderPagination,
          }}
          treeData={treeData}
          getTreeDataPath={getTreeDataPath}
          groupingColDef={groupingColDef}
          disableColumnFilter={disableColumnFilter}
          defaultGroupingExpansionDepth={-1}
          hideFooter={hideFooter}
          pagination
          pageSizeOptions={pageSizeOptions ?? defaultPageSizeOptions}
          paginationModel={paginationModel ?? defaultPaginationModel}
          paginationMode={paginationMode === 'server' ? 'server' : 'client'}
          onPaginationModelChange={setPaginationModel ?? setDefaultPaginationModel}
          localeText={{
            footerRowSelected: CustomRowSelected,
          }}
          rowCount={paginationMode === 'server' ? Number.MAX_SAFE_INTEGER : undefined} // a big number, because we don't have this information
          // Detail properties
          getDetailPanelHeight={getDetailPanelContent ? getDetailPanelHeight : undefined}
          getDetailPanelContent={getDetailPanelContent}
          detailPanelExpandedRowIds={detailPanelExpandedRowIds}
          onDetailPanelExpandedRowIdsChange={onDetailPanelExpandedRowIdsChange}
          rowThreshold={0}
          getRowSpacing={getRowSpacing}
          sortModel={sortModel ?? undefined}
          sortingMode={sortingMode ?? 'client'}
          onSortModelChange={onSortModelChange ?? undefined}
          getRowId={getRowId}
        />
      </StyledBox>
    </Box>
  )
}

export default ProTable
