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

// Sort the array using the custom sort function
export const sortArray = (currentArray: string[], priorityStrings: string[]) => {
  // Custom sort function
  const customSort = (a: string, b: string) => {
    // Get the indices of the strings in the priority list
    const indexA = priorityStrings.indexOf(a)
    const indexB = priorityStrings.indexOf(b)

    // Compare the indices to determine the order
    if (indexA === -1 && indexB === -1) {
      // Both strings are not in the priority list, use default lexicographical order
      return a.localeCompare(b)
    } else if (indexA === -1) {
      // Only `b` is in the priority list, `b` comes before `a`
      return 1
    } else if (indexB === -1) {
      // Only `a` is in the priority list, `a` comes before `b`
      return -1
    }
    // Both strings are in the priority list, sort based on their index
    return indexA - indexB
  }

  return currentArray.sort(customSort)
}
