/**
 * Imports necessary dependencies.
 */
import { DebouncedFunc } from 'lodash'
import Link from 'next/link'
import { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'

import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material'

import ItemDetails from '../../ResultsView/GeneralView/ItemDetails'
import { SearchItemType } from '../../ResultsView/GeneralView/types'
import SearchInput from './SearchInput'

/**
 * TitleAndDetails component.
 * @param tab - The current tab.
 * @param theme - The current theme.
 */
const TitleAndDetails = ({ tab }: { tab: string }) => {
  const { t } = useTranslation()
  const theme = useTheme()
  return (
    <Grid
      item
      container
      xs={12}
      md={7}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '0.5rem',
        width: { lg: '60%' },
      }}
    >
      <Typography variant="h5" component={'h1'}>
        Mempool
      </Typography>
      <Typography variant="body2" component={'p'} lineHeight={1.25}>
        {t('Witness real-time transactions as they queue up for blockchain and explore our detailed statistics page for deeper insights!')}
      </Typography>
      <Typography
        variant="body2"
        component={'p'}
        lineHeight={1.25}
        sx={{
          '& a': {
            color: theme.palette.main,
          },
        }}
      >
        {t('Now you can use the ')}
        <Link href={'/estimate_gas'}>{t('Gas Estimator')}</Link>
        {t(' for your transactions and for more details please check ')}
        <Link href={'/dashboard#gas-used-stats'}>{t('Gas Statistics')}</Link>.
      </Typography>
      <ItemDetails searchItemType={SearchItemType.MEMPOOL} tab={tab} />
    </Grid>
  )
}

/**
 * ItemInformation component.
 * @param search - A debounced function for event handling.
 */
const ItemInformation = ({
  search,
  tab,
}: {
  search: DebouncedFunc<(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void>
  tab: string
}) => {
  const theme = useTheme()
  const upMd = useMediaQuery(theme.breakpoints.up('md'))

  /**
   * Returns a Grid component that consists of ItemDescription and SearchInput.
   */
  return (
    <Grid
      container
      flexDirection={'column'}
      height={'fit-content'}
      minHeight={'7rem'}
      justifyContent={'space-between'}
      padding={upMd ? '1rem 1rem 1rem 1.5rem' : '1rem 0.5rem 1rem 0.5rem'}
      alignItems={'flex-start'}
      gap={{ xs: '0.5rem', md: '1.5rem' }}
      wrap={upMd ? 'nowrap' : 'wrap'}
    >
      <Grid item container xs={12} justifyContent={'space-between'} alignItems={'flex-start'} gap={{ xs: '0.5rem', md: '1.5rem' }}>
        <TitleAndDetails tab={tab} />
        {tab === '0' ? (
          <Grid container width={{ xs: '100%', md: '25rem' }} alignItems={'flex-end'}>
            <SearchInput search={search} />
          </Grid>
        ) : null}
      </Grid>
    </Grid>
  )
}

export default ItemInformation
