/**
 * Imports necessary dependencies.
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { LoadingStatus, StatsFrequency } from '@/config/config'
import { StatisticsProps, useMempoolStore } from '@/store/data/mempool'
import { CircleFill } from '@carbon/icons-react'
import { Box, Grid, useMediaQuery, useTheme } from '@mui/material'

import { PieChartValueProps } from 'components/common/Charts/PieChart'
import { txTypeColor } from 'components/common/TransactionTypeLabel/MethodDefinitions'
import StatsTile from 'components/views/MempoolView/components/StatsTile'
import { ItemTile } from 'components/widgets/Charts'

import GlobalBaseFee from './GlobalBaseFee'
import GlobalBaseFeeVariations from './GlobalBaseFeeVariations'
import MempoolTable from './MempoolTable'
import MethodSelector from './MethodSelector'
import RangeButton from './RangeButton'
import RangeSwitch from './RangeSwitch'
import TransctionsTypeChart from './TransctionsTypeChart'

/**
 * @description This function checks if the statistics need to be updated based on the selected range.
 * It compares the current statistics with the new statistics for the selected range.
 * If they are different, it returns true, indicating that an update is needed.
 *
 * @param currentStats - The current statistics stored in the state.
 * @param newStats - The new statistics fetched from the server or calculated.
 * @param rangeSelected - The currently selected statistics frequency range.
 * @returns {boolean} - Returns true if the statistics need to be updated, otherwise false.
 */

function needToUpdate(currentStats: StatisticsProps, newStats: StatisticsProps, rangeSelected: StatsFrequency) {
  return JSON.stringify(currentStats[rangeSelected]) !== JSON.stringify(newStats[rangeSelected])
}

/**
 * Mempool statistics component.
 */
const MempoolStats = () => {
  const { t } = useTranslation()
  const theme = useTheme()
  const upMd = useMediaQuery(theme.breakpoints.up('md'))

  const { data: statistics, loading } = useMempoolStore(state => state.statistics)
  const statisticsRef = useRef<StatisticsProps | undefined>(undefined)

  const [rangeSelected, setRangeSelected] = useState<StatsFrequency>(StatsFrequency.PREVIOUS_DAY)
  const [transactionTypes, setTransactionTypes] = useState<string[]>([])
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedRowIndex, setSelectedRowIndex] = useState<number>(0)

  /**
   * Handles changes in the transaction type selection from a dropdown.
   *
   * @param e - The event object from the input change.
   */
  const handleTxTypeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const type = ['all', 'Others', ''].includes(e.target.value) ? 'all' : e.target.value
      setSelectedType(type)
    },
    [setSelectedType]
  )

  /**
   * Sets the transaction type based on the chart segment clicked.
   *
   * @param type - The type of transaction from the chart segment.
   */
  const handleTypeChange = useCallback(
    (type: string) => {
      setSelectedType(['Others', '', 'all'].includes(type) ? 'all' : type)
    },
    [setSelectedType]
  )

  /**
   * Returns the loading status.
   */
  const getLoadingStatus = useCallback(() => {
    if (loading) {
      return LoadingStatus.Loading
    }
    return statisticsRef.current ? LoadingStatus.Success : LoadingStatus.Error
  }, [loading])

  /**
   * This function calculates the total number of transactions.
   * @function
   * @returns - Returns a number or undefined.
   */
  const getTotalOfTransactions = useCallback((): { filteredTotal: number; total: number } | undefined => {
    if (statistics) {
      if (!statistics[rangeSelected].tx_types) {
        return {
          filteredTotal: 0,
          total: 0,
        }
      }
      const filteredTotal = Object.entries(statistics[rangeSelected].tx_types).reduce((prev, [key, value]) => {
        if (selectedType === 'all' || key === `tx_type_${selectedType}`) {
          return prev + value.total
        }
        return prev
      }, 0)
      const total = Object.values(statistics[rangeSelected].tx_types).reduce((prev, current) => prev + current.total, 0)
      return {
        filteredTotal,
        total,
      }
    }
    return undefined
  }, [statistics, rangeSelected, selectedType])

  const [totalFilteredTransactions, setTotalFilteredTransactions] = useState<number | undefined>(getTotalOfTransactions()?.filteredTotal)
  const [totalTransactions, setTotalTransactions] = useState<number | undefined>(getTotalOfTransactions()?.total)
  const [chartData, setChartData] = useState<PieChartValueProps[] | undefined>(undefined)

  /**
   * @function updateTable
   * @description Updates the table with the current mempool transactions.
   */
  const updateStats = useCallback(() => {
    // Set the total number of transactions and the chart data
    const totals = getTotalOfTransactions()
    setTotalFilteredTransactions(totals?.filteredTotal)
    setTotalTransactions(totals?.total)

    // Set the selected row index
    if (selectedType && statistics?.[rangeSelected]?.stats_by_tx_type) {
      const statsByType = statistics?.[rangeSelected].stats_by_tx_type
      const index = Object.keys(statsByType).findIndex((type: string) => type === selectedType)
      setSelectedRowIndex(Math.max(0, index))
    }

    // Set the chart data
    if (statistics?.[rangeSelected].tx_types) {
      const currentData: PieChartValueProps[] = []
      const txTypes: string[] = []
      const others: PieChartValueProps = { name: 'Others', value: 0, tooltipLabel: [] }
      let lastItem: PieChartValueProps | undefined
      Object.entries(statistics?.[rangeSelected].tx_types)
        .filter(([_key, data]) => data.total !== 0)
        .forEach(([key, data]) => {
          if (totals && totals.total !== 0) {
            txTypes.push(key.replace('tx_type_', ''))
            if ((data.total * 100) / totals.total > 1) {
              currentData.push({
                name: key.replace('tx_type_', ''),
                value: data.total,
              })
            } else {
              if (key === `tx_type_${selectedType}`) {
                lastItem = {
                  name: key.replace('tx_type_', ''),
                  value: data.total,
                  visualValue: key === `tx_type_${selectedType}` ? Math.max(data.total, 0.006 * totals.total) : data.total,
                }
              } else {
                others.value += data.total
                others.tooltipLabel?.push(`${key.replace('tx_type_', '')} - ${data.total}`)
                others.visualValue = Math.max(data.total, 0.008 * totals.total)
              }
            }
          }
        })

      if (others.value !== 0) {
        currentData.push(others)
      }
      if (lastItem) {
        currentData.push(lastItem)
      }
      setChartData(currentData)
      setTransactionTypes(txTypes)
    } else {
      setChartData([])
    }
  }, [getTotalOfTransactions, rangeSelected, selectedType, statistics])

  useEffect(() => {
    if (!statisticsRef.current || !statistics || needToUpdate(statisticsRef.current, statistics, rangeSelected)) {
      statisticsRef.current = statistics
      updateStats()
    }
  }, [statistics, rangeSelected, updateStats])

  useEffect(() => {
    updateStats()
  }, [rangeSelected, selectedType, updateStats])

  /**
   * Returns a Grid component.
   */
  return (
    <Grid
      container
      spacing={{ xs: '0.5rem', md: '1rem' }}
      sx={{
        padding: { xs: '0.25rem 0.5rem 0 0.5rem', md: '0.25rem 0.5rem 2rem 0.5rem' },
      }}
    >
      {/* Switch or Button*/}
      <Grid container item xs={12} flexDirection={upMd ? 'row' : 'column'} justifyContent={upMd ? 'flex-end' : 'flex-start'} gap={'0.5rem'}>
        {upMd ? (
          <RangeSwitch rangeSelected={rangeSelected} setRangeSelected={setRangeSelected} />
        ) : (
          <Box sx={{ position: 'relative', width: '100%' }}>
            <RangeButton rangeSelected={rangeSelected} setRangeSelected={setRangeSelected} />
          </Box>
        )}
        {/* Transaction Type Selector */}
        <MethodSelector selectedType={selectedType} setSelectedType={handleTxTypeChange} transactionTypes={transactionTypes} />
      </Grid>
      <Grid container item xs={12} md={4} mt={{ xs: '1rem', md: 0 }}>
        {/* Type of Transactions */}
        <ItemTile
          title={t('Transaction Type Distribution')}
          tooltip={'Describes the distribution of different types of transactions.'}
          loading={getLoadingStatus()}
          size="medium"
          hasBorder
        >
          <TransctionsTypeChart
            selectedType={selectedType}
            totalTransactions={totalFilteredTransactions ?? totalTransactions}
            chartData={chartData}
            handleTransactionTypeChange={handleTypeChange}
          />
        </ItemTile>
      </Grid>
      <Grid item xs={12} md={8} mt={{ md: 0 }} id={'testt'}>
        <Grid
          container
          spacing={{ xs: '0.5rem', md: '1rem' }}
          height={{ xs: 'calc(100% + 0.5rem)', md: 'calc(100% + 1rem)' }}
          id={'testt2'}
        >
          {/* Gas Limit Bar */}
          <Grid item xs={12} md={6} lg={4} height={{ md: 'calc(100% / 3)', lg: 'calc(100% / 4)' }}>
            <ItemTile
              title={t('Gas Limit')}
              startIcon={selectedType !== 'all' ? <CircleFill color={txTypeColor(theme.palette.mode, selectedType)} /> : undefined}
              tooltip={
                'The Gas Limit is measured in units of gas and set by the message sender. It imposes a hard limit on the amount of gas (i.e., number of units of gas) that a message’s execution should be allowed to consume on chain.'
              }
              loading={getLoadingStatus()}
              size="medium"
              rightLabel={'attoFIL'}
              hasBorder
            >
              {statisticsRef.current?.[rangeSelected] ? (
                <StatsTile
                  data={{
                    items: [
                      {
                        label: 'Avg',
                        value:
                          selectedType === 'all'
                            ? statisticsRef.current[rangeSelected].avg_gas_limit
                            : statisticsRef.current[rangeSelected]?.stats_by_tx_type[selectedType]?.avg_gas_limit,
                      },
                    ],
                    min:
                      selectedType === 'all'
                        ? statisticsRef.current[rangeSelected].min_gas_limit
                        : statisticsRef.current[rangeSelected]?.stats_by_tx_type[selectedType]?.min_gas_limit,
                    max:
                      selectedType === 'all'
                        ? statisticsRef.current[rangeSelected].max_gas_limit
                        : statisticsRef.current[rangeSelected]?.stats_by_tx_type[selectedType]?.max_gas_limit,
                  }}
                />
              ) : null}
            </ItemTile>
          </Grid>
          {/* Gas Fee Cap Bar */}
          <Grid item xs={12} md={6} lg={4} height={{ md: 'calc(100% / 3)', lg: 'calc(100% / 4)' }}>
            <ItemTile
              title={t('Gas Fee Cap')}
              startIcon={selectedType !== 'all' ? <CircleFill color={txTypeColor(theme.palette.mode, selectedType)} /> : undefined}
              tooltip={
                'Gas Fee Cap is the maximum price that the message sender is willing to pay per unit of gas (measured in attoFIL/gas unit).'
              }
              loading={getLoadingStatus()}
              size="medium"
              rightLabel={'attoFIL'}
              hasBorder
            >
              {statisticsRef.current?.[rangeSelected] ? (
                <StatsTile
                  data={{
                    items: [
                      {
                        label: 'Avg',
                        value:
                          selectedType === 'all'
                            ? statisticsRef.current[rangeSelected].avg_fee_cap
                            : statisticsRef.current[rangeSelected]?.stats_by_tx_type[selectedType]?.avg_fee_cap,
                      },
                    ],
                    min:
                      selectedType === 'all'
                        ? statisticsRef.current[rangeSelected].min_fee_cap
                        : statisticsRef.current[rangeSelected]?.stats_by_tx_type[selectedType]?.min_fee_cap,
                    max:
                      selectedType === 'all'
                        ? statisticsRef.current[rangeSelected].max_fee_cap
                        : statisticsRef.current[rangeSelected]?.stats_by_tx_type[selectedType]?.max_fee_cap,
                  }}
                />
              ) : null}
            </ItemTile>
          </Grid>
          {/* Global Base Fee */}
          <Grid item xs={12} md={6} lg={4} height={{ md: 'calc(100% / 3)', lg: 'calc(100% / 4)' }}>
            <GlobalBaseFee rangeSelected={rangeSelected} />
          </Grid>
          {/* Gas Fee Premium Bar */}
          <Grid item xs={12} md={6} lg={4} height={{ md: 'calc(100% / 3)', lg: 'calc(100% / 4)' }}>
            <ItemTile
              title={t('Gas Fee Premium')}
              startIcon={selectedType !== 'all' ? <CircleFill color={txTypeColor(theme.palette.mode, selectedType)} /> : undefined}
              tooltip={
                'Gas Fee Premium is the price per unit of gas (measured in attoFIL/gas) that the message sender is willing to pay (on top of the BaseFee) to “tip” the miner that will include this message in a block.'
              }
              loading={getLoadingStatus()}
              size="medium"
              rightLabel={'attoFIL'}
              hasBorder
            >
              {statisticsRef.current?.[rangeSelected] ? (
                <StatsTile
                  data={{
                    items: [
                      {
                        label: 'Avg',
                        value:
                          selectedType === 'all'
                            ? statisticsRef.current[rangeSelected].avg_fee_premium
                            : statisticsRef.current[rangeSelected]?.stats_by_tx_type[selectedType]?.avg_fee_premium,
                      },
                    ],
                    min:
                      selectedType === 'all'
                        ? statisticsRef.current[rangeSelected].min_fee_premium
                        : statisticsRef.current[rangeSelected]?.stats_by_tx_type[selectedType]?.min_fee_premium,
                    max:
                      selectedType === 'all'
                        ? statisticsRef.current[rangeSelected].max_fee_premium
                        : statisticsRef.current[rangeSelected]?.stats_by_tx_type[selectedType]?.max_fee_premium,
                  }}
                />
              ) : null}
            </ItemTile>
          </Grid>
          {/* Confirmation Time Bar */}
          <Grid item xs={12} md={6} lg={4} height={{ md: 'calc(100% / 3)', lg: 'calc(100% / 4)' }}>
            <ItemTile
              title={t('Confirmation Time')}
              startIcon={selectedType !== 'all' ? <CircleFill color={txTypeColor(theme.palette.mode, selectedType)} /> : undefined}
              tooltip={
                'The confirmation time refers to the time it takes for a transaction to be included in a block and added to the blockchain.'
              }
              loading={getLoadingStatus()}
              size="medium"
              rightLabel={'seconds'}
              hasBorder
            >
              {statisticsRef.current?.[rangeSelected] ? (
                <StatsTile
                  data={{
                    items: [
                      {
                        label: 'Avg',
                        value:
                          selectedType === 'all'
                            ? statisticsRef.current[rangeSelected].avg_confirmation_time
                            : statisticsRef.current[rangeSelected]?.stats_by_tx_type[selectedType]?.avg_confirmation_time,
                      },
                    ],
                    min:
                      selectedType === 'all'
                        ? statisticsRef.current[rangeSelected].min_confirmation_time
                        : statisticsRef.current[rangeSelected]?.stats_by_tx_type[selectedType]?.min_confirmation_time,
                    max:
                      selectedType === 'all'
                        ? statisticsRef.current[rangeSelected].max_confirmation_time
                        : statisticsRef.current[rangeSelected]?.stats_by_tx_type[selectedType]?.max_confirmation_time,
                  }}
                />
              ) : null}
            </ItemTile>
          </Grid>
          <Grid item xs={12} md={6} lg={4} height={{ md: 'calc(100% / 3)', lg: 'calc(100% / 4)' }}>
            <GlobalBaseFeeVariations rangeSelected={rangeSelected} />
          </Grid>
          <Grid container item xs={12} height={{ xs: '20rem', lg: '22.5rem' }} display={{ xs: 'none', lg: 'flex' }}>
            <MempoolTable
              statistics={statisticsRef.current?.[rangeSelected].stats_by_tx_type}
              getLoadingStatus={getLoadingStatus}
              selectedRowIndex={selectedRowIndex}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid container item xs={12} height={{ xs: '40rem', md: '30rem' }} display={{ lg: 'none' }} pb={{ xs: '2rem', xl: 0 }}>
        <MempoolTable
          statistics={statisticsRef.current?.[rangeSelected].stats_by_tx_type}
          getLoadingStatus={getLoadingStatus}
          selectedRowIndex={selectedRowIndex}
        />
      </Grid>
    </Grid>
  )
}

export default MempoolStats
