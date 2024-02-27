import { expect, test } from '@playwright/test'

test.describe.parallel('Recent Activity', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/recent_activity', {
      timeout: 60000,
      waitUntil: 'domcontentloaded',
    })

    // Close the cookie banner if it exists
    const cookieBanner = page.getByRole('button', { name: 'Agree' })
    if (await cookieBanner.isVisible()) {
      await cookieBanner.click()
    }
  })

  test('All the tabs are present', async ({ page }) => {
    // Find all tabs
    const tipsetsTab = page.getByRole('tab', { name: 'Latest Tipsets' })
    const transactionsTab = page.getByRole('tab', { name: 'Latest Transactions' })
    const ContractsTab = page.getByRole('tab', { name: 'Latest Contracts Invokes' })

    // Expect all tabs are present
    await expect(tipsetsTab).toBeVisible()
    await expect(transactionsTab).toBeVisible()
    await expect(ContractsTab).toBeVisible()
  })

  test('Click in Latest Transactions', async ({ page }) => {
    await page.getByRole('tab', { name: 'Latest Transactions' }).click()

    // Expect the query params change
    await expect(page).toHaveURL(/tab=transactions/)

    // Expect the Method column is in the table
    const methodColumn = page.getByText('Method')
    await expect(methodColumn).toBeVisible()
  })

  test('Click in Latest Contracts Invokes', async ({ page }) => {
    await page.getByRole('tab', { name: 'Latest Contracts Invokes' }).click()

    // Expect the query params change
    await expect(page).toHaveURL(/tab=contracts/)

    // Expect the Contract column is in the table
    const contractColumn = page.getByText(/^Contract$/)

    await expect(contractColumn).toBeVisible()
  })

  test('Click in Latest Tipsets', async ({ page }) => {
    // Go to a different tab and then go back to Latest Tipset
    await page.getByRole('tab', { name: 'Latest Contracts Invokes' }).click()
    await page.getByRole('tab', { name: 'Latest Tipsets' }).click()

    // Expect the query params change
    await expect(page).toHaveURL(/tab=tipsets/)

    // Expect the Block Ids column is in the table
    const blockIdsColumn = page.getByText('Block IDs')

    await expect(blockIdsColumn).toBeVisible()
  })
})
