import { useTranslation } from 'react-i18next'

import { useSearchStore } from '@/store/data/search'
import { newDateFormat } from '@/utils/dates'
import { Box, Unstable_Grid2 as Grid, Skeleton, Typography, useTheme } from '@mui/material'

import { ItemInfo } from '../../ItemInformation'

/**
 * This is a component that displays the details of a tipset.
 * @component
 */
const TipsetDetails = () => {
  const searchResultJson = useSearchStore(s => s.searchResult.json)
  const theme = useTheme()
  const { t } = useTranslation()

  return (
    <Grid xs={12} container flexWrap={'nowrap'} gap={'0.75rem'}>
      {searchResultJson?.canonical !== undefined ? (
        <Box
          sx={{
            padding: '0.125rem 0.5rem 0.1rem 0.5rem',
            marginLeft: '-0.5rem',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: theme.palette.background.level2,
            width: 'fit-content',
          }}
        >
          <Typography
            variant={'caption'}
            component={'p'}
            fontSize={'0.85rem'}
            lineHeight={1}
            color={searchResultJson?.canonical ? theme.palette.success.main : theme.palette.error.main}
            fontWeight={600}
          >
            {searchResultJson?.canonical ? t('Confirmed') : t('Not Confirmed')}
          </Typography>
        </Box>
      ) : (
        <Skeleton variant="rounded" width={'4.95rem'} height={'1.5rem'} />
      )}
      {searchResultJson?.timestamp ? (
        <ItemInfo
          label={`${t('Time')} (UTC)`}
          content={searchResultJson?.timestamp ? newDateFormat(searchResultJson?.timestamp, 'UTC', true) : '-'}
          icon={undefined}
        />
      ) : (
        <Skeleton variant="rounded" width={'15.75rem'} height={'1.5rem'} />
      )}
    </Grid>
  )
}

export default TipsetDetails
