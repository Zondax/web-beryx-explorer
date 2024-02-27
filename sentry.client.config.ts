// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/
import * as Sentry from '@sentry/nextjs'

import { SENTRY_DSN, sentryIsDev } from './sentry.common'

const breadcrumbsToConsole = false

Sentry.init({
  dsn: SENTRY_DSN,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: sentryIsDev,

  // Environments are case sensitive. The environment name can't contain newlines, spaces or forward slashes, can't be the string "None", or exceed 64 characters.
  environment: process.env.NODE_ENV ?? 'unknown',

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1,

  replaysOnErrorSampleRate: 0.1,

  // This sets the sample rate to be 1%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.01,

  // Only report events to Sentry when not in development
  beforeSend(event: Sentry.Event) {
    if (!sentryIsDev) {
      return null
    }

    switch (event.level) {
      case 'error':
        // eslint-disable-next-line no-console
        console.error(event)
        break
      case 'warning':
        // eslint-disable-next-line no-console
        console.warn(event)
        break
      case 'info':
        // eslint-disable-next-line no-console
        console.info(event)
        break
      default:
        // eslint-disable-next-line no-console
        console.log(event)
    }

    return event // Continue with sending the event
  },
  beforeBreadcrumb(breadcrumb: Sentry.Breadcrumb) {
    if (sentryIsDev && breadcrumbsToConsole) {
      switch (breadcrumb.level) {
        case 'error':
          // eslint-disable-next-line no-console
          console.error(breadcrumb)
          break
        case 'warning':
          // eslint-disable-next-line no-console
          console.warn(breadcrumb)
          break
        case 'info':
          // eslint-disable-next-line no-console
          console.info(breadcrumb)
          break
        default:
          // eslint-disable-next-line no-console
          console.log(breadcrumb)
      }
    }

    return breadcrumb
  },

  // You can remove this option if you're not planning to use the Sentry Session Replay feature:
  // integrations: [
  //   new Sentry.Replay({
  //     // Additional Replay configuration goes in here, for example:
  //     maskAllText: true,
  //     blockAllMedia: true,
  //   }),
  // ],
})
