import { Box } from '@mui/material'

import NetworkSelector from './NetworkSelector'

/**
 * @function Network
 * @description TopBar component
 * @param props - page title to be displayed
 * @returns - Rendered TopBar component
 */
const Network = () => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
    }}
  >
    <NetworkSelector />
  </Box>
)

export default Network
