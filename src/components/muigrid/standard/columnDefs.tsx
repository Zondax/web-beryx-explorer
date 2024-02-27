import { TABLE_TYPE, columnDefsNormal, treeColumnDef } from '@/config/tables'
import { GridColDef } from '@mui/x-data-grid'

/**
 * Function to create column definitions
 * @param [searchType] - The type of table to search
 * @param [isInfiniteTable] - Whether the table is infinite
 * @returns An array of column definitions
 */
export const createColumnDefs = (searchType?: TABLE_TYPE, isInfiniteTable?: boolean, treeTable?: boolean): GridColDef[] => {
  const columnsDef: GridColDef[] = []
  if (treeTable) {
    columnsDef.push(treeColumnDef as GridColDef)
  }
  columnsDef.push(
    ...columnDefsNormal[searchType as keyof typeof columnDefsNormal].map(colDef => {
      const { sortable = true, filterable = true } = colDef
      return {
        ...colDef,
        sortable: isInfiniteTable ? !isInfiniteTable : sortable,
        filterable: isInfiniteTable ? !isInfiniteTable : filterable,
      } as GridColDef
    })
  )
  return columnsDef
}
