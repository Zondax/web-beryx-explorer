import { useRouter } from 'next/router'
import React, { createRef, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useSearchType } from '@/data/beryx'
import { HistoryItem, useHistoryStore } from '@/store/ui/history'
import { useAppSettingsStore } from '@/store/ui/settings'
import { decodeInput } from '@/utils/inputDetection'
import { Search } from '@carbon/icons-react'
import { Button, CircularProgress, Grid, TextField, Typography, useTheme } from '@mui/material'
import { Box } from '@mui/system'

import HelperTextPopper from './HelperTextPopper'
import HistoryPopover from './HistoryPopover'

/**
 * Maximum size of the history items displayed.
 */
export const HISTORY_DISPLAY_MAX_SIZE = 8

/**
 * @interface SearchBarProps
 * @description defines the properties for the SearchBar component
 * @property hasSearchButton
 * @property mobileMenu
 * @property {object} properties
 * @property placeholder
 * @property border
 */
export interface SearchBarProps {
  hasSearchButton: boolean
  mobileMenu?: boolean
  properties?: {
    minWidth?: string | number
    maxWidth?: string | number
    width?: string | number
    maxHeight?: string | number
  }
  placeholder?: string
  border?: boolean
  navbar?: boolean
}

export const SEARCH_BAR_WIDTH = '40rem'

/**
 * @description LoadingIndicator component
 */
const LoadingIndicator = ({ showLoading }: { showLoading: boolean }) =>
  showLoading ? <CircularProgress size={16} sx={{ position: 'absolute', right: '1rem', top: 'calc(50% - 8px)', zIndex: '200' }} /> : null

/**
 * @function SearchBar
 * @description This component is used to search for transactions, tipsets, addresses, and contracts
 * @param hasSearchButton - Placeholder text for the input
 * @param placeholder - Placeholder text for the input
 * @param mobileMenu - Indicate if it's a mobile menu
 * @param properties - Properties for the input
 * @param border - Border element for the input
 * @param navbar - Is the searchbar situated in the navbar
 */
const SearchBar = ({ hasSearchButton, placeholder, mobileMenu, properties, border, navbar }: SearchBarProps) => {
  const theme = useTheme()
  const { t } = useTranslation()

  const router = useRouter()

  const { network } = useAppSettingsStore(state => ({ network: state.network }))
  const { items: historyItems } = useHistoryStore(state => ({ items: state.items }))
  const { clearHistory } = useHistoryStore()

  const [inputValue, setInputValue] = useState('')

  const [helperText, setHelperText] = useState<React.ReactNode>(undefined)
  const [showLoading, setShowLoading] = useState(false)

  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null)
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false)

  const [activeSearch, setActiveSearch] = useState<boolean>(false)

  const textFieldRef = createRef<HTMLDivElement>()

  const { data: searchTypeResult, isLoading } = useSearchType(inputValue, network)

  const [filteredHistoryItems, setFilteredHistoryItems] = useState<HistoryItem[]>([])
  const [selectedElementIndex, setSelectedElementIndex] = useState<number>(-1)

  /**
   * Function to handle scroll event
   * @description This function is used to close the history when a scroll event is detected
   * @returns void
   */
  useEffect(() => {
    /**
     * @description This function is used to handle the scroll event. When a scroll event is detected, it closes the history.
     */
    const handleScroll = () => {
      setIsHistoryOpen(false)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [textFieldRef])

  /**
   * Function to update filtered history items
   * @description This function is used to update the filtered history items when inputValue or historyItems change
   * @returns void
   */
  useEffect(() => {
    if (inputValue) {
      // Filter items that start with the input or contain the input
      const filteredItems = historyItems
        .filter((item: HistoryItem) => item.value.startsWith(inputValue) || item.value.includes(inputValue))
        .sort((a, b) => {
          if (a.value.startsWith(inputValue) && b.value.startsWith(inputValue)) {
            return b.frequency - a.frequency
          }
          if (a.value.startsWith(inputValue)) {
            return -1
          }
          if (b.value.startsWith(inputValue)) {
            return 1
          }
          return b.frequency - a.frequency
        })

      setFilteredHistoryItems(filteredItems)
    } else {
      setFilteredHistoryItems([])
    }
  }, [inputValue, historyItems, network])

  /**
   * Function Search
   * @description This function is used to perform a search operation based on the input value. It first checks if there is a valid search type result. If not, it shows a loading indicator and displays a helper text. Then, it decodes the input value and checks for any errors. If an error is found, it stops the loading indicator and displays an error message. If no error is found, it navigates to the search result page.
   */
  const search = useCallback(async () => {
    setShowLoading(true)

    if (!searchTypeResult || searchTypeResult.length === 0) {
      setShowLoading(false)
      setHelperText(<>{t("Sorry! We don't recognize it. Please double check, there might be a typo.")}</>)
      return
    }

    const decodedInput = await decodeInput(inputValue, searchTypeResult[0])

    if (decodedInput.error) {
      setShowLoading(false)
      setHelperText(t(decodedInput.error) ?? t("Sorry! We don't recognize it. Please double check, there might be a typo."))
      return
    }

    if (router.asPath === `/v1/search/fil/${network.name}/${decodedInput.objectType}/${decodedInput.filForm}`) {
      router.reload()
      return
    }

    router.push(`/v1/search/fil/${network.name}/${decodedInput.objectType}/${decodedInput.filForm}`, undefined, {
      shallow: true,
    })
  }, [searchTypeResult, inputValue, router, network.name, t])

  /**
   * @function handleKeyDown
   * @description This function handles the key down event on the search input field. It checks if the 'Enter' key is pressed. If the 'Enter' key is pressed, it validates the input value and initiates a search operation.
   * @param event - The keyboard event
   */
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        if (!network) {
          return
        }

        if (inputValue === '') {
          setHelperText(<>{t('Please enter a value')}</>)
          setAnchorEl(event.currentTarget)
          return
        }

        // valid invalid characters
        const letters = /^[0-9a-zA-Z]+$/
        if (!letters.test(inputValue)) {
          setHelperText(<>{t('Invalid characters')}</>)
          setAnchorEl(event.currentTarget)
          return
        }

        setActiveSearch(true)
      }
    },
    [inputValue, network, t]
  )

  /**
   * @description This useEffect hook is triggered when the activeSearch or isLoading state changes.
   * If a search is active and not currently loading, it initiates the search function and sets activeSearch to false.
   */
  useEffect(() => {
    if (activeSearch && !isLoading) {
      search()
      setActiveSearch(false)
    }
  }, [activeSearch, isLoading, search])

  /**
   * @description This function handles the focus event on the search input field. It checks if there are any history items or helper text. If there are, it sets the anchor element to the text field and opens the history.
   */
  const handleFocus = useCallback(() => {
    if (historyItems.length || Boolean(helperText)) {
      setAnchorEl(textFieldRef.current)
      setIsHistoryOpen(true)
    }
  }, [textFieldRef, historyItems.length, helperText])

  /**
   * @description This function handles the click event on the search input field. It checks if there are any history items or helper text. If there are, it sets the anchor element to the text field and opens the history.
   */
  const handleClick = useCallback(() => {
    if (historyItems.length || Boolean(helperText)) {
      setAnchorEl(textFieldRef.current)
      setIsHistoryOpen(true)
    }
  }, [textFieldRef, historyItems.length, helperText])

  /**
   * @description This function handles the change event on the search input field. It clears the helper text, stops the loading indicator, opens the history, and sets the input value to the lowercased and space-trimmed version of the input.
   */
  const handleSearchInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setHelperText(undefined)
    setShowLoading(false)
    setIsHistoryOpen(true)
    let filteredInput = event.target.value
    filteredInput = filteredInput.toLowerCase()
    filteredInput = filteredInput.replace(/ /g, '')
    setInputValue(filteredInput)
  }, [])

  /**
   * @description This function handles the closing of the search history. It sets the history to be closed, removes the anchor element, and resets the selected element index.
   */
  const handleClose = useCallback(() => {
    setIsHistoryOpen(false)
    setAnchorEl(null)
    setSelectedElementIndex(-1)
  }, [])

  /**
   * @description This function handles the event of clearing the search history. It calls the clearHistory function, closes the history, removes the anchor element, and resets the selected element index.
   */
  const handleClearHistory = useCallback(() => {
    clearHistory()
    setIsHistoryOpen(false)
    setAnchorEl(null)
  }, [clearHistory])

  /**
   * @description This function handles the event of clicking away from the search bar. It clears the helper text.
   */
  const clickAwayHandler = useCallback(() => {
    setHelperText(undefined)
  }, [])

  return (
    <Grid
      container
      gap={1}
      sx={{
        width: { xs: '100%', sm: properties?.width ?? 'fit-content' },
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <LoadingIndicator showLoading={showLoading} />
      <TextField
        ref={textFieldRef}
        id={'track-search-bar-input'}
        data-testid="search-bar"
        label={
          <Box display="flex" gap={'0.5rem'} alignItems={'center'}>
            <Search />
            <Typography variant="body1">
              {placeholder ?? `${t('Search Address / Block / Contract / Tipset / Transaction CID in ')} ${network.name}`}
            </Typography>
          </Box>
        }
        InputLabelProps={{
          style: {
            borderRadius: navbar ? '4px' : '6px',
            maxHeight: properties?.maxHeight ? `calc(${properties?.maxHeight} - 2px)` : 'inherit',
          },
        }}
        size="large"
        color="level0"
        value={inputValue}
        aria-describedby={helperText ? 'simple-popper' : undefined}
        onChange={handleSearchInputChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onClick={handleClick}
        inputProps={{
          style: {
            maxHeight: properties?.maxHeight ? `calc(${properties?.maxHeight} - 2px)` : 'inherit',
            borderRadius: navbar ? '4px !important' : '6px',
          },
        }}
        sx={{
          width: { xs: '100%', sm: properties?.width ?? SEARCH_BAR_WIDTH },
          minWidth: properties?.minWidth ? properties?.minWidth : '20rem',
          maxWidth: properties?.maxWidth ? properties?.maxWidth : SEARCH_BAR_WIDTH,
          maxHeight: properties?.maxHeight ? properties?.maxHeight : 'inherit',
          borderRadius: navbar ? '4px !important' : '6px !important',
          border: border ? `1px solid ${theme.palette.primary.main}` : 'none',
          '.MuiInputBase-root': {
            borderRadius: navbar ? '3.5px' : '5.75px',
          },
        }}
      />
      {hasSearchButton && (
        <Button id="search-button" onClick={search} variant="contained" size="large">
          {t('Search Address / Block / Contract / Tipset / Transaction CID in ')}
        </Button>
      )}
      <HelperTextPopper
        helperText={helperText}
        anchorEl={anchorEl}
        clickAwayHandler={clickAwayHandler}
        properties={properties}
        border={border ?? false}
        theme={theme}
      />
      {anchorEl ? (
        <HistoryPopover
          isHistoryOpen={isHistoryOpen}
          helperText={helperText}
          anchorEl={anchorEl}
          handleClose={handleClose}
          mobileMenu={mobileMenu ?? false}
          properties={properties}
          handleClearHistory={handleClearHistory}
          filteredHistoryItems={filteredHistoryItems}
          selectedElementIndex={selectedElementIndex}
        />
      ) : null}
    </Grid>
  )
}

/**
 * @description Exporting the SearchBar component
 */
export default SearchBar
