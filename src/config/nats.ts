import { ConnectionOptions, credsAuthenticator } from 'nats.ws'

export const DELAY_BETWEEN_CONNECTIONS = 30000

/**
 * @description Function to get NATS connection options.
 * @throws Will throw an error if the NATS server credential or NATS server is not set.
 * @returns The NATS connection options.
 */
export function getNatsConnectionOptions(): ConnectionOptions {
  let natsServer: string | undefined
  let natsServerCredential: string | undefined

  if (process.env.NEXT_PUBLIC_NAT_ENV === 'pre') {
    natsServer = process.env.NEXT_PUBLIC_NAT_SERVER_PRE
    natsServerCredential = process.env.NEXT_PUBLIC_NAT_SERVER_PRE_CREDENTIAL
  } else {
    natsServer = process.env.NEXT_PUBLIC_NAT_SERVER
    natsServerCredential = process.env.NEXT_PUBLIC_NAT_SERVER_CREDENTIAL
  }

  if (!natsServerCredential) {
    throw new Error('NEXT_PUBLIC_NAT_SERVER_CREDENTIAL is not set')
  }

  if (!natsServer) {
    throw new Error('NEXT_PUBLIC_NAT_SERVER is not set')
  }

  const credsString = Buffer.from(natsServerCredential, 'base64').toString()
  const credsContent = new TextEncoder().encode(credsString)
  const authenticator = credsAuthenticator(credsContent)

  return {
    authenticator,
    pingInterval: 2000,
    maxReconnectAttempts: -1,
    reconnect: true,
    verbose: false,
    debug: false,
    servers: [natsServer],
  }
}
