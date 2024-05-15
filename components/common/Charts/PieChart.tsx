import ReactEcharts from 'echarts-for-react'

import { getCommonStyleTooltip } from '@/utils/charts'
import { Theme, useMediaQuery, useTheme } from '@mui/material'

import { txTypeColor } from '../TransactionTypeLabel/MethodDefinitions'

export interface PieChartValueProps {
  value: number
  visualValue?: number
  name: string
  tooltipLabel?: string[]
}

/**
 * @interface PieChartProps
 * @description Interface for PieChartProps
 * @property data - The data for the chart.
 * @property [onChartClick] - The optional callback for click events on the chart. It should accept any parameters.
 */
interface PieChartProps {
  data: PieChartValueProps[]
  name?: string
  color?: string
  onChartClick?: (params: any) => void
  hideDataZoom?: boolean
  highLightedData?: string
}

/**
 * PieChart component.
 *
 * @param props - The properties of the PieChart component.
 * @param props.data - The data for the chart.
 * @param [props.onChartClick] - The optional callback for click events on the chart.
 *
 * @returns - The JSX element of the PieChart component.
 */
const PieChart = ({ name, data, onChartClick, highLightedData }: PieChartProps) => {
  /**
   * @type {Theme} theme - The theme of the component.
   */
  const theme: Theme = useTheme()
  /**
   * @type {boolean} upLg - The flag to indicate if the screen size is up large.
   */
  const upLg: boolean = useMediaQuery(theme.breakpoints.up('lg'))

  // Charts configuration options
  const chartOptions = {
    tooltip: {
      trigger: 'item',
      formatter: ({ data, marker }: { data: PieChartValueProps; marker: string }) =>
        `${data.tooltipLabel ? data.tooltipLabel.join('<br />') : data?.name} <br /> ${marker} ${data.value ?? ''}`,
      ...getCommonStyleTooltip(theme),
    },
    grid: {
      right: upLg ? '10%' : '5%',
      left: upLg ? '10%' : '5%',
    },
    title: {
      show: false,
    },
    series: [
      {
        name: name ?? '',
        type: 'pie',
        radius: ['30%', '60%'],
        avoidLabelOverlap: true,
        stillShowZeroSum: false,
        showEmptyCircle: true,
        color: Object.values(theme.palette.gradient1),
        emptyCircleStyle: {
          color: theme.palette.border?.level0,
        },
        itemStyle: {
          borderRadius: 0,
          borderColor: theme.palette.background.level0,
          borderWidth: 1,
          color(params: any) {
            const color = txTypeColor(theme.palette.mode, params.data.name)
            if (!highLightedData) {
              return color
            }
            return highLightedData === params.data.name ? color : theme.palette.background.level2
          },
        },
        label: {
          alignTo: 'edge',
          formatter: '{percentage|{d}%}\n{name|{b}}',
          minMargin: 12,
          edgeDistance: 0,
          lineHeight: 18,
          distanceToLabelLine: 10,
          color: 'inherit',
          rich: {
            name: {
              ...theme.typography.subtitle2,
              lineHeight: 18,
            },
            percentage: {
              ...theme.typography.h4,
              lineHeight: 18,
            },
          },
        },
        labelLine: {
          length: 25,
          length2: 0,
          maxSurfaceAngle: 80,
          smooth: true,
          lineStyle: {
            type: 'dotted',
            width: 1.5,
            opacity: 0.6,
          },
        },
        labelLayout: {
          draggable: true,
        },
        emphasis: {
          label: {
            color: 'red',
          },
        },
        data: data.map(item => ({
          ...item,
          value: item.visualValue ?? item.value,
        })),
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

export default PieChart
