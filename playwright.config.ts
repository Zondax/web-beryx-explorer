import { PlaywrightTestConfig, devices } from '@playwright/test'

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
/**
 * See https://playwright.dev/docs/test-configuration.
 */
const baseConfig: PlaywrightTestConfig = {
  testMatch: '**/*.pwtest.ts',
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 30 * 1000,
    toHaveScreenshot: {
      maxDiffPixels: 200,
      maxDiffPixelRatio: 0.02,
    },
  },
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: Boolean(process.env.CI),
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI ? 'github' : 'list',

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: {
          args: ['--disable-web-security'],
        },
      },
    },
    {
      name: 'chrome',
      use: {
        channel: 'chrome',
        launchOptions: {
          args: ['--disable-web-security'],
        },
      },
    },
    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //     launchOptions: {
    //       args: ['--disable-web-security'],
    //     },
    //   },
    // },
    // {
    //   name: 'safari',
    //   use: {
    //     ...devices['Desktop Safari'],
    //     launchOptions: {
    //       args: ['--disable-web-security'],
    //     },
    //   },
    // },
    // /* Test against mobile viewports. */
    // {
    //   name: 'chrome-mobile',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'safari-mobile',
    //   use: { ...devices['iPhone 12'] },
    // },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: 'test-results/',

  webServer: {
    command: 'yarn start',
    port: 3000,
    timeout: 120000,
    ignoreHTTPSErrors: true,
    reuseExistingServer: !process.env.CI,
  },
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 30000,
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:3000/',

    bypassCSP: true,
  },
}

const e2eConfig: PlaywrightTestConfig = {
  ...baseConfig,
  testDir: './src/__tests__/e2e',
}

const smokeConfig: PlaywrightTestConfig = {
  ...baseConfig,
  globalSetup: require.resolve('./src/__tests__/smoke/global.setup.ts'),
  testDir: './src/__tests__/smoke',
}

const perfConfig: PlaywrightTestConfig = {
  ...baseConfig,
  testDir: './src/__tests__/perf',
}

export default (() => {
  switch (process.env.PLAYWRIGHT_CONFIG) {
    case 'smoke':
      return smokeConfig
    case 'perf':
      return perfConfig
    default:
      return e2eConfig
  }
})()
