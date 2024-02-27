/**
 * @module Sidebar
 */
import React from 'react'
import { useTranslation } from 'react-i18next'

import { translate } from '@/utils/translate'
import { Unstable_Grid2 as Grid2, IconButton, Tooltip, useTheme } from '@mui/material'

/**
 * @interface SideBarProps
 * @description Props for Sidebar component
 */
interface SideBarProps {
  handleClick: () => void
  label: string
  icon: React.ReactNode
}

/**
 * @function Sidebar
 * @description Sidebar component
 * @param {SideBarProps} props - Props for Sidebar component
 * @returns {JSX.Element} Rendered Sidebar component
 */
const IsolatedButton = ({ handleClick, label, icon }: SideBarProps) => {
  const theme = useTheme()
  const { t } = useTranslation()

  return (
    <Grid2
      container
      bgcolor="background.level1"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '1rem',
        width: '4rem',
        padding: '0.5rem',
        borderRadius: '0.5rem',
      }}
    >
      <Tooltip title={translate(t, label)} placement="right" key={`sidebar-item-${label}`} disableInteractive>
        <IconButton
          sx={{
            position: 'relative',
            minWidth: 'unset',
            height: '3rem',
            width: '3rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            gap: '1rem',
            color: theme.palette.text.secondary,
            borderRadius: '0.5rem',
            '& svg path': {
              fill: theme.palette.text.secondary,
            },
            ':hover': {
              backgroundColor: theme.palette.background.level0,
            },
          }}
          role="button"
          onClick={handleClick}
        >
          {icon}
        </IconButton>
      </Tooltip>
    </Grid2>
  )
}

export default IsolatedButton
