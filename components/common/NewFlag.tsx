import { useTranslation } from 'react-i18next'

import { Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'

/**
 * NewFlag is a component for adding a new flag in Menus.
 */
const NewFlag = () => {
  const theme = useTheme()
  const { t } = useTranslation()

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        background: theme.palette.main,
        color: '#fff',
        height: '1.25rem',
        padding: '0.125rem 0.3rem',
        borderRadius: '4px',
      }}
    >
      {t('New')}
    </Box>
  )
}

export default NewFlag
