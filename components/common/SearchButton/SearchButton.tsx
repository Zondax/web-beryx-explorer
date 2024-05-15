import { useCallback } from 'react'

import { Close, Search as SearchIcon } from '@carbon/icons-react'
import { IconButton, Tooltip } from '@mui/material'

/**
 * SearchButton component.
 *
 * @param props - The properties that define the SearchButton component.
 * @param props.toggleSearch - The function to toggle the search.
 * @param props.isSearchOpen - The state of the search, open or not.
 *
 * @returns The SearchButton component.
 */
const SearchButton = ({ toggleSearch, isSearchOpen }: { toggleSearch: () => void; isSearchOpen: boolean }) => {
  /**
   * handleToggleSearch function.
   *
   * @returns Calls the toggleSearch function.
   */
  const handleToggleSearch = useCallback(() => toggleSearch(), [toggleSearch])

  return (
    <Tooltip title="Search" placement="bottom" key={'mobile menu Search'}>
      <IconButton color="info" size="large" onClick={handleToggleSearch}>
        {isSearchOpen ? <Close /> : <SearchIcon />}
      </IconButton>
    </Tooltip>
  )
}

export default SearchButton
