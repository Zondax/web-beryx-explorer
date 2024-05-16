import Link from 'next/link'
import { useCallback, useRef, useState } from 'react'

import { truncateMaxCharacters } from '@/config/config'
import { NetworkType } from '@/config/networks'
import { ObjectType } from '@/routes/parsing'
import { copyContent } from '@/utils/text'
import { Checkmark, Copy } from '@carbon/icons-react'
import { Box, IconButton, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material'

import { DynamicTextValue } from './DynamicTextValue'

/**
 * Interface for BeryxLinkProps
 */
interface BeryxLinkProps {
  tooltipText?: string
  network?: NetworkType
  inputType?: ObjectType
  value: string
  disableLink?: boolean
  hasCopyButton?: boolean
  limitCharacters?: number | 'auto'
  isColored?: boolean
  disableTooltip?: boolean
  fontSize?: string
}

/**
 * BeryxLink is a component that renders a link with various properties.
 * @param props - The properties that define the component's behavior and display.
 * @param props.tooltipText - The tooltip text to be displayed.
 * @param props.network - The network type.
 * @param props.inputType - The input type or object type.
 * @param props.value - The value of the link.
 * @param props.disableLink - Flag to disable the link.
 * @param props.hasCopyButton - Flag to indicate if the copy button should be displayed.
 * @param props.limitCharacters - The limit for the number of characters to be displayed.
 * @param props.disableTooltip - Flag to disable the tooltip.
 * @returns - A React component that displays the link.
 */
const BeryxLink = ({
  tooltipText,
  inputType,
  network,
  value,
  disableLink = false,
  hasCopyButton = true,
  limitCharacters,
  disableTooltip = false,
  fontSize,
}: BeryxLinkProps) => {
  const theme = useTheme()
  const upMd = useMediaQuery(theme.breakpoints.up('md'))

  const parentContainerRef = useRef<HTMLDivElement | null>(null)
  const maxStringLength = limitCharacters ?? (upMd ? 0 : truncateMaxCharacters)

  const [copied, setCopied] = useState(false)

  /**
   * This function handles the copying of the link value.
   * It uses the copyContent function to copy the value to the clipboard.
   * The function is memoized using the useCallback hook to prevent unnecessary re-renders.
   * It also sets the copied state to true and then back to false after 10 seconds.
   */
  const handleCopy = useCallback(() => {
    copyContent(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [value])

  if (value === null || value === undefined || value === '') {
    return null
  }

  if (
    inputType &&
    inputType === ObjectType.ADDRESS &&
    network &&
    network.isTestnet &&
    typeof value === 'string' &&
    value.charAt(0) === 'f'
  ) {
    value = 't' + value.slice(1)
  }

  const ActiveLink = (
    <Tooltip disableHoverListener={disableTooltip} title={tooltipText ?? value} arrow disableInteractive>
      <Link href={`/search/fil/${network?.name}/${inputType}/${value}`} data-testid={'beryx-active-link'}>
        <Typography
          variant="captionMono"
          component={'p'}
          fontSize={fontSize}
          sx={{
            letterSpacing: '-0.25px',
            '&:hover': {
              color: disableLink ? undefined : theme.palette.primary.main,
            },
          }}
        >
          <DynamicTextValue value={value} maxStringLength={maxStringLength} parentContainerRef={parentContainerRef} />
        </Typography>
      </Link>
    </Tooltip>
  )

  const DisabledLink = (
    <Tooltip title={tooltipText || value} disableHoverListener={disableTooltip} arrow disableInteractive>
      <Typography
        variant="captionMono"
        padding={'3px 0'}
        data-testid={'beryx-disabled-link'}
        fontSize={fontSize}
        sx={{
          letterSpacing: '-0.25px',
        }}
      >
        <DynamicTextValue value={value} maxStringLength={maxStringLength} parentContainerRef={parentContainerRef} />
      </Typography>
    </Tooltip>
  )

  return (
    <Box className={'beryxLink'} sx={{ display: 'flex', alignItems: 'center', gap: '0.375rem', width: '100%' }} ref={parentContainerRef}>
      {disableLink || !network ? DisabledLink : ActiveLink}

      {hasCopyButton && (
        <IconButton size={'xsmall'} aria-label="Copy" color="info" onClick={handleCopy}>
          {copied ? <Checkmark height={12} /> : <Copy height={12} />}
        </IconButton>
      )}
    </Box>
  )
}

export default BeryxLink
