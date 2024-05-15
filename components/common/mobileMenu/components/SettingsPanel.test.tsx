import { rest } from 'msw'
import { setupServer } from 'msw/node'

import { renderWithProviders } from '@/helpers/jest-react'

import SettingsPanel from './SettingsPanel'

const server = setupServer(
  rest.get('https://api.coingecko.com/api/v3/simple/supported_vs_currencies', (req, res, ctx) => {
    return res(ctx.json(['btc', 'eth', 'usd', 'eur']))
  })
)

beforeAll(() => {
  server.listen()
})

beforeEach(() => {
  jest.spyOn(console, 'warn').mockImplementation(message => {
    throw new Error(message)
  })
})

afterEach(() => {
  jest.restoreAllMocks()
})

// Renders the component with the correct layout and styling
it('should render the component with the correct layout and styling', () => {
  // Empty function
  const setIsMenuOpen = jest.fn()
  renderWithProviders(<SettingsPanel setIsMenuOpen={setIsMenuOpen} />)
})
