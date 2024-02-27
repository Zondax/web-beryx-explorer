/**
 * Module dependencies.
 */
import { Grid, Typography } from '@mui/material'

import GasConsumption from './GasConsumption'
import GasUsed from './GasUsed'

/**
 * The General component which displays the General section of the dashboard.
 * @component
 * @example
 * return (
 *    <General />
 * )
 */
const General = () => {
  return (
    <>
      <Typography variant={'h4'}>General</Typography>
      <Grid container spacing={'1rem'} pb={'2rem'}>
        <GasUsed />
        <GasConsumption />
      </Grid>
    </>
  )
}

export default General
