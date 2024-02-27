import { Typography } from '@mui/material'

import { MethodFlags, flagsStyle } from './config'

/**
 * Flag React Component
 *
 * @param type - MethodFlags. The type of the flag ('read', 'write', 'payable')
 *
 * @returns Flag Component
 */
export const MethodFlag = ({ type }: { type?: MethodFlags }) => {
  if (!type) {
    return null
  }

  return (
    <Typography
      variant="body2"
      lineHeight="unset"
      sx={{
        color: flagsStyle[type].color,
        backgroundColor: flagsStyle[type].backgroundColor,
        padding: '2px 6px',
        borderRadius: '4px',
      }}
    >
      {flagsStyle[type].label}
    </Typography>
  )
}
