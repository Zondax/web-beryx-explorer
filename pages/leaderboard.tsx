import { useEffect } from 'react'

import { getPageMetaData, metaTags } from '@/components/metaData'
import { subscribeNatsSync } from '@/nats/useSubscribeNats'
import { useAppSettingsStore } from '@/store/ui/settings'

import { Layout } from '../components/Layout'
import { PAGES } from '../components/Layout/components/Sidebar'
import LeaderboardView from '../components/views/Leaderboard/LeaderboardView'

/**
 * Controller for the Leaderboard page.
 * Handles the side-effects involved in setting up the page.
 * @returns The UI element representing the page.
 */
export default function LeaderboardController() {
  const metaData = getPageMetaData(PAGES.LEADERBOARD) // Page metadata
  const { network } = useAppSettingsStore(state => ({ network: state.network })) // Network state

  // Subscribes to NATS when network or connections updates
  useEffect(() => {
    subscribeNatsSync(network, 'home')
  }, [network])

  // Renders the page
  return (
    <>
      {metaTags({ metaData })}
      <Layout hasSearchBar activeTab={PAGES.LEADERBOARD} pageTitle="Leaderboard">
        <LeaderboardView />
      </Layout>
    </>
  )
}
