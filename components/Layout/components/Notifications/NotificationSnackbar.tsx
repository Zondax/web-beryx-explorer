import { SnackbarContent } from 'notistack'
import { forwardRef, useCallback, useMemo } from 'react'

import { GenericNotification, TransactionNotification, useNotificationsStore } from '@/store/ui/notifications'

import NotificationBody from '../../../common/NotificationBody/NotificationBody'

interface NotificationSnackbarProps {
  id: string
}

const NotificationSnackbar = forwardRef<HTMLDivElement, NotificationSnackbarProps>((props: NotificationSnackbarProps, ref) => {
  const { notifications } = useNotificationsStore()
  const getNotification = useCallback(() => {
    return notifications.find(({ id }) => id === props.id)
  }, [notifications, props.id])
  const notification: TransactionNotification | GenericNotification | undefined = useMemo(getNotification, [getNotification])

  return <SnackbarContent ref={ref}>{notification ? <NotificationBody notification={notification} /> : null}</SnackbarContent>
})

NotificationSnackbar.displayName = 'NotificationSnackbar'

export default NotificationSnackbar
