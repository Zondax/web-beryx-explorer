import { renderWithProviders } from '@/helpers/jest-react'

import RpcController from '../../../pages/rpc'

describe('RPC Page', () => {
  it('renders without crashing', async () => {
    await renderWithProviders(<RpcController />)
  })
})
