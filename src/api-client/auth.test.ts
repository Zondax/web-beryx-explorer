import { getBeryxUrl, servicePaths } from '@/config/config'
import { Networks } from '@/config/networks'

import { requestBeryxApiToken } from './auth'

describe('requestBeryxApiToken', () => {
  // Returns a Beryx API token when the request is successful and returns a status code of 200.
  it('should return a Beryx API token when the request is successful and returns a status code of 200', async () => {
    const token = 'testToken'
    const response = { ok: true, json: jest.fn().mockResolvedValue({ token }) }
    const fetch = jest.fn().mockResolvedValue(response)
    const network = Networks.mainnet
    global.fetch = fetch

    const result = await requestBeryxApiToken()

    expect(fetch).toHaveBeenCalledWith(getBeryxUrl(network.chainSlug, network.name).baseProtectedApiUrl + servicePaths.getBeryxApiToken, {
      method: 'POST',
      headers: {
        'CF-Access-Client-Id': process.env.CLOUDFLARE_PROTECTED_API_CLIENT_ID ?? '',
        'CF-Access-Client-Secret': process.env.CLOUDFLARE_PROTECTED_API_CLIENT_SECRET ?? '',
      },
      body: JSON.stringify({
        name: 'beryxExplorer',
        email: 'beryxExplorer@zondax.ch',
      }),
    })
    expect(response.json).toHaveBeenCalled()
    expect(result).toBe(token)
  })

  // The client ID and client secret are provided as headers in the request.
  it('should provide the client ID and client secret as headers in the request', async () => {
    const token = 'testToken'
    const response = { ok: true, json: jest.fn().mockResolvedValue({ token }) }
    const network = Networks.mainnet
    const fetch = jest.fn().mockResolvedValue(response)
    global.fetch = fetch

    await requestBeryxApiToken()

    expect(fetch).toHaveBeenCalledWith(getBeryxUrl(network.chainSlug, network.name).baseProtectedApiUrl + servicePaths.getBeryxApiToken, {
      method: 'POST',
      headers: {
        'CF-Access-Client-Id': process.env.CLOUDFLARE_PROTECTED_API_CLIENT_ID ?? '',
        'CF-Access-Client-Secret': process.env.CLOUDFLARE_PROTECTED_API_CLIENT_SECRET ?? '',
      },
      body: JSON.stringify({
        name: 'beryxExplorer',
        email: 'beryxExplorer@zondax.ch',
      }),
    })
  })

  // The function makes an HTTP POST request to the Beryx API endpoint to retrieve an access token.
  it('should make an HTTP POST request to the Beryx API endpoint to retrieve an access token', async () => {
    const token = 'testToken'
    const response = { ok: true, json: jest.fn().mockResolvedValue({ token }) }
    const network = Networks.mainnet
    const fetch = jest.fn().mockResolvedValue(response)
    global.fetch = fetch

    await requestBeryxApiToken()

    expect(fetch).toHaveBeenCalledWith(getBeryxUrl(network.chainSlug, network.name).baseProtectedApiUrl + servicePaths.getBeryxApiToken, {
      method: 'POST',
      headers: {
        'CF-Access-Client-Id': process.env.CLOUDFLARE_PROTECTED_API_CLIENT_ID ?? '',
        'CF-Access-Client-Secret': process.env.CLOUDFLARE_PROTECTED_API_CLIENT_SECRET ?? '',
      },
      body: JSON.stringify({
        name: 'beryxExplorer',
        email: 'beryxExplorer@zondax.ch',
      }),
    })
  })

  // Throws an error if the response is not ok.
  it('should throw an error if the response is not ok', async () => {
    const response = { ok: false, status: 400, statusText: 'Bad Request' }
    global.fetch = jest.fn().mockResolvedValue(response)
    await expect(requestBeryxApiToken()).rejects.toThrowError(`Failed to get Beryx API token: ${response.status} ${response.statusText}`)
  })

  // The function uses process.env.CLOUDFLARE_PROTECTED_API_CLIENT_ID and process.env.CLOUDFLARE_PROTECTED_API_CLIENT_SECRET as headers in the request.
  it('should use process.env.CLOUDFLARE_PROTECTED_API_CLIENT_ID and process.env.CLOUDFLARE_PROTECTED_API_CLIENT_SECRET as headers in the request', async () => {
    const token = 'testToken'
    const response = { ok: true, json: jest.fn().mockResolvedValue({ token }) }
    const network = Networks.mainnet
    const fetch = jest.fn().mockResolvedValue(response)
    global.fetch = fetch

    await requestBeryxApiToken()

    expect(fetch).toHaveBeenCalledWith(getBeryxUrl(network.chainSlug, network.name).baseProtectedApiUrl + servicePaths.getBeryxApiToken, {
      method: 'POST',
      headers: {
        'CF-Access-Client-Id': process.env.CLOUDFLARE_PROTECTED_API_CLIENT_ID ?? '',
        'CF-Access-Client-Secret': process.env.CLOUDFLARE_PROTECTED_API_CLIENT_SECRET ?? '',
      },
      body: JSON.stringify({
        name: 'beryxExplorer',
        email: 'beryxExplorer@zondax.ch',
      }),
    })
  })
})
