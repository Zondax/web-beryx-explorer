/**
 * @file This file contains utility functions for fetching fonts.
 * It exports three functions:
 * - fontSora: This function fetches the Sora-Bold font.
 * - fontDmSans: This function fetches the DMSans-Regular font.
 * - fontB612Mono: This function fetches the B612Mono-Regular font.
 * @module OGFonts
 */

/**
 * Fetches the Sora-Bold font.
 * @returns - A promise that resolves to an ArrayBuffer of the font file.
 */
export const fontSora = fetch(new URL('../../public/fonts/Sora/static/Sora-Bold.ttf', import.meta.url)).then(res => res.arrayBuffer())

/**
 * Fetches the DMSans-Regular font.
 * @returns - A promise that resolves to an ArrayBuffer of the font file.
 */
export const fontDmSans = fetch(new URL('../../public/fonts/DM_Sans/DMSans-Regular.ttf', import.meta.url)).then(res => res.arrayBuffer())

/**
 * Fetches the B612Mono-Regular font.
 * @returns - A promise that resolves to an ArrayBuffer of the font file.
 */
export const fontB612Mono = fetch(new URL('../../public/fonts/B612_Mono/B612Mono-Regular.ttf', import.meta.url)).then(res =>
  res.arrayBuffer()
)
