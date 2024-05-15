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
        height: { xs: 'fit-content', md: 'calc(100dvh - 6rem - 1.75rem)' },
        zIndex: 1,
        padding: { xs: '0.5rem', md: '3rem 1rem' },
        alignItems: 'flex-start',
      }}
    >
      <General />
      <Contracts />
    </Grid>
  )
}
export default DashboardView
