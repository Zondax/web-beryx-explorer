import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import useAppSettingsStore from '@/store/ui/settings'
import { Light, Moon } from '@carbon/icons-react'
import { Box, IconButton, Tooltip, useTheme } from '@mui/material'

/**
 * Buttons component.
 *
 * This component provides the interface for the top bar buttons.
 *
 * @param menuItems - The menu items.
 * @param setMenuItems - The function to set the menu items.
 *
 * @returns The JSX element of the Buttons component.
 */
const ThemeButton = () => {
  const { t } = useTranslation()
  const theme = useTheme()
  const toggleTheme = useAppSettingsStore(s => s.toggleAppTheme)

  const handleClick = useCallback(toggleTheme, [toggleTheme])

  return (
    <Tooltip
      title={t(theme.palette.mode === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode')}
      placement="bottom"
      key={'topbar item theme'}
      disableInteractive
      arrow
    >
      <IconButton
        className="sunSettingAnimationContainer"
        color="info"
        id={'topbar-theme-button'}
        onClick={handleClick}
        sx={{
          position: 'relative',
          overflow: 'hidden',
          zIndex: 10000,
          '&:hover': {
            backgroundColor: theme.palette.background.opposite.level1,
            transition: 'background-color 0.35s 0.3s ease-in-out',
            '& svg': {
              color: theme.palette.text.opposite.primary,
              transition: 'color 0.35s 0.3s ease-in-out',
            },
          },
        }}
      >
        <Box className="sunSetting" sx={{ position: 'absolute', top: '100%', left: 0, width: '100%', height: '100%' }}>
          <Box
            sx={{
              position: 'absolute',
              top: '-100%',
              left: '0%',
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {theme.palette.mode === 'light' ? <Light /> : <Moon />}
          </Box>
        </Box>

        <Box className="sunRising" sx={{ position: 'absolute', top: '100%', left: 0, width: '100%', height: '100%' }}>
          <Box
            sx={{
              position: 'absolute',
              top: '0%',
              left: '-100%',
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              transform: 'rotate(-90deg)',
            }}
          >
            {theme.palette.mode === 'light' ? <Moon /> : <Light />}
          </Box>
        </Box>
      </IconButton>
    </Tooltip>
  )
}

export default ThemeButton
