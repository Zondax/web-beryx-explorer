import { FormikProps } from 'formik'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { FilUnits } from '@/utils/numbers'
import { ExpandMore } from '@mui/icons-material'
import { Box, Unstable_Grid2 as Grid, MenuItem, TextField, Typography } from '@mui/material'

import { RunMethodFormValues, availableUnits, defaultUnit } from '../config'

interface PayProps {
  formik: FormikProps<RunMethodFormValues>
}

const Pay = ({ formik }: PayProps) => {
  // Global
  const { t } = useTranslation()

  /**
   * Handles the change event for the amount input field.
   * @param e - The event object.
   */
  const handleAmount = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      formik.setFieldValue('amount', e.target.value)
    },
    [formik]
  )

  /**
   * Handles the change event for the unit amount input field.
   * @param e - The event object.
   */
  const handleUnitAmount = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      formik.setFieldValue('unitAmount', e.target.value as FilUnits)
    },
    [formik]
  )

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '0.125rem', padding: '0.5rem 1.25rem' }}>
      <Typography variant="caption" color={'text.primary'} fontWeight={600}>
        {t('Amount')}
      </Typography>
      <Grid container spacing={1} alignItems={'flex-end'} sx={{ marginTop: '0.5rem' }}>
        <Grid xs={6}>
          <TextField
            label={t('Amount')}
            size="large"
            color="level3"
            name="amount"
            type="number"
            value={formik.values.amount ?? ''}
            InputProps={{ inputProps: { min: 0 } }}
            onChange={handleAmount}
            required
            fullWidth
          />
        </Grid>
        <Grid xs={6}>
          <TextField
            id="unit-amount"
            size="large"
            color="level3"
            label={t('Unit')}
            select
            SelectProps={{ IconComponent: ExpandMore }}
            value={formik.values.unitAmount ?? defaultUnit}
            onChange={handleUnitAmount}
            disabled={!formik.values.amount}
            fullWidth
          >
            {Object.keys(availableUnits).map(unit => (
              <MenuItem key={`unit ${unit}`} value={unit}>
                {unit}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Pay
