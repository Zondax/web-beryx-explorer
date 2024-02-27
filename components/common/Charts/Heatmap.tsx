/**
 * @file This file defines the Heatmap component.
 */
import { format } from 'date-fns-tz'
import ReactEcharts from 'echarts-for-react'

import { DecimalUnits, FilUnits } from '@/utils/numbers'
import { Box, useTheme } from '@mui/material'

/**
 * Interface for HeatmapChartProps
 * @interface HeatmapChartProps
 * @property {Array<{x: string, y: number}>} data - The data for the heatmap chart.
 * @property {string | undefined} name - The name of the heatmap chart. It is optional.
 * @property {filUnits | DecimalUnits | undefined} unit - The unit of the heatmap chart. It is optional.
 */
interface HeatmapChartProps {
  data: { x: string; y: number }[]
  name?: string
  unit?: FilUnits | DecimalUnits
}

/**
 * Heatmap component.
 * This component is used to display a heatmap chart.
 *
 * @param props - The properties for the Heatmap component.
 * @param props.data - The data for the heatmap chart.
 * @param props.name - The name of the heatmap chart. It is optional.
 * @param props.unit - The unit of the heatmap chart. It is optional.
 *
 * @returns - The Heatmap component.
 */
const Heatmap = ({ data, name, unit }: HeatmapChartProps): JSX.Element => {
  const theme = useTheme()

  const chartOptions = {
    grid: {
      top: '20%',
    },
    title: {
      show: false,
    },
    tooltip: {
      formatter: (param: { data: [string | number | Date, any]; marker: string }) =>
        `${format(new Date(param.data[0]), 'MMM dd yyyy')} <br /> ${param.marker} ${name ? `${name}:` : ''} <b>${param.data[1]} ${
          unit ? unit : ''
        }</b>`,
      backgroundColor: theme.palette.background.level2,
      borderWidth: 0,
      padding: [4, 8, 4, 8],
      textStyle: {
        color: theme.palette.text.primary,
      },
      extraCssText: 'box-shadow: none;',
    },
    visualMap: {
      min: Math.min(...data.map(({ y }) => y)),
      max: Math.max(...data.map(({ y }) => y)),
      type: 'piecewise',
      orient: 'horizontal',
      left: 'center',
      textStyle: {
        color: theme.palette.text.secondary,
      },
      top: 180,
      inRange: {
        color: Object.values(theme.palette.gradient1),
      },
    },
    calendar: {
      top: 16,
      left: 25,
      right: 25,
      cellSize: 18.5,
      z: 2,
      range: [
        format(new Date(Math.min(...data.map(({ x }) => new Date(x).getTime()))), 'yyyy-MM-dd'),
        format(new Date(Math.max(...data.map(({ x }) => new Date(x).getTime()))), 'yyyy-MM-dd'),
      ],
      itemStyle: {
        borderWidth: 3,
        borderColor: theme.palette.background.level1,
        color: theme.palette.background.level2,
      },
      splitLine: {
        lineStyle: {
          color: theme.palette.background.level1,
          width: 2,
          join: 'round',
          cap: 'round',
        },
      },
      yearLabel: { show: false },
      monthLabel: { color: theme.palette.text.secondary, nameMap: 'en' },
      dayLabel: { color: theme.palette.text.secondary },
    },
    series: {
      type: 'heatmap',
      coordinateSystem: 'calendar',
      data: data.map(({ x, y }) => [format(new Date(x), 'yyyy-MM-dd'), y]),
      itemStyle: {
        borderRadius: 2,
      },
      z: 3,
    },
  }
  return (
    <Box
      sx={{
        display: 'flex',
        overflowX: 'auto',
        height: '100%',
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: { xs: 'flex-start', lg: 'center' },
      }}
    >
      <ReactEcharts style={{ height: '100%', minWidth: '1000px', maxWidth: '1000px' }} option={chartOptions} />
    </Box>
  )
}

export default Heatmap
