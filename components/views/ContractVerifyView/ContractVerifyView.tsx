/**
 * @module ContractVerifyView
 */
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'

import { Box, Grid, useTheme } from '@mui/material'

import { contractVerifierTabs } from '../../../src/config/tabs'
import Panel from '../../widgets/Panel'
import { TabProps } from '../ResultsView/GeneralView/types'
import { ItemInformation } from './components'

/**
 * The ContractVerifyView component is a view for verifying contracts.
 * It displays contract information and a panel with tabs for verified contracts.
 * @function ContractVerifyView
 * @returns {JSX.Element}
 */
const ContractVerifyView = () => {
  const router = useRouter()
  // get access to default theme and translation
  const theme = useTheme()

  const [activeTab, setActiveTab] = useState<string>('0')

  /**
   * Changes the current active tab and updates the URL.
   * @param tab - The tab identifier
   */
  const handleTabChange = useCallback(
    (tab: string) => {
      if (router?.query) {
        const tabIds = contractVerifierTabs.map((item: TabProps) => item.id)

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
      const tabIndex = contractVerifierTabs.findIndex(el => el.id === tabParam)
      if (tabIndex !== -1) {
        setActiveTab(tabIndex.toString())
      }
    }
  }, [router, router.query])

  return (
    <Box
      sx={{
        // Eliminate the topbar and header height
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
      >
        <Grid container height={'fit-content'}>
          <ItemInformation />
        </Grid>
        <Panel
          contentToDownload={''}
          tabs={contractVerifierTabs.map((item: TabProps) => ({ name: item.name, disabled: !item.show }))}
          currentTab={activeTab}
          padding="0.65rem 0.5rem 0.7rem 0.5rem"
          onTabChange={handleTabChange}
        >
          {contractVerifierTabs.map((item: TabProps) => {
            return (
              <Box key={`contract verifier item tab ${item.id}`} height={'100%'} width={'100%'}>
                {item.content}
              </Box>
            )
          })}
        </Panel>
      </Grid>
    </Box>
  )
}

// export the ContractVerifyView component for use in other modules
export default ContractVerifyView
