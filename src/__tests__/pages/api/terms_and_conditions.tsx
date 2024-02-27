import { NextApiRequest, NextApiResponse } from 'next'

import getTermsAndConditions from '../../../../pages/api/terms_and_conditions'

jest.mock('api-client/ghost', () => ({
  getPage: jest.fn(),
}))

describe('getTermsAndConditions API', () => {
  it('fetches page data for "terms-and-conditions" from "#web-corp" and returns it with an HTTP success code', async () => {
    const req = {} as NextApiRequest
    const res = {} as jest.Mocked<NextApiResponse>
    res.status = jest.fn().mockImplementation((code: number) => {
      res.statusCode = code
      return res
    })

    res.json = jest.fn()

    await getTermsAndConditions(req, res)

    expect(res.statusCode).toBe(200)
    expect(res.json).toHaveBeenCalled()
  })
})
