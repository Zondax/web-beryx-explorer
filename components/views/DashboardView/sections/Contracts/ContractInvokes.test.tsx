import { rest } from 'msw'
import { setupServer } from 'msw/node'

import { ContractsProps } from '@/api-client/beryx.types'
import { setTestAuthToken } from '@/helpers/jest'
import { renderWithProviders } from '@/helpers/jest-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@testing-library/jest-dom'
import { screen, waitFor } from '@testing-library/react'

import ContractInvokes from './ContractInvokes'

/**
 * Create some mock data for testing
 */
const mockData: { results: ContractsProps[] } = {
  results: [
    {
      bucket: '2023-01-01T00:00:00.000Z',
      count: 15,
    },
    {
      bucket: '2023-02-01T00:00:00.000Z',
      count: 13,
    },
    {
      bucket: '2023-03-01T00:00:00.000Z',
      count: 11,
    },
  ],
}
/**
 * Create some mock data for testing
 */
const mockDataByWeek: { results: ContractsProps[] } = {
  results: [
    {
      bucket: '2023-01-08T00:00:00.000Z',
      count: 13,
    },
    {
      bucket: '2023-01-01T00:00:00.000Z',
      count: 15,
    },
  ],
}

const server = setupServer(
  rest.get('https://api.zondax.ch/fil/stats/v3/mainnet/contract/global/invoke/daily', (req, res, ctx) => {
    return res(ctx.json(mockData))
  }),

  rest.get('https://api.zondax.ch/fil/stats/v3/mainnet/contract/global/invoke/weekly', (req, res, ctx) => {
    return res(ctx.json(mockDataByWeek))
  }),

  rest.get('https://api.zondax.ch/fil/stats/v3/mainnet/contract/global/invoke/monthly', (req, res, ctx) => {
    return res(ctx.json(mockData))
  }),

  rest.post('https://protected-api.zondax.ch/auth/token', (req, res, ctx) => {
    return res(ctx.json({ token: 'TOKEN_TEST' }))
  })
)

/**
 * Test Suite for Dashboard General component
 */
describe('Contract Invokes', () => {
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
        <ContractInvokes />
      </QueryClientProvider>
    )

    // Check if the first tile is rendered
    expect(screen.getByTestId('number-of-contract-invokes-today')).toBeInTheDocument()
    expect(screen.queryByTestId('number-of-contract-invokes-week')).toBeInTheDocument()
    expect(screen.queryByTestId('number-of-contracts-invokes-this-week')).toBeInTheDocument()

    expect(screen.getByTestId('number-of-contract-invokes-today')).toHaveTextContent(/Loading...|0/)
    expect(screen.getByTestId('number-of-contract-invokes-week')).toHaveTextContent(/Loading...|0/)
    await waitFor(() => screen.getByText(/Compared to Last Week/), { timeout: 15000 })
    expect(screen.getByTestId('number-of-contract-invokes-today')).toHaveTextContent(/0/)
    expect(screen.getByTestId('number-of-contract-invokes-week')).toHaveTextContent(/0/)
  })
})
