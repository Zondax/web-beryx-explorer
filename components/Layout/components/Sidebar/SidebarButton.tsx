import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { Badge, Box, Button, Tooltip, Typography, useTheme } from '@mui/material'

import NewFlag from 'components/common/NewFlag'

import { NavigationItemProps, PAGES, ResourcesItemProps } from './data'

/**
 * Component that renders the sidebar buttton.
 * It is a button or an icon button.
 */
const SidebarButton = ({
  item,
  type,
  activeTab,
  tooltip = false,
  action,
}: {
  item: NavigationItemProps | ResourcesItemProps
  type: 'button' | 'iconButton'
  activeTab?: PAGES
  tooltip?: boolean
  action?: () => void
}) => {
  const theme = useTheme()
  const router = useRouter()
  const { t } = useTranslation()

  /**
   * Change the url
   */
  const handleMainFrameChange = useCallback(
    function (path: string) {
      router.push(path)
    },
    [router]
  )

  /**
   * Apply the action or the function handleMainFrameChange.
   */
  const handleButtonClick = useCallback(() => {
    if (action) {
      action()
    } else {
      handleMainFrameChange(item.path)
    }
  }, [handleMainFrameChange, action, item.path])

  return (
    <Tooltip title={tooltip ? t(item.name) : ''} placement="right" disableInteractive>
      <Badge
        invisible={!item.new}
        badgeContent={<NewFlag />}
        overlap="circular"
        anchorOrigin={{
          vertical: 'top',
          horizontal: type === 'button' ? 'left' : 'right',
        }}
        sx={{
          width: type === 'iconButton' ? 'auto' : '100%',
        }}
      >
        <Button
          sx={{
            position: 'relative',
            minWidth: type === 'iconButton' ? 'unset' : '100% !important',
            height: '3rem',
            width: type === 'iconButton' ? '3rem' : '100%',
            display: 'flex',
            justifyContent: type === 'iconButton' ? 'center' : 'flex-start',
            alignItems: 'center',
            cursor: 'pointer',
            gap: '1rem',
            padding: type === 'button' ? '0.5rem' : '0',
            color: activeTab === item.name ? theme.palette.text.primary : theme.palette.text.secondary,
            borderRadius: '0.5rem',
            backgroundColor: activeTab === item.name ? theme.palette.background.level2 : '',
            '& svg path': {
              fill: activeTab === item.name ? theme.palette.text.primary : theme.palette.text.secondary,
            },
            ':hover': {
              backgroundColor: theme.palette.background.level0,
            },
          }}
          role="button"
          onClick={handleButtonClick}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '2rem', height: '2rem' }}>{item.icon}</Box>
          {type === 'button' ? (
            <Typography variant="body2" height={16}>
              {t(item.name)}
            </Typography>
          ) : null}
        </Button>
      </Badge>
    </Tooltip>
  )
}

export default SidebarButton
