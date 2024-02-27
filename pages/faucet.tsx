/**
 * This file is responsible for the Faucet page of the application.
 * It imports necessary dependencies, sets up the store, and defines the FaucetController component.
 * The FaucetController component handles the logic for the Faucet page, including subscribing to the NATS server,
 * selecting the network state from the store, and rendering the FaucetView component.
 */
import { useEffect } from 'react'

import { getPageMetaData, metaTags } from '@/components/metaData'
import { Networks, getNetworkByUniqueId } from '@/config/networks'
import { useSubscribeNats } from '@/nats/useSubscribeNats'
import { useAppSettingsStore } from '@/store/ui/settings'

import { Layout } from '../components/Layout'
import { PAGES, navigationItems } from '../components/Layout/components/Sidebar'
import FaucetView from '../components/views/FaucetView'

/**
 * It subscribes to the NATS server, selects the network state from the store, and renders the FaucetView component.
 * The FaucetController component handles the logic for the Faucet page.
 *
 * @returns The rendered FaucetView component.
 */
export default function FaucetController() {
  const { network, setNetwork } = useAppSettingsStore(state => ({ network: state.network, setNetwork: state.setNetwork }))
  const metaData = getPageMetaData(PAGES.FAUCET)

  useEffect(() => {
    const page = navigationItems.find(elem => elem.name === PAGES.FAUCET)
    if (page && !page?.networkIds.includes(network.uniqueId)) {
      const allowedNetwork = getNetworkByUniqueId(page?.networkIds[0])
      if (allowedNetwork) {
        setNetwork(Networks.calibration)
      }
    }
  }, [network, setNetwork])

  useSubscribeNats(network, 'home')

  return (
    <>
      {metaTags({ metaData })}
      <Layout activeTab={PAGES.FAUCET} hasSearchBar pageTitle="Faucet">
        <FaucetView />
      </Layout>
    </>
  )
}
