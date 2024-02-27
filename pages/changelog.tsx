import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useEffect } from 'react'

import { getPage } from '@/api-client/ghost'
import { getPageMetaData, metaTags } from '@/components/metaData'
import { subscribeNatsSync } from '@/nats/useSubscribeNats'
import { useAppSettingsStore } from '@/store/ui/settings'

import ChangelogView from 'components/views/ChangelogView'

import { Layout } from '../components/Layout'
import { PAGES } from '../components/Layout/components/Sidebar'

/**
 * @function getStaticProps
 * @desc This function fetches static properties for the Interact page. It retrieves the terms and conditions.
 * @returns An object that includes the fetched terms and conditions and a revalidation interval set to 1 week.
 */
export const getStaticProps: GetStaticProps = async () => {
  const terms = await getPage('#web-corp', 'terms-and-conditions')

  return {
    props: { terms },
    revalidate: 604800, // Set revalidation interval to 1 week ( 60s * 60m * 24h * 7d = 604,800s)
  }
}

// Leaderboard view component

/**
 * Controller for the Leaderboard page.
 * Handles the side-effects involved in setting up the page.
 * @returns The UI element representing the page.
 */
export default function TermsOfServiceController({ terms }: InferGetStaticPropsType<typeof getStaticProps>) {
  const metaData = getPageMetaData(PAGES.TERMS_OF_SERVICE) // Page metadata
  const { network } = useAppSettingsStore(state => ({ network: state.network })) // Network state

  // Subscribes to NATS when network or connections updates
  useEffect(() => {
    subscribeNatsSync(network, 'home')
  }, [network])

  // Renders the page
  return (
    <>
      {metaTags({ metaData })}
      <Layout hasSearchBar activeTab={PAGES.TERMS_OF_SERVICE}>
        <ChangelogView />
      </Layout>
    </>
  )
}
