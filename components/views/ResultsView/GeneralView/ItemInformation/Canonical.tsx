import { useTranslation } from 'react-i18next'

import { Unstable_Grid2 as Grid, Typography } from '@mui/material'

/**
 * This function component receives a boolean prop 'isCanonical'
 * and produces a Grid component with a different background color
 * and text based on the value of 'isCanonical'.
 *
 * @param props - The properties passed to this component
 * @param props.isCanonical - The value which changes the text and color of the Grid
 *
 * @returns - A Grid component with dynamic text/color based on 'isCanonical' prop
 */
const Canonical = ({ isCanonical }: { isCanonical: boolean }): JSX.Element => {
  const { t } = useTranslation()

  return (
    <Grid
      container
      alignItems={'center'}
      justifyContent={'center'}
      sx={{ padding: '0.125rem 0.5rem 0.1rem 0.5rem', borderRadius: '4px', background: isCanonical ? '#A5EAC4' : '#FCB3B8' }}
    >
      <Typography variant="caption" component={'p'} fontWeight={500} fontSize={'0.85rem'}>
        {isCanonical ? t('Confirmed') : t('Not Confirmed')}
      </Typography>
    </Grid>
  )
}

export default Canonical
