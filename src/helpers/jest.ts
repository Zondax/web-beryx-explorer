import { setCookie } from 'cookies-next'

import { requestBeryxApiToken } from '@/api-client/auth'
import { cookieAuthTokenName } from '@/config/config'
import { act, renderHook } from '@testing-library/react'

/**
 * Helper function for hooks in testing.
 * @param callback - The callback function to be executed.
 * @returns A function that rerenders and returns the current result.
 */
export const hookHelper = (callback: any) => {
  const { result, rerender } = renderHook(() => callback())
  return () => {
    rerender()
    return result.current
  }
}

/**
 * Helper function to advance timers by a specified time.
 * @param time - The time in milliseconds to advance the timers.
 */
export const advanceTimersByTimeHelper = (time: number) => {
  act(() => {
    jest.advanceTimersByTime(time)
  })
}

/**
 * Sets the test authentication token.
 * @async
 */
export const setTestAuthToken = async () => {
  const beryxAuthToken = await requestBeryxApiToken()

  if (typeof window !== 'undefined') {
    setCookie(cookieAuthTokenName, beryxAuthToken)
  } else {
    if (!beryxAuthToken) {
      throw new Error('either you need to set a fix beryx auth token or set cloudflare credentials to generate one')
    }
  }
}
