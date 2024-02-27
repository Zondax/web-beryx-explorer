import React, { SVGProps } from 'react'

/**
 * @interface EthereumIconProps
 * @description The properties for EthereumIcon component
 * @extends {SVGProps<SVGSVGElement>}
 *
 * @property size - The size of the icon
 * @property [color1='#6381F0'] - The primary color of the icon
 * @property [color2='#4F69CA'] - The secondary color of the icon
 */
interface EthereumIconProps extends SVGProps<SVGSVGElement> {
  size: number
  color1?: string
  color2?: string
}

/**
 * @function EthereumIcon
 * @description The EthereumIcon component
 *
 * @param {size, color1 = '#6381F0', color2 = '#4F69CA', ...props}
 * @returns A EthereumIcon
 */
const EthereumIcon = ({ size, color1 = '#6381F0', color2 = '#4F69CA', ...props }: EthereumIconProps): React.ReactElement => {
  return (
    <svg
      data-testid="ethereum-icon"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_55_964)">
        <path d="M15.9969 0L15.7822 0.729237V21.8881L15.9969 22.1023L25.8184 16.2967L15.9969 0Z" fill={color1} />
        <path d="M15.9971 0L6.17529 16.2967L15.9971 22.1023V11.8324V0Z" fill={color1} />
        <path d="M15.997 23.9618L15.876 24.1093V31.6464L15.997 31.9997L25.8245 18.1592L15.997 23.9618Z" fill={color1} />
        <path d="M15.9971 31.9997V23.9618L6.17529 18.1592L15.9971 31.9997Z" fill={color1} />
        <path d="M15.9971 22.1022L25.8186 16.2966L15.9971 11.8323V22.1022Z" fill={color2} />
        <path d="M6.17529 16.2966L15.9971 22.1022V11.8323L6.17529 16.2966Z" fill={color2} />
      </g>
      <defs>
        <clipPath id="clip0_55_964">
          <rect width="32" height="32" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default EthereumIcon
