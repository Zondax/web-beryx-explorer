import { MuiDataGridProLicense } from '@/config/config'

import { default as ProTable } from './ProTable'
import { default as StandardTable } from './StandardTable'

/**
 * Conditional export of the Table component based on the MuiDataGridProLicense.
 * If MuiDataGridProLicense is true, it exports the ProTable component; otherwise, it exports the StandardTable component.
 *
 * @module Table
 */
export default MuiDataGridProLicense ? ProTable : StandardTable

/**
 * NoRows Component.
 * A separate export for the NoRows component.
 *
 * @module NoRows
 */
export { default as NoRows } from './NoRows'
