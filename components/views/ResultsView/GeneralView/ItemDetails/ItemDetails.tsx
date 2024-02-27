import { Unstable_Grid2 as Grid, Skeleton, useMediaQuery, useTheme } from '@mui/material'

import { SearchItemType } from '../types'
import { AddressDetails, ContractDetails, MempoolDetails, TipsetDetails, TransactionDetails } from './components'

/**
 * Props type declaration for ItemDetails component
 * ItemDetailsProps
 * @property searchItemType - type of the search item
 */
export interface ItemDetailsProps {
  searchItemType: SearchItemType
  tab?: string
}

/**
 * ItemDetails react component
 * Depending on the searchItemType, it will render the corresponding details component.
 * @param props - properties that define the type of detail to be displayed
 */
const ItemDetails = ({ searchItemType, tab }: ItemDetailsProps) => {
  const theme = useTheme()
  const upMd = useMediaQuery(theme.breakpoints.up('md'))

  /**
   * Depending on the searchItemType, it will return the corresponding detail component.
   */
  const details = () => {
    switch (searchItemType) {
      case SearchItemType.TRANSACTION:
        return <TransactionDetails />
      case SearchItemType.ADDRESS:
        return <AddressDetails />
      case SearchItemType.CONTRACT:
        return <ContractDetails />
      case SearchItemType.TIPSET:
        return <TipsetDetails />
      case SearchItemType.MEMPOOL:
        return <MempoolDetails tab={tab} />
      default:
        return <Skeleton variant="rounded" width={'15rem'} height={'1.375rem'} />
    }
  }

  // Grid component that will hold the details component(s)
  return (
    <Grid
      container
      width={upMd ? 'fit-content' : '100%'}
      padding={upMd ? 'unset' : '0 0.5rem 0 1rem'}
      alignItems={'center'}
      sx={{ gap: upMd ? '0.5rem' : '0.25rem' }}
    >
      {details()}
    </Grid>
  )
}

export default ItemDetails
