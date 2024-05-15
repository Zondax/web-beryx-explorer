import React from 'react'
import { useTranslation } from 'react-i18next'

import { ObjectType } from '@/routes/parsing'
import { useLatestStore } from '@/store/data/latest'
import useAppSettingsStore from '@/store/ui/settings'
import { Box, Typography } from '@mui/material'

import { BeryxLink } from 'components/common'

const Height: React.FC = () => {
  const { t } = useTranslation()

  const { network } = useAppSettingsStore(state => ({ network: state.network }))
  const { latestTipsets } = useLatestStore()

  if (!latestTipsets || latestTipsets.length === 0) {
    return null
  }

  return (
    <Box
      id={'tipset-height-value'}
      sx={{
        display: 'flex',
        alignItems: 'baseline',
        width: 'max-content',
        gap: '0.5rem',
        marginRight: '0.5rem',
      }}
    >
      <Typography variant="body1" lineHeight={1} fontSize={'0.75rem'} width={'max-content'} sx={{ whiteSpace: 'nowrap' }}>
        {t('Tipset Height')}
      </Typography>
      <BeryxLink
        fontSize={'0.75rem'}
        inputType={ObjectType.TIPSET}
        value={latestTipsets[0].height.toString()}
        network={network}
        hasCopyButton={false}
      />
    </Box>
  )
}

export default Height
