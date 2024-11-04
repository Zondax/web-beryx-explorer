import { getPageMetaData, metaTags } from '@/components/metaData'
import { useSubscribeNats } from '@/nats/useSubscribeNats'
import useAppSettingsStore from '@/store/ui/settings'

import TokensView from 'components/views/TokensView/TokensView'

import { Layout } from '../components/Layout'
import { PAGES } from '../components/Layout/components/Sidebar'

/**
 * TokensController is a component
 * It's responsible for rendering Tokens page in a web application
 * @returns - The components that make up the Contract Verifier page
 */
export default function TokensController() {
  const { network } = useAppSettingsStore(state => ({ network: state.network }))
  const metaData = getPageMetaData(PAGES.TOKENS)

  useSubscribeNats(network, 'home')

  return (
    <>
      {/* Meta tags for the page are inserted using the metaTags function with metaData as input */}
      {metaTags({ metaData })}
      <Layout activeTab={PAGES.TOKENS} hasSearchBar pageTitle="Contract Verifier">
        {/* The actual verification view is inserted into the ResultsView component */}
        <TokensView />
      </Layout>
    </>
  )
}
