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
      id: '1',
      title: 'Test Notification',
      time: '12:00',
      date: '2022-01-01',
      status: 'confirm',
      tag: ['test'],
    }
    const notificationsStore = hookHelper(useNotificationsStore)
    act(() => {
      notificationsStore().addNotification(mockNotification)
    })
    const notifications = notificationsStore().notifications
    act(() => {
      const newNotification = notificationsStore().newNotification
      expect(notifications).toContain(mockNotification)
      expect(newNotification).toBe(true)
    })
  })

  // The deleteNotification action should remove a specific notification from the store.
  it('deleteNotification removes notification from store', () => {
    const mockNotification = {
      id: 'mockId',
      title: 'Mock Notification',
      time: '12:00',
      date: '2022-01-01',
      status: 'confirm',
      tag: ['mock'],
    }
    const notificationsStore = hookHelper(useNotificationsStore)
    act(() => {
      notificationsStore().addNotification(mockNotification)
    })
    act(() => {
      notificationsStore().deleteNotification(mockNotification.id)
    })
    expect(notificationsStore().notifications).not.toContain(mockNotification)
  })

  // The deleteAll action should remove all notifications from the store.
  it('deleteAll clears all notifications from store', () => {
    const mockNotifications = [
      {
        id: 'mockId1',
        title: 'Mock Notification 1',
        time: '12:00',
        date: '2022-01-01',
        status: 'confirm',
        tag: ['mock'],
      },
      {
        id: 'mockId2',
        title: 'Mock Notification 2',
        time: '12:00',
        date: '2022-01-01',
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
