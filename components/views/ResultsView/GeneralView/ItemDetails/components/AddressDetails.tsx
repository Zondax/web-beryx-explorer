import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { ObjectType } from '@/routes/parsing'
import { useSearchStore } from '@/store/data/search'
import { Skeleton, Typography } from '@mui/material'

import { ActorTypeLabel, BeryxLink } from '../../../../../common'
import ItemInfo from '../../ItemInformation/ItemInfo'

const AddressDetails = () => {
  // Initialize react-i18next hook for handling language translations.
  const { t } = useTranslation()

  const searchResultJson = useSearchStore(s => s.searchResult.json)
  const searchValue = useSearchStore(s => s.searchInputValue)
  const network = useSearchStore(s => s.searchInputNetwork)

  // State for storing address and name for both types of addresses (Robust and Short).
  const [addressShortRobust, setAddressShortRobust] = useState<{ name: string; address: string } | undefined>(undefined)

  // Effect to update state when either searchResultJson or searchValue changes
  useEffect(() => {
    if (!searchResultJson) {
      return
    }

    if (searchValue === searchResultJson.short) {
      setAddressShortRobust({ name: 'Robust Address', address: searchResultJson.robust })
      return
    }

    if (searchValue === searchResultJson.robust) {
      setAddressShortRobust({ name: 'Short Address', address: searchResultJson.short })
    }
  }, [searchResultJson, searchValue])

  return (
    <>
      {searchResultJson?.actor_type ? (
        // Display Actor Type.
        <ItemInfo label={t('Actor Type')} content={<ActorTypeLabel label={searchResultJson?.actor_type ?? '-'} />} icon={undefined} />
      ) : (
        // Display loading skeleton until Actor type gets loaded.
        <Skeleton variant="rounded" width={'9.75rem'} height={'1.5rem'} />
      )}
      {addressShortRobust ? (
        <>
          <Typography variant="body1">•</Typography>
          <ItemInfo
            label={addressShortRobust.name}
            content={<BeryxLink inputType={ObjectType.ADDRESS} network={network} value={addressShortRobust.address} isColored />}
            icon={undefined}
          />
        </>
      ) : null}
    </>
  )
}

export default AddressDetails
