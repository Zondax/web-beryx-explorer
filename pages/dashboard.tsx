import { getPageMetaData, metaTags } from '@/components/metaData'

import { Layout } from '../components/Layout'
import { PAGES } from '../components/Layout/components/Sidebar'
import { DashboardView } from '../components/views/DashboardView'

/**
 * Defining metadata for the dashboard page
 */
const metaData = getPageMetaData(PAGES.DASHBOARD)

/**
 * This dashboard component renders the dashboard view within the main layout.
 * It also sets the active tab to 'dashboard' and provides page title as 'Dashboard'.
 * @returns DashboardController component
 * @function DashboardController
 */
export default function DashboardController() {
  return (
    <>
      {
        // Generating meta tags for the dashboard page
        metaTags({ metaData })
      }
      <Layout key={'Results dashboard'} activeTab={PAGES.DASHBOARD} pageTitle={'Dashboard'}>
        {
          // Rendering dashboard view
          <DashboardView />
        }
      </Layout>
    </>
  )
}
