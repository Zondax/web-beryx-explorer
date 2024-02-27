import { GasUsedProps } from '@/api-client/beryx.types'

// Calculate gas used in the past 7 days
export const getGasUsedPast7Days = (data: GasUsedProps[]) => {
  const lastWeek = parseInt(data[data.length - 1].gas_used)
  const previousWeek = parseInt(data[data.length - 2].gas_used)

  return ((lastWeek - previousWeek) * 100) / previousWeek
}

// Calculate gas used in the past 24 hours
export const getGasUsedPast24Hours = (data: GasUsedProps[]) => {
  const lastDay = [...data].reverse().slice(0, 24)

  return lastDay.reduce((prev, current) => prev + parseInt(current.gas_used), 0)
}
