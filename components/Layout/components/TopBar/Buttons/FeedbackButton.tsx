import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import useAppSettingsStore from '@/store/ui/settings'
import { Edit } from '@carbon/icons-react'
import { IconButton, Tooltip, Typography } from '@mui/material'

interface FeedbackButtonProps {
  buttonSize?: 'small' | 'medium' | 'large'
  prevAction?: () => void
}

interface FeedbackButtonProps {
  buttonSize?: 'small' | 'medium' | 'large'
  prevAction?: () => void
}

interface FeedbackButtonProps {
  buttonSize?: 'small' | 'medium' | 'large'
  prevAction?: () => void
}

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
const FeedbackButton = ({ buttonSize = 'medium', prevAction }: FeedbackButtonProps) => {
  const { t } = useTranslation()
  const hasFeedbackButton = useAppSettingsStore(s => s.hasFeedbackButton)

  const handleFeedbackClick = useCallback(() => {
    if (prevAction) {
      prevAction()
    }
    // @ts-ignore
    if (hasFeedbackButton && window && window.Marker) {
      // @ts-ignore
      window.Marker.capture()
    }
  }, [hasFeedbackButton, prevAction])

  return (
    <Tooltip title={t('Feedback Tool')} placement="bottom" key={'topbar item feedback'} disableInteractive arrow>
      <span>
        <IconButton
          color="info"
          size={buttonSize}
          id={'topbar-feedback-button'}
          onClick={handleFeedbackClick}
          disabled={!hasFeedbackButton}
          sx={{ minWidth: 'fit-content', width: 'fit-content', gap: '0.5rem' }}
        >
          <Edit />
          <Typography variant={buttonSize === 'large' ? 'body1' : 'body2'} color="inherit">
            Feedback
          </Typography>
        </IconButton>
      </span>
    </Tooltip>
  )
}

export default FeedbackButton
