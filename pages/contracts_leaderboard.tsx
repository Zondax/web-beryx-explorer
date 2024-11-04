import { useEffect } from 'react'

import { getPageMetaData, metaTags } from '@/components/metaData'
import { subscribeNatsSync } from '@/nats/useSubscribeNats'
import useAppSettingsStore from '@/store/ui/settings'

import ContractsLeaderboardView from 'components/views/Leaderboard/ContractsLeaderboardView'

import { Layout } from '../components/Layout'
import { PAGES } from '../components/Layout/components/Sidebar'

/**
 * Controller for the Contracts Leaderboard page.
 * Handles the side-effects involved in setting up the page.
 * @returns The UI element representing the page.
 */
export default function ContractsLeaderboardController() {
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
      <Layout hasSearchBar activeTab={PAGES.CONTRACTS_LEADERBOARD} pageTitle="Conctracts Leaderboard">
        <ContractsLeaderboardView />
      </Layout>
    </>
  )
}
