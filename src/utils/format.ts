import BigNumber from 'bignumber.js'

import { Balance } from '@zondax/beryx/dist/filecoin/api/types'

/**
 * Function to format balance from an array of balances
 * @param balanceArray - The array of balances to format
 * @returns The formatted balance as a string
 */
export const formatBalance = (balanceArray: Balance[]): string => {
  let formattedBalance = ''

  balanceArray?.forEach((elem: Balance) => {
    const value = new BigNumber(elem.value)
    const decimals = new BigNumber(Math.pow(10, elem.currency.decimals))
    formattedBalance = value.div(decimals).toFixed()
  })

  return formattedBalance
}

/**
 * Function to format balance
 * @param value - The value to format
 * @param decimals - The decimals to use
 * @returns The formatted balance as a string
 */
export const formatOneBalance = (value: number | string, decimals: number): string => {
  let formattedBalance = ''

  const bigNumValue = new BigNumber(value)
  const tempDecimals = new BigNumber(Math.pow(10, decimals))
  formattedBalance = bigNumValue.div(tempDecimals).toFixed()

  return formattedBalance
}
