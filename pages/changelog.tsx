import { useEffect } from 'react'

import { getPageMetaData, metaTags } from '@/components/metaData'
import { subscribeNatsSync } from '@/nats/useSubscribeNats'
import useAppSettingsStore from '@/store/ui/settings'

import ChangelogView from 'components/views/ChangelogView'

import { Layout } from '../components/Layout'
import { PAGES } from '../components/Layout/components/Sidebar'

/**
 * Controller for the CHANGELOG page.
 * Handles the side-effects involved in setting up the page.
 * @returns The UI element representing the page.
 */
export default function ChangelogController() {
  const metaData = getPageMetaData(PAGES.CHANGELOG) // Page metadata
  const { network } = useAppSettingsStore(state => ({ network: state.network })) // Network state

  // Subscribes to NATS when network or connections updates
  useEffect(() => {
    subscribeNatsSync(network, 'home')
  }, [network])

  // Renders the page
  return (
    <>
      {metaTags({ metaData })}
      <Layout hasSearchBar activeTab={PAGES.CHANGELOG}>
        <ChangelogView />
      </Layout>
    </>
  )
}
