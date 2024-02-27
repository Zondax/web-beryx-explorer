import { rest } from 'msw'
import { setupServer } from 'msw/node'

import { ContractsByUniqueUsers } from '@/api-client/beryx.types'
import { setTestAuthToken } from '@/helpers/jest'
import { renderWithProviders } from '@/helpers/jest-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@testing-library/jest-dom'
import { screen, waitFor } from '@testing-library/react'

import TopContracts from './TopContracts'

/**
 * Create some mock data for testing
 */
const mockData: { results: ContractsByUniqueUsers[] } = {
  results: [
    {
      count: 1439048,
      tx_to: 'f410fpoidg73f7krlfohnla52dotowde5p2sejxnd4mq',
    },
    {
      count: 352501,
      tx_to: 'f410ftdzcotyx767sm2witzfpr4clri3otgm3j2725ki',
    },
    {
      count: 222223,
      tx_to: 'f410fl6dtu3zjfkdltufdv7e4kmernssoeniqs2rvl2a',
    },
  ],
}

const server = setupServer(
  rest.get('https://api.zondax.ch/fil/stats/v3/mainnet/leaderboard/contracts/top/unique-users', (req, res, ctx) => {
    return res(ctx.json(mockData))
  }),
  rest.post('https://protected-api.zondax.ch/auth/token', (req, res, ctx) => {
    return res(ctx.json({ token: 'TOKEN_TEST' }))
  })
)

/**
 * Test TopContracts tab
 */
describe('TopContracts Tab', () => {
  beforeAll(async () => {
    server.listen()
    await setTestAuthToken()
  })
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  /**
   * Test: Renders the table
   */
  it('renders the table with data', async () => {
    const queryClient = new QueryClient()

    await renderWithProviders(
      <QueryClientProvider client={queryClient}>
        <TopContracts />
      </QueryClientProvider>
    )

    // Check if the table is rendered
    expect(screen.queryByText('Rank')).toBeInTheDocument()
    expect(screen.queryByText('To')).toBeInTheDocument()
    await waitFor(() => screen.getByTestId('first-position-icon'), { timeout: 15000 })
    expect(screen.getByTestId('first-position-icon')).toBeInTheDocument()
    expect(screen.getByTestId('second-position-icon')).toBeInTheDocument()
    expect(screen.getByTestId('third-position-icon')).toBeInTheDocument()
  })
})
