import { useRouter } from 'next/router'
import React, { createRef, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useSearchType } from '@/data/beryx'
import { HistoryItem, useHistoryStore } from '@/store/ui/history'
import useAppSettingsStore from '@/store/ui/settings'
import { decodeInput } from '@/utils/inputDetection'
import { CloseFilled, Search } from '@carbon/icons-react'
import { Button, CircularProgress, ClickAwayListener, Grid, IconButton, TextField, Typography, useTheme } from '@mui/material'
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
 * @property mobileMenu
 * @property {object} properties
 * @property placeholder
 * @property border
 */
export interface SearchBarProps {
  hero?: boolean
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
  showHistory?: boolean
}

export const SEARCH_BAR_WIDTH = '30rem'

/**
 * @description LoadingIndicator component
 */
export const LoadingIndicator = ({ showLoading }: { showLoading: boolean }) =>
  showLoading ? (
    <CircularProgress
      size={16}
      sx={{ display: { xs: 'none', md: 'inline-block' }, position: 'absolute', right: '1rem', top: 'calc(50% - 8px)', zIndex: '200' }}
    />
  ) : null

/**
 * @function SearchBar
 * @description This component is used to search for transactions, tipsets, addresses, and contracts
 * @param placeholder - Placeholder text for the input
 * @param mobileMenu - Indicate if it's a mobile menu
 * @param properties - Properties for the input
 * @param border - Border element for the input
 * @param navbar - Is the searchbar situated in the navbar
 */
const SearchBar = ({ placeholder, mobileMenu, properties, border, navbar, showHistory = true, hero = false }: SearchBarProps) => {
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
      setHelperText(t("Sorry! We don't recognize it. Please double check, there might be a typo."))
      return
    }

    const decodedInput = await decodeInput(inputValue, searchTypeResult[0])

    if (decodedInput.error) {
      setShowLoading(false)
      setHelperText(t(decodedInput.error) ?? t("Sorry! We don't recognize it. Please double check, there might be a typo."))
      return
    }

    if (router.asPath === `/search/fil/${network.name}/${decodedInput.objectType}/${decodedInput.filForm}`) {
      router.reload()
      return
    }

    router.push(`/search/fil/${network.name}/${decodedInput.objectType}/${decodedInput.filForm}`, undefined, {
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
          setHelperText(t('Please enter a value'))
          setAnchorEl(event.currentTarget)
          return
        }

        // valid invalid characters
        const letters = /^[0-9a-zA-Z]+$/
        if (!letters.test(inputValue)) {
          setHelperText(t('Invalid characters'))
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

  /**
   * @description This function handles the event of clearing the input value. It sets the input value to an empty string and the helper text to undefined.
   */
  const handleClearInput = useCallback(() => {
    setInputValue('')
    setHelperText(undefined)
  }, [])

  /**
   * @description This function handles the rendering of the search actions. It checks if the search is loading and returns a loading indicator if it is. If the input value is not empty, it returns a close button that clears the input value.
   */
  const searchActions = useCallback(() => {
    if (showLoading) {
      return (
        <CircularProgress
          size={16}
          sx={{ display: { xs: 'none', md: 'inline-block' }, position: 'absolute', right: '1rem', top: 'calc(50% - 8px)', zIndex: '200' }}
        />
      )
    }
    if (inputValue) {
      return (
        <IconButton
          onClick={handleClearInput}
          size={'small'}
          sx={{ position: 'absolute', right: '0.125rem', top: '50%', transform: 'translateY(-50%)', zIndex: '200' }}
        >
          <CloseFilled color={theme.palette.text.tertiary} />
        </IconButton>
      )
    }
  }, [showLoading, inputValue, handleClearInput, theme.palette.text.tertiary])

  return (
    <Grid
      container
      gap={1}
      sx={{
        width: { xs: '100%', sm: properties?.width ?? 'fit-content' },
        position: 'relative',
        fontSize: { xs: '16px !important' },
      }}
    >
      <ClickAwayListener onClickAway={clickAwayHandler}>
        <Grid
          container
          ref={textFieldRef}
          gap={1}
          sx={{
            width: { sm: properties?.width ?? 'fit-content' },
            flexWrap: 'nowrap',
            alignItems: 'flex-start',
          }}
        >
          <LoadingIndicator showLoading={showLoading} />
          {searchActions()}

          <TextField
            id={'track-search-bar-input'}
            data-testid="search-bar"
            variant={'outlined'}
            size={hero ? 'large' : 'medium'}
            label={
              <Box display="flex" gap={'0.5rem'} alignItems={'center'}>
                <Search color={hero ? theme.palette.common.black : undefined} />
                <Typography
                  variant="body1"
                  sx={{
                    color: hero ? theme.palette.common.black : undefined,
                  }}
                >
                  {placeholder ?? t('Search in Filecoin')}
                  {hero && !placeholder && <span style={{ textTransform: 'capitalize', marginLeft: '0.35rem' }}>{network.name}</span>}
                </Typography>
              </Box>
            }
            value={inputValue}
            aria-describedby={helperText ? 'simple-popper' : undefined}
            onChange={handleSearchInputChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onClick={handleClick}
            InputProps={{
              style: {
                color: hero ? theme.palette.common.black : undefined,
              },
            }}
            sx={{
              width: { xs: '100%', sm: hero ? SEARCH_BAR_WIDTH : '100%', md: hero ? SEARCH_BAR_WIDTH : '15rem' },
              '.MuiInputBase-root': {
                backgroundColor: hero ? theme.palette.common.white : undefined,
                border: hero ? `3px solid ${theme.palette.primary.main}` : undefined,
                borderRadius: hero ? '8px' : undefined,
              },
            }}
          />
          {inputValue && (
            <Button
              id="search-button"
              onClick={search}
              variant="contained"
              size="large"
              sx={{ minWidth: 'unset', display: { xs: 'flex', md: 'none' } }}
            >
              {showLoading ? <CircularProgress size={16} sx={{}} /> : t('Search')}
            </Button>
          )}
        </Grid>
      </ClickAwayListener>
      <HelperTextPopper
        helperText={helperText}
        anchorEl={anchorEl}
        properties={properties}
        border={border ?? false}
        theme={theme}
        navbar={navbar}
      />
      {anchorEl && showHistory ? (
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
