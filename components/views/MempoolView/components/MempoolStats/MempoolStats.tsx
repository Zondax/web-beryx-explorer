/**
 * Imports necessary dependencies.
 */
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { LoadingStatus } from '@/config/config'
import { StatsFrequency, useMempoolStore } from '@/store/data/mempool'
import { Box, Grid, useMediaQuery, useTheme } from '@mui/material'

import StatsTile from 'components/views/MempoolView/components/StatsTile'
import { ItemTile } from 'components/widgets/Charts'

import GlobalBaseFee from './GlobalBaseFee'
import RangeButton from './RangeButton'
import RangeSwitch from './RangeSwitch'
import TransctionsTypeChart from './TransctionsTypeChart'

/**
 * Mempool statistics component.
 */
const MempoolStats = () => {
  const { t } = useTranslation()
  const upMd = useMediaQuery(useTheme().breakpoints.up('md'))

  const { data: statistics, loading } = useMempoolStore.getState().statistics

  const [rangeSelected, setRangeSelected] = useState<StatsFrequency>('previous_day')

  /**
   * Returns the loading status.
   */
  const getLoadingStatus = useCallback(() => {
    if (loading) {
      return LoadingStatus.Loading
    }

    return statistics ? LoadingStatus.Success : LoadingStatus.Error
  }, [statistics, loading])

  /**
   * Returns a Grid component.
   */
  return (
    <Grid
      container
      spacing={{ xs: '0.5rem', md: '1rem' }}
      sx={{
        padding: { md: '0.25rem 0.5rem' },
      }}
    >
      {/* Switch or Button*/}
      <Grid container item xs={12} justifyContent={'flex-end'}>
        {upMd ? (
          <RangeSwitch rangeSelected={rangeSelected} setRangeSelected={setRangeSelected} />
        ) : (
          <Box sx={{ position: 'relative', width: '100%' }}>
            <RangeButton rangeSelected={rangeSelected} setRangeSelected={setRangeSelected} />
          </Box>
        )}
      </Grid>
      <Grid container item xs={12} md={4} mt={{ xs: '3.6rem', md: 0 }}>
        {/* Type of Transactions */}
        <ItemTile
          title={t('Transactions Type')}
          tooltip={'Classification of transactions based on their type.'}
          loading={getLoadingStatus()}
          size="medium"
          hasBorder
        >
          <TransctionsTypeChart rangeSelected={rangeSelected} />
        </ItemTile>
      </Grid>
      <Grid container item xs={12} md={4} flexDirection={'column'} rowSpacing={{ xs: '0.5rem', md: '1rem' }}>
        {/* Gas Limit Bar */}
        <Grid item height={'calc(100% / 3)'}>
          <ItemTile
            title={t('Gas Limit')}
            tooltip={
              'The Gas Limit is measured in units of gas and set by the message sender. It imposes a hard limit on the amount of gas (i.e., number of units of gas) that a message’s execution should be allowed to consume on chain.'
            }
            loading={getLoadingStatus()}
            size="medium"
            rightLabel={'attoFIL'}
            hasBorder
          >
            {statistics?.[rangeSelected] ? (
              <StatsTile
                data={{
                  items: [
                    {
                      label: 'Avg',
                      value: statistics[rangeSelected].avg_gas_limit,
                    },
                  ],
                  min: statistics[rangeSelected].min_gas_limit,
                  max: statistics[rangeSelected].max_gas_limit,
                }}
              />
            ) : null}
          </ItemTile>
        </Grid>
        {/* Gas Fee Cap Bar */}
        <Grid item height={'calc(100% / 3)'}>
          <ItemTile
            title={t('Gas Fee Cap')}
            tooltip={
              'Gas Fee Cap is the maximum price that the message sender is willing to pay per unit of gas (measured in attoFIL/gas unit).'
            }
            loading={getLoadingStatus()}
            size="medium"
            rightLabel={'attoFIL'}
            hasBorder
          >
            {statistics?.[rangeSelected] ? (
              <StatsTile
                data={{
                  items: [
                    {
                      label: 'Avg',
                      value: statistics[rangeSelected].avg_fee_cap,
                    },
                  ],
                  min: statistics[rangeSelected].min_fee_cap,
                  max: statistics[rangeSelected].max_fee_cap,
                }}
              />
            ) : null}
          </ItemTile>
        </Grid>
        {/* Global Base Fee */}
        <Grid item height={'calc(100% / 3)'}>
          <GlobalBaseFee rangeSelected={rangeSelected} />
        </Grid>
      </Grid>
      <Grid container item xs={12} md={4} flexDirection={'column'} rowSpacing={{ xs: '0.5rem', md: '1rem' }}>
        {/* Gas Fee Premium Bar */}
        <Grid item height={'calc(100% / 3)'}>
          <ItemTile
            title={t('Gas Fee Premium')}
            tooltip={
              'Gas Fee Premium is the price per unit of gas (measured in attoFIL/gas) that the message sender is willing to pay (on top of the BaseFee) to “tip” the miner that will include this message in a block.'
            }
            loading={getLoadingStatus()}
            size="medium"
            rightLabel={'attoFIL'}
            hasBorder
          >
            {statistics?.[rangeSelected] ? (
              <StatsTile
                data={{
                  items: [
                    {
                      label: 'Avg',
                      value: statistics[rangeSelected].avg_fee_premium,
                    },
                  ],
                  min: statistics[rangeSelected].min_fee_premium,
                  max: statistics[rangeSelected].max_fee_premium,
                }}
              />
            ) : null}
          </ItemTile>
        </Grid>
        {/* Confirmation Time Bar */}
        <Grid item height={'calc(100% / 3)'}>
          <ItemTile
            title={t('Confirmation Time')}
            tooltip={
              'The confirmation time refers to the time it takes for a transaction to be included in a block and added to the blockchain.'
            }
            loading={getLoadingStatus()}
            size="medium"
            rightLabel={'seconds'}
            hasBorder
          >
            {statistics?.[rangeSelected] ? (
              <StatsTile
                data={{
                  items: [
                    {
                      label: 'Avg',
                      value: statistics[rangeSelected].avg_confirmation_time,
                    },
                  ],
                  min: statistics[rangeSelected].min_confirmation_time,
                  max: statistics[rangeSelected].max_confirmation_time,
                }}
              />
            ) : null}
          </ItemTile>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default MempoolStats
