/**
 * Functional component that displays a BetaIcon.
 *
 * @param props - The properties object.
 * @param props.size - Size of the icon.
 * @param [props.color1] - The first color used in the icon.
 * @param [props.color2] - The second color used in the icon.
 * @returns A Filecoin Icon SVG element.
 */
const BetaIcon = ({ size, color = 'black' }: { size: number; color: string }): JSX.Element => {
  const width = size * (50 / 32) // Maintain aspect ratio based on original 50x32 size
  const height = size
  return (
    <svg width={width} height={height} viewBox="0 0 50 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M41 13H36V15H41V17H37C36.4696 17 35.9609 17.2107 35.5858 17.5858C35.2107 17.9609 35 18.4696 35 19V21C35 21.5304 35.2107 22.0391 35.5858 22.4142C35.9609 22.7893 36.4696 23 37 23H43V15C43 14.4696 42.7893 13.9609 42.4142 13.5858C42.0391 13.2107 41.5304 13 41 13ZM41 21H37V19H41V21Z"
        fill={color}
      />
      <path
        d="M13 13H9V9H7V23H13C13.5304 23 14.0391 22.7893 14.4142 22.4142C14.7893 22.0391 15 21.5304 15 21V15C15 14.4696 14.7893 13.9609 14.4142 13.5858C14.0391 13.2107 13.5304 13 13 13ZM9 21V15H13V21H9Z"
        fill={color}
      />
      <path
        d="M25 19V15C24.9994 14.4698 24.7885 13.9614 24.4135 13.5865C24.0386 13.2115 23.5302 13.0006 23 13H19C18.4698 13.0006 17.9614 13.2115 17.5865 13.5865C17.2115 13.9614 17.0006 14.4698 17 15V21C17.002 21.5298 17.2134 22.0373 17.588 22.412C17.9627 22.7866 18.4702 22.998 19 23H24V21H19V19H25ZM19 15H23V17H19V15Z"
        fill={color}
      />
      <path
        d="M33 15V13H30V11H28V13H26V15H28V21C28 21.5304 28.2107 22.0391 28.5858 22.4142C28.9609 22.7893 29.4696 23 30 23H33V21H30V15H33Z"
        fill={color}
      />
    </svg>
  )
}

export default BetaIcon
