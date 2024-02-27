import React from 'react'

import { Box, Unstable_Grid2 as Grid, Skeleton, Tooltip, Typography } from '@mui/material'

/**
 * Props for ItemInfoBig Component.
 */
interface ItemInfoBigProps {
  /**
   * Label to display under content
   */
  label: string

  /**
   * The content to display, could be a string or JSX.Element
   */
  content: string | React.JSX.Element | undefined

  /**
   * An Icon to be displayed next to the content
   */
  icon: React.JSX.Element | undefined

  /**
   * This prop determines if the fractional part of the content (if it's a string) should be clipped. It defaults to false.
   */
  clipFractionalPart?: boolean
}

/**
 * Font size for the content
 */
const contentFontSize = '1.125rem'

/**
 * A Component to render an item's information in a certain way, with an icon, content, and a label.
 * @param props - Properties object, detailing the label, content, icon, and the functionality of the component.
 */
const ItemInfoBig = ({ label, content, icon, clipFractionalPart = false }: ItemInfoBigProps) => {
  /**
   * Clip the fractional part of the content string if the clipFractionalPart prop is set to true
   */
  const [wholePart, decimalPart] = clipFractionalPart && typeof content === 'string' ? content.split('.') : [undefined, undefined]

  /**
   * Function to render the content
   */
  const renderContent = () => {
    if (typeof content === 'string') {
      if (clipFractionalPart) {
        return (
          <Tooltip title={content} arrow disableInteractive>
            <Grid container flexWrap={'nowrap'} alignItems={'baseline'}>
              <Typography variant="h5" component={'h5'} color={'text.primary'} fontSize={contentFontSize}>
                {wholePart}
              </Typography>
              <Typography variant="h5" component={'h5'} color={'text.primary'} fontSize={contentFontSize}>
                .
              </Typography>
              <Typography
                variant="h5"
                component={'h5'}
                color={'text.primary'}
                fontSize={contentFontSize}
                sx={{ maxWidth: '6ch', whitSspace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
              >
                {decimalPart}
              </Typography>
            </Grid>
          </Tooltip>
        )
      }
      return (
        <Typography variant="h5" component={'h5'} color={'text.primary'} fontSize={contentFontSize}>
          {content}
        </Typography>
      )
    }
    return content
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.2rem',
      }}
    >
      <Grid container alignItems={'center'} sx={{ gap: '0.5rem' }}>
        {icon}
        {content ? renderContent() : <Skeleton variant="rounded" width={'4rem'} height={'1.5rem'} />}
      </Grid>
      <Typography variant="caption" component={'p'} color={'text.secondary'}>
        {label}
      </Typography>
    </Box>
  )
}

export default ItemInfoBig
