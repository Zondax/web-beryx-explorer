/**
 * @module MempoolView
 */
import { debounce, throttle } from 'lodash'
import { useRouter } from 'next/router'
import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { DetailsProps, TransactionData, useMempoolStore } from '@/store/data/mempool'
import { useAppSettingsStore } from '@/store/ui/settings'
import { Box, Unstable_Grid2 as Grid, useTheme } from '@mui/material'

import Panel from '../../widgets/Panel'
import { MempoolTransactionsTable } from '../ResultsView/GeneralView/Tabs/Mempool'
import { TabProps } from '../ResultsView/GeneralView/types'
import { ItemInformation } from './components'
import MempoolStats from './components/MempoolStats/MempoolStats'

/**
 * @function MempoolView
 * @description A component that displays the Mempool view.
 * @returns A JSX element representing the Mempool view.
 */
const MempoolView = () => {
  const theme = useTheme()
  const { t } = useTranslation()
  const router = useRouter()
  const { query } = router

  const { network } = useAppSettingsStore(state => ({ network: state.network }))
  const mempoolTransactions = useRef(useMempoolStore.getState().transactions)
  const mempoolLoading = useMempoolStore(s => s.loading)
  const setDetails = useMempoolStore.getState().setDetails
  const [searchValue, setSearchValue] = useState<string | undefined>(undefined)
  const [activeTab, setActiveTab] = useState<string>('0')
  const [throttledItems, setThrottledItems] = useState<TransactionData[]>([])
  const throttledItemsRef = useRef<TransactionData[]>([])

  /**
   * @function filteredRows
   * @description Filters the rows of the table based on the search value.
   * @returns An array of filtered transaction data.
   */
  const filteredRows = useMemo(() => {
    const activeTxs = throttledItems.filter(elem => elem.last_seen === undefined)
    const details: DetailsProps = {
      numberOfItems: activeTxs.length.toString(),
    }
    setDetails(details)

    return throttledItems.filter(row => {
      if (!searchValue || searchValue === '') {
        return true
      }
      const search = searchValue.toLowerCase()
      return Object.values(row).some(value => typeof value === 'string' && value.toLowerCase().includes(search))
    })
  }, [throttledItems, setDetails, searchValue])

  /**
   * Mempool page tabs
   */
  const tabs = useMemo(
    () => [
      {
        id: 'mempool',
        name: t('Mempool'),
        content: (
          <Box key={'search item tab mempool'} height={'100%'} width={'100%'}>
            <MempoolTransactionsTable
              filteredRows={filteredRows}
              loading={mempoolLoading}
              noRowsText={
                searchValue
                  ? `There are no transactions the mempool that include "${searchValue}"`
                  : 'At the moment, there are no transactions in the mempool.'
              }
            />
          </Box>
        ),
        show: true,
      },
      {
        id: 'stats',
        name: t('Stats'),
        content: (
          <Box key={'search item tab stats'} height={'100%'} width={'100%'} sx={{ overflowY: 'auto' }}>
            <MempoolStats />
          </Box>
        ),
        show: true,
      },
    ],
    [filteredRows, mempoolLoading, searchValue, t]
  )

  /**
   * handleTabChange is a function that handles the tab change event.
   * It updates the router.
   * It is memoized to prevent unnecessary re-renders.
   *
   * @param tab - The tab to change to.
   */
  const handleTabChange = useMemo(
    () => (tab: string) => {
      const tabIds = tabs.map((item: TabProps) => item.id)

      router.replace({
        pathname: router.pathname,
        query: { ...router.query, tab: tabIds[Number(tab)] },
      })
    },
    [tabs, router]
  )

  /**
   * useEffect hook to handle tab changes and interactions.
   */
  useEffect(() => {
    if (query && Object.keys(query).includes('tab')) {
      const tabParam = router.query.tab as string

      const tabIndex = tabs.findIndex(({ id }) => id === tabParam)

      if (tabIndex !== -1) {
        setActiveTab(tabIndex.toString())
      }
    }
  }, [query, router.query?.tab, tabs])

  /**
   * @function handleChange
   * @description Handles the change event of the search input field. It filters the input and sets the search value.
   * @param event - The event object.
   */
  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let filteredInput = event.target.value
    filteredInput = filteredInput.toLowerCase()
    filteredInput = filteredInput.replace(/ /g, '')

    if (filteredInput === '') {
      setSearchValue(undefined)
      return
    }
    setSearchValue(filteredInput)
  }

  /**
   * @function debouncedChangeHandler
   * @description A debounced version of the handleChange function to limit the number of calls.
   * @returns A debounced function.
   */
  const debouncedChangeHandler = useMemo(() => debounce(handleChange, 300), [])

  /**
   * @function updateTable
   * @description Updates the table with the current mempool transactions.
   */
  const updateTable = () => {
    if (throttledItemsRef.current.length > 0 || mempoolTransactions.current.length > 0) {
      throttledItemsRef.current = mempoolTransactions.current
      setThrottledItems(mempoolTransactions.current)
    }
  }

  /**
   * @function useEffect
   * @description Subscribes to the mempool store and updates the table at regular intervals.
   */
  useEffect(() => {
    const unsubscribe = useMempoolStore.subscribe(state => (mempoolTransactions.current = state.transactions))

    const throttleUpdate = throttle(updateTable, 3000)
    throttleUpdate()
    const intervalId = setInterval(throttleUpdate, 3000)

    return () => {
      unsubscribe()
      clearInterval(intervalId)
      throttleUpdate.cancel()
      debouncedChangeHandler.cancel()
    }
  }, [debouncedChangeHandler])

  /**
   * @function useEffect
   * @description Clears the table when the network changes.
   */
  useEffect(() => {
    setThrottledItems([])
  }, [network])

  /**
   * @function useEffect
   * @description Updates the table when the mempool transactions are received for the first time after the network change.
   */
  useEffect(() => {
    if (!mempoolLoading && mempoolTransactions.current.length !== 0) {
      updateTable()
    }
  }, [mempoolLoading])

  return (
    <Box
      sx={{
        height: { xs: 'calc(100dvh - 6.5rem)', md: 'calc(100dvh - 2.25rem - 4rem)' },
        minHeight: '40rem',
        transition: { xs: 'height 0.2s ease-in-out', md: 'none' },
        width: '100%',
        display: 'flex',
        gap: '8px',
      }}
      key={'results view panel'}
    >
      <Grid
        container
        flexDirection={'column'}
        gap={'0.5rem'}
        width={'100%'}
        height={'100%'}
        flexShrink={0}
        flexWrap={'nowrap'}
        bgcolor={theme.palette.background.level1}
        borderRadius={'0.5rem'}
      >
        <Grid container height={{ xs: '13rem', md: 'fit-content' }}>
          <ItemInformation search={debouncedChangeHandler} tab={activeTab} />
        </Grid>
        <Panel
          contentToDownload={''}
          tabs={tabs.map(({ name }) => ({ name }))}
          currentTab={activeTab}
          padding="0.65rem 0.5rem 0.7rem 0.5rem"
          onTabChange={handleTabChange}
        >
          {tabs.map(({ content }) => content)}
        </Panel>
      </Grid>
    </Box>
  )
}
/**
 * @exports MempoolView
 */
export default MempoolView
