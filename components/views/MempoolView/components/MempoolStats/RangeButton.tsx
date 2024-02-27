/**
 * Imports necessary dependencies.
 */
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { StatsFrequency } from '@/store/data/mempool'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { Collapse, Grid, List, ListItemButton, ListItemText, useTheme } from '@mui/material'

/**
 * RenderFile component is used to render a file in the folder structure.
 * @param props - The properties passed to the component.
 * @param props.fileName - The name of the file.
 * @param props.file - The file object.
 * @param props.level - The level of the file in the folder structure.
 */
const ListButton = ({
  value,
  name,
  rangeSelected,
  handleButton,
}: {
  value: StatsFrequency
  name: string
  rangeSelected: StatsFrequency
  handleButton: (value: StatsFrequency) => void
}) => {
  const { t } = useTranslation()

  /**
   * @function handleClick
   * @description Handles the click event on the file. It dispatches the setCurrentTab action and opens the file.
   */
  const handleClick = useCallback(() => {
    handleButton(value)
  }, [value, handleButton])

  return (
    <ListItemButton onClick={handleClick} selected={rangeSelected === value} sx={{ gap: '0.2rem' }} key={value}>
      <ListItemText
        primary={t(name)}
        primaryTypographyProps={{
          style: {
            whiteSpace: 'normal',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: '2',
            WebkitBoxOrient: 'vertical',
          },
        }}
      />
    </ListItemButton>
  )
}
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
  const theme = useTheme()

  // State variable to control the open/close status of the menu
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  // A handler to toggle the open/close status of the menu
  const handleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev)
  }, [setIsMenuOpen])

  const mappedStatsFrequency: { [key in StatsFrequency]: string } = {
    current: 'Current',
    previous_hour: 'Past Hour',
    previous_day: 'Past Day',
    previous_week: 'Past Week',
  }

  const handleButton = useCallback(
    (value: StatsFrequency) => {
      setIsMenuOpen(false)
      setRangeSelected(value)
    },
    [setRangeSelected]
  )

  /**
   * Returns the switch component.
   */
  return (
    <Grid
      container
      width={'100%'}
      sx={{
        overflowY: isMenuOpen ? 'auto' : 'hidden',
        position: 'absolute',
        top: '0',
        left: '0',
        zIndex: 180,
        background: theme.palette.background.level1,
        border: `1px solid ${theme.palette.info.main}`,
        borderRadius: '6px',
      }}
    >
      <List dense component="div" disablePadding sx={{ width: '100%' }}>
        <ListItemButton onClick={handleMenu} sx={{ height: '3.5rem', mt: '0', gap: '0.2rem' }}>
          <ListItemText secondary={mappedStatsFrequency[rangeSelected]} />
          {isMenuOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={isMenuOpen} timeout="auto" unmountOnExit sx={{ mb: '0.5rem' }}>
          {Object.entries(mappedStatsFrequency).map(([key, name]) => (
            <ListButton value={key as StatsFrequency} name={name} rangeSelected={rangeSelected} handleButton={handleButton} key={key} />
          ))}
        </Collapse>
      </List>
    </Grid>
  )
}

export default RangeButton
