import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { useSearchStore } from '@/store/data/search'
import { CategoryNewEach, PortInput, PortOutput } from '@carbon/icons-react'
import { Tooltip } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Transaction } from '@zondax/beryx/dist/filecoin/api/types'

/**
 * A Component displaying transaction status with appropriate icons.
 *
 * @param - The props the component receives.
 *
 * @return {JSX.Element} A tooltip wrapped Box containing transaction status icon.
 */

export const TypeTransactionIcon = ({
  status,
  direction,
  size = 'medium',
}: {
  status: string
  direction: string
  size?: 'small' | 'medium'
}): JSX.Element => {
  const theme = useTheme()
  const { t } = useTranslation()

  const statusColor = useMemo(() => {
    return status === 'Ok' ? theme.palette.success.main : theme.palette.error.main
  }, [status, theme.palette])

  const iconSize = size === 'medium' ? 20 : 17

  const data = useMemo(() => {
    if (status === 'mempool') {
      return {
        label: '',
        icon: <CategoryNewEach data-testid={'mempool-icon'} size={iconSize} style={{ color: theme.palette.time }} />,
      }
    }

    if (direction === 'from') {
      return {
        label:
          status === 'Ok'
            ? 'Outgoing transaction successfully sent from this address.'
            : 'Outgoing transaction sent with error from this address.',
        icon: <PortOutput data-testid={'outgoing-icon'} size={iconSize} color={statusColor} style={{ transform: 'rotate(-45deg)' }} />,
      }
    }

    return {
      label:
        status === 'Ok'
          ? 'Incoming transaction successfully sent to this address.'
          : 'Incoming transaction sent with error to this address.',
      icon: <PortInput data-testid={'incoming-icon'} size={iconSize} color={statusColor} style={{ transform: 'rotate(45deg)' }} />,
    }
  }, [status, theme.palette, direction, iconSize, statusColor])

  return (
    <Tooltip title={t(data.label)} arrow disableInteractive data-testid="transaction-type-tooltip">
      {data.icon}
    </Tooltip>
  )
}

/**
 * A Component displaying transaction status with appropriate icons.
 *
 * @param - The props the component receives.
 *
 * @return {JSX.Element} A tooltip wrapped Box containing transaction status icon.
 */

const TypeTransactionIconContainer = ({ transaction }: { transaction: Transaction }): JSX.Element => {
  const searchValue: string = useSearchStore(s => s.searchInputValue)
  return <TypeTransactionIcon status={transaction.status} direction={searchValue === transaction.tx_to ? 'to' : 'from'} size={'small'} />
}

export default TypeTransactionIconContainer
