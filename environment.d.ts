// noinspection JSUnusedGlobalSymbols

export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CI: boolean
      CLOUDFLARE_PROTECTED_API_CLIENT_ID: string
      CLOUDFLARE_PROTECTED_API_CLIENT_SECRET: string
      CLOUDFLARE_TURNSTILE_SECRET_KEY: string
      GHOST_API_KEY: string
      GHOST_API_URL: string
      NEXT_PUBLIC_BERYX_CALIBRATION_PRE_URL: string
      NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY: string
      NEXT_PUBLIC_GA_TRACKING_ID: string
      NEXT_PUBLIC_GTM_TRACKING_ID: string
      NEXT_PUBLIC_MUI_GRID_LICENSE: string
      NEXT_PUBLIC_NAT_SERVER_CREDENTIAL: string
      NEXT_PUBLIC_NAT_SERVER: string
      NEXT_PUBLIC_SENTRY_DSN: string
      PLAYWRIGHT_CONFIG: string
    }
  }
}
