import { Theme } from '@mui/material'

import { DataChartProps } from 'components/common/Charts/config'

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
  borderColor: theme.palette.tableBorder,
  padding: [4, 8, 4, 8],
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

export const getTooltip = (
  data: {
    x: {
      values: string[]
      formatter?: (param: string, dateFormat: string) => string
    }
    y: DataChartProps
  },
  theme: Theme
) => ({
  trigger: 'axis',
  formatter: (param: {
    0: {
      name: string
      marker: string
      data?: { value: any }
    }
  }) =>
    `${data.x.formatter ? data.x.formatter(param[0].name, 'MMM dd yyyy') : param[0].name} <br /> ${param[0].marker} ${
      data.y.name ? `${data.y.name}:` : ''
    } <b>${param[0].data?.value} ${data.y.unit ? data.y.unit : ''}</b>`,
  ...getCommonStyleTooltip(theme),
})

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
          borderColor: theme.palette.tableBorder,
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
              color: theme.palette.tableBorder,
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
