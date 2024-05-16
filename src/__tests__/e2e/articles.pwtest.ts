import { test } from '@playwright/test'

test.describe.parallel('Sidebar', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000', {
      timeout: 60000,
      waitUntil: 'domcontentloaded',
    })

    await page.getByText('MinimumAgree').waitFor({ state: 'visible' })

    // Close the cookie banner if it exists
    const cookieBanner = page.getByRole('button', { name: 'Agree' })
    if (await cookieBanner.isVisible()) {
      await cookieBanner.click()
    }
  })
})
