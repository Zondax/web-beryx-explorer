/**
 * @module RpcView
 * @description This module exports a function component `RpcView`.
 * The component uses material-ui's `Paper` and `useTheme` to create a thematic and structured UI section.
 */
// import necessary dependencies
import { Grid, Paper } from '@mui/material'

import RpcNode from '../../widgets/Resources/RpcNode'

// Import the custom RpcNode component

/**
 * RpcView function component
 * @function RpcView
 * @description A React functional component that renders a UI section using the Paper component from @mui/material library.
 * The Paper component uses a theme created using `useTheme`.
 * It takes no parameters
 * @returns JSX.Element Returns a structured and themed Paper component which embeds the RpcNode component.
 */
const RpcView = () => {
  // Return the Paper component styled according to a theme and embedding the RpcNode component.
  return (
    <Grid
      container
      direction="column"
      sx={{ width: '100%', height: { xs: '80vh', md: 'fit-content' }, display: 'flex', alignItems: 'center', padding: '0 1rem' }}
    >
      <Paper
        sx={{
          maxWidth: '70rem',
          padding: '5rem auto 0 auto',
          background: 'transparent',
        }}
      >
        <RpcNode />
      </Paper>
    </Grid>
  )
}

// Make this component available for import
export default RpcView
