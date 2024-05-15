import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { FilterList } from '@mui/icons-material'
import { Box, Button, Menu, MenuItem, Switch, Typography, useTheme } from '@mui/material'

import { Filters, initMethodsTypeOptions } from '../SearchTables/config'

/**
 * FilterButton component
 * @param props - The props object
 * @returns The rendered FilterButton component
 */
const FilterButton = ({ filters, setFilters }: { filters: Filters; setFilters: (params: Filters) => void }) => {
  const theme = useTheme()
  const { t } = useTranslation()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const activeFilters = useMemo(() => {
    let count = 0

    if (filters?.level === 'main') {
      count += 1
    }
    if (filters.evm) {
      count += 1
    }

    return count
  }, [filters])

  /**
   * Handles the click event for toggling between 'main' and 'all' levels in the filters.
   */
  const handleInternalMessages = useCallback(() => {
    if (!filters || !setFilters) {
      return
    }
    setFilters({ ...filters, level: filters.level === 'all' ? 'main' : 'all' })
    return
  }, [filters, setFilters])

  /**
   * Handles the click event for toggling EVM messages in the filters.
   * Resets methodType if EVM messages are being hidden.
   */
  const handleEvmMessages = useCallback(() => {
    if (!filters || !setFilters) {
      return
    }

    setFilters({ ...filters, evm: !filters.evm, methodType: filters.methodType ? initMethodsTypeOptions : undefined })
    return
  }, [filters, setFilters])

  /**
   * Renders the switch for toggling internal messages visibility.
   * @returns {JSX.Element} - The rendered switch and label.
   */
  const renderInternalMessagesSwitch = useCallback(
    () => (
      <Box display={'flex'} gap={'0.5rem'} alignItems={'center'}>
        <Switch size="small" checked={filters?.level !== 'all'} onChange={handleInternalMessages} />
        <Typography variant={'body2'} color={'text.primary'}>
          {t('Hide Internal Messages')}
        </Typography>
      </Box>
    ),
    [filters?.level, handleInternalMessages, t]
  )

  /**
   * Renders the switch for toggling EVM messages visibility.
   * @returns {JSX.Element} - The rendered switch and label.
   */
  const renderEvmSwitch = useCallback(
    () => (
      <Box display={'flex'} gap={'0.5rem'} alignItems={'center'}>
        <Switch size="small" checked={filters?.evm} onChange={handleEvmMessages} />
        <Typography variant={'body2'} color={'text.primary'}>
          {t('Show only EVM Transactions')}
        </Typography>
      </Box>
    ),
    [filters?.evm, handleEvmMessages, t]
  )

  /**
   * Handles the click event for the filter button in the custom toolbar.
   * Opens the filter menu.
   * @param {React.MouseEvent<HTMLButtonElement>} event - The click event.
   */
  const handleFilterClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }, [])

  /**
   * Handles the closing of the filter menu.
   * Closes the filter menu.
   */
  const handleFilterClose = useCallback(() => {
    setAnchorEl(null)
  }, [])

  return (
    <>
      <Button
        variant={'outlined'}
        size={'small'}
        startIcon={<FilterList />}
        endIcon={
          <Box display={'flex'} justifyContent={'center'} bgcolor={theme.palette.text.primary} borderRadius={'50%'} width={18} height={18}>
            <Typography
              variant="body2"
              fontWeight={600}
              id={'badge-text'}
              sx={{ color: `${theme.palette.text.opposite.primary} !important` }}
            >
              {activeFilters}
            </Typography>
          </Box>
        }
        sx={{ padding: '1.75px 7px', minWidth: 'fit-content', gap: '0.25rem' }}
        onClick={handleFilterClick}
      >
        Filters
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleFilterClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        sx={{
          '.MuiMenu-paper': {
            backgroundImage: 'none',
            backgroundColor: theme.palette.background.level1,
            border: `1px solid ${theme.palette.border?.level0}`,
            mt: '0.5rem',
          },
        }}
      >
        {filters.level ? <MenuItem>{renderInternalMessagesSwitch()}</MenuItem> : null}
        {filters.evm !== undefined ? <MenuItem>{renderEvmSwitch()}</MenuItem> : null}
      </Menu>
    </>
  )
}

export default FilterButton
