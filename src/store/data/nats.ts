import { NatsConnection } from 'nats.ws'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { getNatsConnectionOptions } from '@/config/nats'
import { NatsManager } from '@/nats/natsManager'
import * as Sentry from '@sentry/nextjs'
import { captureException } from '@sentry/nextjs'

/**
 * @interface NatsState
 * @description Interface for the nats state
 */
interface NatsState {
  natsManager: NatsManager
  status: string
  connections: NatsConnection[]
  isChecking: boolean
}

/**
 * @constant InitialState
 * @description Initial state of the nats store
 */
const InitialState: NatsState = {
  natsManager: new NatsManager(getNatsConnectionOptions()),
  status: 'disconnected',
  connections: [],
  isChecking: false,
}

/**
 * @interface NatsActions
 * @description Interface for the actions in the store
 */
interface NatsActions {
  /**
   * @function checkConnection
   * @description Function to check the connection status
   */
  checkConnection: () => Promise<void>

  /**
   * @function getStatus
   * @description Function to get the connection status
   * @returns The connection status
   */
  getStatus: () => string

  /**
   * @function getConnections
   * @description Function to get the current connections
   * @returns The current connections
   */
  getConnections: () => NatsConnection[]
}

/**
 * @constant useNatsStore
 * @description The nats store where all the connections and states are stored.
 */
export const useNatsStore = create<NatsState & NatsActions>()(
  immer((set, get) => ({
    ...InitialState,

    /**
     * @function checkConnection
     * @description Function to check the connection status
     */
    checkConnection: (() => {
      return async () => {
        if (get().isChecking || get().status === 'connected') {
          return
        }
        try {
          set({ isChecking: true })

          // Force a connection if not connected yet
          Sentry.addBreadcrumb({
            category: 'nats',
            message: 'Checking',
            level: 'debug',
          })

          await get().natsManager.connect()
          set({ status: 'connected' })
          set({ connections: get().natsManager.connections })
        } catch (error) {
          set({ status: 'error' })
          Sentry.captureException(error)
        } finally {
          set({ isChecking: false })
        }
      }
    })(),

    getStatus: () => {
      return get().status
    },

    /**
     * @function getConnections
     * @description Function to get the current connections
     * @returns The current connections
     */
    getConnections: (): NatsConnection[] => {
      return get().natsManager.connections
    },
  }))
)

let timeoutId: NodeJS.Timeout | null = null

/**
 * @function scheduleCheckConnection
 * @description Function to schedule the connection check
 */
const scheduleCheckConnection = () => {
  timeoutId = setTimeout(async () => {
    try {
      await useNatsStore.getState().checkConnection()
    } catch (error) {
      captureException(error)
    } finally {
      scheduleCheckConnection()
    }
  }, 5000)
}

// noinspection PointlessBooleanExpressionJS
if (!timeoutId) {
  scheduleCheckConnection()
}
