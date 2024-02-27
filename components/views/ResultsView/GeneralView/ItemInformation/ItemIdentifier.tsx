import { SyntheticEvent, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { ObjectType, formattedObjectType } from '@/routes/parsing'
import { useSearchStore } from '@/store/data/search'
import { useContractsStore } from '@/store/ui/contracts'
import { translate } from '@/utils/translate'
import {
  Divider,
  Unstable_Grid2 as Grid,
  Skeleton,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'

// Local components
import ItemIdentifierLabel from '../../../../common/ItemIdentifierLabel'
import Verified from './Verified'

// Define the possible address types
type AddressType = 'ETH' | 'FIL'

/**
 * ItemIdentifierProps properties
 */
interface ItemIdentifierProps {
  searchItemType: ObjectType // search item type
}

/**
 * Address options for the ToggleButtonGroup
 */
const addressOptions = [
  <ToggleButton key="fil type" value="FIL">
    FIL
  </ToggleButton>,
  <ToggleButton key="eth type" value="ETH">
    ETH
  </ToggleButton>,
]

/**
 * ItemIdentifier component
 * @param searchItemType
 * @returns
 */
const ItemIdentifier = ({ searchItemType }: ItemIdentifierProps) => {
  const { t } = useTranslation()
  const upMd = useMediaQuery(useTheme().breakpoints.up('md'))
  const searchValue: string = useSearchStore(s => s.searchInputValue)
  const searchType = useSearchStore(s => s.searchType)
  const network = useSearchStore(s => s.searchInputNetwork)
  const ethAddress = useContractsStore(state => state.ethAddress)

  const [addressType, setAddressType] = useState<AddressType>('FIL')
  const [canViewEthForm, setCanViewEthForm] = useState<boolean>(false)

  /**
   * use effect for setting boolean value
   */
  useEffect(() => {
    switch (searchItemType) {
      case ObjectType.ADDRESS:
        setCanViewEthForm(searchValue.toLowerCase().startsWith('f4'))
        break
      case ObjectType.CONTRACT:
      case ObjectType.TXS:
        setCanViewEthForm(true)
        break
      case ObjectType.TIPSET:
      case ObjectType.BLOCK:
        setCanViewEthForm(false)
        break
      default:
        setCanViewEthForm(false)
        break
    }
  }, [searchItemType, searchType, searchValue])

  /**
   * Function to handle address type
   * @param event
   * @param value
   */
  const handleAddressType = useCallback((event: SyntheticEvent<Element, Event>, value: AddressType) => {
    if (!value) {
      return
    }
    setAddressType(value)
  }, [])

  return (
    <Grid
      container
      flexDirection={'column'}
      width={upMd ? 'fit-content' : '100%'}
      padding={upMd ? 'unset' : '0 0.5rem 0 0'}
      sx={{ gap: '0.5rem' }}
    >
      <Grid container gap={'0.75rem'} alignItems={'center'}>
        {searchItemType === ObjectType.UNKNOWN ? (
          <Skeleton variant="rounded" width={'8rem'} height={'1.75rem'} />
        ) : (
          <Typography variant="body1" component={'h1'} color={'text.primary'} fontWeight={500} textTransform={'capitalize'} pl={'0.5rem'}>
            {translate(t, formattedObjectType[searchItemType])}
          </Typography>
        )}
        {searchItemType === ObjectType.CONTRACT && network ? <Verified /> : null}
        <Divider orientation="vertical" variant="fullWidth" flexItem sx={{ m: '0.25rem 0' }} />
        {searchItemType === ObjectType.UNKNOWN ? (
          <Skeleton variant="rounded" width={'8rem'} height={'1.75rem'} />
        ) : (
          <Typography variant="body2" textTransform={'capitalize'}>
            Filecoin{network ? ` • ${network.name}` : ''}
          </Typography>
        )}
      </Grid>

      <Grid container alignItems={'center'} sx={{ gap: '0.5rem' }}>
        <ItemIdentifierLabel
          value={addressType === 'ETH' && ethAddress ? ethAddress : searchValue}
          searchType={searchType}
          network={network}
        />
        {canViewEthForm ? (
          <ToggleButtonGroup
            disabled={!canViewEthForm || !ethAddress}
            size="small"
            color="primary"
            value={addressType}
            exclusive
            onChange={handleAddressType}
            aria-label="Platform"
          >
            {addressOptions}
          </ToggleButtonGroup>
        ) : null}
      </Grid>
    </Grid>
  )
}

export default ItemIdentifier
