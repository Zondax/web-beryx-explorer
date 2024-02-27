import ReactEcharts from 'echarts-for-react'

import { getFormattedValues } from '@/utils/dashboardFormatter'
import { Theme, useTheme } from '@mui/material'
import { red } from '@mui/material/colors'

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
    y: {
      bar: DataChartProps
      line: DataChartProps
    }
  }
  onChartClick?: (params: any) => void
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
const BarLineChart = ({ data, onChartClick }: BarChartProps) => {
  /**
   * @type {Theme} theme - The theme of the component.
   */
  const theme: Theme = useTheme()

  // format bar and line graph data
  data.y.bar = getFormattedValues(data.y.bar)
  data.y.line = getFormattedValues(data.y.line)

  // Charts configuration options
  const chartOptions = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    legend: {
      data: data.y.bar.name && data.y.line.name ? [data.y.bar.name, data.y.line.name] : [],
      textStyle: {
        color: theme.palette.text.secondary,
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '60',
      containLabel: true,
    },
    xAxis: [
      {
        data: data.x.values,
        axisTick: {
          alignWithLabel: true,
        },
        axisLabel: {
          formatter: data.x.formatter ? data.x.formatter : '{value}',
        },
      },
    ],
    yAxis: [
      {
        name: data.y.bar.name ? data.y.bar.name : '',
        nameLocation: 'end',
        nameTextStyle: {
          align: 'right',
          fontWeight: 600,
        },
        position: 'left',
        alignTicks: true,
        splitLine: {
          lineStyle: {
            color: theme.palette.background.level2,
          },
        },
        axisLabel: {
          formatter: '{value}',
        },
      },
      {
        type: 'value',
        name: data.y.line.name ? data.y.line.name : '',
        position: 'right',
        alignTicks: true,
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
    series: [
      {
        name: data.y.bar.name,
        type: 'bar',
        barWidth: '60%',
        data: data.y.bar.values,
        color: '#4984DC',
      },
      {
        name: data.y.line.name,
        type: 'line',
        data: data.y.line.values,
        smooth: true,
        color: red[400],
        yAxisIndex: 1,
      },
    ],
    darkMode: true,
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 100,
        minSpan: 10,
      },
      {
        type: 'slider',
        start: 0,
        end: 100,
        minSpan: 10,
      },
    ],
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

export default BarLineChart
