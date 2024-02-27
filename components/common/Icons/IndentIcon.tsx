import React from 'react'

import { useTheme } from '@mui/material'

/**
 * Interface for IndentIcon's props
 */
interface IndentIconProps {
  /**
   * Size of the icon
   */
  size: number
  /**
   * The color of the icon. If not provided, the theme's tertiary text color will be used.
   */
  color?: string
}

/**
 * A component that displays an 'indentation' icon.
 * @param props The properties of the icon.
 * @param props.size The size of the icon.
 * @param props.color The color of the icon. If not provided, the theme's tertiary text color will be used.
 */
const IndentIcon: React.FC<IndentIconProps> = ({ size, color }) => {
  const theme = useTheme()
  const fillColor = color ?? theme.palette.text.tertiary

  return (
    <svg data-testid="indent-icon" width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_4761_38524)">
        <path
          d="M20.5 28L18.385 25.885L22.255 22L14.5 22C11.7162 21.9969 9.04726 20.8897 7.0788 18.9212C5.11034 16.9527 4.0031 14.2838 4 11.5L4 4H7L7 11.5C7.00226 13.4884 7.79317 15.3948 9.1992 16.8008C10.6052 18.2068 12.5116 18.9977 14.5 19L22.255 19L18.385 15.115L20.5 13L28 20.5L20.5 28Z"
          fill={fillColor}
        />
      </g>
      <defs>
        <clipPath id="clip0_4761_38524">
          <rect width="32" height="32" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default IndentIcon
