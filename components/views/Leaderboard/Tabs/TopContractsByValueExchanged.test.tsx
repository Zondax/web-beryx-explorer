import { rest } from 'msw'
import { setupServer } from 'msw/node'

import { TopValueExchanged } from '@/api-client/beryx.types'
import { setTestAuthToken } from '@/helpers/jest'
import { renderWithProviders } from '@/helpers/jest-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@testing-library/jest-dom'
import { screen, waitFor } from '@testing-library/react'

import TopContractsByValueExchanged from './TopContractsByValueExchanged'

/**
 * Create some mock data for testing
 */
const mockData: { results: TopValueExchanged[] } = {
  results: [
    {
      actor_type: 'evm',
      exchanged: 4000000125459078025512993355,
      height: 3457990,
      unified_account: 'f1eg74riuj4xdasv2icxjcwxd6l66g2vfxfqhfeza',
    },
    {
      actor_type: 'evm',
      exchanged: 3802003721358301766535193483,
      height: 666513,
      unified_account: 'f3tezkwlahd22wlfj775ycndngz45gm6btlnmaupbouqityxqbe3ct2orfbmdehkfyfgjmdqbxeumnbm55x5ra',
    },
    {
      actor_type: 'evm',
      exchanged: 1571599331301040888270194854,
      height: 3899375,
      unified_account: 'f3tezkwlahd22wlfj775ycndngz45gm6btlnmaupbouqityxqbe3ct2orfbmdehkfyfgjmdqbxeumnbm55x5ra',
    },
  ],
}

const server = setupServer(
  rest.get('https://api.zondax.ch/fil/stats/v3/mainnet/value-exchanged/top/evm/50', (req, res, ctx) => {
    return res(ctx.json(mockData))
  }),
  rest.post('https://protected-api.zondax.ch/auth/token', (req, res, ctx) => {
    return res(ctx.json({ token: 'TOKEN_TEST' }))
  })
)

/**
 * Test RichList tab
 */
describe('Top Value Exchanged Tab', () => {
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
        <TopContractsByValueExchanged />
      </QueryClientProvider>
    )

    // Check if the table is rendered
    await waitFor(() => screen.getByRole('button', { name: /inbound/i }), { timeout: 15000 })
    expect(screen.getByRole('button', { name: /inbound/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /outbound/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument()

    await waitFor(() => screen.getByTestId('first-position-icon'), { timeout: 15000 })
    expect(screen.getByTestId('first-position-icon')).toBeInTheDocument()
    expect(screen.getByTestId('second-position-icon')).toBeInTheDocument()
    expect(screen.getByTestId('third-position-icon')).toBeInTheDocument()
  })
})
