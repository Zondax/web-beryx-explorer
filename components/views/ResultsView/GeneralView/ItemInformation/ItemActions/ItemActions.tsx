import { useEffect, useState } from 'react'

import { ObjectType } from '@/routes/parsing'
import { useSearchStore } from '@/store/data/search'
import { Unstable_Grid2 as Grid, useMediaQuery, useTheme } from '@mui/material'
import { Transaction } from '@zondax/beryx/dist/filecoin/api/types'

import ContractActions from '../ContractActions'

/**
 * @ItemActionsProps
 * @type
 * @property searchItemType - The type of the search item
 */
interface ItemActionsProps {
  searchItemType: ObjectType
}

/**
 * ItemStats component.
 * This component is responsible for displaying the statistics of the search item.
 * It uses the Material-UI theme for styling.
 *
 * @returns - The ItemStats component or null if the search item type is not a contract.
 */
const ItemActions = ({ searchItemType }: ItemActionsProps): JSX.Element | null => {
  const theme = useTheme()
  const searchResultTxs = useSearchStore(s => s.searchResult.transactions)
  const [_, setFeeTx] = useState<Transaction | undefined>(undefined)
  const upMd = useMediaQuery(theme.breakpoints.up('md'))

  useEffect(() => {
    const feeTx = searchResultTxs?.find((element: { tx_type: string; level: number }) => element.tx_type === 'Fee' && element.level === 0)
    setFeeTx(feeTx)
  }, [searchResultTxs])

  if (searchItemType === ObjectType.CONTRACT || searchItemType === ObjectType.ERC20) {
    return (
      <Grid container width={upMd ? 'unset' : '100%'} alignItems={'center'} sx={{ gap: '1.5rem' }}>
        <ContractActions />
      </Grid>
    )
  }

  return null
}

export default ItemActions
