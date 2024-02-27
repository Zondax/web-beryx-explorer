import React from 'react'

/**
 * CheckmarkProps props definition.
 * CheckmarkProps
 * @property size - Size of the Checkmark.
 * @property [color='#5AB75F'] - Color of the Checkmark. Optional. Default is '#5AB75F'.
 */

interface CheckmarkProps {
  size: number
  color?: string
}

/**
 * `Checkmark` is a React component that renders an SVG checkmark with customizable size and color.
 * @param props - The properties that define the size and color of the checkmark.
 * @return {JSX.Element} The SVG checkmark.
 */
const Checkmark = ({ size, color = '#5AB75F' }: CheckmarkProps) => {
  return (
    <svg data-testid="checkmark-icon" width={size} height={size} viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.0601 1.25C5.18506 1.25 1.31006 5.125 1.31006 10C1.31006 14.875 5.18506 18.75 10.0601 18.75C14.9351 18.75 18.8101 14.875 18.8101 10C18.8101 5.125 14.9351 1.25 10.0601 1.25ZM8.81006 13.75L5.43506 10.375L6.56006 9.375L8.81006 11.625L13.8101 6.75L14.9351 7.75L8.81006 13.75Z"
        fill={color}
      />
    </svg>
  )
}

export default Checkmark
