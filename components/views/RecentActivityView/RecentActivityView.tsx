import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { TABLE_TYPE } from '@/config/tables'
import { useSubscribeNats } from '@/nats/useSubscribeNats'
import { useLatestStore } from '@/store/data/latest'
import { useAppSettingsStore } from '@/store/ui/settings'
import { confirmDistinctItems } from '@/utils/arrays'
import { Box, Unstable_Grid2 as Grid, useTheme } from '@mui/material'

import Panel from '../../widgets/Panel'
import Table from '../../widgets/Table'

/**
 * Array of tab names for the RecentActivityView component.
 * @type {string[]}
 */
const tabs: string[] = ['tipsets', 'transactions', 'contracts', 'rich_list']

/**
 * RecentActivityView component.
 * This component provides UI and methods for displaying recent activity.
 * @component
 */
const RecentActivityView = () => {
  /**
   * Global variables and states.
   */
  const router = useRouter()
  const theme = useTheme()
  const { t } = useTranslation()

  // layout
  const [activeTab, setActiveTab] = useState<string>('0')

  const { network } = useAppSettingsStore(state => ({ network: state.network }))
  useSubscribeNats(network, 'recent_activity')

  // Data
  const { latestTipsets, latestTransactions, latestContracts } = useLatestStore(s => ({
    latestTipsets: s.latestTipsets,
    latestTransactions: s.latestTransactions,
    latestContracts: s.latestContracts,
  }))

  /**
   * This function handles the change of tabs.
   * It replaces the current tab with the selected tab in the router.
   * @param tab - The selected tab.
   */
  const handleTabChange = useCallback(
    function (tab: string) {
      router.replace({
        pathname: router.pathname,
        query: { ...router.query, tab: tabs[Number(tab)] },
      })
    },
    [router]
  )

  /**
   * This effect sets the active tab based on the tab parameter in the router query.
   */
  useEffect(() => {
    const tabParam = router.query?.tab as string
    const tabIndex = tabs.findIndex(el => el === tabParam)
    if (tabIndex !== -1) {
      setActiveTab(tabIndex.toString())
    }
  }, [router.query])

  const getTransactionsRowData = useMemo(() => {
    return latestTransactions ?? []
  }, [latestTransactions])

  const getContractsRowData = useMemo(() => {
    if (latestContracts?.length !== 0) {
      return confirmDistinctItems(latestContracts, item => `${item.id}`)
    }
    return []
  }, [latestContracts])

  const latestTipsetsTable = (
    <Table
      key="latest tipsets recent activity table"
      rowData={latestTipsets}
      mode="normal"
      tableType={TABLE_TYPE.TIPSETS}
      disableColumnFilter
      disableColumnReorder
      loading={latestTipsets.length === 0}
      rowWatch
    />
  )

  const latestTransactionsTable = (
    <Table
      key="latest transactions recent activity table"
      rowData={getTransactionsRowData}
      mode="normal"
      tableType={TABLE_TYPE.RECENT_ACTIVITY_TRANSACTIONS}
      disableColumnFilter
      disableColumnReorder
      loading={latestTransactions.length === 0}
      rowWatch
    />
  )

  const latestContractsTable = (
    <Table
      key="contracts recent activity table"
      rowData={getContractsRowData} // Temporary
      mode="normal"
      tableType={TABLE_TYPE.CONTRACTS}
      disableColumnFilter
      disableColumnReorder
      loading={latestContracts.length === 0}
      rowWatch
    />
  )

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
        <Panel
          contentToDownload={''}
          tabs={[{ name: t('Latest Tipsets') }, { name: t('Latest Transactions') }, { name: t('Latest Contracts Invokes') }]}
          currentTab={activeTab}
          padding="0.65rem 0.5rem 0.7rem 0.5rem"
          onTabChange={handleTabChange}
        >
          {latestTipsetsTable}
          {latestTransactionsTable}
          {latestContractsTable}
        </Panel>
      </Grid>
    </Box>
  )
}
export default RecentActivityView
