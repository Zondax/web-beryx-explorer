import Link from 'next/link'
import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { TABLE_TYPE } from '@/config/tables'
import { useSubscribeNats } from '@/nats/useSubscribeNats'
import { useLatestStore } from '@/store/data/latest'
import useAppSettingsStore from '@/store/ui/settings'
import { confirmDistinctItems } from '@/utils/arrays'
import { Box, Button, CircularProgress, Unstable_Grid2 as Grid, Typography, useMediaQuery, useTheme } from '@mui/material'

import Panel from './Panel'
import Table from './Table'

/**
 * LatestItems component.
 * This component is responsible for displaying the latest tipsets, transactions and contract invokes.
 * It uses the useMemo hook to memoize the tables for tipsets, transactions and contract invokes to avoid unnecessary re-renders.
 * It uses the useTranslation hook to translate the UI text.
 * It uses the useTheme and useMediaQuery hooks to adapt the layout for different screen sizes.
 * @returns The LatestItems component.
 */
const LatestItems = () => {
  const { t } = useTranslation()
  const theme = useTheme()
  const upMd = useMediaQuery(theme.breakpoints.up('md'))

  const { network } = useAppSettingsStore(state => ({ network: state.network }))

  useSubscribeNats(network, 'home')

  const {
    latestTipsets: uniqueTipsets,
    latestTransactions,
    latestContracts,
  } = useLatestStore(s => ({
    latestTipsets: s.latestTipsets,
    latestTransactions: s.latestTransactions,
    latestContracts: s.latestContracts,
  }))

  const uniqueTransactions = useMemo(() => confirmDistinctItems(latestTransactions, x => `TxCID: ${x.tx_cid}`), [latestTransactions])
  const uniqueContracts = useMemo(() => confirmDistinctItems(latestContracts, x => `Contract ID: ${x.id}`), [latestContracts])

  const tipsetsStatus = uniqueTipsets?.length ? 'success' : 'loading'
  const transactionsStatus = uniqueTransactions?.length ? 'success' : 'loading'
  const contractsStatus = uniqueContracts?.length ? 'success' : 'loading'

  /**
   * This function renders a table of the latest tipsets.
   * It uses the uniqueTipsets array to create the row data for the table.
   * @returns A JSX Element that represents the table of the latest tipsets.
   */
  const tipsetTable = useMemo(() => {
    const rowData =
      uniqueTipsets?.slice(0, 7)?.map(item => {
        return {
          tipset_timestamp: item.tipset_timestamp,
          height: item.height,
          canonical: item.canonical,
          miners: item.blocks_info,
        }
      }) ?? []

    return (
      <Box
        data-testid={'latest-tipsets-table'}
        key={'Latest tipsets table home page'}
        height={{ xs: '31.25rem', md: '23.9rem' }}
        width={'100%'}
      >
        <Table
          rowData={rowData}
          tableType={TABLE_TYPE.LATEST_TIPSETS}
          noRowsPosition="center"
          noRowsText={rowData.length ? t('Loading latest tipsets') : t('No items to show')}
          noRowsIcon={<CircularProgress />}
          loading={tipsetsStatus === 'loading'}
          hideFooter
          disableColumnFilter
          disableColumnReorder
          mode={'normal'}
        />
      </Box>
    )
  }, [uniqueTipsets, tipsetsStatus, t])

  /**
   * This function renders a table of the latest transactions.
   * It uses the uniqueTransactions array to create the row data for the table.
   * @returns A JSX Element that represents the table of the latest transactions.
   */
  const transactionsTable = useMemo(() => {
    const rowData = uniqueTransactions?.slice(0, 7) ?? []

    return (
      <Box
        data-testid={'latest-transactions-table'}
        key={'Latest transactions table home page'}
        height={{ xs: '26.5rem', md: '23.9rem' }}
        width={'100%'}
      >
        <Table
          rowData={rowData}
          tableType={TABLE_TYPE.LATEST_TRANSACTIONS}
          noRowsPosition="center"
          noRowsText={rowData.length ? t('Loading latest transactions') : t('No items to show')}
          noRowsIcon={<CircularProgress />}
          loading={transactionsStatus === 'loading'}
          disableColumnFilter
          disableColumnReorder
          hideFooter
          mode={'normal'}
        />
      </Box>
    )
  }, [uniqueTransactions, transactionsStatus, t])

  /**
   * This function renders a table of the latest contract invokes.
   * It uses the uniqueContracts array to create the row data for the table.
   * @returns A JSX Element that represents the table of the latest contract invokes.
   */
  const invokesTable = useMemo(() => {
    const rowData = uniqueContracts?.slice(0, 7) ?? []

    return (
      <Box
        data-testid={'latest-invokes-table'}
        key={'Latest invokes table home page'}
        height={{ xs: '26.5rem', md: '23.9rem' }}
        width={'100%'}
      >
        <Table
          rowData={rowData}
          tableType={TABLE_TYPE.CONTRACTS_INVOKES_HOME}
          disableColumnFilter
          disableColumnReorder
          noRowsPosition="center"
          noRowsText={rowData.length ? t('Loading latest contract invokes') : t('No items to show')}
          noRowsIcon={<CircularProgress />}
          loading={contractsStatus === 'loading'}
          hideFooter
          mode={'normal'}
        />
      </Box>
    )
  }, [uniqueContracts, contractsStatus, t])

  /**
   * This function renders a section with a title, a table, and a link.
   * @param key - A unique key for the section.
   * @param title - The title of the section.
   * @param table - A function that returns a JSX Element, which is the table to be rendered.
   * @param link - The link to be used in the "View More" button.
   * @param wide - A boolean that determines the width and margin of the section. Default is false.
   * @returns A JSX Element that represents the section.
   */
  const renderSection = useCallback(
    (key: string, title: string, table: JSX.Element, link: string, wide = false) => {
      const sectionTitle = t(`Latest ${title}`)
      const viewMoreTitle = t('View More')
      const sectionId = `latest-${key.toLowerCase()}-heading`
      const viewMoreId = `view-more-${key.toLowerCase()}`
      const gridWidth = wide ? 12 : 6
      const gridHeight = { xs: '26.5rem', md: '27rem' }
      const gridMarginTop = wide ? '2rem' : '0'

      return (
        <Grid
          key={key}
          xs={12}
          md={gridWidth}
          height={gridHeight}
          sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: gridMarginTop }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '0 1rem' }}>
            <Typography variant="h5" component={'h1'} id={sectionId}>
              {sectionTitle}
            </Typography>
            <Link href={link} id={viewMoreId}>
              <Typography variant="body1" component={'p'} color={theme.palette.primary.main}>
                {viewMoreTitle}
              </Typography>
            </Link>
          </Box>
          {table}
        </Grid>
      )
    },
    [t, theme.palette.primary.main]
  )

  /**
   * This function renders the desktop view of the latest items section.
   * It uses the renderSection function to render three sections: Tipsets, Transactions, and Contracts Invokes.
   * Each section is rendered with a unique key, a title, a table, and a link.
   * @returns A JSX Element that represents the desktop view of the latest items section.
   */
  const desktopView = useMemo(
    () => (
      <Grid container spacing={'1rem'} justifyContent={'center'}>
        {renderSection('tipsets', 'Tipsets', tipsetTable, '/recent_activity?tab=tipsets')}
        {renderSection('transactions', 'Transactions', transactionsTable, '/recent_activity?tab=transactions')}
        {renderSection('invokes', 'Contracts Invokes', invokesTable, '/recent_activity?tab=contracts', true)}
      </Grid>
    ),
    [renderSection, tipsetTable, transactionsTable, invokesTable]
  )

  /**
   * This function renders the mobile view of the latest items section.
   * It uses the renderSection function to render three sections: Tipsets, Transactions, and Contracts Invokes.
   * Each section is rendered with a unique key, a title, a table, and a link.
   * @returns A JSX Element that represents the mobile view of the latest items section.
   */
  const mobileView = useMemo(
    () => (
      <Grid
        container
        flexDirection={'column'}
        gap={'0.5rem'}
        width={'100%'}
        flexShrink={0}
        flexWrap={'nowrap'}
        bgcolor={theme.palette.background.level1}
        borderRadius={'12px'}
        overflow={'hidden'}
      >
        <Panel
          contentToDownload={''}
          tabs={[{ name: t('Latest Tipsets') }, { name: t('Latest Transactions') }, { name: t('Latest Contracts Invokes') }]}
          padding="0.5rem"
          tabBackgroundColor={theme.palette.background.level1}
        >
          {[
            renderSection('tipsets', 'Tipsets', tipsetTable, '/recent_activity?tab=tipsets'),
            renderSection('transactions', 'Transactions', transactionsTable, '/recent_activity?tab=transactions'),
            renderSection('invokes', 'Contracts Invokes', invokesTable, '/recent_activity?tab=contracts'),
          ]}
        </Panel>
      </Grid>
    ),
    [t, renderSection, tipsetTable, transactionsTable, invokesTable, theme.palette.background.level1]
  )

  const view = useMemo(() => (upMd ? desktopView : mobileView), [upMd, desktopView, mobileView])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '100%',
        padding: { xs: '0 1rem', md: 'inherit' },
      }}
    >
      <Box
        sx={{
          marginBottom: '3rem',
          padding: '0 1rem',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          marginTop: { xs: 0, md: '0rem' },
        }}
      >
        <Typography variant="h3" component={'h2'} gutterBottom textAlign={'left'} data-testid={'latest-items-title'}>
          {t('Latest Tipsets and Transactions')}
        </Typography>

        <Typography
          variant="body1"
          component={'p'}
          maxWidth={{ xs: '100%', md: '65ch' }}
          mb={'2rem'}
          textAlign={'left'}
          data-testid={'latest-items-description'}
        >
          {t(
            "Stay up to date with the latest happenings in the world of Filecoin! In this section, we'll provide you with a quick overview of the most recent tipsets and transactions."
          )}
        </Typography>
        <Grid container justifyContent="flex-start" gap={2} alignItems={'center'}>
          <Link href="/recent_activity">
            <Button LinkComponent={'a'} variant={'contained'} size="medium" data-testid={'latest-items-button'}>
              {t('Go to Recent Activity')}
            </Button>
          </Link>
        </Grid>
      </Box>
      {view}
    </Box>
  )
}
export default LatestItems
