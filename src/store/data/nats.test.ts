import { hookHelper } from '@/helpers/jest'
import { act } from '@testing-library/react'

import { useNatsStore } from './nats'

describe('useNatsStore', () => {
  it('hookHelper works', () => {
    const natsStore = hookHelper(useNatsStore)
    expect(natsStore()).toBeDefined()
  })

  // The getConnections function should return the correct connections.

  it('getConnections returns correct connections', () => {
    const natsStore = hookHelper(useNatsStore)
    act(() => {
      const connections = natsStore().getConnections()
      expect(connections).toEqual([])
    })
  })

  // The checkConnection function should update the status to 'connected' after a successful connection.
  it('checkConnection updates status', async () => {
    const natsStore = hookHelper(useNatsStore)

    await act(async () => {
      await natsStore().checkConnection()
      expect(natsStore().getStatus()).toEqual('connected')
    })
  })

  // The getConnections function should return the correct connections.
  it('getConnections returns correct connections', () => {
    const natsStore = hookHelper(useNatsStore)

    act(() => {
      const connections = natsStore().getConnections()
      expect(connections).toEqual(natsStore().connections)
    })
  })

  // The getStatus function should return the correct connection status.
  it('getStatus returns correct status', () => {
    const natsStore = hookHelper(useNatsStore)
    act(() => {
      const status = natsStore().getStatus()
      expect(status).toEqual(natsStore().status)
    })
  })

  // The checkConnection function should not run if isChecking is true.
  it('checkConnection does not run when already checking', async () => {
    const natsStore = hookHelper(useNatsStore)
    natsStore().isChecking = true

    // Create a mock function for natsManager.connect
    const mockConnect = jest.fn()
    act(() => {
      natsStore().natsManager.connect = mockConnect
    })

    await act(async () => {
      await natsStore().checkConnection()
    })

    // Now you can check if the mock function has been called
    expect(mockConnect).not.toHaveBeenCalled()
  })

  // The checkConnection function should not change the status if it's already 'connected'.
  it("checkConnection updates status to 'connected' when already connected", async () => {
    const natsStore = hookHelper(useNatsStore)
    natsStore().status = 'connected'

    await natsStore().checkConnection()

    expect(natsStore().getStatus()).toEqual('connected')
  })

  // The checkConnection function should not change the connections if the status is already 'connected'.
  it('checkConnection does not change connections when already connected', async () => {
    const natsStore = hookHelper(useNatsStore)
    natsStore().status = 'connected'
    const connections = natsStore().getConnections()

    await act(async () => {
      await natsStore().checkConnection()
    })

    expect(natsStore().getConnections()).toEqual(connections)
  })

  // The checkConnection function should update the connections after a successful connection.

  // The checkConnection function should not run if isChecking is true.
  it('checkConnection does not run when already checking', async () => {
    const natsStore = hookHelper(useNatsStore)
    natsStore().isChecking = true

    // Create a mock function for natsManager.connect
    const mockConnect = jest.fn()

    act(() => {
      natsStore().natsManager.connect = mockConnect
    })

    await act(async () => {
      await natsStore().checkConnection()
    })

    // Now you can check if the mock function has been called
    expect(mockConnect).not.toHaveBeenCalled()
  })

  // The checkConnection function should update the connections after a successful connection.
  it('checkConnection updates connections on successful connection', async () => {
    const natsStore = hookHelper(useNatsStore)
    const newConnections = ['connection1', 'connection2']
    natsStore().natsManager.connections = newConnections

    await act(async () => {
      await natsStore().checkConnection()
    })

    expect(natsStore().getConnections()).toEqual(newConnections)
  })
})
