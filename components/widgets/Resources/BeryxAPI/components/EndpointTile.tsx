import { ArrowUpRight } from '@carbon/icons-react'
import { Box, Paper, Typography, useTheme } from '@mui/material'

/**
 * @param  {string} method - The HTTP method of the endpoint (eg. GET, POST).
 * @param  {string} endpoint - The API endpoint.
 * @param  {string} link -The URL of the API endpoint.
 * @returns The EndpointTile component that represents an API endpoint.
 */
const EndpointTile = ({ method, endpoint, link }: { method: string; endpoint: string; link: string }) => {
  const theme = useTheme()

  /**
   * @param  {string} method - The HTTP method.
   * @returns The color string associated with the HTTP method.
   */
  const methodColor = (method: string) => {
    switch (method) {
      case 'GET':
        return '#6878f0'
      case 'POST':
        return '#f29243'
      default:
        return 'white'
    }
  }

  /**
   * @returns The Typography component styled based on the HTTP method type.
   */
  const MethodTypography = () => (
    <Typography variant="caption" color={methodColor(method)} fontFamily={'B612 Mono'}>
      {method}
    </Typography>
  )

  /**
   * @returns The Typography component displaying the endpoint URL.
   */
  const EndpointTypography = () => (
    <Typography
      variant="body1"
      component="p"
      color={'text.primary'}
      fontFamily={'B612 Mono'}
      sx={{
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: '1',
        lineClamp: '1',
        WebkitBoxOrient: 'vertical',
        flex: '1 1 auto',
      }}
    >
      {endpoint}
    </Typography>
  )

  return (
    <a href={link} target="_blank" rel="noreferrer">
      <Paper
        variant={'elevation'}
        elevation={0}
        sx={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: { xs: '1rem 1.5rem', md: '0.75rem 1rem' },
          ':hover': { backgroundColor: theme.palette.background.level2 },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: '0.5rem',
            alignItems: 'center',
            maxWidth: 'calc(100% - 2.5rem)',
          }}
        >
          <Box minWidth={'2.5rem'}>
            <MethodTypography />
          </Box>
          <EndpointTypography />
        </Box>
        <Box sx={{ flexShrink: 0 }}>
          <ArrowUpRight />
        </Box>
      </Paper>
    </a>
  )
}

export default EndpointTile
