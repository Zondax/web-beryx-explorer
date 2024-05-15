/**
 * Import necessary modules, configuration variables and components
 */
import { truncateMaxCharacters } from '@/config/config'
import { ObjectType } from '@/routes/parsing'
import { TransactionNotification } from '@/store/ui/notifications'
import { Box, Typography } from '@mui/material'

import BeryxLink from '../../BeryxLink/BeryxLink'

/**
 * Renders a single transaction notification on the page.
 * If the transaction destination is provided, it will be clickable using BeryxLink component.
 * Notification's date and method are displayed. If method is not provided, only date is shown.
 * Notification's value is displayed on the right.
 *
 * @param notification - The TransactionNotification object that contains
 * all information pertinent to a transaction notification.
 *
 * @returns The rendered component
 */
const Transaction = ({ notification }: { notification: TransactionNotification }) => {
  const { date, method } = notification
  const content = method ? `${date} • ${method}` : date

  return (
    <Box display={'flex'} justifyContent={'space-between'}>
      <Box width={'fit-content'}>
        {notification.tx_to ? (
          <BeryxLink
            disableLink
            value={notification.tx_to}
            network={notification.network}
            inputType={ObjectType.ADDRESS}
            limitCharacters={truncateMaxCharacters}
          />
        ) : null}
        <Typography variant="body2" noWrap={false}>
          {content}
        </Typography>
      </Box>
      <Typography
        variant="captionMono"
        color="text.primary"
        textAlign={'right'}
        width={'fit-content'}
        sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
      >
        {notification.value}
      </Typography>
    </Box>
  )
}

export default Transaction
