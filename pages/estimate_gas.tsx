/**
 * Module dependencies.
 */
import { getPageMetaData, metaTags } from '@/components/metaData'
import { useSubscribeNats } from '@/nats/useSubscribeNats'
import { useAppSettingsStore } from '@/store/ui/settings'

import EstimateGasView from 'components/views/EstimateGasView'

import { Layout } from '../components/Layout'
import { PAGES } from '../components/Layout/components/Sidebar'

/**
 * The main controller for handling the estimate gas view.
 */
export default function EstimateGasController() {
  /**
   * Retrieves the metadata for the Estimate Gas page.
   */
  const metaData = getPageMetaData(PAGES.ESTIMATE_GAS)

  /**
   * Retrieves the selected network data from the store.
   */
  const { network } = useAppSettingsStore(state => ({ network: state.network }))

  /**
   * Establishes a subscription to the Nats messaging server.
   */
  useSubscribeNats(network, 'home')

  /**
   * Renders the Estimate Gas page.
   */
  return (
    <>
      {metaTags({ metaData })}
      <Layout activeTab={PAGES.ESTIMATE_GAS} hasSearchBar>
        <EstimateGasView />
      </Layout>
    </>
  )
}
