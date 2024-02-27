import { navigationOptions } from '@/utils/linkCollector'
import { expect, test } from '@playwright/test'

test.describe.parallel('Contract Verifier Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/contract_verifier', {
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
    // Expect the icon is visible
    const icon = page.getByRole('img', { name: 'warp' })
    await expect(icon).toBeVisible()

    // Expect the label and warning icon are visible
    const title = page.getByRole('heading', { name: 'Verify your Smart Contract' })
    await expect(title).toBeVisible()

    const warningIcon = page.getByLabel('Latest Verified Contracts')
    await expect(warningIcon).toBeVisible()

    // Expect the tab and table are visible
    const selectedTab = page.getByRole('tab', { name: 'Latest Verified Contracts' })
    await expect(selectedTab).toBeVisible()
  })

  test('Wrong contract address', async ({ page }) => {
    await page.getByLabel('Contract Address').click()
    await page.getByLabel('Contract Address').fill('fff')
    await page.getByLabel('Contract Address').press('Enter')

    // Expect the error message is shown
    const errorLabel = page.getByText("Sorry! We don't recognize this address. Please double check, there might be a ty")
    await expect(errorLabel).toBeVisible()
  })

  test('Write a valid contract', async ({ page }) => {
    await page.getByLabel('Contract Address').click()
    await page.getByLabel('Contract Address').fill('f410fogpbj7ftms5qkze32us6w3ckfugu5ivx4eoycoi')
    await page.getByLabel('Contract Address').press('Enter')
    await page.waitForURL('**/v1/search/fil/mainnet/address/f410fogpbj7ftms5qkze32us6w3ckfugu5ivx4eoycoi', navigationOptions)

    // Expect the form and tutorial are open
    const verifyTitle = page.getByRole('heading', { name: 'Verify contract' })
    const howToUseTitle = page.getByRole('heading', { name: 'How to use' })
    const container = page.locator('.MuiModal-root > div:nth-child(3)')
    await expect(verifyTitle).toBeVisible()
    await expect(howToUseTitle).toBeVisible()
    await expect(container).toBeVisible()
  })
})
