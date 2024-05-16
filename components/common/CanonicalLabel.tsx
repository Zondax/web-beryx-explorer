import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { Box, Tooltip, Typography, useTheme } from '@mui/material'

/**
 * The props that are used in the CanonicalLabel component
 */
interface CanonicalLabelProps {
  /**
   * If the transaction is part of the canonical chain or not
   */
  isCanonical: boolean
  /**
   * The type of label to be shown. Default is 'boolean'
   */
  type?: 'canonical' | 'boolean'
}

/**
 * A component that renders an appropriate label based on the 'isCanonical' prop
 *
 * @param isCanonical - A boolean specifying if the transaction is part of the canonical chain or not
 * @param type - A string that determines the type of label to be rendered. Default is 'boolean'
 * @returns The CanonicalLabel component
 */
const CanonicalLabel = ({ isCanonical, type = 'boolean' }: CanonicalLabelProps) => {
  const theme = useTheme()
  const { t } = useTranslation()

  const renderLabel = useCallback(() => {
    if (type === 'canonical') {
      return isCanonical ? t('Canonical') : t('Not Canonical')
    }
    return isCanonical ? t('Yes') : t('No')
  }, [isCanonical, type, t])

  return (
    <Tooltip
      title={type === 'canonical' ? t('Indicates whether the transaction is part of the canonical chain') : ''}
      arrow
      disableInteractive
    >
      <Box
        sx={{
          padding: '0.125rem 0.5rem 0.1rem 0.5rem',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: isCanonical ? theme.palette.success.light : theme.palette.warning.light,
          width: 'max-content',
          height: '1.5rem',
        }}
      >
        <Typography
          variant={'caption'}
          component={'p'}
          fontSize={'0.85rem'}
          lineHeight={1}
          color={isCanonical ? theme.palette.success.main : theme.palette.warning.main}
          fontWeight={600}
          noWrap
        >
          {renderLabel()}
        </Typography>
      </Box>
    </Tooltip>
  )
}

export default CanonicalLabel
