import { Grid, Typography } from '@mui/material'

interface BarTileProps {
  data: { max: number; min: number; items: { label: React.ReactNode; value: number; color?: string }[] }
}

/**
 * Label of each item
 */
const ItemLabel = ({ label, value }: { label: React.ReactNode; value: number }) => (
  <Grid container gap={'0.5rem'} data-testid={`${label}-label`} justifyContent={'space-between'}>
    <Typography variant="body2" data-testid={'max-label'}>
      {label}
    </Typography>
    <Typography variant="body2" color={'text.primary'} data-testid={'max-label'}>
      {value.toFixed(2)}
    </Typography>
  </Grid>
)

/**
 * Component to display the stats
 */
const StatsTile = ({ data }: BarTileProps) => {
  return (
    <Grid container flexDirection={'column'} justifyContent={'center'} height={'100%'} gap={'0.75rem'}>
      <ItemLabel label="Max" value={data.max} />
      {data.items
        ?.sort((a, b) => a.value + b.value)
        .map(({ label, value }) => <ItemLabel label={label} value={value} key={`${label}-${value}`} />)}
      <ItemLabel label="Min" value={data.min} />
    </Grid>
  )
}

export default StatsTile
