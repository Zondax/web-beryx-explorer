/**
 * @file This file contains tests for date utility functions.
 */
import { getDateUTC, getDateUTCFromTimestamp, isDateEqual, newDateFormat, timeSince } from '@/utils/dates'

/**
 * @description Test values for timeSince function
 */
const timesValues = [
  { time: 60000, output: '60 seconds' },
  { time: 30000, output: '30 seconds' },
  { time: 65000, output: '1 minute' },
  { time: 180000, output: '3 minutes' },
  { time: 3600000, output: '60 minutes' },
  { time: 3700000, output: '1 hour' },
  { time: 7200000, output: '2 hours' },
  { time: 86400000, output: '24 hours' },
  { time: 86500000, output: '1 day' },
]

/**
 * @description Test suite for timeSince function
 */
describe('Time since', () => {
  timesValues.forEach(item => {
    test(item.output, () => {
      expect(timeSince(new Date(new Date().getTime() - item.time))).toBe(item.output)
    })
  })
  // Returns the elapsed time in seconds when the input date is the current time.
  it('should return the elapsed time in seconds when the input date is the current time', () => {
    const result = timeSince(new Date())
    expect(result).toMatch(/^\d+ second(s)?$/)
  })

  // Returns the elapsed time in minutes when the input date is a few minutes ago.
  it('should return the elapsed time in minutes when the input date is a few minutes ago', () => {
    const now = new Date()
    const inputDate = new Date(now.getTime() - 5 * 60 * 1000)
    const result = timeSince(inputDate)
    expect(result).toMatch(/^\d+ minute(s)?$/)
  })

  // Returns the elapsed time in hours when the input date is a few hours ago.
  it('should return the elapsed time in hours when the input date is a few hours ago', () => {
    const now = new Date()
    const inputDate = new Date(now.getTime() - 3 * 60 * 60 * 1000)
    const result = timeSince(inputDate)
    expect(result).toMatch(/^\d+ hour(s)?$/)
  })

  // Returns '1 second' when the input date is one second ago.
  it("should return '1 second' when the input date is one second ago", () => {
    const now = new Date()
    const inputDate = new Date(now.getTime() - 1000)
    const result = timeSince(inputDate)
    expect(result).toBe('1 second')
  })

  // Returns '59 seconds' when the input date is 59 seconds ago.
  it("should return '59 seconds' when the input date is 59 seconds ago", () => {
    const now = new Date()
    const inputDate = new Date(now.getTime() - 59 * 1000)
    const result = timeSince(inputDate)
    expect(result).toBe('59 seconds')
  })

  // Returns the elapsed time in days when the input date is a few days ago.
  it('should return the elapsed time in days when the input date is a few days ago', () => {
    const now = new Date()
    const inputDate = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000)
    const result = timeSince(inputDate)
    expect(result).toMatch(/^\d+ day(s)?$/)
  })

  // Returns the elapsed time in months when the input date is a few months ago.
  it('should return the elapsed time in months when the input date is a few months ago', () => {
    const now = new Date()
    const inputDate = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds())
    const result = timeSince(inputDate)
    expect(result).toMatch(/^\d+ month(s)?$/)
  })

  // Returns the elapsed time in years when the input date is a few years ago.
  it('should return the elapsed time in years when the input date is a few years ago', () => {
    const now = new Date()
    const inputDate = new Date(now.getFullYear() - 2, now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds())
    const result = timeSince(inputDate)
    expect(result).toMatch(/^\d+ year(s)?$/)
  })

  // Returns the elapsed time when given a date.
  it('should return the elapsed time when given a date', () => {
    const date = '2022-01-01T00:00:00Z'
    const result = timeSince(date)
    expect(result).toMatch(/^\d+ (year|month|day|hour|minute|second)s?$/)
  })
})

/**
 * @description Test values for newDateFormat and getDateUTC functions
 */
const timesFormatted = [
  {
    input: '2023-03-23T09:46:30Z',
    timezone: 'UTC',
    newDateFormatOutput: '23-Mar-2023 09:46 AM (UTC)',
    shortDateUTCOutput: 'Mar 23',
    timestamp: 1679575590,
  },
  {
    input: '2023-03-23T09:46:30Z',
    format: 'dd-MMM-yyyy',
    newDateFormatOutput: '23-Mar-2023',
    shortDateUTCOutput: 'Mar 23',
    timestamp: 1679575590,
  },
  {
    input: '2023-03-08T21:00:00Z',
    timezone: 'UTC',
    newDateFormatOutput: '08-Mar-2023 09:00 PM (UTC)',
    shortDateUTCOutput: 'Mar 08',
    timestamp: 1678309200,
  },
  {
    input: '2023-03-08T00:00:00Z',
    timezone: 'UTC',
    newDateFormatOutput: '08-Mar-2023 12:00 AM (UTC)',
    shortDateUTCOutput: 'Mar 08',
    timestamp: 1678244400,
  },
]

/**
 * @description Test suite for newDateFormat function
 */
describe('New date format function', () => {
  timesFormatted.forEach(item => {
    test(item.newDateFormatOutput, () => {
      expect(newDateFormat(item.input, item.timezone, true, item.format)).toBe(item.newDateFormatOutput)
    })
  })
})

/**
 * @description Test suite for getDateUTC function (sending a string as value)
 */
describe('New date format UTC function (sending a string as value)', () => {
  timesFormatted.forEach(item => {
    test(item.newDateFormatOutput, () => {
      expect(getDateUTC(item.input, 'MMM dd')).toBe(item.shortDateUTCOutput)
    })
  })
})

/**
 * @description Test suite for getDateUTC function (sending a timestamp as value)
 */
describe('New date format UTC function (sending a timestamp as value)', () => {
  timesFormatted.forEach(item => {
    test(item.newDateFormatOutput, () => {
      expect(getDateUTC(item.timestamp, 'MMM dd')).toBe(item.shortDateUTCOutput)
    })
  })
})

/**
 * @description Test suite for getDateUTCFromTimestamp function
 */
describe('New date format UTC from Timestamp', () => {
  timesFormatted.forEach(item => {
    test(item.newDateFormatOutput, () => {
      const timestampInSeconds = item.timestamp * 1000
      expect(getDateUTCFromTimestamp(timestampInSeconds.toString(), 'MMM dd')).toBe(item.shortDateUTCOutput)
    })
  })
  // Returns the formatted date in UTC when given a timestamp.
  it('should return the formatted date in UTC when given a timestamp', () => {
    const timestamp = 1679575590
    const result = getDateUTCFromTimestamp(timestamp)
    expect(result).toMatch(/^\d{2}-\w{3}-\d{4} \d{2}:\d{2} \w{2}$/)
  })

  // Returns the original value when given a non-numeric string to getDateUTCFromTimestamp.
  it('should return the original value when given a non-numeric string to getDateUTCFromTimestamp', () => {
    const value = 'invalid'
    const result = getDateUTCFromTimestamp(value)
    expect(result).toBe(value)
  })
})

/**
 * @description Test suite for isDateEqual function
 */
describe('isDateEqual-test', () => {
  it('should return true if the dates are equal based on the frequency', () => {
    const date1 = new Date(2022, 1, 1)
    const date2 = new Date(2022, 1, 1)
    const frequency = 'daily'
    const result = isDateEqual(date1, date2, frequency)
    expect(result).toBe(true)
  })

  it('should return false if the dates are not equal based on the frequency', () => {
    const date1 = new Date(2022, 1, 1)
    const date2 = new Date(2022, 1, 2)
    const frequency = 'daily'
    const result = isDateEqual(date1, date2, frequency)
    expect(result).toBe(false)
  })
})
