/**
 * @file This file contains utility functions for formatting dashboard data.
 */
import { isAfter } from 'date-fns'

import { ContractsProps, GasUsedProps } from '@/api-client/beryx.types'
import { FrequencyType } from '@/config/config'

import { availableUnits } from '../../components/views/ResultsView/ContractView/RunMethod/config'
import { getDateUTCFromTimestamp, getFollowingDate, isDateEqual } from './dates'
import { DecimalUnits, FilUnits, FormatFilOption, FormatNumberOption, formatFilOptions, formatNumberOptions } from './numbers'

/**
 * @function getFormattedValues
 * @description Format an array of values to the most convenient unit.
 * For example, if the highest value is 1 000 000, the unit will be M
 * @param values - An array of objects with a value property
 * @returns An object containing the formatted values and the unit used
 */
export const getFormattedValues = ({ values }: { values: { value: number }[] }): { values: { value: number }[]; unit?: DecimalUnits } => {
  let currentUnit: FormatNumberOption | undefined
  let unit: DecimalUnits | undefined

  for (const { unit, minValue } of formatNumberOptions) {
    if (values.some(elem => elem.value >= minValue)) {
      currentUnit = { unit, minValue }
      break
    }
  }

  if (currentUnit) {
    values = values.map(elem => {
      elem.value /= currentUnit?.minValue ?? 1
      return elem
    })
    unit = currentUnit?.unit
  }

  return { values, unit }
}

/**
 * @function getFormattedFilValues
 * @description Format an array of fil values to the most convenient unit.
 * The received values should be in attoFIL.
 * For example, if the highest value is 1 000 000, the unit will be nanoFIL
 * @param values - An array of objects with a value property
 * @returns An object containing the formatted values and the unit used
 */
export const getFormattedFilValues = (values: { value: number }[]): { values: { value: number }[]; unit: FilUnits } => {
  let currentUnit: FormatFilOption | undefined

  for (const { unit, minValue } of formatFilOptions) {
    if (values.some(elem => elem.value >= minValue)) {
      currentUnit = { unit, minValue }
      break
    }
  }

  if (currentUnit) {
    values = values.map(elem => {
      let transformedValue: number
      switch (currentUnit?.unit) {
        case 'FIL':
          transformedValue = parseFloat(availableUnits['attoFIL'](elem.value.toString()).toWhole())
          elem.value = transformedValue % 1 !== 0 ? parseFloat(transformedValue.toFixed(2)) : transformedValue
          break
        case 'nanoFIL':
          transformedValue = parseFloat(availableUnits['attoFIL'](elem.value.toString()).toNano())
          elem.value = transformedValue % 1 !== 0 ? parseFloat(transformedValue.toFixed(2)) : transformedValue
          break
        default:
      }
      return elem
    })
  }

  return { values, unit: currentUnit?.unit ?? 'attoFIL' }
}

/**
 * @function completeGasRange
 * @description Complete the missing elements in the interval with zero as gas_used
 * @param frequency - The FrequencyType
 * @param data - The GasUsedProps array
 * @returns A completed array with GasUsed elements
 */
export const completeGasRange = ({ frequency, data }: { frequency: FrequencyType; data: GasUsedProps[] }): GasUsedProps[] => {
  let dateArray: GasUsedProps[] = []
  const endDate = new Date().getTime()

  // Determines if the data array is in descending order based on the 'bucket' property.
  const isBucketDesc = data.length > 1 ? new Date(data[0].bucket).getTime() > new Date(data[1].bucket).getTime() : false

  // Reverses the order of the 'data' array if it is determined to be in descending order based on the 'bucket' property.
  if (isBucketDesc) {
    data = [...data].reverse()
  }

  let currentDate = new Date(data[0].bucket).getTime()
  let index = 0 // index of the Analyzed position in the data

  const addMissingDates = () => {
    // The current date is greater or equal than today.
    if (isAfter(currentDate, endDate) || isDateEqual(currentDate, endDate, frequency)) {
      return
    }

    if (data[index] && isDateEqual(currentDate, new Date(data[index].bucket).getTime(), frequency)) {
      dateArray.push(data[index])
      index += 1
      currentDate = getFollowingDate(frequency, new Date(currentDate)).getTime()
    } else {
      dateArray.push({
        bucket: `${getDateUTCFromTimestamp(currentDate, 'yyyy-MM-dd')}T${getDateUTCFromTimestamp(currentDate, 'HH:mm:ss')}Z`,
        gas_used: '0',
      })
      currentDate = getFollowingDate(frequency, currentDate).getTime()
    }

    addMissingDates()
  }

  addMissingDates()

  if (isBucketDesc) {
    dateArray = [...dateArray].reverse()
  }

  return dateArray
}

/**
 * @function completeContractsRange
 * @description Complete the missing elements in the interval with zero as gas_used
 * @param frequency - The FrequencyType
 * @param data - The GasUsedProps array
 * @returns A completed array with GasUsed elements
 */
export const completeContractsRange = ({ frequency, data }: { frequency: FrequencyType; data: ContractsProps[] }): ContractsProps[] => {
  let dateArray: ContractsProps[] = []
  const endDate = new Date().getTime()

  // Determines if the data array is in descending order based on the 'bucket' property.
  const isBucketDesc = data.length > 1 ? new Date(data[0].bucket).getTime() > new Date(data[1].bucket).getTime() : false

  // Reverses the order of the 'data' array if it is determined to be in descending order based on the 'bucket' property.
  if (isBucketDesc) {
    data = [...data].reverse()
  }

  let currentDate = new Date(data[0].bucket).getTime()
  let index = 0 // index of the Analyzed position in the data

  const addMissingDates = () => {
    // The current date is greater or equal than today.
    if (isAfter(currentDate, endDate) || isDateEqual(currentDate, endDate, frequency)) {
      return
    }

    if (data[index] && isDateEqual(currentDate, new Date(data[index].bucket).getTime(), frequency)) {
      dateArray.push(data[index])
      index += 1
      currentDate = getFollowingDate(frequency, new Date(currentDate)).getTime()
    } else {
      dateArray.push({
        bucket: `${getDateUTCFromTimestamp(currentDate, 'yyyy-MM-dd')}T${getDateUTCFromTimestamp(currentDate, 'HH:mm:ss')}Z`,
        count: 0,
      })
      currentDate = getFollowingDate(frequency, currentDate).getTime()
    }

    addMissingDates()
  }

  addMissingDates()

  if (isBucketDesc) {
    dateArray = [...dateArray].reverse()
  }
  return dateArray
}

/**
 * @function getContractInvokesCurrentWeek
 * @description Calculates the percentage change in the number of contract invokes between the last two weeks.
 * @param data - An array of ContractsProps representing contract invoke counts over time. It must be in ascending order by bucket.
 * @returns The percentage change in the number of contract invokes between the last two weeks.
 */
export const getContractInvokesCurrentWeek = (data: ContractsProps[]): number => {
  const lastWeek = data[data.length - 1].count
  const previousWeek = data[data.length - 2].count

  // Calculate the percentage change, considering a zero value in the previous week as a special case
  return previousWeek === 0 ? lastWeek : ((lastWeek - previousWeek) * 100) / previousWeek
}

/**
 * @function getGasUsedCurrentWeek
 * @description Calculates the percentage change in gas usage between the last two weeks.
 * @param data - An array of GasUsedProps representing gas usage over time. It must be in ascending order by bucket.
 * @returns The percentage change in gas usage between the last two weeks.
 */
export const getGasUsedCurrentWeek = (data: GasUsedProps[]): number => {
  const lastWeek = parseInt(data[data.length - 1].gas_used)
  const previousWeek = parseInt(data[data.length - 2].gas_used)

  // Calculate the percentage change, considering a zero value in the previous week as a special case
  return previousWeek === 0 ? lastWeek : ((lastWeek - previousWeek) * 100) / previousWeek
}
