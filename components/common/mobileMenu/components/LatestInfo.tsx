import Image from 'next/image'
import { useMemo } from 'react'

import { CurrencyRate } from '@/api-client/nats.types'
import { ObjectType } from '@/routes/parsing'
import { useLatestStore } from '@/store/data/latest'
import useAppSettingsStore from '@/store/ui/settings'
import { Cube } from '@carbon/icons-react'
import { Box, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { BeryxLink } from '../../index'

/**
 * LatestInfo functional component
 *
 * This component is responsible for displaying the latest information which involves
 * the current network, latest tipsets, and the price of Filecoin in the selected currency.
 * The price of the Filecoin is periodically refreshed every five mintues.
 *
 * @returns Component UI
 */
const LatestInfo = () => {
  const theme = useTheme()
  const { network } = useAppSettingsStore(state => ({ network: state.network }))

  const selectedCurrency = useAppSettingsStore(s => s.fiatCurrency)

  const { latestTipsets, latestCurrencyRates } = useLatestStore()

  const currentPrice: CurrencyRate | undefined = useMemo(
    () => latestCurrencyRates.find(({ currency }) => currency === selectedCurrency),
    [latestCurrencyRates, selectedCurrency]
  )

  return (
    <Box sx={{ position: 'absolute', bottom: '0.5rem', right: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      {currentPrice ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: 'max-content',
            gap: '0.5rem',
          }}
        >
          <Image
            src="/logos/filecoin.svg"
            alt="filecoin logo"
            width={14}
            height={14}
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
          <Typography
            variant="body1"
            color={'text.primary'}
            lineHeight={1}
            width={'max-content'}
            fontFamily="Sora"
            fontWeight={500}
            fontSize={'0.75rem'}
            sx={{ textTransform: 'uppercase' }}
          >
            {currentPrice.price} {selectedCurrency}/FIL
          </Typography>
        </Box>
      ) : null}
      <Typography variant="body1" color={'text.secondary'} fontSize={'0.75rem'}>
        •
      </Typography>
      {latestTipsets && latestTipsets.length > 0 ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: 'max-content',
            gap: '0.25rem',
          }}
        >
          <Cube size={16} />
          <BeryxLink inputType={ObjectType.TIPSET} value={latestTipsets[0].height.toString()} network={network} />
        </Box>
      ) : null}
      <Typography variant="body1" color={'text.secondary'} fontSize={'0.75rem'}>
        •
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Image
          src="/logos/filecoin.svg"
          alt="filecoin logo"
          width={14}
          height={14}
          style={{
            maxWidth: '100%',
            height: 'auto',
          }}
        />
        <Typography variant="caption" sx={{ color: theme.palette.text.tertiary, textTransform: 'capitalize' }}>
          {network.name}
        </Typography>
      </Box>
    </Box>
  )
}

export default LatestInfo
