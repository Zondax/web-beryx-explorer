/**
 * Importing required dependencies, modules and components.
 */
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { TABLE_TYPE } from '@/config/tables'
import { ObjectType } from '@/routes/parsing'
import { useSearchStore } from '@/store/data/search'
import { InspectData } from '@carbon/pictograms-react'
import { Box, Grid, useMediaQuery, useTheme } from '@mui/material'

import { Sort } from 'components/widgets/SearchTables/config'

import TwoPanelHorizontal from '../../../../../Layout/variants/TwoPanelHorizontal'
import SearchTables from '../../../../../widgets/SearchTables/SearchTables'
import AddressOverview from './AddressOverview'
import BalanceChart from './BalanceChart'
import BlockOverview from './BlockOverview'
import ContractOverview from './ContractOverview'
import OverviewItem from './OverviewItem'
import TipsetOverview from './TipsetOverview'
import TransactionOverview from './TransactionOverview/TransactionOverview'

/**
 * Overview component which dynamically renders the corresponding component based on the search item type.
 * It also includes a table of latest transactions if the search item type permits.
 *
 * @returns Overview component
 */
const Overview = () => {
  const theme = useTheme() // Accessing the applied theme variables
  const { t } = useTranslation() // Localization hook for translating the texts.
  const upMd = useMediaQuery(theme.breakpoints.up('md'))
  const [component, setComponent] = useState<React.ReactNode | null>(null)

  /**
   * State and selectors
   */
  const searchItemType = useSearchStore(s => s.searchItemType)
  const inputValue = useSearchStore(s => s.searchInputValue)
  const network = useSearchStore(s => s.searchInputNetwork)

  const hasMoreSections =
    searchItemType === ObjectType.ADDRESS ||
    searchItemType === ObjectType.CONTRACT ||
    searchItemType === ObjectType.TIPSET ||
    searchItemType === ObjectType.BLOCK
  const hasBalanceChart = searchItemType === ObjectType.ADDRESS || searchItemType === ObjectType.CONTRACT
  const canDisplayTable = Boolean(network && inputValue && searchItemType !== ObjectType.UNKNOWN)

  useEffect(() => {
    const componentsMap: { [key in ObjectType | 'default']?: React.ReactNode } = {
      [ObjectType.TXS]: <TransactionOverview />,
      [ObjectType.ADDRESS]: <AddressOverview />,
      [ObjectType.CONTRACT]: <ContractOverview />,
      [ObjectType.TIPSET]: <TipsetOverview />,
      [ObjectType.BLOCK]: <BlockOverview />,
      default: <OverviewItem label={t('Loading')} content={undefined} icon={undefined} isLoading />,
    }
    setComponent(
      <Box
        height={'100%'}
        sx={{
          border: `1px solid ${theme.palette.tableBorder}`,
          borderRadius: '6px',
          display: 'flex',
          flexDirection: 'column',
          overflow: hasMoreSections ? 'unset' : 'auto',
        }}
      >
        {componentsMap[searchItemType] || componentsMap.default}
      </Box>
    )
  }, [hasMoreSections, searchItemType, t, theme.palette.tableBorder])

  const renderBalanceChart = useCallback(() => {
    if (upMd) {
      return (
        <TwoPanelHorizontal sizes={[65, 35]} minSizes={[500, 350]} height="fit-content">
          <>{component}</>
          <Box height={'100%'} minHeight={'20rem'}>
            <BalanceChart />
          </Box>
        </TwoPanelHorizontal>
      )
    }
    return (
      <Grid container direction="column" gap={'0.65rem'} width={'100%'}>
        <Grid item width={'100%'}>
          {component}
        </Grid>
        <Grid item height={'20rem'} width={'100%'}>
          <BalanceChart />
        </Grid>
      </Grid>
    )
  }, [upMd, component])

  const noRowsText = searchItemType === ObjectType.TXS ? t('No internal messages') : t('No transactions')
  const tableTitle =
    searchItemType === ObjectType.TIPSET
      ? 'Transactions'
      : searchItemType === ObjectType.BLOCK
        ? 'Top transaction by amount'
        : 'Latest Transactions'
  const tablePreSort: Sort[] = searchItemType === ObjectType.BLOCK ? [{ field: 'amount', sort: 'desc' }] : []
  const tableType = searchItemType === ObjectType.BLOCK ? TABLE_TYPE.BLOCK_TOP_TRANSACTIONS : TABLE_TYPE.TRANSACTIONS

  return (
    <Box
      sx={{
        height: '100%',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.65rem',
      }}
    >
      {hasBalanceChart ? renderBalanceChart() : component}

      {hasMoreSections ? (
        <Box
          height={{ xs: '35rem', md: '100%' }}
          minHeight={{ xs: '35rem', md: '15rem' }}
          sx={{
            borderRadius: '6px',
          }}
        >
          {canDisplayTable ? (
            <SearchTables
              tableType={tableType}
              noRowsText={noRowsText}
              noRowsIcon={<InspectData color={theme.palette.text.secondary} />}
              title={tableTitle}
              hideFooter
              limitRows={10}
              sort={tablePreSort}
            />
          ) : null}
        </Box>
      ) : null}
    </Box>
  )
}

/**
 * Exporting the component
 */
export default Overview
