/**
 * This file contains utility functions for formatting numbers and FIL values.
 * @module numbers
 */
export type FilUnits = 'FIL' | 'miliFIL' | 'microFIL' | 'nanoFIL' | 'picoFIL' | 'femtoFIL' | 'attoFIL'

/**
 * @description This type represents the units for decimal numbers.
 * @type {('T' | 'B' | 'M' | 'K')}
 */
export type DecimalUnits = 'T' | 'B' | 'M' | 'K'

/**
 * @description This interface represents the options for formatting numbers.
 * @interface
 */
export interface FormatNumberOption {
  unit: DecimalUnits
  minValue: number
}

/**
 * @description This array contains the options for formatting numbers.
 * @type {FormatNumberOption[]}
 */
export const formatNumberOptions: FormatNumberOption[] = [
  { unit: 'T', minValue: 1000000000000 },
  { unit: 'B', minValue: 1000000000 },
  { unit: 'M', minValue: 1000000 },
  { unit: 'K', minValue: 1000 },
]

// Values compare to attoFil
/**
 * @description This array contains the options for formatting FIL values.
 * @type {FormatFilOption[]}
 */
export const formatFilOptions: FormatFilOption[] = [
  { unit: 'FIL', minValue: 1000000000000000 },
  { unit: 'nanoFIL', minValue: 1000000 },
]

/**
 * @description This function formats a number to a more convenient unit.
 * @function
 * @param value - The number to format.
 * @returns - The formatted number and its unit.
 */
export const formatValue = (value: number): { unit?: DecimalUnits | FilUnits; value: number } => {
  for (const { unit, minValue } of formatNumberOptions) {
    if (value >= minValue) {
      return { unit, value: (value /= minValue) }
    }
  }

  return { value }
}

/**
 * @description This interface represents the options for formatting FIL values.
 * @interface
 */
export interface FormatFilOption {
  unit: FilUnits
  minValue: number
}

/**
 * @description This function formats a FIL value to a more convenient unit.
 * If the value is FIL, the function expects an attoFIL value.
 * @function
 * @param value - The FIL value to format.
 * @returns - The formatted FIL value and its unit.
 */
export const formatFilValue = (value: number): { unit?: DecimalUnits | FilUnits; value: number } => {
  for (const { unit, minValue } of formatFilOptions) {
    if (value >= minValue) {
      return { unit, value: (value /= minValue) }
    }
  }

  return { value, unit: 'attoFIL' }
}
