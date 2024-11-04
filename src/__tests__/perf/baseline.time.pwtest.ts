/* eslint-disable no-console */
import { expect, test } from '@playwright/test'

/**
 * This test suite runs in parallel and tests the 'Just Open - Baseline' scenario.
 */
test.describe.parallel('Just Open - Baseline', () => {
  /**
   * This test checks if the page 'beryx' has been rendered correctly when the page load event is fired.
   */
  test('Just open beryx (load)', async ({ page }) => {
    await page.goto('http://localhost:3000/dev/baseline', {
      waitUntil: 'load',
    })
    // Check if the page has been rendered correctly
    const pageTitle = await page.title()
    expect(pageTitle.includes('Beryx')).toBe(true)
  })

  /**
   * This test checks if the page 'beryx' has been rendered correctly when the DOMContentLoaded event is fired.
   */
  test('Just open beryx (domcontentloaded)', async ({ page }) => {
    await page.goto('http://localhost:3000/dev/baseline', {
      waitUntil: 'domcontentloaded',
    })
    // Check if the page has been rendered correctly
    const pageTitle = await page.title()
    expect(pageTitle).toBe('Beryx')
  })

  /**
   * This test checks if the page 'beryx' has been rendered correctly when the networkidle event is fired.
   */
  test('Just open beryx (networkidle)', async ({ page }) => {
    await page.goto('http://localhost:3000/dev/baseline', {
      waitUntil: 'networkidle',
    })
    // Check if the page has been rendered correctly
    const pageTitle = await page.title()
    expect(pageTitle).toBe('Beryx: Blockchain Explorer, Dashboards, Faucet and Tools')
  })
})

/**
 * This test suite runs in parallel and tests the 'Just Open - Beryx' scenario.
 */
test.describe.parallel('Just Open - Beryx', () => {
  /**
   * This test checks if the page 'beryx' has been rendered correctly when the page load event is fired.
   */
  test('Just open beryx (load)', async ({ page }) => {
    await page.goto('http://localhost:3000', {
      waitUntil: 'load',
    })
    // Check if the page has been rendered correctly
    const pageTitle = await page.title()
    expect(pageTitle).toBe('Beryx: Blockchain Explorer, Dashboards, Faucet and Tools')
  })

  /**
   * This test checks if the page 'beryx' has been rendered correctly when the DOMContentLoaded event is fired.
   */
  test('Just open beryx (domcontentloaded)', async ({ page }) => {
    await page.goto('http://localhost:3000', {
      waitUntil: 'domcontentloaded',
    })
    // Check if the page has been rendered correctly
    const pageTitle = await page.title()
    expect(pageTitle).toBe('Beryx: Blockchain Explorer, Dashboards, Faucet and Tools')
  })

  /**
   * This test checks if the page 'beryx' has been rendered correctly when the networkidle event is fired.
   */
  test('Just open beryx (networkidle)', async ({ page }) => {
    await page.goto('http://localhost:3000', {
      waitUntil: 'networkidle',
    })
    // Check if the page has been rendered correctly
    const pageTitle = await page.title()
    expect(pageTitle).toBe('Beryx: Blockchain Explorer, Dashboards, Faucet and Tools')
  })
})

/**
 * This test suite runs in parallel and tests the 'Just Open - 404' scenario.
 */
test.describe('Just Open - 404', () => {
  /**
   * This test checks if the page 'beryx - 404' has been rendered correctly when the page load event is fired.
   */
  test('Just open beryx (load)', async ({ page }) => {
    await page.goto('http://localhost:3000/404', {
      waitUntil: 'load',
    })
    // Check if the page has been rendered correctly
    const pageTitle = await page.title()
    expect(pageTitle).toBe('404: Page Not Found | Beryx')
  })

  /**
   * This test checks if the page 'beryx - 404' has been rendered correctly when the DOMContentLoaded event is fired.
   */
  test('Just open beryx (domcontentloaded)', async ({ page }) => {
    await page.goto('http://localhost:3000/404', {
      waitUntil: 'domcontentloaded',
    })
    // Check if the page has been rendered correctly
    const pageTitle = await page.title()
    expect(pageTitle).toBe('404: Page Not Found | Beryx')
  })

  /**
   * This test checks if the page 'beryx - 404' has been rendered correctly when the networkidle event is fired.
   */
  test('Just open beryx (networkidle)', async ({ page }) => {
    await page.goto('http://localhost:3000/404', {
      waitUntil: 'networkidle',
    })
    // Check if the page has been rendered correctly
    const pageTitle = await page.title()
    expect(pageTitle).toBe('404: Page Not Found | Beryx')
  })
})
