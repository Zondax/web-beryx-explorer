import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import useAppSettingsStore from '@/store/ui/settings'
import { copyContent } from '@/utils/text'
import { Copy } from '@carbon/icons-react'
import { Box, Grid, IconButton, Typography } from '@mui/material'
import { captureException } from '@sentry/nextjs'

/**
 * RpcNode is a React Component which displays the RPC node information and provides a functionality to copy the RPC node URL.
 * It uses the Material-UI library for the UI components and @sentry/nextjs for error tracking.
 *
 * @returns The RpcNode Component.
 */
const RpcNode = () => {
  const { t } = useTranslation()

  /**
   * Get 'network' state from the store
   */
  const { network } = useAppSettingsStore(state => ({ network: state.network }))

  /**
   * This async function is used to handle the click event.
   * It uses the copyContent function from '@/utils/text' to copy the RPC URL and throws an error which is then
   * captured by @sentry/nextjs for tracking.
   */
  const handleOnClick = useCallback(async () => {
    try {
      await copyContent(network.rpcNode ?? '')
    } catch (err) {
      captureException(err)
      throw err
    }
  }, [network])

  return (
    <Box
      sx={{
        padding: '4rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        width: '100%',
      }}
    >
      <Grid container direction={'column'} alignItems={'center'} justifyContent="center" display={'flex'} marginBottom={'3rem'}>
        <Typography variant="h3" component={'h2'} textAlign={'center'} marginBottom={1} textTransform={'capitalize'}>
          {t(`${network.name} Public RPC Node`)}
        </Typography>
        <Typography variant="body1" component={'p'} textAlign={'center'} maxWidth={'30rem'}>
          {t('If your project requires data retrieval, you can refer to our publicly available hosted endpoint of Lotus.')}
        </Typography>
      </Grid>
      <Box
        sx={{
          padding: '0.25rem 0.5rem 0.25rem 1.75rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          maxWidth: { xs: '20rem', md: 'fit-content' },
          backgroundColor: 'background.level2',
          borderRadius: '8px',
          height: '3.25rem',
        }}
      >
        <pre style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
          <code className={'language'}>{network.rpcNode ?? ''}</code>
        </pre>
        <IconButton color="info" onClick={handleOnClick}>
          <Copy />
        </IconButton>
      </Box>
    </Box>
  )
}

export default RpcNode
