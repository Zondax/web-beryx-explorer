import React from 'react'

import { Unstable_Grid2 as Grid, Typography } from '@mui/material'

/**
 * ItemInfoProps interface.
 *
 * @interface
 * @property label - The label of the item.
 * @property {string | React.JSX.Element} content - The content of the item. It can be a string or a JSX element.
 * @property {React.JSX.Element | undefined} icon - An optional icon for the item. It's a JSX element if it's present.
 */
interface ItemInfoProps {
  label: string
  content: string | React.JSX.Element
  icon: React.JSX.Element | undefined
}

/**
 * The React function component that represents an item of information.
 *
 * @param props - The props that define the item information.
 * @param props.label - The label of the item.
 * @param props.content - The content of the item. It can be a string or a JSX element.
 * @param props.icon - An optional icon for the item. It's a JSX element if present.
 * @returns A react functional component that represents an item information.
 */
const ItemInfo = ({ label, content, icon }: ItemInfoProps) => {
  return (
    <Grid container alignItems={'center'} sx={{ gap: '0.5rem' }}>
      <Typography variant="caption" component={'p'} color={'text.secondary'}>
        {label}
      </Typography>
      <Grid container alignItems={'center'} sx={{ gap: '0.5rem' }}>
        {icon}
        {typeof content === 'string' ? (
          <Typography variant="caption" component={'p'} color={'text.primary'}>
            {content}
          </Typography>
        ) : (
          content
        )}
      </Grid>
    </Grid>
  )
}

export default ItemInfo
