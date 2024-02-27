import axios from 'axios'

import { fetchBeryxApiToken } from '@/api-client/apiTokens'

/**
 * @description Function to create an authenticated axios instance.
 * @returns An axios instance with the Authorization header set.
 */
export const authenticatedREST = async (headers?: { 'Content-Type'?: string }) => {
  const authToken = await fetchBeryxApiToken()
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
      ...headers,
    },
  }

  return axios.create(config)
}
