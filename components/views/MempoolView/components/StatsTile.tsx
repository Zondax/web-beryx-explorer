import BigNumber from 'bignumber.js'

import { amountFormat } from '@/config/config'
import { Grid, Typography } from '@mui/material'

interface BarTileProps {
  data: { max?: number | null; min?: number | null; items: { label: React.ReactNode; value: number; color?: string }[] }
}

/**
 * Label of each item
 */
const ItemLabel = ({ label, value }: { label: React.ReactNode; value: number | string }) => (
  <Grid container gap={'0.5rem'} data-testid={`${label}-label`} justifyContent={'space-between'}>
    <Typography variant="body2" data-testid={'max-label'}>
      {label}
    </Typography>
    <Typography variant="body2" color={'text.primary'} data-testid={'max-label'}>
      {typeof value === 'number' ? BigNumber(value).toFormat(2, amountFormat) : value}
    </Typography>
  </Grid>
)

/**
 * Component to display the stats
 */
const StatsTile = ({ data }: BarTileProps) => {
  return (
    <Grid container flexDirection={'column'} justifyContent={'center'} height={'100%'} gap={{ xs: '0.75rem' }}>
      <ItemLabel label="Max" value={data.max === null || data.max === undefined ? '-' : data.max} />
      {data.items
        ?.sort((a, b) => a.value + b.value)
        .map(({ label, value }) => (
          <ItemLabel label={label} value={value === null || value === undefined ? '-' : value} key={`${label}-${value}`} />
        ))}
      <ItemLabel label="Min" value={data.min === null || data.min === undefined ? '-' : data.min} />
    </Grid>
  )
}

export default StatsTile
