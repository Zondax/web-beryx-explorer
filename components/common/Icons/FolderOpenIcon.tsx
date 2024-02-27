import React from 'react'

/**
 * Defining the types for the FolderOpenIconProps properties.
 * The size property is required to be a number.
 * color property is optional and should be a string.
 */
interface FolderOpenIconProps {
  size: number
  color?: string
}

/**
 * The FolderOpenIcon React component.
 * It consists of a SVG that represents an FolderOpenIcon.
 * @param size: The width and height of the SVG.
 * @returns A React component which is a SVG representing an FolderOpenIcon.
 */
const FolderOpenIcon = ({ size, color = '#fff' }: FolderOpenIconProps): JSX.Element => {
  return (
    <svg data-testid="folder-open-icon" width={size} height={size} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M408 96H252.11C247.375 96.0152 242.742 94.6229 238.8 92L211 73.41C201.794 67.2541 190.964 63.9783 179.89 64H104C89.1527 64.0159 74.9181 69.921 64.4195 80.4195C53.9209 90.9181 48.0158 105.153 47.9999 120V144H464C464 113.12 438.88 96 408 96ZM423.75 448H88.2499C73.556 447.983 59.4574 442.192 48.9945 431.875C38.5316 421.558 32.5429 407.542 32.3199 392.85L16.1799 228.11V227.83C15.6514 221.227 16.4952 214.586 18.6582 208.326C20.8213 202.065 24.2567 196.319 28.7485 191.451C33.2402 186.583 38.6909 182.697 44.7577 180.037C50.8245 177.378 57.376 176.004 63.9999 176H448.1C454.722 176.006 461.271 177.383 467.336 180.044C473.4 182.704 478.849 186.59 483.338 191.458C487.828 196.326 491.261 202.071 493.423 208.33C495.585 214.59 496.428 221.229 495.9 227.83V228.11L479.68 392.85C479.457 407.542 473.468 421.558 463.005 431.875C452.542 442.192 438.444 447.983 423.75 448Z"
        fill={color}
      />
    </svg>
  )
}

export default FolderOpenIcon
