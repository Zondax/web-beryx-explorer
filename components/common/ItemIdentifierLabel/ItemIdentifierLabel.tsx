/**
 * This component is used to render a label for an item identifier with optional features such as truncating the text after a certain number of characters or disabling hyperlink
 *
 * @param props - The properties that define the behaviour and appearance of the component
 * @param props.searchType - The type of object to be searched
 * @param props.value - The value of the item identifier to be displayed
 * @param props.network - The network on which the search should be performed
 * @param [props.limitCharacters] - A flag indicating whether the number of characters displayed should be limited. Defaults to false.
 * @param [props.disableLink] - A flag indicating whether the hyperlink should be disabled. Defaults to false.
 *
 * @returns The ItemIdentifierLabel component encapsulated in a box for styling. The BeryxLink component is used to make the label a hyperlink
 */
import React from 'react'

import { truncateMaxCharacters } from '@/config/config'
import { NetworkType } from '@/config/networks'
import { ObjectType } from '@/routes/parsing'
import { Box, useTheme } from '@mui/material'

import BeryxLink from '../BeryxLink'

/**
 * ItemIdentifierLabel is a functional component that renders a label for an item identifier with optional features.
 *
 * @param searchType - The type of object to be searched.
 * @param value - The value of the item identifier to be displayed.
 * @param network - The network on which the search should be performed.
 * @param [limitCharacters=false] - A flag indicating whether the number of characters displayed should be limited.
 * @param [disableLink=false] - A flag indicating whether the hyperlink should be disabled.
 *
 * @returns The ItemIdentifierLabel component encapsulated in a box for styling.
 */
const ItemIdentifierLabel: React.FC<{
  searchType?: ObjectType
  value: string
  network?: NetworkType
  limitCharacters?: boolean
  disableLink?: boolean
}> = ({ searchType, value, network, limitCharacters = false, disableLink = false }) => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.level2,
        padding: '0 0 0 0.65rem',
        borderRadius: '4px',
        height: '27px',
        display: 'flex',
        alignItems: 'center',
        width: 'fit-content',
      }}
    >
      <BeryxLink
        disableTooltip
        inputType={searchType}
        value={value}
        isColored={false}
        disableLink={disableLink}
        limitCharacters={limitCharacters ? truncateMaxCharacters : undefined}
        network={network}
      />
    </Box>
  )
}

export default ItemIdentifierLabel
