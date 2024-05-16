import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { truncateMaxCharacters } from '@/config/config'
import { NetworkType, Networks } from '@/config/networks'
import { ObjectType } from '@/routes/parsing'
import useAppSettingsStore from '@/store/ui/settings'
import { LedgerAddress, getChainId, useLedgerWalletStore } from '@/store/wallets/ledger'
import { Add, Close } from '@carbon/icons-react'
import { Box, Button, IconButton, Skeleton, TextField, Tooltip, Typography, useTheme } from '@mui/material'

import BeryxLink from '../BeryxLink'
import EthereumIcon from '../Icons/Ethereum'
import Filecoin from '../Icons/Filecoin'

interface DisplayPathItemProps {
  path: string
  hasApostrophe: boolean
  hasSlash: boolean
}
const DisplayPathItem = ({ path, hasApostrophe, hasSlash }: DisplayPathItemProps) => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.background.level2,
        padding: '0.25rem 0.75rem',
        height: '2.8rem',
        borderRadius: '6px',
        position: 'relative',
        marginRight: '0.25rem',
        minWidth: '3rem',
      }}
    >
      <Typography variant="body1" fontSize={16} sx={{ position: 'relative' }}>
        {path}
        {hasApostrophe && (
          <Box component="span" sx={{ position: 'absolute', right: '-0.35rem' }}>
            &apos;
          </Box>
        )}
      </Typography>
      {hasSlash && (
        <Typography
          component="span"
          variant={'body1'}
          color={theme.palette.border?.level0}
          sx={{ position: 'absolute', right: '-0.4rem', fontSize: '1.5rem', zIndex: 10, fontWeight: 300 }}
        >
          /
        </Typography>
      )}
    </Box>
  )
}

/**
 * `BeryxLinkAddresses` is a React component that displays a list of 3 BeryxLink addresses.
 *
 * @returns the `BeryxLinkAddresses` component
 */
const ChooseLedgerAddress = () => {
  const theme = useTheme()
  const { t } = useTranslation()

  const { network, setNetwork } = useAppSettingsStore(s => s)
  const { addressList, setSelectedAddress, addAddress, removeAddress, app, setApp } = useLedgerWalletStore(s => s)
  const [addressIndex, setAddressIndex] = useState(0)
  const [canAddAddress, setCanAddAddress] = useState(true)

  const handleNetworkChange = useCallback(
    (network: NetworkType) => {
      setNetwork(network)
    },
    [setNetwork]
  )

  const handleSelectAddress = useCallback(
    (address: LedgerAddress) => {
      setSelectedAddress(address)
    },
    [setSelectedAddress]
  )

  const handleAddAddress = useCallback(() => {
    addAddress(addressIndex)
  }, [addAddress, addressIndex])

  const handleRemoveAddress = useCallback(
    (address: LedgerAddress) => {
      if (addressList?.length === 1) {
        return
      }
      removeAddress(address.addressIndex)
    },
    [removeAddress, addressList]
  )

  const handleAddressIndexChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressIndex(parseInt(e.target.value, 10))
  }, [])

  const handleAppChange = useCallback(
    (app: 'FIL' | 'ETH') => {
      setApp(app)
    },
    [setApp]
  )

  useEffect(() => {
    if (addressList?.some(address => address.addressIndex === addressIndex) || !addressIndex) {
      setCanAddAddress(false)
      return
    }
    setCanAddAddress(true)
  }, [addressList, addressIndex])

  const getNextAvailableAddressIndex = useCallback(() => {
    const existingIndices = addressList?.map(address => address.addressIndex) || []
    let nextIndex = 0
    while (existingIndices.includes(nextIndex)) {
      nextIndex++
    }
    return nextIndex
  }, [addressList])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        width: '100%',
        padding: '1rem',
        maxHeight: 'calc(100dvh - 12rem)',
      }}
    >
      <Typography variant="h6" component={'h2'} mb={0.5}>
        Network (Please change the network from the top menu)
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '0.5rem',
          marginBottom: '1.5rem',
        }}
      >
        <Button
          variant={'contained'}
          disabled
          size="medium"
          onClick={() => handleNetworkChange(Networks.mainnet)}
          sx={{ width: 'fit-content' }}
        >
          Mainnet
        </Button>

        <Button
          variant={'contained'}
          disabled
          size="medium"
          onClick={() => handleNetworkChange(Networks.calibration)}
          sx={{ width: 'fit-content' }}
        >
          Calibration
        </Button>
      </Box>
      <Typography variant="h6" component={'h2'} mb={0.5}>
        Choose address type
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '0.5rem',
          marginBottom: '1.5rem',
        }}
      >
        <Button variant={app === 'FIL' ? 'contained' : 'inputType'} size="medium" onClick={() => handleAppChange('FIL')}>
          <Box sx={{ marginRight: '0.5rem', display: 'flex', alignItems: 'center' }}>
            <Filecoin size={14} />
          </Box>
          Filecoin (f1...)
        </Button>
        <Button variant={app === 'ETH' ? 'contained' : 'inputType'} size="medium" onClick={() => handleAppChange('ETH')}>
          <Box sx={{ marginRight: '0.25rem', display: 'flex', alignItems: 'center' }}>
            <EthereumIcon size={14} />
          </Box>
          EVM Native (f410...)
        </Button>
      </Box>
      <Typography variant="h6" component={'h2'} mb={0.5}>
        Choose an address
      </Typography>

      {/* Address list */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          width: '100%',
          marginBottom: '1.5rem',
          overflowY: 'auto',
        }}
      >
        {!addressList ? (
          <>
            {[...Array(3)].map((_, index) => (
              <Skeleton key={index} variant="rectangular" width="100%" sx={{ height: '2.8rem', borderRadius: '6px' }} />
            ))}
          </>
        ) : null}
        {addressList?.map(address => (
          <Box
            key={`${address.addressIndex}-${address.address}`}
            sx={{ display: 'flex', flexDirection: 'row', gap: '0.5rem', alignItems: 'center' }}
          >
            <Box
              onClick={() => handleSelectAddress(address)}
              sx={{
                width: '100%',
                cursor: 'pointer',
                display: 'flex',
                gap: '1rem',
                alignItems: 'center',
                backgroundColor: theme.palette.background.level2,
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                height: '2.8rem',

                border: `1px solid ${theme.palette.background.level2}`,
                '&:hover': {
                  backgroundColor: theme.palette.background.level0,
                  border: `1px solid ${theme.palette.border?.level0}`,
                },
              }}
            >
              <Typography variant="body2" color={theme.palette.text.secondary}>
                /{address.addressIndex}
              </Typography>
              <BeryxLink inputType={ObjectType.ADDRESS} value={address.address} limitCharacters={truncateMaxCharacters} isColored={false} />
              <Typography variant="body2" color={theme.palette.text.primary} sx={{ whiteSpace: 'nowrap' }}>
                {address.balance}&nbsp;FIL
              </Typography>
            </Box>
            {addressList?.length !== 1 && (
              <Tooltip title={t('Remove address from list')} disableInteractive arrow>
                <IconButton color="info" size={'large'} onClick={() => handleRemoveAddress(address)}>
                  <Close />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        ))}
      </Box>

      <Typography variant="h6" component={'h2'} mb={0.5}>
        Add another address
      </Typography>

      {/* Choose a different one */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '0.5rem',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '0rem',
            alignItems: 'center',
          }}
        >
          <DisplayPathItem path={'m'} hasApostrophe={false} hasSlash={true} />
          <DisplayPathItem path={'44'} hasApostrophe={true} hasSlash={true} />
          <DisplayPathItem path={getChainId(app, network).toString()} hasApostrophe={true} hasSlash={true} />
          <DisplayPathItem path={'0'} hasApostrophe={true} hasSlash={true} />
          <DisplayPathItem path={'0'} hasApostrophe={false} hasSlash={true} />

          <TextField
            size={'large'}
            defaultValue={getNextAvailableAddressIndex()}
            type="number"
            onChange={handleAddressIndexChange}
            InputProps={{ inputProps: { min: 0, max: 255 } }}
          />
        </Box>
        <Button
          variant={'contained'}
          size={'medium'}
          startIcon={<Add />}
          sx={{ minWidth: '2.35rem' }}
          onClick={handleAddAddress}
          disabled={!canAddAddress}
        >
          Add
        </Button>
      </Box>
    </Box>
  )
}

export default ChooseLedgerAddress
