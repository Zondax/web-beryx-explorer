import React from 'react'

/**
 * Interface for LedgerIcon props
 */
interface LedgerIconProps {
  size: number
  color: string
}

/**
 * React component for the LedgerIcon.
 *
 * @param props - Properties passed to component
 * @returns {JSX.Element}
 */
const LedgerIcon = ({ size, color = 'white' }: LedgerIconProps): JSX.Element => {
  const aspectRatio = 10 / 8
  const width = size * aspectRatio
  const height = size
  return (
    <svg width={width} height={height} viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_6133_33)">
        <path
          d="M0 5.72842V8H3.43902V7.49623H0.501073V5.72842H0ZM8.64179 5.72842V7.49623H5.70384V7.99988H9.14286V5.72842H8.64179ZM3.44401 2.27158V5.7283H5.70384V5.27401H3.94509V2.27158H3.44401ZM0 0V2.27158H0.501073V0.503653H3.43902V0H0ZM5.70384 0V0.503653H8.64179V2.27158H9.14286V0H5.70384Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_6133_33">
          <rect width="9.14286" height="8" fill={color} />
        </clipPath>
      </defs>
    </svg>
  )
}

export default LedgerIcon
