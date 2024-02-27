import { getCookie } from 'cookies-next'

import { cookieAuthTokenName } from '@/config/config'
import { useQuery } from '@tanstack/react-query'

import { BeryxToken } from './auth'

/**
 * Fetches the list of all supported currencies from the API
 */
export const fetchBeryxApiToken = async (): Promise<BeryxToken> => {
  if (typeof window !== 'undefined') {
    const token = getCookie(cookieAuthTokenName) as BeryxToken
    if (token) {
      return token
    }
    throw new Error('No token found in cookies')
  }

  const { requestBeryxApiToken } = await import('./auth')
  const token = await requestBeryxApiToken()
  if (token) {
    return token
  }
  throw new Error('No token returned from requestBeryxApiToken')
}

/**
 * useBeryxApiToken is a custom hook that fetches a Beryx Api Token
 * @returns The token as BeryxToken
 */
export const useBeryxApiToken = () => {
  return useQuery({
    queryFn: fetchBeryxApiToken,
    queryKey: ['beryx-api-token'],
    // staleTime: 1000 * 30,
    retry: true,
  })
}
