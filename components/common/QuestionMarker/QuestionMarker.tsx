import React from 'react'

import { HelpOutline } from '@mui/icons-material'
import { IconButton, Tooltip, useTheme } from '@mui/material'

/**
 * A component that displays a question marker
 *
 * The marker is an IconButton with a HelpOutline icon. When hovered over, a Tooltip is revealed with a title.
 * Uses Material-UI's Theme for styling.
 *
 * @param props - The component's props
 * @param props.title - The Tooltip's title, which is displayed when hovered over
 *
 * @returns The QuestionMarker component
 */
const QuestionMarker = ({ title }: { title: React.ReactNode }) => {
  const theme = useTheme()
  return (
    <Tooltip title={title} placement="bottom">
      <IconButton
        sx={{
          color: theme.palette.text.secondary,
          borderRadius: '50%',
          height: 'fit-content',
        }}
      >
        <HelpOutline width="24" height="24" />
      </IconButton>
    </Tooltip>
  )
}

export default QuestionMarker
