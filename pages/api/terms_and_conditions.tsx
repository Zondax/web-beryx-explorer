import { NextApiRequest, NextApiResponse } from 'next'

import { getPage } from '@/api-client/ghost'

/**
 * Async function getTermsAndConditions.
 *
 * @param req - The request object.
 * @param res - The response object.
 * This function fetches page data for 'terms-and-conditions' from '#web-corp' and returns it with an HTTP success code.
 */

export default async function getTermsAndConditions(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const data = await getPage('#web-corp', 'terms-and-conditions')

  // Return HTTP success code
  res.status(200).json(data)
}
