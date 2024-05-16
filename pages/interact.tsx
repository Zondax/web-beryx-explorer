/**
 * Adheres to the dependency array of useEffect.
 * If network or natsConnection prop changes, this callback function will be invoked.
 * It encapsulates in a wrapper to subscribe to the Nats service and manages Nats subscriptions.
 *
 * @returns
 * - Meta tags for the web page using metaData
 * - layout component with activeTab set to PAGES.INTERACT and hasSearchBar prop set to true.
 */
import { useEffect } from 'react'

import { getPageMetaData, metaTags } from '@/components/metaData'
import { subscribeNatsSync } from '@/nats/useSubscribeNats'
import useAppSettingsStore from '@/store/ui/settings'

import { Layout } from '../components/Layout'
import { PAGES } from '../components/Layout/components/Sidebar'
import InteractView from '../components/views/InteractView'

/**
 * @class InteractController
 * @desc This is the main controller for the Interact page.
 * It handles the NATS connection and renders the InteractView component.
 * @returns The Interact page with the InteractView component.
 */
export default function InteractController() {
  const metadata = getPageMetaData(PAGES.INTERACT)
  const { network } = useAppSettingsStore(state => ({ network: state.network }))

  useEffect(() => {
    subscribeNatsSync(network, 'home')
  }, [network])

  return (
    <>
      {metaTags({ metaData: metadata })}
      <Layout activeTab={PAGES.INTERACT} hasSearchBar>
        <InteractView />
      </Layout>
    </>
  )
}
