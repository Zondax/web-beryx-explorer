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

  test('Open Documentation Modal', async ({ page }) => {
    if (await page.getByLabel('Resources').isVisible()) {
      await page.getByLabel('Resources').click()
    } else {
      await page.getByLabel('More').click()
      await page.getByRole('button', { name: 'Resources' }).click()
    }

    await page.waitForSelector('div:has-text("Resources")')

    const header = page.locator('div').filter({ hasText: /^Resources$/ })
    const title = page.getByRole('heading', { name: 'Resources' })
    const beryxDocumentationTile = page.getByRole('heading', { name: 'Beryx Documentation' })

    // Expect to open Resources Box and show the title and the Beryx Documentation tile
    await expect(header).toBeVisible()
    await expect(title).toBeVisible()
    await expect(beryxDocumentationTile).toBeVisible()

    // Click on the beryx documentation tile
    await page.getByRole('heading', { name: 'Beryx Documentation' }).click()

    // Expect to open the beryx documentation page and the welcome to the documentation
    await page.getByRole('heading', { name: 'Welcome to Beryx' }).waitFor({ state: 'visible' })

    // Expect to have the documentation sidebar
    await page.getByTestId('documentation-sidebar').waitFor({ state: 'visible' })

    // Click on recent activity label
    await page
      .locator('span')
      .filter({ hasText: /^Recent Activity$/ })
      .click()

    // Documentation should talk about recent activity page
    await page.getByRole('heading', { name: 'Recent Activity' }).waitFor({ state: 'visible' })
  })
})
