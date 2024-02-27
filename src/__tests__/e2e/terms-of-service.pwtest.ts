import { test } from '@playwright/test'

test.describe.parallel('Terms and Conditions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000', {
      timeout: 60000,
      waitUntil: 'domcontentloaded',
    })

    // Close the cookie banner if it exists
    const cookieBanner = page.getByRole('button', { name: 'Agree' })
    if (await cookieBanner.isVisible()) {
      await cookieBanner.click()
    }
  })

  test.skip('Open Terms and Conditions', async ({ page }) => {
    // Click on the 'Terms and Conditions' button
    await page.getByRole('link', { name: 'Terms & Conditions' }).click()

    // Wait for the new page to open
    const [newPage] = await Promise.all([page.waitForEvent('popup')])

    // Verify that the new page has loaded the Terms and Conditions
    await newPage.waitForFunction(text => document.body.innerText.toLowerCase().includes(text), 'terms and conditions')
  })

  test('Directly Open Terms and Conditions', async ({ page }) => {
    // Go directly to the 'Terms and Conditions' page
    await page.goto('http://localhost:3000/terms-of-service', {
      timeout: 60000,
      waitUntil: 'domcontentloaded',
    })

    // Verify that the page has loaded the Terms and Conditions
    await page.waitForFunction(text => document.body.innerText.toLowerCase().includes(text), 'terms and conditions')
  })
})
