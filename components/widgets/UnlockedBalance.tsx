import BigNumber from 'bignumber.js'
import { useTranslation } from 'react-i18next'

import { LockedBalance } from '@/api-client/beryx.types'
import { amountFormat } from '@/config/config'
import { ObjectType } from '@/routes/parsing'
import { useSearchStore } from '@/store/data/search'
import { formatBalance } from '@/utils/format'
import { Locked, Unlocked } from '@carbon/icons-react'
import { Box, Divider, Tooltip, Typography, useTheme } from '@mui/material'

import { BeryxLink } from 'components/common'
import FilecoinIcon from 'components/common/Icons/Filecoin'

/**
 * Component to display the unlocked balance information.
 *
 * @param {Object} props - The component properties.
 * @param {LockedBalance} props.lockedBalance - The locked balance data to display.
 * @returns {JSX.Element | null} - The rendered component or null if the search network is not defined.
 */
const UnlockedBalance = ({ lockedBalance }: { lockedBalance: LockedBalance }) => {
  const { t } = useTranslation()
  const theme = useTheme()

  const searchNetwork = useSearchStore(s => s.searchInputNetwork)

  if (!searchNetwork) {
    return null
  }
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <FilecoinIcon size={16} />
        <Tooltip title={formatBalance([{ value: lockedBalance.amount, currency: searchNetwork?.currency }])} arrow>
          <Typography variant="caption" component={'p'} color={'text.primary'} lineHeight={'100%'}>
            {BigNumber(formatBalance([{ value: lockedBalance.amount, currency: searchNetwork?.currency }]))
              .dp(2, BigNumber.ROUND_DOWN)
              .toFormat(2, amountFormat)}
          </Typography>
        </Tooltip>
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: { xs: '0.5rem', md: '0.75rem' },
          alignItems: { xs: 'flex-start', md: 'center' },
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <Locked size={16} color={theme.palette.text.secondary} />
          <Typography variant="caption" color={'text.secondary'} noWrap>
            {t('Lock epoch')}
          </Typography>
          <Box maxWidth={'6rem'}>
            <BeryxLink
              key={'unlocked balance - lock epoch'}
              limitCharacters={'auto'}
              disableTooltip
              inputType={ObjectType.TIPSET}
              network={searchNetwork}
              value={lockedBalance.lock_epoch.toString()}
              isColored
              hasCopyButton={false}
            />
          </Box>
        </Box>
        <Divider orientation="vertical" variant="middle" sx={{ margin: '6px 0', display: { xs: 'none', md: 'flex' } }} flexItem />
        <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <Unlocked size={16} color={theme.palette.text.secondary} />
          <Typography variant="caption" color={'text.secondary'} noWrap>
            {t('Unlock epoch')}
          </Typography>
          <Box maxWidth={'6rem'}>
            <BeryxLink
              key={'unlocked balance - unlock epoch'}
              limitCharacters={'auto'}
              disableTooltip
              inputType={ObjectType.TIPSET}
              network={searchNetwork}
              value={lockedBalance.unlock_epoch.toString()}
              isColored
              hasCopyButton={false}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default UnlockedBalance
