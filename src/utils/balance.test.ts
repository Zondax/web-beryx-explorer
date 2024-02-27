import { downsampleDataMinMax, filterLastItemPerDay } from './balance'

describe('downsampleDataMinMax', () => {
  const mockData = Array.from({ length: 20 }, (_, i) => ({
    timestamp: i,
    value: `value${i}`,
  }))

  test('returns the same data if length is less than maxItems', () => {
    const result = downsampleDataMinMax(mockData, 30)
    expect(result).toEqual(mockData)
  })

  test('returns downsampled data if length is more than maxItems', () => {
    const result = downsampleDataMinMax(mockData, 10)
    expect(result.length).toBeLessThanOrEqual(10)
  })

  test('no repeated timestamps in the downsampled data', () => {
    const result = downsampleDataMinMax(mockData, 10)
    const uniqueTimestamps = new Set(result.map(item => item.timestamp))
    expect(uniqueTimestamps.size).toEqual(result.length)
  })
})

describe('filterLastItemPerDay', () => {
  const mockData = Array.from({ length: 30 }, (_, i) => ({
    timestamp: new Date(2020, 0, 1, Math.floor(i / 24), i % 60).getTime(),
    value: `value${i}`,
  })).sort((a, b) => a.timestamp - b.timestamp)

  test('returns the last item of each day', () => {
    const result = filterLastItemPerDay(mockData)
    const expected = mockData.filter((_, i, arr) => {
      const currentDate = new Date(arr[i].timestamp)
      const nextDate = arr[i + 1] ? new Date(arr[i + 1].timestamp) : null
      return !nextDate || currentDate.getDate() !== nextDate.getDate()
    })
    expect(result).toEqual(expected)
  })

  test('no repeated days in the filtered data', () => {
    const result = filterLastItemPerDay(mockData)
    const uniqueDays = new Set(result.map(item => new Date(item.timestamp).getDate()))
    expect(uniqueDays.size).toEqual(result.length)
  })
})
