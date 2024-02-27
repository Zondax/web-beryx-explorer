import React from 'react'

/**
 * Describes component props
 * @property size - The size of the svg.
 * @property color - The color of the path elements.
 */
interface NetworkParametersTextIconProps {
  size: number
  color?: string
}

/**
 * @component
 * An SVG icon component that can be used across application.
 * It expects 'size' as in input and another optional field 'color'. By default, color is 'white'
 *
 * @param NetworkParametersTextIconProps - Object containing the props.
 * @param NetworkParametersTextIconProps.size - The size of the SVG to be output.
 * @param NetworkParametersTextIconProps.color - The color of the SVG to be output.
 *
 * @example
 * <NetworkParametersTextIcon size={20} color='black'/>
 *
 * @returns - An SVG Element
 */
const NetworkParametersTextIcon = ({ size, color = 'white' }: NetworkParametersTextIconProps) => {
  return (
    <svg
      data-testid="network-params-icon"
      width={(size * 183) / 32}
      height={size}
      viewBox="0 0 183 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8 19L4.32 9H2V23H4V13L7.68 23H10V9H8V19Z" fill={color} />
      <path
        d="M38.2098 9L37.8698 17L37.6098 21.54L37.1998 18L36.5198 12.54H34.4998L33.8198 18L33.4098 21.54L33.1598 17L32.8098 9H31.0098L32.0098 23H34.2798L35.0398 18.07L35.4998 14L35.5098 13.97L35.5198 14L35.9798 18.07L36.7398 23H39.0098L40.0098 9H38.2098Z"
        fill={color}
      />
      <path d="M22 11H25V23H27V11H30V9H22V11Z" fill={color} />
      <path d="M20 11V9H12V23H20V21H14V17H19V15H14V11H20Z" fill={color} />
      <path
        d="M60 15V11C60 10.4696 59.7893 9.96086 59.4142 9.58579C59.0391 9.21071 58.5304 9 58 9H52V23H54V17H55.48L57.82 23H60L57.67 17H58C58.5304 17 59.0391 16.7893 59.4142 16.4142C59.7893 16.0391 60 15.5304 60 15ZM54 11H58V15H54V11Z"
        fill={color}
      />
      <path
        d="M85 23H83V9H89C89.5304 9 90.0391 9.21071 90.4142 9.58579C90.7893 9.96086 91 10.4696 91 11V16C91 16.5304 90.7893 17.0391 90.4142 17.4142C90.0391 17.7893 89.5304 18 89 18H85V23ZM85 16H89V11H85V16Z"
        fill={color}
      />
      <path
        d="M99 9H95C94.4696 9 93.9609 9.21071 93.5858 9.58579C93.2107 9.96086 93 10.4696 93 11V23H95V18H99V23H101V11C101 10.4696 100.789 9.96086 100.414 9.58579C100.039 9.21071 99.5304 9 99 9ZM95 16V11H99V16H95Z"
        fill={color}
      />
      <path
        d="M111 15V11C111 10.4696 110.789 9.96086 110.414 9.58579C110.039 9.21071 109.53 9 109 9H103V23H105V17H106.48L108.82 23H111L108.67 17H109C109.53 17 110.039 16.7893 110.414 16.4142C110.789 16.0391 111 15.5304 111 15ZM105 11H109V15H105V11Z"
        fill={color}
      />
      <path
        d="M119 9H115C114.47 9 113.961 9.21071 113.586 9.58579C113.211 9.96086 113 10.4696 113 11V23H115V18H119V23H121V11C121 10.4696 120.789 9.96086 120.414 9.58579C120.039 9.21071 119.53 9 119 9ZM115 16V11H119V16H115Z"
        fill={color}
      />
      <path
        d="M129 9L127.48 14L127 15.98L126.54 14L125 9H123V23H125V15L124.84 13L125.42 15L127 19.63L128.58 15L129.16 13L129 15V23H131V9H129Z"
        fill={color}
      />
      <path d="M141 11V9H133V23H141V21H135V17H140V15H135V11H141Z" fill={color} />
      <path d="M143 11H146V23H148V11H151V9H143V11Z" fill={color} />
      <path d="M161 11V9H153V23H161V21H155V17H160V15H155V11H161Z" fill={color} />
      <path
        d="M171 15V11C171 10.4696 170.789 9.96086 170.414 9.58579C170.039 9.21071 169.53 9 169 9H163V23H165V17H166.48L168.82 23H171L168.67 17H169C169.53 17 170.039 16.7893 170.414 16.4142C170.789 16.0391 171 15.5304 171 15ZM165 11H169V15H165V11Z"
        fill={color}
      />
      <path
        d="M179 23H173V21H179V17H175C174.47 17 173.961 16.7893 173.586 16.4142C173.211 16.0391 173 15.5304 173 15V11C173 10.4696 173.211 9.96086 173.586 9.58579C173.961 9.21071 174.47 9 175 9H181V11H175V15H179C179.53 15 180.039 15.2107 180.414 15.5858C180.789 15.9609 181 16.4696 181 17V21C181 21.5304 180.789 22.0391 180.414 22.4142C180.039 22.7893 179.53 23 179 23Z"
        fill={color}
      />
      <path d="M70 9H67.89L64 15.55V9H62V23H64V18.71L64.93 17.22L67.89 23H70L66.11 15.43L70 9Z" fill={color} />
      <path
        d="M48 23H44C43.4696 23 42.9609 22.7893 42.5858 22.4142C42.2107 22.0391 42 21.5304 42 21V11C42 10.4696 42.2107 9.96086 42.5858 9.58579C42.9609 9.21071 43.4696 9 44 9H48C48.5304 9 49.0391 9.21071 49.4142 9.58579C49.7893 9.96086 50 10.4696 50 11V21C50 21.5304 49.7893 22.0391 49.4142 22.4142C49.0391 22.7893 48.5304 23 48 23ZM44 11V21H48V11H44Z"
        fill={color}
      />
    </svg>
  )
}

export default NetworkParametersTextIcon
