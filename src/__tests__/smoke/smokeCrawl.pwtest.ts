import { WAIT_UNTIL_CRITERIA } from '@/utils/linkCollector'
import { ConsoleMessage, Page, Response, expect, test } from '@playwright/test'

import { loadCachedURLs } from './global.setup'

const urlsToTest = loadCachedURLs()

const ignoreConsoleMessage = ['MUI: Missing license key.', '[Sentry] Cannot initialize SDK with `debug` option using a non-debug bundle.']

test.describe('Crawl URLs', () => {
  test('urlsToTest should not be empty', () => {
    expect(urlsToTest.length).toBeGreaterThan(0)
  })
})

urlsToTest.forEach(url => {
  test.describe.parallel(`[${url}]`, () => {
    let response: Response | null
    const consoleOutputs: ConsoleMessage[] = []
    let page: Page

    test.beforeAll(async ({ browser }) => {
      const context = await browser.newContext()
      page = await context.newPage()

      page.on('console', message => {
        consoleOutputs.push(message)
      })

      response = await page.goto(url, {
        waitUntil: WAIT_UNTIL_CRITERIA,
      })
    })

    test(`Page should exist and render without errors at ${url}`, () => {
      expect(response).not.toBeNull()
      // skipcq: PRV-JS-PROMISE-HANDLING We are sure that response is not null at this point
      expect(response?.status()).toBe(200)
    })

    test(`No console warnings or errors at ${url}`, () => {
      // Check for errors or warnings in the console
      const issues = consoleOutputs.filter(message => {
        const text = message.text()
        const type = message.type()

        // Check if the message is not part of the ignore list and is an error or warning
        return !ignoreConsoleMessage.some(exception => text.includes(exception)) && (type === 'error' || type === 'warning')
      })

      if (issues.length !== 0) {
        const errorMessages = issues.map(message => message.text()).join('\n')
        throw new Error(
          `Found ${issues.length} console issues on ${url}: \n\n --------------------- \n\n ${errorMessages} \n\n --------------------- \n\n`
        )
      }
    })

    test(`Page title should not be empty at ${url}`, async () => {
      const title = await page.title()
      expect(title).not.toBe('')
    })

    test(`Page should have a favicon at ${url}`, async () => {
      const favicon = await page.$('link[rel="icon"]')
      expect(favicon).not.toBeNull()
    })

    test(`Page should have a meta description at ${url}`, async () => {
      const metaDescription = await page.$('meta[name="description"]')
      expect(metaDescription).not.toBeNull()
    })

    test(`Page should have a viewport meta tag at ${url}`, async () => {
      const viewportMeta = await page.$('meta[name="viewport"]')
      expect(viewportMeta).not.toBeNull()
    })
  })
})
