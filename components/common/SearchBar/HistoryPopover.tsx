import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { HistoryItem, useHistoryStore } from '@/store/ui/history'
import { boxShadow } from '@/theme/hoverEffect'
import { TrashCan } from '@carbon/icons-react'
import { Button, Divider, Grid, Popover, useMediaQuery, useTheme } from '@mui/material'
import { Box } from '@mui/system'

import HistoryItemsBlock from './HistoryItemsBlock'
import { SEARCH_BAR_WIDTH, SearchBarProps } from './SearchBar'

/**
 * @function HistoryHeader
 * @description This component is used to display the header of the history popover. It includes a button to clear the search history.
 * @param handleClearHistory - Function to handle clearing the search history
 */
const HistoryHeader = ({ handleClearHistory }: { handleClearHistory: () => void }) => {
  const { t } = useTranslation()
  return (
    <Grid
      container
      gap={1}
      justifyContent={'flex-end'}
      alignItems={'center'}
      mt={'1.5rem'}
      sx={{
        padding: '0 0 0 1rem',
      }}
    >
      <Button
        variant={'text'}
        size={'small'}
        endIcon={<TrashCan size={16} />}
        onClick={handleClearHistory}
        sx={{ paddingLeft: '1rem', paddingRight: '0.8rem', borderRadius: '4px' }}
      >
        {t('Clear history')}
      </Button>
    </Grid>
  )
}

/**
 * @function HistoryPopover
 * @description This component is a popover that displays the user's search history. It includes functionality to clear the history.
 * @param isHistoryOpen - Boolean indicating if the history popover is open
 * @param helperText - Helper text to display in the popover
 * @param anchorEl - The HTML element that the popover is anchored to
 * @param handleClose - Function to handle closing the popover
 * @param mobileMenu - Boolean indicating if the popover is displayed in a mobile menu
 * @param properties - Properties for the search bar
 * @param handleClearHistory - Function to handle clearing the search history
 * @param filteredHistoryItems - Array of history items that match the current search
 * @param selectedElementIndex - The index of the currently selected history item
 */
const HistoryPopover = ({
  isHistoryOpen,
  helperText,
  anchorEl,
  handleClose,
  mobileMenu,
  properties,
  handleClearHistory,
  filteredHistoryItems,
  selectedElementIndex,
}: {
  isHistoryOpen: boolean
  helperText: React.ReactNode
  anchorEl: HTMLDivElement
  handleClose: () => void
  mobileMenu: boolean
  properties: SearchBarProps['properties']
  handleClearHistory: () => void
  filteredHistoryItems: HistoryItem[]
  selectedElementIndex: number
}) => {
  const { items: historyItems } = useHistoryStore(state => ({ items: state.items }))
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'))
  const mobileProperty = !isDesktop ? { left: '0 !important' } : {}

  const [popoverHeight, setPopoverHeight] = useState<number>(0)

  useEffect(() => {
    /**
     * Function to update the height of the popover
     * @description This function is used to update the height of the popover when the window is scrolled or resized
     * @returns void
     */
    const updateHeight = () => {
      if (anchorEl) {
        const rect = anchorEl.getBoundingClientRect()
        const screenHeight = window.innerHeight || document.documentElement.clientHeight
        const newHeight = screenHeight - rect.top - 140
        setPopoverHeight(newHeight)
      }
    }
    updateHeight()
    window.addEventListener('scroll', updateHeight)
    return () => {
      window.removeEventListener('scroll', updateHeight)
    }
  }, [anchorEl])

  return (
    <Popover
      open={isHistoryOpen && !helperText}
      anchorEl={anchorEl}
      onClose={handleClose}
      disableAutoFocus
      disableEnforceFocus
      disableScrollLock
      marginThreshold={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      sx={{
        margin: { xs: mobileMenu ? '0.5rem 0.5rem 0 0.5rem' : '0.5rem 2.5rem 0 2rem', sm: '0.5rem 0 0 0' },
        '& .MuiPaper-root': {
          background: theme.palette.background.level1,
          border: `1px solid ${theme.palette.tableBorder}`,
          boxShadow: boxShadow(theme.palette.mode),
          width: anchorEl?.offsetWidth,
          minWidth: { sm: '30rem' },
          maxWidth: properties?.maxWidth ? properties?.maxWidth : SEARCH_BAR_WIDTH,
          padding: '1rem 0.5rem 0.5rem 0.5rem',
          ...mobileProperty,
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          maxHeight: popoverHeight,
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
      <HistoryHeader handleClearHistory={handleClearHistory} />
    </Popover>
  )
}

export default HistoryPopover
