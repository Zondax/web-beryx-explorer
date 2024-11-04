import { rest } from 'msw'
import { setupServer } from 'msw/node'

import { RichList as RichListProps } from '@/api-client/beryx.types'
import { setTestAuthToken } from '@/helpers/jest'
import { renderWithProviders } from '@/helpers/jest-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@testing-library/jest-dom'
import { screen, waitFor } from '@testing-library/react'

import RichList from './RichList'

/**
 * Create some mock data for testing
 */
export const mockData: { results: RichListProps[] } = {
  results: [
    {
      unified_account: 'f02',
      balance: '774613002111309483316152425',
      last_seen_height: 3576436,
      actor_type: 'reward',
      ratio: 38.73065010556547,
      first_seen: '2020-08-24T22:00:00Z',
      last_seen: '2023-08-24T22:00:00Z',
    },
    {
      unified_account: 'f05',
      balance: '514466948099395662358405849',
      last_seen_height: 3576436,
      actor_type: 'unknown',
      ratio: 25.723347404969783,
      first_seen: '2020-08-24T22:00:00Z',
      last_seen: '2023-08-24T22:00:00Z',
    },
    {
      unified_account: 'f1m2swr32yrlouzs7ijui3jttwgc6lxa5n5sookhi',
      balance: '72295119470787217761306643',
      last_seen_height: 3559124,
      actor_type: 'account',
      ratio: 3.614755973539361,
      first_seen: '2020-11-26T04:33:30Z',
      last_seen: '2023-08-24T22:00:00Z',
    },
  ],
}

const server = setupServer(
  rest.get('https://api.zondax.ch/fil/stats/v3/mainnet/rich-list/100', (req, res, ctx) => {
    return res(ctx.json(mockData))
  }),
  rest.post('https://protected-api.zondax.ch/auth/token', (req, res, ctx) => {
    return res(ctx.json({ token: 'TOKEN_TEST' }))
  })
)

/**
 * Test RichList tab
 */
describe('Rich List Tab', () => {
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
        <RichList />
      </QueryClientProvider>
    )

    // Check if the table is rendered
    expect(screen.queryByText('Rank')).toBeInTheDocument()
    expect(screen.queryByText('Address')).toBeInTheDocument()
    await waitFor(() => screen.getByTestId('first-position-icon'), { timeout: 15000 })
    expect(screen.getByTestId('first-position-icon')).toBeInTheDocument()
    expect(screen.getByTestId('second-position-icon')).toBeInTheDocument()
    expect(screen.getByTestId('third-position-icon')).toBeInTheDocument()

    expect(screen.queryByText('f02')).toBeInTheDocument()
    expect(screen.queryByText('f05')).toBeInTheDocument()
  })
})
