/**
 * Imports necessary dependencies.
 */
import { DebouncedFunc } from 'lodash'
import { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'

import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material'

import ItemDetails from '../../ResultsView/GeneralView/ItemDetails'
import { SearchItemType } from '../../ResultsView/GeneralView/types'
import SearchInput from './SearchInput'

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
  const { t } = useTranslation()
  /**
   * Checks for medium-sized displays or larger.
   */
  const upMd = useMediaQuery(useTheme().breakpoints.up('md'))

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
        {/* Title and Details */}
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
          <Typography variant="h5">Mempool</Typography>
          <Typography variant="body2" lineHeight={1.25}>
            {t(
              'Witness real-time transactions as they queue up for blockchain and explore our detailed statistics page for deeper insights!'
            )}
          </Typography>
          <ItemDetails searchItemType={SearchItemType.MEMPOOL} tab={tab} />
        </Grid>

        {/* SearchInput Component */}
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
