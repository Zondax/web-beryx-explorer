/**
 * Import dependencies.
 */
import { GetStaticProps, InferGetStaticPropsType } from 'next'

import { fetchResourceCardsMetaData, getPageMetaData, metaTags } from '@/components/metaData'
import { developerResources } from '@/config/config'
import { useSubscribeNats } from '@/nats/useSubscribeNats'
import useAppSettingsStore from '@/store/ui/settings'

import { LinkCardProps } from 'components/common/LinkCard'

import { Layout } from '../components/Layout'
import { PAGES } from '../components/Layout/components/Sidebar'
import ResourcesView from '../components/views/ResourcesView'

/**
 * @function getStaticProps
 * @desc This function fetches static properties for the home page. It retrieves metadata for each resource listed in the developerResources configuration.
 * @returns An object that includes the fetched metadata for each resource and a revalidation interval set to 1 week.
 */
export const getStaticProps: GetStaticProps = async () => {
  const resourcesMetaInfo: LinkCardProps[] = await fetchResourceCardsMetaData(developerResources)

  return {
    props: { resourcesMetaInfo },
    revalidate: 604800, // Set revalidation interval to 1 week ( 60s * 60m * 24h * 7d = 604,800s)
  }
}

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
export default function ResourcesController({ resourcesMetaInfo }: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  const metaData = getPageMetaData(PAGES.RECENT_ACTIVITY)
  const { network } = useAppSettingsStore(state => ({ network: state.network }))

  useSubscribeNats(network, 'recent_activity')

  return (
    <>
      {metaTags({ metaData })}
      <Layout hasSearchBar activeTab={PAGES.RESOURCES}>
        <ResourcesView resourcesMetaInfo={resourcesMetaInfo} />
      </Layout>
    </>
  )
}
