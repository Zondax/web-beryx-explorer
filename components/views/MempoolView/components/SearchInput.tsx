/**
 * Module dependencies
 */
import { DebouncedFunc } from 'lodash'
import { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'

import { Search } from '@carbon/icons-react'
import { Box, Grid, TextField } from '@mui/material'

/**
 * The `SearchInput` component is a controlled component that gets its value from parent component.
 * It provides a text input field for the user to input search query.
 *
 * @param search - The function to be called when the text input changes
 *
 * @returns The rendered `SearchInput` component
 */
const SearchInput = ({ search }: { search: DebouncedFunc<(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void> }) => {
  const { t } = useTranslation()
  return (
    <Grid
      container
      gap={1}
      sx={{
        width: { xs: '100%', sm: 'fit-content' },
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        flex: 'auto',
        position: 'relative',
      }}
    >
      <TextField
        id="outlined-basic"
        size="large"
        color="level1"
        label={
          <Box display="flex" gap={0.5} alignItems="center">
            <Search />
            {t('Search in')} mempool
          </Box>
        }
        sx={{
          width: '100%',
          minWidth: { md: '20rem' },
          maxWidth: { md: '35rem' },
        }}
        onChange={search}
      />
    </Grid>
  )
}

/**
 * @exports SearchInput
 */
export default SearchInput
