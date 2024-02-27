/**
 * @module turnstile
 * @description This module provides a utility function for verifying tokens using Cloudflare's turnstile service.
 */
import axios from 'axios'

export const CloudflareUrl = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

/**
 * @function checkTurnstileToken
 * @description This function checks the validity of a token using Cloudflare's turnstile service.
 * @param secretKey - The secret key for the turnstile service.
 * @param token - The token to be verified.
 * @returns - Returns a promise that resolves to a boolean indicating the validity of the token.
 */
export async function checkTurnstileToken(secretKey: string, token: string): Promise<boolean> {
  const form = new URLSearchParams()
  form.append('secret', secretKey)
  form.append('response', token)
  form.append('remoteip', '')

  const result = await axios.post(CloudflareUrl, form)

  return result.data.success
}
