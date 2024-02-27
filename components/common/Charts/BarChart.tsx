import ReactEcharts from 'echarts-for-react'

import { getDataZoom, getTooltip } from '@/utils/charts'
import { getFormattedValues } from '@/utils/dashboardFormatter'
import { Theme, useMediaQuery, useTheme } from '@mui/material'

import { DataChartProps } from './config'

/**
 * @interface BarChartProps
 * @description Interface for BarChartProps
 * @property data - The data for the chart.
 * @property data.x - The data and optional formatter for x-axis.
 * @property {Array<string>} data.x.values - The values for the x-axis.
 * @property [data.x.formatter] - The formatter for the x-axis values. It should return a Date.
 * @property data.y - The data for bar and line graph on y-axis.
 * @property {DataChartProps} data.y.bar - The data for the bar graph.
 * @property {DataChartProps} data.y.line - The data for the line graph.
 * @property [onChartClick] - The optional callback for click events on the chart. It should accept any parameters.
 */
interface BarChartProps {
  data: {
    x: {
      values: string[]
      formatter?: (value: string | number, formatDate?: string) => string
    }
    y: DataChartProps
  }
  color?: string
  onChartClick?: (params: any) => void
  hideDataZoom?: boolean
}

/**
 * BarLineChart component.
 *
 * @param props - The properties of the BarLineChart component.
 * @param props.data - The data for the chart.
 * @param [props.onChartClick] - The optional callback for click events on the chart.
 *
 * @returns - The JSX element of the BarLineChart component.
 */
const BarChart = ({ data, hideDataZoom = false, color, onChartClick }: BarChartProps) => {
  /**
   * @type {Theme} theme - The theme of the component.
   */
  const theme: Theme = useTheme()
  /**
   * @type {boolean} upLg - The flag to indicate if the screen size is up large.
   */
  const upLg: boolean = useMediaQuery(theme.breakpoints.up('lg'))

  /**
   * If the unit of the y-axis data is not defined, format the values.
   */
  if (!data.y.unit) {
    data.y = { ...data.y, ...getFormattedValues({ values: data.y.values }) }
  }

  // Charts configuration options
  const chartOptions = {
    grid: {
      top: '15%',
      right: upLg ? '10%' : '5%',
      left: upLg ? '10%' : '5%',
    },
    title: {
      show: false,
    },
    xAxis: [
      {
        data: data.x.values,
        boundaryGap: false,
        axisLabel: {
          zIndex: 200,
          formatter: (param: string) => (data.x.formatter ? data.x.formatter(param, 'MMM dd') : '{value}'),
        },
      },
    ],
    yAxis: [
      {
        zIndex: 200,
        type: 'value',
        name: data.y.unit ? data.y.unit : '',
        nameLocation: 'end',
        nameTextStyle: {
          align: 'right',
          fontWeight: 600,
        },
        splitLine: {
          lineStyle: {
            color: theme.palette.background.level2,
          },
        },
        axisLabel: {
          formatter: '{value}',
        },
      },
    ],
    tooltip: getTooltip(data, theme),
    dataZoom: getDataZoom(hideDataZoom, theme),
    series: [
      {
        name: data.y.name ? data.y.name : 'Count',
        type: 'bar',
        barWidth: '60%',
        data: data.y.values,
        color: color ?? '#4984DC',
      },
    ],
    darkMode: true,
  }

  /**
   * @description Handle click events if callback provided
   * @type {Object} onEvents - The object that contains the click event handler.
   * @property click - The click event handler. It is assigned the onChartClick function if it is provided.
   */
  const onEvents = onChartClick && { click: onChartClick }

  // returns the bar-line chart component
  return <ReactEcharts style={{ height: '100%', width: '100%' }} option={chartOptions} onEvents={onEvents} />
}

export default BarChart
