import React from 'react'

import { MisuseOutline } from '@carbon/icons-react'
import { Alert, Popper, Theme } from '@mui/material'
import { Box } from '@mui/system'

import { SEARCH_BAR_WIDTH, SearchBarProps } from './SearchBar'

/**
 * @function HelperTextPopper
 * @description This component is used to display a pop-up helper text in the search bar. It includes the helper text, the anchor element, the click away handler, the properties of the search bar, the border, and the theme.
 * @param helperText - The helper text to be displayed
 * @param anchorEl - The anchor element for the pop-up
 * @param clickAwayHandler - The handler for click away events
 * @param properties - The properties of the search bar
 * @param border - The border of the search bar
 * @param theme - The theme of the search bar
 */
const HelperTextPopper = ({
  helperText,
  anchorEl,
  properties,
  border,
  theme,
  navbar,
}: {
  helperText: React.ReactNode
  anchorEl: HTMLDivElement | null
  properties: SearchBarProps['properties']
  border: boolean
  theme: Theme
  navbar?: boolean
}) => (
  <Popper
    id={helperText ? 'simple-popper' : undefined}
    open={Boolean(helperText)}
    anchorEl={anchorEl}
    sx={{ zIndex: '300', width: { xs: '100%', sm: 'auto' } }}
  >
    <Box sx={{ p: { xs: navbar ? '0.5rem' : '0.5rem 1.75rem', md: '0.5rem 1.75rem' } }}>
      <Alert
        severity="success"
        color="error"
        icon={<MisuseOutline width={20} height={20} />}
        sx={{
          bgcolor: theme.palette.background.level1,
          minHeight: '2.8rem',
          alignItems: 'center',
          ...{
            width: { xs: '100%', sm: properties?.width ?? SEARCH_BAR_WIDTH },
            minWidth: properties?.minWidth ? properties?.minWidth : '20rem',
            maxWidth: properties?.maxWidth ? properties?.maxWidth : SEARCH_BAR_WIDTH,
            borderRadius: navbar ? '4px' : '6px',
            border: border ? `1px solid ${theme.palette.tableChildRowBackgroundFocused}` : 'none',
          },
        }}
      >
        {helperText}
      </Alert>
    </Box>
  </Popper>
)

export default HelperTextPopper
