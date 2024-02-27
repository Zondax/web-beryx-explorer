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
