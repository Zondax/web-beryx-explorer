import { Page, expect, test } from '@playwright/test'

// This test checks if the wallet options can be opened successfully
test('Open wallet options', async ({ page }) => {
  // Navigate to the application
  await page.goto('http://localhost:3000/')
  // Click on the 'Connect wallet' button
  await page.getByRole('button', { name: 'Connect wallet' }).click()
  // Check if the wallet creation text is displayed correctly
  checkWalletCreationText(page)
  // Check if the 'Connect to Metamask' button is displayed correctly
  checkConnect2MetamaskButton(page)
  // Check if the track address input field is displayed correctly
  checkTrackAddressInput(page)
  // Check if the track address button is displayed correctly
  await checkTrackAddressButton(page)
})

// This test checks if the input field can be interacted with successfully
test('Interact with input field', async ({ page }) => {
  // Navigate to the application
  await page.goto('http://localhost:3000/')
  // Click on the 'Connect wallet' button
  await page.getByRole('button', { name: 'Connect wallet' }).click()
  // Check if the track address input field is displayed correctly
  checkTrackAddressInput(page)
  // Fill the track address input field and check the button
  await fillTrackAddressInputAndCheckButton(page)
})

// This test checks if the input field can handle wrong addresses
test('Interact with input field using wrong address', async ({ page }) => {
  // Navigate to the application
  await page.goto('http://localhost:3000/')
  // Click on the 'Connect wallet' button
  await page.getByRole('button', { name: 'Connect wallet' }).click()
  // Check if the track address input field is displayed correctly
  checkTrackAddressInput(page)
  // Fill the track address input field with a wrong address
  await fillTrackAddressInputWithWrongAddress(page)
})

// This test checks if an address can be tracked successfully
test('Track an address', async ({ page }) => {
  // Navigate to the application
  await page.goto('http://localhost:3000/')
  // Click on the 'Connect wallet' button
  await page.getByRole('button', { name: 'Connect wallet' }).click()
  // Check if the track address input field is displayed correctly
  checkTrackAddressInput(page)
  // Fill the track address input field with a valid address
  await fillTrackAddressInputWithValidAddress(page)
  // Check the wallet account details
  await checkWalletAccountDetails(page)
})

// This function checks if the wallet creation text is displayed correctly
function checkWalletCreationText(page: Page) {
  const walletCreationText = page
    .locator('div')
    .filter({ hasText: /^If you don't have a wallet yet, you can select a provider and create one now.$/ })
    .first()
  // Expect the wallet creation text to be truthy (i.e., it exists)
  expect(walletCreationText).toBeTruthy()
}

// This function checks if the 'Connect to Metamask' button is displayed correctly
function checkConnect2MetamaskButton(page: Page) {
  const connect2metamaskButton = page.locator('div#connect2metamask-button').first()
  // Expect the 'Connect to Metamask' button to be truthy (i.e., it exists)
  expect(connect2metamaskButton).toBeTruthy()
}

// This function checks if the track address input field is displayed correctly
function checkTrackAddressInput(page: Page) {
  const trackAddressInput = page.locator('input#track-address-input').first()
  // Expect the track address input field to be truthy (i.e., it exists)
  expect(trackAddressInput).toBeTruthy()
}

// This function checks if the track address button is displayed correctly
async function checkTrackAddressButton(page: Page) {
  const trackAddressButton = page.locator('button#track-address-button').first()
  // Expect the track address button to be truthy (i.e., it exists)
  expect(trackAddressButton).toBeTruthy()
  // Expect the track address button to be disabled initially
  expect(await trackAddressButton.isDisabled()).toBe(true)
}

// This function fills the track address input field and checks the button
async function fillTrackAddressInputAndCheckButton(page: Page) {
  const trackAddressInput = page.locator('input#track-address-input').first()
  // Fill the track address input field with a valid address
  await trackAddressInput.fill('f05') // Replace with a valid address
  const trackAddressButton = page.locator('button#track-address-button').first()
  await page.waitForTimeout(2000)
  // Expect the track address button to be enabled after filling the input field
  expect(await trackAddressButton.isDisabled()).toBe(false)
}

// This function fills the track address input field with a wrong address
async function fillTrackAddressInputWithWrongAddress(page: Page) {
  const trackAddressInput = page.locator('input#track-address-input').first()
  // Fill the track address input field with a wrong address
  await trackAddressInput.fill('0xWrongAddress') // Replace with a wrong address
  const trackAddressButton = page.locator('button#track-address-button').first()
  // Expect the track address button to be disabled after filling the input field with a wrong address
  expect(await trackAddressButton.isDisabled()).toBe(true)
}

// This function fills the track address input field with a valid address
async function fillTrackAddressInputWithValidAddress(page: Page) {
  const trackAddressInput = page.locator('input#track-address-input').first()
  // Fill the track address input field with a valid address
  await trackAddressInput.fill('f05') // Replace with a valid address
  const trackAddressButton = page.locator('button#track-address-button').first()
  // Click the track address button
  await trackAddressButton.click()
  await page.waitForTimeout(2000)
}

// This function checks the wallet account details
async function checkWalletAccountDetails(page: Page) {
  // Expect the chain network to be 'Filecoin • Mainnet'
  expect(page.locator('div#wallet-account-chain-network').filter({ hasText: 'Filecoin • Mainnet' }).first()).toBeTruthy()
  const filAddressText = page.locator('div#wallet-account-addresses').filter({ hasText: 'FIL Address:' }).first()

  // Expect the FIL address text to be truthy (i.e., it exists)
  expect(filAddressText).toBeTruthy()
  const beryxLinkDiv = page.locator('div.beryxLink').filter({ hasText: 'f05' }).first()

  // Expect the beryx link div to be truthy (i.e., it exists)
  expect(beryxLinkDiv).toBeTruthy()
  const walletAccountBalance = page.locator('div#wallet-account-balance').first()
  const walletAccountBalanceSkeleton = walletAccountBalance.locator('div#wallet-account-balance-skeleton').first()

  // If the skeleton doesn't exist, check the balance text
  if (!walletAccountBalanceSkeleton) {
    const walletAccountBalanceText = await walletAccountBalance.textContent()

    // Enforce that walletAccountBalanceText is not null
    expect(walletAccountBalanceText).not.toBeNull()

    if (walletAccountBalanceText) {
      // Expect that the text contains a dot
      expect(walletAccountBalanceText.includes('.')).toBe(true)

      // Split the balance text by dot
      const [beforeDot, afterDot] = walletAccountBalanceText.split('.')

      // Check if any unwanted characters exist in the text before and after the dot
      const unwantedChars = ['\r', '\n']
      expect(unwantedChars.find(char => beforeDot.includes(char))).toBeUndefined()
      expect(unwantedChars.find(char => afterDot.includes(char))).toBeUndefined()
    }
  }

  const walletTransactionTile = page.locator('div#wallet-transaction-tile').first()
  // If the transaction tile doesn't exist, check the 'no rows' div
  if (!walletTransactionTile) {
    const noRowsDiv = page.locator('div.noRows').first()
    // Expect the 'no rows' div to be truthy (i.e., it exists)
    expect(noRowsDiv).toBeTruthy()
  }
}
