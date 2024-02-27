/**
 * List of supported languages
 * @type {string[]}
 */
const supportedLngs = ['en', 'es']

/**
 * Configuration for ni18n
 * @type {object}
 * @property {string[]} supportedLngs - List of supported languages
 * @property {string[]} ns - Namespace used for translations
 */
export const ni18nConfig = {
  supportedLngs,
  ns: ['translation'],
}
