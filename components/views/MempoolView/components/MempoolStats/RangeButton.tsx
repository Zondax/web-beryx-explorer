/**
 * Imports necessary dependencies.
 */
import { useCallback } from 'react'

import { StatsFrequency } from '@/config/config'
import { ExpandMore } from '@mui/icons-material'
import { MenuItem, TextField, Typography } from '@mui/material'

/**
 * Switch with available ranges in the Mempool statistics component.
 */
const RangeButton = ({
  rangeSelected,
  setRangeSelected,
}: {
  rangeSelected: StatsFrequency
  setRangeSelected: (value: StatsFrequency) => void
}) => {
  const mappedStatsFrequency: { [key in StatsFrequency]: string } = {
    current: 'Current',
    previous_hour: 'Past Hour',
    previous_day: 'Past Day',
    previous_week: 'Past Week',
  }

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setRangeSelected(e.target.value as StatsFrequency)
    },
    [setRangeSelected]
  )

  /**
   * Returns the switch component.
   */
  return (
    <TextField
      id="language-selector"
      select
      SelectProps={{
        IconComponent: ExpandMore,
        MenuProps: { disableScrollLock: true, PaperProps: { sx: { maxHeight: 400 } } },
      }}
      size="large"
      color="level1"
      name="language"
      value={rangeSelected}
      onChange={handleChange}
      placeholder="Select"
      fullWidth
      sx={{
        minWidth: '12rem',
      }}
    >
      {Object.entries(mappedStatsFrequency).map(([key, name]) => (
        <MenuItem key={`time range - ${key}`} value={key as StatsFrequency} id={`tx_typeItem - ${key}`}>
          <Typography variant={'body2'} color="text.primary" sx={{ textTransform: 'capitalize' }}>
            {name}
          </Typography>
        </MenuItem>
      ))}
    </TextField>
  )
}

export default RangeButton
