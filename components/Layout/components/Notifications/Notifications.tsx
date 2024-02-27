import { useSnackbar } from 'notistack'
import { useCallback, useEffect } from 'react'

import { useNotificationsStore } from '@/store/ui/notifications'

const Notifications = () => {
  /**
   * enqueueSnackbar is a method from the notistack library that allows to display a snack bar with a message
   */
  const { enqueueSnackbar } = useSnackbar()

  /**
   * notifications is the array of all notifications
   * newNotification is a boolean that is turned to true when a new notification appears
   * handleNewNotification is a function that takes a boolean and sets newNotification to it
   */
  const { notifications, newNotification, handleNewNotification } = useNotificationsStore()

  const handleSnackbar = useCallback(() => {
    if (newNotification && notifications.length !== 0) {
      enqueueSnackbar({
        anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
        message: 'hello',
        key: notifications[0].id,
        variant: 'info',
      })
      handleNewNotification(false)
    }
    /**
     * The effect will re-run whenever enqueueSnackbar, handleNewNotification, newNotification or notifications changes
     */
  }, [enqueueSnackbar, handleNewNotification, newNotification, notifications])

  useEffect(() => {
    handleSnackbar()
  }, [handleSnackbar])

  return null
}

export default Notifications
