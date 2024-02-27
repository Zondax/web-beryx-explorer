/**
 * @file This file contains tests for the LinkCollector utility.
 * The LinkCollector utility is used to collect links from a given page.
 * It has a method 'load' which takes an array of relative URLs and returns an array of absolute URLs.
 * The tests check if the 'load' method correctly converts relative URLs to absolute URLs and if it correctly collects links from the page.
 * @module linkCollector.test
 */
import { LinkCollector } from './linkCollector'

describe('LinkCollector', () => {
  /**
   * @var linkCollector - Instance of LinkCollector used for testing.
   * @var page - Mocked page object used for testing.
   * @var mainBaseDomain - Main base domain used for testing.
   * @var alternativeBaseDomains - Alternative base domains used for testing.
   */
  let linkCollector: LinkCollector
  let page: any
  let mainBaseDomain: string
  let alternativeBaseDomains: string[]

  beforeEach(() => {
    /**
     * @function beforeEach - Sets up the testing environment before each test.
     * It initializes the page object, the main base domain, the alternative base domains, and the linkCollector instance.
     */
    page = {
      goto: jest.fn(),
      newPage: jest.fn().mockResolvedValue({
        goto: jest.fn(),
        locator: jest.fn().mockImplementation(() => ({
          elementHandles: jest
            .fn()
            .mockResolvedValue([
              { getAttribute: jest.fn().mockResolvedValue('https://alt1.com/testX') },
              { getAttribute: jest.fn().mockResolvedValue('https://alt2.com/testY') },
              { getAttribute: jest.fn().mockResolvedValue('https://alt2.com/testZ.js') },
            ]),
        })),
        close: jest.fn(),
      }),
    } // Mock page object
    mainBaseDomain = 'https://main.com'
    alternativeBaseDomains = ['https://alt1.com', 'https://alt2.com']
    linkCollector = new LinkCollector(page, mainBaseDomain, alternativeBaseDomains)
  })

  it('collect method should add relativeUrls to discoveredUrls', async () => {
    /**
     * @test {LinkCollector#load}
     * This test checks if the 'load' method correctly converts relative URLs to absolute URLs and if it correctly collects links from the page.
     */
    const relativeUrls = ['/test1', '/test2']
    const result = await linkCollector.load(relativeUrls)

    expect(result).toContain('https://main.com/test1')
    expect(result).toContain('https://main.com/test2')
    expect(result).toContain('https://main.com/testX')
    expect(result).toContain('https://main.com/testY')
    expect(result).not.toContain('https://main.com/testZ.js')
  })
})
