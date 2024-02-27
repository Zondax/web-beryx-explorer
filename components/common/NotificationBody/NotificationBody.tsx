import { useSnackbar } from 'notistack'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { ObjectType } from '@/routes/parsing'
import { GenericNotification, TransactionNotification, useNotificationsStore } from '@/store/ui/notifications'
import { useAppSettingsStore } from '@/store/ui/settings'
import { CategoryNewEach, CheckmarkFilled, CloseFilled, Misuse, TrashCan } from '@carbon/icons-react'
import { Box, Button, Divider, Grid, Typography, useTheme } from '@mui/material'
import { Theme } from '@mui/material/styles'

import Transaction from './components/Transaction'

/**
 * Method to render status icon based on status
 * @param status - status to determin icon
 * @param theme - The application theme
 * @returns The status icon element
 */
const renderStatusIcon = (status: string | undefined, theme: Theme) => {
  switch (status) {
    case 'confirm':
      return <CheckmarkFilled size={20} style={{ color: theme.palette.success.main }} />
    case 'error':
      return (
        <CloseFilled
          size={20}
          style={{
            color: theme.palette.error.main,
          }}
        />
      )
    case 'mempool':
      return <CategoryNewEach size={20} style={{ color: theme.palette.time }} />
    default:
      return <Misuse style={{ color: theme.palette.error.main }} />
  }
}

/**
 * Represents a functional component recording Body of Notification
 * @function NotificationBody
 * @param  {object} props - react props
 * @prop {TransactionNotification | GenericNotification} notification - Transaction/Generic notification
 * @prop {boolean} isFromStore - Flag to determine whether the notification is from store
 * @returns JSX element
 */
const NotificationBody = ({
  notification,
  isFromStore,
}: {
  notification: TransactionNotification | GenericNotification
  isFromStore?: boolean
}) => {
  const theme = useTheme()
  const { t } = useTranslation()
  const { closeSnackbar } = useSnackbar()
  const { network } = useAppSettingsStore(state => ({ network: state.network }))
  const { deleteNotification } = useNotificationsStore()

  /**
   * Handles the dismissal of a notification.
   * If the notification is not from the store, it closes the snackbar with the notification's id.
   * It then deletes the notification with the given id.
   * @function handleDismiss
   * @returns {void}
   */
  const handleDismiss = useCallback(() => {
    if (!isFromStore) {
      closeSnackbar(notification.id)
    }
    deleteNotification(notification.id)
  }, [isFromStore, deleteNotification, notification.id, closeSnackbar])

  /**
   * Checks if a notification is a transaction.
   * It returns true if the notification has a 'tx_to' property, indicating it is a transaction.
   * @function isTransaction
   * @param notification - The notification to check.
   * @returns - Returns true if the notification is a transaction, false otherwise.
   */
  const isTransaction = useCallback(
    (notification: TransactionNotification | GenericNotification): notification is TransactionNotification => {
      return Boolean((notification as TransactionNotification).tx_to)
    },
    []
  )

  return (
    <Box
      sx={{
        position: 'relative',
        padding: '0.875rem',
        borderRadius: '0.5rem',
        border: `1px solid ${theme.palette.divider}`,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'background.level1',
        width: { xs: '100%', md: '25rem' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.25rem',
          marginLeft: '28px',
        }}
      >
        {/* Title */}
        <Box
          sx={{
            position: 'relative',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: '30%',
              left: '-28px',
              transform: 'translateY(-50%)',
            }}
          >
            {renderStatusIcon(notification?.status, theme)}
          </Box>
          <Grid container flexDirection={'column'}>
            <Typography variant="h5" fontWeight={600} noWrap={false}>
              {notification?.title}
            </Typography>
            <Typography variant="body2" noWrap={false}>
              {notification?.time}
            </Typography>
          </Grid>
        </Box>
        <Divider flexItem />

        {/* Description */}
        {notification && isTransaction(notification) ? (
          // A TransactionNotification was received
          <Transaction notification={notification as TransactionNotification} />
        ) : (
          // A GenericNotification was received
          <Typography variant="body2" noWrap={false}>
            {notification?.description}
          </Typography>
        )}

        {/* Buttons */}
        <Box display={'flex'} justifyContent={'flex-end'} gap={'0.875rem'} mt={'1rem'}>
          <Button
            id={'dismiss-notification'}
            onClick={handleDismiss}
            variant="inputType"
            size="small"
            sx={{
              textTransform: 'capitalize',
              padding: isFromStore ? 0 : '0.76rem 0.9rem 0.76rem 0.9rem',
              minWidth: '2.2rem',
            }}
          >
            {isFromStore ? <TrashCan size={16} /> : t('Dismiss')}
          </Button>
          {notification && isTransaction(notification) && notification.tx_hash ? (
            <Button
              id={'view-transaction-notification'}
              href={`/v1/search/fil/${notification.network?.name ?? network.name}/${ObjectType.TXS}/${notification.tx_hash}`}
              variant={'contained'}
              size="small"
              sx={{
                textTransform: 'capitalize',
                padding: '0.75rem 0.9rem 0.75rem 0.9rem',
                '.MuiButton-startIcon': {
                  paddingRight: '0.5rem',
                },
              }}
            >
              {t('View Transaction')}
            </Button>
          ) : null}
        </Box>
      </Box>
    </Box>
  )
}

export default NotificationBody
