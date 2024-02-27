/**
 * @module text
 * @description This module provides utility functions for text manipulation.
 */
import { captureException } from '@sentry/nextjs'

/**
 * Truncates the middle of a string to a specified maximum length.
 * @param str - The string to truncate.
 * @param maxLength - The maximum length of the string.
 * @returns The truncated string, or undefined if the input string is empty.
 */
export const truncateMiddleOfString = (str: string, maxLength: number) => {
  if (!str) {
    return null
  }
  if (str.length <= maxLength) {
    return str
  }
  const middle = Math.floor(maxLength / 2)
  const start = str.substring(0, middle)
  const end = str.substring(str.length - middle, str.length)
  return `${start}...${end}`
}

/**
 * Copies a string to the clipboard.
 * @param text - The text to copy.
 * @throws Will throw an error if the copy operation fails.
 */
export const copyContent = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text.toString())
  } catch (err) {
    captureException(err)
    throw err
  }
}

/**
 * Filters a search input string by removing spaces and converting to lowercase.
 * @param input - The search input string.
 * @returns The filtered search input string.
 */
export const filterSearchInput = (input: string): string => {
  return input.toLowerCase().replace(/ /g, '')
}
