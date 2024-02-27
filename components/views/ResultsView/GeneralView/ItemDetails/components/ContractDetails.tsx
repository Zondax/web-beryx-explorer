import BigNumber from 'bignumber.js'
import { useEffect, useState } from 'react'

import { amountFormat } from '@/config/config'

/**
 * Local imports.
 */
import { useSearchStore } from '@/store/data/search'
import { newDateFormat } from '@/utils/dates'
import { formatBalance } from '@/utils/format'

/**
 * Material UI component.
 */
import { Skeleton } from '@mui/material'

import FilecoinIcon from '../../../../../common/Icons/Filecoin'
import { ItemInfo, Verified } from '../../ItemInformation'

/**
 * ContractDetails represents a React component that renders
 * the details of a contract in the application.
 *
 * @returns JSX.Element
 */
const ContractDetails = (): JSX.Element => {
  /**
   * Contains the json result of a search query.
   */
  const searchResultJson = useSearchStore(s => s.searchResult.json)

  /**
   * Contains the network from input search.
   */
  const network = useSearchStore(s => s.searchInputNetwork)

  /**
   * State variable for balance.
   *
   * @type {string | undefined}
   */
  const [balance, setBalance] = useState<string | undefined>(undefined)

  /**
   * Side effect to update balance whenever searchResultJson changes.
   */
  useEffect(() => {
    setBalance(BigNumber(formatBalance(searchResultJson?.balances)).toFormat(2, amountFormat))
  }, [searchResultJson])

  return (
    <>
      {network ? <Verified /> : null}
      {balance ? (
        <ItemInfo label={'Balance (FIL)'} content={balance} icon={<FilecoinIcon size={16} />} />
      ) : (
        <Skeleton variant="rounded" width={'9.75rem'} height={'1.5rem'} />
      )}
      {searchResultJson?.created_at ? (
        <ItemInfo
          label={'Created on'}
          content={newDateFormat(searchResultJson?.created_at, 'UTC', true)}
          icon={<FilecoinIcon size={16} />}
        />
      ) : (
        <Skeleton variant="rounded" width={'9.75rem'} height={'1.5rem'} />
      )}
    </>
  )
}

export default ContractDetails
