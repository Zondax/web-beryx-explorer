// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/
import * as Sentry from '@sentry/nextjs'

import { SENTRY_DSN, sentryIsDev } from './sentry.common'

Sentry.init({
  dsn: SENTRY_DSN,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: sentryIsDev,

  // Environments are case sensitive. The environment name can't contain newlines, spaces or forward slashes, can't be the string "None", or exceed 64 characters.
  environment: process.env.NODE_ENV ?? 'unknown',

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 0.1,

  // Only report events to Sentry when not in development
  beforeSend(event) {
    if (sentryIsDev) {
      // eslint-disable-next-line no-console
      console.log(event)
      return null
    }
    return event // Continue with sending the event
  },
})
