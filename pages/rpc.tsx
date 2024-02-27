import { getPageMetaData, metaTags } from '@/components/metaData'
import { useSubscribeNats } from '@/nats/useSubscribeNats'
import { useAppSettingsStore } from '@/store/ui/settings'

import { Layout } from '../components/Layout'
import { PAGES } from '../components/Layout/components/Sidebar'
import RpcView from '../components/views/RpcView'

export default function RpcController() {
  /**
   * Get details of the 'RPC' page
   */
  const metaData = getPageMetaData(PAGES.RPC)

  /**
   * Get 'network' state from the store
   */
  const { network } = useAppSettingsStore(state => ({ network: state.network }))

  /**
   * Subscribe to a NATS server using the above obtained states and config objects
   */
  useSubscribeNats(network, 'home')

  /**
   * Return the RpcView component
   * @return {object} Returns the RpcView component for the rpc page
   */
  return (
    <>
      {metaTags({ metaData })}
      <Layout activeTab={PAGES.RPC} hasSearchBar pageTitle="Rpc Node">
        <RpcView />
      </Layout>
    </>
  )
}
