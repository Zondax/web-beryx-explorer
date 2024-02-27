import { NetworkType, Networks } from '@/config/networks'
import { WAIT_UNTIL_CRITERIA } from '@/utils/linkCollector'
import { Page, expect, test } from '@playwright/test'

test.describe('Testing tab interact', () => {
  test('Go to interact section', async ({ page }) => {
    await searchAddress(page, Networks.mainnet, '0x60E1773636CF5E4A227d9AC24F20fEca034ee25A')
    await goToInteractTab(page)

    const typeSelect = page.getByLabel('Type')
    expect(typeSelect).toBeDefined()
  })

  test('Render codeblock to write parameters', async ({ page }) => {
    await searchAddress(page, Networks.calibration, '0xE462e2eA9793D421A0565b86016dB31039F924F0')
    await goToInteractTab(page)
    await completeForm(page, 'WRITE nonpayable', 'f')

    await page.getByRole('button', { name: 'Switch to Text Input' }).click()
    const codeBlock = page.locator('div').filter({ hasText: /^1$/ }).nth(1)

    expect(codeBlock).toBeDefined()
  })

  test('Render parameters table', async ({ page }) => {
    await searchAddress(page, Networks.calibration, '0xE462e2eA9793D421A0565b86016dB31039F924F0')
    await goToInteractTab(page)
    await completeForm(page, 'WRITE nonpayable', 'f')

    const tableTypeColumn = page.getByTestId('interact-table-input').getByText('Type')

    expect(tableTypeColumn).toBeDefined()
  })

  test('Fill table inputs, add and eliminate rows', async ({ page }) => {
    await searchAddress(page, Networks.calibration, '0xE462e2eA9793D421A0565b86016dB31039F924F0')
    await goToInteractTab(page)
    await completeForm(page, 'WRITE nonpayable', 'f')

    await page.getByRole('spinbutton').first().click()
    await page.getByRole('spinbutton').first().fill('1')
    await page.getByRole('spinbutton').nth(1).click()
    await page.getByRole('spinbutton').nth(1).fill('2')
    await page.getByTestId('add-button').nth(2).click()
    await page.getByRole('spinbutton').nth(1).click()
    await page.getByRole('spinbutton').nth(1).fill('7')
    await page.getByTestId('add-button').nth(2).click()
    await page.getByRole('spinbutton').nth(2).click()
    await page.getByRole('spinbutton').nth(2).fill('9')
    await page.locator('div:nth-child(3) > .MuiGrid-root > div:nth-child(4) > div > .MuiButtonBase-root').click()
    await page.getByTestId('arrow-up').nth(3).click()

    const labelClosedRow = page.getByRole('heading', { name: '2 more' })
    expect(labelClosedRow).toBeDefined()
    // expect(page.getByTestId('table-input').getByRole('textbox').inputValue()).toBe(/[1,4,6]/)

    await page.getByTestId('interact-table-input').getByRole('textbox').click()
    await page.getByTestId('interact-table-input').getByRole('textbox').press('ArrowLeft')
    await page.getByTestId('interact-table-input').getByRole('textbox').fill('[1,2,6]')

    const labelClosedRow2 = page.getByRole('heading', { name: '3 more' })
    expect(labelClosedRow2).toBeDefined()

    await page.getByTestId('interact-table-input').getByRole('textbox').click()
    await page.getByTestId('interact-table-input').getByRole('textbox').fill('[1]')

    const labelClosedRow3 = page.getByRole('heading', { name: '1 more' })
    expect(labelClosedRow3).toBeDefined()
  })
})

/**
 * This function is used to search for an address on the page.
 * @param page - The page object from Playwright.
 * @param network - The network type, which can be either Mainnet or Calibration testnet.
 * @param address - The address to search for.
 */
async function searchAddress(page: Page, network: NetworkType, address: string) {
  // Navigate to the localhost page with a timeout of 60 seconds and wait until the page is loaded.
  await page.goto('http://localhost:3000/', {
    timeout: 60000,
    waitUntil: WAIT_UNTIL_CRITERIA,
  })
  // If the network type is Calibration, select it from the dropdown menu.
  if (network === Networks.calibration) {
    await page.getByLabel('Mainnet', { exact: true }).click()
    await page.getByRole('option', { name: 'Calibration testnet' }).click()
    await page.getByTestId('select-network-topbar').getByText('Calibrationtestnet').waitFor({ state: 'visible' })
  }

  // Wait until the search bar is visible, then click on it and fill it with the provided address.
  await page.locator('#track-search-bar-input').nth(1).waitFor({ state: 'visible' })
  await page.locator('#track-search-bar-input').nth(1).click()
  await page.locator('#track-search-bar-input').nth(1).fill(address)
  // Press Enter to start the search.
  await page.locator('#track-search-bar-input').nth(1).press('Enter')
}

/**
 * This function is used to navigate to the Interact tab on the page.
 * @param page - The page object from Playwright.
 */
async function goToInteractTab(page: Page) {
  await page.getByRole('tab', { name: 'Interact' }).click()
}

/**
 * This function is used to complete a form on the page.
 * @param page - The page object from Playwright.
 * @param type - The type of the form.
 * @param method - The method of the form.
 */
async function completeForm(page: Page, type: string, method: string) {
  await page.getByLabel('Type').click()
  await page.getByRole('option', { name: type }).click()
  await page.getByLabel('Method').click()
  await page.getByRole('option', { name: method }).click()
}
