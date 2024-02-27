/**
 * @file This file is used to configure or set up a testing framework before each test.
 * If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`
 * Used for __tests__/testing-library.js
 */
import i18n from 'i18next'
import en from 'public/locales/en/translation.json'
import es from 'public/locales/es/translation.json'
import { initReactI18next } from 'react-i18next'
import 'whatwg-fetch'

// Mock MUI license so we can run tests
jest.mock('@mui/x-license-pro', () => ({
  useLicenseVerifier: () => 'Valid',
  Watermark: () => null,
}))

// we much mock the Article component because it is uses next-mdx-remote that is incomatible with jest
jest.mock('components/common/Resources/Article', () => {
  return jest.fn().mockImplementation(() => {
    return <div>Mocked Article</div>
  })
})

// noinspection JSUnusedGlobalSymbols
global.ResizeObserver = class ResizeObserver {
  observe() {
    // do nothing
  }

  unobserve() {
    // do nothing
  }

  disconnect() {
    // do nothing
  }
}

/**
 * Initializes the i18n library for testing.
 * @async
 * @function
 * @returns {Promise<void>}
 */
async function initI18n() {
  await i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      resources: {
        en,
        es,
      },
      lng: 'en',
      fallbackLng: 'en',

      interpolation: {
        escapeValue: false,
      },
    })
}

/**
 * Immediately Invoked Function Expression (IIFE) to initialize i18n.
 * @async
 * @function
 */
;(async () => {
  await initI18n()
})()
