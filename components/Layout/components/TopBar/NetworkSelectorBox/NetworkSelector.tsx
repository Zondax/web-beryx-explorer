import { useRouter } from 'next/router'
import { ChangeEvent, useCallback, useMemo } from 'react'

import { NetworkFindByUniqueId, NetworkType, NetworkUniqueId, Networks } from '@/config/networks'
import { useAppSettingsStore } from '@/store/ui/settings'
import { ExpandMore } from '@mui/icons-material'
import { Box, MenuItem, TextField, Typography, useTheme } from '@mui/material'
import { addBreadcrumb, captureMessage } from '@sentry/nextjs'
import * as Sentry from '@sentry/react'

/**
 * Object to map hover colors
 */
const hoverColors: {
  [key: string]: {
    [key: string]: string
  }
} = {
  light: {
    'fil/mainnet': 'linear-gradient(90deg, #372A8F77 -103.5%, #0090FF77 88.29%, #46AFFF77 117%)',
    'fil/calibration': 'linear-gradient(90deg, #372A8F77 -16%, #8437A677 5.16%, #D37A6477 117%)',
  },
  dark: {
    'fil/mainnet': 'linear-gradient(90deg, #372A8F -103.5%, #0090FF 88.29%, #46AFFF 117%)',
    'fil/calibration': 'linear-gradient(90deg, #372A8F -16%, #8437A6 5.16%, #D37A64 117%)',
  },
}

/**
 * SelectNetwork component
 */
const NetworkSelector = () => {
  /**
   * Declare the hooks
   */
  const router = useRouter()
  const { network, setNetwork } = useAppSettingsStore(state => ({ network: state.network, setNetwork: state.setNetwork }))
  const theme = useTheme()
  const allNetworks = Object.values(Networks).filter((network: NetworkType) => network.show)

  const availableNetworks = useMemo(() => {
    const allNetworks = Object.values(Networks).filter((network: NetworkType) => network.show)

    if (router && router.route === '/faucet') {
      return [Networks.calibration]
    }

    return allNetworks
  }, [router])

  const handleNetworkChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const networkUniqueId = event.target.value as NetworkUniqueId

      const network = NetworkFindByUniqueId(networkUniqueId)
      if (!network) {
        captureMessage(`Network with name ${networkUniqueId} not found, falling back to mainnet`, 'warning')
        return
      }

      addBreadcrumb({
        category: 'action',
        message: `Network changed to ${networkUniqueId}`,
        level: 'info',
      })

      setNetwork(network)

      if (router.route.indexOf('/v1/search/') > -1) {
        router.push('/')
      }
    },
    [router, setNetwork]
  )

  const testTag = useMemo(
    () => (
      <Box
        bgcolor="background.level2"
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: '1.5rem',
          padding: '0rem 0.5rem',
          borderRadius: '4px',
        }}
      >
        <Typography variant="caption" fontSize={'0.85rem'}>
          testnet
        </Typography>
      </Box>
    ),
    []
  )

  const generateNetworkItems = useMemo(() => {
    return allNetworks.map(item => {
      const disabled = !availableNetworks?.includes(item)

      const dataTestid = `select-network-topbar-${item.uniqueId}`
      const itemText = item.name.charAt(0).toUpperCase() + item.name.slice(1)

      Sentry.addBreadcrumb({
        category: 'render',
        message: `Network Option | ${dataTestid} | ${itemText} | ${disabled ? 'disabled' : 'enabled'}`,
        level: 'info',
      })

      return (
        <MenuItem
          key={`network filecoin ${dataTestid}`}
          value={item.uniqueId}
          disabled={disabled}
          sx={{
            color: theme.palette.text.primary,
            '&.Mui-selected': { background: hoverColors[theme.palette.mode][item.uniqueId] },
          }}
          data-testid={dataTestid}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            {itemText}
            {item.isTestnet ? testTag : null}
          </Box>
        </MenuItem>
      )
    })
  }, [availableNetworks, allNetworks, theme.palette.mode, testTag, theme.palette.text.primary])

  return (
    <Box display="flex" alignItems="center" gap={4}>
      <Box display="flex" alignItems="center" border={`1px solid ${theme.palette.tableBorder}`} borderRadius={'calc(0.5rem - 2px)'}>
        <TextField
          id={'select-network-topbar'}
          select
          SelectProps={{ IconComponent: ExpandMore, MenuProps: { disableScrollLock: true } }}
          size="small"
          color="level0"
          name="select-network"
          fullWidth
          value={network.uniqueId}
          onChange={handleNetworkChange}
          sx={{
            minWidth: 'max-content',
          }}
          data-testid="select-network-topbar"
        >
          {generateNetworkItems}
        </TextField>
      </Box>
    </Box>
  )
}

/**
 * Export the SelectNetwork component
 */
export default NetworkSelector
