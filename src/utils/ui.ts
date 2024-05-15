import BigNumber from 'bignumber.js'

/**
 * Determines the color for displaying a number based on its value.
 * If the number is greater than zero, returns a success color.
 *
 * @param value - The BigNumber value to determine the color for.
 * @returns A color string (e.g., 'success.main') based on the value.
 */
export const getNumberColor = (value: BigNumber) => {
  if (value.toNumber() > 0) {
    return 'success.main'
  }
  if (value.toNumber() < 0) {
    return 'error.main'
  }
  return 'text.primary'
}
