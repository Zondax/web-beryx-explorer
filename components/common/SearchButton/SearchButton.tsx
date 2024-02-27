import { useCallback } from 'react'

import { Close, Search as SearchIcon } from '@carbon/icons-react'
import { IconButton, Tooltip, useTheme } from '@mui/material'

/**
 * SearchButton component.
 *
 * @param props - The properties that define the SearchButton component.
 * @param props.toggleSearch - The function to toggle the search.
 * @param props.isSearchOpen - The state of the search, open or not.
 *
 * @returns The SearchButton component.
 */
const SearchButton = ({
  toggleSearch,
  isSearchOpen,
  properties,
}: {
  toggleSearch: () => void
  isSearchOpen: boolean
  properties?: {
    borderRadius?: string
    maxHeight?: string
  }
}) => {
  const theme = useTheme()
  const borderRadius = properties?.borderRadius ?? '0.5rem'
  const height = properties?.maxHeight ?? theme.spacing(5)
  /**
   * handleToggleSearch function.
   *
   * @returns Calls the toggleSearch function.
   */
  const handleToggleSearch = useCallback(() => toggleSearch(), [toggleSearch])

  return (
    <Tooltip title="Search" placement="bottom" key={'mobile menu Search'}>
      <IconButton color="primary" onClick={handleToggleSearch} sx={{ height, borderRadius }}>
        {isSearchOpen ? <Close size="24" /> : <SearchIcon size="20" />}
      </IconButton>
    </Tooltip>
  )
}

export default SearchButton
