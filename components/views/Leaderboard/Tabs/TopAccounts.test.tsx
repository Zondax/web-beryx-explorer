import { rest } from 'msw'
import { setupServer } from 'msw/node'

import { AccountsByGasUsed } from '@/api-client/beryx.types'
import { setTestAuthToken } from '@/helpers/jest'
import { renderWithProviders } from '@/helpers/jest-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@testing-library/jest-dom'
import { screen, waitFor } from '@testing-library/react'

import TopAccounts from './TopAccounts'

/**
 * Create some mock data for testing
 */
const mockData: { results: AccountsByGasUsed[] } = {
  results: [
    {
      gas_used: 195105194071282,
      tx_from: 'f3wcfa5vw7t54rilkeee63x4w6fhytjznk4ywaxjrbr5g5cxogvvrgllwcjtgd4hd5uask7ulzpq4qhk45pu7q',
    },
    {
      gas_used: 182539121588579,
      tx_from: 'f3ro3i54tule2vtdcsjdkzjkf6djx3wwe5znv5h4kwxprxjyojvgyqtyvxus5bj73dy64x4paiqriwupmei3va',
    },
    {
      gas_used: 160710363124470,
      tx_from: 'f3wvnkpobhrtg2sal64hotad2v2aadjbvivkw5uwxdhnk6mawnwl4yjuvueyhxogpzvugd3rc5dsizkfbrfeaq',
    },
    {
      gas_used: 156269333927815,
      tx_from: 'f3r4qr65nttgphefnwop76bkakojivu4or2mpdjal6fn66mjwl5gi3ajsxucvwetk3pomg3yeshvei2uzashpq',
    },
    {
      gas_used: 153650479592449,
      tx_from: 'f3rcraawtswvosopy55ifcqczcajzeoc3xkjxhrkgz6jcm7sxfl5bsfnegwkjgoiwkyvhpol25glpbljc3kbeq',
    },
    {
      gas_used: 152968088476046,
      tx_from: 'f3q77nyqujbdl2typrhrsxbr3v5nvbd5oz7vy63rcwc2i3i4mt4cbgzgd7l3z73jqxqjk3rpmiea6lx5daes4a',
    },
  ],
}

const server = setupServer(
  rest.get('https://api.zondax.ch/fil/stats/v3/mainnet/leaderboard/accounts/top/gas-used', (req, res, ctx) => {
    return res(ctx.json(mockData))
  }),
  rest.post('https://protected-api.zondax.ch/auth/token', (req, res, ctx) => {
    return res(ctx.json({ token: 'TOKEN_TEST' }))
  })
)

/**
 * Test TopAccounts tab
 */
describe('TopAccounts Tab', () => {
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
        <TopAccounts />
      </QueryClientProvider>
    )

    // Check if the table is rendered
    expect(screen.queryByText('Rank')).toBeInTheDocument()
    expect(screen.queryByText('From')).toBeInTheDocument()
    await waitFor(() => screen.getByTestId('first-position-icon'), { timeout: 15000 })
    expect(screen.getByTestId('first-position-icon')).toBeInTheDocument()
    expect(screen.getByTestId('second-position-icon')).toBeInTheDocument()
    expect(screen.getByTestId('third-position-icon')).toBeInTheDocument()
  })
})
