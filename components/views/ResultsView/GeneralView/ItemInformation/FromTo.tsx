import React from 'react'
import { useTranslation } from 'react-i18next'

import { Box, Unstable_Grid2 as Grid, Typography, useTheme } from '@mui/material'

import FromToIcon from '../../../../common/Icons/FromToIcon'

/**
 * Type definition for props of FromTo component
 */
export interface FromToProps {
  /**
   * JSX element for the "from" part
   */
  from?: React.JSX.Element

  /**
   * JSX element for the "to" part
   */
  to?: React.JSX.Element
}

/**
 * FromTo React component implementing a straightforward from-to layout
 * @param from JSX element for the "from" part
 * @param to JSX element for the "to" part
 * @returns
 */
const FromTo = ({ from, to }: FromToProps) => {
  /**
   * Material-UI theme instance
   */
  const theme = useTheme()

  /**
   * Function to handle Internationalization (using react-i18next)
   */
  const { t } = useTranslation()

  // returning a grid-based layout with FromToIcon component and a from-to layout
  return (
    <Grid container alignItems={'center'} sx={{ gap: '0.5rem' }}>
      <FromToIcon size={24} color={theme.palette.text.secondary} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.25rem',
        }}
      >
        <Grid container sx={{ gap: '0.5rem' }}>
          <Typography variant="caption" component={'p'} minWidth={'4ch'} color={'text.secondary'}>
            {t('From')}
          </Typography>
          <Box sx={{ backgroundColor: theme.palette.background.level2, padding: '0 0 0 0.75rem', borderRadius: '4px', minWidth: '5rem' }}>
            {from}
          </Box>
        </Grid>
        <Grid container sx={{ gap: '0.5rem' }}>
          <Typography variant="caption" component={'p'} minWidth={'4ch'} color={'text.secondary'}>
            {t('To')}
          </Typography>
          <Box sx={{ backgroundColor: theme.palette.background.level3, padding: '0 0 0 0.75rem', borderRadius: '4px', minWidth: '5rem' }}>
            {to}
          </Box>
        </Grid>
      </Box>
    </Grid>
  )
}

export default FromTo
