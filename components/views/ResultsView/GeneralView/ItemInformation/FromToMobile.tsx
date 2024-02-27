import { useTranslation } from 'react-i18next'

import { ArrowRight } from '@carbon/icons-react'
import { Box, Unstable_Grid2 as Grid, Typography, useTheme } from '@mui/material'

import { FromToProps } from './FromTo'

/**
 * This component is used to render a mobile friendly layout
 * for displaying 'from' and 'to' data provided as props.
 *
 * @param from - The data to be displayed as 'from' information.
 * @param to - The data to be displayed as 'to' information.
 *
 * @returns Mobile friendly layout of 'from' and 'to' data wrapped
 * with React Grid components for responsiveness.
 */
const FromToMobile = ({ from, to }: FromToProps) => {
  /**
   * Hooks for acquiring the current theme and translation function.
   */
  const theme = useTheme()
  const { t } = useTranslation()

  return (
    <Grid container alignItems={'center'} sx={{ gap: '0.5rem' }}>
      <Grid container alignItems={'center'} sx={{ gap: '0.5rem' }}>
        <Typography variant="caption" component={'p'} fontSize={'0.8rem'} color={'text.secondary'}>
          {t('From')}
        </Typography>
        <Box sx={{ backgroundColor: theme.palette.background.level2, padding: '0 0 0 0.75rem', borderRadius: '4px' }}>{from}</Box>
      </Grid>
      <ArrowRight size={16} color={theme.palette.text.secondary} />
      <Grid container alignItems={'center'} sx={{ gap: '0.5rem' }}>
        <Typography variant="caption" component={'p'} fontSize={'0.8rem'} color={'text.secondary'}>
          {t('To')}
        </Typography>
        <Box sx={{ backgroundColor: theme.palette.background.level3, padding: '0 0 0 0.75rem', borderRadius: '4px' }}> {to}</Box>
      </Grid>
    </Grid>
  )
}

export default FromToMobile
