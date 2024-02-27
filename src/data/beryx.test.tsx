import { Networks } from '@/config/networks'
import { setTestAuthToken } from '@/helpers/jest'
import { queryWrapper } from '@/helpers/jest-react'
import { renderHook, waitFor } from '@testing-library/react'

import { useContractCompilers, useContractVerified, useContractsVerified, useRichList } from './beryx'

beforeAll(async () => {
  await setTestAuthToken()
})

describe('Contract Hooks', () => {
  it('fetches contract verification', () => {
    const { result } = renderHook(() => useContractVerified(Networks.mainnet, 'f410fbc5bvr7rl4rbl4t3kqb2rg7nelhlodh3qe2l5ii'), {
      wrapper: queryWrapper,
    })
    expect(result.current.error).toBeNull()
  })

  it('fetches contract compilers', () => {
    const { result } = renderHook(() => useContractCompilers(Networks.mainnet), { wrapper: queryWrapper })
    expect(result.current.error).toBeNull()
  })

  it('fetches contracts verified', async () => {
    const { result } = renderHook(() => useContractsVerified(Networks.mainnet, { page: 1 }), { wrapper: queryWrapper })
    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 15000 })
    expect(result.current.isError).toBe(false)
  })
})

it('richlist', async () => {
  const { result } = renderHook(() => useRichList(Networks.mainnet), { wrapper: queryWrapper })
  await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 15000 })
  expect(result.current.isError).toBe(false)
})
