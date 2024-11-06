import React, { ReactNode, useCallback, useMemo, useState } from 'react'

import { ChevronDown, ChevronUp, Help } from '@carbon/icons-react'
import { Box, CircularProgress, Collapse, Unstable_Grid2 as Grid, Tooltip, Typography, useTheme } from '@mui/material'

/**
 * Types of the `OverviewDropdownItem` props
 */
interface OverviewDropdownItemProps {
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
   * Subitems to display
   */
  subitems: ReactNode
  /**
   * Number of subitems to display
   */
  total_subitems: number
}

/**
 * `OverviewDropdownItem` is a functional component that displays an 'item' with a label, content, icon, and description.
 * The orientation of the item can be vertically set for mobile view. A loading spinner is shown if the content is loading.
 *
 * @returns The rendered JSX element.
 */
const OverviewDropdownItem: React.FC<OverviewDropdownItemProps> = ({
  label,
  content,
  icon,
  verticalInMobile = false,
  isLoading = false,
  description,
  subitems,
  total_subitems,
}) => {
  const theme = useTheme()
  const [subitemsDisplayed, setSubitemsDisplayed] = useState<boolean>(false)

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

  const openSubitems = useCallback(() => {
    setSubitemsDisplayed(prev => !prev)
  }, [setSubitemsDisplayed])

  return (
    <Grid
      container
      flexDirection={'column'}
      sx={{
        maxHeight: 'max-content',
        height: 'max-content',
      }}
    >
      <Box
        onClick={openSubitems}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          padding: '0.1rem 1rem 0.1rem 1rem',
          maxHeight: 'max-content',
          height: 'max-content',
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: theme.palette.background.level1,
          },
        }}
      >
        <Grid
          xs={verticalInMobile ? 12 : 5}
          md={4}
          gap={'1rem'}
          sx={{ maxHeight: 'max-content', height: 'max-content', display: 'flex', alignItems: 'center' }}
        >
          {subitemsDisplayed ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          <Box sx={{ display: 'flex', gap: '0.5rem', maxHeight: 'max-content', height: 'max-content', alignItems: 'center' }}>
            {LabelTypography}
            {DescriptionTooltip}
          </Box>
        </Grid>

        <Grid xs={verticalInMobile ? 12 : 7} md={8}>
          <Grid container alignItems={'center'} sx={{ gap: '0.5rem', flexWrap: 'nowrap', width: '100%', height: 'fit-content' }}>
            {IconBox}
            {renderContent}
          </Grid>
        </Grid>
      </Box>
      <Collapse orientation="vertical" in={subitemsDisplayed}>
        <Box
          sx={{
            height: { xs: `calc(${total_subitems} * 4.25rem)`, md: `calc(${total_subitems} * 2.75rem)` },
            position: 'relative',
            '&::after': subitemsDisplayed
              ? {
                  content: '""',
                  position: 'absolute',
                  top: '0',
                  left: '2.75rem',
                  right: 0,
                  borderBottom: `1px solid ${theme.palette.border?.level0}`,
                }
              : {},
          }}
        >
          {subitems}
        </Box>
      </Collapse>
    </Grid>
  )
}

export default OverviewDropdownItem
