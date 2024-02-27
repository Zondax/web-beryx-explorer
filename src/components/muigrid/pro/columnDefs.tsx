import { TABLE_TYPE, columnDefsNormal } from '@/config/tables'
import { GridColDef } from '@mui/x-data-grid-pro'

/**
 * Function to create column definitions of data grid pro.
 * @param [searchType] - The type of table to search
 * @param [isInfiniteTable] - Whether the table is infinite
 * @returns An array of column definitions
 */
export const createColumnDefs = (searchType?: TABLE_TYPE, isInfiniteTable?: boolean): GridColDef[] => {
  return columnDefsNormal[searchType as keyof typeof columnDefsNormal].map(colDef => {
    const { sortable = true, filterable = true } = colDef
    return {
      ...colDef,
      sortable: isInfiniteTable ? !isInfiniteTable : sortable,
      filterable: isInfiniteTable ? !isInfiniteTable : filterable,
      resizable: true,
    } as GridColDef
  })
}
