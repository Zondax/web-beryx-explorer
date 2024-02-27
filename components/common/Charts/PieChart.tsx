import ReactEcharts from 'echarts-for-react'

import { getCommonStyleTooltip } from '@/utils/charts'
import { Theme, useMediaQuery, useTheme } from '@mui/material'

export interface PieChartValueProps {
  value: number
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
const PieChart = ({ name, data, onChartClick }: PieChartProps) => {
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
      formatter: ({ data: { name, tooltipLabel, value }, marker }: { data: PieChartValueProps; marker: string }) =>
        `${tooltipLabel ? tooltipLabel.join('<br />') : name} <br /> ${marker} ${value ?? ''}`,
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
        radius: ['40%', '70%'],
        avoidLabelOverlap: true,
        stillShowZeroSum: false,
        showEmptyCircle: true,
        color: Object.values(theme.palette.gradient1),
        emptyCircleStyle: {
          color: theme.palette.tableBorder,
        },
        itemStyle: {
          borderRadius: 3,
          borderColor: theme.palette.background.level1,
          borderWidth: 1,
        },
        label: {
          alignTo: 'edge',
          formatter: '{percentage|{d}%}\n{name|{b}}',
          color: theme.palette.text.secondary,
          minMargin: 5,
          edgeDistance: 0,
          lineHeight: 15,
          distanceToLabelLine: 10,
          rich: {
            name: {
              ...theme.typography.subtitle2,
              lineHeight: 15,
              color: '#999',
            },
            percentage: {
              ...theme.typography.h4,
              lineHeight: 15,
            },
          },
        },
        labelLine: {
          length: 25,
          length2: 0,
          maxSurfaceAngle: 80,
          lineStyle: {
            color: theme.palette.tableChildRowBackgroundFocused,
            type: 'dotted',
            width: 2,
          },
        },
        labelLayout: {
          draggable: true,
        },
        data,
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
