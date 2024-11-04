import { useRouter } from 'next/router'
import { useCallback, useMemo, useState } from 'react'

import { NetworkFindByUniqueId, NetworkType, NetworkUniqueId, Networks } from '@/config/networks'
import useAppSettingsStore from '@/store/ui/settings'
import useWalletStore from '@/store/wallets/wallet'
import { ChevronDown, ChevronUp } from '@carbon/icons-react'
import { Box, Button, Menu, MenuItem, Typography, useMediaQuery, useTheme } from '@mui/material'
import { addBreadcrumb, captureMessage } from '@sentry/nextjs'
import * as Sentry from '@sentry/react'

import FilecoinIcon from 'components/common/Icons/Filecoin'

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

interface NetworkSelectorProps {
  buttonSize?: 'small' | 'medium' | 'large'
}

/**
 * SelectNetwork component
 */
const NetworkSelector: React.FC<NetworkSelectorProps> = ({ buttonSize = 'medium' }) => {
  const router = useRouter()
  const { network, setNetwork } = useAppSettingsStore(state => ({ network: state.network, setNetwork: state.setNetwork }))
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
  const allNetworks = Object.values(Networks).filter((network: NetworkType) => network.show)
  const [anchorElMenu, setAnchorElMenu] = useState<null | HTMLElement>(null)
  const dataTestid = 'select-network-topbar'
  const openMenu = Boolean(anchorElMenu)
  const { switchChain } = useWalletStore(s => s)

  const handleClickMenu = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElMenu(event.currentTarget)
    },
    [setAnchorElMenu]
  )

  const handleCloseMenu = useCallback(() => {
    setAnchorElMenu(null)
  }, [setAnchorElMenu])

  const availableNetworks = useMemo(() => {
    const allNetworks = Object.values(Networks).filter((network: NetworkType) => network.show)

    if (router && router.route === '/faucet') {
      return [Networks.calibration]
    }

    return allNetworks
  }, [router])

  const handleNetworkChange = useCallback(
    (networkUniqueId: NetworkUniqueId) => {
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
      switchChain(network)

      if (router.route.indexOf('/fil/') > -1) {
        router.push('/')
      }
      handleCloseMenu()
    },
    [router, setNetwork, switchChain, handleCloseMenu]
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
        <Typography variant="caption" fontSize={'0.85rem'} fontWeight={500}>
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
          onClick={() => handleNetworkChange(item.uniqueId)}
          sx={{
            color: theme.palette.text.primary,
            height: '34px',
            '&.Mui-selected': { background: hoverColors[theme.palette.mode][item.uniqueId] },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <FilecoinIcon size={20} />
            <Typography variant="body1" color={'text.primary'} fontWeight={400} textTransform={'capitalize'} pl={'0.5rem'}>
              Filecoin {itemText}
            </Typography>
            {item.isTestnet ? testTag : null}
          </Box>
        </MenuItem>
      )
    })
  }, [availableNetworks, allNetworks, theme.palette.mode, testTag, theme.palette.text.primary, handleNetworkChange])

  return (
    <Box display="flex" alignItems="center" gap={4}>
      <Box>
        <Button
          id="basic-button"
          data-testid={dataTestid}
          aria-controls={openMenu ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={openMenu ? 'true' : undefined}
          onClick={handleClickMenu}
          variant={'outlined'}
          size={buttonSize}
          startIcon={<FilecoinIcon size={18} />}
          endIcon={openMenu ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <Typography
              variant={buttonSize === 'large' ? 'body1' : 'body2'}
              color={'text.primary'}
              fontWeight={600}
              textTransform={'capitalize'}
            >
              {network.name}
            </Typography>
            {network.isTestnet && isDesktop ? testTag : null}
          </Box>
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorElMenu}
          open={openMenu}
          onClose={handleCloseMenu}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          {generateNetworkItems}
        </Menu>
      </Box>
    </Box>
  )
}

/**
 * Export the SelectNetwork component
 */
export default NetworkSelector
