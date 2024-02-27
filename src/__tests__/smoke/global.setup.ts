/**
 * This module contains the global setup for the smoke tests.
 * It includes the initial links to start the crawling from, the cache file path and the maximum number of URLs to explore.
 * It also includes the global setup function and the function to load cached URLs.
 * @module globalSetup
 */
import fs from 'fs'
import path from 'path'

import { LinkCollector } from '@/utils/linkCollector'
import { chromium } from '@playwright/test'

// TODO: reenable other starting points
// const initialLinks = ['/', '/v1/mempool', '/address_converter', '/contract_verifier', '']
const initialLinks = ['/']
const cacheFile = '.discoveredUrls.json'
const maxUrls = 100 // Maximum number of URLs to explore

/**
 * This function sets up the global environment for the smoke tests.
 * It checks if the cache file is fresh, if not, it launches the browser and starts crawling.
 * It also writes the URLs to test into the cache file.
 * @async
 * @function
 */
async function globalSetup() {
  // eslint-disable-next-line no-console
  const cacheFilePath = path.resolve(__dirname, cacheFile)
  const cacheFileExists = fs.existsSync(cacheFilePath)
  const cacheFileIsFresh = cacheFileExists && Date.now() - fs.statSync(cacheFilePath).mtimeMs < 3600000

  if (cacheFileIsFresh) {
    // eslint-disable-next-line no-console
    console.log(`[globalSetup] cacheFilePath: ${cacheFilePath}`)
  }

  if (!cacheFileIsFresh) {
    // eslint-disable-next-line no-console
    console.log('[globalSetup] crawling')

    const browser = await chromium.launch()
    const collector = new LinkCollector(browser, 'http://localhost:3000', ['https://beryx.zondax.ch', 'https://beryx.io'])
    let urlsToTest = await collector.load(initialLinks)
    // Clip the URLs if they exceed the maximum limit
    if (urlsToTest.length > maxUrls) {
      urlsToTest = urlsToTest.slice(0, maxUrls)
    }
    fs.writeFileSync(cacheFilePath, JSON.stringify([...urlsToTest]))
    // eslint-disable-next-line no-console
    console.log(`[globalSetup] cacheFilePath: ${cacheFilePath}`)
  }
}

/**
 * This function loads the URLs from the cache file.
 * It also clips the URLs if they exceed the maximum limit.
 * @function
 * @returns The URLs to test.
 */
export function loadCachedURLs(): string[] {
  const cacheFilePath = path.resolve(__dirname, cacheFile)
  let urls = JSON.parse(fs.readFileSync(cacheFilePath, 'utf-8'))
  // Clip the URLs if they exceed the maximum limit
  if (urls.length > maxUrls) {
    urls = urls.slice(0, maxUrls)
  }
  return urls
}

export default globalSetup
