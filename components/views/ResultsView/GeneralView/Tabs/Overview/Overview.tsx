/**
 * Importing required dependencies, modules and components.
 */
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { TABLE_TYPE } from '@/config/tables'
import { ObjectType } from '@/routes/parsing'
import { useSearchStore } from '@/store/data/search'
import { InspectData } from '@carbon/pictograms-react'
import { Box, useMediaQuery, useTheme } from '@mui/material'

import { Sort } from 'components/widgets/SearchTables/config'

import TwoPanelHorizontal from '../../../../../Layout/variants/TwoPanelHorizontal'
import SearchTables from '../../../../../widgets/SearchTables/SearchTables'
import Blocks from '../Blocks'
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

  const canDisplayTable = Boolean(network && inputValue !== undefined && inputValue !== null && searchItemType !== ObjectType.UNKNOWN)
  const noRowsText = searchItemType === ObjectType.TXS ? t('No internal messages') : t('No transactions')
  const tableTitle =
    searchItemType === ObjectType.TIPSET
      ? 'Transactions'
      : searchItemType === ObjectType.BLOCK
        ? 'Top transaction by amount'
        : 'Latest Transactions'
  const tablePreSort: Sort[] = searchItemType === ObjectType.BLOCK ? [{ field: 'amount', sort: 'desc' }] : []
  const tableType = searchItemType === ObjectType.BLOCK ? TABLE_TYPE.BLOCK_TOP_TRANSACTIONS : TABLE_TYPE.TRANSACTIONS

  /**
   * `useEffect` hook to dynamically set the component state based on the `searchItemType`.
   * It maps the `searchItemType` to a specific component and sets it to the `component` state.
   * If the `searchItemType` does not match any key in the `componentsMap`, it defaults to `OverviewItem` with loading state.
   *
   * The `Box` component wraps the selected component and applies styling to ensure consistent layout and appearance.
   * The `border`, `borderRadius`, `display`, `flexDirection`, and `overflow` styles are applied to the `Box`.
   * The `overflow` style is conditionally set to 'unset' if `hasMoreSections` is true, allowing for additional content sections; otherwise, it defaults to 'auto' for scrollable content.
   *
   * This effect runs whenever `hasMoreSections`, `searchItemType`, `t`, or `theme.palette.tableBorder` changes, ensuring the component updates in response to these dependencies.
   */
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
          backgroundColor: theme.palette.background.level0,
          borderRadius: '12px',
          display: 'flex',
          flexDirection: 'column',
          overflow: hasMoreSections ? 'unset' : 'auto',
        }}
      >
        {componentsMap[searchItemType] || componentsMap.default}
      </Box>
    )
  }, [hasMoreSections, searchItemType, t, theme.palette])

  /**
   * `renderOverviewSection` takes a React Functional Component (`RightPanelComponent`) as an argument and returns a JSX element.
   * Depending on the screen size, it renders a two-panel layout for larger screens (using `TwoPanelHorizontal`) or a single-column layout for smaller screens (using `Grid`).
   * The left panel or the top grid item displays the main content (`component` state variable), and the right panel or the bottom grid item displays the `RightPanelComponent`.
   *
   * @param {React.FC} RightPanelComponent - The React Functional Component to be rendered in the right panel or the bottom grid item.
   * @returns {React.ReactNode} A JSX element that represents the overview section layout with the specified `RightPanelComponent`.
   */
  const renderOverviewSection = useCallback(
    (RightPanelComponent: React.FC) => {
      if (upMd) {
        return (
          <TwoPanelHorizontal sizes={[65, 35]} minSizes={[500, 350]} height="fit-content">
            <Box sx={{ height: '100%', overflowY: 'auto' }}>{component}</Box>
            <Box height={'100%'} minHeight={'20rem'}>
              <RightPanelComponent />
            </Box>
          </TwoPanelHorizontal>
        )
      }
      return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <Box sx={{ height: '100%' }}>{component}</Box>
          <Box height={'100%'} minHeight={'20rem'}>
            <RightPanelComponent />
          </Box>
        </Box>
      )
    },
    [upMd, component]
  )

  /**
   * `renderOverview` determines which component to render based on the `searchItemType`.
   * It utilizes the `renderOverviewSection` function to render the appropriate component for the given `searchItemType`.
   * For `ADDRESS` and `CONTRACT` types, it renders the `BalanceChart` component.
   * For the `TIPSET` type, it renders the `Blocks` component.
   * For all other types, it defaults to rendering the `component` state variable.
   *
   * @returns {React.ReactNode} The component to be rendered based on the `searchItemType`.
   */
  const renderOverview = useCallback(() => {
    switch (searchItemType) {
      case ObjectType.ADDRESS:
      case ObjectType.CONTRACT:
        return renderOverviewSection(BalanceChart)
      case ObjectType.TIPSET:
        return renderOverviewSection(Blocks)
      default:
        return component
    }
  }, [searchItemType, component, renderOverviewSection])

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
      {renderOverview()}

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
              hideBorder
              limitRows={10}
              sort={tablePreSort}
            />
          ) : null}
        </Box>
      ) : null}
    </Box>
  )
}
export default Overview
