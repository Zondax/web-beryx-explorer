/**
 * This file is the controller for the Mempool page.
 * It sets up the necessary state and subscriptions for the Mempool page.
 * It also defines the layout and view for the Mempool page.
 */
import { metaTags } from '@/components/metaData'
import { useSubscribeNats } from '@/nats/useSubscribeNats'
import useAppSettingsStore from '@/store/ui/settings'

import { Layout } from '../components/Layout'
import { PAGES } from '../components/Layout/components/Sidebar'
import MempoolView from '../components/views/MempoolView'

/**
 * MempoolController is the main component for the Mempool page.
 * It sets up the necessary state and subscriptions for the Mempool page.
 * It also defines the layout and view for the Mempool page.
 */
export default function MempoolController() {
  /**
   * MetaData for the page, this will be used in the head of the HTML document.
   */
  const metaData = {
    metaTitle: 'Beryx - Mempool',
    metaDescription:
      'Beryx is a platform developed by Zondax that includes public historical data, streaming data and metrics for Filecoin blockchain.',
    metaImage: 'https://beryx.io/beryx-og.png',
    metaURL: 'https://beryx.io',
  }

  /**
   * The currently selected network from the application state.
   */
  const { network } = useAppSettingsStore(state => ({ network: state.network }))

  /**
   * Subscribe to NATS server using the `network`.
   */
  useSubscribeNats(network, 'mempool')

  /**
   * Returns the page layout with the mempool view embedded.
   */
  return (
    <>
      {metaTags({ metaData })}
      <Layout activeTab={PAGES.MEMPOOL} pageTitle="Mempool">
        <MempoolView />
      </Layout>
    </>
  )
}
