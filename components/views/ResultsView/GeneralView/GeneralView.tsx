import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { subscribeNatsSync } from '@/nats/useSubscribeNats'
import { ObjectType } from '@/routes/parsing'
import { useSearchStore } from '@/store/data/search'
import { useContractsStore } from '@/store/ui/contracts'
import useAppSettingsStore from '@/store/ui/settings'
import { Box, Unstable_Grid2 as Grid, useTheme } from '@mui/material'

import { searchedItemTabs } from '../../../../src/config/tabs'
import Panel from '../../../widgets/Panel'
import { ItemInformation } from './ItemInformation'
import { TabProps } from './types'

/**
 * GeneralView is a functional component that renders the general view of the application.
 * It uses several hooks to fetch the necessary data and then maps over the data to render each item in the overview.
 *
 * @returns A fragment containing the mapped overview items.
 */
const GeneralView = () => {
  const router = useRouter()
  const { query } = router
  const { t } = useTranslation()

  // Current search info
  const searchValue: string = useSearchStore(s => s.searchInputValue)
  const searchItemType = useSearchStore(s => s.searchItemType)
  const searchType = useSearchStore(s => s.searchType)
  const searchIsContract = useSearchStore(s => s.isContract)
  const itemInfo = useSearchStore(s => s.searchResult.json)

  const setSearchItemType = useSearchStore(s => s.setSearchItemType)
  const setIsContract = useSearchStore(s => s.setIsContract)
  const testInteract = useContractsStore(state => state.testInteract)
  const theme = useTheme()

  const [activeTab, setActiveTab] = useState<string>('0')

  const { network } = useAppSettingsStore(state => ({ network: state.network }))

  const tabs = useMemo(() => searchedItemTabs[searchItemType], [searchItemType])

  /**
   * useEffect hook to handle tab changes and interactions.
   */
  useEffect(() => {
    if (testInteract) {
      const tabIndex = searchedItemTabs[searchItemType].findIndex(item => item.id === 'interact')
      setActiveTab(tabIndex.toString())
      return
    }

    if (query && Object.keys(query).includes('tab')) {
      const tabParam = router.query.tab as string

      const tabs = searchedItemTabs[searchItemType]
      const tabIds = tabs.map((item: TabProps) => item.id)
      const tabIndex = tabIds.findIndex(el => el === tabParam)

      if (tabIndex !== -1) {
        setActiveTab(tabIndex.toString())
      }
    }
  }, [query, router.query?.tab, searchItemType, t, testInteract])

  /**
   * useEffect hook to handle search type changes.
   */
  useEffect(() => {
    switch (searchType) {
      case ObjectType.ADDRESS:
        if (!itemInfo) {
          break
        }
        if (searchIsContract || (Object.keys(itemInfo).includes('actor_type') && itemInfo.actor_type === 'evm')) {
          setSearchItemType(ObjectType.CONTRACT)
          setIsContract(true)
          break
        }
        setSearchItemType(ObjectType.ADDRESS)
        break
      case ObjectType.TIPSET:
      case ObjectType.TXS:
      case ObjectType.BLOCK:
        setSearchItemType(searchType)
        break
      default:
        setSearchItemType(ObjectType.UNKNOWN)
        break
    }
  }, [itemInfo, searchIsContract, searchType, searchValue, setIsContract, setSearchItemType])

  /**
   * handleTabChange is a function that handles the tab change event.
   * It updates the router and subscribes to the NATS.
   * It is memoized to prevent unnecessary re-renders.
   *
   * @param tab - The tab to change to.
   */
  const handleTabChange = useMemo(
    () => (tab: string) => {
      const tabIds = tabs.map((item: TabProps) => item.id)

      const tmpTab = tabIds[Number(tab)]
      const tmpPage = tmpTab === 'mempool' || (searchType === ObjectType.TXS && tmpTab) ? 'mempool' : 'home'
      subscribeNatsSync(network, tmpPage)

      router.replace({
        pathname: router.pathname,
        query: { ...router.query, tab: tabIds[Number(tab)] },
      })
    },
    [tabs, searchType, network, router]
  )

  const renderTabs = useMemo(() => {
    return tabs.map((item: TabProps) => {
      return (
        <Box key={`search item tab ${item.id}`} height={'100%'} width={'100%'}>
          {item.content}
        </Box>
      )
    })
  }, [tabs])

  const renderPanel = useMemo(() => {
    return (
      <Panel
        contentToDownload={''}
        tabs={tabs.map((item: TabProps) => ({ name: item.name, disabled: !item.show }))}
        tabBackgroundColor={theme.palette.background.level1}
        tabBorderColor={theme.palette.border?.level1}
        currentTab={activeTab}
        padding="0.5rem"
        onTabChange={handleTabChange}
      >
        {renderTabs}
      </Panel>
    )
  }, [tabs, theme.palette, activeTab, handleTabChange, renderTabs])

  return (
    <Box
      sx={{
        height: { xs: 'calc(100dvh - 6.75rem)', md: 'calc(100dvh - 6rem - 1.75rem)' },
        width: '100%',
      }}
    >
      <Grid
        container
        flexDirection={'column'}
        width={'100%'}
        height={'100%'}
        flexShrink={0}
        flexWrap={'nowrap'}
        sx={{ backgroundColor: theme.palette.background.level0 }}
      >
        <ItemInformation searchItemType={searchItemType} />
        {renderPanel}
      </Grid>
    </Box>
  )
}

export default GeneralView
