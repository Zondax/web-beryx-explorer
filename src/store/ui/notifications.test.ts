import { act } from 'react-dom/test-utils'

import { hookHelper } from '@/helpers/jest'

import { useNotificationsStore } from './notifications'

describe('useNotificationsStore', () => {
  it('hookHelper works', () => {
    const notificationsStore = hookHelper(useNotificationsStore)
    expect(notificationsStore()).toBeDefined()
  })

  // The addNotification action should add a new notification to the store and set newNotification to true.
  it('addNotification updates store', () => {
    const mockNotification = {
      title: 'Test Notification',
      status: 'confirm',
      tag: ['test'],
    }
    const notificationsStore = hookHelper(useNotificationsStore)
    act(() => {
      notificationsStore().addNotification(mockNotification)
    })
    const notifications = notificationsStore().notifications
    const savedNotification = notifications.find(({ title }: { title: string }) => title === mockNotification.title)
    act(() => {
      const newNotification = notificationsStore().newNotification
      expect(savedNotification).not.toBe(undefined)
      expect(newNotification).toBe(true)
    })
  })

  // The deleteNotification action should remove a specific notification from the store.
  it('deleteNotification removes notification from store', () => {
    const mockNotification = {
      title: 'Mock Notification',
      status: 'confirm',
      tag: ['mock'],
    }
    const notificationsStore = hookHelper(useNotificationsStore)
    act(() => {
      notificationsStore().addNotification(mockNotification)
    })
    const notifications = notificationsStore().notifications
    const savedNotification = notifications.find(({ title }: { title: string }) => title === mockNotification.title)

    act(() => {
      expect(savedNotification).not.toBe(undefined)
      notificationsStore().deleteNotification(savedNotification.id)
    })
    const deletedNotification = notificationsStore().notifications.find(({ id }: { id: string }) => id === savedNotification.id)

    expect(deletedNotification).toBe(undefined)
  })

  // The deleteAll action should remove all notifications from the store.
  it('deleteAll clears all notifications from store', () => {
    const mockNotifications = [
      {
        title: 'Mock Notification 1',
        status: 'confirm',
        tag: ['mock'],
      },
      {
        title: 'Mock Notification 2',
        status: 'confirm',
        tag: ['mock'],
      },
    ]
    const notificationsStore = hookHelper(useNotificationsStore)
    mockNotifications.forEach(notification => {
      act(() => {
        notificationsStore().addNotification(notification)
      })
    })
    act(() => {
      notificationsStore().deleteAll()
    })
    expect(notificationsStore().notifications).toHaveLength(0)
  })

  // The handleNewNotification action should update the newNotification state in the store.
  it('handleNewNotification updates newNotification state', () => {
    const notificationsStore = hookHelper(useNotificationsStore)
    act(() => {
      notificationsStore().handleNewNotification(true)
    })
    expect(notificationsStore().newNotification).toBe(true)
    act(() => {
      notificationsStore().handleNewNotification(false)
    })
    expect(notificationsStore().newNotification).toBe(false)
  })
})
