/**
 * Importing react package.
 * @external
 */
import React from 'react'

/**
 * Interface to define the types of properties the component FIL2ETH accepts.
 * @interface
 * @property size - This is to specify the size of the displayed icon.
 * @property {string=} color - Optional property to specify the color of the icon, defaults to 'white'.
 */
interface IconProps {
  size: number
  color?: string
}

/**
 * A functional component that returns an SVG icon for FIL2ETH.
 * @function
 * @param props - An object where:
 *    props.size corresponds to the size of the icon to be displayed [REQUIRED]
 *    props.col corresponds to the color of the icon [OPTIONAL] (default value is 'white')
 * @returns JSX element - An SVG icon of FIL2ETH
 */
const FIL2ETH = ({ size }: IconProps) => {
  return (
    <svg data-testid="fil2eth-icon" width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_3108_15949)">
        <path
          d="M6 26V17.8281L2.4141 21.4141L1 20L7 14L13 20L11.5859 21.4141L8 17.8281V26H10.5V28H8C7.46976 27.9994 6.96142 27.7884 6.58649 27.4135C6.21155 27.0386 6.00064 26.5302 6 26Z"
          fill="black"
        />
        <path
          d="M26 6V14.1719L29.5859 10.5859L31 12L25 18L19 12L20.4141 10.5859L24 14.1719V6H16.5V4L24 4C24.5302 4.00064 25.0386 4.21155 25.4135 4.58649C25.7884 4.96142 25.9994 5.46976 26 6Z"
          fill="black"
        />
        <path
          opacity="0.9"
          d="M14.0957 28V21.43H15.7157V28H14.0957ZM15.5357 28V26.632H18.3077V28H15.5357ZM15.5357 25.345V23.977H18.1187V25.345H15.5357ZM15.5357 22.798V21.43H18.2537V22.798H15.5357ZM20.7359 28V22.708H22.4099V28H20.7359ZM18.9359 22.888V21.43H24.2099V22.888H18.9359ZM29.2316 28V21.43H30.9056V28H29.2316ZM25.0556 28V21.43H26.7296V28H25.0556ZM26.4416 25.417V23.959H29.5196V25.417H26.4416Z"
          fill="black"
        />
        <path
          d="M1.14508 11V3.7H3.00508V11H1.14508ZM2.80508 8.17V6.65H5.51508V8.17H2.80508ZM2.80508 5.22V3.7H5.62508V5.22H2.80508ZM7.06078 11V3.7H8.92078V11H7.06078ZM10.7197 11V3.7H12.5797V11H10.7197ZM12.3797 11V9.38H15.3397V11H12.3797Z"
          fill="black"
        />
      </g>
      <defs>
        <clipPath id="clip0_3108_15949">
          <rect width="32" height="32" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default FIL2ETH
