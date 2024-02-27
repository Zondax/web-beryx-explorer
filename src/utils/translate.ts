import { TFunction } from 'i18next'

/**
 * @module translate
 * @description This module provides a utility function for translating text using i18next.
 */

/**
 * Translates the provided name using given instance of the TFunction from i18next.
 * @param t An instance of TFunction from i18next.
 * @param name The name to be translated.
 * @returns Translated string.
 */
export const translate = (t: TFunction<'translation', undefined>, name: string): string => t(name)

/**
 * Validates the language in the path.
 * @param language - The language to validate.
 * @param [path] - The path where the language should be validated.
 * @returns - The new path with the validated language, or undefined if the language is already valid.
 */
export const validateLanguage = (language: string, path?: string) => {
  if (path?.split('/')[2] !== language) {
    const newPath = path?.split('/')
    newPath?.splice(2, 1, language)
    return newPath?.join('/')
  }

  return null
}
