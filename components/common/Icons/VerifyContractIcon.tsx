/**
 * Interface for `VerifyContractIconProps` props
 *
 * @interface
 * @property size - Size of the SVG icon
 * @property [color1='#ffffff5d'] - Color of the first part of the icon (optional)
 * @property [color2='#ffffff92'] - Color of the second part of the icon (optional)
 * @property [color3='#24D154'] - Color of the third part check mark of the icon (optional)
 */
interface VerifyContractIconProps {
  size: number
  color1?: string
  color2?: string
  color3?: string
}

/**
 * VerifyContractIcon component
 *
 * Component that renders a check mark SVG icon
 *
 * @param props - Component props
 * @returns JSX Element
 */
const VerifyContractIcon = ({
  size,
  color1 = '#ffffff5d',
  color2 = '#ffffff92',
  color3 = '#24D154',
}: VerifyContractIconProps): JSX.Element => {
  return (
    <svg data-testid="verify-contract-icon" width={size} height={size} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3.80554 14.8033H10.1076C10.1076 16.5539 10.4578 18.3045 12.9086 18.3045C14.5891 18.3045 15.3594 16.7873 15.3594 15.5035V8.5012C15.3594 6.4005 16.4097 5.00003 17.8102 5.00003H6.95659C4.43575 5.00003 3.80554 6.86732 3.80554 7.80096V14.8033Z"
        fill={color1}
      />
      <path
        d="M12.9094 18.3044C10.7034 18.3044 10.1084 16.904 10.1084 14.8033H0.305176C0.305176 16.5538 1.00541 18.3044 2.75599 18.3044C6.84069 18.3044 14.0297 18.3044 12.9094 18.3044Z"
        fill={color2}
      />
      <path
        d="M17.8106 5.00003C16.4101 5.00003 15.3597 6.4005 15.3597 8.5012H20.6115C20.6115 7.45085 20.2614 5.00003 17.8106 5.00003Z"
        fill="white"
        fillOpacity="0.2"
      />
      <g clipPath="url(#clip0_4654_38947)">
        <path
          d="M15.826 12.2988C14.9306 12.2988 14.0553 12.5643 13.3109 13.0618C12.5664 13.5592 11.9861 14.2663 11.6434 15.0935C11.3008 15.9208 11.2111 16.831 11.3858 17.7092C11.5605 18.5874 11.9917 19.3941 12.6248 20.0272C13.258 20.6604 14.0646 21.0915 14.9428 21.2662C15.821 21.4409 16.7313 21.3512 17.5585 21.0086C18.3858 20.6659 19.0928 20.0857 19.5903 19.3412C20.0877 18.5967 20.3532 17.7214 20.3532 16.826C20.3532 15.6253 19.8763 14.4738 19.0272 13.6248C18.1782 12.7758 17.0267 12.2988 15.826 12.2988ZM15.1793 18.6339L13.5624 17.017L14.0768 16.5026L15.1793 17.6051L17.5755 15.2091L18.0915 15.722L15.1793 18.6339Z"
          fill={color3}
        />
        <path
          d="M15.1793 18.6339L13.5624 17.017L14.0768 16.5026L15.1793 17.6051L17.5755 15.2091L18.0915 15.722L15.1793 18.6339Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_4654_38947">
          <rect width="10.3479" height="10.3479" fill="white" transform="translate(10.6521 11.6521)" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default VerifyContractIcon
