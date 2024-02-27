/**
 * @file This file contains utility functions for handling conversions.
 */
import { Decimal } from 'decimal.js'

/**
 * A dictionary of metric SI units and their corresponding powers of 10.
 */
export const metricSI: { [key in string]: number } = {
  quetta: 30,
  ronna: 27,
  yotta: 24,
  zetta: 21,
  exa: 18,
  peta: 15,
  tera: 12,
  giga: 9,
  mega: 6,
  kilo: 3,
  hecto: 2,
  deaca: 1,
  default: 0,
  deci: -1,
  centi: -2,
  milli: -3,
  micro: -6,
  nano: -9,
  pico: -12,
  femto: -15,
  atto: -18,
  zepto: -21,
  yacto: -24,
  ronto: -27,
  quecto: -30,
}

/**
 * Converts a given amount from one metric SI unit to another.
 * Note: This function does not consider regional settings.
 *
 * @param amount - The amount to be converted.
 * @param from - The current metric SI unit.
 * @param to - The target metric SI unit.
 * @returns The converted amount.
 * @throws {Error} If an invalid SI prefix is provided.
 */
export const convertMetricSI = (amount: string, from: string, to: string): string => {
  // Check for valid SI units
  if (metricSI[from] === undefined) {
    throw new Error(`Invalid SI prefix provided for [from]: ${from}`)
  }

  if (metricSI[to] === undefined) {
    throw new Error(`Invalid SI prefix provided for [to]: ${to}`)
  }

  const conversionPower = metricSI[from] - metricSI[to]
  const decAmount = new Decimal(amount)

  // Convert
  const result = decAmount.times(Decimal.pow(10, conversionPower))

  // Return without scientific notation
  return result.toFixed(result.dp())
}

/**
 * Converts a number in scientific notation to decimal notation.
 * Note: This function may not be needed as is and should be reviewed.
 *
 * @param num - The number in scientific notation.
 * @returns The number in decimal notation.
 */
export function scientificToDecimal(num: number): string {
  const dec = new Decimal(num)
  return dec.toFixed(dec.dp())
}

/**
 * Formats a given amount to ensure it has at least two decimal places.
 *
 * @param amount - The amount to be formatted.
 * @returns The formatted amount with at least two decimal places.
 *
 * @example
 * // returns '51.00'
 * cellAmount('51')
 *
 * @example
 * // returns '51.328073630067231027'
 * cellAmount('51.328073630067231027')
 */
export const cellAmount = (amount: string): string => {
  const bigAmount = new Decimal(amount)
  return bigAmount.toFixed(Math.max(2, bigAmount.dp()))
}
