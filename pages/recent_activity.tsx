/**
 * Import dependencies.
 */
import { getPageMetaData, metaTags } from '@/components/metaData'
import { useSubscribeNats } from '@/nats/useSubscribeNats'
import { useAppSettingsStore } from '@/store/ui/settings'

import { Layout } from '../components/Layout'
import { PAGES } from '../components/Layout/components/Sidebar'
import RecentActivityView from '../components/views/RecentActivityView'

/**
 * Define RecentActivityController function.
 * @returns JSX.Element
 * RecentActivityController function is a React functional component that
 * uses the useSelector hook to get the current network and
 * the Nats Store to get the current NATS connections.
 * It subscribes to NATS using the useSubscribeNats hook.
 * The layout component is used to provide a consistent UI for the page.
 * The RecentActivityView component is added to the layout.
 */
export default function RecentActivityController(): JSX.Element {
  const metaData = getPageMetaData(PAGES.RECENT_ACTIVITY)
  const { network } = useAppSettingsStore(state => ({ network: state.network }))

  useSubscribeNats(network, 'recent_activity')

  return (
    <>
      {metaTags({ metaData })}
      <Layout hasSearchBar activeTab={PAGES.RECENT_ACTIVITY} pageTitle="Recent Activity">
        <RecentActivityView />
      </Layout>
    </>
  )
}
