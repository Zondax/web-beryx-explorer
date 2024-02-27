/**
 * Import configuration for beryxExplorerVersion, inputType, networkType
 * truncateMaxCharacters, Link from next/link for providing client-side
 * transitions between two pages in the same Next.js app,
 * useTranslation hook from react-i18next for language translation,
 * CheckmarkOutline from @carbon/icons-react for checkmark outline icons,
 * Grid and Typography components and useTheme hook from @mui/material for material UI components and theming,
 * BeryxLink for a custom BeryxLink component.
 */
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

import { beryxExplorerVersion, truncateMaxCharacters } from '@/config/config'
import { NetworkType } from '@/config/networks'
import { ObjectType } from '@/routes/parsing'
import { CheckmarkOutline } from '@carbon/icons-react'
import { Box, Grid, Typography, useTheme } from '@mui/material'

import BeryxLink from '../../../common/BeryxLink'

/**
 * SuccessContent component will show a success message with a transaction link.
 * @param props - SuccessContent component props.
 * @param [cid] - Optional content identifier.
 * @param network - The network type.
 * @returns SuccessContent JSX.
 */
const SuccessContent = ({ cid, network }: { cid?: string; network: NetworkType }) => {
  const theme = useTheme()
  const { t } = useTranslation()

  return (
    <>
      <Grid item container xs={12} justifyContent={'center'}>
        <CheckmarkOutline size="32" style={{ color: theme.palette.success.main, marginBottom: '1rem' }} />
      </Grid>
      <Typography variant="body1" textAlign={'center'}>
        {t('All good. You should receive the tokens soon. Meanwhile, you can track this transaction in the')}{' '}
        <Link href={`/${beryxExplorerVersion}/mempool`} style={{ color: theme.palette.primary.light }}>
          mempool
        </Link>
        .
      </Typography>
      {cid && (
        <Grid item container flexDirection={'column'} mt={2} xs={12} gap={1} alignItems="center">
          <Typography variant="body1">{t('Your transaction:')}</Typography>
          <Box width={'fit-content'}>
            <BeryxLink inputType={ObjectType.TXS} value={cid} limitCharacters={truncateMaxCharacters} network={network} />
          </Box>
        </Grid>
      )}
    </>
  )
}

export default SuccessContent
