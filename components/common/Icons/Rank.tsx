/**
 * Interface for the FirstPosition component props
 */
interface FirstPositionProps {
  /**
   * The size of the SVG
   */
  size: number
}

/**
 * FirstPosition component
 * @param props - The properties passed to the component
 * @returns - The FirstPosition component
 */
const FirstPositionIcon = ({ size }: FirstPositionProps): JSX.Element => {
  return (
    <svg data-testid="first-position-icon" width={size} height={size} viewBox={'0 0 58 58'} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M56 29C56 43.9117 43.9117 56 29 56C14.0883 56 2 43.9117 2 29C2 14.0883 14.0883 2 29 2C43.9117 2 56 14.0883 56 29Z"
        fill="#FFBB0D"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M58 29C58 45.0163 45.0163 58 29 58C12.9837 58 0 45.0163 0 29C0 12.9837 12.9837 0 29 0C45.0163 0 58 12.9837 58 29ZM29 56C43.9117 56 56 43.9117 56 29C56 14.0883 43.9117 2 29 2C14.0883 2 2 14.0883 2 29C2 43.9117 14.0883 56 29 56Z"
        fill="#E89B05"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 30C3.44772 30 3 29.5523 3 29C3 14.6406 14.6406 3 29 3C29.5523 3 30 3.44772 30 4C30 4.55228 29.5523 5 29 5C15.7452 5 5 15.7452 5 29C5 29.5523 4.55228 30 4 30Z"
        fill="#E8AA0A"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M54 28C54.5523 28 55 28.4477 55 29C55 43.3594 43.3594 55 29 55C28.4477 55 28 54.5523 28 54C28 53.4477 28.4477 53 29 53C42.2548 53 53 42.2548 53 29C53 28.4477 53.4477 28 54 28Z"
        fill="#E8AA0A"
      />
      <path
        d="M49 29C49 40.0457 40.0457 49 29 49C17.9543 49 9 40.0457 9 29C9 17.9543 17.9543 9 29 9C40.0457 9 49 17.9543 49 29Z"
        fill="#FFDD28"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M51 29C51 41.1503 41.1503 51 29 51C16.8497 51 7 41.1503 7 29C7 16.8497 16.8497 7 29 7C41.1503 7 51 16.8497 51 29ZM29 49C40.0457 49 49 40.0457 49 29C49 17.9543 40.0457 9 29 9C17.9543 9 9 17.9543 9 29C9 40.0457 17.9543 49 29 49Z"
        fill="#E89B05"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M29 46C38.3888 46 46 38.3888 46 29C46 28.4477 46.4477 28 47 28C47.5523 28 48 28.4477 48 29C48 39.4934 39.4934 48 29 48C28.4477 48 28 47.5523 28 47C28 46.4477 28.4477 46 29 46Z"
        fill="#ECC704"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M29 12C19.6112 12 12 19.6112 12 29C12 29.5523 11.5523 30 11 30C10.4477 30 10 29.5523 10 29C10 18.5066 18.5066 10 29 10C29.5523 10 30 10.4477 30 11C30 11.5523 29.5523 12 29 12Z"
        fill="#FFEF9C"
      />
      <path d="M31.3867 37H28V23.9453L23.957 25.1992V22.4453L31.0234 19.9141H31.3867V37Z" fill="#FFEF9C" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M33.3867 37C33.3867 38.1046 32.4913 39 31.3867 39H28C26.8954 39 26 38.1046 26 37V26.6596L24.5495 27.1095C23.9425 27.2977 23.2822 27.1863 22.7706 26.8093C22.259 26.4324 21.957 25.8347 21.957 25.1992V22.4453C21.957 21.6008 22.4875 20.8473 23.2826 20.5625L30.349 18.0312C30.5654 17.9537 30.7936 17.9141 31.0234 17.9141H31.3867C32.4913 17.9141 33.3867 18.8095 33.3867 19.9141V37ZM28 23.9453V37H31.3867V19.9141H31.0234L23.957 22.4453V25.1992L28 23.9453Z"
        fill="#E89B05"
      />
    </svg>
  )
}

/**
 * SecondPosition is a functional component that returns an SVG representing the second position.
 * @param props - The properties that define the size of the SVG.
 * @param props.size - The size of the SVG.
 * @returns A SVG element.
 */
const SecondPositionIcon = ({ size }: FirstPositionProps): JSX.Element => {
  return (
    <svg data-testid="second-position-icon" width={size} height={size} viewBox={'0 0 58 58'} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M56 29C56 43.9117 43.9117 56 29 56C14.0883 56 2 43.9117 2 29C2 14.0883 14.0883 2 29 2C43.9117 2 56 14.0883 56 29Z"
        fill="#BCCCD2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M58 29C58 45.0163 45.0163 58 29 58C12.9837 58 0 45.0163 0 29C0 12.9837 12.9837 0 29 0C45.0163 0 58 12.9837 58 29ZM29 56C43.9117 56 56 43.9117 56 29C56 14.0883 43.9117 2 29 2C14.0883 2 2 14.0883 2 29C2 43.9117 14.0883 56 29 56Z"
        fill="#81A5B0"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 30C3.44772 30 3 29.5523 3 29C3 14.6406 14.6406 3 29 3C29.5523 3 30 3.44772 30 4C30 4.55228 29.5523 5 29 5C15.7452 5 5 15.7452 5 29C5 29.5523 4.55228 30 4 30Z"
        fill="#D0DEE3"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M54 28C54.5523 28 55 28.4477 55 29C55 43.3594 43.3594 55 29 55C28.4477 55 28 54.5523 28 54C28 53.4477 28.4477 53 29 53C42.2548 53 53 42.2548 53 29C53 28.4477 53.4477 28 54 28Z"
        fill="#A2B9C1"
      />
      <path
        d="M49 29C49 40.0457 40.0457 49 29 49C17.9543 49 9 40.0457 9 29C9 17.9543 17.9543 9 29 9C40.0457 9 49 17.9543 49 29Z"
        fill="#C7D4D8"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M51 29C51 41.1503 41.1503 51 29 51C16.8497 51 7 41.1503 7 29C7 16.8497 16.8497 7 29 7C41.1503 7 51 16.8497 51 29ZM29 49C40.0457 49 49 40.0457 49 29C49 17.9543 40.0457 9 29 9C17.9543 9 9 17.9543 9 29C9 40.0457 17.9543 49 29 49Z"
        fill="#81A5B0"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M29 46C38.3888 46 46 38.3888 46 29C46 28.4477 46.4477 28 47 28C47.5523 28 48 28.4477 48 29C48 39.4934 39.4934 48 29 48C28.4477 48 28 47.5523 28 47C28 46.4477 28.4477 46 29 46Z"
        fill="#B5C3C8"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M29 12C19.6112 12 12 19.6112 12 29C12 29.5523 11.5523 30 11 30C10.4477 30 10 29.5523 10 29C10 18.5066 18.5066 10 29 10C29.5523 10 30 10.4477 30 11C30 11.5523 29.5523 12 29 12Z"
        fill="#D9EAEF"
      />
      <path
        d="M34.8555 37H23.1602V34.6797L28.6797 28.7969C29.4375 27.9688 29.9961 27.2461 30.3555 26.6289C30.7227 26.0117 30.9062 25.4258 30.9062 24.8711C30.9062 24.1133 30.7148 23.5195 30.332 23.0898C29.9492 22.6523 29.4023 22.4336 28.6914 22.4336C27.9258 22.4336 27.3203 22.6992 26.875 23.2305C26.4375 23.7539 26.2188 24.4453 26.2188 25.3047H22.8203C22.8203 24.2656 23.0664 23.3164 23.5586 22.457C24.0586 21.5977 24.7617 20.9258 25.668 20.4414C26.5742 19.9492 27.6016 19.7031 28.75 19.7031C30.5078 19.7031 31.8711 20.125 32.8398 20.9688C33.8164 21.8125 34.3047 23.0039 34.3047 24.543C34.3047 25.3867 34.0859 26.2461 33.6484 27.1211C33.2109 27.9961 32.4609 29.0156 31.3984 30.1797L27.5195 34.2695H34.8555V37Z"
        fill="#D9EAEF"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M36.8555 37C36.8555 38.1046 35.96 39 34.8555 39H23.1602C22.0556 39 21.1602 38.1046 21.1602 37V34.6797C21.1602 34.1713 21.3538 33.682 21.7016 33.3112L27.2124 27.4377C27.9172 26.6667 28.3691 26.0656 28.6271 25.6225L28.6367 25.6063C28.8729 25.2092 28.9062 24.9745 28.9062 24.8711C28.9062 24.6574 28.8789 24.5324 28.8592 24.4711C28.8558 24.4606 28.8526 24.4519 28.8498 24.4448C28.8178 24.4393 28.7665 24.4336 28.6914 24.4336C28.5418 24.4336 28.4791 24.4588 28.4666 24.4643C28.4587 24.4678 28.4533 24.471 28.4475 24.4754C28.4415 24.48 28.4282 24.491 28.4086 24.5142C28.343 24.5931 28.2188 24.7916 28.2188 25.3047C28.2188 26.4093 27.3233 27.3047 26.2188 27.3047H22.8203C21.7157 27.3047 20.8203 26.4093 20.8203 25.3047C20.8203 23.9347 21.1489 22.6401 21.8231 21.4631L21.8299 21.4512C22.5218 20.2619 23.5001 19.3336 24.7193 18.6807C25.9492 18.0141 27.309 17.7031 28.75 17.7031C30.8109 17.7031 32.7028 18.1987 34.1504 19.458C35.6497 20.755 36.3047 22.547 36.3047 24.543C36.3047 25.7432 35.9915 26.9071 35.4373 28.0155C34.8828 29.1246 33.9965 30.2999 32.8756 31.528C32.867 31.5374 32.8583 31.5467 32.8496 31.556L32.1728 32.2695H34.8555C35.96 32.2695 36.8555 33.165 36.8555 34.2695V37ZM27.5195 34.2695L31.3984 30.1797C32.4609 29.0156 33.2109 27.9961 33.6484 27.1211C34.0859 26.2461 34.3047 25.3867 34.3047 24.543C34.3047 23.0039 33.8164 21.8125 32.8398 20.9688C31.8711 20.125 30.5078 19.7031 28.75 19.7031C27.6016 19.7031 26.5742 19.9492 25.668 20.4414C24.7617 20.9258 24.0586 21.5977 23.5586 22.457C23.402 22.7305 23.2703 23.013 23.1635 23.3047C22.9347 23.9296 22.8203 24.5963 22.8203 25.3047H26.2188C26.2188 24.4453 26.4375 23.7539 26.875 23.2305C27.3203 22.6992 27.9258 22.4336 28.6914 22.4336C29.4023 22.4336 29.9492 22.6523 30.332 23.0898C30.7148 23.5195 30.9062 24.1133 30.9062 24.8711C30.9062 25.4258 30.7227 26.0117 30.3555 26.6289C29.9961 27.2461 29.4375 27.9688 28.6797 28.7969L23.1602 34.6797V37H34.8555V34.2695H27.5195Z"
        fill="#81A5B0"
      />
    </svg>
  )
}

/**
 * ThirdPosition component
 *
 * @param size - The size of the SVG
 * @returns SVG of the third position icon
 */
const ThirdPositionIcon = ({ size }: FirstPositionProps): JSX.Element => {
  return (
    <svg data-testid="third-position-icon" width={size} height={size} viewBox={'0 0 58 58'} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M56 29C56 43.9117 43.9117 56 29 56C14.0883 56 2 43.9117 2 29C2 14.0883 14.0883 2 29 2C43.9117 2 56 14.0883 56 29Z"
        fill="#DCA16A"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M58 29C58 45.0163 45.0163 58 29 58C12.9837 58 0 45.0163 0 29C0 12.9837 12.9837 0 29 0C45.0163 0 58 12.9837 58 29ZM29 56C43.9117 56 56 43.9117 56 29C56 14.0883 43.9117 2 29 2C14.0883 2 2 14.0883 2 29C2 43.9117 14.0883 56 29 56Z"
        fill="#C38144"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 30C3.44772 30 3 29.5523 3 29C3 14.6406 14.6406 3 29 3C29.5523 3 30 3.44772 30 4C30 4.55228 29.5523 5 29 5C15.7452 5 5 15.7452 5 29C5 29.5523 4.55228 30 4 30Z"
        fill="#F0B57F"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M54 28C54.5523 28 55 28.4477 55 29C55 43.3594 43.3594 55 29 55C28.4477 55 28 54.5523 28 54C28 53.4477 28.4477 53 29 53C42.2548 53 53 42.2548 53 29C53 28.4477 53.4477 28 54 28Z"
        fill="#CF945D"
      />
      <path
        d="M49 29C49 40.0457 40.0457 49 29 49C17.9543 49 9 40.0457 9 29C9 17.9543 17.9543 9 29 9C40.0457 9 49 17.9543 49 29Z"
        fill="#F7BA82"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M51 29C51 41.1503 41.1503 51 29 51C16.8497 51 7 41.1503 7 29C7 16.8497 16.8497 7 29 7C41.1503 7 51 16.8497 51 29ZM29 49C40.0457 49 49 40.0457 49 29C49 17.9543 40.0457 9 29 9C17.9543 9 9 17.9543 9 29C9 40.0457 17.9543 49 29 49Z"
        fill="#C38144"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M29 46C38.3888 46 46 38.3888 46 29C46 28.4477 46.4477 28 47 28C47.5523 28 48 28.4477 48 29C48 39.4934 39.4934 48 29 48C28.4477 48 28 47.5523 28 47C28 46.4477 28.4477 46 29 46Z"
        fill="#E6A66C"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M29 12C19.6112 12 12 19.6112 12 29C12 29.5523 11.5523 30 11 30C10.4477 30 10 29.5523 10 29C10 18.5066 18.5066 10 29 10C29.5523 10 30 10.4477 30 11C30 11.5523 29.5523 12 29 12Z"
        fill="#FFD5AE"
      />
      <path
        d="M26.6055 26.9688H28.4102C29.2695 26.9688 29.9062 26.7539 30.3203 26.3242C30.7344 25.8945 30.9414 25.3242 30.9414 24.6133C30.9414 23.9258 30.7344 23.3906 30.3203 23.0078C29.9141 22.625 29.3516 22.4336 28.6328 22.4336C27.9844 22.4336 27.4414 22.6133 27.0039 22.9727C26.5664 23.3242 26.3477 23.7852 26.3477 24.3555H22.9609C22.9609 23.4648 23.1992 22.668 23.6758 21.9648C24.1602 21.2539 24.832 20.6992 25.6914 20.3008C26.5586 19.9023 27.5117 19.7031 28.5508 19.7031C30.3555 19.7031 31.7695 20.1367 32.793 21.0039C33.8164 21.8633 34.3281 23.0508 34.3281 24.5664C34.3281 25.3477 34.0898 26.0664 33.6133 26.7227C33.1367 27.3789 32.5117 27.8828 31.7383 28.2344C32.6992 28.5781 33.4141 29.0938 33.8828 29.7812C34.3594 30.4688 34.5977 31.2812 34.5977 32.2188C34.5977 33.7344 34.043 34.9492 32.9336 35.8633C31.832 36.7773 30.3711 37.2344 28.5508 37.2344C26.8477 37.2344 25.4531 36.7852 24.3672 35.8867C23.2891 34.9883 22.75 33.8008 22.75 32.3242H26.1367C26.1367 32.9648 26.375 33.4883 26.8516 33.8945C27.3359 34.3008 27.9297 34.5039 28.6328 34.5039C29.4375 34.5039 30.0664 34.293 30.5195 33.8711C30.9805 33.4414 31.2109 32.875 31.2109 32.1719C31.2109 30.4688 30.2734 29.6172 28.3984 29.6172H26.6055V26.9688Z"
        fill="#FFD5AE"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24.7013 26.3555H22.9609C21.8564 26.3555 20.9609 25.46 20.9609 24.3555C20.9609 23.0853 21.308 21.8936 22.0202 20.8427L22.0229 20.8387C22.7309 19.7996 23.6972 19.0209 24.8502 18.4863L24.8564 18.4834C26.0081 17.9543 27.2494 17.7031 28.5508 17.7031C30.663 17.7031 32.59 18.2122 34.0825 19.4751C35.62 20.7679 36.3281 22.5502 36.3281 24.5664C36.3281 25.7867 35.9461 26.9139 35.2316 27.8979C35.1853 27.9615 35.1381 28.0242 35.09 28.0858C35.2473 28.2616 35.3946 28.4489 35.5308 28.6481C36.2639 29.7085 36.5977 30.9277 36.5977 32.2188C36.5977 34.2933 35.8048 36.0876 34.2082 37.4045C32.6597 38.6883 30.7068 39.2344 28.5508 39.2344C26.483 39.2344 24.6075 38.6813 23.0923 37.4277L23.0868 37.4232C21.5261 36.1226 20.75 34.3589 20.75 32.3242C20.75 31.2196 21.6454 30.3242 22.75 30.3242H24.734C24.6509 30.1044 24.6055 29.8661 24.6055 29.6172V26.9688C24.6055 26.7548 24.6391 26.5487 24.7013 26.3555ZM28.0082 31.6172C28.0912 31.837 28.1367 32.0753 28.1367 32.3242C28.1367 32.3409 28.1374 32.3537 28.1383 32.363C28.1399 32.3645 28.1417 32.3661 28.1437 32.3678C28.2269 32.4359 28.3513 32.5039 28.6328 32.5039C28.8634 32.5039 29.0009 32.4734 29.072 32.4495C29.1313 32.4296 29.1507 32.4128 29.1558 32.4082M28.0082 31.6172H28.3984C28.8955 31.6172 29.0981 31.7026 29.1534 31.7323C29.1546 31.7354 29.156 31.739 29.1576 31.7432C29.1763 31.7942 29.2109 31.9244 29.2109 32.1719C29.2109 32.3034 29.1899 32.3595 29.1856 32.3702C29.1829 32.3768 29.1809 32.3801 29.179 32.3828C29.1771 32.3856 29.1704 32.3945 29.1558 32.4082M32.9336 35.8633C34.043 34.9492 34.5977 33.7344 34.5977 32.2188C34.5977 31.2812 34.3594 30.4688 33.8828 29.7812C33.8056 29.6681 33.7218 29.5595 33.6313 29.4557C33.172 28.9286 32.541 28.5215 31.7383 28.2344C32.4617 27.9056 33.0552 27.4435 33.5189 26.8481C33.551 26.8069 33.5825 26.7651 33.6133 26.7227C34.0898 26.0664 34.3281 25.3477 34.3281 24.5664C34.3281 23.0508 33.8164 21.8633 32.793 21.0039C31.7695 20.1367 30.3555 19.7031 28.5508 19.7031C27.5117 19.7031 26.5586 19.9023 25.6914 20.3008C24.832 20.6992 24.1602 21.2539 23.6758 21.9648C23.5896 22.092 23.5112 22.2222 23.4406 22.3555C23.1208 22.9592 22.9609 23.6259 22.9609 24.3555H26.3477C26.3477 23.7852 26.5664 23.3242 27.0039 22.9727C27.4414 22.6133 27.9844 22.4336 28.6328 22.4336C29.3516 22.4336 29.9141 22.625 30.3203 23.0078C30.7344 23.3906 30.9414 23.9258 30.9414 24.6133C30.9414 25.3242 30.7344 25.8945 30.3203 26.3242C29.9062 26.7539 29.2695 26.9688 28.4102 26.9688H26.6055V29.6172H28.3984C30.2734 29.6172 31.2109 30.4688 31.2109 32.1719C31.2109 32.875 30.9805 33.4414 30.5195 33.8711C30.0664 34.293 29.4375 34.5039 28.6328 34.5039C27.9297 34.5039 27.3359 34.3008 26.8516 33.8945C26.375 33.4883 26.1367 32.9648 26.1367 32.3242H22.75C22.75 33.0633 22.8851 33.73 23.1552 34.3242C23.4247 34.9172 23.8287 35.438 24.3672 35.8867C25.4531 36.7852 26.8477 37.2344 28.5508 37.2344C30.3711 37.2344 31.832 36.7773 32.9336 35.8633ZM28.2519 24.9688C28.3023 24.812 28.3339 24.6468 28.3441 24.4758C28.397 24.4541 28.4845 24.4336 28.6328 24.4336C28.7923 24.4336 28.886 24.4521 28.9315 24.465C28.9365 24.4963 28.9414 24.5446 28.9414 24.6133C28.9414 24.7752 28.9179 24.8594 28.9062 24.8918C28.9034 24.8994 28.9008 24.9056 28.8984 24.9107C28.8966 24.9113 28.8948 24.9119 28.8928 24.9126C28.8287 24.9342 28.68 24.9688 28.4102 24.9688H28.2519Z"
        fill="#C28044"
      />
    </svg>
  )
}

export { FirstPositionIcon, SecondPositionIcon, ThirdPositionIcon }
