import { WAIT_UNTIL_CRITERIA, navigationOptions } from '@/utils/linkCollector'
import { expect, test } from '@playwright/test'

test.describe.parallel('Home - Search Examples', () => {
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

    await page.getByRole('button', { name: 'Contract' }).waitFor({ state: 'visible' })
  })

  test('Contract', async ({ page }) => {
    await page.getByRole('button', { name: 'Contract' }).click()

    // Wait to the navigation finishes
    await page.waitForURL('**/search/fil/mainnet/address/*', navigationOptions)

    // Expect the search type is visible
    const contractTitle = page.getByRole('heading', { name: /^contract$/ })
    await expect(contractTitle).toBeVisible()
  })

  test('Address', async ({ page }) => {
    await page.getByRole('button', { name: 'Address' }).click()

    // Wait to the navigation finishes
    await page.waitForURL('**/search/fil/mainnet/address/*', navigationOptions)

    // Expect the search type is visible
    const contractTitle = page.getByRole('heading', { name: /^address$/ })
    await expect(contractTitle).toBeVisible()
  })

  test('Transaction', async ({ page }) => {
    await page.getByRole('button', { name: 'Transaction' }).click()

    // Wait to the navigation finishes
    await page.waitForURL('**/search/fil/mainnet/txs/*', navigationOptions)

    // Expect the search type is visible
    const contractTitle = page.getByRole('heading', { name: /^transaction$/ })
    await expect(contractTitle).toBeVisible()
  })

  test('Tipset', async ({ page }) => {
    await page.getByRole('button', { name: 'Tipset' }).click()

    // Wait to the navigation finishes
    await page.waitForURL('**/search/fil/mainnet/tipset/*', navigationOptions)

    // Expect the search type is visible
    const contractTitle = page.getByRole('heading', { name: /^tipset$/ })
    await expect(contractTitle).toBeVisible()
  })

  test('Block', async ({ page }) => {
    await page.getByRole('button', { name: 'Block' }).click()

    // Wait to the navigation finishes
    await page.waitForURL('**/search/fil/mainnet/block-cid/*', navigationOptions)

    // Expect the search type is visible
    const contractTitle = page.getByRole('heading', { name: /^block$/ })
    await expect(contractTitle).toBeVisible()
  })
})

test.describe.parallel('Home - Latest tipsets, transactions and contracts', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000', {
      timeout: 60000,
      waitUntil: WAIT_UNTIL_CRITERIA,
    })

    const cookieBanner = page.getByRole('button', { name: 'Agree' })
    if (await cookieBanner.isVisible()) {
      await cookieBanner.click()
    }
  })

  test('Header of the section', async ({ page }) => {
    const title = page.getByTestId('latest-items-title')
    const description = page.getByTestId('latest-items-description')

    // Expect the title and description are visible
    await expect(title).toBeVisible()
    await expect(description).toBeVisible()

    // Expect the button redirect to Recent Activity page
    await page.getByTestId('latest-items-button').click()

    // Wait to the navigation finishes
    await page.waitForURL('**/recent_activity', navigationOptions)

    // Expect to be in Recent Activity
    const tipsetsTab = page.getByRole('tab', { name: 'Latest Tipsets' })
    await expect(tipsetsTab).toBeVisible()
  })

  test('Latest Tipsets', async ({ page }) => {
    const title = page.locator('#latest-tipsets-heading')

    // Expect the title are visible
    await expect(title).toBeVisible()

    // Expect the button redirect to Recent Activity page
    await page.locator('a#view-more-tipsets').click()

    // Wait to the navigation finishes
    await page.waitForURL('**/recent_activity*', navigationOptions)

    await expect(page).toHaveURL(/recent_activity\?tab=tipsets$/)
  })

  test('Latest Transactions', async ({ page }) => {
    const title = page.locator('#latest-transactions-heading')

    // Expect the title are visible
    await expect(title).toBeVisible()

    // Expect the button redirect to Recent Activity page
    await page.locator('a#view-more-transactions').click()

    // Wait to the navigation finishes
    await page.waitForURL('**/recent_activity*', navigationOptions)

    await expect(page).toHaveURL(/recent_activity\?tab=transactions$/)
  })

  test('Latest Contracts Invokes', async ({ page }) => {
    const title = page.locator('#latest-invokes-heading')

    // Expect the title are visible
    await expect(title).toBeVisible()

    // Expect the button redirect to Recent Activity page
    await page.locator('a#view-more-invokes').click()

    // Wait to the navigation finishes
    await page.waitForURL('**/recent_activity*', navigationOptions)

    await expect(page).toHaveURL(/recent_activity\?tab=contracts$/)
  })

  test('Latest tipset in Mainnet', async ({ page }) => {
    // Get the first link of the first cell of the latest tipsets table
    const lastTipsetTable = page.locator('div#table-latest_tipsets').getByRole('cell').getByRole('link').first()

    await lastTipsetTable.waitFor({ state: 'visible' })

    // Get the last tipset of the topbar
    const lastTipsetTopbar = page.locator('div#tipset-height-value').getByRole('link').first()

    await lastTipsetTopbar.waitFor({ state: 'visible' })

    // Expect the last tipset is the same in the topbar and in the table
    expect(await lastTipsetTable.textContent()).toBe(await lastTipsetTopbar.textContent())
  })

  test('User Journey - Select Network', async ({ page }) => {
    // Change the network to Calibration
    await page.getByTestId('select-network-topbar').click()
    await page.getByRole('menuitem', { name: 'Filecoin Calibration testnet' }).click()

    // Wait the select changes
    await page.getByTestId('select-network-topbar').getByText('Calibrationtestnet').waitFor({ state: 'visible' })
  })

  test.skip('User Journey - Check for latest tipsets table', async ({ page }) => {
    // Change the network to Calibration
    await page.getByTestId('select-network-topbar').click()
    await page.getByRole('menuitem', { name: 'Filecoin Calibration testnet' }).click()

    // Wait the select changes
    await page.getByTestId('select-network-topbar').getByText('Calibrationtestnet').waitFor({ state: 'visible' })

    // Go to recent activity
    await page.getByLabel('Recent Activity').getByRole('button').click()

    // Wait to the navigation finishes
    await page.waitForURL('**/recent_activity', navigationOptions)

    // Expect to redirect to Recent Activity page
    await expect(page).toHaveURL(/\/recent_activity$/)

    // Change the network to Mainnet
    await page.getByTestId('select-network-topbar').click()
    await page.getByRole('option', { name: 'Mainnet' }).click()

    // Wait the select changes
    await page.getByTestId('select-network-topbar').getByText('Mainnet').waitFor({ state: 'visible' })

    // Go to dashboard page
    await page.getByLabel('Dashboard').getByRole('button').click()

    // Wait to the navigation finishes
    await page.waitForURL('**/dashboard', navigationOptions)

    // Expect to redirect to Dashboard page
    await expect(page).toHaveURL(/\/dashboard$/)

    // Change the network to Calibration
    await page.getByTestId('select-network-topbar').click()
    await page.getByRole('menuitem', { name: 'Filecoin Calibration testnet' }).click()

    // Wait the select changes
    await page.getByLabel('Calibrationtestnet').waitFor({ state: 'visible' })

    // Go to home page
    await page.getByLabel('Home').getByRole('button').click()

    // Wait to the navigation finishes
    await page.waitForURL('**/', navigationOptions)

    // Expect to redirect to Home page
    await expect(page).toHaveURL(/\/$/)

    // Expect the table is loaded and have content already
    await page
      .getByTestId('latest-tipsets-table')
      .getByRole('rowgroup')
      .count()
      .then(count => {
        expect(count).toBeGreaterThan(1)
      })
  })
})
