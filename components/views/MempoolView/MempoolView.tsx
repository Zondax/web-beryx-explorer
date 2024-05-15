/**
 * @module MempoolView
 */
import { debounce } from 'lodash'
import { useRouter } from 'next/router'
import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Box, Unstable_Grid2 as Grid, useTheme } from '@mui/material'

import Panel from '../../widgets/Panel'
import { TabProps } from '../ResultsView/GeneralView/types'
import { ItemInformation } from './components'
import MempoolStats from './components/MempoolStats/MempoolStats'
import MempoolTablePanel from './components/MempoolTablePanel'

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

  const [searchValue, setSearchValue] = useState<string | undefined>(undefined)
  const [activeTab, setActiveTab] = useState<string>('0')

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
            <MempoolTablePanel searchValue={searchValue} />
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
    [searchValue, t]
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
   * @function useEffect
   * @description Subscribes to the mempool store and updates the table at regular intervals.
   */
  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel()
    }
  }, [debouncedChangeHandler])

  return (
    <Box
      sx={{
        height: { xs: 'calc(100dvh - 6.75rem)', md: 'calc(100dvh - 6rem - 1.75rem)' },
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
          tabBackgroundColor={theme.palette.background.level1}
          tabBorderColor={theme.palette.border?.level1}
          currentTab={activeTab}
          padding="0.5rem"
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
