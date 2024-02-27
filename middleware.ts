import cookie from 'cookie'
import { jwtDecode } from 'jwt-decode'
import { NextRequest, NextResponse } from 'next/server'

import { requestBeryxApiToken } from '@/api-client/auth'
import { cookieAuthExpirationInSeconds, cookieAuthTokenName } from '@/config/config'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  let authToken: string | null

  try {
    const parsedCookies = cookie.parse(request.headers.get('cookie') ?? '')

    authToken = parsedCookies[cookieAuthTokenName]
    const decoded = jwtDecode(authToken)
    const currentTimestamp = Math.floor(Date.now() / 1000)

    // Check if the decoded token has expired
    if (!decoded || !('exp' in decoded) || decoded.exp === undefined || decoded.exp < currentTimestamp) {
      // If the token has expired or decoded is null, clear it, so it is automatically renewed
      authToken = null
    }
  } catch (error) {
    authToken = null
  }

  if (!authToken) {
    // Get a new token for this user
    authToken = await requestBeryxApiToken()

    const response = NextResponse.next()

    // Set the cookie to expire in 12 hours
    const expiryDate = new Date()
    expiryDate.setSeconds(expiryDate.getSeconds() + cookieAuthExpirationInSeconds)
    response.cookies.set(cookieAuthTokenName, authToken, { expires: expiryDate })

    return response
  }

  return NextResponse.next()
}

// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: '/about/:path*',
// }
