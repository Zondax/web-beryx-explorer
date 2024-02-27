import { navigationOptions } from '@/utils/linkCollector'
import { expect, test } from '@playwright/test'

test.describe.parallel('Sidebar', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000', {
      timeout: 60000,
      waitUntil: 'domcontentloaded',
    })

    await page.locator('div#sidebar-container').waitFor({ state: 'visible' })

    // Close the cookie banner if it exists
    const cookieBanner = page.getByRole('button', { name: 'Agree' })
    if (await cookieBanner.isVisible()) {
      await cookieBanner.click()
    }
  })

  test('Go to Home', async ({ page }) => {
    // Home Button
    await page.getByLabel('Home').getByRole('button').click()

    // Wait to the navigation finishes
    await page.waitForURL('http://localhost:3000/', navigationOptions)

    // Expect the url is fine
    await expect(page).toHaveURL(/^http:\/\/localhost:3000\/$/)
  })

  test('Go to Recent Activity', async ({ page }) => {
    await page.getByLabel('Recent Activity').getByRole('button').click()

    // Wait to the navigation finishes
    await page.waitForURL('**/recent_activity', navigationOptions)

    // Expect to redirect to Recent Activity page
    await expect(page).toHaveURL(/\/recent_activity$/)
  })

  test('Go to Address Converter', async ({ page }) => {
    await page.getByLabel('Address Converter').getByRole('button').click()

    // Wait to the navigation finishes
    await page.waitForURL('**/address_converter', navigationOptions)

    // Expect to redirect toAddress Converter page
    await expect(page).toHaveURL(/\/address_converter$/)
  })

  test('Go to Contract Verifier', async ({ page }) => {
    await page.getByLabel('Contract Verifier').getByRole('button').click()

    // Wait to the navigation finishes
    await page.waitForURL('**/contract_verifier', navigationOptions)

    // Expect to redirect toContract Verifier page
    await expect(page).toHaveURL(/\/contract_verifier$/)
  })

  test('Open Resources', async ({ page }) => {
    if (await page.getByLabel('Resources').isVisible()) {
      await page.getByLabel('Resources').click()
    } else {
      await page.getByLabel('More').click()
      await page.getByRole('button', { name: 'Resources' }).click()
    }

    await page.waitForSelector('div:has-text("Resources")')

    const header = page.locator('div').filter({ hasText: /^Resources$/ })
    const title = page.getByRole('heading', { name: 'Resources' })

    // Expect to open Resources Box
    await expect(header).toBeVisible()
    await expect(title).toBeVisible()
  })
})
