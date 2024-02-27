import { WAIT_UNTIL_CRITERIA, extractUrlsFromPage } from '@/utils/linkCollector'
import { expect, test } from '@playwright/test'

const rootPage = 'http://localhost:3000'

test.describe('Check root', () => {
  test('Page should exist and render without errors', async ({ page }) => {
    const response = await page.goto(rootPage, {
      waitUntil: WAIT_UNTIL_CRITERIA,
    })
    expect(response).not.toBeNull()
    if (response) {
      expect(response.status()).toBe(200)
    }
  })

  test('Extract hrefs', async ({ page }) => {
    await page.goto(rootPage, {
      waitUntil: WAIT_UNTIL_CRITERIA,
    })

    const urls = await extractUrlsFromPage(page, rootPage, [])
    // eslint-disable-next-line no-console
    expect(urls).not.toBeNull()
    if (urls) {
      expect(urls.length).toBeGreaterThan(4)
    }
  })
})
