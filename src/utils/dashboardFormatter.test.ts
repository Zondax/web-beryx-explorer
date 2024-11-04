import { completeContractsRange, convertAndFormatFilValue, getFormattedFilValues, getFormattedValues } from './dashboardFormatter'

describe('Dashboard Formatter', () => {
  describe('getFormattedValues', () => {
    it('should format values correctly', () => {
      const values = [{ value: 1000000 }, { value: 500000 }, { value: 2000000 }]
      const result = getFormattedValues({ values })
      expect(result).toEqual({ values: [{ value: 1 }, { value: 0.5 }, { value: 2 }], unit: 'M' })
    })

    it('should format fil values with three decimals correctly', () => {
      const values = [{ value: 121212121212 }, { value: 12121212 }, { value: 1212 }]
      const result = getFormattedFilValues(values, 3)
      expect(result).toEqual({ values: [{ value: 121.212 }, { value: 0.012 }, { value: 0.0 }], unit: 'nanoFIL' })
    })

    it('should format fil values correctly', () => {
      const values = [{ value: 121212121212 }, { value: 12121212 }, { value: 1212 }]
      const result = getFormattedFilValues(values)
      expect(result).toEqual({ values: [{ value: 121.212121212 }, { value: 0.012121212 }, { value: 0.000001212 }], unit: 'nanoFIL' })
    })

    it('should format fil values correctly', () => {
      const values = [{ value: 121212 }, { value: 12121 }, { value: 1212 }]
      const result = getFormattedFilValues(values)
      expect(result).toEqual({ values: [{ value: 121212 }, { value: 12121 }, { value: 1212 }], unit: 'attoFIL' })
    })

    it('should format fil values with one decimal correctly', () => {
      const values = [{ value: 1000000000000000 }, { value: 1212122 }, { value: 121222 }]
      const result = getFormattedFilValues(values, 1)
      expect(result).toEqual({ values: [{ value: 0.0 }, { value: 0.0 }, { value: 0.0 }], unit: 'FIL' })
    })
  })
})

describe('convertAndFormatFilValue', () => {
  it('should format values correctly', () => {
    const values = [{ value: 1000000 }, { value: 500000 }, { value: 2000000 }]
    const result = values.map(elem => convertAndFormatFilValue(elem.value, 'attoFIL', { unit: 'nanoFIL', minValue: 1000000 }))
    expect(result).toEqual([
      { value: 0.001, unit: 'nanoFIL' },
      { value: 0.0005, unit: 'nanoFIL' },
      { value: 0.002, unit: 'nanoFIL' },
    ])
  })

  it('should format fil values with three decimals correctly', () => {
    const values = [{ value: 121212121212 }, { value: 12121212 }, { value: 1212 }]
    const result = values.map(elem => convertAndFormatFilValue(elem.value, 'attoFIL', undefined, 3))
    expect(result).toEqual([
      { value: 121.212, unit: 'nanoFIL' },
      { value: 0.012, unit: 'nanoFIL' },
      { value: 1212, unit: 'attoFIL' },
    ])
  })

  it('should format fil values correctly', () => {
    const values = [{ value: 121212121212 }, { value: 12121212 }, { value: 1212 }]
    const result = values.map(elem => convertAndFormatFilValue(elem.value, 'attoFIL'))
    expect(result).toEqual([
      { value: 121.212121212, unit: 'nanoFIL' },
      { value: 0.012121212, unit: 'nanoFIL' },
      { value: 1212, unit: 'attoFIL' },
    ])
  })

  it('should format fil values correctly', () => {
    const values = [{ value: 121212 }, { value: 12121 }, { value: 1212 }]
    const result = values.map(elem => convertAndFormatFilValue(elem.value, 'attoFIL'))
    expect(result).toEqual([
      { value: 121212, unit: 'attoFIL' },
      { value: 12121, unit: 'attoFIL' },
      { value: 1212, unit: 'attoFIL' },
    ])
  })

  it('should format fil values with one decimal correctly', () => {
    const values = [{ value: 1000000000000000 }, { value: 1212122 }, { value: 121222 }]
    const result = values.map(elem => convertAndFormatFilValue(elem.value, 'attoFIL', undefined, 1))
    expect(result).toEqual([
      { value: 0.0, unit: 'FIL' },
      { value: 0.0, unit: 'nanoFIL' },
      { value: 121222, unit: 'attoFIL' },
    ])
  })
})

describe('completeContractsRange', () => {
  it('should complete contracts range correctly', () => {
    const frequency = 'daily'
    const data = [
      { bucket: '2022-01-01T00:00:00Z', count: 10 },
      { bucket: '2022-01-03T00:00:00Z', count: 20 },
    ]
    const result = completeContractsRange({ frequency, data })
    expect(result.slice(0, 3)).toEqual([
      { bucket: '2022-01-01T00:00:00Z', count: 10 },
      { bucket: '2022-01-02T00:00:00Z', count: 0 },
      { bucket: '2022-01-03T00:00:00Z', count: 20 },
    ])
  })

  it('should complete contracts range correctly for weekly frequency', () => {
    const frequency = 'weekly'
    const data = [
      { bucket: '2022-01-01T00:00:00Z', count: 10 },
      { bucket: '2022-01-15T00:00:00Z', count: 20 },
    ]
    const result = completeContractsRange({ frequency, data })
    expect(result.slice(0, 3)).toEqual([
      { bucket: '2022-01-01T00:00:00Z', count: 10 },
      { bucket: '2022-01-08T00:00:00Z', count: 0 },
      { bucket: '2022-01-15T00:00:00Z', count: 20 },
    ])
  })

  it('should complete contracts range correctly for monthly frequency', () => {
    const frequency = 'monthly'
    const data = [
      { bucket: '2022-01-01T00:00:00Z', count: 10 },
      { bucket: '2022-03-01T00:00:00Z', count: 20 },
    ]
    const result = completeContractsRange({ frequency, data })
    expect(result.slice(0, 3)).toEqual([
      { bucket: '2022-01-01T00:00:00Z', count: 10 },
      { bucket: '2022-02-01T00:00:00Z', count: 0 },
      { bucket: '2022-03-01T00:00:00Z', count: 20 },
    ])
  })
})
