import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'

import { Box, Unstable_Grid2 as Grid, useTheme } from '@mui/material'

import { leaderboardTabs } from '../../../src/config/tabs'
import Panel from '../../widgets/Panel'
import { TabProps } from '../ResultsView/GeneralView/types'

/**
 * LeaderboardView Component.
 * @returns LeaderboardView component
 */
const LeaderboardView = () => {
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
        const tabIds = leaderboardTabs.map((item: TabProps) => item.id)

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
      const tabIndex = leaderboardTabs.findIndex(el => el.id === tabParam)
      if (tabIndex !== -1) {
        setActiveTab(tabIndex.toString())
      }
    }
  }, [router, router.query])

  return (
    <Box
      sx={{
        height: { xs: 'calc(100dvh - 6.75rem)', md: 'calc(100dvh - 2.25rem - 4rem)' },
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
          tabs={leaderboardTabs.map((item: TabProps) => ({ name: item.name, disabled: !item.show }))}
          currentTab={activeTab}
          padding="0.65rem 0.5rem 0.7rem 0.5rem"
          onTabChange={handleTabChange}
        >
          {leaderboardTabs.map(({ id, content }) => (
            <Box key={`leaderboard item tab ${id}`} height={'100%'} width={'100%'}>
              {content}
            </Box>
          ))}
        </Panel>
      </Grid>
    </Box>
  )
}

export default LeaderboardView
