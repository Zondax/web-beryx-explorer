/**
 * Imports necessary dependencies.
 */
import { SyntheticEvent, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { StatsFrequency } from '@/store/data/mempool'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'

/**
 * Render the button with available ranges in the Mempool statistics component.
 */
const RangeSwitch = ({
  rangeSelected,
  setRangeSelected,
}: {
  rangeSelected: StatsFrequency
  setRangeSelected: (value: StatsFrequency) => void
}) => {
  const { t } = useTranslation()

  /**
   * Switch buttons
   */
  const rangeButtons = [
    <ToggleButton key="current" value="current">
      {t('Current')}
    </ToggleButton>,
    <ToggleButton key="previous_hour" value="previous_hour">
      {t('Past Hour')}
    </ToggleButton>,
    <ToggleButton key="previous_day" value="previous_day">
      {t('Past Day')}
    </ToggleButton>,
    <ToggleButton key="previous_week" value="previous_week">
      {t('Past Week')}
    </ToggleButton>,
  ]

  /**
   * This function handles the change of the switch.
   * It uses the useCallback hook to prevent unnecessary re-renders.
   * @function
   * @param event - The event object.
   * @param value - The selected range value.
   * @returns - Returns nothing.
   */
  const handleSwitch = useCallback(
    (_: SyntheticEvent<Element, Event> | undefined, value: StatsFrequency) => {
      if (value !== null) {
        setRangeSelected(value)
      }
    },
    [setRangeSelected]
  )

  /**
   * Returns the switch component.
   */
  return (
    <ToggleButtonGroup size="small" color="primary" value={rangeSelected} exclusive onChange={handleSwitch} aria-label="range-selector">
      {rangeButtons}
    </ToggleButtonGroup>
  )
}

export default RangeSwitch
