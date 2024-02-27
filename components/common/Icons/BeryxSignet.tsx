import React from 'react'

/**
 * Interface for the properties of BeryxSignet component
 *
 * @interface BeryxSignetProps
 *
 * @property size - Defines the size of the SVG
 * @property [color] - Defines the color of the SVG. Defaults to '#1A1B1F'
 */
interface BeryxSignetProps {
  size: number
  color?: string
}

/**
 * Renders BeryxSignet SVG component
 *
 * @param props - Component properties
 * @param props.size - Size of the SVG
 * @param [props.color] - Color of the SVG
 *
 * @returns JSX Markup for BeryxSignet SVG
 *
 * @example
 * ```jsx
 * <BeryxSignet size={40}/>
 * ```
 * ```jsx
 * <BeryxSignet color={'#FFFFFF'} size={40}/>
 * ```
 */
const BeryxSignet = ({ size, color = '#1A1B1F' }: BeryxSignetProps): React.ReactElement => {
  return (
    <svg
      data-testid="beryx-signet-icon"
      width={size}
      height={size * 1.125}
      viewBox="0 0 32 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.544922 18.0673L2.584 20.1119L8.60467 14.0747L8.56381 26.1045L11.5203 29.0691L11.602 6.97974L0.544922 18.0673Z"
        fill={color}
      />
      <path d="M15.3743 3.19553L15.2666 32.8268L18.4311 36L18.5611 0L15.3743 3.19553Z" fill={color} />
      <path
        d="M22.0674 20.6479L23.6608 22.2457L25.2653 20.6368L25.4213 13.728L23.8353 12.1377L22.2234 13.7541L22.0674 20.6517V20.6479Z"
        fill={color}
      />
      <path
        d="M28.1025 24.3724L29.6959 25.9701L31.3004 24.3612L31.4564 10.0036L29.8705 8.41333L28.2585 10.0297L28.1025 24.3761V24.3724Z"
        fill={color}
      />
    </svg>
  )
}

export default BeryxSignet
