import React from 'react'
import { useTranslation } from 'react-i18next'

import { boxShadow } from '@/theme/hoverEffect'
import { Close } from '@carbon/icons-react'
import { Unstable_Grid2 as Grid2, IconButton, Tooltip, Typography, useTheme } from '@mui/material'

/**
 * This component is used to display different types of popups
 *
 * @param name - The name of the popup
 * @param handleMenuPopup - A callback to handle popup
 * @param children - The elements to display within the Popup
 * @returns The Popup component
 */
const Popups = ({ name, handleMenuPopup, children }: { name: string; handleMenuPopup: () => void; children: React.ReactNode }) => {
  const theme = useTheme()
  const { t } = useTranslation()

  return (
    <Grid2
      container
      bgcolor="background.level0"
      id={`${name}-popup`}
      sx={{
        position: 'relative',
        height: '100%',
        alignItems: 'flex-start',
        zIndex: 200,
        display: 'flex',
        flexDirection: 'column',
        padding: '0.5rem',
        minHeight: '15rem',
        border: `1px solid ${theme.palette.background.level2}`,
        boxShadow: boxShadow(theme.palette.mode),
        borderRadius: '10px',
        filter: `drop-shadow(${theme.palette.mode === 'light' ? theme.shadows[2] : theme.shadows[3]})`,
      }}
    >
      <Grid2
        xs={12}
        justifyContent="space-between"
        alignItems="center"
        sx={{
          padding: '0 0 0 0.5rem',
          display: 'flex',
          marginBottom: '1.25rem',
          height: '2rem',
        }}
      >
        <Typography variant="body1" sx={{ width: 'max-content' }}>
          {name}
        </Typography>
        <Tooltip title={t('Close')} placement="bottom" key={'close popup'}>
          <IconButton color="info" onClick={handleMenuPopup}>
            <Close />
          </IconButton>
        </Tooltip>
      </Grid2>
      {children}
    </Grid2>
  )
}

export default Popups
