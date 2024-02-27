import { expect, test } from '@playwright/test'

test.describe.parallel('Address Converter Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/address_converter', {
      timeout: 60000,
      waitUntil: 'domcontentloaded',
    })

    // Close the cookie banner if it exists
    const cookieBanner = page.getByRole('button', { name: 'Agree' })
    if (await cookieBanner.isVisible()) {
      await cookieBanner.click()
    }

    // Wait the input is rendered
    const incomingInput = page.locator('input#converter-incoming-address')
    await incomingInput.waitFor({ state: 'visible' })
  })

  test('Convert to ETH', async ({ page }) => {
    // Expect the Convert button is disabled
    const convertToEthButton = page.getByRole('button', { name: 'Convert to ETH' })
    await expect(convertToEthButton).toBeDisabled()

    // Expect the Change Search Type button is enabled
    const changeButton = page.locator('.MuiGrid-root > div:nth-child(2) > .MuiButtonBase-root')
    await expect(changeButton).toBeEnabled()

    // Complete the input with an address
    await page.locator('input#converter-incoming-address').click()
    await page.locator('input#converter-incoming-address').fill('f410fogpbj7ftms5qkze32us6w3ckfugu5ivx4eoycoi')
    await page.getByRole('button', { name: 'Convert to ETH' }).click()

    // Wait to the result appears
    await page.locator('textarea#converter-outgoing-address').waitFor({ state: 'visible' })

    // Expect the conversion is well
    const ethAddress = page.locator('textarea#converter-outgoing-address')
    expect(await ethAddress.textContent()).toBe('0x719e14fcb364bb05649bd525eb6c4a2d0d4ea2b7')
  })

  test('Invalid address', async ({ page }) => {
    // Complete the input with an address
    await page.locator('input#converter-incoming-address').click()
    await page.locator('input#converter-incoming-address').fill('bafy2bzacebnlfb7eekoly4glslwyd2bumt44k6io33cstamzdgebjt6aexzey')
    await page.getByRole('button', { name: 'Convert to ETH' }).click()

    // Expect the result is visible
    const invalidAddressLabel = page.getByText('Invalid address')
    await expect(invalidAddressLabel).toBeVisible()
  })

  test('Convert to FIL', async ({ page }) => {
    // Click in the right button to change the type of converter
    await page.locator('.MuiGrid-root > div:nth-child(2) > .MuiButtonBase-root').click()

    // Complete the input with an address
    await page.getByLabel('Ethereum address').click()
    await page.getByLabel('Ethereum address').fill('0x719e14fcb364bb05649bd525eb6c4a2d0d4ea2b7')
    await page.getByRole('button', { name: 'Convert to FIL' }).click()

    // Expect the result is visible
    const filAddress = page.locator('textarea#converter-outgoing-address')
    expect(await filAddress.textContent()).toBe('f410fogpbj7ftms5qkze32us6w3ckfugu5ivx4eoycoi')
  })
})
