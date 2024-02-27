/**
 * @file This file contains utility functions and a class for collecting links from a given page.
 * It exports two functions:
 * - findHrefs: This function finds all href elements on a page and returns them as an array of strings.
 * - extractUrlsFromPage: This function extracts all URLs from a page that meet certain criteria and returns them as an array of strings.
 * It also exports a class:
 * - LinkCollector: This class is used to collect links from a page. It has a method 'collect' which takes an array of relative URLs and a maximum depth, and a method 'load' which takes an array of relative URLs and returns an array of absolute URLs.
 *
 * @module linkCollector
 */
import { Browser, Page } from '@playwright/test'

const DEFAULT_MAX_DEPTH = 3
const DEFAULT_MAX_WORKERS = 8
export const WAIT_UNTIL_CRITERIA = 'load'

/**
 * This function finds all href elements on a page and returns them as an array of strings.
 * @param page - The page to find href elements on.
 * @returns - An array of href elements found on the page.
 */
export async function findHrefs(page: Page): Promise<string[]> {
  const hrefElements: string[] = []
  const elements = await page.locator('*[href]').elementHandles()
  for (const element of elements) {
    const href = await element.getAttribute('href')
    if (href) {
      hrefElements.push(href)
    }
  }
  return hrefElements
}

/**
 * This function extracts all URLs from a page that meet certain criteria and returns them as an array of strings.
 * @param page - The page to extract URLs from.
 * @param mainBaseDomain - The main base domain to use when constructing absolute URLs.
 * @param alternativeBaseDomains - An array of alternative base domains to use when constructing absolute URLs.
 * @returns - An array of URLs extracted from the page.
 */
export async function extractUrlsFromPage(page: Page, mainBaseDomain: string, alternativeBaseDomains: string[]): Promise<string[]> {
  const allHrefs = await findHrefs(page)

  return allHrefs
    .filter(href => {
      if (!href) {
        return false
      }
      if (href.startsWith('mailto:')) {
        return false
      }

      // Filter out image URLs
      if (href.includes('.jpg') || href.includes('.png') || href.includes('.gif') || href.includes('.ico') || href.includes('.svg')) {
        return false
      }
      // Filter out code
      if (href.includes('.js') || href.includes('.css')) {
        return false
      }

      if (href.startsWith(mainBaseDomain)) {
        return true
      }

      if (alternativeBaseDomains.some(domain => href.startsWith(domain))) {
        return true
      }

      return !href.startsWith('http')
    })
    .map(href => {
      const url = new URL(href ?? '/', mainBaseDomain)
      const relativeUrl = url.pathname + url.search ?? '/'
      return new URL(relativeUrl, mainBaseDomain).toString()
    })
}

/**
 * This class is used to collect links from a page. It has a method 'collect' which takes an array of relative URLs and a maximum depth, and a method 'load' which takes an array of relative URLs and returns an array of absolute URLs.
 */
export class LinkCollector {
  private readonly discoveredUrls: Set<string>
  private readonly mainBaseDomain: string
  private readonly alternativeBaseDomains: string[]
  private browser: Browser

  constructor(browser: Browser, mainBaseDomain: string, alternativeBaseDomains: string[]) {
    this.discoveredUrls = new Set()
    this.mainBaseDomain = mainBaseDomain
    this.alternativeBaseDomains = alternativeBaseDomains
    this.browser = browser
  }

  /**
   * This method collects links from a page. It takes an array of relative URLs and a maximum depth.
   * @param relativeUrls - An array of relative URLs to collect links from.
   * @param maxDepth - The maximum depth to collect links from.
   * @returns {Promise<void>}
   */
  public async collect(relativeUrls: string[], maxDepth = DEFAULT_MAX_DEPTH): Promise<void> {
    const queue: { url: string; depth: number }[] = relativeUrls.map(url => ({
      url: new URL(url, this.mainBaseDomain).toString(),
      depth: 0,
    }))

    /**
     * @async
     * @function processQueueItem
     * @param current - An object containing the current URL and its depth.
     * @param current.url - The current URL.
     * @param current.depth - The depth of the current URL.
     * @desc This method processes a queue item. It checks if the depth of the current URL is less than the maximum depth. If it is, it opens a new page in the browser and navigates to the current URL. If the current URL is not already in the discovered URLs, it adds it. It then extracts new URLs from the page and adds them to the queue if they are not already in the discovered URLs. Finally, it closes the page.
     */
    const processQueueItem = async (current: { url: string; depth: number }) => {
      if (current.depth < maxDepth) {
        try {
          if (!this.discoveredUrls.has(current.url)) {
            const page = await this.browser.newPage()
            await page.goto(current.url, { waitUntil: WAIT_UNTIL_CRITERIA })
            this.discoveredUrls.add(current.url) // Add the current URL to the discovered URLs

            const newUrls = await extractUrlsFromPage(page, this.mainBaseDomain, this.alternativeBaseDomains)
            for (const url of newUrls) {
              if (!this.discoveredUrls.has(url)) {
                queue.push({ url, depth: current.depth + 1 })
              }
            }
            await page.close()
          }
        } catch (error) {
          // Handle error
        }
      }
    }

    while (queue.length) {
      const tasks = []
      for (let i = 0; i < DEFAULT_MAX_WORKERS && queue.length; i++) {
        const current = queue.shift()
        if (current) {
          tasks.push(processQueueItem(current))
        }
      }
      await Promise.all(tasks)
    }
  }

  /**
   * This method takes an array of relative URLs and returns an array of absolute URLs.
   * @param relativeUrls - An array of relative URLs to convert to absolute URLs.
   * @returns - An array of absolute URLs.
   */
  public async load(relativeUrls: string[]): Promise<string[]> {
    await this.collect(relativeUrls)
    return Array.from(this.discoveredUrls)
  }
}

export const navigationOptions = {
  timeout: 60000,
  waitUntil: 'domcontentloaded' as 'domcontentloaded' | 'networkidle' | 'commit' | undefined,
}
