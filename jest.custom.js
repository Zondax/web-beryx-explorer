import { TextDecoder, TextEncoder } from 'util'

/**
 * Assigns the TextEncoder class from the 'util' module to the global object.
 * This is necessary for the Jest environment where the TextEncoder class is not available by default.
 * @global
 */
global.TextEncoder = TextEncoder

/**
 * Assigns the TextDecoder class from the 'util' module to the global object.
 * This is necessary for the Jest environment where the TextDecoder class is not available by default.
 * @global
 * @ts-ignore
 */
global.TextDecoder = TextDecoder
