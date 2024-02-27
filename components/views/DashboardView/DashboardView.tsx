import { Grid } from '@mui/material'

import { Contracts, General } from './sections'

/**
 * DashboardView component - Renders the Contracts and General components
 * within a Material UI Grid.
 * @function DashboardView
 * @returns  A Material UI Grid containing General and Contracts components.
 * @example
 * import DashboardView from './DashboardView';
 * <DashboardView />
 */
const DashboardView = () => {
  return (
    <Grid
      container
      gap={'2rem'}
      alignItems="center"
      sx={{
        zIndex: 1,
        padding: { md: '3rem 2rem' },
        alignItems: 'flex-start',
      }}
    >
      <General />
      <Contracts />
    </Grid>
  )
}
export default DashboardView
