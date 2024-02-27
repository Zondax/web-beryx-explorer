import { CheckmarkFilled, ErrorFilled } from '@carbon/icons-react'
import { Box, CircularProgress, useTheme } from '@mui/material'

/**
 * Interface for ConnectionStatusProps
 */
interface ConnectionStatusProps {
  /** Status of the connection. Can be 'fulfilled', 'pending', or 'failed' */
  status?: 'fulfilled' | 'pending' | 'failed'
}

/**
 * StatusIcon component.
 *
 * @param status - The status of the connection.
 * @returns The rendered StatusIcon component.
 */
const StatusIcon = ({ status }: ConnectionStatusProps) => {
  const theme = useTheme()

  switch (status) {
    case 'fulfilled':
      return <CheckmarkFilled style={{ width: '1rem', color: theme.palette.success.main }} />
    case 'pending':
      return <CircularProgress variant="indeterminate" size="small" color="secondary" thickness={8} />
    case 'failed':
      return <ErrorFilled style={{ width: '1rem', color: theme.palette.error.main }} />
    default:
      return null
  }
}

/**
 * ConnectionStatus component.
 *
 * @param status - The status of the connection.
 * @returns The rendered ConnectionStatus component.
 */
const ConnectionStatus = ({ status }: ConnectionStatusProps) => {
  useTheme()
  return (
    <Box sx={{ width: '1rem', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <StatusIcon status={status} />
    </Box>
  )
}

export default ConnectionStatus
