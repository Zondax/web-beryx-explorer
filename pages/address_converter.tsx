/**
 * Module dependencies.
 */
import { getPageMetaData, metaTags } from '@/components/metaData'
import { useSubscribeNats } from '@/nats/useSubscribeNats'
import useAppSettingsStore from '@/store/ui/settings'

import { Layout } from '../components/Layout'
import { PAGES } from '../components/Layout/components/Sidebar'
import AddressConverterView from '../components/views/AddressConverterView/AddressConverterView'

/**
 * The main controller for handling the address converter view.
 */
export default function AddressConverterController() {
  /**
   * Retrieves the metadata for the Address Converter page.
   */
  const metaData = getPageMetaData(PAGES.ADDRESS_CONVERTER)

  /**
   * Retrieves the selected network data from the store.
   */
  const { network } = useAppSettingsStore(state => ({ network: state.network }))

  /**
   * Establishes a subscription to the Nats messaging server.
   */
  useSubscribeNats(network, 'home')

  /**
   * Renders the Address Converter page.
   */
  return (
    <>
      {metaTags({ metaData })}
      <Layout activeTab={PAGES.ADDRESS_CONVERTER} hasSearchBar>
        <AddressConverterView />
      </Layout>
    </>
  )
}
