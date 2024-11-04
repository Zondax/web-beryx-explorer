import React, { ReactNode, SyntheticEvent, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { LoadingStatus } from '@/config/config'
import { downloadTxtFile } from '@/utils/download'
import { Download, Help, Launch } from '@carbon/icons-react'
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material'

import LoadingView from '../../views/LoadingView'

/**
 * Type for the range options.
 *
 * rangeOptions
 * @type {'seven_days' | 'thirty_days' | 'all'}
 */
type rangeOptions = 'seven_days' | 'thirty_days' | 'one_year' | 'all'

/**
 * Object that maps range options to their corresponding values in milliseconds.
 *
 * rangeValues
 * @type {Object}
 * @property seven_days - Represents seven days in milliseconds.
 * @property thirty_days - Represents thirty days in milliseconds.
 * @property all - Represents one year in milliseconds.
 */
export const rangeValues: { [key in rangeOptions]: number } = {
  seven_days: 604800000,
  thirty_days: 2592000000,
  one_year: 31536000000,
  all: 0,
}

/**
 * ItemTile component.
 *
 * @param props - The properties that define the ItemTile component.
 * @param props.title - The title of the ItemTile.
 * @param props.children - The children nodes of the ItemTile.
 * @param [props.downloadIcon=false] - Flag to determine if the download icon should be displayed.
 * @param [props.dateLabel='__timestamp'] - The label for the date.
 * @param [props.data=[]] - The data for the ItemTile.
 * @param [props.selectorAction] - The action to be performed when a selection is made.
 * @param [props.loading=LoadingStatus.Idle] - The loading status of the ItemTile.
 * @param [props.size='large'] - The size of the ItemTile.
 * @param [props.hasBorder=false] - Flag to determine if the ItemTile should have a border.
 * @param [props.padding] - The padding for the ItemTile.
 * @param [props.defaultFilter='seven_days'] - The default filter for the ItemTile.
 *
 * @returns The ItemTile component.
 */
const ItemTile = ({
  startIcon,
  title,
  subheader,
  tooltip,
  children,
  dateLabel = '__timestamp',
  selectorAction,
  downloadIcon = false,
  data = [],
  loading = LoadingStatus.Idle,
  size = 'large',
  padding,
  defaultFilter = 'all',
  rightLabel,
  href,
}: {
  startIcon?: React.ReactNode
  title: string
  subheader?: string | ReactNode
  tooltip?: string
  children: React.ReactNode
  downloadIcon?: boolean
  dateLabel?: string
  data?: any
  selectorAction?: (data: any[]) => void
  loading?: LoadingStatus
  size?: 'medium' | 'large'
  hasBorder?: boolean
  padding?: string
  defaultFilter?: rangeOptions
  rightLabel?: string
  href?: string
}) => {
  const theme = useTheme()
  const [dateFilter, setDateFilter] = useState<rangeOptions>(defaultFilter)
  const { t } = useTranslation()

  const rangeButtons = [
    <ToggleButton key="seven days" value="seven_days">
      {t('7 Days')}
    </ToggleButton>,
    <ToggleButton key="thirty days" value="thirty_days">
      {t('30 Days')}
    </ToggleButton>,
    <ToggleButton key="one year" value="one_year">
      {t('1 Year')}
    </ToggleButton>,
    <ToggleButton key="all data" value="all">
      {t('All')}
    </ToggleButton>,
  ]

  /**
   * This function filters the data based on the selected range.
   * It uses the useCallback hook to prevent unnecessary re-renders.
   * @function
   * @param filterValue - The selected range value.
   * @param dateLabel - The label for the date.
   * @returns - Returns the filtered data.
   */
  const filterData = useCallback(
    (filterValue: rangeOptions, dateLabel: string) => {
      if (filterValue === 'all' || !data || !Array.isArray(data)) {
        return data
      }

      // Get the date in milisecond with 00:00:00
      const firstDate = Math.floor(new Date().getTime() / 86400000) * 86400000 - rangeValues[filterValue]

      return data.filter((elem: any) => new Date(elem[dateLabel]).getTime() >= firstDate)
    },
    [data]
  )

  /**
   * This function handles the change of the filter.
   * It uses the useCallback hook to prevent unnecessary re-renders.
   * @function
   * @param event - The event object.
   * @param value - The selected range value.
   * @returns - Returns nothing.
   */
  const handleFilterChange = useCallback(
    (_: SyntheticEvent<Element, Event> | undefined, value: rangeOptions) => {
      if (value !== null) {
        setDateFilter(value)
        const filteredData = filterData(value, dateLabel)
        if (filteredData && selectorAction) {
          selectorAction(filteredData)
        }
      }
    },
    [filterData, dateLabel, selectorAction]
  )

  /**
   * This useEffect hook is used to update the filtered data whenever the data, dateFilter, dateLabel, filterData, handleFilterChange, or selectorAction changes.
   * It uses the filterData function to get the filtered data based on the dateFilter and dateLabel.
   * If the filtered data exists and the selectorAction is defined, it calls the selectorAction function with the filtered data.
   * @function
   * @returns - Returns nothing.
   */
  useEffect(() => {
    if (data?.length !== 0) {
      const filteredData = filterData(dateFilter, dateLabel)
      if (filteredData && selectorAction) {
        selectorAction(filteredData)
      }
    }
  }, [data, dateFilter, dateLabel, filterData, handleFilterChange, selectorAction])

  /**
   * This useEffect hook is used to set the default filter when the component is mounted.
   * It uses the setDateFilter function to set the defaultFilter.
   * @function
   * @returns - Returns nothing.
   */
  useEffect(() => {
    setDateFilter(defaultFilter)
  }, [defaultFilter])

  /**
   * This function handles the click event for the download button.
   * It uses the useCallback hook to prevent unnecessary re-renders.
   * It uses the filterData function to get the filtered data based on the dateFilter and dateLabel.
   * It then calls the downloadTxtFile function to download the filtered data as a .json file.
   * The name of the file is "Beryx_" followed by the title.
   * @function
   * @returns - Returns nothing.
   */
  const handleDownloadClick = useCallback(() => {
    downloadTxtFile(filterData(dateFilter, dateLabel), `Beryx_${title}`, 'application/json', '.json')
  }, [filterData, dateFilter, dateLabel, title])

  /**
   * This function renders the content based on the loading status.
   * It uses the useCallback hook to prevent unnecessary re-renders.
   * If the loading status is 'Loading', it returns a LoadingView component.
   * If the loading status is 'Error', it returns a Box component with an error message.
   * Otherwise, it returns the children.
   * @function
   * @returns - Returns the content to be rendered.
   */
  const renderContent = useCallback(() => {
    switch (loading) {
      case LoadingStatus.Loading:
        return <LoadingView size={size} />

      case LoadingStatus.Error:
        return (
          <Box
            display={'flex'}
            textAlign={'center'}
            maxWidth={size === 'medium' ? '12rem' : 'auto'}
            data-testid={'item-tile-no-information'}
          >
            <Typography variant={'subtitle2'}>{t("We couldn't find the data. Please try later.")}</Typography>
          </Box>
        )

      default:
        return children
    }
  }, [loading, size, t, children])

  return (
    <Card
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        '&.MuiPaper-root': {
          background: theme.palette.background.level0,
        },
      }}
    >
      <CardHeader
        sx={{ padding: 'default', height: 'fit-content' }}
        action={
          <Box gap={'0.5rem'} display={'flex'} height={'fit-content'} width={'fit-content'}>
            {selectorAction ? (
              <ToggleButtonGroup
                size="small"
                color="primary"
                value={dateFilter}
                exclusive
                onChange={handleFilterChange}
                aria-label="range-selector"
              >
                {rangeButtons}
              </ToggleButtonGroup>
            ) : null}
            {downloadIcon ? (
              <IconButton size="small" color="info" aria-label="Download" onClick={handleDownloadClick}>
                <Download color={theme.palette.text.primary} />
              </IconButton>
            ) : null}
            {rightLabel ? (
              <Typography variant="subtitle2" padding={'0.5rem 0.5rem 0 0'} width={'fit-content'}>
                {t(rightLabel)}
              </Typography>
            ) : null}
            {href ? (
              <IconButton size="small" color="info" aria-label="Download" href={href}>
                <Launch color={theme.palette.text.primary} />
              </IconButton>
            ) : null}
          </Box>
        }
        title={
          !subheader ? (
            <Box display={'flex'} gap={'0.5rem'} alignItems={'center'}>
              {startIcon}
              <Typography variant="h5" component={'h2'} data-testid={'item-tile-heading'}>
                {t(title)}
              </Typography>
              {tooltip ? (
                <Tooltip data-testid="overview-item-tooltip" title={t(tooltip)} arrow disableInteractive>
                  <Help color={theme.palette.text.secondary} style={{ cursor: 'help' }} />
                </Tooltip>
              ) : null}
            </Box>
          ) : (
            title
          )
        }
        subheader={subheader}
      />
      <CardContent
        sx={{
          width: '100%',
          height: '100%',
          padding: padding ?? 'default',
          display: 'flex',
          justifyContent: 'center',
          alignItems: loading === LoadingStatus.Success ? 'flex-end' : 'center',
        }}
      >
        {renderContent()}
      </CardContent>
    </Card>
  )
}

export default ItemTile
