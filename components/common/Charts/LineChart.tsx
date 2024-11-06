import { graphic } from 'echarts'
import ReactEcharts from 'echarts-for-react'
import { useMemo } from 'react'

import { getDataZoom, getTooltip } from '@/utils/charts'
import { getFormattedValues } from '@/utils/dashboardFormatter'
import { Theme, alpha, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { DataChartProps } from './config'

/**
 * Props type for the LineChart component.
 *
 * @interface LineChartProps
 * @property {object} data - The data to show in the chart
 * @property color - Line color of the chart
 * @property cumulative - The flag if the data is cumulative
 * @property onChartClick - The function that will execute when chart clicked
 */
interface LineChartProps {
  data: {
    x: {
      values: string[]
      formatter?: (param: string, dateFormat: string) => string
    }
    y: DataChartProps
  }
  color?: string
  cumulative?: boolean
  onChartClick?: (params: any) => void
  hideDataZoom?: boolean
  basicChart?: boolean
  tooltipHour?: boolean
}

/**
 * LineChart component.
 *
 * This component provides the line chart interface.
 *
 *
 * @returns - The JSX element of the LineChart component.
 */
const LineChart = ({ data, onChartClick, color, cumulative, hideDataZoom = false, basicChart, tooltipHour }: LineChartProps) => {
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

  const series = useMemo(() => {
    let cumulativeSum = 0
    const cumulativeValues = data.y.values.map(({ value }) => {
      cumulativeSum += value
      return { value: cumulativeSum }
    })

    const commonSettings = {
      smooth: 0.2,
      sampling: 'lttb',
      showSymbol: false,
      symbol: 'emptyCircle',
      showAllSymbol: 'auto',
      itemStyle: {
        color: color ?? theme.palette.text.primary,
      },
      lineStyle: {
        color: color ?? theme.palette.text.primary,
      },
      areaStyle: {
        color: new graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: alpha(color ?? theme.palette.text.primary, 0.8),
          },
          {
            offset: 1,
            color: alpha(color ?? theme.palette.text.primary, 0.01),
          },
        ]),
      },
    }

    const seriesArray = [
      {
        ...commonSettings,
        name: data.y.name ? data.y.name : 'Count',
        data: data.y.values,
        type: 'line',
      },
    ]

    if (cumulative) {
      seriesArray.push({
        ...commonSettings,
        name: 'Cumulative',
        data: cumulativeValues,
        type: 'line',
        smooth: 1,
        sampling: 'average',
        symbol: 'none',
      })
    }
    return seriesArray
  }, [data.y.name, data.y.values, color, cumulative, theme.palette.text.primary])

  const chartOptions = {
    grid: {
      top: basicChart ? '80%' : '15%',
      right: upLg ? '8%' : '5%',
      left: upLg ? '12%' : '11%',
    },
    title: {
      show: false,
    },
    xAxis: {
      data: data.x.values,
      boundaryGap: false,
      axisLabel: {
        zIndex: 200,
        formatter: (param: string) => (data.x.formatter ? data.x.formatter(param, 'MMM dd') : '{value}'),
      },
      show: !basicChart,
    },
    yAxis: {
      zIndex: 200,
      type: 'value',
      name: data.y.unit ? data.y.unit : '',
      nameLocation: 'end',
      show: !basicChart,
      nameTextStyle: {
        align: 'right',
        fontWeight: 600,
      },
      splitLine: {
        lineStyle: {
          color: theme.palette.background.level2,
        },
        show: !basicChart,
      },
      axisLabel: {
        formatter: (value: number) => {
          if (value >= 1000000000) {
            return `${value / 1000000000}B`
          }
          if (value >= 1000000) {
            return `${value / 1000000}M`
          }
          if (value >= 1000) {
            return `${value / 1000}k`
          }
          if (value < 1 && value > 0) {
            return value.toFixed(2)
          }
          if (value === 0) {
            return '0'
          }
          return value.toString()
        },
      },
    },
    tooltip: getTooltip(data, theme, tooltipHour),
    dataZoom: getDataZoom(hideDataZoom, theme),
    series,
    darkMode: true,
  }

  const onEvents = onChartClick
    ? {
        click: onChartClick,
      }
    : undefined

  return <ReactEcharts style={{ height: '100%', width: '100%' }} option={chartOptions} onEvents={onEvents} />
}

export default LineChart
