import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { ExtendedTransaction, useSearchStore } from '@/store/data/search'
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
import { Grid, IconButton, Tooltip } from '@mui/material'

/**
 * @module TreeColumn
 * @description This module provides a TreeColumn component. It provides a button allowing the user to collapse or uncollapse rows.
 * @param row - The data row to be downloaded.
 */
export const TreeColumn = ({ row }: { row: any }) => {
  const { t } = useTranslation()
  const { currentResult, updateCurrentTxs } = useSearchStore()

  /**
   * @function handleClick
   * @description Function to collapse and uncollapse rows. When a row is collapsed,
   * the children transactions are hidden.
   */
  const handleClick = useCallback(() => {
    if (currentResult?.transactions) {
      updateCurrentTxs(
        currentResult.transactions.map((tx: ExtendedTransaction) => {
          if (tx.path.includes(row.id)) {
            const newTx = { ...tx }
            if (tx.id === row.id) {
              newTx.collapse = !row.collapse
            } else {
              newTx.hide = !row.collapse
              // if the transaction has children, it's collapsed or uncollpase too.
              if (tx.collapse !== undefined) {
                newTx.collapse = !row.collapse
              }
            }
            return newTx
          }
          return tx
        })
      )
    }
  }, [currentResult, updateCurrentTxs, row])

  /**
   * @description This function returns a Tooltip component with an IconButton inside. The IconButton triggers the collapse of the rows.
   * @returns A Tooltip component with an IconButton inside.
   */
  return (
    <Grid container sx={{ pl: row.path.length >= 2 ? `calc(${row.path.length - 1} * 18px)` : 0 }}>
      <Tooltip title={t(`${row.collapse ? 'See' : 'Hide'} internal transactions`)} arrow disableInteractive>
        <IconButton color="info" aria-label="Collpase" sx={{ width: '2rem' }} onClick={handleClick}>
          {row.collapse ? <KeyboardArrowUp color={'action'} /> : <KeyboardArrowDown color={'action'} />}
        </IconButton>
      </Tooltip>
    </Grid>
  )
}
