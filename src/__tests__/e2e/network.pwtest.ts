import { expect, test } from '@playwright/test'

test.describe('Network select', () => {
  test('Change network value to Calibration', async ({ page }) => {
    await page.goto('http://localhost:3000/', {
      timeout: 60000,
      waitUntil: 'domcontentloaded',
    })

    // Close the cookie banner if it exists
    const cookieBanner = page.getByRole('button', { name: 'Agree' })
    if (await cookieBanner.isVisible()) {
      await cookieBanner.click()
    }

    // Open the select options
    await page.getByLabel('Mainnet', { exact: true }).click()
    await page.getByRole('option', { name: 'Calibration testnet' }).click()

    // Expect the genesis section has the heading Calibration Network
    const genesisTitle = page.getByRole('heading', { name: 'Calibration Network Information' })
    await expect(genesisTitle).toBeVisible()
  })
})
