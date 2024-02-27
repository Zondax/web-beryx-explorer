import BigNumber from 'bignumber.js'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { amountFormat, chainDecimals, truncateMaxCharacters } from '@/config/config'
import { ObjectType } from '@/routes/parsing'
import { useSearchStore } from '@/store/data/search'
import { useAppSettingsStore } from '@/store/ui/settings'
import { cellAmount } from '@/utils/conversion'
import { newDateFormat, timeSince } from '@/utils/dates'
import { Box, Unstable_Grid2 as Grid, Tooltip, Typography } from '@mui/material'
import { GridColDef, gridDateComparator, gridStringOrNumberComparator } from '@mui/x-data-grid'

import MempoolTransactionStatus from 'components/common/MempoolTransactionStatus'
import TypeTransactionIconContainer from 'components/common/TypeTransactionIcon'

import {
  ActorTypeLabel,
  BeryxLink,
  BooleanColumn,
  CodeView,
  TransactionDetails,
  TransactionStatus,
  TxTypeLabel,
} from '../../../../components/common'
import { LicenseProps, available_licenses } from '../../../../components/common/ContractVerifier/config'
import { FirstPositionIcon, SecondPositionIcon, ThirdPositionIcon } from '../../../../components/common/Icons'
import IndentIcon from '../../../../components/common/Icons/IndentIcon'
import { DownloadColumn } from '../components/DownloadColumn'
import { DownloadIpfs } from '../components/DownloadIpfs'
import { TreeColumn } from '../components/TreeColumn'

/**
 * Interface for RenderHeaderProps
 * @interface
 * @property label - The label of the header
 * @property header's icon
 */
interface RenderHeaderProps {
  label: string
  headerIcon?: React.JSX.Element
  headerTooltip?: string
}

/**
 * RenderHeader is a functional component that takes in a RenderHeaderProps object and returns a JSX element.
 * It creates a Box component with specific styling and contains an optional icon and a Typography component.
 * The Typography component displays the label passed in through the RenderHeaderProps object.
 *
 * @param props - The properties passed to the component
 * @param props.headerIcon - The icon of the header
 * @param props.headerTooltip - The description of the header
 * @param props.label - The label of the header
 * @returns A Box component with an optional icon and a Typography component
 */
const RenderHeader = ({ headerIcon, label, headerTooltip }: RenderHeaderProps): JSX.Element => {
  const { t } = useTranslation()
  return (
    <Tooltip title={t(headerTooltip ?? '')} arrow disableInteractive>
      <Box
        sx={{
          gap: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          maxWidth: '100%',
          flexWrap: 'nowrap',
        }}
      >
        {headerIcon}

        <Typography
          variant="caption"
          component={'p'}
          color={'text.secondary'}
          sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {label}
        </Typography>
      </Box>
    </Tooltip>
  )
}

/**
 * Interface for BeryxLinkColumnProps
 * @interface
 * @property field - The field of the BeryxLinkColumn
 * @property label - The label of the BeryxLinkColumn
 * @property inputType - The input type of the BeryxLinkColumn
 * @property [disableLink] - Whether the link is disabled
 * @property [hasCopyButton] - Whether the copy button is present
 * @property [limitCharacters] - The limit of characters
 * @property [disableLimitCharacters] - Whether the limit of characters is disabled
 * @property [minWidth] - The minimum width of the BeryxLinkColumn
 * @property [maxWidth] - The maximum width of the BeryxLinkColumn
 * @property [indent] - Whether the BeryxLinkColumn is indented
 * @property {React.JSX.Element} [headerIcon] - The icon of the header
 * @property [sortable] - Whether the BeryxLinkColumn is sortable
 */
export interface BeryxLinkColumnProps {
  field: string
  label: string
  inputType: ObjectType
  disableLink?: boolean
  hasCopyButton?: boolean
  limitCharacters?: number
  disableLimitCharacters?: boolean
  minWidth?: number
  maxWidth?: number
  indent?: boolean
  headerIcon?: React.JSX.Element
  sortable?: boolean
}

// REMEMBER: not using width as property

/**
 * Interface for GenericColumnProps
 * @interface
 * @property field - The field of the GenericColumn
 * @property label - The label of the GenericColumn
 * @property {React.JSX.Element} [headerIcon] - The icon of the header
 * @property [sortable] - Whether the GenericColumn is sortable
 * @property [minWidth] - The minimum width of the GenericColumn
 */
export interface GenericColumnProps {
  field: string
  label: string
  headerIcon?: React.JSX.Element
  sortable?: boolean
  minWidth?: number
}

export interface CellParams {
  row?: {
    deleted?: boolean
  }
  value?: unknown // or any other type that value might be
  disableLink?: boolean
}

/**
 * Function to build the class name for a cell
 * @param params - The parameters for the cell
 * @param indent - Whether the cell should be indented
 * @returns The class name for the cell
 */
const buildCellClassName = (params: CellParams, indent: boolean): string => {
  const classes = []

  // If the row is deleted, add 'font-transparent' to the classes
  if (params.row?.deleted) {
    classes.push('font-transparent')
  }
  // If the value is present and the link is not disabled, add 'font-clickable' to the classes
  if (params.value && !params.disableLink) {
    classes.push('font-clickable')
  }
  // If the cell should be indented, add 'indent-row' to the classes
  if (indent) {
    classes.push('indent-row')
  }

  // Return the class name for the cell
  return classes.join(' ')
}

/**
 * Function to render an indented cell
 * @param params - The parameters for the cell
 * @param inputType - The type of input
 * @param limitCharacters - The limit of characters
 * @param hasCopyButton - Whether the cell has a copy button
 * @param disableLink - Whether the link is disabled
 * @returns The rendered indented cell
 */
const renderIndentedCell = (
  params: any,
  inputType: ObjectType,
  limitCharacters: number | undefined,
  hasCopyButton: boolean,
  disableLink: boolean
): JSX.Element => {
  const searchItemType = useSearchStore.getState().searchItemType

  const network = useAppSettingsStore.getState().network

  const shoulDisplayFlag = params.row.level !== 0 && searchItemType !== ObjectType.TXS
  return (
    <Grid container flexWrap={'nowrap'} alignItems={'center'} gap={'0.5rem'}>
      <Tooltip title="Internal message" arrow disableInteractive>
        <Box className={'indent-icon'} pl={params.row.path.length >= 2 ? `calc(${params.row.path.length - 1} * 18px)` : 0}>
          <IndentIcon size={16} />
        </Box>
      </Tooltip>
      <BeryxLink
        inputType={inputType}
        limitCharacters={limitCharacters}
        value={params.value}
        disableLink={disableLink}
        hasCopyButton={hasCopyButton}
        network={network}
      />
      {shoulDisplayFlag ? (
        <Tooltip title={'This is an internal transaction. Click on the hash to see the main transaction'} arrow>
          <Grid container bgcolor={'#363D48'} borderRadius={'4px'} p={'2px 8px'}>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              pt={'1px'}
              textOverflow={'ellipsis'}
              overflow={'hidden'}
              whiteSpace={'nowrap'}
            >
              INTERNAL
            </Typography>
          </Grid>
        </Tooltip>
      ) : null}
    </Grid>
  )
}

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
export const beryxLinkColumn = ({
  field,
  label,
  inputType,
  disableLink = false,
  hasCopyButton = true,
  limitCharacters = truncateMaxCharacters,
  disableLimitCharacters = false,
  minWidth = 190,
  maxWidth = undefined,
  indent = false,
  headerIcon,
  sortable = false,
}: BeryxLinkColumnProps): GridColDef => {
  /**
   * This function renders the content of the cell.
   *
   * @param params - The parameters passed to the function
   * @returns A JSX element
   */
  const renderCellContent = (params: any) => {
    if (!params.value || params.value < 0) {
      return (
        <Typography variant="body1" color="text.secondary">
          —
        </Typography>
      )
    }
    const network = useAppSettingsStore.getState().network

    const finalLimitCharacters = !disableLimitCharacters ? limitCharacters : undefined

    if (indent) {
      /**
       * This function renders an indented cell.
       *
       * @param params - The parameters passed to the function
       * @param inputType - The type of input
       * @param finalLimitCharacters - The final limit of characters
       * @param hasCopyButton - Whether the cell has a copy button
       * @param disableLink - Whether the link is disabled
       * @returns A JSX element
       */
      return renderIndentedCell(params, inputType, finalLimitCharacters, hasCopyButton, disableLink)
    }

    return (
      <BeryxLink
        inputType={inputType}
        limitCharacters={finalLimitCharacters}
        value={params.value}
        disableLink={disableLink}
        hasCopyButton={hasCopyButton}
        network={network}
      />
    )
  }

  return {
    field,
    headerName: label,
    type: 'string',
    minWidth: indent ? minWidth + 105 : minWidth,
    maxWidth,
    flex: 1,
    sortable,
    renderHeader: () => <RenderHeader label={label} headerIcon={headerIcon} />,
    cellClassName: (params: any) => buildCellClassName(params, indent),
    sortComparator: gridStringOrNumberComparator,
    renderCell: renderCellContent,
  }
}

/**
 * MethodTypeColumn component
 *
 * @param props - The properties passed to the component
 * @param props.field - The field of the column
 * @param props.label - The label of the column
 * @param props.headerIcon - The icon of the header
 * @param props.sortable - Whether the column is sortable
 * @returns A GridColDef object
 */
export const methodTypeColumn = ({ field, label, headerIcon, sortable = false }: GenericColumnProps): GridColDef => {
  return {
    field,
    headerName: label,
    type: 'string',
    minWidth: 120,
    flex: 1,
    sortable,
    renderHeader: () => <RenderHeader label={label} headerIcon={headerIcon} />,
    cellClassName: (params: any) => {
      if (params?.row?.deleted) {
        return 'font-transparent'
      }
      return ''
    },
    sortComparator: gridStringOrNumberComparator,

    renderCell: (params: any) => {
      if (!params.value) {
        return (
          <Typography variant="body1" color="text.secondary">
            —
          </Typography>
        )
      }
      return <TxTypeLabel label={params.value.toString()} />
    },
  }
}

/**
 * TransactionStatusColumn component
 *
 * @param props - The properties passed to the component
 * @param props.field - The field of the column
 * @param props.sortable - Whether the column is sortable
 * @returns A GridColDef object
 */
export const transactionStatusColumn = ({ field, sortable = false }: GenericColumnProps): GridColDef => {
  return {
    field,
    headerName: '',
    type: 'string',
    minWidth: 40,
    maxWidth: 40,
    flex: 1,
    resizable: false,
    sortable,
    sortComparator: gridStringOrNumberComparator,
    /**
     * Render cell function
     *
     * @param params - The parameters of the cell
     * @returns A TransactionStatus component or an empty string
     */
    renderCell: (params: any) => {
      if (params.value === undefined) {
        return ''
      }
      return <TransactionStatus status={params.value} />
    },
  }
}

/**
 * MempoolTransactionStatusColumn component
 *
 * @param props - The properties passed to the component
 * @param props.field - The field of the column
 * @param props.sortable - Whether the column is sortable
 * @returns A GridColDef object
 */
export const mempoolTransactionStatusColumn = ({ field, sortable = false }: GenericColumnProps): GridColDef => {
  return {
    field,
    headerName: '',
    type: 'string',
    minWidth: 40,
    maxWidth: 40,
    flex: 1,
    resizable: false,
    sortable,
    sortComparator: gridStringOrNumberComparator,
    /**
     * Render cell function
     *
     * @param params - The parameters of the cell
     * @returns A TransactionStatus component or an empty string
     */
    renderCell: (params: any) => {
      return <MempoolTransactionStatus last_seen={params.value} />
    },
  }
}

/**
 * TransactionTypeColumn component
 *
 * @param props - The properties passed to the component
 * @param props.field - The field of the column
 * @param props.sortable - Whether the column is sortable
 * @returns A GridColDef object
 */
export const transactionTypeColumn = ({ field, sortable = false }: GenericColumnProps): GridColDef => {
  return {
    field,
    headerName: '',
    type: 'string',
    minWidth: 40,
    maxWidth: 40,
    flex: 1,
    resizable: false,
    sortable,
    filterable: true,
    /**
     * Render cell function
     *
     * @param params - The parameters of the cell
     * @returns A TransactionStatus component or an empty string
     */
    renderCell: (params: any) => {
      return <TypeTransactionIconContainer transaction={params.row} />
    },
  }
}

/**
 * AmountColumn component
 *
 * @param props - The properties passed to the component
 * @param props.field - The field of the column
 * @param props.label - The label of the column
 * @param [props.minWidth=110] - The minimum width of the column
 * @param props.headerIcon - The icon of the header
 * @param [props.sortable=false] - Whether the column is sortable
 * @returns A GridColDef object
 */
export const amountColumn = ({ field, label, minWidth, headerIcon, sortable = false }: GenericColumnProps): GridColDef => {
  return {
    field,
    headerName: label,
    type: 'number',
    minWidth: minWidth ?? 110,
    flex: 1,
    maxWidth: 170,
    align: 'right',
    headerAlign: 'right',
    sortable,
    renderHeader: () => <RenderHeader label={label} headerIcon={headerIcon} />,
    /**
     * Function to determine the class name of the cell
     *
     * @param params - The parameters of the cell
     * @returns The class name of the cell
     */
    cellClassName: (params: any) => {
      if (params?.row?.deleted) {
        return 'font-transparent'
      }
      return ''
    },
    /**
     * Function to compare two values
     *
     * @param v1 - The first value
     * @param v2 - The second value
     * @returns A number indicating the result of the comparison
     */
    sortComparator: (v1, v2) => {
      const value1 = BigNumber(v1).div(Math.pow(10, chainDecimals.filecoin))
      const value2 = BigNumber(v2).div(Math.pow(10, chainDecimals.filecoin))

      if (value1.lt(value2)) {
        return -1
      } else if (value1.gt(value2)) {
        return 1
      }
      return 0
    },
    /**
     * Function to render the cell
     *
     * @param params - The parameters of the cell
     * @returns A Tooltip component or an empty string
     */
    renderCell: (params: any) => {
      if (params.value === undefined) {
        return (
          <Typography variant="body1" color="text.secondary">
            —
          </Typography>
        )
      }

      const number = BigNumber(params.value).div(Math.pow(10, chainDecimals.filecoin)).toFormat(2, amountFormat)
      const amount = cellAmount(BigNumber(params.value).div(Math.pow(10, chainDecimals.filecoin)).toFixed())
      return (
        <Tooltip title={amount} arrow>
          <Typography
            variant="captionMono"
            color="text.primary"
            textAlign={'right'}
            sx={{ whitSspace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            {number}
          </Typography>
        </Tooltip>
      )
    },
  }
}

/**
 * Function to create a boolean column
 *
 * @param props - The properties passed to the component
 * @param props.field - The field of the column
 * @param props.label - The label of the column
 * @param props.headerIcon - The icon of the header
 * @param props.sortable - Whether the column is sortable
 * @returns A GridColDef object
 */
export const booleanColumn = ({ field, label, headerIcon, sortable = false }: GenericColumnProps): GridColDef => {
  return {
    field,
    headerName: label,
    type: 'string',
    minWidth: 115,
    flex: 1,
    sortable,
    sortComparator: gridStringOrNumberComparator,
    /**
     * Function to render the header
     *
     * @returns A RenderHeader component
     */
    renderHeader: () => <RenderHeader label={label} headerIcon={headerIcon} />,
    /**
     * Function to render the cell
     *
     * @param params - The parameters of the cell
     * @returns A BooleanColumn component or a Typography component
     */
    renderCell: (params: any) => {
      if (params.value === undefined) {
        return (
          <Typography variant="body1" color="text.secondary">
            —
          </Typography>
        )
      }
      return <BooleanColumn value={params.value} />
    },
  }
}

/**
 * Interface for MinerColumnProps
 *
 * @interface
 * @property field - The field of the column
 * @property label - The label of the column
 * @property [minWidth] - The minimum width of the column
 * @property [maxWidth] - The maximum width of the column
 * @property {React.JSX.Element} [headerIcon] - The icon of the header
 * @property [sortable] - Whether the column is sortable
 */
export interface MinerColumnProps {
  field: string
  label: string
  minWidth?: number
  maxWidth?: number
  headerIcon?: React.JSX.Element
  sortable?: boolean
}

/**
 * Function to create a miner column
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
export const minerColumn = ({ field, label, minWidth, maxWidth, headerIcon, sortable = false }: MinerColumnProps): GridColDef => {
  return {
    field,
    headerName: label,
    type: 'string',
    minWidth: minWidth ?? 90,
    maxWidth: maxWidth ?? 90,
    flex: 1,
    sortable,
    sortComparator: gridStringOrNumberComparator,
    /**
     * Function to render the header
     *
     * @returns A RenderHeader component
     */
    renderHeader: () => <RenderHeader label={label} headerIcon={headerIcon} />,
    /**
     * Function to render the cell
     *
     * @param params - The parameters of the cell
     * @returns A Typography component or a string
     */
    renderCell: (params: any) => {
      if (!params.value) {
        return (
          <Typography variant="body1" color="text.secondary">
            —
          </Typography>
        )
      }
      if (!Array.isArray(params.value)) {
        return <>0</>
      }
      return (
        <Typography variant="body1" color="text.secondary">
          {params.value.length}
        </Typography>
      )
    },
  }
}

/**
 * Interface for TimeColumnProps
 *
 * @interface
 * @property field - The field of the column
 * @property label - The label of the column
 * @property [isUTC] - Whether the time is in UTC
 * @property {React.JSX.Element} [headerIcon] - The icon of the header
 * @property [minWidth] - The minimum width of the column
 * @property [sortable] - Whether the column is sortable
 * @property [showTimezone] - Whether to show the timezone
 */
export interface TimeColumnProps {
  field: string
  label: string
  isUTC?: boolean
  headerIcon?: React.JSX.Element
  minWidth?: number
  sortable?: boolean
  showTimezone?: boolean
}

/**
 * Function to create a time column
 *
 * @param props - The properties of the time column
 * @param props.field - The field of the column
 * @param props.label - The label of the column
 * @param [props.isUTC=false] - Whether the time is in UTC
 * @param [props.headerIcon] - The icon of the header
 * @param [props.sortable=false] - Whether the column is sortable
 * @returns A column definition for the grid
 */
export const timeColumn = ({ field, label, isUTC = false, headerIcon, sortable = false }: TimeColumnProps): GridColDef => {
  return {
    field,
    headerName: `${label} UTC`,
    type: 'number',
    minWidth: 200,
    flex: 1,
    sortable,
    headerAlign: 'left',
    align: 'left',
    /**
     * Function to render the header
     *
     * @returns A RenderHeader component
     */
    renderHeader: () => <RenderHeader label={`${label} (UTC)`} headerIcon={headerIcon} />,
    /**
     * Function to compare two values
     *
     * @param v1 - The first value
     * @param v2 - The second value
     * @returns A number indicating the order of the values
     */
    sortComparator: (v1, v2) => {
      const value1 = new Date(v1)
      const value2 = new Date(v2)

      if (value1 < value2) {
        return -1
      } else if (value1 > value2) {
        return 1
      }
      return 0
    },
    /**
     * Function to render the cell
     *
     * @param params - The parameters of the cell
     * @returns A Typography component or a string
     */
    renderCell: (params: any) => {
      if (!params.value) {
        return (
          <Typography variant="body1" color="text.secondary">
            —
          </Typography>
        )
      }
      return <Typography variant="caption">{newDateFormat(params.value, isUTC ? 'UTC' : undefined, false)}</Typography>
    },
  }
}

/**
 * Function to create a column that displays the time since a certain event
 *
 * @param props - The properties passed to the component
 * @param props.field - The field of the column
 * @param props.label - The label of the column
 * @param props.headerIcon - The icon of the header
 * @param [props.minWidth=100] - The minimum width of the column
 * @param [props.sortable=false] - Whether the column is sortable
 * @returns A GridColDef object
 */
export const timeSinceColumn = ({ field, label, headerIcon, minWidth, sortable = false }: TimeColumnProps): GridColDef => {
  return {
    field,
    headerName: label,
    type: 'string',
    minWidth: minWidth ?? 100,
    flex: 1,
    sortable,
    sortComparator: gridDateComparator,
    /**
     * Function to render the header
     *
     * @returns A RenderHeader component
     */
    renderHeader: () => <RenderHeader label={label} headerIcon={headerIcon} />,
    /**
     * Function to render the cell
     *
     * @param params - The parameters of the cell
     * @returns A Typography component or a string
     */
    renderCell: (params: any) => {
      if (!params.value) {
        return (
          <Typography variant="body1" color="text.secondary">
            —
          </Typography>
        )
      }
      return `${timeSince(params.value)} ago`
    },
  }
}

/**
 * Interface for NumberColumnProps
 *
 * @interface
 * @property field - The field of the column
 * @property label - The label of the column
 * @property [minWidth] - The minimum width of the column
 * @property {React.JSX.Element} [headerIcon] - The icon of the header
 * @property [sortable=false] - Whether the column is sortable
 * @property [decimals] - The number of decimals
 */
export interface NumberColumnProps {
  field: string
  label: string
  minWidth?: number
  maxWidth?: number
  headerIcon?: React.JSX.Element
  sortable?: boolean
  decimals?: number
  headerTooltip?: string
}

/**
 * Function to create a number column
 *
 * @param props - The properties of the number column
 * @param props.field - The field of the column
 * @param props.label - The label of the column
 * @param [props.minWidth] - The minimum width of the column
 * @param [props.headerIcon] - The icon of the header
 * @param [props.headerTooltip] - The label of the tooltip
 * @param [props.sortable] - Whether the column is sortable
 * @param [props.decimals] - The number of decimals
 * @returns A column definition for the grid
 */
export const numberColumn = ({
  field,
  label,
  minWidth,
  maxWidth,
  headerIcon,
  headerTooltip,
  sortable = false,
  decimals,
}: NumberColumnProps): GridColDef => {
  return {
    field,
    headerName: label,
    type: 'number',
    minWidth: minWidth ?? 100,
    maxWidth: maxWidth,
    flex: 1,
    align: 'right',
    headerAlign: 'right',
    sortable,
    sortComparator: gridStringOrNumberComparator,
    /**
     * Function to render the header
     *
     * @returns A RenderHeader component
     */
    renderHeader: () => <RenderHeader label={label} headerIcon={headerIcon} headerTooltip={headerTooltip} />,
    /**
     * Function to render the cell
     *
     * @param params - The parameters of the cell
     * @returns A Tooltip component
     */
    renderCell: (params: any) => {
      const number = BigNumber(params.value).toFormat(decimals ?? 2, amountFormat)
      return (
        <Tooltip title={number} arrow>
          <Typography
            variant="captionMono"
            color="text.primary"
            textAlign={'right'}
            sx={{ whitSspace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            {number}
          </Typography>
        </Tooltip>
      )
    },
  }
}

/**
 * Interface for StringColumnProps
 *
 * @interface
 * @property field - The field of the column
 * @property label - The label of the column
 * @property [minWidth] - The minimum width of the column
 * @property [maxWidth] - The maximum width of the column
 * @property {React.JSX.Element} [headerIcon] - The icon of the header
 * @property [sortable] - Whether the column is sortable
 */
export interface StringColumnProps {
  field: string
  label: string
  minWidth?: number
  maxWidth?: number
  headerIcon?: React.JSX.Element
  sortable?: boolean
}

/**
 * Function to create a string column
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
export const stringColumn = ({
  field,
  label,
  minWidth = 100,
  maxWidth = undefined,
  headerIcon,
  sortable = false,
}: StringColumnProps): GridColDef => {
  return {
    field,
    headerName: label,
    type: 'string',
    minWidth,
    maxWidth,
    flex: 1,
    sortable,
    sortComparator: gridStringOrNumberComparator,
    /**
     * Function to render the header
     *
     * @returns A RenderHeader component
     */
    renderHeader: () => <RenderHeader label={label} headerIcon={headerIcon} />,
    /**
     * Function to render the cell
     *
     * @param params - The parameters of the cell
     * @returns A Typography component
     */
    renderCell: (params: any) => {
      return (
        <Typography variant="body1" color={!params.value ? 'text.secondary' : 'text.primary'}>
          {!params.value ? '—' : params.value}
        </Typography>
      )
    },
  }
}

/**
 * Interface for BoxColumnProps
 *
 * @interface
 * @property field - The field of the column
 * @property [subfield] - The subfield of the column
 * @property label - The label of the column
 * @property {inputType} inputType - The input type of the column
 * @property [disableLink] - Whether the link is disabled
 * @property [hasCopyButton] - Whether the column has a copy button
 * @property [limitCharacters] - The limit of characters in the column
 * @property [padding] - The padding of the column
 * @property {React.JSX.Element} [headerIcon] - The icon of the header
 * @property [sortable] - Whether the column is sortable
 */
export interface BoxColumnProps {
  field: string
  subfield?: string
  label: string
  inputType: ObjectType
  disableLink?: boolean
  hasCopyButton?: boolean
  limitCharacters?: number
  padding?: string
  headerIcon?: React.JSX.Element
  sortable?: boolean
}

/**
 * Function to create a box column
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
export const boxColumn = ({
  field,
  subfield,
  label,
  inputType,
  disableLink = false,
  hasCopyButton = true,
  limitCharacters = truncateMaxCharacters,
  padding,
  headerIcon,
  sortable = false,
}: BoxColumnProps): GridColDef => {
  return {
    field,
    headerName: label,
    type: 'string',
    minWidth: 180,
    flex: 1,
    sortable,
    filterable: false,
    sortComparator: gridStringOrNumberComparator,
    renderHeader: () => <RenderHeader label={label} headerIcon={headerIcon} />,
    renderCell: (params: any) => {
      const result = params.row[field.split('-')[0]]
      const network = useAppSettingsStore.getState().network
      if (!result) {
        return (
          <Typography variant="body1" color="text.secondary">
            —
          </Typography>
        )
      }
      if (!Array.isArray(result)) {
        return null
      }
      return (
        <Grid flexDirection={'column'}>
          {result.map((elem: any) => {
            return (
              <Box padding={padding ?? '0'} key={subfield ? elem[subfield] : elem}>
                <BeryxLink
                  inputType={inputType}
                  value={subfield ? elem[subfield] : elem}
                  disableLink={disableLink}
                  hasCopyButton={hasCopyButton}
                  limitCharacters={limitCharacters}
                  network={network}
                />
              </Box>
            )
          })}
        </Grid>
      )
    },
  }
}

/**
 * Function to create a column for code view
 * @returns A column definition for the grid
 */
export const codeViewColumn = (): GridColDef => {
  return {
    headerName: 'Details',
    field: 'details',
    type: 'string',
    minWidth: 68,
    maxWidth: 100,
    align: 'right',
    flex: 1,
    sortable: false,
    renderHeader: () => <RenderHeader label={'Details'} headerIcon={undefined} />,
    renderCell: params => {
      const columns = Object.keys(params.row)
      if (columns.length === 0) {
        return ''
      }
      return <CodeView content={params.row} />
    },
  }
}

/**
 * Function to create a column for transaction details
 * @returns A column definition for the grid
 */
export const transactionDetailsColumn = (): GridColDef => {
  return {
    headerName: 'Details',
    renderHeader: () => <RenderHeader label={'Details'} headerIcon={undefined} />,
    headerAlign: 'right',
    field: 'paramsAndDetails',
    type: 'string',
    minWidth: 68,
    maxWidth: 100,
    align: 'right',
    flex: 1,
    sortable: false,
    renderCell: params => {
      const columns = Object.keys(params.row)
      if (columns.length === 0) {
        return ''
      }
      return <TransactionDetails content={params.row} />
    },
  }
}

/**
 * Function to create a column for download
 * @param props - The properties of the column
 * @param props.fileName - The name of the file
 * @returns A column definition for the grid
 */
export const downloadColumn = ({ fileName }: { fileName: string }): GridColDef => {
  return {
    headerName: 'Download',
    renderHeader: () => <RenderHeader label={'Download'} headerIcon={undefined} />,
    field: 'action',
    type: 'string',
    minWidth: 52,
    maxWidth: 52,
    flex: 1,
    resizable: false,
    sortable: false,
    renderCell: params => {
      const columns = Object.keys(params.row)
      if (columns.length === 0) {
        return ''
      }
      return <DownloadColumn row={params.row} fileName={fileName} />
    },
  }
}

/**
 * Function to create a column for compiler
 * @param props - The properties of the column
 * @param props.field - The field of the column
 * @param props.label - The label of the column
 * @param props.headerIcon - The icon of the header
 * @param [props.sortable=false] - Whether the column is sortable
 * @returns A column definition for the grid
 */
export const compilerColumn = ({ field, label, headerIcon, sortable = false }: GenericColumnProps): GridColDef => {
  return {
    field,
    headerName: label,
    type: 'string',
    minWidth: 150,
    flex: 1,
    sortable,
    sortComparator: gridStringOrNumberComparator,
    renderHeader: () => <RenderHeader label={label} headerIcon={headerIcon} />,
    renderCell: (params: any) => {
      return (
        <Typography variant="body1" color="text.primary">
          {params.value[0] ?? '-'}
        </Typography>
      )
    },
  }
}

/**
 * Function to create a column for optimization
 * @param props - The properties of the column
 * @param props.field - The field of the column
 * @param props.label - The label of the column
 * @param props.headerIcon - The icon of the header
 * @param [props.sortable=false] - Whether the column is sortable
 * @returns A column definition for the grid
 */
export const optimizationColumn = ({ field, label, headerIcon, sortable = false }: GenericColumnProps): GridColDef => {
  return {
    field,
    headerName: label,
    type: 'string',
    minWidth: 200,
    flex: 1,
    sortable,
    sortComparator: gridStringOrNumberComparator,
    renderHeader: () => <RenderHeader label={label} headerIcon={headerIcon} />,
    renderCell: (params: any) => {
      /**
       * Function to get the label for optimization
       * @returns The label for optimization
       */
      const getOptimizationLabel = () => {
        switch (params.value) {
          case undefined:
            return '-'
          case -1:
            return 'Disabled'
          default:
            return `Enabled with ${params.value} runs`
        }
      }
      return (
        <Typography variant="body1" color="text.primary">
          {getOptimizationLabel()}
        </Typography>
      )
    },
  }
}

/**
 * Function to create a column for license
 * @param props - The properties of the column
 * @param props.field - The field of the column
 * @param props.label - The label of the column
 * @param props.headerIcon - The icon of the header
 * @param [props.sortable=false] - Whether the column is sortable
 * @returns A column definition for the grid
 */
export const licenseColumn = ({ field, label, headerIcon, sortable = false }: GenericColumnProps): GridColDef => {
  return {
    field,
    headerName: label,
    type: 'string',
    minWidth: 200,
    flex: 1,
    sortable,
    sortComparator: gridStringOrNumberComparator,
    renderHeader: () => <RenderHeader label={label} headerIcon={headerIcon} />,
    renderCell: (params: any) => {
      let arrayLicenses = []
      if (params.value) {
        arrayLicenses = params.value.map((license: string) => {
          const completeLicense = available_licenses.filter(({ shortName }: LicenseProps) => shortName === license)
          return completeLicense[0] ? completeLicense[0].longName : license
        })
      }
      return (
        <Tooltip title={arrayLicenses.join(', ')} arrow disableInteractive>
          <Typography variant="body1" color="text.primary" overflow={'hidden'} textOverflow={'ellipsis'}>
            {arrayLicenses.join(', ')}
          </Typography>
        </Tooltip>
      )
    },
  }
}

/**
 * Function to create a column for downloading IPFS
 * @param props - The properties of the column
 * @param props.field - The field of the column
 * @returns A column definition for the grid
 */
export const downloadIpfs = ({ field }: { field: string }): GridColDef => {
  return {
    field,
    headerName: '',
    type: 'string',
    minWidth: 140,
    maxWidth: 140,
    flex: 1,
    sortable: false,
    renderCell: (params: any) => {
      const columns = Object.keys(params.row)
      if (columns.length === 0) {
        return ''
      }
      if (!params.value) {
        return null
      }
      return <DownloadIpfs CID={params.value} />
    },
  }
}

/**
 * Interface for RankColumnProps
 * @interface
 * @property field - The field of the RankColumnProps
 * @property label - The label of the RankColumnProps
 * @property {React.JSX.Element} [headerIcon] - The headerIcon of the RankColumnProps
 * @property [sortable] - Whether the column is sortable
 */
export interface RankColumnProps {
  field: string
  label: string
  headerIcon?: React.JSX.Element
  sortable?: boolean
}

/**
 * Function to create a rank column
 * @param props - The properties for the rank column
 * @property props.field - The field of the RankColumnProps
 * @property props.label - The label of the RankColumnProps
 * @property {React.JSX.Element} [props.headerIcon] - The headerIcon of the RankColumnProps
 * @property [props.sortable=false] - Whether the column is sortable
 * @returns A column definition for the grid
 */
export const rankColumn = ({ field, label, headerIcon, sortable = false }: RankColumnProps): GridColDef => {
  return {
    field,
    headerName: label,
    type: 'string',
    minWidth: 60,
    maxWidth: 60,
    sortable,
    sortComparator: gridStringOrNumberComparator,
    renderHeader: () => <RenderHeader label={label} headerIcon={headerIcon} />,
    cellClassName: (params: any) => {
      if (params.row?.deleted) {
        return 'font-transparent'
      }
      return ''
    },
    renderCell: (params: any) => {
      if (params.value === undefined) {
        return (
          <Typography variant="body1" color="text.secondary">
            —
          </Typography>
        )
      }
      /**
       * Function to render the icon based on the id of the params
       * @returns The icon to be rendered
       */
      const renderIcon = (): JSX.Element => {
        switch (params.id) {
          case '0':
            return <FirstPositionIcon size={54} />
          case '1':
            return <SecondPositionIcon size={54} />
          case '2':
            return <ThirdPositionIcon size={54} />
          default:
            return (
              <Typography
                variant="body1"
                fontWeight={500}
                fontSize={'0.875rem'}
                color="text.primary"
                sx={{ textShadow: '1px 1px 10px rgba(0, 0, 0, 0.8)' }}
              >
                {Number(params.id) + 1}
              </Typography>
            )
        }
      }
      return (
        <Box
          sx={{
            width: '1.5rem',
            height: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {renderIcon()}
        </Box>
      )
    },
  }
}

/**
 * Function to create a column for actor type
 * @param props - The properties for the column
 * @property props.field - The field of the GenericColumnProps
 * @property props.label - The label of the GenericColumnProps
 * @property {React.JSX.Element} [props.headerIcon] - The headerIcon of the GenericColumnProps
 * @property [props.sortable=false] - Whether the column is sortable
 * @returns A column definition for the grid
 */
export const actorTypeColumn = ({ field, label, headerIcon, sortable = false }: GenericColumnProps): GridColDef => {
  return {
    field,
    headerName: label,
    type: 'string',
    minWidth: 120,
    flex: 1,
    sortable,
    renderHeader: () => <RenderHeader label={label} headerIcon={headerIcon} />,
    cellClassName: (params: any) => {
      if (params?.row?.deleted) {
        return 'font-transparent'
      }
      return ''
    },
    sortComparator: gridStringOrNumberComparator,

    renderCell: (params: any) => {
      if (!params.value) {
        return (
          <Typography variant="body1" color="text.secondary">
            —
          </Typography>
        )
      }
      return <ActorTypeLabel label={params.value ?? '-'} level={3} />
    },
  }
}

/**
 * Interface for percentage range properties
 * @interface
 * @property field - The field of the percentage range
 * @property label - The label of the percentage range
 * @property [width] - The width of the percentage range
 * @property {React.JSX.Element} [headerIcon] - The header icon of the percentage range
 * @property [sortable] - Whether the percentage range is sortable
 */
export interface percentageRangeProps {
  field: string
  label: string
  width?: number
  headerIcon?: React.JSX.Element
  sortable?: boolean
}

/**
 * Function to create a column for percentage range
 * @param props - The properties for the column
 * @property props.field - The field of the percentageRangeProps
 * @property props.label - The label of the percentageRangeProps
 * @property [props.width=170] - The width of the percentageRangeProps
 * @property {React.JSX.Element} [props.headerIcon] - The headerIcon of the percentageRangeProps
 * @property [props.sortable] - Whether the column is sortable
 * @returns A column definition for the grid
 */
export const percentageRange = ({ field, label, width = 170, headerIcon, sortable }: percentageRangeProps): GridColDef => {
  return {
    field,
    headerName: label,
    type: 'number',
    minWidth: width,
    maxWidth: width,
    sortable,
    flex: 0.25,
    sortComparator: gridStringOrNumberComparator,
    renderHeader: () => <RenderHeader label={label} headerIcon={headerIcon} />,
    renderCell: (params: any) => {
      const higherValue = params.api.getRow(0)[field]
      return (
        <Grid container width={'100%'} height={'100%'} display={'relative'} pb={'1px'}>
          <Grid
            container
            width={'100%'}
            height={'100%'}
            justifyContent={{ xs: 'flex-start', md: 'flex-end' }}
            alignItems={'center'}
            zIndex={2}
          >
            <Typography variant="subtitle2" p={'0 1rem'}>
              {params.value}
            </Typography>
          </Grid>
          <Box
            position={'absolute'}
            width={`${(params.value * width) / higherValue}px`}
            height={29}
            bgcolor={'background.level2'}
            zIndex={1}
          />
        </Grid>
      )
    },
  }
}

/**
 * Function to create a tree column
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
export const treeColumn = ({ field, sortable = false }: GenericColumnProps): GridColDef => {
  return {
    field,
    headerName: '',
    type: 'string',
    minWidth: 50,
    maxWidth: 50,
    flex: 1,
    // resizable: false,
    sortable,
    sortComparator: gridStringOrNumberComparator,
    /**
     * Render cell function
     *
     * @param params - The parameters of the cell
     * @returns A TransactionStatus component or an empty string
     */
    renderCell: (params: any) => {
      if (params.row.collapse === undefined) {
        return ''
      }
      return <TreeColumn row={params.row} />
    },
  }
}
