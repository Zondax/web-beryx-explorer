import getConfig from 'next/config'

import { captureException } from '@sentry/nextjs'
import GhostContentAPI, { GhostAPI, PostOrPage } from '@tryghost/content-api'

/**
 * This function returns an instance of the Ghost API.
 * It uses the Ghost API key and URL from the environment variables.
 * If these variables are not set, it throws an error.
 *
 * @returns - An instance of the Ghost API.
 * @throws {Error} - If the Ghost API key or URL is not set in the environment variables.
 *
 * @see {@link https://ghost.org/docs/content-api/javascript/}
 */
export function getGhostAPI(): GhostAPI {
  const ghostApiKey = process.env.GHOST_API_KEY || getConfig().publicRuntimeConfig.GHOST_API_KEY
  const ghostApiUrl = process.env.GHOST_API_URL || getConfig().publicRuntimeConfig.GHOST_API_URL
  if (!ghostApiKey || !ghostApiUrl) {
    throw new Error('Missing Ghost API secrets')
  }

  // Create API instance with site credentials
  return new GhostContentAPI({
    url: ghostApiUrl,
    key: ghostApiKey,
    version: 'v5.0',
  })
}

/**
 * Fetches news posts from Ghost API.
 * @param params - The parameters for fetching posts.
 * @param params.tag - The tag of the posts to fetch.
 * @param params.limit - The maximum number of posts to fetch.
 * @returns - A promise that resolves to an array of posts.
 */
export async function getNewsPosts({ tag, limit }: { tag: string; limit: number }): Promise<PostOrPage[]> {
  const api = getGhostAPI()
  const options = limit ? { filter: `tag:${tag}`, limit } : { filter: `tag:${tag}` }
  return await api.posts.browse(options)
}

/**
 * Removes internal tags from a post or page.
 * @param postOrPage - The post or page to remove internal tags from.
 * @returns - The post or page without internal tags.
 */
const removeInternalTags = (postOrPage: PostOrPage): PostOrPage => {
  return {
    ...postOrPage,
    tags: postOrPage.tags?.filter(tag => tag.visibility !== 'internal'),
  }
}

/**
 * Creates a filter string from tags.
 * @param params - The parameters for creating the filter.
 * @param params.siteTag - The site tag.
 * @param params.tags - The tags to include in the filter.
 * @param params.internal - Whether to include internal tags in the filter.
 * @param params.exclude - The tags to exclude from the filter.
 * @param params.excludeID - The IDs to exclude from the filter.
 * @returns - The filter string.
 */
const createFilterFromTags = ({
  siteTag,
  tags = [],
  internal = false,
  exclude = [],
  excludeID = [],
}: {
  siteTag: string
  tags?: string[]
  internal?: boolean
  exclude?: string[]
  excludeID?: string[]
}) => {
  const includeTags = tags
    .concat(siteTag) // include only site posts (e.g. #site or 'hash-site')
    .concat(!internal ? '-#internal' : []) // exclude #internal posts
    .concat(exclude ? exclude.map(item => `-${item}`) : [])
    .map(tag => tag.replace(/#/, 'hash-')) // make sure tags beginning with # are understood by the Ghost filter
    .map(tag => `tag:${tag}`)
    .join('+')

  if (excludeID.length) {
    const excludeIDs = excludeID.map(tag => `id:-${tag}`)
    return `${excludeIDs.join('+')}+${includeTags}`
  }

  return includeTags
}

/**
 * getPostsProps
 * @property siteTag - The site tag.
 * @property {number|string} [limit=6] - The maximum number of posts to fetch.
 * @property {string[]} [tags=[]] - The tags of the posts to fetch.
 * @property [page=1] - The page number to fetch.
 * @property [internal=false] - Whether to fetch internal posts.
 * @property {string[]} [exclude=[]] - The tags to exclude from the fetch.
 * @property {string[]} [excludeID=[]] - The IDs to exclude from the fetch.
 */
export interface getPostsProps {
  siteTag: string
  limit?: number | 'all'
  tags?: string[]
  page?: number
  internal?: boolean
  exclude?: string[]
  excludeID?: string[]
}

/**
 * Fetches posts from Ghost API.
 * @param params - The parameters for fetching posts.
 * @returns - A promise that resolves to an object containing the fetched posts and pagination data.
 */
export async function getPosts({ siteTag, limit = 6, tags = [], page = 1, internal = false, exclude = [], excludeID = [] }: getPostsProps) {
  const api = getGhostAPI()
  const filter = createFilterFromTags({ siteTag, tags, internal, exclude, excludeID })

  // The .browse method returns PostsOrPages which is not really an Array because
  // it has an extra .meta property which includes pagination data
  let postsWithMeta
  try {
    postsWithMeta = await api.posts.browse({
      include: ['tags', 'authors'],
      limit,
      filter,
      page,
    })
  } catch (err) {
    captureException(err)
    throw err
  }

  // Destructure the posts with meta into a proper object
  return {
    posts: postsWithMeta?.slice(0).map(removeInternalTags) ?? null,
    pagination: postsWithMeta?.meta.pagination ?? null,
  }
}

/**
 * Fetches a post from Ghost API.
 * @param slug - The slug of the post to fetch.
 * @returns - A promise that resolves to the fetched post or null if the post does not exist.
 */
export async function getPost(slug: string): Promise<PostOrPage | null> {
  const api = getGhostAPI()

  try {
    // Destructure the posts with meta into a proper object
    return await api.posts.read({ slug })
  } catch (err) {
    captureException(err)
    throw err
  }
}

/**
 * Checks if a post or page is a site post or page.
 * @param siteTag - The site tag.
 * @param postOrPage - The post or page to check.
 * @returns - The post or page if it is a site post or page.
 * @throws {Error} - If the post or page is not a site post or page.
 */
const isSitePostOrPageOrThrow = (siteTag: string, postOrPage: PostOrPage) => {
  if (postOrPage.tags?.some(tag => tag.name === siteTag)) {
    return postOrPage
  }
  throw new Error('403 Forbidden')
}

/**
 * Fetches a page from Ghost API.
 * @param siteTag - The site tag.
 * @param [slug] - The slug of the page to fetch.
 * @returns - A promise that resolves to the fetched page or null if the page does not exist.
 */
export async function getPage(siteTag: string, slug?: string) {
  if (!slug) {
    return null
  }
  const api = getGhostAPI()
  const filter = createFilterFromTags({ siteTag })

  try {
    const page = await api.pages.read({ slug }, { include: ['tags', 'authors'], filter })
    const sitePage = isSitePostOrPageOrThrow(siteTag, page)
    return removeInternalTags(sitePage)
  } catch (err) {
    captureException(err)
    return null
  }
}
