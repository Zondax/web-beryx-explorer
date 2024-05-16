import Link from 'next/link'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { useLatestStore } from '@/store/data/latest'
import { timeSince } from '@/utils/dates'
import { Box, Typography, useTheme } from '@mui/material'

const TipsetTimestamp: React.FC = () => {
  const { t } = useTranslation()
  const theme = useTheme()

  const { latestTipsets } = useLatestStore()

  if (!latestTipsets || latestTipsets.length <= 0) {
    return null
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'baseline',
        width: 'max-content',
        gap: '0.5rem',
        marginRight: '0.5rem',
      }}
    >
      <Typography variant="body1" lineHeight={1} fontSize={'0.75rem'} width={'max-content'} sx={{ whiteSpace: 'nowrap' }}>
        {t('Latest Tipset')}
      </Typography>
      <Link href={`/recent_activity?tab=tipsets`} passHref>
        <Typography
          variant={'captionMono'}
          component={'a'}
          color={'text.primary'}
          lineHeight={1}
          width={'max-content'}
          fontFamily="Sora"
          fontSize={'0.75rem'}
          sx={{ whiteSpace: 'nowrap', '&:hover': { color: theme.palette.primary.main } }}
        >
          {`${timeSince(latestTipsets[0].tipset_timestamp)} ago`}
        </Typography>
      </Link>
    </Box>
  )
}

export default TipsetTimestamp
