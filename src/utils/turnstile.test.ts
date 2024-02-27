import axios from 'axios'

import { checkTurnstileToken } from './turnstile'

describe('checkTurnstileToken', () => {
  // Returns true when a valid token is provided.
  it('should return true when a valid token is provided', async () => {
    // Mock the axios.post method to return a successful response
    jest.spyOn(axios, 'post').mockResolvedValue({ data: { success: true } })

    // Call the checkTurnstileToken function with a valid token
    const result = await checkTurnstileToken('secretKey', 'validToken')

    // Expect the result to be true
    expect(result).toBe(true)
  })

  // Returns false when an invalid token is provided.
  it('should return false when an invalid token is provided', async () => {
    // Mock the axios.post method to return an unsuccessful response
    jest.spyOn(axios, 'post').mockResolvedValue({ data: { success: false } })

    // Call the checkTurnstileToken function with an invalid token
    const result = await checkTurnstileToken('secretKey', 'invalidToken')

    // Expect the result to be false
    expect(result).toBe(false)
  })

  // Returns false when an empty token is provided.
  it('should return false when an empty token is provided', async () => {
    // Call the checkTurnstileToken function with an empty token
    const result = await checkTurnstileToken('secretKey', '')

    // Expect the result to be false
    expect(result).toBe(false)
  })

  // Returns false when an empty secret key is provided.
  it('should return false when an empty secret key is provided', async () => {
    // Call the checkTurnstileToken function with an empty secret key
    const result = await checkTurnstileToken('', 'token')

    // Expect the result to be false
    expect(result).toBe(false)
  })

  // Throws an error when the Cloudflare service is down or unreachable.
  it('should throw an error when the Cloudflare service is down or unreachable', async () => {
    // Mock the axios.post method to throw an error
    jest.spyOn(axios, 'post').mockRejectedValue(new Error('Cloudflare service is down'))

    // Call the checkTurnstileToken function
    await expect(checkTurnstileToken('secretKey', 'token')).rejects.toThrow('Cloudflare service is down')
  })
})
