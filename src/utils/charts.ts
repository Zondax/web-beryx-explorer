import { Theme } from '@mui/material'

import { DataChartProps } from 'components/common/Charts/config'

import { convertAndFormatFilValue } from './dashboardFormatter'
import { FilUnits, FilUnitsArray } from './numbers'

/**
 * Function to get the common style of the tooltip.
 *
 * @param props - The properties of the PieChart component.
 * @param theme - Type Theme.
 *
 * @returns - An object with the common style.
 */
export const getCommonStyleTooltip = (theme: Theme) => ({
  backgroundColor: theme.palette.background.level2,
  borderWidth: 1,
  borderColor: theme.palette.border?.level0,
  padding: [4, 8, 4, 8],
  margin: [2, 0, 0, 0],
  textStyle: {
    color: theme.palette.text.primary,
  },
  extraCssText: `box-shadow: ${
    theme.palette.mode === 'dark'
      ? 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.18) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.1) 0px -3px 5px'
      : 'rgba(0, 0, 2, 0.125) 0px 20px 55px -5px, rgba(0, 0, 2, 0.012) 0px -12px 30px, rgba(0, 0, 2, 0.058) 0px 4px 6px, rgba(0, 0, 2, 0.027) 0px 12px 13px, rgba(0, 0, 0, 0.05) 0px -3px 5px'
  }; border-radius: 8px; padding: 8px 12px;`,
  zIndex: 9999,
})

/**
 * Function to get the tooltip configuration for charts.
 *
 * @param data - The data object containing x and y values and optional formatter.
 * @param theme - The theme object containing palette and other styling information.
 * @param hour - Optional boolean indicating whether to include hour in the date format.
 *
 * @returns - An object with the tooltip configuration.
 */
export const getTooltip = (
  data: {
    x: {
      values: string[]
      formatter?: (param: string, dateFormat: string) => string
    }
    y: DataChartProps
  },
  theme: Theme,
  hour?: boolean
) => ({
  trigger: 'axis',
  formatter: (param: {
    0: {
      name: string
      marker: string
      data?: { value: any }
    }
  }) => {
    const dateFormat = `MMM dd yyyy${hour ? ' hh:mm' : ''}`
    const formattedDate = data.x.formatter ? data.x.formatter(param[0].name, dateFormat) : param[0].name
    const yName = data.y.name ? `${data.y.name}:` : ''
    let yValue = param[0].data?.value
    let yUnit = data.y.unit ? data.y.unit : ''

    if (FilUnitsArray.includes(yUnit as FilUnits)) {
      ;({ value: yValue, unit: yUnit } = convertAndFormatFilValue(parseFloat(yValue), yUnit as FilUnits, undefined, 2))
    }
    return `${formattedDate} <br /> ${param[0].marker} ${yName} <b>${yValue} ${yUnit}</b>`
  },
  ...getCommonStyleTooltip(theme),
})

/**
 * Function to get the data zoom configuration for charts.
 *
 * @param hideDataZoom - A boolean indicating whether to hide the data zoom feature.
 * @param theme - The theme object containing palette and other styling information.
 *
 * @returns - An array of data zoom configuration objects or undefined if hideDataZoom is true.
 */
export const getDataZoom = (hideDataZoom: boolean, theme: Theme) =>
  !hideDataZoom
    ? [
        {
          type: 'inside',
          start: 0,
          end: 100,
          minSpan: 10,
        },
        {
          type: 'slider',
          height: 26,
          start: 0,
          end: 100,
          minSpan: 10,
          showDetail: false,
          backgroundColor: 'transparent',
          fillerColor: 'transparent',
          borderColor: theme.palette.border?.level0,
          borderRadius: '4px',
          handleStyle: {
            color: theme.palette.mode === 'light' ? theme.palette.background.level0 : theme.palette.text.secondary,
            borderColor: theme.palette.tableParentRowBackgroundFocused,
            shadowColor: 'transparent',
            borderWidth: 1,
          },
          moveHandleStyle: {
            color: theme.palette.mode === 'light' ? theme.palette.background.level0 : theme.palette.text.secondary,
            borderColor: theme.palette.tableParentRowBackgroundFocused,
          },
          emphasis: {
            handleStyle: {
              color: theme.palette.text.secondary,
              borderColor: theme.palette.text.tertiary,
              borderWidth: 1,
              shadowColor: 'transparent',
            },
            moveHandleStyle: {
              color: theme.palette.text.secondary,
              borderColor: theme.palette.text.tertiary,
            },
          },
          dataBackground: {
            lineStyle: {
              cap: 'round',
              color: theme.palette.text.secondary,
            },
            areaStyle: {
              color: theme.palette.border?.level0,
            },
          },
          selectedDataBackground: {
            lineStyle: {
              cap: 'round',
              width: 1,
              color: theme.palette.text.secondary,
            },
            areaStyle: {
              color: theme.palette.text.secondary,
            },
          },
        },
      ]
    : undefined
