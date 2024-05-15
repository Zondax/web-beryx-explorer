import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { CategoryNewEach, CheckmarkFilled, Misuse } from '@carbon/icons-react'
import { Box, CircularProgress, Theme, Tooltip } from '@mui/material'
import { useTheme } from '@mui/material/styles'

/**
 * MempoolTransactionStatusProps Interface
 * @interface MempoolTransactionStatusProps
 * @param status - Status of the transaction.
 */
interface MempoolTransactionStatusProps {
  status?: string
}

/**
 * Renders the status icon based on provided status
 *
 * @param status - Status of the transaction. Default is `undefined`.
 * @param theme - The theme used by the component.
 *
 * @return {JSX.Element} - The JSX element for the status icon.
 */
export const renderStatusIcon = (status: string | undefined, theme: Theme): JSX.Element => {
  if (status === undefined) {
    return (
      <Box
        sx={{
          width: '16px',
          height: '16px',
          borderRadius: '50%',
          border: `1px solid ${theme.palette.border?.level0}`,
        }}
        data-testid="status-icon-undefined"
      />
    )
  }

  switch (status) {
    case 'Ok':
      return <CheckmarkFilled style={{ color: theme.palette.success.main }} data-testid="status-icon-ok" />
    case 'Mempool':
      return <CategoryNewEach style={{ color: theme.palette.time }} data-testid="status-icon-mempool" />
    case 'Pending':
      return <CircularProgress size={14} thickness={4} style={{ color: theme.palette.text.secondary }} data-testid="status-icon-pending" />
    case 'Loading':
      return <CircularProgress size={16} thickness={8} data-testid="status-icon-loading" />
    default:
      return <Misuse style={{ color: theme.palette.error.main }} data-testid="status-icon-undefined" />
  }
}

/**
 * A Component displaying transaction status with appropriate icons.
 *
 * @param - The props the component receives.
 *
 * @return {JSX.Element} A tooltip wrapped Box containing transaction status icon.
 */
const TransactionStatus = ({ status }: MempoolTransactionStatusProps): JSX.Element => {
  const theme = useTheme()
  const { t } = useTranslation()

  const statusIcon = useMemo(() => renderStatusIcon(status, theme), [status, theme])

  return (
    <Tooltip title={`${t('Status')}: ${status}`} arrow disableInteractive data-testid="transaction-status-tooltip">
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

export default TransactionStatus
