/**
 * Imports necessary dependencies.
 */
import { useTranslation } from 'react-i18next'

import { Box, Grid, Skeleton, Typography, useTheme } from '@mui/material'

import PieChart, { PieChartValueProps } from 'components/common/Charts/PieChart'

/**
 * TransctionsTypeChart statistics component.
 */
const TransctionsTypeChart = ({
  selectedType,
  totalTransactions,
  chartData,
  handleTransactionTypeChange,
}: {
  selectedType: string
  totalTransactions?: number
  chartData: PieChartValueProps[] | undefined
  handleTransactionTypeChange: (type: string) => void
}) => {
  const { t } = useTranslation()
  const theme = useTheme()

  /**
   * Handles click events on the chart, setting the transaction type based on the chart segment clicked.
   *
   * @param params - The parameters object containing data about the chart segment clicked.
   */
  const handleChartClick = (params: any) => {
    let type = params.data.name
    if (params.data.name === 'Others' || params.data.name === '') {
      type = 'all'
    }
    handleTransactionTypeChange(type)
  }

  const selectedTypeToShow = selectedType === 'all' ? undefined : selectedType

  /**
   * Returns a Grid component.
   */
  return (
    <Grid
      container
      flexDirection={'column'}
      justifyContent={{ xs: 'center', lg: 'flex-start' }}
      gap={{ xs: 2, md: 0, lg: 2.5, xl: 6 }}
      pt={{ xl: 3 }}
      height={'100%'}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '2.5rem' }}>
        {/* Total of Transactions */}
        {totalTransactions !== undefined ? (
          <Box
            display={'flex'}
            flexDirection={'column'}
            width={'fit-content'}
            textAlign={'left'}
            p={'0.5rem 0'}
            sx={{ position: 'relative' }}
          >
            <Typography variant="h2" data-testid={'item-tile-heading'}>
              {totalTransactions}
            </Typography>
            <Typography
              variant="body2"
              data-testid={'item-tile-heading'}
              sx={{ position: 'absolute', top: '100%', left: '0', minWidth: '12rem' }}
            >
              {`${t('Transaction count')} (${selectedType})`}
            </Typography>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Skeleton variant="rectangular" width={180} height={32} />
            <Skeleton variant="rectangular" width={180} height={18} />
          </Box>
        )}
      </Box>

      {/* Chart */}
      {chartData ? (
        <Grid container height={{ xs: '16rem', md: '25rem' }}>
          <PieChart data={chartData} highLightedData={selectedTypeToShow} onChartClick={handleChartClick} />
        </Grid>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box
            sx={{
              width: '16rem',
              height: '16rem',
              borderRadius: '50%',
              border: '44px solid',
              borderColor: theme.palette.background.level2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h6" color="text.secondary">
              No Data Available
            </Typography>
          </Box>
        </Box>
      )}
    </Grid>
  )
}

export default TransctionsTypeChart
