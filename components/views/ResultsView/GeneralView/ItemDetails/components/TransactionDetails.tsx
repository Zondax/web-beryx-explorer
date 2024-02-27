import { useTranslation } from 'react-i18next'

import { ObjectType } from '@/routes/parsing'
import { useSearchStore } from '@/store/data/search'
import { newDateFormat } from '@/utils/dates'
import { Box, Unstable_Grid2 as Grid, Skeleton, Typography, useMediaQuery, useTheme } from '@mui/material'

import { BeryxLink, TransactionStatus, TxTypeLabel } from '../../../../../common'
import ItemInfo from '../../ItemInformation/ItemInfo'

/**
 * TransactionDetails is a functional component that renders the details of a transaction.
 * It uses the Material UI theme for styling.
 *
 * @returns The rendered JSX element.
 */
const TransactionDetails = (): JSX.Element => {
  const theme = useTheme()
  const searchResultJson = useSearchStore(s => s.searchResult.json)
  const network = useSearchStore(s => s.searchInputNetwork)
  const { t } = useTranslation()

  const upMd = useMediaQuery(theme.breakpoints.up('md'))

  if (upMd) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <Grid container flexWrap={'nowrap'} gap={'0.5rem'}>
          {searchResultJson?.canonical !== undefined ? (
            <Box
              sx={{
                padding: '0.125rem 0.5rem 0.1rem 0.5rem',
                marginLeft: '-0.375rem',
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

          {searchResultJson?.tx_timestamp ? (
            <ItemInfo
              label={`${t('Time')} (UTC)`}
              content={searchResultJson?.tx_timestamp ? newDateFormat(searchResultJson?.tx_timestamp, 'UTC', true) : '-'}
              icon={undefined}
            />
          ) : (
            <Skeleton variant="rounded" width={'15.75rem'} height={'1.5rem'} />
          )}
        </Grid>
        <Grid container flexWrap={'nowrap'} gap={'0.5rem'}>
          {searchResultJson?.status ? (
            <ItemInfo label={t('Status')} content={''} icon={<TransactionStatus status={searchResultJson?.status} />} />
          ) : (
            <Skeleton variant="rounded" width={'4.95rem'} height={'1.5rem'} />
          )}
          {searchResultJson?.height ? (
            <ItemInfo
              label={t('Height')}
              content={<BeryxLink inputType={ObjectType.TIPSET} network={network} value={searchResultJson?.height} isColored />}
              icon={undefined}
            />
          ) : (
            <Skeleton variant="rounded" width={'8.5rem'} height={'1.5rem'} />
          )}
          {searchResultJson?.tx_type ? (
            <ItemInfo label={t('Method')} content={<TxTypeLabel label={searchResultJson?.tx_type} height="1.65rem" />} icon={undefined} />
          ) : (
            <Skeleton variant="rounded" width={'13.5rem'} height={'1.5rem'} />
          )}
        </Grid>
      </Box>
    )
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Grid container flexWrap={'nowrap'} gap={'0.5rem'}>
        {searchResultJson?.canonical ? (
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
        {searchResultJson?.tx_timestamp ? (
          <ItemInfo
            label={`${t('Time')} (UTC)`}
            content={searchResultJson?.tx_timestamp ? newDateFormat(searchResultJson?.tx_timestamp, 'UTC', true) : '-'}
            icon={undefined}
          />
        ) : (
          <Skeleton variant="rounded" width={'15.75rem'} height={'1.5rem'} />
        )}
      </Grid>
      <Grid container flexWrap={'nowrap'} gap={'0.5rem'}>
        {searchResultJson?.status ? (
          <ItemInfo label={t('Status')} content={''} icon={<TransactionStatus status={searchResultJson?.status} />} />
        ) : (
          <Skeleton variant="rounded" width={'4.95rem'} height={'1.5rem'} />
        )}
        {searchResultJson?.height ? (
          <ItemInfo
            label={t('Height')}
            content={<BeryxLink inputType={ObjectType.TIPSET} network={network} value={searchResultJson?.height} isColored />}
            icon={undefined}
          />
        ) : (
          <Skeleton variant="rounded" width={'8.5rem'} height={'1.5rem'} />
        )}
      </Grid>
      {searchResultJson?.tx_type ? (
        <ItemInfo label={t('Method')} content={<TxTypeLabel label={searchResultJson?.tx_type} height="1.65rem" />} icon={undefined} />
      ) : (
        <Skeleton variant="rounded" width={'13.5rem'} height={'1.5rem'} />
      )}
    </Box>
  )
}

export default TransactionDetails
