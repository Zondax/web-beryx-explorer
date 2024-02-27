/**
 * @file This file contains tests for the Metadata utility functions.
 * The Metadata utility functions are used to retrieve metadata for a given page.
 * It imports PAGES from Sidebar component to test metadata retrieval and
 * getPageMetaData function to retrieve metadata for given page.
 * The tests check if the getPageMetaData function retrieves the correct meta properties for the HOME page.
 * @module metaData.test
 */
import { PAGES } from '../../components/Layout/components/Sidebar'
import { getPageMetaData } from './metaData'

/**
 * @description Test suite for Metadata utility functions
 */
describe('Metadata utility functions', () => {
  /**
   * @description Test case for getPageMetaData function.
   * This will check if the function retrieves the correct meta properties for the HOME page.
   */
  Object.values(PAGES).forEach(page => {
    test(`getPageMetaData function for ${page} page`, () => {
      /**
       * @description Calling getPageMetaData function to retrieve metadata for the page.
       */
      const pageMeta = getPageMetaData(page)

      /**
       * @description Expecting the pageMeta object to have a property 'metaTitle'.
       */
      expect(pageMeta).toHaveProperty('metaTitle')

      /**
       * @description Expecting the pageMeta object to have a property 'metaDescription'.
       */
      expect(pageMeta).toHaveProperty('metaDescription')

      /**
       * @description Expecting the pageMeta object to have a property 'metaImage'.
       */
      expect(pageMeta).toHaveProperty('metaImage')

      /**
       * @description Expecting the pageMeta object to have a property 'metaURL'.
       */
      expect(pageMeta).toHaveProperty('metaURL')
    })
  })
})
