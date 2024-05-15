import { GetStaticProps, InferGetStaticPropsType } from 'next/types'

import { fetchResourceCardsMetaData, getPageMetaData, metaTags } from '@/components/metaData'
import { developerResources } from '@/config/config'
import { useSubscribeNats } from '@/nats/useSubscribeNats'
import useAppSettingsStore from '@/store/ui/settings'

import { Layout } from '../components/Layout'
import { PAGES } from '../components/Layout/components/Sidebar'
import { LinkCardProps } from '../components/common/LinkCard'
import HomeView from '../components/views/HomeView'

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
 * @function HomeController
 * @desc This is the main controller for the Home page. It handles the NATS connection and renders the HomeView component.
 * @param props - The props for the HomeController function.
 * @param props.resourcesMetaInfo - The metadata for the resources.
 * @returns The Home page with the HomeView component.
 */
export default function HomeController({ resourcesMetaInfo }: InferGetStaticPropsType<typeof getStaticProps>) {
  const metaData = getPageMetaData(PAGES.HOME)
  const { network } = useAppSettingsStore(state => ({ network: state.network }))

  useSubscribeNats(network, 'home')

  return (
    <>
      {metaTags({ metaData })}
      <Layout hasSearchBar={false} activeTab={PAGES.HOME}>
        <HomeView resourcesMetaInfo={resourcesMetaInfo} />
      </Layout>
    </>
  )
}
