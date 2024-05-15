import { useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { formatValue } from '@/utils/numbers'
import { Box, Grid, Typography } from '@mui/material'

import { DynamicFontSizeText } from 'components/common/DynamicFontSizeText'

/**
 * Component to display statistics tile with dynamic font sizes
 */
const StatsTile = ({
  data,
  description,
  showOriginal = false,
}: {
  data: { value: string | number; unit?: string }
  description?: string
  showOriginal?: boolean
}) => {
  const [fontSize, setFontSize] = useState<string>('3rem')
  const ref = useRef<HTMLDivElement | null>(null)
  const { t } = useTranslation()

  const formatedData = useMemo(() => {
    if (typeof data.value !== 'number') {
      return data
    }

    if (showOriginal) {
      data.value = data.value % 1 !== 0 ? data.value.toFixed(2) : Math.floor(data.value)
      return data
    }

    if (!data.unit) {
      const { value, unit } = formatValue(data.value)
      data.value = value % 1 !== 0 ? value.toFixed(2) : Math.floor(value)
      data.unit = unit
      return data
    }
    data.value = data.value % 1 !== 0 ? data.value.toFixed(2) : Math.floor(data.value)
    return data
  }, [data, showOriginal])

  return (
    <Grid container flexDirection={'column'} ref={ref}>
      <Box
        display={'flex'}
        // If the unit is a filecoin unit, it will be below the value
        flexDirection={formatedData.unit && formatedData.unit?.length > 2 ? 'column' : 'row'}
        alignItems={formatedData.unit && formatedData.unit?.length > 2 ? 'flex-start' : 'flex-end'}
        gap={'0.25rem'}
        data-testid={'stats-tile-container'}
      >
        <DynamicFontSizeText refContainer={ref} text={formatedData.value} fontSize={fontSize} setFontSize={setFontSize} />
        {formatedData.unit ? (
          <Typography variant="h3" component={'span'} color={'text.primary'} pb={{ xs: '0.25rem', lg: '0.5rem' }}>
            {formatedData.unit}
          </Typography>
        ) : null}
      </Box>
      {description ? (
        <Typography variant="subtitle2" component={'span'} color={'text.primary'} data-testid={'stats-tile-description'}>
          {t(description)}
        </Typography>
      ) : null}
    </Grid>
  )
}

export default StatsTile
