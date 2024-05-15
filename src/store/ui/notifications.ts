import { format } from 'date-fns-tz'
import { v4 } from 'uuid'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { NetworkType } from '@/config/networks'

/**
 * @interface TransactionNotification
 * @description Interface for the transaction notifications
 */
export interface TransactionNotification {
  id: string
  title: string
  time: string
  date: string
  network?: NetworkType
  tx_to?: string
  tx_hash?: string
  method?: string
  value: string
  status: 'mempool' | 'confirm' | 'error'
  tag: string[]
}

/**
 * @interface GenericNotification
 * @description Interface for the generic notifications
 */
export interface GenericNotification {
  id: string
  title: string
  time: string
  date: string
  description?: string
  status: 'confirm' | 'error'
  tag: string[]
}

/**
 * @interface NotificationsState
 * @description Interface for the notifications state
 */
interface NotificationsState {
  notifications: (TransactionNotification | GenericNotification)[]
  newNotification: boolean
}

// Define a type alias for the parameters of the addNotification function
export type NotificationToAdd = Omit<TransactionNotification, 'time' | 'date' | 'id'> | Omit<GenericNotification, 'time' | 'date' | 'id'>

/**
 * @constant InitialNotificationState
 * @description The initial state of the notifications
 */
export const InitialNotificationState: NotificationsState = {
  notifications: [],
  newNotification: false,
}

/**
 * @interface NotificationsActions
 * @description Interface for the actions in the store
 */
interface NotificationsActions {
  addNotification: (notification: NotificationToAdd) => void
  deleteNotification: (id: string) => void
  deleteAll: () => void
  handleNewNotification: (value: boolean) => void
}

/**
 * @constant storeOptions
 * @description The options for the store
 */
const storeOptions = {
  name: 'appSettings-store',
}

/**
 * @constant useNotificationsStore
 * @description The notifications store where all the notifications and states are stored.
 */
export const useNotificationsStore = create<NotificationsState & NotificationsActions>()(
  immer(
    persist(
      (set, get) => ({
        ...InitialNotificationState,
        // actions
        addNotification: (notification: NotificationToAdd) => {
          const notifications = get().notifications
          const completeNotification = {
            ...notification,
            id: v4(),
            time: format(new Date(), 'KK:mm aa'),
            date: format(new Date(), 'MMM dd'),
          }

          notifications.unshift(completeNotification)
          set({ notifications, newNotification: true })
        },
        deleteNotification: (id: string) => {
          let notifications = get().notifications
          notifications = notifications.filter(({ id: currentId }) => currentId !== id)
          set({ notifications })
        },
        deleteAll: () => {
          set({ notifications: [] })
        },
        handleNewNotification: (value: boolean) => {
          set({ newNotification: value })
        },
      }),
      storeOptions
    )
  )
)
