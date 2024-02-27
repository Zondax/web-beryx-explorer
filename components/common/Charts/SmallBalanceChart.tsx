import BigNumber from 'bignumber.js'
import { graphic } from 'echarts'
import ReactEcharts from 'echarts-for-react'

import { amountFormat } from '@/config/config'
import { alpha } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { DataChartProps } from './config'

/**
 * Interface for the SmallBalanceChart component props
 */
interface SmallBalanceChartProps {
  data: {
    x: {
      values: number[]
      /**
       * Formatter function for the x-axis values, takes as input a number or string and returns a string.
       */
      formatter?: (param: string | number, dateFormat: string) => string
    }
    y: DataChartProps
  }
  /**
   * Color of the chart's lines and areas.
   * If not provided, the primary text color is used.
   */
  color?: string
}

/**
 * SmallBalanceChart component, responsible for rendering a chart visualization of the provided data.
 */
const SmallBalanceChart = ({ data, color }: SmallBalanceChartProps) => {
  const theme = useTheme()

  const chartOptions = {
    grid: {
      top: 1,
      right: 1,
      left: 1,
      bottom: 1,
    },
    title: {
      show: false,
    },
    xAxis: {
      data: data.x.values,
      axisLabel: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    yAxis: {
      zIndex: 200,
      type: 'value',
      splitLine: {
        lineStyle: {
          color: 'transparent',
        },
      },
      axisLabel: {
        show: false,
      },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line',
        axis: 'x',
      },
      renderMode: 'html',
      appendToBody: true,
      formatter: (param: any) => {
        return `${data.x.formatter ? data.x.formatter(param[0].name, 'MMM dd yyyy') : param[0].name} <br /> ${param[0].marker} ${
          data.y.name ? `${data.y.name}:` : ''
        } <b>${BigNumber(param[0].data?.value).toFormat(2, amountFormat)} ${data.y.unit ? data.y.unit : ''}</b>`
      },
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
    },
    series: [
      {
        name: data.y.name ? data.y.name : 'Count',
        animationEasing: 'quadraticInOut',
        data: data.y.values,
        type: 'line',
        smooth: 0.4,
        smoothMoonotone: 'y',
        symbol: 'none',
        sampling: 'lttb',
        emphasis: {
          focus: 'series',
          lineStyle: {
            width: 2,
            cap: 'round',
            color: alpha(color ?? theme.palette.text.primary, 1),
          },
        },
        lineStyle: {
          cap: 'round',
          width: 1.5,
          color: new graphic.LinearGradient(0, 0, 1, 1, [
            {
              offset: 0,
              color: alpha(color ?? theme.palette.text.primary, 0),
            },
            {
              offset: 0.9,
              color: alpha(color ?? theme.palette.text.primary, 1),
            },
          ]),
        },
        areaStyle: {
          color: new graphic.RadialGradient(0.5, -2.75, 3.85, [
            {
              offset: 0,
              color: alpha(color ?? theme.palette.text.primary, 0.5),
            },
            {
              offset: 1,
              color: alpha(color ?? theme.palette.text.primary, 0),
            },
          ]),
        },
      },
    ],
    darkMode: true,
  }

  return <ReactEcharts style={{ height: '100%', width: '100%' }} option={chartOptions} />
}

export default SmallBalanceChart
