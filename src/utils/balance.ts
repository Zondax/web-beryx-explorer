/**
 * @file This file contains utility functions for handling balance related operations.
 */
import BigNumber from 'bignumber.js'

import { ValueFlow } from '@/api-client/beryx.types'
import { chainDecimals } from '@/config/config'
import { NetworkType } from '@/config/networks'
import { captureException } from '@sentry/nextjs'

import { convertHeightToTimestamp } from './dates'

const MAX_VALUE_COUNT = 365

/**
 * Downsamples data to a maximum number of items using min-max method.
 *
 * @param data - The data to downsample.
 * @param maxItems - The maximum number of items to downsample to.
 * @param skip - The number of items to skip at the start and end of the data.
 * @returns - The downsampled data.
 */
export const downsampleDataMinMax = (data: Array<{ timestamp: number; value: string }>, maxItems = 1000) => {
  if (data.length <= maxItems) {
    return data
  }

  // Calculate the number of blocks to skip to ensure the number of values is under maxItems
  const blocksToSkip = Math.ceil(data.length / maxItems)

  const downsampledData: { timestamp: number; value: string }[] = []

  for (let i = 0; i < data.length; i += blocksToSkip) {
    const block = data.slice(i, Math.min(i + blocksToSkip, data.length))

    if (block.length === 1) {
      downsampledData.push(block[0])
    } else {
      const min = block.reduce((prev, curr) => (prev.value < curr.value ? prev : curr))
      const max = block.reduce((prev, curr) => (prev.value > curr.value ? prev : curr))

      if (min === max) {
        downsampledData.push(min)
      } else {
        if (blocksToSkip <= 2) {
          if ((i / 2) % 2 === 0) {
            downsampledData.push(max)
          } else {
            downsampledData.push(min)
          }
        } else {
          if (min.timestamp < max.timestamp) {
            downsampledData.push(min, max)
          } else {
            downsampledData.push(max, min)
          }
        }
      }
    }
  }

  return downsampledData
}

/**
 * Filters data to keep only the last item of each day.
 *
 * @param data - The data to filter.
 * @returns - The filtered data.
 */
export const filterLastItemPerDay = (data: Array<{ timestamp: number; value: string }>) => {
  const filteredData: { timestamp: number; value: string }[] = []
  let currentDay = -1

  for (let i = data.length - 1; i >= 0; i--) {
    const date = new Date(data[i].timestamp)
    if (date.getDate() !== currentDay) {
      currentDay = date.getDate()
      filteredData.unshift(data[i])
    }
  }

  return filteredData
}

/**
 * Formats the value flow data.
 *
 * @param data - The value flow data.
 * @param network - The network type.
 * @returns - The formatted data or 'error' if negative values are found.
 */
export const formatValueFlowData = (data: Array<{ height: number; value: string }>, network: NetworkType) => {
  let accumulatedValue = new BigNumber(0)
  let hasNegativeValues = false
  const result = data.map(item => {
    const fil = new BigNumber(item.value).div(Math.pow(10, chainDecimals.filecoin))
    accumulatedValue = accumulatedValue.plus(fil)
    if (accumulatedValue.isLessThan(0)) {
      hasNegativeValues = true
    }
    const timestamp = convertHeightToTimestamp(item.height, network)

    return { timestamp, value: accumulatedValue.toFixed() }
  })

  const today = new Date().setHours(0, 0, 0, 0)
  const lastItem = result[result.length - 1]
  if (lastItem) {
    const lastDate = new Date(lastItem.timestamp)
    lastDate.setHours(0, 0, 0, 0)
    const lastValue = lastItem.value

    while (lastDate.getTime() < today) {
      lastDate.setDate(lastDate.getDate() + 1)
      result.push({ timestamp: lastDate.getTime(), value: lastValue })
    }
  }

  if (hasNegativeValues) {
    return 'error'
  }
  return result
}

/**
 * Fetches and formats the balance over time data for an address.
 *
 * @param address - The address to fetch the balance over time data for.
 * @param network - The network type.
 * @returns - The balance over time data or 'error' if an error occurred.
 */
export const getBalanceOverTime = (
  address: string,
  network: NetworkType,
  valueFlow: ValueFlow[]
): { timestamp: number; value: string }[] | 'error' => {
  if (!valueFlow) {
    return []
  }

  const formattedBalances = formatValueFlowData(valueFlow, network)
  if (formattedBalances === 'error') {
    captureException(new Error('Negative Balance'), {
      extra: {
        description: `Found a negative balance values for ${address} in ${network.name}`,
      },
    })
    return 'error'
  }

  return downsampleDataMinMax(filterLastItemPerDay(formattedBalances), MAX_VALUE_COUNT)
}
