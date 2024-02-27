import { ConnectionOptions, credsAuthenticator } from 'nats.ws'

export const DELAY_BETWEEN_CONNECTIONS = 30000

/**
 * @description Function to get NATS connection options.
 * @throws Will throw an error if the NATS server credential or NATS server is not set.
 * @returns The NATS connection options.
 */
export function getNatsConnectionOptions(): ConnectionOptions {
  if (!process.env.NEXT_PUBLIC_NAT_SERVER_CREDENTIAL) {
    throw new Error('NEXT_PUBLIC_NAT_SERVER_CREDENTIAL is not set')
  }

  if (!process.env.NEXT_PUBLIC_NAT_SERVER) {
    throw new Error('NEXT_PUBLIC_NAT_SERVER is not set')
  }

  const credsString = Buffer.from(process.env.NEXT_PUBLIC_NAT_SERVER_CREDENTIAL, 'base64').toString()
  const credsContent = new TextEncoder().encode(credsString)
  const authenticator = credsAuthenticator(credsContent)

  return {
    authenticator,
    pingInterval: 2000,
    maxReconnectAttempts: -1,
    reconnect: true,
    verbose: false,
    debug: false,
    servers: [process.env.NEXT_PUBLIC_NAT_SERVER],
  }
}
