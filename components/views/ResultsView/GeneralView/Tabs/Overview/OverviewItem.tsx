import React, { useMemo } from 'react'

import { Help } from '@carbon/icons-react'
import { CircularProgress, Unstable_Grid2 as Grid, Tooltip, Typography, useTheme } from '@mui/material'

/**
 * Types of the `OverviewItem` props
 */
interface OverviewItemProps {
  /**
   * The label of the overview item
   */
  label: string
  /**
   * The main content of the overview item
   */
  content: string | React.JSX.Element | undefined
  /**
   * The Icon of the overview item
   */
  icon?: React.JSX.Element
  /**
   * The description of the overview item
   */
  description?: string
  /**
   * If true, the layout is vertical in mobile view
   */
  verticalInMobile?: boolean
  /**
   * If true, the spinner will be displayed
   */
  isLoading?: boolean
  /**
   * If true, the padding left will be displayed
   */
  subitem?: boolean
}

/**
 * `OverviewItem` is a functional component that displays an 'item' with a label, content, icon, and description.
 * The orientation of the item can be vertically set for mobile view. A loading spinner is shown if the content is loading.
 *
 * @returns The rendered JSX element.
 */
const OverviewItem: React.FC<OverviewItemProps> = ({
  label,
  content,
  icon,
  description,
  verticalInMobile = false,
  isLoading = false,
  subitem,
}) => {
  const theme = useTheme()

  const renderContent = useMemo(() => {
    if (isLoading) {
      return <CircularProgress data-testid="overview-item-loading-spinner" size={16} />
    }

    if (typeof content === 'string') {
      return (
        <Typography variant="caption" component={'p'} color={'text.primary'}>
          {content}
        </Typography>
      )
    }

    if (content) {
      return content
    }

    return '-'
  }, [content, isLoading])

  const DescriptionTooltip = description ? (
    <Tooltip data-testid="overview-item-tooltip" title={description} arrow disableInteractive>
      <Help color={theme.palette.text.secondary} style={{ cursor: 'help' }} />
    </Tooltip>
  ) : null

  const LabelTypography = (
    <Typography variant="caption" component={'p'} color={'text.secondary'}>
      {label}
    </Typography>
  )

  const IconBox = !isLoading ? icon : null

  return (
    <Grid
      container
      alignItems={'center'}
      spacing={2}
      sx={{
        borderBottom: !subitem ? `1px solid ${theme.palette.border?.level0}` : 'none',
        padding: subitem ? '0.1rem 0.5rem 0.1rem 0.5rem' : '0.1rem 0.5rem 0.1rem 0.5rem',
        maxHeight: 'max-content',
        height: 'max-content',
        margin: 0,
        ':last-of-type': {
          borderBottom: 'none',
          '&::after': {
            borderBottom: 'none',
          },
        },
        position: 'relative',
        '&::after': subitem
          ? {
              content: '""',
              position: 'absolute',
              bottom: '-1px',
              left: '2.75rem',
              right: 0,
              borderBottom: `1px solid ${theme.palette.border?.level0}`,
            }
          : {},
      }}
    >
      <Grid
        xs={verticalInMobile ? 12 : 5}
        md={4}
        gap={'0.5rem'}
        sx={{
          maxHeight: 'max-content',
          height: 'max-content',
          display: 'flex',
          alignItems: 'center',
          alignSelf: 'flex-start',
          padding: subitem ? '0.5rem 0.5rem 0.5rem 2.25rem' : '0.5rem',
        }}
      >
        {LabelTypography}
        {DescriptionTooltip}
      </Grid>

      <Grid xs={verticalInMobile ? 12 : 7} md={8}>
        <Grid container alignItems={'center'} sx={{ gap: '0.5rem', flexWrap: 'nowrap', width: '100%', height: 'fit-content' }}>
          {IconBox}
          {renderContent}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default OverviewItem
