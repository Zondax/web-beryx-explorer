/**
 * Disables the console linting rule.
 */

/* eslint-disable no-console */
import { expect, test } from '@playwright/test'

/**
 * Describes a parallel test suite for the 'Just Open - Baseline' scenario.
 */
test.describe('Just Open - Baseline', () => {
  /**
   * Test to calculate the total download size of the page.
   */
  test('Calculate total download size', async ({ page }) => {
    let totalSize = 0
    const resourceDetails: Record<string, Array<{ url: string; size: number }>> = {}
    const validResourceTypes = [
      'document',
      'stylesheet',
      'image',
      'media',
      'font',
      'script',
      'texttrack',
      'xhr',
      'fetch',
      'eventsource',
      'websocket',
      'manifest',
      'other',
    ]
    const pendingResponses = new Set()

    /**
     * Listens to the 'response' event of the page.
     */
    page.on('response', async response => {
      const resourceType = response.request().resourceType()
      if (!response.request().isNavigationRequest() && validResourceTypes.includes(resourceType)) {
        let body
        try {
          body = await response.body()
        } catch (e: unknown) {
          console.warn(`Warning: Error fetching body for URL: ${response.url()}`)
          if (e instanceof Error) {
            console.warn(`Error details: ${e.message}`)
            console.warn(`Stack trace: ${e.stack}`)
          } else {
            console.warn(`Error details: ${e}`)
          }
          return
        }

        const url = response.url()
        totalSize += body.length

        if (resourceDetails[resourceType]) {
          resourceDetails[resourceType].push({ url, size: body.length })
        } else {
          resourceDetails[resourceType] = [{ url, size: body.length }]
        }

        const responseProcessing = Promise.resolve()
        pendingResponses.add(responseProcessing)
        try {
          await responseProcessing
        } finally {
          pendingResponses.delete(responseProcessing)
        }
      }
    })

    await page.goto('http://localhost:3000/dev/baseline')

    // Wait for all responses to finish processing
    await Promise.all([...pendingResponses])

    /**
     * Logs the total download size of the page.
     */
    await test.step('Log total download size', () => {
      const totalSizeInMB = (totalSize / 1024 / 1024).toFixed(2)
      console.log(`Total download size: ${totalSizeInMB} MB`)

      Object.keys(resourceDetails).forEach(resourceType => {
        console.log(`${resourceType}:`)
        resourceDetails[resourceType].forEach(resource => {
          console.log(`  ${resource.url}: ${(resource.size / 1024 / 1024).toFixed(2)} MB`)
        })
      })

      // Expect total size to be below 15MB
      expect(Number(totalSizeInMB)).toBeLessThan(15)
    })
  })
})
