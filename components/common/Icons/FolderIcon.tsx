import React from 'react'

/**
 * @interface FolderIconProps
 *
 * The properties for the FolderIcon.
 *
 * @property size
 * The size of the icon.
 *
 * @property [color]
 * The color of the icon.
 */
interface FolderIconProps {
  size: number
  color?: string
}

/**
 * @function FolderIcon
 *
 * A function component that renders a Folder icon according to the provided properties.
 *
 * @param props
 * The properties for configuring the rendering of the icon.
 *
 * @returns {ReactElement}
 */
const FolderIcon = ({ size, color = '#fff' }: FolderIconProps) => {
  return (
    <svg data-testid="folder-icon" width={size} height={size} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M496 152C496 137.148 490.1 122.904 479.598 112.402C469.096 101.9 454.852 96 440 96H220.11C215.375 96.0152 210.742 94.6229 206.8 92L179 73.41C169.794 67.2541 158.964 63.9783 147.89 64H72C57.1479 64 42.9041 69.9 32.402 80.402C21.9 90.904 16 105.148 16 120V168C16 170.122 16.8429 172.157 18.3431 173.657C19.8434 175.157 21.8783 176 24 176H488C490.122 176 492.157 175.157 493.657 173.657C495.157 172.157 496 170.122 496 168V152ZM16 392C16 406.852 21.9 421.096 32.402 431.598C42.9041 442.1 57.1479 448 72 448H440C454.852 448 469.096 442.1 479.598 431.598C490.1 421.096 496 406.852 496 392V216C496 213.878 495.157 211.843 493.657 210.343C492.157 208.843 490.122 208 488 208H24C21.8783 208 19.8434 208.843 18.3431 210.343C16.8429 211.843 16 213.878 16 216V392Z"
        fill={color}
      />
    </svg>
  )
}

export default FolderIcon
