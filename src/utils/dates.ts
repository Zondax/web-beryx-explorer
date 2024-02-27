import BigNumber from 'bignumber.js'
import { addDays, addHours, addMonths, addWeeks, isEqual, setHours, startOfMonth, startOfWeek } from 'date-fns'
import { format, utcToZonedTime } from 'date-fns-tz'

import { FrequencyType } from '@/config/config'
import { NetworkType, Networks } from '@/config/networks'

/**
 * Returns the time that has elapsed since the current time.
 * @param date - The date to calculate the elapsed time from. Can be a number, string or Date object.
 * @returns A string representing the elapsed time.
 */
export const timeSince = (date: number | string | Date) => {
  let convertedDate
  if (typeof date === 'number') {
    convertedDate = new Date(date * 1000)
  } else if (typeof date === 'string') {
    convertedDate = new Date(date)
  } else {
    convertedDate = new Date(date)
  }
  const seconds = Math.floor((new Date().valueOf() - convertedDate.valueOf()) / 1000)

  let interval = seconds / 31536000
  if (interval > 1) {
    return `${Math.floor(interval)} year${Math.floor(interval) === 1 ? '' : 's'}`
  }
  interval = seconds / 2592000
  if (interval > 1) {
    return `${Math.floor(interval)} month${Math.floor(interval) === 1 ? '' : 's'}`
  }
  interval = seconds / 86400
  if (interval > 1) {
    return `${Math.floor(interval)} day${Math.floor(interval) === 1 ? '' : 's'}`
  }
  interval = seconds / 3600
  if (interval > 1) {
    return `${Math.floor(interval)} hour${Math.floor(interval) === 1 ? '' : 's'}`
  }
  interval = seconds / 60
  if (interval > 1) {
    return `${Math.floor(interval)} minute${Math.floor(interval) === 1 ? '' : 's'}`
  }
  interval = seconds
  return `${Math.floor(interval)} second${Math.floor(interval) === 1 ? '' : 's'}`
}

/**
 * Returns a formatted date depending on the parameters.
 * Default format date: 'dd-MMM-yyyy hh:mm aa'
 * @param date - The date to format. Can be a string or Date object.
 * @param timezone - The timezone to use for formatting. Optional.
 * @param showTimezone - Whether to include the timezone in the formatted string. Optional.
 * @param formatDate - The format to use for the date. Optional.
 * @returns A string representing the formatted date.
 */
export const newDateFormat = (date: string | Date, timezone?: string, showTimezone?: boolean, formatDate?: string) => {
  if (!date) {
    return ''
  }
  if (timezone) {
    return `${format(utcToZonedTime(date, timezone), formatDate ?? 'dd-MMM-yyyy hh:mm aa', { timeZone: timezone })}${
      showTimezone ? ` (${timezone})` : ''
    }`
  }
  return `${format(new Date(date), formatDate ?? 'dd-MMM-yyyy hh:mm aa')}`
}

/**
 * Expect to receive a value as a string or timestamp (if the timestamp is a string, it's converted to number)
 * For example, value: "1679575590" - dateFormat: "MM dd yyyy"
 * @param value - The value to convert to a date. Can be a string or number.
 * @param formatDate - The format to use for the date. Optional.
 * @returns A string representing the formatted date.
 */
export const getDateUTCFromTimestamp = (value: string | number, formatDate?: string) => {
  const numValue = typeof value === 'string' ? parseInt(value) : value
  if (isNaN(numValue)) {
    return value.toString()
  }

  try {
    return newDateFormat(new Date(numValue), 'UTC', false, formatDate)
  } catch (e) {
    return value.toString()
  }
}

/**
 * Expect to receive a value as a string or timestamp
 * For example, value: "2023-10-12T16:22:16Z" - dateFormat: "MM dd yyyy"
 * @param value - The value to convert to a date. Can be a string or number.
 * @param formatDate - The format to use for the date. Optional.
 * @returns A string representing the formatted date.
 */
export const getDateUTC = (value: string | number, formatDate?: string) => {
  let date: string | Date
  if (typeof value === 'number') {
    date = new Date(value * 1000)
  } else {
    date = value
  }

  try {
    return newDateFormat(date, 'UTC', false, formatDate)
  } catch (e) {
    return value.toString()
  }
}

export const getFollowingDate = (frequency: FrequencyType, currentDate: Date | number): Date => {
  let newDate: Date
  switch (frequency) {
    case 'hourly':
      newDate = addHours(currentDate, 1)
      break
    case 'daily':
      newDate = addDays(currentDate, 1)
      break
    case 'weekly':
      newDate = addWeeks(currentDate, 1)
      break
    case 'monthly':
      newDate = addMonths(currentDate, 1)
      break
    default:
      newDate = addDays(currentDate, 1)
  }
  return newDate
}

/**
 * Check if the first date is equal to the second date based on the frequency
 * @param date1 - The first date to compare.
 * @param date2 - The second date to compare.
 * @param frequency - The frequency to use for the comparison.
 * @returns A boolean representing if the first date is equal to the second date.
 */
export const isDateEqual = (date1: Date | number, date2: Date | number, frequency: FrequencyType): boolean => {
  switch (frequency) {
    case 'hourly':
      return isEqual(setHours(date1, 0), setHours(date2, 0))
    case 'daily':
      return isEqual(setHours(date1, 0), setHours(date2, 0))
    case 'weekly':
      return isEqual(startOfWeek(date1), startOfWeek(date2))
    case 'monthly':
      return isEqual(startOfMonth(date1), startOfMonth(date2))
    default:
      return false
  }
}

/**
 * Converts a block height to a timestamp.
 *
 * @param height - The block height.
 * @param network - The network type.
 * @returns - The timestamp.
 */
export const convertHeightToTimestamp = (height: number, network: NetworkType) => {
  let firstTipsetTimestamp
  switch (network.uniqueId) {
    case Networks.mainnet.uniqueId:
      firstTipsetTimestamp = new BigNumber(new Date('2020-08-24T22:00:00Z').getTime() / 1000)
      break
    case Networks.calibration.uniqueId:
      firstTipsetTimestamp = new BigNumber(new Date('2022-11-01T18:13:00Z').getTime() / 1000)
      break
    default:
      firstTipsetTimestamp = new BigNumber(new Date('2020-08-24T22:00:00Z').getTime() / 1000)
  }
  const secondsDifference = new BigNumber(height).multipliedBy(30)
  const timestamp = firstTipsetTimestamp.plus(secondsDifference).multipliedBy(1000)

  return timestamp.toNumber()
}
