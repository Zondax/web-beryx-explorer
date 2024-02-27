import { NextPageContext } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { getPageMetaData, metaTags } from '@/components/metaData'
import { InputType } from '@/config/config'
import { useSearchType } from '@/data/beryx'
import { subscribeNatsSync } from '@/nats/useSubscribeNats'
import { searchValue } from '@/refactor/search'
import { ObjectType, SearchPath, parseSearchUrl } from '@/routes/parsing'
import { useNatsStore } from '@/store/data/nats'
import { useSearchStore } from '@/store/data/search'
import { useContractsStore } from '@/store/ui/contracts'
import { useHistoryStore } from '@/store/ui/history'
import { useAppSettingsStore } from '@/store/ui/settings'
import { decodeInput } from '@/utils/inputDetection'
import { truncateMiddleOfString } from '@/utils/text'
import { captureException } from '@sentry/nextjs'

import Layout from '../../../components/Layout/Layout'
import { PAGES } from '../../../components/Layout/components/Sidebar'
import GeneralView from '../../../components/views/ResultsView/GeneralView/GeneralView'

/**
 * Represents the initial props for the search controller.
 * @param {NextPageContext} context The context of the page.
 * @returns The properties object.
 */
SearchController.getInitialProps = (context: NextPageContext) => {
  return {
    slug: context.query.slug,
  }
}

/**
 * `SearchController` is a function component that handles the search functionality in the application.
 * It uses the Next.js router and the slug property from the props to perform the search.
 *
 * @param props - The properties that define the `SearchController` component.
 * @param props.slug - The slug used for the search.
 * @param props.termsAndConditions - The terms and conditions.
 *
 * @returns A React node that represents the search controller.
 */
function SearchController(props: { slug: string | string[] | undefined }) {
  const { network, setNetwork } = useAppSettingsStore(state => ({ network: state.network, setNetwork: state.setNetwork }))

  const router = useRouter()
  const [parsedPath, setParsedPath] = useState<SearchPath | undefined>(undefined)

  const addItemToHistory = useHistoryStore(state => state.addItem)
  const { setEthAddress, cleanOpenedFiles, cleanSourceCode } = useContractsStore.getState()

  const {
    cleanExplorerResponse,
    cleanSearchResultTx,
    pushSearchHistoryValue,
    setSearchInputValue,
    setFoundInAnotherNetwork,
    setSearchInputNetwork,
    setSearchType,
    setSearchInputType,
  } = useSearchStore()

  const { asPath } = router
  const [prevPath, setPrevPath] = useState(asPath?.split('?')[0])
  const [initialRender, setInitialRender] = useState(true) // Flag for initial render

  // Setting up initial metadata
  let metaData = getPageMetaData(PAGES.EXPLORE)

  /**
   * NATS connection details from the application state.
   */
  const natsConnections = useNatsStore(s => s.connections)

  const { data: searchTypeResult } = useSearchType(parsedPath?.arguments ?? '', network)

  // If slug properties exists and slug is an array, metadata is updated.
  if (props.slug && Array.isArray(props.slug)) {
    let title = 'Explorer'
    const input = truncateMiddleOfString(props.slug[3], 16)

    switch (props.slug[2].toLowerCase()) {
      case 'address':
        title = 'Address'
        break

      case 'transactions':
        title = 'Transaction'
        break

      case 'tipset':
        title = 'Tipset'
        break

      default:
        break
    }

    metaData = {
      metaTitle: `${title} ${input} - Beryx`,
      metaDescription:
        'Beryx is a platform developed by Zondax that includes public historical data, streaming data and metrics for Filecoin blockchain.',
      metaImage: `https://beryx.zondax.ch/api/og?chain=${props.slug[0]}&network=${props.slug[1]}&inputType=${props.slug[2]}&input=${props.slug[3]}`,
      metaURL: 'https://beryx.zondax.ch',
    }
  }

  // Clean previous search and set new parsedPath when asPath changes or initialRender
  useEffect(() => {
    if (initialRender) {
      setInitialRender(false) // Set initial render flag to false
    }

    const currentPath = asPath?.split('?')[0]

    // Compare with the previous path
    if (currentPath !== prevPath || initialRender) {
      // Clean previous search
      cleanExplorerResponse()
      cleanSearchResultTx()
      setEthAddress(undefined)
      cleanSourceCode()

      // Clean Code tabs
      cleanOpenedFiles()

      let slugArray = router.query?.slug
      if (slugArray === undefined || !Array.isArray(router.query.slug)) {
        slugArray = currentPath?.replace('/v1/search/', '').split('/')
      }

      if (!Array.isArray(slugArray)) {
        return
      }

      try {
        setParsedPath(parseSearchUrl(slugArray))
      } catch (error) {
        router.push('/404')
        return
      }
    }
    setPrevPath(currentPath)
  }, [
    asPath,
    cleanOpenedFiles,
    setEthAddress,
    cleanSourceCode,
    initialRender,
    prevPath,
    router,
    cleanExplorerResponse,
    cleanSearchResultTx,
  ])

  // parsedPath triggers the visual changes. This is important because parsedPath can
  // end up being modified from the store when we press on our custom Link component.
  useEffect(() => {
    if (!parsedPath) {
      return
    }

    if (parsedPath.arguments && parsedPath.objectType && parsedPath.network && searchTypeResult) {
      handleInputDecodingAndDispatch()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addItemToHistory, parsedPath, searchTypeResult])

  /**
   * Subscribe to NATS server when the type search is a transaction or an address.
   */
  useEffect(() => {
    if (!parsedPath) {
      return
    }

    if ([ObjectType.ADDRESS, ObjectType.TXS].includes(parsedPath?.objectType as ObjectType)) {
      subscribeNatsSync(network, 'mempool')
    } else {
      subscribeNatsSync(network, 'home')
    }
  }, [parsedPath, network, natsConnections])

  /**
   * Handles the process of decoding the input and dispatching the result to the store.
   */
  async function handleInputDecodingAndDispatch() {
    let input = parsedPath?.arguments
    let inputType: InputType | undefined

    if (!input || input === '' || !parsedPath?.objectType) {
      router.push('/404')
      return
    }

    if (parsedPath?.network) {
      setNetwork(parsedPath.network)
    }

    if (searchTypeResult && searchTypeResult.length !== 0) {
      const decodedInput = await decodeInput(input ?? '', searchTypeResult[0])
      if (decodedInput.error) {
        return
      }
      if (decodedInput.ethForm) {
        setEthAddress(decodedInput.ethForm)
      }
      input = (decodedInput.filForm ?? '').toLowerCase()
      inputType = decodedInput.inputType
    }

    addItemToHistory({
      date: new Date(),
      network: parsedPath.network ?? network,
      type: parsedPath?.objectType,
      value: input,
      frequency: 1,
    })

    pushSearchHistoryValue({ network, type: parsedPath?.objectType, value: input })
    setSearchInputValue(input)
    setSearchInputNetwork(network)
    setSearchType(parsedPath?.objectType)
    setSearchInputType(inputType)

    try {
      const { error, foundAnotherNetwork } = await searchValue(network, input, inputType, parsedPath?.objectType)
      if (error) {
        if (foundAnotherNetwork) {
          setFoundInAnotherNetwork(true)
        }
        await router.push('/404')
      }
    } catch (err) {
      captureException(err)
      throw err
    }
  }

  return (
    <>
      {metaTags({ metaData })}
      <Layout
        hasSearchBar
        key={`Results view for ${parsedPath?.network}/${parsedPath?.objectType}/${parsedPath?.arguments} `}
        activeTab={PAGES.EXPLORE}
      >
        <GeneralView />
      </Layout>
    </>
  )
}

export default SearchController
