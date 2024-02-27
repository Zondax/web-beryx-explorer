import React from 'react'

/**
 * This interface is for GenesisTextIcon component props.
 * @interface GenesisTextIconProps
 * @field {number} size - The size of the icon.
 * @field {string} [color] - A color for the icon. Defaults to white.
 */
interface GenesisTextIconProps {
  size: number
  color?: string
}

/**
 * A SVG based component to render genesis text icon.
 * @param props - The properties for GenesisTextIcon component.
 * @returns JSX.Element
 */
const GenesisTextIcon = ({ size, color = 'white' }: GenesisTextIconProps) => {
  return (
    <svg
      data-testid="genesis-text-icon"
      width={(size * 72) / 32}
      height={size}
      viewBox="0 0 72 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 23H4C3.46957 23 2.96086 22.7893 2.58579 22.4142C2.21071 22.0391 2 21.5304 2 21V11C2 10.4696 2.21071 9.96086 2.58579 9.58579C2.96086 9.21071 3.46957 9 4 9H10V11H4V21H8V17H6V15H10V23Z"
        fill={color}
      />
      <path d="M40 11V9H32V23H40V21H34V17H39V15H34V11H40Z" fill={color} />
      <path d="M28 19L24.32 9H22V23H24V13L27.68 23H30V9H28V19Z" fill={color} />
      <path d="M20 11V9H12V23H20V21H14V17H19V15H14V11H20Z" fill={color} />
      <path
        d="M48 23H42V21H48V17H44C43.4696 17 42.9609 16.7893 42.5858 16.4142C42.2107 16.0391 42 15.5304 42 15V11C42 10.4696 42.2107 9.96086 42.5858 9.58579C42.9609 9.21071 43.4696 9 44 9H50V11H44V15H48C48.5304 15 49.0391 15.2107 49.4142 15.5858C49.7893 15.9609 50 16.4696 50 17V21C50 21.5304 49.7893 22.0391 49.4142 22.4142C49.0391 22.7893 48.5304 23 48 23Z"
        fill={color}
      />
      <path
        d="M68 23H62V21H68V17H64C63.4696 17 62.9609 16.7893 62.5858 16.4142C62.2107 16.0391 62 15.5304 62 15V11C62 10.4696 62.2107 9.96086 62.5858 9.58579C62.9609 9.21071 63.4696 9 64 9H70V11H64V15H68C68.5304 15 69.0391 15.2107 69.4142 15.5858C69.7893 15.9609 70 16.4696 70 17V21C70 21.5304 69.7893 22.0391 69.4142 22.4142C69.0391 22.7893 68.5304 23 68 23Z"
        fill={color}
      />
      <path d="M52 11H55V21H52V23H60V21H57V11H60V9H52V11Z" fill={color} />
    </svg>
  )
}

export default GenesisTextIcon
