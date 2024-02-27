import { MuiDataGridProLicense } from '@/config/config'
import {
  GridCallbackDetails as GridCallbackDetailsStandard,
  GridFeatureMode as GridFeatureModeStandard,
  GridPagination as GridPaginationStandard,
  GridSortModel as GridSortModelStandard,
  GridToolbarColumnsButton as GridToolbarColumnsButtonStandard,
  GridToolbarContainer as GridToolbarContainerStandard,
  GridToolbarExport as GridToolbarExportStandard,
  GridToolbarFilterButton as GridToolbarFilterButtonStandard,
} from '@mui/x-data-grid'
import {
  GridCallbackDetails as GridCallbackDetailsPro,
  GridControlledStateReasonLookup as GridControlledStateReasonLookupPro,
  GridFeatureMode as GridFeatureModePro,
  GridPagination as GridPaginationPro,
  GridSortModel as GridSortModelPro,
  GridToolbarColumnsButton as GridToolbarColumnsButtonPro,
  GridToolbarContainer as GridToolbarContainerPro,
  GridToolbarExport as GridToolbarExportPro,
  GridToolbarFilterButton as GridToolbarFilterButtonPro,
} from '@mui/x-data-grid-pro'

/**
 * GridToolbarExport is a conditional export based on the MuiDataGridProLicense.
 * It uses GridToolbarExportPro when MuiDataGridProLicense is true, otherwise GridToolbarExportStandard.
 */
export const GridToolbarExport = MuiDataGridProLicense ? GridToolbarExportPro : GridToolbarExportStandard

/**
 * GridToolbarContainer is a conditional export based on the MuiDataGridProLicense.
 * It uses GridToolbarContainerPro when MuiDataGridProLicense is true, otherwise GridToolbarContainerStandard.
 */
export const GridToolbarContainer = MuiDataGridProLicense ? GridToolbarContainerPro : GridToolbarContainerStandard

/**
 * GridToolbarFilterButton is a conditional export based on the MuiDataGridProLicense.
 * It uses GridToolbarFilterButtonPro when MuiDataGridProLicense is true, otherwise GridToolbarFilterButtonStandard.
 */
export const GridToolbarFilterButton = MuiDataGridProLicense ? GridToolbarFilterButtonPro : GridToolbarFilterButtonStandard

/**
 * GridPagination is a conditional export based on the MuiDataGridProLicense.
 * It uses GridPaginationPro when MuiDataGridProLicense is true, otherwise GridPaginationStandard.
 */
export const GridPagination = MuiDataGridProLicense ? GridPaginationPro : GridPaginationStandard

/**
 * GridToolbarColumnsButton is a conditional export based on the MuiDataGridProLicense.
 * It uses GridToolbarColumnsButtonPro when MuiDataGridProLicense is true, otherwise GridToolbarColumnsButtonStandard.
 */
export const GridToolbarColumnsButton = MuiDataGridProLicense ? GridToolbarColumnsButtonPro : GridToolbarColumnsButtonStandard

/**
 * GridSortModel is a type that represents the sorting model in the grid.
 */
export type GridSortModel = GridSortModelStandard | GridSortModelPro

/**
 * GridCallbackDetails represents the callback details for the grid.
 *
 * @typeparam T - Type parameter specifying the key of GridControlledStateReasonLookupPro.
 */
export type GridCallbackDetails<T extends keyof GridControlledStateReasonLookupPro = any> =
  | GridCallbackDetailsStandard<T>
  | GridCallbackDetailsPro<T>

/**
 * GridFeatureMode is a type that represents the feature mode of the grid.
 */
export type GridFeatureMode = GridFeatureModeStandard | GridFeatureModePro
