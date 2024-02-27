/**
 * Imports necessary dependencies.
 */
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { StatsFrequency, useMempoolStore } from '@/store/data/mempool'
import { Box, Grid, Typography } from '@mui/material'

import PieChart, { PieChartValueProps } from 'components/common/Charts/PieChart'

/**
 * TransctionsTypeChart statistics component.
 */
const TransctionsTypeChart = ({ rangeSelected }: { rangeSelected: StatsFrequency }) => {
  const { t } = useTranslation()

  const { data: statistics } = useMempoolStore.getState().statistics

  /**
   * This function calculates the total number of transactions.
   * @function
   * @returns - Returns a number or undefined.
   */
  const getTotalOfTransactions = useCallback((): number | undefined => {
    if (statistics) {
      if (!statistics[rangeSelected].tx_types) {
        return 0
      }
      return Object.values(statistics[rangeSelected].tx_types).reduce((prev, current) => prev + current.total, 0)
    }
    return undefined
  }, [statistics, rangeSelected])

  const [totalOfTransactions, setTotalOfTransactions] = useState<number | undefined>(getTotalOfTransactions())
  const [chartData, setChartData] = useState<PieChartValueProps[] | undefined>(undefined)

  /**
   * Set the total number of transactions and the chart data
   */
  useEffect(() => {
    const currentTotal = getTotalOfTransactions()
    setTotalOfTransactions(currentTotal)

    if (statistics?.[rangeSelected].tx_types) {
      const currentData: PieChartValueProps[] = []
      const others: PieChartValueProps = { name: 'Others', value: 0, tooltipLabel: [] }
      Object.entries(statistics[rangeSelected].tx_types)
        .filter(([_key, data]) => data.total !== 0)
        .forEach(([key, data]) => {
          if (currentTotal && currentTotal !== 0) {
            if ((data.total * 100) / currentTotal > 1) {
              currentData.push({
                name: key.replace('tx_type_', ''),
                value: data.total,
              })
            } else {
              others.value += data.total
              others.tooltipLabel?.push(key.replace('tx_type_', ''))
            }
          }
        })

      if (others.value !== 0) {
        currentData.push(others)
      }
      setChartData(currentData)
    } else {
      setChartData([])
    }
  }, [rangeSelected, statistics, getTotalOfTransactions])

  /**
   * Returns a Grid component.
   */
  return (
    <Grid container flexDirection={'column'} justifyContent={'center'} gap={3} pb={6}>
      {/* Total of Transactions */}
      <Box display={'flex'} flexDirection={'column'} width={'fit-content'} textAlign={'center'} p={'0.5rem 0'}>
        <Typography variant="h2" data-testid={'item-tile-heading'}>
          {totalOfTransactions}
        </Typography>
        <Typography variant="body2" data-testid={'item-tile-heading'}>
          {t('Transactions')}
        </Typography>
      </Box>
      {/* Chart */}
      {chartData ? (
        <Grid container height={{ xs: '11rem', md: '19rem' }} pt={'2rem'}>
          <PieChart data={chartData} />
        </Grid>
      ) : null}
    </Grid>
  )
}

export default TransctionsTypeChart
