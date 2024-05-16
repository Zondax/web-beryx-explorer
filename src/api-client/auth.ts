import { getBeryxUrl, servicePaths } from '@/config/config'
import { Networks } from '@/config/networks'
import { captureException } from '@sentry/nextjs'

/**
 * Represents a Beryx token.
 * We are branding the string type with a unique symbol to make it impossible
 * to assign a string to a BeryxToken unless explictely with as BeryxToken.
 */
export type BeryxToken = string & { readonly __brand: unique symbol }

/**
 * Retrieves a Beryx API token using client credentials.
 *
 * This function makes an HTTP POST request to the Beryx API endpoint
 * to retrieve an access token. The client ID and client secret are
 * provided as headers in the request.
 *
 * @returns A promise that resolves to the Beryx API token as a string.
 * If the request is successful and returns a status code of 200, the
 * token is extracted from the response and returned. Otherwise, an
 * empty string is returned.
 *
 */
export const requestBeryxApiToken = async (): Promise<BeryxToken> => {
  if (Boolean(process.env.BERYX_API_TOKEN)) {
    return process.env.BERYX_API_TOKEN as BeryxToken
  }

  if (
    Boolean(process.env.NEXT_PUBLIC_BERYX_ENV) &&
    process.env.NEXT_PUBLIC_BERYX_ENV === 'pre' &&
    Boolean(process.env.NEXT_PUBLIC_BERYX_TOKEN_PRE)
  ) {
    return process.env.NEXT_PUBLIC_BERYX_TOKEN_PRE as BeryxToken
  }

  const network = Networks.mainnet
  const response = await fetch(getBeryxUrl(network.chainSlug, network.name).baseProtectedApiUrl + servicePaths.getBeryxApiToken, {
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

  if (!response.ok) {
    captureException(new Error(`Failed to get Beryx API token: ${response.status} ${response.statusText}`))
    throw new Error(`Failed to get Beryx API token: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()
  return data.token
}
