/**
 * Import dependencies
 */
import React from 'react'

/**
 * Props type definition
 * @property size - Dimensions of the logo
 * @property [color='#1A1B1F'] - Color of the logo, default value is '#1A1B1F'
 */
interface BeryxLogoProps {
  size: number
  color?: string
}

/**
 * BeryxLogo Component
 * Beautifully crafted custom logo component for Beryx
 * @param props - Properties passed to component
 * @returns {JSX.Element}
 */
const BeryxLogo = ({ size, color = '#1A1B1F' }: BeryxLogoProps): JSX.Element => {
  return (
    <svg
      data-testid="beryx-icon"
      width={(size * 169) / 52}
      height={size}
      viewBox="0 0 169 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.223145 25.1441L2.43215 27.3593L8.95453 20.8188L8.91027 33.8511L12.1131 37.0628L12.2017 13.1326L0.223145 25.1441Z"
        fill={color}
      />
      <path d="M16.2883 9.03324L16.1716 41.1338L19.5998 44.5714L19.7406 5.57141L16.2883 9.03324Z" fill={color} />
      <path
        d="M23.5386 27.9402L25.2646 29.671L27.0029 27.9281L27.1719 20.4436L25.4538 18.7208L23.7076 20.4719L23.5386 27.9443V27.9402Z"
        fill={color}
      />
      <path
        d="M30.0776 31.975L31.8037 33.7058L33.542 31.9629L33.711 16.4088L31.9929 14.686L30.2466 16.4371L30.0776 31.9789V31.975Z"
        fill={color}
      />
      <path
        d="M65.4451 39.7355C63.6203 39.7355 62.0131 39.3542 60.624 38.5915C59.2348 37.8016 58.1454 36.6712 57.3554 35.2003C56.5656 33.7295 56.1434 31.9318 56.0888 29.8072H56.8651V39H51.6763V9.17432H58.2134V24.3323L56.6608 26.2935C56.7426 24.0328 57.1649 22.1396 57.9274 20.6143C58.7174 19.0617 59.7933 17.9041 61.1551 17.1415C62.5171 16.3516 64.0697 15.9566 65.8128 15.9566C67.3383 15.9566 68.7137 16.2426 69.9394 16.8146C71.1924 17.3594 72.2547 18.1493 73.1263 19.1843C73.998 20.1922 74.6653 21.3906 75.1283 22.7797C75.6185 24.1689 75.8637 25.6806 75.8637 27.3149V28.2138C75.8637 29.848 75.6185 31.3598 75.1283 32.7489C74.6653 34.138 73.9707 35.3638 73.0445 36.426C72.1457 37.461 71.0563 38.2782 69.776 38.8775C68.4958 39.4495 67.0523 39.7355 65.4451 39.7355ZM63.7291 34.2606C64.846 34.2606 65.8128 33.9882 66.63 33.4435C67.4744 32.8988 68.1281 32.136 68.5911 31.1555C69.0543 30.1476 69.2857 29.0173 69.2857 27.7643C69.2857 26.4842 69.0543 25.3673 68.5911 24.414C68.1281 23.4608 67.4744 22.7253 66.63 22.2077C65.8128 21.663 64.846 21.3906 63.7291 21.3906C62.7486 21.3906 61.8226 21.6222 60.9508 22.0852C60.0793 22.5482 59.3711 23.2156 58.8263 24.0872C58.3089 24.9316 58.05 25.9666 58.05 27.1923V28.704C58.05 29.8753 58.3224 30.883 58.8671 31.7275C59.4391 32.5446 60.161 33.171 61.0326 33.6069C61.9043 34.0428 62.8032 34.2606 63.7291 34.2606ZM90.6592 39.7763C88.7524 39.7763 87.0637 39.4495 85.5929 38.7958C84.1491 38.142 82.9372 37.2705 81.9566 36.1809C81.0031 35.0642 80.2677 33.8247 79.7503 32.4629C79.26 31.0738 79.0149 29.6573 79.0149 28.2138V27.3966C79.0149 25.8985 79.26 24.4685 79.7503 23.1066C80.2677 21.7175 81.0031 20.4782 81.9566 19.3886C82.9099 18.2991 84.0947 17.4411 85.5112 16.8146C86.9547 16.1609 88.589 15.834 90.414 15.834C92.8109 15.834 94.8266 16.3788 96.4609 17.4683C98.1223 18.5306 99.3889 19.9333 100.261 21.6766C101.132 23.3926 101.568 25.272 101.568 27.3149V29.5212H81.7523V25.8032H97.6049L95.4803 27.5192C95.4803 26.1845 95.2896 25.0405 94.9083 24.0872C94.5269 23.1339 93.9549 22.412 93.1923 21.9217C92.4569 21.4042 91.5307 21.1455 90.414 21.1455C89.27 21.1455 88.303 21.4042 87.5132 21.9217C86.7231 22.4393 86.124 23.2019 85.7155 24.2098C85.3069 25.1903 85.1026 26.4025 85.1026 27.846C85.1026 29.1808 85.2931 30.3519 85.6746 31.3598C86.0559 32.3403 86.6552 33.1031 87.4723 33.6478C88.2895 34.1925 89.3517 34.4649 90.6592 34.4649C91.8576 34.4649 92.8382 34.2333 93.6009 33.7703C94.3634 33.3073 94.881 32.7353 95.1535 32.0543H101.159C100.833 33.5525 100.192 34.887 99.2392 36.0583C98.2857 37.2296 97.0873 38.142 95.6437 38.7958C94.2 39.4495 92.5386 39.7763 90.6592 39.7763ZM105.9 39V16.6103H111.089V26.2118H110.966C110.966 23.0522 111.633 20.6143 112.968 18.8983C114.33 17.1823 116.291 16.3243 118.852 16.3243H119.71V21.9626H118.075C116.278 21.9626 114.888 22.4529 113.908 23.4335C112.927 24.3867 112.437 25.7759 112.437 27.6009V39H105.9ZM123.49 47.866V42.3095H128.147C128.856 42.3095 129.455 42.2142 129.945 42.0235C130.435 41.86 130.83 41.574 131.13 41.1655C131.43 40.7569 131.675 40.1985 131.865 39.4903L137.381 16.6103H143.591L137.34 40.7978C136.904 42.5411 136.292 43.9302 135.502 44.9652C134.739 46.0002 133.704 46.7356 132.397 47.1715C131.116 47.6345 129.482 47.866 127.494 47.866H123.49ZM130.517 38.5098V33.4026H135.257V38.5098H130.517ZM127.821 38.5098L120.957 16.6103H127.535L134.031 38.5098H127.821ZM144.544 39L151.49 26.988L151.326 28.0095L144.789 16.6103H151.857L155.902 24.2098H156.556L160.356 16.6103H167.015L160.764 28.0912L160.928 27.2332L168.282 39H161.173L156.352 30.8695H155.698L151.163 39H144.544Z"
        fill={color}
      />
    </svg>
  )
}

/** Default Export */
export default BeryxLogo
