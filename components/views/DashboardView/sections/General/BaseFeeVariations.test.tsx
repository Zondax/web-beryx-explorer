import { rest } from 'msw'
import { setupServer } from 'msw/node'

import { GlobalBaseFee } from '@/api-client/beryx.types'
import { setTestAuthToken } from '@/helpers/jest'
import { renderWithProviders } from '@/helpers/jest-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'

import BaseFeeVariations from './BaseFeeVariations'

/**
 * Create some mock data for testing
 */
const mockData: { results: GlobalBaseFee[] } = {
  results: [
    {
      base_fee_avg: 102.12042905899561,
      base_fee_max: 145,
      base_fee_min: 100,
      bucket: '2024-07-12T00:00:00Z',
    },
    {
      base_fee_avg: 103.01227639424764,
      base_fee_max: 181,
      base_fee_min: 100,
      bucket: '2024-07-11T00:00:00Z',
    },
    {
      base_fee_avg: 101.25621281064053,
      base_fee_max: 128,
      base_fee_min: 100,
      bucket: '2024-07-10T00:00:00Z',
    },
  ],
}

const server = setupServer(
  rest.get('https://api.zondax.ch/fil/stats/v3/mainnet/fees/base/global/daily', (req, res, ctx) => {
    return res(ctx.json(mockData))
  }),

  rest.post('https://protected-api.zondax.ch/auth/token', (req, res, ctx) => {
    return res(ctx.json({ token: 'TOKEN_TEST' }))
  })
)

/**
 * Test Suite for Dashboard General component
 */
describe('Base fee variations', () => {
  beforeAll(async () => {
    server.listen()
    await setTestAuthToken()
  })
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  /**
   * Test: Renders the base fee variations chart
   */
  it('renders the base fee variations chart', async () => {
    const queryClient = new QueryClient()

    await renderWithProviders(
      <QueryClientProvider client={queryClient}>
        <BaseFeeVariations />
      </QueryClientProvider>
    )

    // Check if the chart is rendered
    expect(screen.getByTestId('base-fee-variation')).toBeInTheDocument()
  })
})
