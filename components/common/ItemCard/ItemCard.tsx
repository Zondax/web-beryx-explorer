import React from 'react'

import { copyContent } from '@/utils/text'
import { ContentCopy } from '@mui/icons-material'
import { Box, Grid, IconButton, Typography } from '@mui/material'

/**
 * ItemCard properties
 * @interface ItemCard
 * @property title - The title of the card
 * @property {React.ReactNode} children - The children nodes of the card
 * @property [description] - The description of the card
 * @property [enableCopy] - Flag to enable or disable the copy functionality on the card
 */
interface ItemCard {
  title: string
  children: React.ReactNode
  description?: string
  enableCopy?: boolean
}

/**
 * ItemCard component
 * @param title - The title of the card
 * @param children - The children nodes of the card
 * @param [description] - The description of the card
 * @param [enableCopy] - Flag to enable or disable the copy functionality on the card
 * @returns The ItemCard component
 */
const ItemCard = ({ title, description, children, enableCopy }: ItemCard): React.JSX.Element => {
  /**
   * Handles the copy functionality
   * @function handleCopy
   * @returns {void}
   */
  const handleCopy = React.useCallback(() => {
    copyContent(description ?? '')
  }, [description])

  return (
    <Grid container display="flex" direction="column" justifyContent="center" width="max-content">
      <Typography variant="subtitle2">{title}</Typography>
      {enableCopy ? (
        <Box display="flex" alignItems="center" gap={0.5}>
          {children}
          <IconButton color="info" aria-label="Copy" onClick={handleCopy}>
            <ContentCopy fontSize="small" />
          </IconButton>
        </Box>
      ) : (
        <Box display="flex" alignItems="center" minHeight={'27.2px'}>
          {children}
        </Box>
      )}
    </Grid>
  )
}

export default ItemCard
