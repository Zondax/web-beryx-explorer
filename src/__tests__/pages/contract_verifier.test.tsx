import { rest } from 'msw'
import { setupServer } from 'msw/node'

import { setTestAuthToken } from '@/helpers/jest'
import { renderWithProviders } from '@/helpers/jest-react'
import { screen } from '@testing-library/react'

import ContractVerifyController from '../../../pages/contract_verifier'

const mockVerified = {
  cursor: '',
  data: [
    {
      datetime: 1703617018,
      solc: ['0.8.18'],
      licenses: ['GPL-3.0'],
      verifiers: ['local'],
      verificationType: 'full',
      sourceCID: 'QmWHS1q8doD4uLCTsW9am5k42oLkgYDUiAs56L1WR9FDR6',
      constructorParams: {},
      optimizerRuns: 0,
      contractName: 'ComplexArray2',
      contractAddress: '0xe462e2ea9793d421a0565b86016db31039f924f0',
    },
  ],
}
const server = setupServer(
  rest.post('https://protected-api.zondax.ch/auth/token', (req, res, ctx) => {
    return res(ctx.json({ token: 'TOKEN_TEST' }))
  }),

  rest.get('https://api.coingecko.com/api/v3/simple/price', (req, res, ctx) => {
    return res(ctx.json(undefined))
  }),

  rest.get('https://stream.zondax.ch', (req, res, ctx) => {
    return res(ctx.json({ token: 'TOKEN_TEST' }))
  }),

  rest.get('https://api.zondax.ch/fil/decoder/v3/mainnet/contracts/verified', (req, res, ctx) => {
    return res(ctx.json(mockVerified))
  })
)

beforeAll(async () => {
  server.listen()
  await setTestAuthToken()
})

describe('Contract Verifier Page', () => {
  it('renders without crashing', async () => {
    await renderWithProviders(<ContractVerifyController />)
    const elements = screen.getAllByText('Verify your Smart Contract')
    expect(elements.length).toBeGreaterThan(0)
  })
})
