import { captureException } from '@sentry/nextjs'

/**
 * Function to confirm unique items in an array based on a key mapping function.
 *
 * @param items - The array of items to be checked.
 * @param keyMapping - The function to generate a unique key for each item.
 * @param warn
 * @returns - Returns a new array with duplicate items removed and an error logged for each duplicate.
 */
export const confirmDistinctItems = <T>(items: T[] | undefined, keyMapping: (item: T) => string, warn = false): T[] => {
  if (items === undefined || items === null) {
    return []
  }

  const distinctItems: T[] = []
  const seenIds: Set<string> = new Set()

  if (items && Array.isArray(items)) {
    items.forEach(item => {
      const itemId = keyMapping(item)

      if (!seenIds.has(itemId)) {
        distinctItems.push(item)
        seenIds.add(itemId)
      } else {
        if (warn) {
          captureException(new Error(`Duplicated Item ${keyMapping(item)}`))
        }
      }
    })
  }

  return distinctItems
}

/**
 * Analyzes if the provided type is an array (contains "[]") and returns the length of the array or null.
 * @param type - The type to analyze.
 * @returns - Returns an object with the type of array, its length (if fixed), and the index where the array starts in the type string. If the type is not an array, returns null.
 */
export const isArrayType = (type: string): { type: 'fixed' | 'dynamic'; length?: number; index: number } | null => {
  // Use a non-backtracking regex to prevent potential denial of service
  const regex = /(\[(\d*|)])$/g
  const matches = regex.exec(type)
  if (matches) {
    if (!isNaN(parseInt(matches[2]))) {
      return { type: 'fixed', length: parseInt(matches[2]), index: matches.index }
    }
    if (matches[2] === '') {
      return { type: 'dynamic', index: matches.index }
    }
  }
  return null
}
