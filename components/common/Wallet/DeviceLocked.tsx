import { useCallback } from 'react'

import { useLedgerWalletStore } from '@/store/wallets/ledger'
import { Locked } from '@carbon/icons-react'
import { Box, Button, Typography } from '@mui/material'

/**
 * `BeryxLinkAddresses` is a React component that displays a list of 3 BeryxLink addresses.
 *
 * @returns the `BeryxLinkAddresses` component
 */
const DeciveLocked = () => {
  const { getConnection } = useLedgerWalletStore(s => s)

  const handleRetry = useCallback(async () => {
    await getConnection()
  }, [getConnection])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.5rem',
        width: '100%',
        padding: '2rem 1rem 3rem 1rem',
        maxHeight: 'calc(100dvh - 20rem)',
      }}
    >
      <Locked size={32} />
      <Typography variant="h3" component={'h2'} mt={1}>
        Device locked
      </Typography>
      <Typography variant="body1" component={'h2'} mb={3}>
        Unlock your device to continue
      </Typography>
      <Button variant={'contained'} color={'primary'} onClick={handleRetry}>
        Retry
      </Button>
    </Box>
  )
}

export default DeciveLocked
