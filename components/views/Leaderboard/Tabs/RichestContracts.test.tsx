import { rest } from 'msw'
import { setupServer } from 'msw/node'

import { setTestAuthToken } from '@/helpers/jest'
import { renderWithProviders } from '@/helpers/jest-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@testing-library/jest-dom'
import { screen, waitFor } from '@testing-library/react'

import { mockData } from './RichList.test'
import RichestContracts from './RichestContracts'

const server = setupServer(
  rest.get('https://api.zondax.ch/fil/stats/v3/mainnet/rich-list/100', (req, res, ctx) => {
    return res(ctx.json(mockData))
  }),
  rest.post('https://protected-api.zondax.ch/auth/token', (req, res, ctx) => {
    return res(ctx.json({ token: 'TOKEN_TEST' }))
  })
)

/**
 * Test RichestContracts tab
 */
describe('Richest Contracts Tab', () => {
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
        <RichestContracts />
      </QueryClientProvider>
    )

    // Check if the table is rendered
    expect(screen.queryByText('Rank')).toBeInTheDocument()
    expect(screen.queryByText('Contract')).toBeInTheDocument()
    await waitFor(() => screen.getByTestId('first-position-icon'), { timeout: 15000 })
    expect(screen.getByTestId('first-position-icon')).toBeInTheDocument()
    expect(screen.getByTestId('second-position-icon')).toBeInTheDocument()
    expect(screen.getByTestId('third-position-icon')).toBeInTheDocument()

    expect(screen.queryByText('f02')).toBeInTheDocument()
    expect(screen.queryByText('f05')).toBeInTheDocument()
  })
})
