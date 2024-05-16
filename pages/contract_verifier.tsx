import { getPageMetaData, metaTags } from '@/components/metaData'
import { useSubscribeNats } from '@/nats/useSubscribeNats'
import useAppSettingsStore from '@/store/ui/settings'

import { Layout } from '../components/Layout'
import { PAGES } from '../components/Layout/components/Sidebar'
import ContractVerifyView from '../components/views/ContractVerifyView'

/**
 * ContractVerifyController is a component
 * It's responsible for rendering ContractVerifier page in a web application
 * @returns - The components that make up the Contract Verifier page
 */
export default function ContractVerifyController() {
  const { network } = useAppSettingsStore(state => ({ network: state.network }))
  const metaData = getPageMetaData(PAGES.CONTRACT_VERIFIER)

  useSubscribeNats(network, 'home')

  return (
    <>
      {/* Meta tags for the page are inserted using the metaTags function with metaData as input */}
      {metaTags({ metaData })}
      <Layout activeTab={PAGES.CONTRACT_VERIFIER} hasSearchBar pageTitle="Contract Verifier">
        {/* The actual verification view is inserted into the ResultsView component */}
        <ContractVerifyView />
      </Layout>
    </>
  )
}
