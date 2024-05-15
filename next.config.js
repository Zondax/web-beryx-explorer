// noinspection JSCheckFunctionSignatures

/** @type {import("next").NextConfig} */

// Define common security policy
const commonContentSecurityPolicy = {
  'default-src': "'self' https://zondax.ch",
  'img-src':
    "'self' https://zondax.ch https://zondax.dev https://opengraph.githubassets.com https://ethglobal.com https://static-production.npmjs.com https://user-images.githubusercontent.com blob: data: https://media.marker.io https://app.marker.io https://edge.marker.io https://storage.googleapis.com https://www.cookbook.dev https://github.githubassets.com https://plabs-assets.s3.us-west-1.amazonaws.com https://devconnect.org https://ethindia.co https://linktr.ee/filecoinio https://docs.filecoin.io https://filecoin.io https://avatars.githubusercontent.com https://social-images.lu.ma https://img.evbuc.com",
  'media-src': "'self'  https://media.marker.io https://app.marker.io https://edge.marker.io",
  'script-src':
    "'self' 'unsafe-eval' 'unsafe-inline' https://challenges.cloudflare.com https://edge.marker.io https://app.marker.io https://api.zondax.ch https://www.google-analytics.com https://cdn.jsdelivr.net",
  'style-src': "'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net",
  'connect-src':
    "'self' https://api.zondax.ch https://api.zondax.dev https://api.zondax.net wss://stream.zondax.ch wss://stream.zondax.net wss://stream.zondax.dev https://api.marker.io https://ssr.marker.io https://api.coingecko.com",
  'worker-src': "'self' blob:",
  'font-src': "'self' https://fonts.gstatic.com https://cdn.jsdelivr.net https://app.marker.io https://edge.marker.io",
  'frame-src': 'https://challenges.cloudflare.com https://app.marker.io',
  'child-src': 'https://challenges.cloudflare.com https://app.marker.io',
  'frame-ancestors': "'none'",
  'form-action': ' https://app.marker.io https://api.marker.io',
}

// Define environment specific security policies
const devContentSecurityPolicy = { ...commonContentSecurityPolicy }

const previewContentSecurityPolicy = {
  ...commonContentSecurityPolicy,
  'connect-src':
    commonContentSecurityPolicy['connect-src'] +
    ' https://vercel.live/ https://vercel.com https://sockjs-us3.pusher.com/ wss://ws-us3.pusher.com/',
  'font-src': commonContentSecurityPolicy['font-src'] + ' https://assets.vercel.com',
  'img-src':
    commonContentSecurityPolicy['img-src'] +
    ' https://vercel.live/ https://vercel.com https://assets.vercel.com/ https://sockjs-us3.pusher.com/ data: blob:',
  'script-src': commonContentSecurityPolicy['script-src'] + ' https://vercel.live/ https://vercel.com',
  'frame-src': commonContentSecurityPolicy['frame-src'] + ' https://vercel.live/ https://vercel.com',
  'report-to': process.env.NEXT_PUBLIC_CSP_SENTRY_REPORT_URL,
  'report-uri': process.env.NEXT_PUBLIC_CSP_SENTRY_REPORT_URL,
}

const prodContentSecurityPolicy = {
  ...commonContentSecurityPolicy,
  'script-src': commonContentSecurityPolicy['script-src'] + ' https://*.googletagmanager.com',
  'report-to': process.env.NEXT_PUBLIC_CSP_SENTRY_REPORT_URL,
  'report-uri': process.env.NEXT_PUBLIC_CSP_SENTRY_REPORT_URL,
  'img-src':
    commonContentSecurityPolicy['img-src'] +
    ' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://*.g.doubleclick.net https://*.google.com',
  'style-src': commonContentSecurityPolicy['style-src'] + ' https://tagmanager.google.com https://fonts.googleapis.com',
  'font-src': commonContentSecurityPolicy['font-src'] + ' https://fonts.gstatic.com data:',
  'connect-src':
    commonContentSecurityPolicy['connect-src'] +
    ' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://*.g.doubleclick.net https://*.google.com',
}

// Assign the appropriate security policy based on the environment
let contentSecurityPolicy = prodContentSecurityPolicy

if (process.env.NODE_ENV === 'development') {
  contentSecurityPolicy = devContentSecurityPolicy
} else if (process.env.VERCEL_ENV === 'preview') {
  contentSecurityPolicy = previewContentSecurityPolicy
}

// noinspection JSUnusedLocalSymbols
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static-production.npmjs.com',
      },
      {
        protocol: 'https',
        hostname: 'plabs-assets.s3.us-west-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'framerusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'ethindia.co',
      },
      {
        protocol: 'https',
        hostname: 'devconnect.org',
      },
      {
        protocol: 'https',
        hostname: 'opengraph.githubassets.com',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'user-images.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'docs.filecoin.io',
      },
      {
        protocol: 'https',
        hostname: 'linktr.ee',
      },
      {
        protocol: 'https',
        hostname: 'filecoin.io',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'social-images.lu.ma',
      },
      {
        protocol: 'https',
        hostname: 'img.evbuc.com',
      },
    ],
  },
  // eslint-disable-next-line require-await
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Content-Security-Policy',
            value: Object.entries(contentSecurityPolicy)
              .map(([directive, value]) => `${directive} ${value}`)
              .join('; '),
          },
          {
            key: 'X-XSS-Protection',
            value: '0',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ]
  },
  // eslint-disable-next-line require-await
  async redirects() {
    return [
      {
        source: '/v1/explore/fil/mainnet/address/:address',
        destination: 'https://filfox.info/en/address/:address',
        permanent: false,
      },
      {
        source: '/v1/explore/fil/mainnet/transactions/:transaction',
        destination: 'https://filfox.info/en/message/:transaction',
        permanent: false,
      },
      {
        source: '/search',
        destination: '/',
        permanent: true,
      },
      {
        source: '/search/fil/:network*/account/:value*',
        destination: '/search/fil/:network*/address/:value*',
        permanent: true,
      },
      {
        source: '/v1/search/fil/:network*/:type/:value*',
        destination: '/search/fil/:network*/:type/:value*',
        permanent: true,
      },
      {
        source: '/v1/mempool',
        destination: '/mempool',
        permanent: true,
      },
    ]
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    if (process.env.NODE_ENV !== 'production') {
      for (const plugin of config.plugins) {
        if (plugin.constructor.name === 'TerserPlugin') {
          plugin.options.sourceMap = true
          break
        }
      }
    }

    return {
      ...config,
      experiments: {
        asyncWebAssembly: true,
        layers: true,
      },
    }
  },
  exportPathMap(defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
    if (process.env.NODE_ENV !== 'development') {
      // If not in development mode, filter out /dev pages
      return Object.keys(defaultPathMap)
        .filter(path => !path.includes('/dev/'))
        .reduce((obj, path) => {
          return { ...obj, [path]: defaultPathMap[path] }
        }, {})
    }

    return defaultPathMap
  },
  publicRuntimeConfig: {
    GHOST_API_URL: process.env.GHOST_API_URL,
    GHOST_API_KEY: process.env.GHOST_API_KEY,
  },
}

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
})

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.BUNDLE_ANALYZE === 'true',
})

module.exports = (phase, defaultConfig) => {
  return withBundleAnalyzer(nextConfig)
}

// Injected content via Sentry wizard below

const { withSentryConfig } = require('@sentry/nextjs')

module.exports = withSentryConfig(
  withBundleAnalyzer(
    withMDX({
      ...nextConfig,
      pageExtensions: [...nextConfig.pageExtensions, 'mdx'],
    })
  ),
  {
    // Sentry configurations
    silent: true,
    dryRun: process.env.VERCEL_ENV !== 'production',
    org: 'zondax',
    project: 'web-beryx',
  },
  {
    // Additional Sentry options
    widenClientFileUpload: true,
    transpileClientSDK: true,
    tunnelRoute: '/monitoring',
    hideSourceMaps: process.env.VERCEL_ENV === 'production',
    disableLogger: true,
  }
)
