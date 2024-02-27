import { GridColDef } from '@mui/x-data-grid-pro'

import {
  BeryxLinkColumnProps,
  BoxColumnProps,
  GenericColumnProps,
  MinerColumnProps,
  NumberColumnProps,
  RankColumnProps,
  StringColumnProps,
  TimeColumnProps,
  actorTypeColumn,
  amountColumn,
  beryxLinkColumn,
  booleanColumn,
  boxColumn,
  codeViewColumn,
  compilerColumn,
  downloadColumn,
  downloadIpfs,
  licenseColumn,
  mempoolTransactionStatusColumn,
  methodTypeColumn,
  minerColumn,
  numberColumn,
  optimizationColumn,
  percentageRange,
  percentageRangeProps,
  rankColumn,
  stringColumn,
  timeColumn,
  timeSinceColumn,
  transactionDetailsColumn,
  transactionStatusColumn,
  transactionTypeColumn,
  treeColumn,
} from '../standard/columnDefinitions'

/**
 * This function creates a column with a BeryxLink component.
 *
 * @param props - The properties passed to the function
 * @param props.field - The field of the column
 * @param props.label - The label of the column
 * @param props.inputType - The type of input
 * @param [props.disableLink=false] - Whether the link is disabled
 * @param [props.hasCopyButton=true] - Whether the cell has a copy button
 * @param [props.limitCharacters=truncateMaxCharacters] - The limit of characters
 * @param [props.disableLimitCharacters=false] - Whether the limit of characters is disabled
 * @param [props.minWidth=190] - The minimum width of the column
 * @param [props.maxWidth] - The maximum width of the column
 * @param [props.indent=false] - Whether the column is indented
 * @param [props.headerIcon] - The icon of the header
 * @param [props.sortable=false] - Whether the column is sortable
 * @returns A column definition for the grid
 */
export const beryxLinkColumnPro = (props: BeryxLinkColumnProps): GridColDef => {
  return beryxLinkColumn(props) as GridColDef
}

/**
 * MethodTypeColumnPro component
 *
 * @param props - The properties passed to the component
 * @param props.field - The field of the column
 * @param props.label - The label of the column
 * @param props.headerIcon - The icon of the header
 * @param props.sortable - Whether the column is sortable
 * @returns A GridColDef object
 */
export const methodTypeColumnPro = (props: GenericColumnProps): GridColDef => {
  return methodTypeColumn(props) as GridColDef
}

/**
 * TransactionStatusColumn component
 *
 * @param props - The properties passed to the component
 * @param props.field - The field of the column
 * @param props.sortable - Whether the column is sortable
 * @returns A GridColDef object
 */
export const transactionStatusColumnPro = (props: GenericColumnProps): GridColDef => {
  return { ...transactionStatusColumn(props), resizable: false } as GridColDef
}

/**
 * MempoolTransactionStatusColumnPro component
 *
 * @param props - The properties passed to the component
 * @param props.field - The field of the column
 * @param props.sortable - Whether the column is sortable
 * @returns A GridColDef object
 */
export const mempoolTransactionStatusColumnPro = (props: GenericColumnProps): GridColDef => {
  return { ...mempoolTransactionStatusColumn(props), resizable: false } as GridColDef
}

/**
 * TransactionTypeColumnPro component
 *
 * @param props - The properties passed to the component
 * @param props.field - The field of the column
 * @param props.sortable - Whether the column is sortable
 * @returns A GridColDef object
 */
export const transactionTypeColumnPro = (props: GenericColumnProps): GridColDef => {
  return { ...transactionTypeColumn(props), resizable: false } as GridColDef
}

/**
 * AmountColumnPro component
 *
 * @param props - The properties passed to the component
 * @param props.field - The field of the column
 * @param props.label - The label of the column
 * @param [props.minWidth=110] - The minimum width of the column
 * @param props.headerIcon - The icon of the header
 * @param [props.sortable=false] - Whether the column is sortable
 * @returns A GridColDef object
 */
export const amountColumnPro = (props: GenericColumnProps): GridColDef => {
  return amountColumn(props) as GridColDef
}

/**
 * Function to create a boolean column of data grid pro
 *
 * @param props - The properties passed to the component
 * @param props.field - The field of the column
 * @param props.label - The label of the column
 * @param props.headerIcon - The icon of the header
 * @param props.sortable - Whether the column is sortable
 * @returns A GridColDef object
 */
export const booleanColumnPro = (props: GenericColumnProps): GridColDef => {
  return booleanColumn(props) as GridColDef
}

/**
 * Function to create a miner column of data grid pro
 *
 * @param props - The properties of the miner column
 * @param props.field - The field of the column
 * @param props.label - The label of the column
 * @param [props.minWidth] - The minimum width of the column
 * @param [props.maxWidth] - The maximum width of the column
 * @param [props.headerIcon] - The icon of the header
 * @param [props.sortable=false] - Whether the column is sortable
 * @returns A GridColDef object
 */
export const minerColumnPro = (props: MinerColumnProps): GridColDef => {
  return minerColumn(props) as GridColDef
}

/**
 * Function to create a time column of data grid pro
 *
 * @param props - The properties of the time column
 * @param props.field - The field of the column
 * @param props.label - The label of the column
 * @param [props.isUTC=false] - Whether the time is in UTC
 * @param [props.headerIcon] - The icon of the header
 * @param [props.sortable=false] - Whether the column is sortable
 * @returns A column definition for the grid
 */
export const timeColumnPro = (props: TimeColumnProps): GridColDef => {
  return timeColumn(props) as GridColDef
}

/**
 * Function to create a column that displays the time since a certain event of data grid pro
 *
 * @param props - The properties passed to the component
 * @param props.field - The field of the column
 * @param props.label - The label of the column
 * @param props.headerIcon - The icon of the header
 * @param [props.minWidth=100] - The minimum width of the column
 * @param [props.sortable=false] - Whether the column is sortable
 * @returns A GridColDef object
 */
export const timeSinceColumnPro = (props: TimeColumnProps): GridColDef => {
  return timeSinceColumn(props) as GridColDef
}

/**
 * Function to create a number column of data grid pro
 *
 * @param props - The properties of the number column
 * @param props.field - The field of the column
 * @param props.label - The label of the column
 * @param [props.minWidth] - The minimum width of the column
 * @param [props.headerIcon] - The icon of the header
 * @param [props.sortable] - Whether the column is sortable
 * @param [props.decimals] - The number of decimals
 * @returns A column definition for the grid
 */
export const numberColumnPro = (props: NumberColumnProps): GridColDef => {
  return numberColumn(props) as GridColDef
}

/**
 * Function to create a string column of data grid pro
 *
 * @param props - The properties of the string column
 * @param props.field - The field of the column
 * @param props.label - The label of the column
 * @param [props.minWidth=100] - The minimum width of the column
 * @param [props.maxWidth] - The maximum width of the column
 * @param [props.headerIcon] - The icon of the header
 * @param [props.sortable=false] - Whether the column is sortable
 * @returns A GridColDef object
 */
export const stringColumnPro = (props: StringColumnProps): GridColDef => {
  return stringColumn(props) as GridColDef
}

/**
 * Function to create a box column of data grid pro
 *
 * @param props - The properties of the box column
 * @property props.field - The field of the column
 * @property [props.subfield] - The subfield of the column
 * @property props.label - The label of the column
 * @property {inputType} props.inputType - The input type of the column
 * @property [props.disableLink=false] - Whether the link is disabled
 * @property [props.hasCopyButton=true] - Whether the column has a copy button
 * @property [props.limitCharacters=truncateMaxCharacters] - The limit of characters in the column
 * @property [props.padding] - The padding of the column
 * @property {React.JSX.Element} [props.headerIcon] - The icon of the header
 * @property [props.sortable=false] - Whether the column is sortable
 * @returns A GridColDef object
 */
export const boxColumnPro = (props: BoxColumnProps): GridColDef => {
  return boxColumn(props) as GridColDef
}

/**
 * Function to create a column for code view of data grid pro
 * @returns A column definition for the grid
 */
export const codeViewColumnPro = (): GridColDef => {
  return codeViewColumn() as GridColDef
}
/**
 * Function to create a column for transaction details of data grid pro
 * @returns A column definition for the grid
 */
export const transactionDetailsColumnPro = (): GridColDef => {
  return transactionDetailsColumn() as GridColDef
}

/**
 * Function to create a column for download
 * @param props - The properties of the column
 * @param props.fileName - The name of the file
 * @returns A column definition for the grid
 */
export const downloadColumnPro = (props: { fileName: string }): GridColDef => {
  return downloadColumn(props) as GridColDef
}

/**
 * Function to create a column for compiler of data grid pro
 * @param props - The properties of the column
 * @param props.field - The field of the column
 * @param props.label - The label of the column
 * @param props.headerIcon - The icon of the header
 * @param [props.sortable=false] - Whether the column is sortable
 * @returns A column definition for the grid
 */
export const compilerColumnPro = (props: GenericColumnProps): GridColDef => {
  return compilerColumn(props) as GridColDef
}

/**
 * Function to create a column for optimization of data grid pro
 * @param props - The properties of the column
 * @param props.field - The field of the column
 * @param props.label - The label of the column
 * @param props.headerIcon - The icon of the header
 * @param [props.sortable=false] - Whether the column is sortable
 * @returns A column definition for the grid
 */
export const optimizationColumnPro = (props: GenericColumnProps): GridColDef => {
  return optimizationColumn(props) as GridColDef
}

/**
 * Function to create a column for license of data grid pro
 * @param props - The properties of the column
 * @param props.field - The field of the column
 * @param props.label - The label of the column
 * @param props.headerIcon - The icon of the header
 * @param [props.sortable=false] - Whether the column is sortable
 * @returns A column definition for the grid
 */
export const licenseColumnPro = (props: GenericColumnProps): GridColDef => {
  return licenseColumn(props) as GridColDef
}

/**
 * Function to create a column for downloading IPFS of data grid pro
 * @param props - The properties of the column
 * @param props.field - The field of the column
 * @returns A column definition for the grid
 */
export const downloadIpfsPro = (props: { field: string }): GridColDef => {
  return downloadIpfs(props) as GridColDef
}

/**
 * Function to create a rank column of data grid pro
 * @param props - The properties for the rank column
 * @property props.field - The field of the RankColumnProps
 * @property props.label - The label of the RankColumnProps
 * @property {React.JSX.Element} [props.headerIcon] - The headerIcon of the RankColumnProps
 * @property [props.sortable=false] - Whether the column is sortable
 * @returns A column definition for the grid
 */
export const rankColumnPro = (props: RankColumnProps): GridColDef => {
  return rankColumn(props) as GridColDef
}

/**
 * Function to create a column for actor type of data grid pro
 * @param props - The properties for the column
 * @property props.field - The field of the GenericColumnProps
 * @property props.label - The label of the GenericColumnProps
 * @property {React.JSX.Element} [props.headerIcon] - The headerIcon of the GenericColumnProps
 * @property [props.sortable=false] - Whether the column is sortable
 * @returns A column definition for the grid
 */
export const actorTypeColumnPro = (props: GenericColumnProps): GridColDef => {
  return actorTypeColumn(props) as GridColDef
}

/**
 * Function to create a column for percentage range of data grid pro
 * @param props - The properties for the column
 * @property props.field - The field of the percentageRangeProps
 * @property props.label - The label of the percentageRangeProps
 * @property [props.width=170] - The width of the percentageRangeProps
 * @property {React.JSX.Element} [props.headerIcon] - The headerIcon of the percentageRangeProps
 * @property [props.sortable] - Whether the column is sortable
 * @returns A column definition for the grid
 */
export const percentageRangePro = (props: percentageRangeProps): GridColDef => {
  return percentageRange(props) as GridColDef
}

/**
 * Function to create a tree column of data grid pro
 *
 * @param props - The properties of the string column
 * @param props.field - The field of the column
 * @param props.label - The label of the column
 * @param [props.minWidth=100] - The minimum width of the column
 * @param [props.maxWidth] - The maximum width of the column
 * @param [props.headerIcon] - The icon of the header
 * @param [props.sortable=false] - Whether the column is sortable
 * @returns A GridColDef object
 */
export const treeColumnPro = (props: GenericColumnProps): GridColDef => {
  return treeColumn(props) as GridColDef
}
