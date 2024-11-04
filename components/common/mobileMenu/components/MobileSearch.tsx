import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { InputErrors } from '@/config/inputErrors'
import { useSearchType } from '@/data/beryx'
import { HistoryItem, useHistoryStore } from '@/store/ui/history'
import useAppSettingsStore from '@/store/ui/settings'
import { decodeInput } from '@/utils/inputDetection'
import { CloseFilled, MisuseOutline, Search, TrashCan } from '@carbon/icons-react'
import { Alert, Button, CircularProgress, Divider, IconButton, TextField, Typography, useTheme } from '@mui/material'
import { Box } from '@mui/system'

import HistoryItemsBlock from 'components/common/SearchBar/HistoryItemsBlock'

/**
 * @function SearchBar
 * @description This component is used to search for transactions, tipsets, addresses, and contracts
 * @param placeholder - Placeholder text for the input
 * @param mobileMenu - Indicate if it's a mobile menu
 * @param properties - Properties for the input
 * @param border - Border element for the input
 * @param navbar - Is the searchbar situated in the navbar
 */
const MobileSearch = () => {
  const theme = useTheme()
  const { t } = useTranslation()
  const router = useRouter()
  const { network } = useAppSettingsStore(state => ({ network: state.network }))
  const { items: historyItems } = useHistoryStore(state => ({ items: state.items }))
  const { clearHistory } = useHistoryStore()
  const [inputValue, setInputValue] = useState('')
  const [helperText, setHelperText] = useState<React.ReactNode>(undefined)
  const [showLoading, setShowLoading] = useState(false)
  const [activeSearch, setActiveSearch] = useState<boolean>(false)
  const { data: searchTypeResult, isLoading } = useSearchType(inputValue, network)
  const [filteredHistoryItems, setFilteredHistoryItems] = useState<HistoryItem[]>([])
  const selectedElementIndex = -1

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
      setHelperText(t(InputErrors.NOT_FOUND))
      return
    }

    const decodedInput = await decodeInput(inputValue, searchTypeResult[0])

    if (decodedInput.error) {
      setShowLoading(false)
      setHelperText(t(decodedInput.error) ?? t(InputErrors.NOT_FOUND))
      return
    }

    if (router.asPath === `/fil/${network.name}/${decodedInput.objectMainType}/${decodedInput.filForm}`) {
      router.reload()
      return
    }

    router.push(`/fil/${network.name}/${decodedInput.objectMainType}/${decodedInput.filForm}`, undefined, {
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
          return
        }

        // valid invalid characters
        const letters = /^[0-9a-zA-Z]+$/
        if (!letters.test(inputValue)) {
          setHelperText(t('Invalid characters'))
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
   * @description This function handles the change event on the search input field. It clears the helper text, stops the loading indicator, opens the history, and sets the input value to the lowercased and space-trimmed version of the input.
   */
  const handleSearchInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setHelperText(undefined)
    setShowLoading(false)
    let filteredInput = event.target.value
    filteredInput = filteredInput.toLowerCase()
    filteredInput = filteredInput.replace(/ /g, '')
    setInputValue(filteredInput)
  }, [])

  /**
   * @description This function handles the event of clearing the search history. It calls the clearHistory function, closes the history, removes the anchor element, and resets the selected element index.
   */
  const handleClearHistory = useCallback(() => {
    clearHistory()
  }, [clearHistory])

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
          size={'medium'}
          sx={{ position: 'absolute', right: '6.5rem', top: '50%', transform: 'translateY(-50%)', zIndex: '200' }}
        >
          <CloseFilled color={theme.palette.text.tertiary} />
        </IconButton>
      )
    }
  }, [showLoading, inputValue, handleClearInput, theme.palette.text.tertiary])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '100%',
        position: 'relative',
        padding: '0.5rem',
        fontSize: { xs: '16px !important' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'nowrap',
          width: '100%',
          alignItems: 'flex-start',
          position: 'relative',
        }}
      >
        {searchActions()}
        <TextField
          id={'track-search-bar-input'}
          data-testid="search-bar"
          variant={'outlined'}
          size={'large'}
          label={
            <Box display="flex" gap={'0.5rem'} alignItems={'center'}>
              <Search />
              <Typography variant="body1">{t('Search in Filecoin')}</Typography>
            </Box>
          }
          value={inputValue}
          aria-describedby={helperText ? 'simple-popper' : undefined}
          onChange={handleSearchInputChange}
          onKeyDown={handleKeyDown}
          sx={{
            flex: 1,
          }}
        />
        <Button
          id="search-button"
          onClick={search}
          variant="contained"
          size="large"
          disabled={!inputValue}
          sx={{ minWidth: 'unset', display: { xs: 'flex', md: 'none' } }}
        >
          {showLoading ? <CircularProgress size={16} sx={{}} /> : t('Search')}
        </Button>
      </Box>
      <Alert
        severity="success"
        variant={'outlined'}
        color="error"
        icon={<MisuseOutline width={20} height={20} />}
        sx={{
          minHeight: '2.8rem',
          alignItems: 'center',
          width: '100%',
          borderRadius: '6px',
          display: helperText ? 'flex' : 'none',
        }}
      >
        {helperText}
      </Alert>
      {historyItems.length > 0 ? (
        <Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              overflow: 'auto',
            }}
          >
            {filteredHistoryItems.length ? (
              <HistoryItemsBlock
                historyItems={filteredHistoryItems}
                title={'Closest match'}
                maxItemCount={3}
                selectedElementIndex={selectedElementIndex < filteredHistoryItems.length ? selectedElementIndex : -1}
              />
            ) : null}
            {filteredHistoryItems.length ? <Divider sx={{ mb: '0.75rem', mt: '0.5rem' }} /> : null}
            <HistoryItemsBlock
              historyItems={historyItems.filter(item => !filteredHistoryItems.slice(0, 3).includes(item))}
              title={'Recently viewed'}
              maxItemCount={8}
              selectedElementIndex={
                selectedElementIndex >= filteredHistoryItems.length ? selectedElementIndex - filteredHistoryItems.length : -1
              }
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              padding: '2rem 0 0 1rem',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button
              variant={'text'}
              size={'medium'}
              color={'error'}
              endIcon={<TrashCan size={16} />}
              onClick={handleClearHistory}
              sx={{ paddingLeft: '1rem', paddingRight: '0.8rem', borderRadius: '4px' }}
            >
              {t('Clear history')}
            </Button>
          </Box>
        </Box>
      ) : null}
    </Box>
  )
}

/**
 * @description Exporting the SearchBar component
 */
export default MobileSearch
