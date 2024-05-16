import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { Networks } from '@/config/networks'
import { useContractsStore } from '@/store/ui/contracts'
import useAppSettingsStore from '@/store/ui/settings'
import { Button, Unstable_Grid2 as Grid } from '@mui/material'

import BannerTile from './BannerTile'

/**
 * Component for interacting with different networks.
 *
 * @returns The rendered component
 */
const InteractUpdate = () => {
  const { network } = useAppSettingsStore(state => ({ network: state.network }))
  const router = useRouter()
  const { t } = useTranslation()
  const setTestInteract = useContractsStore.getState().setTestInteract

  /**
   * Handler for switching between calibration and mainnet networks.
   *
   * If there's no match it will default to no action.
   *
   */
  const handleInteractButton = useCallback(() => {
    setTestInteract(true)
    switch (network.uniqueId) {
      case Networks.calibration.uniqueId:
        router.push(`/search/${network.slug}/address/f410fc4oqz4o47leiyhmo5ynji2k4iyxmuxozj4urctq?tab=interact`)
        break
      case Networks.mainnet.uniqueId:
        router.push(`/search/${network.slug}/address/f410fg6dyyyr5q7k6tg7kmavzw4uimz3phxxqmfk2mky?tab=interact`)
        break
      default:
        break
    }
  }, [network, router, setTestInteract])

  return (
    <BannerTile
      id={'interact-update'}
      title={
        <>
          {t('Interact with a smart')} <br /> {t('contract')}
        </>
      }
      description={[
        t('In our latest update we improved the contract interaction experience.'),
        t(
          "To test your contract just search it by its address. Right there, in the results view you'll be able to call methods, view and upload its ABI and watch live insights."
        ),
      ]}
      buttons={
        <Grid container justifyContent="flex-end">
          <Button variant="contained" size="medium" onClick={handleInteractButton}>
            {t('Try it')}
          </Button>
        </Grid>
      }
      image={'/contract_ill.svg'}
      flag={'update'}
    />
  )
}

export default InteractUpdate
