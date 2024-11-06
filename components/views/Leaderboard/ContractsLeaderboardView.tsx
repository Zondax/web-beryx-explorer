import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'

import { Box, Unstable_Grid2 as Grid, useTheme } from '@mui/material'

import { contractsLeaderboardTabs } from '../../../src/config/tabs'
import Panel from '../../widgets/Panel'
import { TabProps } from '../ResultsView/GeneralView/types'

/**
 * ContractsLeaderboardView Component.
 * @returns ContractsLeaderboardView component
 */
const ContractsLeaderboardView = () => {
  // Global objects
  const router = useRouter()
  const theme = useTheme()

  const [activeTab, setActiveTab] = useState<string>('0')

  /**
   * Changes the current active tab and updates the URL.
   * @param tab - The tab identifier
   */
  const handleTabChange = useCallback(
    (tab: string) => {
      if (router?.query) {
        const tabIds = contractsLeaderboardTabs.map((item: TabProps) => item.id)

        router.replace({
          pathname: router.pathname,
          query: { ...router.query, tab: tabIds[Number(tab)] },
        })
      }
    },
    [router]
  )

  useEffect(() => {
    if (router?.query && router.query.tab) {
      const tabParam = router.query.tab as string
      const tabIndex = contractsLeaderboardTabs.findIndex(el => el.id === tabParam)
      if (tabIndex !== -1) {
        setActiveTab(tabIndex.toString())
      }
    }
  }, [router, router.query])

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
        data-testid={'leaderbord-panel'}
      >
        <Panel
          contentToDownload={''}
          tabs={contractsLeaderboardTabs.map((item: TabProps) => ({ name: item.name, disabled: !item.show }))}
          tabBackgroundColor={theme.palette.background.level1}
          tabBorderColor={theme.palette.border?.level1}
          currentTab={activeTab}
          padding="0.5rem"
          onTabChange={handleTabChange}
        >
          {contractsLeaderboardTabs.map(({ id, content }) => (
            <Box key={`contracts leaderboard item tab ${id}`} height={'100%'} width={'100%'}>
              {content}
            </Box>
          ))}
        </Panel>
      </Grid>
    </Box>
  )
}

export default ContractsLeaderboardView
