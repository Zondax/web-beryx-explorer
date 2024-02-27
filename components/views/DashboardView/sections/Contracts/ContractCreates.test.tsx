import { rest } from 'msw'
import { setupServer } from 'msw/node'

import { ContractsProps } from '@/api-client/beryx.types'
import { setTestAuthToken } from '@/helpers/jest'
import { renderWithProviders } from '@/helpers/jest-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@testing-library/jest-dom'
import { screen, waitFor } from '@testing-library/react'

import ContractCreates from './ContractCreates'

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
  rest.post('https://protected-api.zondax.ch/auth/token', (req, res, ctx) => {
    return res(ctx.json({ token: 'TOKEN_TEST' }))
  }),

  rest.get('https://api.zondax.ch/fil/stats/v3/mainnet/contract/global/create/daily', (req, res, ctx) => {
    return res(ctx.json(mockData))
  }),

  rest.get('https://api.zondax.ch/fil/stats/v3/mainnet/contract/global/create/weekly', (req, res, ctx) => {
    return res(ctx.json(mockDataByWeek))
  }),

  rest.get('https://api.zondax.ch/fil/stats/v3/mainnet/contract/global/create/monthly', (req, res, ctx) => {
    return res(ctx.json(mockData))
  })
)

/**
 * Test Suite for Dashboard General component
 */
describe('Contract Creates', () => {
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
        <ContractCreates />
      </QueryClientProvider>
    )

    // Check if the first tile is rendered
    expect(screen.getByTestId('total-number-of-contracts')).toBeInTheDocument()
    expect(screen.queryByTestId('number-of-contracts-created-today')).toBeInTheDocument()
    expect(screen.queryByTestId('number-of-contracts-created-this-week')).toBeInTheDocument()

    expect(screen.getByTestId('total-number-of-contracts')).toHaveTextContent(/Loading...|39/)
    expect(screen.getByTestId('number-of-contracts-created-today')).toHaveTextContent(/Loading...|0/)
    await waitFor(() => screen.getByText(/Compared to Last Week/), { timeout: 15000 })
    expect(screen.getByTestId('total-number-of-contracts')).toHaveTextContent(/39/)
    expect(screen.getByTestId('number-of-contracts-created-today')).toHaveTextContent(/0/)
  })
})
