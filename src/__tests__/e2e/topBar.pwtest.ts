import { navigationOptions } from '@/utils/linkCollector'
import { expect, test } from '@playwright/test'

test.describe.parallel('TopBar', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000', {
      timeout: 60000,
      waitUntil: 'domcontentloaded',
    })

    await page.getByText('MinimumAgree').waitFor({ state: 'visible' })
    await page.getByRole('button', { name: 'Recent Activity', exact: true }).waitFor({ state: 'visible' })

    // Close the cookie banner if it exists
    const cookieBanner = page.getByRole('button', { name: 'Agree' })
    if (await cookieBanner.isVisible()) {
      await cookieBanner.click()
    }
  })

  test('Go to Home', async ({ page }) => {
    // Home Button
    await page.getByRole('link', { name: 'Beryx Logo' }).click()

    // Wait to the navigation finishes
    await page.waitForURL('http://localhost:3000/', navigationOptions)

    // Expect the url is fine
    await expect(page).toHaveURL(/^http:\/\/localhost:3000\/$/)
  })

  test('Go to Recent Activity - Latest Tipsets', async ({ page }) => {
    await page.getByRole('button', { name: 'Recent Activity', exact: true }).click()
    await page.getByRole('menuitem', { name: 'Tipsets' }).click()
    // Wait to the navigation finishes
    await page.waitForURL('**/recent_activity?tab=tipsets', navigationOptions)

    // Expect to redirect to Latest Tipsets page
    await expect(page).toHaveURL(/\/recent_activity\?tab=tipsets$/)
    expect(page.getByRole('button', { name: 'Recent Activity', exact: true })).toBeDefined()
  })

  test('Go to Recent Activity - Latest Transactions', async ({ page }) => {
    await page.getByRole('button', { name: 'Recent Activity', exact: true }).click()
    await page.getByRole('menuitem', { name: 'Transactions' }).click()
    // Wait to the navigation finishes
    await page.waitForURL('**/recent_activity?tab=transactions', navigationOptions)

    // Expect to redirect to Latest Transactions page
    await expect(page).toHaveURL(/\/recent_activity\?tab=transactions$/)
    expect(page.getByRole('tab', { name: 'Latest Transactions' })).toBeDefined()
  })

  test('Go to Recent Activity - Latest Contracts', async ({ page }) => {
    await page.getByRole('button', { name: 'Recent Activity', exact: true }).click()
    await page.getByRole('menuitem', { name: 'Contracts' }).click()
    // Wait to the navigation finishes
    await page.waitForURL('**/recent_activity?tab=contracts', navigationOptions)

    // Expect to redirect to Latest Contracts page
    await expect(page).toHaveURL(/\/recent_activity\?tab=contracts$/)
    expect(page.getByRole('button', { name: 'Latest Contracts Invokes', exact: true })).toBeDefined()
  })

  test('Go to Insights - Rich List', async ({ page }) => {
    await page.getByRole('button', { name: 'Insights', exact: true }).click()
    await page.getByRole('menuitem', { name: 'Rich List' }).click()
    // Wait to the navigation finishes
    await page.waitForURL('**/leaderboard?tab=rich-list', navigationOptions)

    // Expect to redirect to Recent Activity page
    await expect(page).toHaveURL(/\/leaderboard\?tab=rich-list$/)
    expect(page.getByRole('tab', { name: 'Rich List' })).toBeDefined()
  })

  test('Go to Insights - Gas Stats', async ({ page }) => {
    await page.getByRole('button', { name: 'Insights', exact: true }).click()
    await page.getByRole('menuitem', { name: 'Gas Stats' }).click()
    // Wait to the navigation finishes
    await page.waitForURL('**/dashboard#gas-used-stats', navigationOptions)

    // Expect to redirect to Gas Stats page
    await expect(page).toHaveURL(/\/dashboard#gas-used-stats$/)
    expect(page.getByRole('menuitem', { name: 'Gas Stats' })).toBeDefined()
  })

  test('Go to Insights - Contract Stats', async ({ page }) => {
    await page.getByRole('button', { name: 'Insights', exact: true }).click()
    await page.getByRole('menuitem', { name: 'Contract Stats' }).click()
    // Wait to the navigation finishes
    await page.waitForURL('**/dashboard#contract-stats', navigationOptions)

    // Expect to redirect to Contract Stats page
    await expect(page).toHaveURL(/\/dashboard#contract-stats$/)
    expect(page.getByText('Contracts', { exact: true })).toBeDefined()
  })

  test('Go to Dev Tools - Address Converter', async ({ page }) => {
    await page.getByRole('button', { name: 'Dev Tools', exact: true }).click()
    await page.getByRole('menuitem', { name: 'Address Converter' }).click()
    // Wait to the navigation finishes
    await page.waitForURL('**/address_converter', navigationOptions)

    // Expect to redirect to Recent Activity page
    await expect(page).toHaveURL(/\/address_converter$/)
    expect(page.getByRole('heading', { name: 'Address converter' })).toBeDefined()
  })

  test('Go to Dev Tools - RPC', async ({ page }) => {
    await page.getByRole('button', { name: 'Dev Tools', exact: true }).click()
    await page.getByRole('menuitem', { name: 'RPC' }).click()
    // Wait to the navigation finishes
    await page.waitForURL('**/rpc', navigationOptions)

    // Expect to redirect to Recent Activity page
    await expect(page).toHaveURL(/\/rpc$/)
    expect(page.getByRole('heading', { name: 'Mainnet Public RPC Node' })).toBeDefined()
  })

  test('Go to Dev Tools - Gas Estimator', async ({ page }) => {
    await page.getByRole('button', { name: 'Dev Tools', exact: true }).click()
    await page.getByRole('menuitem', { name: 'Gas Estimator' }).click()
    // Wait to the navigation finishes
    await page.waitForURL('**/estimate_gas', navigationOptions)

    // Expect to redirect to Gas Estimator page
    await expect(page).toHaveURL(/\/estimate_gas$/)
    expect(page.getByRole('heading', { name: 'Gas Estimator' })).toBeDefined()
  })

  test('Go to Dev Tools - Faucet', async ({ page }) => {
    await page.getByRole('button', { name: 'Dev Tools', exact: true }).click()
    await page.getByRole('menuitem', { name: 'Faucet' }).click()
    // Wait to the navigation finishes
    await page.waitForURL('**/faucet', navigationOptions)

    // Expect to redirect to Faucet page
    await expect(page).toHaveURL(/\/faucet$/)
    expect(page.getByRole('heading', { name: 'Faucet' })).toBeDefined()
  })

  test('Go to Dev Tools - Contract Interaction', async ({ page }) => {
    await page.getByRole('button', { name: 'Dev Tools', exact: true }).click()
    await page.getByRole('menuitem', { name: 'Contract Interaction' }).click()
    // Wait to the navigation finishes
    await page.waitForURL('**/interact', navigationOptions)

    // Expect to redirect to Contract Interaction page
    await expect(page).toHaveURL(/\/interact$/)
    expect(page.getByRole('heading', { name: 'Interact with Smart Contracts' })).toBeDefined()
  })

  test('Go to Dev Tools - Contract Verification', async ({ page }) => {
    await page.getByRole('button', { name: 'Dev Tools', exact: true }).click()
    await page.getByRole('menuitem', { name: 'Contract Verification' }).click()
    // Wait to the navigation finishes
    await page.waitForURL('**/contract_verifier', navigationOptions)

    // Expect to redirect to Contract Verification page
    await expect(page).toHaveURL(/\/contract_verifier$/)
    expect(page.getByRole('heading', { name: 'Verify your Smart Contract' })).toBeDefined()
  })

  test('Go to Dev Tools - Resources', async ({ page }) => {
    await page.getByRole('button', { name: 'Dev Tools', exact: true }).click()
    await page.getByRole('menuitem', { name: 'Resources' }).click()
    // Wait to the navigation finishes
    await page.waitForURL('**/resources', navigationOptions)

    // Expect to redirect to Resources page
    await expect(page).toHaveURL(/\/resources$/)
    expect(page.getByRole('heading', { name: 'Resources' })).toBeDefined()
  })
})
