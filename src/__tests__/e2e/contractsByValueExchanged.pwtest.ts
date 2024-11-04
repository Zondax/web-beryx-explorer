import { expect, test } from '@playwright/test'

test.describe.parallel('Contracts By Value Exchanged', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/leaderboard?tab=top-accounts-by-value-exchanged', {
      timeout: 60000,
      waitUntil: 'domcontentloaded',
    })

    // Close the cookie banner if it exists
    const cookieBanner = page.getByRole('button', { name: 'Agree' })
    if (await cookieBanner.isVisible()) {
      await cookieBanner.click()
    }
  })

  test('The elements are present', async ({ page }) => {
    // Expect the column header is visible
    const exchangedColumn = page
      .locator('div')
      .filter({ hasText: /^Exchanged \(FIL\)$/ })
      .nth(2)
    await expect(exchangedColumn).toBeVisible()

    // Expect the three first rows are visible
    await expect(page.getByTestId('first-position-icon')).toBeVisible()
    await expect(page.getByTestId('second-position-icon')).toBeVisible()
    await expect(page.getByTestId('third-position-icon')).toBeVisible()
  })

  test('Change the direction switch', async ({ page }) => {
    // Expect the outbound column is shown when the outbound button is selected
    await page.getByRole('button', { name: 'outbound' }).click()
    await expect(
      page
        .locator('div')
        .filter({ hasText: /^Outbound \(FIL\)$/ })
        .nth(2)
    ).toBeVisible()

    // Expect the inbound column is shown when the inbound button is selected
    await page.getByRole('button', { name: 'inbound' }).click()
    await expect(
      page
        .locator('div')
        .filter({ hasText: /^Inbound \(FIL\)$/ })
        .nth(2)
    ).toBeVisible()
  })

  test('Actor type options', async ({ page }) => {
    await page.getByTestId('leaderbord-panel').getByLabel('all').click()
    await page.getByRole('option', { name: 'evm' }).waitFor({ state: 'visible' })
    await page.getByRole('option', { name: 'evm' }).click()

    // Expect the three first rows are visible
    await expect(page.getByTestId('first-position-icon')).toBeVisible()
    await expect(page.getByTestId('second-position-icon')).toBeVisible()
    await expect(page.getByTestId('third-position-icon')).toBeVisible()
  })
})
