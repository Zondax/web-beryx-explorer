/**
 * @file jest.config.js
 * @description This file is used to configure Jest for testing.
 */

const nextJest = require('next/jest')

/**
 * @description Create Jest configuration using next/jest.
 * @function createJestConfig
 * @param options - The configuration options.
 * @param options.dir - The path to your Next.js app to load next.config.js and .env files in your test environment.
 * @returns The Jest configuration.
 */
const createJestConfig = nextJest({
  dir: './',
})

/**
 * Custom Jest configuration.
 */
const customJestConfig = {
  testTimeout: 15000,

  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ['node_modules', '<rootDir>/', '<rootDir>/src/'],

  setupFiles: ['./jest.custom.js'],

  // If you're using [Module Path Aliases](https://nextjs.org/docs/advanced-features/module-path-aliases),
  // you will have to add the moduleNameMapper in order for jest to resolve your absolute paths.
  // The paths have to be matching with the paths option within the compilerOptions in the tsconfig.json
  // For example:

  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.next/',
    '<rootDir>/src/__tests__/e2e/',
    '<rootDir>/src/__tests__/smoke/',
    '<rootDir>/src/__tests__/perf/',
  ],

  collectCoverageFrom: [
    'components/**/*.{js,jsx,ts,tsx}',
    'pages/**/*.{js,jsx,ts,tsx}',
    'src/**/*.{js,jsx,ts,tsx}',
    '!pages/_document.tsx',
    '!**/src/__tests__/e2e/**',
    '!**/src/__tests__/smoke/**',
    '!**/src/__tests__/perf/**',
    '!**/.next/**',
    '!**/.swc/**',
    '!**/.turbo/**',
    '!**/.yarn/**',
    '!**/coverage/**',
    '!**/node_modules/**',
    '!**/public/**',
    '!**/output/**',
    '!**/test-results/**',
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.next/',
    '<rootDir>/src/__tests__/e2e/',
    '<rootDir>/src/__tests__/perf/',
    '<rootDir>/src/__tests__/smoke/',
  ],
  collectCoverage: true,
  coverageReporters: ['json', 'lcov', 'text', 'clover', 'cobertura'],

  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
  testEnvironmentOptions: {
    url: 'https://beryx.zondax.ch/',
  },
  roots: ['./src/', './components/'],
  setupFilesAfterEnv: ['@testing-library/jest-dom', '<rootDir>/jest.setup.js'],
}

/**
 * @description Export the Jest configuration.
 * @returns The Jest configuration.
 */
module.exports = createJestConfig(customJestConfig)
