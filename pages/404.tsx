/**
 * @file This file defines the 404 error page for the application.
 * It imports necessary components and metadata, and exports the ErrorController function.
 * @external 'utils/metaData'
 * @external '../components/Layout'
 * @external '../components/Layout/components/Sidebar'
 * @external '../components/views/NotFoundView'
 */
import { getPageMetaData, metaTags } from '@/components/metaData'

import { Layout } from '../components/Layout'
import { PAGES } from '../components/Layout/components/Sidebar'
import NotFoundView from '../components/views/NotFoundView'

/**
 * @constant
 * @type {object}
 * @description This constant holds the metadata for the not found page.
 */
const metaData = getPageMetaData(PAGES.NOT_FOUND)

/**
 * ErrorController is a React functional component.
 *
 * It returns a React Fragment that contains a series of meta tags,
 * a layout component with a hasModeToggle prop set to 'false', and NotFoundView component to handle not found scenarios
 *
 * @return      {React.Node}     The rendered NotFoundView page
 */
export default function ErrorController() {
  return (
    <>
      {metaTags({ metaData })}
      <Layout>
        <NotFoundView />
      </Layout>
    </>
  )
}
