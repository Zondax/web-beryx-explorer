import { expect, test } from '@playwright/test'

test.describe('Testing settings popup', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the page and wait for it to load
    await page.goto('http://localhost:3000/', {
      timeout: 60000,
      waitUntil: 'networkidle',
    })

    // Wait for the cookie banner to appear and close it
    const cookieBanner = page.getByRole('button', { name: 'Agree' })
    await cookieBanner.waitFor({ state: 'visible' })
    await cookieBanner.click()

    // Open the settings popup
    const buttonSetting = page.locator('#topbar-settings-button')
    await buttonSetting.waitFor({ state: 'visible' })
    await buttonSetting.click()

    // Wait for the settings popup to be visible
    const settingsPopup = page.locator('#Settings-popup').getByText('Settings')
    await settingsPopup.waitFor({ state: 'visible' })
  })

  test.skip('Change language to Spanish', async ({ page }) => {
    await page
      .locator('div')
      .filter({ hasText: /^English$/ })
      .click()
    await page.getByRole('option', { name: 'Español' }).click()

    // Verify that the language has changed to Spanish
    const currentLanguage = await page.locator('div#language-selector').innerText()
    expect(currentLanguage).toBe('Español')

    // Verify that the title is in Spanish
    const homeTitle = page.getByRole('heading', {
      name: 'Potenciando el talento de los desarrolladores de Blockchain con Beryx.',
    })
    expect(homeTitle).toBeDefined()
  })

  test.skip('Change currency to AED and verify topbar price in AED', async ({ page }) => {
    // Open the select options
    const currencySelector = page.locator('#currency-selector')
    await currencySelector.waitFor({ state: 'visible' })
    await currencySelector.click()

    // Select AED currency
    await page.getByRole('option', { name: 'aed' }).click()

    // Close the settings
    await page.getByRole('button', { name: 'Close' }).click()

    // Wait for a moment to ensure currency change has taken effect
    const currencyValue = page.locator('#currency-value')
    await currencyValue.waitFor({ state: 'visible' })

    // Verify that the currency is changed to AED
    const filPriceValue = await page.$eval('#currency-value', element => {
      return element.textContent?.includes('aed')
    })

    // Expect the currency is changed and the FIl price in the topbar is in AED
    expect(filPriceValue).toBeTruthy()
  })

  test('Close settings popup', async ({ page }) => {
    // Close the settings popup
    await page.getByRole('button', { name: 'Close' }).click()
    // Wait until #Settings-popup is not visible but no more than 500ms
    await page.locator('#Settings-popup').waitFor({ state: 'hidden' })
  })
})
