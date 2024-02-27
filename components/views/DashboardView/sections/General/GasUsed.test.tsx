import { rest } from 'msw'
import { setupServer } from 'msw/node'

import { GasUsedProps } from '@/api-client/beryx.types'
import { setTestAuthToken } from '@/helpers/jest'
import { renderWithProviders } from '@/helpers/jest-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@testing-library/jest-dom'
import { screen, waitFor } from '@testing-library/react'

import GasUsed from './GasUsed'

/**
 * Create some mock data for testing
 */
const mockData: { results: GasUsedProps[] } = {
  results: [
    {
      bucket: '2022-01-01T00:00:00.000Z',
      gas_used: '15',
    },
    {
      bucket: '2022-02-01T00:00:00.000Z',
      gas_used: '13',
    },
    {
      bucket: '2022-03-01T00:00:00.000Z',
      gas_used: '11',
    },
  ],
}

/**
 * Create some mock data for testing
 */
const mockDataByWeek: { results: GasUsedProps[] } = {
  results: [
    {
      bucket: '2023-01-08T00:00:00.000Z',
      gas_used: '15',
    },
    {
      bucket: '2023-01-01T00:00:00.000Z',
      gas_used: '13',
    },
  ],
}
const server = setupServer(
  rest.get('https://api.zondax.ch/fil/stats/v3/mainnet/gas-used/global/daily', (req, res, ctx) => {
    return res(ctx.json(mockData))
  }),

  rest.get('https://api.zondax.ch/fil/stats/v3/mainnet/gas-used/global/weekly', (req, res, ctx) => {
    return res(ctx.json(mockDataByWeek))
  }),

  rest.get('https://api.zondax.ch/fil/stats/v3/mainnet/gas-used/global/monthly', (req, res, ctx) => {
    return res(ctx.json(mockData))
  }),

  rest.post('https://protected-api.zondax.ch/auth/token', (req, res, ctx) => {
    return res(ctx.json({ token: 'TOKEN_TEST' }))
  })
)

/**
 * Test Suite for Dashboard General component
 */
describe('Dashboard General', () => {
  beforeAll(async () => {
    server.listen()
    await setTestAuthToken()
  })
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  /**
   * Test: Renders the first tile if there is data
   */
  it('renders the first tile if there is data', async () => {
    const queryClient = new QueryClient()

    await renderWithProviders(
      <QueryClientProvider client={queryClient}>
        <GasUsed />
      </QueryClientProvider>
    )

    // Check if the first tile is rendered
    expect(screen.getByTestId('gas-used-this-week')).toBeInTheDocument()
    expect(screen.queryByTestId('avg-gas-used-past-24-hours')).toBeInTheDocument()

    const gasUsedThisWeek = screen.getByTestId('gas-used-this-week')
    const avgGasUsedPast24Hours = screen.getByTestId('avg-gas-used-past-24-hours')

    await waitFor(() => screen.getByText(/Compared to Last Week/), { timeout: 15000 })

    const gasUsedThisWeekText = gasUsedThisWeek.textContent
    const avgGasUsedPast24HoursText = avgGasUsedPast24Hours.textContent

    expect(gasUsedThisWeekText).toContain('0.0%' || 'Loading...')
    expect(avgGasUsedPast24HoursText).toContain('0attoFIL' || 'Loading...')
  })
})
