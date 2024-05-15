import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { InspectData } from '@carbon/pictograms-react'
import { Box, Grow, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

/**
 * Type for NoRowsPosition
 */
export type NoRowsPosition = 'inherit' | 'left' | 'center' | 'right' | 'justify'

/**
 * An interface containing the optional properties for the NoRows component.
 *
 * @interface NoRowsProps
 * @property text - Text to be displayed. It can be a string or an array of strings.
 * @property icon - Icon to be displayed.
 * @property position - Position of the text and icon.
 */
export interface NoRowsProps {
  title?: string
  text?: string[] | string
  icon?: JSX.Element | null
  position?: NoRowsPosition
}

/**
 * A React functional component that displays a specified text and icon when no rows are present.
 *
 * @param props - The properties that define the text, icon, and position of the component.
 * @returns The rendered NoRows component.
 */
const NoRows = ({ title, text = ['No rows'], icon = <InspectData />, position = 'center' }: NoRowsProps): JSX.Element => {
  const theme = useTheme()
  const { t } = useTranslation()

  const renderText = useCallback(
    (text: string | string[]) => {
      if (typeof text === 'string') {
        return (
          <Typography
            variant="caption"
            color={theme.palette.text.secondary}
            fontWeight={500}
            lineHeight={1.35}
            textAlign={position}
            maxWidth={'35ch'}
            key={text}
          >
            {t(text)}
          </Typography>
        )
      }

      if (Array.isArray(text)) {
        return text.map(paragraph => (
          <Typography
            variant="caption"
            color={theme.palette.text.secondary}
            fontWeight={500}
            lineHeight={1.35}
            textAlign={position}
            maxWidth={'35ch'}
            key={paragraph}
          >
            {t(paragraph)}
          </Typography>
        ))
      }

      return null
    },
    [t, theme, position]
  )

  return (
    <Box
      className={'noRows'}
      sx={{
        height: position === 'center' ? 'calc(100% - 1rem)' : 'calc(100% - 5rem)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.5,
      }}
    >
      <Grow appear in easing={'ease-in'} timeout={600}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
          }}
        >
          <Box sx={{ svg: { fill: theme.palette.text.secondary } }}>{icon}</Box>
          {title && (
            <Typography variant="h5" component={'span'} fontWeight={500}>
              {title}
            </Typography>
          )}
          {renderText(text)}
        </Box>
      </Grow>
    </Box>
  )
}

export default NoRows
