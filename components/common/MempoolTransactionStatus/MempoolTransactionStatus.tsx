import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { CategoryNewEach } from '@carbon/icons-react'
import { Box, CircularProgress, Theme, Tooltip } from '@mui/material'
import { useTheme } from '@mui/material/styles'

/**
 * TransactionStatusProps Interface
 * @interface TransactionStatusProps
 * @param status - Status of the transaction.
 */
interface TransactionStatusProps {
  last_seen?: string
}

/**
 * Renders the status icon based on provided status
 *
 * @param last_seen - Status of the transaction. Default is `undefined`.
 * @param theme - The theme used by the component.
 *
 * @return {JSX.Element} - The JSX element for the status icon.
 */
export const renderStatusIcon = (last_seen: string | undefined, theme: Theme): JSX.Element => {
  if (last_seen === undefined) {
    return <CategoryNewEach style={{ color: theme.palette.time }} data-testid="status-icon-mempool" />
  }

  return (
    <CircularProgress size={14} thickness={6} disableShrink data-testid="status-icon-loading" sx={{ color: theme.palette.text.tertiary }} />
  )
}

/**
 * Returns the status tooltip text based on provided last_seen
 *
 * @param last_seen - last_seen of the transaction. Default is `undefined`.
 *
 * @return {string} - The string
 */
export const tooltipStatus = (last_seen: string | undefined): string => {
  if (last_seen === undefined) {
    return 'In mempool'
  }

  return 'Transaction is being processed'
}

/**
 * A Component displaying transaction status with appropriate icons.
 *
 * @param - The props the component receives.
 *
 * @return {JSX.Element} A tooltip wrapped Box containing transaction status icon.
 */
const MempoolTransactionStatus = ({ last_seen }: TransactionStatusProps): JSX.Element => {
  const theme = useTheme()
  const { t } = useTranslation()

  const statusIcon = useMemo(() => renderStatusIcon(last_seen, theme), [last_seen, theme])
  const tooltipText = useMemo(() => tooltipStatus(last_seen), [last_seen])

  return (
    <Tooltip title={`${t('Status')}: ${t(tooltipText)}`} arrow disableInteractive data-testid="transaction-status-tooltip">
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
        data-testid="transaction-status-box"
      >
        {statusIcon}
      </Box>
    </Tooltip>
  )
}

export default MempoolTransactionStatus
